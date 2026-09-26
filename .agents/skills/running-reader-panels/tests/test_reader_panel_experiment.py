from __future__ import annotations

import json
import asyncio
import tempfile

import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_experiment import (compile_experiment, load_experiment, run_experiment,
                                     run_experiment_async)  # noqa: E402
from reader_panel_source import ReaderProfile, SourceError  # noqa: E402
from reader_panel_decisions import Decision  # noqa: E402


def decision(value: str) -> Decision:
    return Decision(value, {value: 1.0}, 0.00001, 10, "typesafe/jev-1.13-20260917")


class ExperimentTests(unittest.TestCase):
    def test_resume_skips_completed_journeys_and_rejects_fingerprint_drift(self) -> None:
        experiment = {
            "version": 3, "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(2))
        calls = []

        async def decide(profile, condition, stage, visible, choices, attempts):
            calls.append(profile.id)
            return decision("skim")

        with tempfile.TemporaryDirectory() as temporary:
            checkpoint_path = Path(temporary) / "partial.json"
            first = asyncio.run(run_experiment_async(experiment, readers, decide_fn=decide,
                max_calls=1, max_usd=1, concurrency=1, checkpoint_path=checkpoint_path))
            self.assertEqual(sum(journey["completed"] for journey in first["journeys"]), 1)
            checkpoint = json.loads(checkpoint_path.read_text(encoding="utf-8"))
            self.assertEqual(checkpoint["usage"]["calls"], 1)
            calls.clear()
            resumed = asyncio.run(run_experiment_async(experiment, readers, decide_fn=decide,
                max_calls=4, max_usd=1, concurrency=2, resume_checkpoint=checkpoint,
                checkpoint_path=checkpoint_path))
            self.assertEqual(calls, ["reader-1"])
            self.assertEqual(sum(journey["completed"] for journey in resumed["journeys"]), 2)
            changed = dict(experiment, title="Changed title")
            with self.assertRaisesRegex(ValueError, "does not match"):
                asyncio.run(run_experiment_async(changed, readers, decide_fn=decide,
                    max_calls=4, max_usd=1, concurrency=1, resume_checkpoint=checkpoint))

    def test_async_runner_overlaps_independent_journeys_without_oversubscribing_calls(self) -> None:
        experiment = {
            "version": 3, "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(8))
        state = {"active": 0, "maximum": 0}

        async def decide(profile, condition, stage, visible, choices, attempts):
            state["active"] += 1
            state["maximum"] = max(state["maximum"], state["active"])
            await asyncio.sleep(0.01)
            state["active"] -= 1
            return decision("skim")

        report = asyncio.run(run_experiment_async(experiment, readers, decide_fn=decide,
                        max_calls=5, max_usd=1, concurrency=4))
        self.assertGreater(state["maximum"], 1)
        self.assertLessEqual(report["calls"], 5)
        self.assertEqual(report["calls"], 5)
        self.assertEqual(report["performance"]["max_active_requests"], state["maximum"])
        self.assertEqual(report["performance"]["completed_decisions"], len(report["observations"]))
        self.assertTrue(all(item["latency_seconds"] >= 0 for item in report["observations"]))
        self.assertGreaterEqual(report["wall_time_seconds"], 0)
        self.assertTrue(any(not journey["completed"] for journey in report["journeys"]))

    def test_version_three_compiles_two_optional_reads_and_three_policy_conditions(self) -> None:
        experiment = {
            "version": 3, "title": "Title", "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "sql", "kind": "optional_read", "title": "SQL", "standfirst": "SQL invitation",
                 "reading_time": "30 seconds", "preview": "SQL visible preview", "body": "SQL body"},
                {"id": "middle", "kind": "beat", "text": "Middle"},
                {"id": "webhook", "kind": "optional_read", "title": "Webhook",
                 "standfirst": "Webhook invitation", "reading_time": "30 seconds", "body": "Webhook body"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": [
                {"id": "core_only", "optional_reads": "omit"},
                {"id": "asides_in_flow", "optional_reads": "inline"},
                {"id": "optional_with_defer", "optional_reads": "read_now_or_defer"},
            ],
        }
        compiled = compile_experiment(experiment)
        self.assertEqual([piece["id"] for piece in compiled["route"]],
                         ["opening", "sql", "middle", "webhook", "ending"])
        self.assertEqual(sum(piece["kind"] == "optional_read" for piece in compiled["route"]), 2)
        self.assertEqual([item["id"] for item in compiled["conditions"]],
                         ["core_only", "asides_in_flow", "optional_with_defer"])

    def test_legacy_experiment_compiles_to_same_canonical_route(self) -> None:
        legacy = {
            "version": 1, "title": "Title", "promise": "Promise", "sources": [],
            "beats": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "extra", "kind": "aside", "title": "Extra",
                       "standfirst": "Invitation", "body": "Hidden"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": ["omit", "reader_choice"],
        }
        compiled = compile_experiment(legacy)
        self.assertEqual([piece["kind"] for piece in compiled["route"]],
                         ["beat", "optional_read", "beat"])
        self.assertEqual([item["id"] for item in compiled["conditions"]], ["omit", "reader_choice"])

    def test_two_aside_route_offers_unseen_and_deferred_reads_after_core_exit(self) -> None:
        experiment = {
            "version": 3, "title": "Title", "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "sql", "kind": "optional_read", "title": "SQL", "standfirst": "SQL offer",
                 "reading_time": "30 seconds", "body": "SQL SECRET"},
                {"id": "middle", "kind": "beat", "text": "Middle"},
                {"id": "webhook", "kind": "optional_read", "title": "Webhook",
                 "standfirst": "Webhook offer", "reading_time": "30 seconds", "body": "WEBHOOK SECRET"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}],
        }
        profile = ReaderProfile("one", "read", "reader", "payoff")
        requests = []

        def decide(profile, condition, stage, visible, choices, attempts):
            requests.append((stage, visible, choices))
            if stage == "opening":
                return decision("leave_lost_interest")
            if stage.endswith("terminal-choice"):
                return decision("read" if stage.startswith("sql:") else "skip")
            if stage.endswith("read-effect"):
                return decision("increased")
            return decision("defer_to_end")

        report = run_experiment(experiment, (profile,), decide_fn=decide, max_calls=20, max_usd=1)
        journey = report["journeys"][0]
        offers = [event for event in journey["events"] if event["type"] == "terminal_offer"]
        self.assertEqual([(event["item_id"], event["origin"]) for event in offers],
                         [("sql", "first_offer_unseen"), ("webhook", "first_offer_unseen")])
        self.assertEqual(journey["core_outcome"], "leave_lost_interest")
        self.assertTrue(journey["completed"])
        summary = report["optional_summary"]
        self.assertEqual([item["eligible_journeys"] for item in summary], [1, 1])
        self.assertEqual([item["first_offer_unseen"] for item in summary], [1, 1])
        self.assertIn("increased", [event.get("effect") for event in journey["events"]])
        self.assertNotIn("SQL SECRET", next(visible for stage, visible, _ in requests
                                             if stage == "sql:terminal-choice"))
        sql_terminal_visible = next(visible for stage, visible, _ in requests
                                    if stage == "sql:terminal-choice")
        self.assertIn("SQL offer", sql_terminal_visible)
        self.assertNotIn("SQL visible preview", sql_terminal_visible)
        self.assertNotIn("WEBHOOK SECRET", next(visible for stage, visible, _ in requests
                                                 if stage == "webhook:terminal-choice"))

    def test_optional_inline_preview_is_visible_before_body_choice(self) -> None:
        experiment = {"version": 3, "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "aside", "kind": "optional_read", "title": "Aside",
                       "standfirst": "Invitation", "reading_time": "30 seconds",
                       "preview": "FIGURE DESCRIPTION", "body": "HIDDEN BODY"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}]}
        profile = ReaderProfile("one", "read", "reader", "payoff")
        requests = []

        def decide(profile, condition, stage, visible, choices, attempts):
            requests.append((stage, visible))
            return decision({"aside:inline-choice": "defer_to_end", "ending": "stop_satisfied",
                             "aside:terminal-choice": "skip"}.get(stage, "read_closely"))

        run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        inline = next(visible for stage, visible in requests if stage == "aside:inline-choice")
        self.assertIn("FIGURE DESCRIPTION", inline)
        self.assertNotIn("HIDDEN BODY", inline)

    def test_post_article_offer_reaches_satisfied_reader_before_ending(self) -> None:
        experiment = {
            "version": 2, "title": "Title", "promise": "Promise", "sources": [],
            "beats": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "optional_read": {"id": "extra", "title": "Optional read",
                              "standfirst": "Why you might read it", "body": "Hidden detail"},
            "conditions": ["omit", "post_article_choice"],
        }
        profiles = (ReaderProfile("early", "read", "reader", "payoff"),
                    ReaderProfile("end", "read", "reader", "payoff"),
                    ReaderProfile("lost", "read", "reader", "payoff"))
        seen = []

        def decide(profile, condition, stage, visible, choices, attempts):
            seen.append((profile.id, condition, stage, visible))
            if stage == "post-choice":
                return decision("open" if profile.id == "early" else "skip")
            if stage == "post-read-effect":
                return decision("increased")
            if profile.id == "early" and stage == "opening":
                return decision("stop_satisfied")
            if profile.id == "lost" and stage == "opening":
                return decision("leave_lost_interest")
            return decision("read_closely")

        report = run_experiment(experiment, profiles, decide_fn=decide, max_calls=30, max_usd=1)
        by_reader = {(item["reader"], item["condition"]): item for item in report["journeys"]}
        early = by_reader["early", "post_article_choice"]
        self.assertFalse(early["reached_end"])
        self.assertEqual(early["offer_reason"], "stop_satisfied")
        self.assertEqual(early["aside_choice"], "open")
        self.assertEqual(early["optional_effect"], "increased")
        self.assertIn("extra:body", early["exposed_pieces"])
        self.assertNotIn("ending", early["exposed_pieces"])
        end = by_reader["end", "post_article_choice"]
        self.assertTrue(end["reached_end"])
        self.assertEqual(end["offer_reason"], "reached_end")
        self.assertEqual(end["aside_choice"], "skip")
        self.assertIsNone(end["optional_effect"])
        self.assertNotIn("extra:body", end["exposed_pieces"])
        lost = by_reader["lost", "post_article_choice"]
        self.assertIsNone(lost["offer_reason"])
        self.assertIsNone(lost["aside_choice"])
        self.assertFalse(any(n == "lost" and stage == "post-choice" for n, _, stage, _ in seen))
        self.assertFalse(any(condition == "omit" and "Hidden detail" in visible
                             for _, condition, _, visible in seen))

    def test_satisfied_reader_who_reaches_end_can_still_choose_deferred_aside(self) -> None:
        experiment = {
            "version": 1, "title": "Title", "promise": "Promise", "sources": [],
            "beats": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "optional", "kind": "aside", "title": "Optional",
                 "standfirst": "Invitation", "body": "Hidden"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": ["reader_choice"],
        }
        profile = ReaderProfile("one", "read", "reader", "payoff")
        seen = []
        def decide(profile, condition, stage, visible, choices, attempts):
            seen.append(stage)
            return decision({
                "aside-choice": "return_later", "ending": "stop_satisfied",
                "return-choice": "open",
            }.get(stage, "read_closely"))

        report = run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        self.assertIn("return-choice", seen)
        self.assertEqual(report["journeys"][0]["return_choice"], "open")
        self.assertIn("optional:body-later", report["journeys"][0]["exposed_pieces"])

    def test_reader_who_leaves_before_aside_is_not_counted_as_skipping_it(self) -> None:
        experiment = {
            "version": 1, "title": "Title", "promise": "Promise", "sources": [],
            "beats": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "optional", "kind": "aside", "title": "Optional",
                 "standfirst": "Invitation", "body": "Hidden"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": ["reader_choice"],
        }
        profile = ReaderProfile("one", "read", "reader", "payoff")
        seen = []

        def decide(profile, condition, stage, visible, choices, attempts):
            seen.append(stage)
            return decision("leave_lost_interest")

        report = run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        self.assertEqual(seen, ["opening"])
        self.assertFalse(report["journeys"][0]["reached_aside"])
        self.assertIsNone(report["journeys"][0]["aside_choice"])

    def test_reader_choice_controls_exposure_and_deferred_reading(self) -> None:
        experiment = {
            "version": 1, "title": "A title", "promise": "A promise",
            "sources": [],
            "beats": [
                {"id": "opening", "kind": "beat", "text": "OPENING"},
                {"id": "optional", "kind": "aside", "title": "Invitation",
                 "standfirst": "A reason to open", "body": "SECRET ASIDE"},
                {"id": "ending", "kind": "beat", "text": "ENDING"},
            ],
            "conditions": ["omit", "closed", "force_open", "reader_choice"],
        }
        profiles = tuple(ReaderProfile(name, "read", "reader", "payoff") for name in ("now", "later", "skip"))
        seen = []

        def decide(profile, condition, stage, visible, choices, max_attempts):
            seen.append((profile.id, condition, stage, visible))
            if stage == "aside-choice":
                return decision({"now": "open_now", "later": "return_later", "skip": "skip"}[profile.id])
            if stage == "return-choice":
                return decision("open" if profile.id == "later" else "skip")
            return decision("read_closely")

        report = run_experiment(experiment, profiles, decide_fn=decide, max_calls=100, max_usd=1)
        by_reader = {(item["reader"], item["condition"]): item for item in report["journeys"]}
        self.assertNotIn("SECRET ASIDE", " ".join(v for _, c, _, v in seen if c in {"omit", "closed"}))
        self.assertIn("SECRET ASIDE", " ".join(v for n, c, _, v in seen if c == "reader_choice" and n == "now"))
        self.assertNotIn("SECRET ASIDE", " ".join(v for n, c, s, v in seen
                                                   if c == "reader_choice" and n == "later" and s != "return-read"))
        self.assertEqual(by_reader["later", "reader_choice"]["aside_choice"], "return_later")
        self.assertEqual(by_reader["later", "reader_choice"]["return_choice"], "open")
        self.assertEqual(by_reader["skip", "reader_choice"]["return_choice"], None)
        self.assertEqual(by_reader["now", "reader_choice"]["return_choice"], None)

    def test_manifest_rejects_source_drift_before_a_paid_call(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "article.md"
            source.write_text("original", encoding="utf-8")
            manifest = Path(directory) / "experiment.json"
            manifest.write_text('{"version":1,"title":"A","promise":"B",'
                                '"sources":[{"path":"article.md","sha256":"' + "0" * 64 + '"}],'
                                '"beats":[{"id":"opening","kind":"beat","text":"original"}],'
                                '"conditions":["omit"]}', encoding="utf-8")
            with self.assertRaisesRegex(SourceError, "source hash"):
                load_experiment(manifest)

    def test_manifest_rejects_non_string_source_fields(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            manifest = Path(directory) / "experiment.json"
            for source_record in ({"path": None, "sha256": "0" * 64},
                                  {"path": "article.md", "sha256": None}):
                manifest.write_text(json.dumps({
                    "version": 1, "title": "A", "promise": "B",
                    "sources": [source_record],
                    "beats": [{"id": "opening", "kind": "beat", "text": "Text"}],
                    "conditions": ["omit"],
                }), encoding="utf-8")
                with self.assertRaisesRegex(SourceError, "source path or hash"):
                    load_experiment(manifest)

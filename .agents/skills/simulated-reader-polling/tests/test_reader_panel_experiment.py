from __future__ import annotations

import asyncio
import json
import tempfile
import sys
import time
import unittest
from unittest.mock import patch
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_experiment import (compile_experiment, load_experiment, run_experiment,
                                     run_experiment_async)  # noqa: E402
from reader_panel_source import ReaderProfile, SourceError  # noqa: E402
from reader_panel_decisions import (Decision, DecisionError,
                                    EXPERIMENT_CHOICE_LABELS)  # noqa: E402


def decision(value: str) -> Decision:
    return Decision(value, {value: 1.0}, 0.00001, 1, "typesafe/jev-1.13-20260917")


class ExperimentTests(unittest.TestCase):
    def test_current_semver_manifest_supports_article_route_mode(self) -> None:
        manifest = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title",
            "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening."}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        compiled = compile_experiment(manifest)
        self.assertEqual(compiled["version"], "0.0.5")
        self.assertEqual(compiled["reader_flow"], "article_route")

    def test_only_current_semver_manifest_is_supported(self) -> None:
        for version in (1, 2, 3, 4, "0.0.4", "0.1.0", "1.0.0"):
            manifest = {
                "version": version, "reader_flow": "article_route", "title": "Title",
                "promise": "Promise", "sources": [],
                "route": [{"id": "opening", "kind": "beat", "text": "Opening."}],
                "conditions": [{"id": "core_only", "optional_reads": "omit"}],
            }
            with self.subTest(version=version), self.assertRaisesRegex(
                    SourceError, "Only manifest version 0.0.5"):
                compile_experiment(manifest)

    def test_scanner_route_links_visible_entries_to_beat_and_aside_then_backfills_article(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "scan_entry", "title": "Title", "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening prose."},
                {"id": "story", "kind": "beat", "text": "Story prose."},
                {"id": "aside-story", "kind": "optional_read", "title": "Aside title",
                 "standfirst": "Aside invitation.", "reading_time": "About a minute",
                 "body": "SECRET ASIDE BODY."},
                {"id": "ending", "kind": "beat", "text": "Ending prose."},
            ],
            "scan_surface": [
                {"id": "heading-opening", "kind": "heading", "target": "opening", "text": "Opening"},
                {"id": "heading-story", "kind": "heading", "target": "story", "text": "Story"},
                {"id": "quote-story", "kind": "pull_quote", "target": "story", "text": "Read this line."},
                {"id": "aside-entry", "kind": "aside", "target": "aside-story",
                 "title": "Aside title", "standfirst": "Aside invitation."},
                {"id": "heading-ending", "kind": "heading", "target": "ending", "text": "Ending"},
            ],
            "conditions": [
                {"id": "headings-only", "scan_features": ["heading"], "optional_reads": "omit"},
                {"id": "full-surface", "scan_features": ["heading", "pull_quote", "aside"],
                 "optional_reads": "omit"},
                {"id": "aside-entry", "scan_features": ["heading", "aside"],
                 "optional_reads": "read_now_or_defer"},
                {"id": "surface-exit", "scan_features": ["heading"], "optional_reads": "omit"},
            ],
        }
        readers = (ReaderProfile("one", "scan", "reader", "a useful article", archetype_id="curious"),)
        seen = []

        def decide(profile, condition, stage, visible, choices, attempts, history):
            seen.append((condition, stage, visible, choices, history))
            if stage.startswith("scan-entry-"):
                if condition == "surface-exit":
                    return decision("stop_satisfied")
                entry = ("entry--aside-entry" if condition == "full-surface" and stage.endswith("-1") else
                         {"headings-only": "entry--heading-story", "full-surface": "entry--quote-story",
                          "aside-entry": "entry--aside-entry"}[condition])
                return decision(entry)
            if stage.startswith("scan-attention:"):
                return decision("read_closely")
            if stage.startswith("scan-navigation:"):
                if condition == "full-surface":
                    return decision("scan_again" if stage.endswith(":story") else "read_from_opening")
                return decision("stop_satisfied")
            if stage == "opening":
                return decision("skim")
            if stage == "ending":
                return decision("stop_satisfied")
            self.fail(f"Unexpected stage {stage}")

        report = run_experiment(experiment, readers, decide_fn=decide, max_calls=30, max_usd=1)
        by_condition = {journey["condition"]: journey for journey in report["journeys"]}
        headings = by_condition["headings-only"]
        full = by_condition["full-surface"]
        aside_entry = by_condition["aside-entry"]
        surface_exit = by_condition["surface-exit"]
        self.assertEqual(next(event["entry_id"] for event in headings["events"]
                              if event["type"] == "scan_entry_selected"), "heading-story")
        self.assertEqual(next(event["entry_id"] for event in full["events"]
                              if event["type"] == "scan_entry_selected"), "quote-story")
        self.assertEqual(next(event["entry_id"] for event in aside_entry["events"]
                              if event["type"] == "scan_entry_selected"), "aside-entry")
        self.assertIn("opening", full["exposed_pieces"])
        self.assertIn("ending", full["exposed_pieces"])
        self.assertIn("aside-story:body-scan", full["exposed_pieces"])
        self.assertNotIn("aside-story:body-scan", headings["exposed_pieces"])
        self.assertIn("aside-story:body-scan", aside_entry["exposed_pieces"])
        self.assertFalse(any(event["type"] == "terminal_offer" for event in aside_entry["events"]))
        self.assertEqual(surface_exit["core_outcome"], "stop_satisfied")
        scan_requests = [item for item in seen if item[1].startswith("scan-entry-")]
        self.assertTrue(all("SECRET ASIDE BODY." not in item[2] for item in scan_requests))
        self.assertTrue(any("Aside title" in item[2] for item in scan_requests))
        summary = {item["condition"]: item for item in report["scan_summary"]}
        full_quote = next(item for item in summary["full-surface"]["entries"]
                          if item["entry_id"] == "quote-story")
        self.assertEqual(full_quote["selected"], 1)
        self.assertEqual(full_quote["read_closely"], 1)
        self.assertEqual(full_quote["scan_again"], 1)
        full_aside = next(item for item in summary["full-surface"]["entries"]
                          if item["entry_id"] == "aside-entry")
        self.assertEqual(full_aside["read_from_opening"], 1)
        self.assertEqual(full_quote["by_archetype"][0]["archetype"], "curious")
        self.assertEqual(summary["surface-exit"]["no_entry_exit"]["stop_satisfied"], 1)

    def test_scanner_manifest_rejects_entry_that_targets_wrong_content_kind(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "scan_entry", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening."},
                      {"id": "aside", "kind": "optional_read", "title": "Aside",
                       "standfirst": "Invitation", "reading_time": "One minute", "body": "Body"},
                      {"id": "ending", "kind": "beat", "text": "Ending."}],
            "scan_surface": [{"id": "heading", "kind": "heading", "target": "opening", "text": "Opening"},
                             {"id": "aside-entry", "kind": "aside", "target": "opening",
                              "title": "Aside", "standfirst": "Invitation"},
                             {"id": "ending-heading", "kind": "heading", "target": "ending", "text": "Ending"}],
            "conditions": [{"id": "scan", "scan_features": ["heading", "aside"],
                            "optional_reads": "omit"}],
        }
        with self.assertRaisesRegex(SourceError, "Aside entries must show"):
            compile_experiment(experiment)

    def test_resume_skips_completed_journeys_and_rejects_fingerprint_drift(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(2))
        calls = []

        async def decide(profile, condition, stage, visible, choices, attempts, history):
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
            with patch.dict(EXPERIMENT_CHOICE_LABELS, {"read_closely": "Changed prompt text"}):
                with self.assertRaisesRegex(ValueError, "does not match"):
                    asyncio.run(run_experiment_async(experiment, readers, decide_fn=decide,
                        max_calls=4, max_usd=1, concurrency=1, resume_checkpoint=checkpoint))

    def test_async_runner_overlaps_independent_journeys_without_oversubscribing_calls(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(8))
        state = {"active": 0, "maximum": 0}

        async def decide(profile, condition, stage, visible, choices, attempts, history):
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
        self.assertGreater(report["incomplete_journeys"], 0)
        self.assertTrue(all(journey["completed"] for journey in report["journeys"]))
        self.assertEqual(len(report["observations"]), 0)

    def test_sync_decisions_remain_serial_even_when_concurrency_is_requested(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(4))
        state = {"active": 0, "maximum": 0}

        def decide(profile, condition, stage, visible, choices, attempts, history):
            state["active"] += 1
            state["maximum"] = max(state["maximum"], state["active"])
            time.sleep(0.01)
            state["active"] -= 1
            return decision("skim")

        report = run_experiment(experiment, readers, decide_fn=decide,
                                max_calls=20, max_usd=1, concurrency=4)
        self.assertEqual(state["maximum"], 1)
        self.assertEqual(report["performance"]["max_active_requests"], 1)

    def test_failed_async_decisions_mark_unpriced_attempts_and_reserve_them(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = tuple(ReaderProfile(f"reader-{n}", "read", "reader", "payoff") for n in range(2))
        attempts = []

        async def fail(profile, condition, stage, visible, choices, max_attempts, history):
            attempts.append(profile.id)
            raise DecisionError("endpoint timeout", attempts=2)

        report = asyncio.run(run_experiment_async(experiment, readers, decide_fn=fail,
            max_calls=6, max_usd=1, concurrency=1))
        self.assertEqual(attempts, ["reader-0"])
        self.assertEqual(report["calls"], 2)
        self.assertTrue(report["cost_reconciliation_required"])
        self.assertEqual(report["unpriced_attempts"], 2)
        self.assertGreater(report["unpriced_cost_estimate_usd"], 0)
        self.assertEqual(report["incomplete_journeys"], 2)
        self.assertEqual(report["journeys"], [])

    def test_resume_requires_and_applies_provider_cost_reconciliation(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"}],
            "conditions": [{"id": "core_only", "optional_reads": "omit"}],
        }
        readers = (ReaderProfile("reader", "read", "reader", "payoff"),)

        async def fail(profile, condition, stage, visible, choices, attempts, history):
            raise DecisionError("endpoint timeout", attempts=2)

        async def recover(profile, condition, stage, visible, choices, attempts, history):
            return decision("skim")

        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "checkpoint.json"
            asyncio.run(run_experiment_async(experiment, readers, decide_fn=fail,
                max_calls=4, max_usd=1, concurrency=1, checkpoint_path=path))
            checkpoint = json.loads(path.read_text(encoding="utf-8"))
            with self.assertRaisesRegex(ValueError, "provider-billing reconciliation"):
                asyncio.run(run_experiment_async(experiment, readers, decide_fn=recover,
                    max_calls=4, max_usd=1, concurrency=1, resume_checkpoint=checkpoint))
            resumed = asyncio.run(run_experiment_async(experiment, readers, decide_fn=recover,
                max_calls=4, max_usd=1, concurrency=1, resume_checkpoint=checkpoint,
                reconciled_unpriced_usd=0.00003))
            self.assertEqual(resumed["calls"], 3)
            self.assertEqual(resumed["reported_cost_usd"], 0.00001)
            self.assertEqual(resumed["reconciled_unpriced_cost_usd"], 0.00003)
            self.assertEqual(resumed["cost_usd"], 0.00004)
            self.assertFalse(resumed["cost_reconciliation_required"])

    def test_optional_summary_breaks_down_completed_journeys_by_outcome_and_archetype(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "extra", "kind": "optional_read", "title": "Extra",
                 "standfirst": "Invitation", "reading_time": "30 seconds", "body": "Hidden"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": [{"id": "core_only", "optional_reads": "omit"},
                           {"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}],
        }
        readers = (
            ReaderProfile("satisfied", "read", "reader", "payoff", archetype_id="craft-admirer"),
            ReaderProfile("finished", "read", "reader", "payoff", archetype_id="hiring-evaluator"),
        )

        def decide(profile, condition, stage, visible, choices, attempts, history):
            if profile.id == "satisfied" and stage == "opening":
                return decision("stop_satisfied")
            if stage.endswith("inline-choice"):
                return decision("defer_to_end")
            if stage.endswith("terminal-choice"):
                return decision("skip")
            return decision("read_closely")

        report = run_experiment(experiment, readers, decide_fn=decide, max_calls=20, max_usd=1)
        summary = next(item for item in report["optional_summary"]
                       if item["condition"] == "optional_with_defer")
        self.assertEqual(summary["eligible_journeys"], 2)
        by_outcome = {item["value"]: item for item in summary["breakdowns"]["core_outcome"]}
        self.assertEqual(set(by_outcome), {"stop_satisfied", "reached_end"})
        self.assertEqual(by_outcome["stop_satisfied"]["eligible_journeys"], 1)
        self.assertEqual(by_outcome["stop_satisfied"]["first_offer_unseen"], 1)
        by_archetype = {item["value"]: item for item in summary["breakdowns"]["archetype"]}
        self.assertEqual(set(by_archetype), {"craft-admirer", "hiring-evaluator"})
        self.assertEqual(by_archetype["hiring-evaluator"]["deferred"], 1)
        combined = next(item for item in report["optional_summary"] if item["condition"] == "combined")
        self.assertEqual(combined["eligible_journeys"], 4)
        self.assertEqual(combined["deferred"], 1)
        self.assertEqual({item["eligible_journeys"] for item in combined["breakdowns"]["core_outcome"]}, {2})
        self.assertEqual({item["eligible_journeys"] for item in combined["breakdowns"]["archetype"]}, {2})

    def test_version_three_compiles_two_optional_reads_and_three_policy_conditions(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
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

    def test_two_aside_route_offers_unseen_and_deferred_reads_after_core_exit(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
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

        def decide(profile, condition, stage, visible, choices, attempts, history):
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
        per_condition = [item for item in summary if item["condition"] != "combined"]
        self.assertEqual([item["eligible_journeys"] for item in per_condition], [1, 1])
        combined = [item for item in summary if item["condition"] == "combined"]
        self.assertEqual([item["eligible_journeys"] for item in combined], [1, 1])
        self.assertEqual([item["first_offer_unseen"] for item in per_condition + combined], [1, 1, 1, 1])
        self.assertIn("increased", [event.get("effect") for event in journey["events"]])
        self.assertNotIn("SQL SECRET", next(visible for stage, visible, _ in requests
                                             if stage == "sql:terminal-choice"))
        sql_terminal_visible = next(visible for stage, visible, _ in requests
                                    if stage == "sql:terminal-choice")
        self.assertIn("SQL offer", sql_terminal_visible)
        self.assertNotIn("SQL visible preview", sql_terminal_visible)
        self.assertNotIn("WEBHOOK SECRET", next(visible for stage, visible, _ in requests
                                                 if stage == "webhook:terminal-choice"))

    def test_later_questions_receive_the_readers_prior_choices(self) -> None:
        experiment = {"version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "aside", "kind": "optional_read", "title": "Aside",
                       "standfirst": "Invitation", "reading_time": "2 minutes", "body": "Hidden"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}]}
        requests = {}

        def decide(profile, condition, stage, visible, choices, attempts, history):
            requests[stage] = list(history)
            return decision({"opening": "skim", "aside:inline-choice": "defer_to_end",
                             "aside:terminal-choice": "skip"}.get(stage, "read_closely"))

        run_experiment(experiment, (ReaderProfile("one", "read", "reader", "payoff"),),
                       decide_fn=decide, max_calls=10, max_usd=1)
        self.assertEqual(requests["opening"], [])
        self.assertEqual(requests["aside:inline-choice"], [
            {"item_id": "opening", "stage": "opening", "choice": "skim"}])
        self.assertIn({"item_id": "aside", "stage": "aside:inline-choice",
                       "choice": "defer_to_end"}, requests["aside:terminal-choice"])

    def test_optional_inline_preview_is_visible_before_body_choice(self) -> None:
        experiment = {"version": "0.0.5", "reader_flow": "article_route", "title": "Title", "promise": "Promise", "sources": [],
            "route": [{"id": "opening", "kind": "beat", "text": "Opening"},
                      {"id": "aside", "kind": "optional_read", "title": "Aside",
                       "standfirst": "Invitation", "reading_time": "30 seconds",
                       "preview": "FIGURE DESCRIPTION", "body": "HIDDEN BODY"},
                      {"id": "ending", "kind": "beat", "text": "Ending"}],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}]}
        profile = ReaderProfile("one", "read", "reader", "payoff")
        requests = []

        def decide(profile, condition, stage, visible, choices, attempts, history):
            requests.append((stage, visible))
            return decision({"aside:inline-choice": "defer_to_end", "ending": "stop_satisfied",
                             "aside:terminal-choice": "skip"}.get(stage, "read_closely"))

        run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        inline = next(visible for stage, visible in requests if stage == "aside:inline-choice")
        self.assertIn("FIGURE DESCRIPTION", inline)
        self.assertNotIn("HIDDEN BODY", inline)

    def test_satisfied_reader_who_reaches_end_can_still_choose_deferred_aside(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title",
            "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "optional", "kind": "optional_read", "title": "Optional",
                 "standfirst": "Invitation", "reading_time": "30 seconds", "body": "Hidden"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}],
        }
        profile = ReaderProfile("one", "read", "reader", "payoff")
        seen = []
        def decide(profile, condition, stage, visible, choices, attempts, history):
            seen.append(stage)
            return decision({
                "optional:inline-choice": "defer_to_end", "ending": "stop_satisfied",
                "optional:terminal-choice": "read", "optional:read-effect": "maintained",
            }.get(stage, "read_closely"))

        report = run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        self.assertIn("optional:terminal-choice", seen)
        self.assertIn("optional:body-terminal", report["journeys"][0]["exposed_pieces"])
        self.assertTrue(any(event.get("origin") == "deferred_reoffer" and
                            event["type"] == "terminal_offer" for event in report["journeys"][0]["events"]))

    def test_reader_who_leaves_before_aside_gets_an_unseen_end_offer(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "Title",
            "promise": "Promise", "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "Opening"},
                {"id": "optional", "kind": "optional_read", "title": "Optional",
                 "standfirst": "Invitation", "reading_time": "30 seconds", "body": "Hidden"},
                {"id": "ending", "kind": "beat", "text": "Ending"},
            ],
            "conditions": [{"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}],
        }
        profile = ReaderProfile("one", "read", "reader", "payoff")
        seen = []

        def decide(profile, condition, stage, visible, choices, attempts, history):
            seen.append(stage)
            return decision("leave_lost_interest" if stage == "opening" else "skip")

        report = run_experiment(experiment, (profile,), decide_fn=decide, max_calls=10, max_usd=1)
        self.assertEqual(seen, ["opening", "optional:terminal-choice"])
        self.assertFalse(report["journeys"][0]["reached_aside"])
        self.assertIsNone(report["journeys"][0]["aside_choice"])
        self.assertTrue(any(event.get("origin") == "first_offer_unseen" and
                            event["type"] == "terminal_offer" for event in report["journeys"][0]["events"]))

    def test_optional_read_policy_controls_exposure_and_deferred_reading(self) -> None:
        experiment = {
            "version": "0.0.5", "reader_flow": "article_route", "title": "A title", "promise": "A promise",
            "sources": [],
            "route": [
                {"id": "opening", "kind": "beat", "text": "OPENING"},
                {"id": "optional", "kind": "optional_read", "title": "Invitation",
                 "standfirst": "A reason to open", "reading_time": "30 seconds", "body": "SECRET ASIDE"},
                {"id": "ending", "kind": "beat", "text": "ENDING"},
            ],
            "conditions": [{"id": "core_only", "optional_reads": "omit"},
                           {"id": "asides_in_flow", "optional_reads": "inline"},
                           {"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}],
        }
        profiles = tuple(ReaderProfile(name, "read", "reader", "payoff") for name in ("now", "later", "skip"))
        seen = []

        def decide(profile, condition, stage, visible, choices, max_attempts, history):
            seen.append((profile.id, condition, stage, visible))
            if stage == "optional:inline-choice":
                return decision("read_now" if profile.id == "now" else "defer_to_end")
            if stage == "optional:terminal-choice":
                return decision("read" if profile.id == "later" else "skip")
            if stage == "optional:read-effect":
                return decision("maintained")
            return decision("read_closely")

        report = run_experiment(experiment, profiles, decide_fn=decide, max_calls=100, max_usd=1)
        by_reader = {(item["reader"], item["condition"]): item for item in report["journeys"]}
        self.assertNotIn("SECRET ASIDE", " ".join(v for _, c, _, v in seen if c == "core_only"))
        self.assertIn("SECRET ASIDE", " ".join(v for n, c, _, v in seen if c == "optional_with_defer" and n == "now"))
        self.assertNotIn("SECRET ASIDE", " ".join(v for n, c, s, v in seen
                                                   if c == "optional_with_defer" and n == "later" and
                                                   s not in {"optional:terminal-choice", "optional:read-effect"}))
        self.assertTrue(any(event.get("origin") == "deferred_reoffer" and event["type"] == "terminal_offer"
                            for event in by_reader["later", "optional_with_defer"]["events"]))
        self.assertTrue(any(event.get("origin") == "deferred_reoffer" and event["type"] == "terminal_offer"
                            for event in by_reader["skip", "optional_with_defer"]["events"]))

    def test_manifest_rejects_source_drift_before_a_paid_call(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "article.md"
            source.write_text("original", encoding="utf-8")
            manifest = Path(directory) / "experiment.json"
            manifest.write_text('{"version":"0.0.5","reader_flow":"article_route",'
                                '"title":"A","promise":"B",'
                                '"sources":[{"path":"article.md","sha256":"' + "0" * 64 + '"}],'
                                '"route":[{"id":"opening","kind":"beat","text":"original"}],'
                                '"conditions":[{"id":"core_only","optional_reads":"omit"}]}', encoding="utf-8")
            with self.assertRaisesRegex(SourceError, "source hash"):
                load_experiment(manifest)

    def test_manifest_rejects_non_string_source_fields(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            manifest = Path(directory) / "experiment.json"
            for source_record in ({"path": None, "sha256": "0" * 64},
                                  {"path": "article.md", "sha256": None}):
                manifest.write_text(json.dumps({
                    "version": "0.0.5", "reader_flow": "article_route", "title": "A", "promise": "B",
                    "sources": [source_record],
                    "route": [{"id": "opening", "kind": "beat", "text": "Text"}],
                    "conditions": [{"id": "core_only", "optional_reads": "omit"}],
                }), encoding="utf-8")
                with self.assertRaisesRegex(SourceError, "source path or hash"):
                    load_experiment(manifest)

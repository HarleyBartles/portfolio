from __future__ import annotations

import contextlib
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel import PanelError, main, run_panel  # noqa: E402
from reader_panel_decisions import Decision, DecisionError  # noqa: E402
from reader_panel_report import render_panel  # noqa: E402
from reader_panel_source import Article, Beat, ReaderProfile  # noqa: E402


PROFILES = (
    ReaderProfile("peer", "evaluate", "engineer", "mechanism"),
    ReaderProfile("newcomer", "learn", "new reader", "context"),
)


def article(name: str, count: int = 3) -> Article:
    beats = tuple(Beat(n, f"Beat {n}", " ".join(f"Visible {i}." for i in range(n + 1))) for n in range(count))
    return Article(Path(name), "Title", "Promise", beats, name)


def choice(value: str, cost: float = 0.00001) -> Decision:
    return Decision(value, {value: 1.0}, cost, 30, "typesafe/jev-1.13-20260917")


class ReaderPanelTests(unittest.TestCase):
    def test_large_archetype_catalogue_still_allows_a_selected_small_read(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            article_file = root / "article.md"
            article_file.write_text('---\nsummary: "A choice."\n---\n# Test article\n\nBody.\n', encoding="utf-8")
            catalogue = root / "archetypes.json"
            catalogue.write_text(json.dumps([
                {"id": f"motive-{number}", "arrival_intent": "read", "background": "reader",
                 "desired_payoff": "insight", "drawn_in_by": "detail", "put_off_by": "hype"}
                for number in range(101)
            ]), encoding="utf-8")
            output = io.StringIO()
            with patch("reader_panel.ARCHETYPE_POOL", catalogue), contextlib.redirect_stdout(output):
                main(["--article", str(article_file), "--allow-external-source",
                      "--profile-file", str(catalogue), "--profiles", "motive-0,motive-1", "--check"],
                     environ={}, decision_fn=lambda *_: self.fail("dry run sent a call"))
        self.assertIn("2 profiles", output.getvalue())

    def test_check_displays_the_selected_archetype_allocation(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / "article.md"
            source.write_text('---\nsummary: "A decision."\n---\n# Test article\n\nAn opening.\n', encoding="utf-8")
            profile_file = Path(temporary) / "cohort.json"
            profile_file.write_text(json.dumps([
                {"id": f"craft-{n}", "archetype_id": "craft-admirer", "arrival_intent": "inspect form",
                 "background": "maker", "desired_payoff": "reason", "drawn_in_by": "detail", "put_off_by": "hype"}
                for n in range(6)
            ] + [
                {"id": f"story-{n}", "archetype_id": "story-first", "arrival_intent": "follow change",
                 "background": "reader", "desired_payoff": "turn", "drawn_in_by": "scene", "put_off_by": "lecture"}
                for n in range(4)
            ]), encoding="utf-8")
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                main(["--article", str(source), "--profile-file", str(profile_file),
                      "--allow-external-source", "--check"],
                     environ={}, decision_fn=lambda *_: self.fail("dry run sent a call"))
        self.assertIn("craft-admirer: 6", output.getvalue())
        self.assertIn("story-first: 4", output.getvalue())

    def test_report_fingerprints_the_exact_frozen_reader_definitions(self) -> None:
        first = run_panel((article("a.md", 1),), PROFILES,
                          decide_fn=lambda *_: choice("skim"), max_calls=2, max_usd=1)
        paired = run_panel((article("a.md", 1), article("b.md", 1)), PROFILES,
                           decide_fn=lambda *_: choice("skim"), max_calls=4, max_usd=1)
        changed = (ReaderProfile("peer", "evaluate", "engineer", "different mechanism"), PROFILES[1])
        different = run_panel((article("a.md", 1),), changed,
                              decide_fn=lambda *_: choice("skim"), max_calls=2, max_usd=1)
        self.assertEqual(first.cohort_sha256, paired.cohort_sha256)
        self.assertEqual(len(first.cohort_sha256), 64)
        self.assertNotEqual(first.cohort_sha256, different.cohort_sha256)

    def test_cohort_report_groups_reader_decisions_with_active_denominators(self) -> None:
        readers = (
            ReaderProfile("peer-r01", "test", "engineer", "evidence", "proof", "hype", "peer"),
            ReaderProfile("peer-r02", "test", "engineer", "evidence", "proof", "hype", "peer"),
            ReaderProfile("lead-r01", "decide", "lead", "trade-off", "cost", "hype", "lead"),
        )

        def fake(profile, source, beat, max_attempts):
            if profile.id == "peer-r01" and beat.index == 0:
                return choice("leave_lost_interest")
            return choice("read_closely")

        report = run_panel((article("a.md", 2),), readers, decide_fn=fake, max_calls=6, max_usd=1)
        self.assertEqual(report.observations[0].archetype_id, "peer")
        rendered = render_panel(report)
        self.assertIn("peer (1/2 readers responded): read closely: 1", rendered)
        self.assertIn("lead (1/1 readers responded): read closely: 1", rendered)

    def test_partial_budget_does_not_shrink_cohort_denominator(self) -> None:
        readers = tuple(ReaderProfile(f"peer-r0{n}", "test", "engineer", "evidence",
                                      "proof", "hype", "peer") for n in range(1, 4))
        report = run_panel((article("a.md", 1),), readers,
                           decide_fn=lambda *_: choice("skim"), max_calls=1, max_usd=1)
        self.assertIn("peer (1/3 readers responded)", render_panel(report))

    def test_terminal_choices_stop_only_their_profile_and_satisfied_is_distinct(self) -> None:
        calls = []

        def fake(profile, source, beat, max_attempts):
            calls.append((profile.id, beat.index))
            if beat.index == 0 and profile.id == "peer":
                return choice("stop_satisfied")
            return choice("skim" if beat.index < 2 else "leave_lost_interest")

        report = run_panel((article("a.md"),), PROFILES, decide_fn=fake, max_calls=6, max_usd=1)
        self.assertEqual(calls, [("peer", 0), ("newcomer", 0), ("newcomer", 1), ("newcomer", 2)])
        self.assertEqual(report.observations[0].choice, "stop_satisfied")
        self.assertIn("stop satisfied", render_panel(report).lower())
        self.assertNotIn("winner", render_panel(report).lower())

    def test_a_b_uses_same_profiles_and_never_aligns_unequal_beats(self) -> None:
        calls = []

        def fake(profile, source, beat, max_attempts):
            calls.append((source.sha256, profile.id, beat.index, beat.visible_prefix))
            return choice("read_closely")

        report = run_panel((article("a.md", 2), article("b.md", 3)), PROFILES,
                           decide_fn=fake, max_calls=10, max_usd=1)
        self.assertEqual(len(calls), 10)
        self.assertFalse(report.comparable_beats)
        self.assertEqual(calls[0][3], "Visible 0.")
        self.assertNotIn("Visible 1.", calls[0][3])
        self.assertEqual({profile for name, profile, _, _ in calls if name == "a.md"}, {"peer", "newcomer"})
        self.assertEqual({profile for name, profile, _, _ in calls if name == "b.md"}, {"peer", "newcomer"})

    def test_call_and_spend_caps_stop_without_extra_paid_call(self) -> None:
        calls = []

        def fake(profile, source, beat, max_attempts):
            calls.append(beat.index)
            return choice("skim", 0.02)

        limited = run_panel((article("a.md"),), PROFILES, decide_fn=fake, max_calls=1, max_usd=1)
        self.assertEqual(len(calls), 1)
        self.assertTrue(limited.limitations)
        calls.clear()
        spent = run_panel((article("a.md"),), PROFILES, decide_fn=fake, max_calls=10, max_usd=0.02)
        self.assertEqual(len(calls), 1)
        self.assertTrue(spent.limitations)
        calls.clear()
        preflight = run_panel((article("a.md"),), PROFILES, decide_fn=fake, max_calls=10, max_usd=0.0000000001)
        self.assertEqual(calls, [])
        self.assertTrue(preflight.limitations)

    def test_transport_retries_consume_the_wire_call_cap(self) -> None:
        budgets = []

        def fake(profile, source, beat, max_attempts):
            budgets.append(max_attempts)
            return Decision("skim", {"skim": 1.0}, 0.00001, 30,
                            "typesafe/jev-1.13-20260917", attempts=2)

        report = run_panel((article("a.md"),), PROFILES, decide_fn=fake, max_calls=2, max_usd=1)
        self.assertEqual(budgets, [2])
        self.assertEqual(report.calls, 2)
        self.assertTrue(report.limitations)

    def test_decision_failure_is_reported_after_a_possible_paid_attempt(self) -> None:
        def fails(profile, source, beat, max_attempts):
            raise DecisionError("Decision response lacked a valid usage cost")

        report = run_panel((article("a.md"),), PROFILES, decide_fn=fails, max_calls=10, max_usd=1)
        self.assertEqual(report.calls, 1)
        self.assertEqual(report.observations, ())
        self.assertIn("usage cost", report.limitations[0])

    def test_check_mode_has_no_key_or_network_and_scales_to_100_profiles(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "article.md"
            source.write_text('---\nsummary: "Promise"\n---\n# Title\n\nBody.\n', encoding="utf-8")
            profiles = root / "profiles.json"
            archetypes = (
                "story-first", "craft-admirer", "cultural-magpie", "curious-outsider",
                "human-stakes", "fellow-mistake-maker", "hype-weary", "model-builder",
                "hiring-evaluator", "jaded-architect",
            )
            profiles.write_text(json.dumps([
                {"id": f"p{n}", "archetype_id": archetypes[n // 10], "arrival_intent": "read",
                 "background": "reader", "desired_payoff": "insight",
                 "drawn_in_by": "evidence", "put_off_by": "hype"}
                for n in range(100)
            ]), encoding="utf-8")

            class NoKey(dict):
                def get(self, key, default=None):
                    raise AssertionError("check mode read environment")

            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                result = main(["--article", str(source), "--profile-file", str(profiles),
                               "--allow-external-source", "--check"], environ=NoKey(),
                              decision_fn=lambda *_: self.fail("check mode sent a call"))
            self.assertEqual(result, 0)
            self.assertIn("100 profiles", output.getvalue())
            self.assertIn("jaded-architect: 10", output.getvalue())
            self.assertIn("0 remote calls", output.getvalue())
            self.assertIn("input tokens", output.getvalue())

    def test_apply_requires_key_and_limits_before_a_call(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            source = Path(temporary) / "article.md"
            source.write_text('---\nsummary: "Promise"\n---\n# Title\n\nBody.\n', encoding="utf-8")
            for extra, environment in (([], {}), (["--max-calls", "1", "--max-usd", "0.01"], {})):
                with self.subTest(extra=extra), self.assertRaises(PanelError):
                    main(["--article", str(source), "--allow-external-source", "--apply", *extra],
                         environ=environment, decision_fn=lambda *_: self.fail("unexpected call"))

    def test_report_stays_in_scratch_and_excludes_full_draft_and_secret(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "article.md"
            source.write_text('---\nsummary: "Promise"\n---\n# Title\n\nPRIVATE ARTICLE BODY.\n', encoding="utf-8")
            scratch = root / "scratch"
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                result = main(["--article", str(source), "--allow-external-source", "--apply",
                               "--max-calls", "1", "--max-usd", "0.01"],
                              environ={"OPENROUTER_API_KEY": "PRIVATE KEY"},
                              decision_fn=lambda *_: choice("stop_satisfied"),
                              workspace_resolver=lambda: scratch)
            self.assertEqual(result, 0)
            report = next(scratch.glob("*.json")).read_text(encoding="utf-8")
            self.assertNotIn("PRIVATE ARTICLE BODY", report + output.getvalue())
            self.assertNotIn("PRIVATE KEY", report + output.getvalue())
            with self.assertRaises(PanelError):
                main(["--article", str(source), "--allow-external-source", "--apply",
                      "--max-calls", "1", "--max-usd", "0.01", "--output", str(root / "unsafe.json")],
                     environ={"OPENROUTER_API_KEY": "PRIVATE KEY"},
                     decision_fn=lambda *_: self.fail("unsafe output should prevent call"),
                     workspace_resolver=lambda: scratch)

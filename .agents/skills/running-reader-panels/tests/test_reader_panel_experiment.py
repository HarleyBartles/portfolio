from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_experiment import load_experiment, run_experiment  # noqa: E402
from reader_panel_source import ReaderProfile, SourceError  # noqa: E402
from reader_panel_decisions import Decision  # noqa: E402


def decision(value: str) -> Decision:
    return Decision(value, {value: 1.0}, 0.00001, 10, "typesafe/jev-1.13-20260917")


class ExperimentTests(unittest.TestCase):
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

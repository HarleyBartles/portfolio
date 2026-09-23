from __future__ import annotations

import json
import re
import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_cohort import CohortError, expand_profiles, main  # noqa: E402
from reader_panel_source import load_profiles  # noqa: E402


ASSETS = Path(__file__).resolve().parents[1] / "assets"


class ReaderCohortTests(unittest.TestCase):
    def test_ten_rich_archetypes_become_100_distinct_grouped_readers(self) -> None:
        parents = load_profiles(ASSETS / "reader-intents-rich.json", None)
        cohort = expand_profiles(parents)
        self.assertEqual(len(cohort), 100)
        self.assertEqual(len({reader.id for reader in cohort}), 100)
        self.assertEqual([reader.archetype_id for reader in cohort[10:20]], ["sceptical-senior"] * 10)
        self.assertEqual(len({reader.drawn_in_by for reader in cohort[:10]}), 10)
        self.assertEqual(len({reader.put_off_by for reader in cohort[:10]}), 10)
        self.assertTrue(all(reader.arrival_intent == parents[index // 10].arrival_intent
                            for index, reader in enumerate(cohort)))
        self.assertTrue(all(not re.search(r"\b(skim|read_closely|leave_lost_interest|stop_satisfied)\b",
                                          f"{reader.drawn_in_by} {reader.put_off_by}", re.I)
                            for reader in cohort))

    def test_cohort_requires_ten_rich_archetypes(self) -> None:
        rich = load_profiles(ASSETS / "reader-intents-rich.json", None)
        sparse = load_profiles(ASSETS / "reader-intents.json", None)
        with self.assertRaises(CohortError):
            expand_profiles(rich[:9])
        with self.assertRaises(CohortError):
            expand_profiles(sparse)

    def test_curated_archetype_pool_preserves_the_pilot_and_has_distinct_arrival_questions(self) -> None:
        pilot = load_profiles(ASSETS / "reader-intents-rich.json", None)
        pool = load_profiles(ASSETS / "reader-archetypes.json", None)
        self.assertEqual(len(pool), 34)
        self.assertEqual(pool[:10], pilot)
        self.assertEqual(len({reader.arrival_intent for reader in pool}), len(pool))
        self.assertEqual(len({reader.desired_payoff for reader in pool}), len(pool))
        self.assertTrue(all(reader.drawn_in_by and reader.put_off_by for reader in pool))
        self.assertTrue(all(not re.search(r"\b(skim|read_closely|leave_lost_interest|stop_satisfied)\b",
                                          f"{reader.drawn_in_by} {reader.put_off_by}", re.I)
                            for reader in pool))

    def test_skill_points_to_the_curated_pool_without_replacing_the_default(self) -> None:
        skill = (ASSETS.parent / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("assets/reader-archetypes.json", skill)
        self.assertIn("assets/reader-intents-rich.json", skill)

    def test_check_sends_nothing_and_apply_writes_reloadable_cohort_off_repo(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            workspace = Path(temporary) / "scratch"
            output = workspace / "cohort.json"
            arguments = ["--profile-file", str(ASSETS / "reader-intents-rich.json"),
                         "--output", str(output)]
            self.assertEqual(main(arguments + ["--check"], workspace_resolver=lambda: workspace), 0)
            self.assertFalse(output.exists())
            self.assertEqual(main(arguments + ["--apply"], workspace_resolver=lambda: workspace), 0)
            saved = load_profiles(output, None)
            self.assertEqual(len(saved), 100)
            self.assertEqual(saved[0].archetype_id, "engineering-peer")
            self.assertEqual(len(json.loads(output.read_text(encoding="utf-8"))), 100)

    def test_ten_named_archetypes_can_be_selected_from_the_larger_pool(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            workspace = Path(temporary) / "scratch"
            output = workspace / "selected.json"
            ids = ["junior-engineer", "principal-architect", "platform-engineer",
                   "test-engineer", "appsec-reviewer", "engineering-director",
                   "product-manager", "technical-recruiter", "design-reader",
                   "curious-nontechnical"]
            arguments = ["--profile-file", str(ASSETS / "reader-archetypes.json"),
                         "--archetypes", ",".join(ids), "--output", str(output), "--apply"]
            self.assertEqual(main(arguments, workspace_resolver=lambda: workspace), 0)
            readers = load_profiles(output, None)
            self.assertEqual(len(readers), 100)
            self.assertEqual({reader.archetype_id for reader in readers}, set(ids))
            self.assertEqual([reader.archetype_id for reader in readers[:10]], [ids[0]] * 10)

    def test_apply_rejects_output_outside_scratch(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            with self.assertRaises(CohortError):
                main(["--profile-file", str(ASSETS / "reader-intents-rich.json"),
                      "--output", str(root / "outside.json"), "--apply"],
                     workspace_resolver=lambda: root / "scratch")
            self.assertFalse((root / "outside.json").exists())

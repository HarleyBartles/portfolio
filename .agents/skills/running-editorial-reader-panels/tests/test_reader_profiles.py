from __future__ import annotations

import contextlib
import io
import re
import sys
import unittest
from pathlib import Path


SKILL = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SKILL / "scripts"))

from reader_panel import main  # noqa: E402
from reader_panel_source import load_profiles  # noqa: E402


class StoredReaderProfileTests(unittest.TestCase):
    def test_working_archetypes_have_distinct_motives_and_balanced_constraints(self) -> None:
        pool = load_profiles(SKILL / "assets/reader-archetypes.json", None)
        self.assertEqual(len(pool), 14)
        self.assertEqual(len({reader.arrival_intent for reader in pool}), len(pool))
        self.assertEqual(len({reader.desired_payoff for reader in pool}), len(pool))
        self.assertTrue(all(reader.drawn_in_by and reader.put_off_by for reader in pool))

    def test_craft_admirer_readers_are_authored_and_share_one_parent(self) -> None:
        readers = load_profiles(SKILL / "assets/reader-profiles/craft-admirer.json", None)
        self.assertEqual(len(readers), 10)
        self.assertEqual({reader.archetype_id for reader in readers}, {"craft-admirer"})
        self.assertEqual(len({reader.id for reader in readers}), 10)
        self.assertEqual(len({reader.desired_payoff for reader in readers}), 10)
        self.assertEqual(len({reader.drawn_in_by for reader in readers}), 10)
        self.assertEqual(len({reader.put_off_by for reader in readers}), 10)
        self.assertTrue(all(not re.search(r"\b(skim|read_closely|leave_lost_interest|stop_satisfied)\b",
                                          f"{reader.drawn_in_by} {reader.put_off_by}", re.I)
                            for reader in readers))

    def test_stored_readers_can_be_checked_without_generated_cohort_or_remote_call(self) -> None:
        article = Path(__file__).resolve().parents[4] / (
            "src/client/src/data/content/writing/"
            "2026-09-03-how-the-invisibles-logo-designer-influenced-the-usual-specialists.md"
        )
        profiles = SKILL / "assets/reader-profiles/craft-admirer.json"
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            result = main(["--article", str(article), "--profile-file", str(profiles), "--check"],
                          environ={}, decision_fn=lambda *_: self.fail("check mode sent a call"))
        self.assertEqual(result, 0)
        self.assertIn("10 profiles", output.getvalue())
        self.assertIn("0 remote calls", output.getvalue())

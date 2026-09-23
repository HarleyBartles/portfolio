from __future__ import annotations

import sys
import unittest
from pathlib import Path


SKILL = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SKILL / "scripts"))

from reader_panel_source import load_profiles  # noqa: E402


class StoredReaderProfileTests(unittest.TestCase):
    def test_working_archetypes_have_distinct_motives_and_balanced_constraints(self) -> None:
        pool = load_profiles(SKILL / "assets/reader-archetypes.json", None, max_profiles=None)
        self.assertGreaterEqual(len(pool), 15)
        self.assertIn("hiring-evaluator", {reader.id for reader in pool})
        self.assertIn("jaded-architect", {reader.id for reader in pool})
        self.assertEqual(len({reader.arrival_intent for reader in pool}), len(pool))
        self.assertEqual(len({reader.desired_payoff for reader in pool}), len(pool))
        self.assertTrue(all(reader.drawn_in_by and reader.put_off_by for reader in pool))

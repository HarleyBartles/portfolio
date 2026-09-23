from __future__ import annotations

import contextlib
import io
import re
import sys
import tempfile
import unittest
from pathlib import Path


SKILL = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SKILL / "scripts"))

from reader_panel import main  # noqa: E402
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

    def test_hughes_run_example_is_authored_and_shares_one_parent(self) -> None:
        readers = load_profiles(SKILL / "examples/hughes-craft-readers.json", None)
        self.assertEqual(len(readers), 10)
        self.assertEqual({reader.archetype_id for reader in readers}, {"craft-admirer"})
        self.assertEqual(len({reader.id for reader in readers}), 10)
        self.assertEqual(len({reader.desired_payoff for reader in readers}), 10)
        self.assertEqual(len({reader.drawn_in_by for reader in readers}), 10)
        self.assertEqual(len({reader.put_off_by for reader in readers}), 10)
        self.assertTrue(all(not re.search(r"\b(skim|read_closely|leave_lost_interest|stop_satisfied)\b",
                                          f"{reader.drawn_in_by} {reader.put_off_by}", re.I)
                            for reader in readers))

    def test_article_specific_example_can_be_checked_without_remote_call(self) -> None:
        profiles = SKILL / "examples/hughes-craft-readers.json"
        output = io.StringIO()
        with tempfile.TemporaryDirectory() as temporary:
            article = Path(temporary) / "sample.md"
            article.write_text('---\nsummary: "A maker chooses a form."\n---\n# A making story\n\n'
                               'Several alternatives made the final choice possible.\n', encoding="utf-8")
            with contextlib.redirect_stdout(output):
                result = main(["--article", str(article), "--profile-file", str(profiles),
                               "--allow-external-source", "--check"],
                              environ={}, decision_fn=lambda *_: self.fail("check mode sent a call"))
        self.assertEqual(result, 0)
        self.assertIn("10 profiles", output.getvalue())
        self.assertIn("0 remote calls", output.getvalue())

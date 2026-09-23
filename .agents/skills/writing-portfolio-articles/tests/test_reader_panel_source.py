from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_source import SourceError, load_profiles, parse_article  # noqa: E402


class ReaderPanelSourceTests(unittest.TestCase):
    def test_sections_exclude_future_text_and_fenced_headings(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text(
                '---\ntitle: "A story"\nsummary: "A useful promise."\n---\n'
                '# A story\n\nOpening evidence.\n\n## First\nFirst section.\n'
                '```md\n## Not a section\n```\n\n## Second\nSecond section.\n',
                encoding="utf-8",
            )
            article = parse_article(path)

        self.assertEqual(article.title, "A story")
        self.assertEqual(article.promise, "A useful promise.")
        self.assertEqual([beat.heading for beat in article.beats], ["Opening", "First", "Second"])
        self.assertNotIn("First section", article.beats[0].visible_prefix)
        self.assertNotIn("Second section", article.beats[1].visible_prefix)
        self.assertIn("## Not a section", article.beats[1].visible_prefix)
        self.assertIn("Second section", article.beats[2].visible_prefix)
        self.assertNotIn("summary:", article.beats[0].visible_prefix)

    def test_article_without_sections_has_one_beat(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\nBody.\n', encoding="utf-8")
            article = parse_article(path)
        self.assertEqual(len(article.beats), 1)
        self.assertEqual(article.beats[0].visible_prefix, "Body.")

    def test_empty_missing_promise_and_oversize_sources_fail(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            for body in ("", "# Title\n\nBody.", '---\nsummary: "Promise"\n---\n# Title'):
                path.write_text(body, encoding="utf-8")
                with self.subTest(body=body), self.assertRaises(SourceError):
                    parse_article(path)
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\n' + "x" * 250_000, encoding="utf-8")
            with self.assertRaises(SourceError):
                parse_article(path)

    def test_profile_selection_and_invalid_profiles(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "profiles.json"
            path.write_text(
                '[{"id":"peer","arrival_intent":"review","background":"engineer","desired_payoff":"insight"},'
                '{"id":"newcomer","arrival_intent":"learn","background":"reader","desired_payoff":"context"}]',
                encoding="utf-8",
            )
            self.assertEqual([p.id for p in load_profiles(path, ("newcomer",))], ["newcomer"])
            with self.assertRaises(SourceError):
                load_profiles(path, ("unknown",))
            path.write_text(path.read_text(encoding="utf-8").replace('"newcomer"', '"peer"'), encoding="utf-8")
            with self.assertRaises(SourceError):
                load_profiles(path, None)
            path.write_text(
                "[" + ",".join(
                    '{"id":"p%d","arrival_intent":"a","background":"b","desired_payoff":"c"}' % n
                    for n in range(101)
                ) + "]",
                encoding="utf-8",
            )
            with self.assertRaises(SourceError):
                load_profiles(path, None)

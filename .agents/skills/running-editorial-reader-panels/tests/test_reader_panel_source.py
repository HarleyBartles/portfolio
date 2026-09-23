from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_source import ReaderProfile, SourceError, load_profiles, parse_article, validate_cohort  # noqa: E402


class ReaderPanelSourceTests(unittest.TestCase):
    def test_mixed_full_quorum_accepts_ten_per_selected_archetype(self) -> None:
        known = {f"motive-{index}" for index in range(12)}
        readers = tuple(
            ReaderProfile(f"reader-{group}-{number}", "question", "background", "payoff",
                          "drawn in", "put off", f"motive-{group}")
            for group in range(10) for number in range(10)
        )
        self.assertEqual(validate_cohort(readers, known), readers)

    def test_quorum_rejects_unknown_or_overallocated_archetype(self) -> None:
        known = {"craft-admirer"}

        def reader(number: int, archetype: str) -> ReaderProfile:
            return ReaderProfile(f"reader-{number}", "question", "background", "payoff",
                                 "drawn in", "put off", archetype)

        with self.assertRaisesRegex(SourceError, "unknown archetype"):
            validate_cohort((reader(0, "invented"),), known)
        with self.assertRaisesRegex(SourceError, "ten readers"):
            validate_cohort(tuple(reader(number, "craft-admirer") for number in range(11)), known)

    def test_quorum_does_not_mix_labelled_and_unlabelled_readers(self) -> None:
        labelled = ReaderProfile("one", "question", "background", "payoff", "yes", "no", "craft-admirer")
        unlabelled = ReaderProfile("two", "question", "background", "payoff")
        with self.assertRaisesRegex(SourceError, "archetype"):
            validate_cohort((labelled, unlabelled), {"craft-admirer"})
        self.assertEqual(validate_cohort((unlabelled,), {"craft-admirer"}), (unlabelled,))

    def test_rich_profiles_keep_the_sparse_ids_and_add_balanced_constraints(self) -> None:
        assets = Path(__file__).resolve().parents[1] / "assets"
        sparse = load_profiles(assets / "reader-intents.json", None)
        rich = load_profiles(assets / "reader-intents-rich.json", None)
        self.assertEqual([profile.id for profile in rich], [profile.id for profile in sparse])
        self.assertTrue(all(profile.drawn_in_by and profile.put_off_by for profile in rich))
        self.assertTrue(all(not profile.drawn_in_by and not profile.put_off_by for profile in sparse))

    def test_optional_reader_constraints_are_a_pair_and_bounded(self) -> None:
        base = {"id": "peer", "arrival_intent": "review", "background": "engineer", "desired_payoff": "insight"}
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "profiles.json"
            for extra in ({"drawn_in_by": "evidence"}, {"put_off_by": "hype"},
                          {"drawn_in_by": "evidence", "put_off_by": " "},
                          {"drawn_in_by": "x" * 501, "put_off_by": "hype"},
                          {"drawn_in_by": "evidence", "put_off_by": "hype", "unknown": "x"}):
                path.write_text(json.dumps([base | extra]), encoding="utf-8")
                with self.subTest(extra=extra), self.assertRaises(SourceError):
                    load_profiles(path, None)
            path.write_text(json.dumps([base | {"drawn_in_by": "evidence", "put_off_by": "hype"}]), encoding="utf-8")
            self.assertEqual(load_profiles(path, None)[0].drawn_in_by, "evidence")

    def test_stored_reader_retains_archetype_identity_without_sending_it_as_persona(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "cohort.json"
            path.write_text(json.dumps([{ "id": "peer-r01", "archetype_id": "peer",
                "arrival_intent": "review", "background": "engineer", "desired_payoff": "insight",
                "drawn_in_by": "evidence", "put_off_by": "hype" }]), encoding="utf-8")
            self.assertEqual(load_profiles(path, None)[0].archetype_id, "peer")

    def test_sections_exclude_future_text_and_fenced_headings(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text(
                '---\ntitle: "A story"\nsummary: "A useful promise."\n---\n'
                '# A story\n\n' + ('Opening evidence with enough context to judge the invitation. ' * 8) + '\n\n## First\nFirst section.\n'
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

    def test_short_article_without_sections_has_one_beat(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\nBody.\n', encoding="utf-8")
            article = parse_article(path)
        self.assertEqual(len(article.beats), 1)
        self.assertEqual(article.beats[0].visible_prefix, "Body.")

    def test_trailing_blank_lines_do_not_create_an_empty_passage(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\n' + ('A substantial paragraph. ' * 70)
                            + '\n\n\n', encoding="utf-8")
            article = parse_article(path)
        self.assertEqual(len(article.beats), 1)

    def test_unheaded_long_form_uses_paragraph_boundaries_for_future_blind_beats(self) -> None:
        paragraphs = [f"Paragraph {n}. " + (f"Sentence {n} explains a different part of the story. " * 18)
                      for n in range(1, 5)]
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\n' + '\n\n'.join(paragraphs), encoding="utf-8")
            article = parse_article(path)
        self.assertGreater(len(article.beats), 1)
        self.assertEqual(article.beats[-1].visible_prefix, '\n\n'.join(paragraphs).strip())
        self.assertIn(paragraphs[0], article.beats[0].visible_prefix)
        self.assertNotIn(paragraphs[-1], article.beats[0].visible_prefix)
        self.assertEqual([beat.visible_prefix.count("Paragraph") for beat in article.beats], [2, 4])

    def test_tiny_opening_is_not_a_standalone_abandonment_point(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text('---\nsummary: "Promise"\n---\n# Title\n\nProbably something like this.\n\n'
                            '## First question\nThe first substantive answer.\n\n## Second question\nAnother answer.\n',
                            encoding="utf-8")
            article = parse_article(path)
        self.assertEqual([beat.heading for beat in article.beats], ["First question", "Second question"])
        self.assertEqual(article.promise, "Promise\nProbably something like this.")
        self.assertNotIn("Probably something like this.", article.beats[0].visible_prefix)
        self.assertIn("The first substantive answer.", article.beats[0].visible_prefix)
        self.assertNotIn("Another answer.", article.beats[0].visible_prefix)

    def test_fenced_h1_does_not_replace_article_title(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "article.md"
            path.write_text(
                '---\nsummary: "Promise"\n---\n```md\n# Example heading\n```\n# Real title\n\nBody.\n',
                encoding="utf-8",
            )
            self.assertEqual(parse_article(path).title, "Real title")

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

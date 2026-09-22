from __future__ import annotations

import importlib.util
import json
import shutil
import sys
import tempfile
import unittest
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
SCRIPT_PATH = SKILL_ROOT / "scripts" / "audit_article_corpus.py"
FIXTURES = Path(__file__).resolve().parent / "fixtures"


def load_audit_module():
    spec = importlib.util.spec_from_file_location("audit_article_corpus", SCRIPT_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {SCRIPT_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class ArticleAuditTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.audit = load_audit_module()

    def test_article_report_excludes_frontmatter_and_reports_structure(self) -> None:
        report = self.audit.audit_articles(
            FIXTURES / "corpus",
            self.audit.AuditThresholds(repeated_phrase_words=4),
        )

        self.assertEqual([article.path for article in report.articles], ["alpha.md", "beta.md"])
        alpha = report.articles[0]
        self.assertEqual(alpha.declared_reading_time, "2 min read")
        self.assertNotIn("Frontmatter", alpha.prose)
        self.assertEqual(alpha.headings, ("A deliberate opening", "A second movement"))
        self.assertEqual(alpha.links, ("https://example.test/evidence",))
        self.assertIn(11, alpha.one_sentence_paragraph_lines)
        self.assertTrue(alpha.paragraph_word_counts)
        self.assertTrue(alpha.sentence_word_counts)

    def test_article_findings_are_stable_located_and_distinguish_heuristics(self) -> None:
        report = self.audit.audit_articles(
            FIXTURES / "corpus",
            self.audit.AuditThresholds(repeated_phrase_words=4),
        )

        ordered = [(finding.path, finding.line, finding.kind) for finding in report.findings]
        self.assertEqual(ordered, sorted(ordered))
        repeated = next(finding for finding in report.findings if finding.kind == "repeated-exact-phrase")
        self.assertEqual(repeated.evidence, "heuristic")
        self.assertGreater(repeated.line, 0)
        self.assertIn("careful mechanism", repeated.context.lower())
        cross_article = next(
            finding
            for finding in report.findings
            if finding.kind == "repeated-exact-phrase" and finding.path == "beta.md"
        )
        self.assertIn("cross article phrase", cross_article.context.lower())
        self.assertEqual(cross_article.term, "one cross article phrase")
        self.assertEqual(cross_article.related_path, "alpha.md")
        self.assertGreater(cross_article.related_line or 0, 0)
        one_sentence = next(finding for finding in report.findings if finding.kind == "one-sentence-paragraph")
        self.assertEqual(one_sentence.evidence, "fact")


class PublicLanguageAuditTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.audit = load_audit_module()

    def test_discovery_is_stable_and_excludes_private_generated_and_test_sources(self) -> None:
        root = FIXTURES / "public-copy"
        paths = [path.relative_to(root).as_posix() for path in self.audit.discover_public_sources(root)]

        self.assertEqual(
            paths,
            ["src/client/index.html", "src/client/src/pages/FixturePage.tsx"],
        )

    def test_language_report_separates_breaches_from_contextual_findings(self) -> None:
        report = self.audit.audit_public_language(FIXTURES / "public-copy")

        breach_terms = [finding.term for finding in report.objective_breaches]
        self.assertEqual(breach_terms.count("fuck"), 2)
        self.assertEqual(breach_terms.count("cunt"), 1)
        contextual_terms = [finding.term for finding in report.occurrences if finding.severity == "contextual-review"]
        self.assertEqual(contextual_terms, ["piss", "shit"])
        self.assertTrue(all(finding.line > 0 and finding.context for finding in report.occurrences))

    def test_report_model_has_no_authorship_rewrite_or_quality_score_surface(self) -> None:
        forbidden = {"ai_probability", "authorship", "rewrite", "quality_score", "score"}
        public_names = set(dir(self.audit.CorpusReport)) | set(dir(self.audit.LanguageReport))
        self.assertTrue(forbidden.isdisjoint(public_names))

    def test_unclassified_public_content_owner_fails_discovery(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            shutil.copytree(FIXTURES / "public-copy" / "src", root / "src")
            unknown = root / "src" / "new-public-owner" / "page.md"
            unknown.parent.mkdir(parents=True)
            unknown.write_text("Public words.", encoding="utf-8")

            with self.assertRaises(self.audit.SourceContractError):
                self.audit.discover_public_sources(root)

    def test_unclassified_client_content_owner_fails_discovery(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            shutil.copytree(FIXTURES / "public-copy" / "src", root / "src")
            unknown = root / "src" / "client" / "published-copy" / "page.md"
            unknown.parent.mkdir(parents=True)
            unknown.write_text("Public words.", encoding="utf-8")

            with self.assertRaises(self.audit.SourceContractError):
                self.audit.discover_public_sources(root)

    def test_unclassified_direct_boundary_files_fail_discovery(self) -> None:
        for relative_path in (Path("src/public-copy.md"), Path("src/client/published-copy.tsx")):
            with self.subTest(relative_path=relative_path.as_posix()), tempfile.TemporaryDirectory() as temporary:
                root = Path(temporary)
                shutil.copytree(FIXTURES / "public-copy" / "src", root / "src")
                unknown = root / relative_path
                unknown.write_text("Public words.", encoding="utf-8")

                with self.assertRaises(self.audit.SourceContractError):
                    self.audit.discover_public_sources(root)

    def test_single_permitted_fuck_is_not_labelled_as_a_breach(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            page = root / "src" / "client" / "src" / "pages" / "Page.tsx"
            page.parent.mkdir(parents=True)
            page.write_text("One earned fuck.", encoding="utf-8")
            (root / "src" / "client" / "index.html").write_text("<main />", encoding="utf-8")

            report = self.audit.audit_public_language(root)
            self.assertFalse(report.objective_breaches)
            self.assertEqual(report.occurrences[0].severity, "observation")
            self.assertIn("observation: fuck", self.audit.render_language_report(report, "text"))

    def test_json_output_is_machine_readable_and_sorted(self) -> None:
        report = self.audit.audit_public_language(FIXTURES / "public-copy")
        rendered = self.audit.render_language_report(report, output_format="json")
        payload = json.loads(rendered)
        locations = [(item["path"], item["line"], item["term"]) for item in payload["occurrences"]]
        self.assertEqual(locations, sorted(locations))


if __name__ == "__main__":
    unittest.main()

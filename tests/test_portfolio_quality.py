from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tools.portfolio_quality import validate_portfolio  # noqa: E402


class PortfolioFixture:
    def __init__(self, root: Path) -> None:
        self.root = root
        self.content = root / "src/client/src/data/content"
        self.public = root / "src/client/public"
        self.docs = root / "docs"
        self.items = [
            {
                "slug": "example-project",
                "kind": "project",
                "title": "Example project",
                "status": "live",
                "summary": "An inspectable example.",
                "path": "projects/example-project.md",
                "tags": ["project"],
                "relatedSlugs": ["example-note"],
            },
            {
                "slug": "example-note",
                "kind": "writing",
                "title": "Example note",
                "status": "published",
                "summary": "A useful note.",
                "date": "2026-08-21",
                "readingMinutes": 4,
                "path": "writing/example-note.md",
                "tags": ["writing"],
                "relatedSlugs": [],
            },
        ]

    def write(self) -> None:
        for item in self.items:
            path = self.content / item["path"]
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(f"# {item['title']}\n", encoding="utf-8")
        self.write_manifest()
        asset = self.public / "media/example.webp"
        asset.parent.mkdir(parents=True, exist_ok=True)
        asset.write_bytes(b"RIFF-owned-image")
        self.docs.mkdir(parents=True, exist_ok=True)
        (self.docs / "asset-custody.md").write_text(
            "- Public file: `src/client/public/media/example.webp`\n",
            encoding="utf-8",
        )
        source = self.root / "src/client/src/example.ts"
        source.parent.mkdir(parents=True, exist_ok=True)
        source.write_text("export const label = 'safe'\n", encoding="utf-8")

    def write_manifest(self) -> None:
        self.content.mkdir(parents=True, exist_ok=True)
        (self.content / "content-manifest.json").write_text(
            json.dumps({"items": self.items}),
            encoding="utf-8",
        )


class PortfolioQualityTests(unittest.TestCase):
    def validate(self, mutate=None) -> list[str]:
        with tempfile.TemporaryDirectory() as temporary:
            fixture = PortfolioFixture(Path(temporary))
            fixture.write()
            if mutate is not None:
                mutate(fixture)
            return [str(finding) for finding in validate_portfolio(fixture.root)]

    def test_clean_portfolio_has_no_findings(self) -> None:
        self.assertEqual([], self.validate())

    def test_manifest_rejects_duplicate_slugs_and_unknown_related_content(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["relatedSlugs"] = ["missing-note"]
            duplicate = dict(fixture.items[1])
            duplicate["slug"] = "Example-Project"
            duplicate["path"] = "writing/duplicate.md"
            fixture.items.append(duplicate)
            fixture.write_manifest()

        findings = self.validate(mutate)

        self.assertTrue(any("duplicate slug" in finding for finding in findings))
        self.assertTrue(any("unknown related slug 'missing-note'" in finding for finding in findings))

    def test_manifest_rejects_invalid_kind_status_date_and_reading_time(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["kind"] = "case-study"
            fixture.items[0]["status"] = "amazing"
            fixture.items[1]["date"] = "21 August"
            fixture.items[1]["readingMinutes"] = 0
            fixture.write_manifest()

        findings = self.validate(mutate)

        self.assertTrue(any("unsupported kind 'case-study'" in finding for finding in findings))
        self.assertTrue(any("unsupported status 'amazing'" in finding for finding in findings))
        self.assertTrue(any("invalid ISO date" in finding for finding in findings))
        self.assertTrue(any("positive integer" in finding for finding in findings))

    def test_manifest_rejects_non_object_entries_and_an_empty_catalog(self) -> None:
        def non_objects(fixture: PortfolioFixture) -> None:
            fixture.items = [None, "not-an-item"]  # type: ignore[list-item]
            fixture.write_manifest()

        malformed_findings = self.validate(non_objects)

        self.assertTrue(any("item 1 must be an object" in finding for finding in malformed_findings))
        self.assertTrue(any("item 2 must be an object" in finding for finding in malformed_findings))

        def empty(fixture: PortfolioFixture) -> None:
            fixture.items = []
            fixture.write_manifest()

        empty_findings = self.validate(empty)

        self.assertTrue(any("items array must not be empty" in finding for finding in empty_findings))
        self.assertTrue(any("not listed in the manifest" in finding for finding in empty_findings))

    def test_manifest_rejects_missing_and_orphaned_markdown(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["path"] = "projects/missing.md"
            fixture.write_manifest()
            orphan = fixture.content / "writing/orphan.md"
            orphan.parent.mkdir(parents=True, exist_ok=True)
            orphan.write_text("# Orphan\n", encoding="utf-8")

        findings = self.validate(mutate)

        self.assertTrue(any("content file does not exist" in finding for finding in findings))
        self.assertTrue(any("not listed in the manifest" in finding for finding in findings))

    def test_manifest_ignores_generated_content_indexes_but_rejects_orphaned_markdown(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            (fixture.content / "INDEX.md").write_text("# Content index\n", encoding="utf-8")
            (fixture.content / "writing/INDEX.md").write_text("# Writing index\n", encoding="utf-8")
            orphan = fixture.content / "writing/orphan.md"
            orphan.write_text("# Orphan\n", encoding="utf-8")

        findings = self.validate(mutate)

        self.assertFalse(any("INDEX.md" in finding for finding in findings))
        self.assertTrue(any("writing/orphan.md" in finding for finding in findings))

    def test_manifest_paths_must_use_posix_separators(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["path"] = "projects\\example-project.md"
            fixture.write_manifest()

        findings = self.validate(mutate)

        self.assertTrue(any("must use POSIX separators" in finding for finding in findings))

    def test_manifest_paths_must_be_canonical_vite_glob_keys(self) -> None:
        for noncanonical_path in ("./projects/example-project.md", "projects//example-project.md"):
            with self.subTest(path=noncanonical_path):
                def mutate(fixture: PortfolioFixture) -> None:
                    fixture.items[0]["path"] = noncanonical_path
                    fixture.write_manifest()

                findings = self.validate(mutate)

                self.assertTrue(any("must be a canonical POSIX path" in finding for finding in findings))

    def test_privacy_scan_rejects_contact_literals_and_private_paths(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.root / "src/client/src/example.ts"
            source.write_text(
                "const contact = 'mailto:person@example.com'; const phone = '+44 7700 900123'; const path = 'C:\\\\Users\\\\person\\\\secret'\n",
                encoding="utf-8",
            )

        findings = self.validate(mutate)

        self.assertTrue(any("mailto:" in finding for finding in findings))
        self.assertTrue(any("email address literal" in finding for finding in findings))
        self.assertTrue(any("phone number literal" in finding for finding in findings))
        self.assertTrue(any("private filesystem path" in finding for finding in findings))

    def test_assets_require_custody_and_stay_under_the_image_budget(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            asset = fixture.public / "media/unrecorded.png"
            asset.write_bytes(b"x" * 409601)

        findings = self.validate(mutate)

        self.assertTrue(any("exceeds 409600 bytes" in finding for finding in findings))
        self.assertTrue(any("missing from docs/asset-custody.md" in finding for finding in findings))

    def test_asset_custody_requires_an_exact_backticked_public_path(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            custody = fixture.docs / "asset-custody.md"
            custody.write_text(
                "- Public file: `src/client/public/media/example.webp.backup`\n",
                encoding="utf-8",
            )

        findings = self.validate(mutate)

        self.assertTrue(any("missing from docs/asset-custody.md" in finding for finding in findings))

    def test_asset_custody_rejects_stale_records_and_covers_source_imports(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            imported = fixture.root / "src/client/src/media/imported.png"
            imported.parent.mkdir(parents=True, exist_ok=True)
            imported.write_bytes(b"source-import")
            custody = fixture.docs / "asset-custody.md"
            custody.write_text(
                custody.read_text(encoding="utf-8")
                + "- Public file: `src/client/public/media/missing.png`\n",
                encoding="utf-8",
            )

        findings = self.validate(mutate)

        self.assertTrue(any("src/client/src/media/imported.png" in finding for finding in findings))
        self.assertTrue(any("custody record points to a missing asset" in finding for finding in findings))


if __name__ == "__main__":
    unittest.main()

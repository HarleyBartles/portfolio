from __future__ import annotations

import json
import subprocess
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
        self.marketplace = root / ".agents/plugins/marketplace-source/codex-marketplace"
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
            if not isinstance(item.get("path"), str):
                continue
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

    def write_marketplace(self) -> str:
        plugin_names = [
            "agentic-evaluation", "agentic-workflows", "api-contracts-pack",
            "architecture-pack", "data-platform-pack", "dotnet-pack",
            "engineering-pack", "feature-sliced-design", "frontend-pack",
            "language-patterns-pack", "mcp-usage-pack", "planning-pack",
            "repo-worker-pack", "research-pack", "security-pack",
            "superpowers-plus", "unslop-plus",
        ]
        self.marketplace.mkdir(parents=True, exist_ok=True)
        (self.marketplace / "manifest.json").write_text(
            json.dumps({"plugins": [{"name": name} for name in plugin_names]}),
            encoding="utf-8",
        )
        entry_names = [f"skill-{index}" for index in range(70)] + ["skill-0", "skill-1", "skill-2", "skill-3"]
        cursor = 0
        for index, plugin_name in enumerate(plugin_names):
            entry_count = 5 if index < 6 else 4
            entries = [{"canonical_name": name} for name in entry_names[cursor:cursor + entry_count]]
            cursor += entry_count
            bundle = self.marketplace / "plugins" / plugin_name / "references"
            bundle.mkdir(parents=True, exist_ok=True)
            (bundle / "bundle-manifest.json").write_text(json.dumps({"entries": entries}), encoding="utf-8")

        subprocess.run(["git", "init", "-q"], cwd=self.marketplace, check=True)
        subprocess.run(["git", "config", "user.email", "fixture@example.test"], cwd=self.marketplace, check=True)
        subprocess.run(["git", "config", "user.name", "Portfolio fixture"], cwd=self.marketplace, check=True)
        subprocess.run(["git", "add", "."], cwd=self.marketplace, check=True)
        subprocess.run(["git", "commit", "-qm", "fixture inventory"], cwd=self.marketplace, check=True)
        return subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=self.marketplace, text=True).strip()

    def write_marketplace_evidence(self, revision: str | None = None) -> None:
        actual_revision = self.write_marketplace()
        marketplace_revision = actual_revision if revision is None else revision
        evidence = {
            "observedAt": "2026-08-21",
            "marketplaceRevision": marketplace_revision,
            "inventory": {"pluginCount": 17, "entryCount": 74, "uniqueSkillCount": 70},
            "plugins": [
                "agentic-evaluation", "agentic-workflows", "api-contracts-pack", "architecture-pack",
                "data-platform-pack", "dotnet-pack", "engineering-pack", "feature-sliced-design",
                "frontend-pack", "language-patterns-pack", "mcp-usage-pack", "planning-pack",
                "repo-worker-pack", "research-pack", "security-pack", "superpowers-plus", "unslop-plus",
            ],
            "consumers": [
                {
                    "name": "Portfolio", "url": "https://github.com/example/portfolio",
                    "commit": "a" * 40, "marketplaceRevision": marketplace_revision,
                    "plugins": ["repo-worker-pack", "superpowers-plus", "mcp-usage-pack", "frontend-pack"],
                    "installedSkillCount": 42, "localSkills": ["asset-custody"], "localPlugins": [],
                }
            ],
        }
        evidence_path = self.root / "src/client/src/data/case-studies/marketplace-evidence.json"
        evidence_path.parent.mkdir(parents=True, exist_ok=True)
        evidence_path.write_text(json.dumps(evidence), encoding="utf-8")


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

    def test_manifest_requires_one_known_body_source_for_every_item(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()

        both_sources = self.validate(mutate)
        self.assertTrue(any("exactly one body source" in finding for finding in both_sources))

        def missing_source(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.write_manifest()

        neither_source = self.validate(missing_source)
        self.assertTrue(any("exactly one body source" in finding for finding in neither_source))

        def unknown_presentation(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "unknown-case-study"
            fixture.write_manifest()

        unknown = self.validate(unknown_presentation)
        self.assertTrue(any("unknown presentation" in finding for finding in unknown))

        def non_project_presentation(fixture: PortfolioFixture) -> None:
            del fixture.items[1]["path"]
            fixture.items[1]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()

        non_project = self.validate(non_project_presentation)
        self.assertTrue(any("only supported for project content" in finding for finding in non_project))

    def test_presentation_entries_still_validate_shared_metadata(self) -> None:
        for field in ("tags", "relatedSlugs"):
            with self.subTest(field=field):
                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]["path"]
                    fixture.items[0]["presentation"] = "marketplace-case-study"
                    fixture.items[0][field] = "not-an-array"
                    fixture.write_manifest()

                findings = self.validate(mutate)

                self.assertTrue(any(f"{field} must be a string array" in finding for finding in findings))

    def test_marketplace_evidence_rejects_drift_and_private_coordinates(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_marketplace_evidence("b" * 40)
            evidence_path = fixture.root / "src/client/src/data/case-studies/marketplace-evidence.json"
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["observedAt"] = "21 August 2026"
            evidence["inventory"]["entryCount"] = 73
            evidence["plugins"].append("missing-plugin")
            evidence["consumers"].append(dict(evidence["consumers"][0]))
            evidence["consumers"][0]["url"] = "http://Z:/private/branch/codex"
            evidence["consumers"][0]["commit"] = "short"
            evidence["consumers"][0]["plugins"].append("missing-plugin")
            evidence["consumers"][0]["plugins"].append("repo-worker-pack")
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(mutate)

        self.assertTrue(any("invalid observedAt" in finding for finding in findings))
        self.assertTrue(any("does not match Marketplace revision" in finding for finding in findings))
        self.assertTrue(any("entry count" in finding for finding in findings))
        self.assertTrue(any("plugin names do not match" in finding for finding in findings))
        self.assertTrue(any("duplicate consumer name" in finding for finding in findings))
        self.assertTrue(any("HTTPS" in finding for finding in findings))
        self.assertTrue(any("40-character commit" in finding for finding in findings))
        self.assertTrue(any("private local coordinate" in finding for finding in findings))
        self.assertTrue(any("unknown Marketplace plugin" in finding for finding in findings))
        self.assertTrue(any("must not contain duplicates" in finding for finding in findings))

    def test_marketplace_evidence_is_required_and_must_be_valid_json(self) -> None:
        def missing(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()

        missing_findings = self.validate(missing)
        self.assertTrue(any("cannot load Marketplace evidence" in finding for finding in missing_findings))

        def malformed(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()
            evidence_path = fixture.root / "src/client/src/data/case-studies/marketplace-evidence.json"
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text("{", encoding="utf-8")

        malformed_findings = self.validate(malformed)
        self.assertTrue(any("cannot load Marketplace evidence" in finding for finding in malformed_findings))

    def test_marketplace_evidence_accepts_explicit_local_boundaries(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "marketplace-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_marketplace_evidence()

        self.assertEqual([], self.validate(mutate))

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

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CLIENT_ROOT = ROOT / "src/client"
WILD_BUNCH_MEDIA_ROOT = CLIENT_ROOT / "public/media/wild-bunch"
WILD_BUNCH_MEDIA_SCRIPT = CLIENT_ROOT / "scripts/process-wild-bunch-captures.mjs"
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

    def write_wild_bunch_evidence(self, revision: str = "2a9814d094148bb789766a27d316095fecce5a60") -> None:
        evidence = {
            "observedAt": "2026-08-21",
            "revision": revision,
            "repositoryUrl": "https://github.com/HarleyBartles/wild-bunch",
            "historicalReferenceUrl": "https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd",
            "status": "pre-alpha",
            "captureRecipe": {
                "playerName": "Ranger Vale",
                "worldSeed": "00000000-0000-0000-0000-000000000000",
                "difficulty": "Standard",
                "entropy": "Boring",
                "startingTown": "Dustwell",
            },
            "capabilities": {
                "implemented": ["Seeded session setup"],
                "transitional": ["Visual polish"],
                "planned": ["Public accounts and sessions"],
            },
            "representativeEvidence": [
                {
                    "claim": "Aggregate and typed events",
                    "sourceUrl": f"https://github.com/HarleyBartles/wild-bunch/blob/{revision}/src/WildBunch.Domain/Game/GameSession.cs",
                    "testUrl": f"https://github.com/HarleyBartles/wild-bunch/blob/{revision}/tests/WildBunch.Domain.Tests/Events/GameSessionEventSourcingTests.cs",
                }
            ],
            "images": [],
        }
        evidence_path = self.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
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

    def test_wild_bunch_evidence_is_required_and_must_be_valid_json(self) -> None:
        def missing(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()

        missing_findings = self.validate(missing)
        self.assertTrue(any("cannot load Wild Bunch evidence" in finding for finding in missing_findings))

        def malformed(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text("{", encoding="utf-8")

        malformed_findings = self.validate(malformed)
        self.assertTrue(any("cannot load Wild Bunch evidence" in finding for finding in malformed_findings))

    def test_wild_bunch_evidence_rejects_invalid_public_coordinates_and_capture_recipe(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_wild_bunch_evidence("main")
            evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["observedAt"] = "21 August 2026"
            evidence["repositoryUrl"] = "http://localhost:5173?password=secret"
            evidence["historicalReferenceUrl"] = "http://Z:/private/worktree/branch"
            evidence["status"] = "live"
            evidence["captureRecipe"] = {
                "playerName": "Codex Rider",
                "worldSeed": "session-123",
                "difficulty": "Hard",
                "entropy": "Random",
                "startingTown": "Elsewhere",
            }
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(mutate)

        self.assertTrue(any("invalid observedAt" in finding for finding in findings))
        self.assertTrue(any("repositoryUrl must use HTTPS" in finding for finding in findings))
        self.assertTrue(any("historicalReferenceUrl must use HTTPS" in finding for finding in findings))
        self.assertTrue(any("revision must be a 40-character commit" in finding for finding in findings))
        self.assertTrue(any("status must be 'pre-alpha'" in finding for finding in findings))
        self.assertTrue(any("captureRecipe playerName" in finding for finding in findings))
        self.assertTrue(any("captureRecipe worldSeed" in finding for finding in findings))
        self.assertTrue(any("captureRecipe difficulty" in finding for finding in findings))
        self.assertTrue(any("captureRecipe entropy" in finding for finding in findings))
        self.assertTrue(any("captureRecipe startingTown" in finding for finding in findings))
        self.assertTrue(any("private local coordinate" in finding for finding in findings))

    def test_wild_bunch_snapshot_names_postgresql_backed_persistence(self) -> None:
        evidence_path = ROOT / "src/client/src/data/case-studies/wild-bunch-evidence.json"
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))

        self.assertIn("PostgreSQL-backed persistence", evidence["capabilities"]["implemented"])

    def test_wild_bunch_evidence_rejects_invalid_or_changed_observation_dates(self) -> None:
        for observed_at, expected_finding in (
            ("2026-02-30", "invalid observedAt"),
            ("2026-08-22", "observedAt must be '2026-08-21'"),
        ):
            with self.subTest(observed_at=observed_at):
                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]["path"]
                    fixture.items[0]["presentation"] = "wild-bunch-case-study"
                    fixture.write_manifest()
                    (fixture.content / "projects/example-project.md").unlink()
                    fixture.write_wild_bunch_evidence()
                    evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    evidence["observedAt"] = observed_at
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                findings = self.validate(mutate)
                self.assertTrue(any(expected_finding in finding for finding in findings))

    def test_wild_bunch_evidence_rejects_every_private_coordinate_class(self) -> None:
        forbidden_coordinates = (
            "Z:/private/capture",
            "http://localhost:5173",
            "password=not-for-publication",
            "Host=private;Database=wild-bunch",
            "codex/portfolio-10k-phase-4-wild-bunch branch",
            "session-0123456789abcdef",
            "https://user:pass@github.com/HarleyBartles/wild-bunch",
            "http://127.0.0.1:5173",
            "https://audit.localhost/evidence",
            "https://[::1]/evidence",
            "file:///Z:/private/capture",
        )

        for coordinate in forbidden_coordinates:
            with self.subTest(coordinate=coordinate):
                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]["path"]
                    fixture.items[0]["presentation"] = "wild-bunch-case-study"
                    fixture.write_manifest()
                    (fixture.content / "projects/example-project.md").unlink()
                    fixture.write_wild_bunch_evidence()
                    evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    evidence["auditNote"] = coordinate
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                findings = self.validate(mutate)
                self.assertTrue(any("private local coordinate or secret" in finding for finding in findings))

    def test_wild_bunch_evidence_rejects_a_pathless_pinned_representative_link(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_wild_bunch_evidence()
            evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["representativeEvidence"][0]["sourceUrl"] = (
                "https://github.com/HarleyBartles/wild-bunch/blob/"
                "2a9814d094148bb789766a27d316095fecce5a60/"
            )
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(mutate)

        self.assertTrue(any("representative evidence 1 sourceUrl must use a canonical pinned repository path" in finding for finding in findings))

    def test_wild_bunch_evidence_rejects_encoded_representative_path_ambiguity(self) -> None:
        encoded_paths = (
            "src/%2e%2e/private.cs",
            "src/%252e%252e/private.cs",
            "src%2fprivate.cs",
        )

        for encoded_path in encoded_paths:
            with self.subTest(encoded_path=encoded_path):
                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]["path"]
                    fixture.items[0]["presentation"] = "wild-bunch-case-study"
                    fixture.write_manifest()
                    (fixture.content / "projects/example-project.md").unlink()
                    fixture.write_wild_bunch_evidence()
                    evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    evidence["representativeEvidence"][0]["sourceUrl"] = (
                        "https://github.com/HarleyBartles/wild-bunch/blob/"
                        f"2a9814d094148bb789766a27d316095fecce5a60/{encoded_path}"
                    )
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                findings = self.validate(mutate)
                self.assertTrue(any("representative evidence 1 sourceUrl must use a canonical pinned repository path" in finding for finding in findings))

    def test_wild_bunch_evidence_rejects_empty_capabilities_unpinned_links_and_malformed_images(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_wild_bunch_evidence()
            evidence_path = fixture.root / "src/client/src/data/case-studies/wild-bunch-evidence.json"
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["capabilities"] = {"implemented": [], "transitional": [], "planned": []}
            evidence["representativeEvidence"][0]["sourceUrl"] = "https://github.com/HarleyBartles/wild-bunch/blob/main/src/WildBunch.Domain/Game/GameSession.cs"
            evidence["images"] = [{"path": "http://localhost/wild-bunch.png", "width": 0}]
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(mutate)

        for category in ("implemented", "transitional", "planned"):
            self.assertTrue(any(f"capabilities {category}" in finding for finding in findings))
        self.assertTrue(any("representative evidence" in finding and "pinned revision" in finding for finding in findings))
        self.assertTrue(any("image 1 requires a positive width and height" in finding for finding in findings))
        self.assertTrue(any("image 1 path must be a public custody path" in finding for finding in findings))

    def test_wild_bunch_commits_the_screened_responsive_derivative_inventory(self) -> None:
        evidence_path = ROOT / "src/client/src/data/case-studies/wild-bunch-evidence.json"
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
        images = evidence["images"]

        expected = {
            (capture, width, image_format)
            for capture, widths in {
                "dustwell-town": (720, 1200),
                "trail-map": (720, 1200),
                "session-audit": (720, 1200),
                "wanted-notice": (640, 960),
                "case-file": (640, 960),
            }.items()
            for width in widths
            for image_format in ("avif", "webp")
        }
        actual = {
            (image.get("capture"), image.get("width"), image.get("format"))
            for image in images
        }

        self.assertEqual(actual, expected)
        self.assertEqual(len(images), len(expected))
        for image in images:
            path = ROOT / image["path"]
            self.assertTrue(path.is_file(), image["path"])
            self.assertEqual(path.parent, WILD_BUNCH_MEDIA_ROOT)
            self.assertEqual(path.suffix, f".{image['format']}")
            self.assertEqual(path.stat().st_size, image["bytes"])
            self.assertLessEqual(path.stat().st_size, 400 * 1024)
            self.assertGreater(image["width"], 0)
            self.assertGreater(image["height"], 0)
            self.assertTrue(image["altIntent"].startswith("Current development build"))
            self.assertIn("working skeleton", image["caption"])

        self.assertEqual(validate_portfolio(ROOT), [])

    def test_wild_bunch_media_apply_requires_a_source_directory(self) -> None:
        result = subprocess.run(
            ["node", str(WILD_BUNCH_MEDIA_SCRIPT), "--apply"],
            cwd=CLIENT_ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("--source-dir", result.stdout + result.stderr)

    def test_wild_bunch_presentation_preserves_the_single_body_source_contract(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]["presentation"] = "wild-bunch-case-study"
            fixture.write_manifest()

        findings = self.validate(mutate)

        self.assertTrue(any("exactly one body source" in finding for finding in findings))

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

    def test_public_voice_scan_rejects_em_dashes_and_decorative_emoji(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.root / "src/client/src/example.ts"
            source.write_text(
                "export const copy = 'A finished thought—then an AI tail. 🚀'\n",
                encoding="utf-8",
            )

        findings = self.validate(mutate)

        self.assertTrue(any("em dash" in finding for finding in findings))
        self.assertTrue(any("decorative emoji" in finding for finding in findings))

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

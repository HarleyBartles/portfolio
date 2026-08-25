from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path

from PIL import Image


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
                "relatedSlugs": ["essay-1"],
            },
            {
                "slug": "essay-1",
                "kind": "writing",
                "title": "Example essay 1",
                "status": "published",
                "summary": "A useful essay.",
                "date": "2026-08-21",
                "readingMinutes": 4,
                "path": "writing/essay-1.md",
                "tags": ["writing"],
                "relatedSlugs": [],
                "editorial": {
                    "dateline": "Autumn 2026",
                    "readingMinutes": 4,
                    "indexLead": True,
                    "homepageFeature": {"eligible": True, "proposition": "A clear proposition."},
                    "visual": {"id": "essay-1-visual", "description": "A text equivalent."},
                    "continuations": [
                        {"slug": "essay-2", "rationale": "A deliberate next reading."},
                        {"slug": "essay-3", "rationale": "A second deliberate next reading."},
                    ],
                },
            },
        ]
        for number in range(2, 6):
            self.items.append({
                "slug": f"essay-{number}",
                "kind": "writing",
                "title": f"Example essay {number}",
                "status": "published",
                "summary": "A useful essay.",
                "date": "2026-08-21",
                "readingMinutes": 4,
                "path": f"writing/essay-{number}.md",
                "tags": ["writing"],
                "relatedSlugs": [],
                "editorial": {
                    "dateline": "Autumn 2026",
                    "readingMinutes": 4,
                    "indexLead": False,
                    "homepageFeature": {"eligible": True, "proposition": "A clear proposition."},
                    "visual": {"id": f"essay-{number}-visual", "description": "A text equivalent."},
                    "continuations": [
                        {"slug": "essay-1", "rationale": "A deliberate next reading."},
                        {"slug": "essay-2" if number != 2 else "essay-3", "rationale": "A second deliberate next reading."},
                    ],
                },
            })

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

    def write_patch_evidence(self) -> None:
        revision = "13bf77adc63cf5c8f49363cedd5dd392822b8375"
        asset_path = "src/client/public/media/patch/patch-example.webp"
        asset = self.root / asset_path
        asset.parent.mkdir(parents=True, exist_ok=True)
        Image.new("RGB", (1, 1), "white").save(asset, "WEBP")
        custody_path = self.docs / "asset-custody.md"
        custody_path.write_text(
            custody_path.read_text(encoding="utf-8") + f"- Public file: `{asset_path}`\n",
            encoding="utf-8",
        )
        evidence = {
            "observedAt": "2026-08-24",
            "repositoryUrl": "https://github.com/HarleyBartles/adventures-of-patch",
            "sourceRevision": revision,
            "pipeline": [
                {
                    "id": identifier,
                    "name": name,
                    "input": "A public-safe input.",
                    "decision": "A human gate.",
                    "output": "A bounded output.",
                    "stopCondition": "The gate does not clear.",
                }
                for identifier, name in (
                    ("seed", "Seed"),
                    ("frame", "Frame"),
                    ("visual-preproduction", "Visual pre-production"),
                    ("image-generation-and-qa", "Image generation and QA"),
                    ("deterministic-compilation", "Deterministic compilation"),
                    ("published-artefact-and-receipt", "Published artefact and receipt"),
                )
            ],
            "published": [
                {
                    "title": "Club DB",
                    "status": "published",
                    "publicArtefactUrl": (
                        "https://github.com/HarleyBartles/adventures-of-patch/blob/"
                        f"{revision}/published/adventures/club_db_bouncer_queue_v6_canonical.pptx"
                    ),
                },
                {
                    "title": "Goldilocks",
                    "status": "published",
                    "publicArtefactUrl": f"https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png",
                },
                {
                    "title": "The Sorcerer's Apprentice",
                    "status": "published",
                    "publicArtefactUrl": f"https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png",
                },
                {
                    "title": "Introducing Patch",
                    "status": "published",
                    "publicArtefactUrl": f"https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/misc/introducing-patch/page__v1.png",
                },
            ],
            "inFlight": [
                {
                    "title": "Lawful Heist",
                    "status": "advanced-visual-preproduction",
                    "lesson": "Lawful authority can cross a protected boundary without an invisible bypass.",
                    "currentEvidence": "Approved specialist reference sheets.",
                    "remaining": "Comic adaptation and deck plan remain incomplete.",
                },
                {
                    "title": "Tournament of Reasonable Defaults",
                    "status": "visual-development",
                    "lesson": "Stakeholder consultation prevents false deliverables.",
                    "currentEvidence": "Reference material is present.",
                    "remaining": "Revised scene planning and deck work remain.",
                },
                {
                    "title": "Identity Emporium",
                    "status": "visual-development",
                    "lesson": "Identity requires more than a costume.",
                    "currentEvidence": "World proof is present.",
                    "remaining": "Asset and deck readiness remain incomplete.",
                },
            ],
            "storyLab": {
                "fairytalePlans": [
                    {"title": "The Boy Who Cried Wolf", "lesson": "Preserve escalation signal."},
                    {"title": "The Emperor's New Clothes", "lesson": "Agreement can't stand in for evidence."},
                    {"title": "Hansel and Gretel", "lesson": "Leave purposeful recovery breadcrumbs."},
                    {"title": "The Three Little Pigs", "lesson": "Build resilience before predictable pressure."},
                    {"title": "Cinderella", "lesson": "Let temporary authority expire."},
                    {"title": "Little Red Riding Hood", "lesson": "Verify identity, provenance, and authority."},
                    {"title": "Jack and the Beanstalk", "lesson": "Distinguish technical capability from authorisation."},
                ],
                "adventurePlans": [
                    {"title": "Test Goblin", "lesson": "Turn failure-mode suspicion into ranked, executable test scenarios."},
                    {"title": "The Tiny Change That Wasn't", "lesson": "Map consumers, tests, migrations, documentation, and operations before treating a small diff as a small blast radius."},
                    {"title": "Review Dragon", "lesson": "Shape completed work into a reviewer handoff with intent, risk, evidence, gaps, and requested attention."},
                    {"title": "Hall of Mirrors", "lesson": "Separate observation, inference, assumption, contradiction, and uncertainty before proposing a bounded hypothesis and next check."},
                ],
            },
            "media": [
                {
                    "path": asset_path,
                    "width": 1,
                    "height": 1,
                    "bytes": asset.stat().st_size,
                    "custody": "Introducing Patch source base, mobile-safe crop.",
                    "sourceType": "repository-evidence",
                    "sourceStatus": "accepted",
                    "sourceRevision": revision,
                    "family": "hero",
                    "format": "webp",
                    "sourcePath": "published/misc/introducing-patch/source.png",
                    "sourceSha256": "b" * 64,
                }
            ],
        }
        evidence_path = self.root / "src/client/src/data/case-studies/patch-evidence.json"
        evidence_path.parent.mkdir(parents=True, exist_ok=True)
        evidence_path.write_text(json.dumps(evidence), encoding="utf-8")
        receipt_path = self.root / "src/client/public/media/patch/patch-derivatives.json"
        receipt_path.write_text(json.dumps({"sourceRevision": revision, "images": [dict(evidence["media"][0])]}), encoding="utf-8")

    def write_learning_lab_evidence(self) -> None:
        revision = "3d8e92ceaebcbb67f0ede5bda95846da8e18b80d"
        courses = [
            {
                "id": "course-1",
                "stage": "complete",
                "title": "Agentic Engineering 101: Zero to Hero",
                "outcome": "Direct, understand, provision, navigate, verify, and safely operate useful agent work.",
                "modules": [
                    {"id": "1", "title": "From chatbot to worker", "state": "mature-lab"},
                    {"id": "2", "title": "Give the cloud agent the project", "state": "mature-lab"},
                    {"id": "3", "title": "The project has a home", "state": "mature-lab"},
                    {"id": "4", "title": "Repositories, save points, and safe breakage", "state": "mature-lab"},
                    {"id": "5", "title": "Model, harness, context, tools, and behaviour", "state": "mature-lab"},
                    {"id": "6", "title": "What does the model know?", "state": "mature-lab"},
                    {"id": "7", "title": "Tools, operating knowledge, and domain provisioning", "state": "mature-lab"},
                    {"id": "8", "title": "What did we just create? Local work and connected systems", "state": "mature-lab"},
                    {"id": "9", "title": "Source of truth and verification", "state": "mature-lab"},
                    {"id": "10", "title": "Build a real agentic project", "state": "mature-lab"},
                ],
            },
            {
                "id": "course-2",
                "stage": "substantially-planned",
                "title": "Advanced Agentic Engineering: Mastering Agents",
                "outcome": "Design agent behaviour, workflow, context, delegation, evaluation, and autonomy.",
                "modules": [
                    {"id": "1", "title": "Agent self-introspection and local review", "state": "roadmap-module"},
                    {"id": "2", "title": "Autonomous human-in-the-loop workflows", "state": "roadmap-module"},
                    {"id": "3", "title": "Specialist sub-agents and orchestration", "state": "roadmap-module"},
                    {"id": "4", "title": "Harnesses, portability, and agent observability", "state": "roadmap-module"},
                    {"id": "5", "title": "The 20-Agent Bonfire and context transport", "state": "roadmap-module"},
                    {"id": "6", "title": "Selective provisioning, context, and evaluation", "state": "roadmap-module"},
                    {"id": "7", "title": "Trust boundaries and connected autonomy", "state": "roadmap-module"},
                    {"id": "8", "title": "Concurrent agents and isolation", "state": "roadmap-module"},
                    {"id": "9", "title": "Retrospective: how this repo was built", "state": "roadmap-module"},
                ],
            },
            {
                "id": "course-3",
                "stage": "early-outline",
                "title": "Beyond the Agent: Engineering Agent Systems",
                "outcome": "Design trust, coordination, concurrency, integration, provenance, and operational behaviour around agents.",
                "modules": [],
            },
        ]
        for course in courses:
            for module in course["modules"]:
                module["summary"] = "A concise editorial account of what the learner earns."
        evidence = {
            "observedAt": "2026-08-25",
            "repositoryUrl": "https://github.com/HarleyBartles/agentic-learning-lab",
            "sourceChangeUrl": "https://github.com/HarleyBartles/agentic-learning-lab/pull/13",
            "sourceRevision": revision,
            "integrityRunUrl": "https://github.com/HarleyBartles/agentic-learning-lab/actions/runs/32812192933",
            "matureLabCount": 10,
            "delivery": {"status": "planned", "target": "2026-08", "display": "late August 2026"},
            "licensing": {
                "freelyLicensed": True,
                "policyPath": "LICENSE.md",
                "curriculum": {
                    "spdx": "CC-BY-4.0",
                    "path": "LICENSES/CC-BY-4.0.txt",
                    "url": "https://creativecommons.org/licenses/by/4.0/",
                },
                "tooling": {
                    "spdx": "MIT",
                    "path": "LICENSES/MIT.txt",
                    "url": "https://opensource.org/license/mit",
                },
            },
            "courses": courses,
            "proof": {
                "curriculum": "README.md",
                "curriculumShape": "docs/curriculum-shape.md",
                "course2Index": "modules/course-2/README.md",
                "lab3": "labs/03-project-has-a-home/README.md",
                "lab3Instructions": "labs/03-project-has-a-home/project/AGENTS.md",
                "lab4": "labs/04-repositories-save-points-and-safe-breakage/README.md",
                "lab5": "labs/05-model-harness-context-tools-and-behaviour/README.md",
                "lab7": "labs/07-tools-operating-knowledge-and-domain-provisioning/README.md",
                "licencePolicy": "LICENSE.md",
                "curriculumLicence": "LICENSES/CC-BY-4.0.txt",
                "toolingLicence": "LICENSES/MIT.txt",
                "integrity": "tests/test_repo_integrity.py",
            },
        }
        evidence_path = self.root / "src/client/src/data/case-studies/learning-lab-evidence.json"
        evidence_path.parent.mkdir(parents=True, exist_ok=True)
        evidence_path.write_text(json.dumps(evidence), encoding="utf-8")


class PortfolioQualityTests(unittest.TestCase):
    def validate(self, mutate=None, *, today: date | None = None) -> list[str]:
        with tempfile.TemporaryDirectory() as temporary:
            fixture = PortfolioFixture(Path(temporary))
            fixture.write()
            if mutate is not None:
                mutate(fixture)
            return [str(finding) for finding in validate_portfolio(fixture.root, today=today)]

    @staticmethod
    def use_learning_lab_presentation(fixture: PortfolioFixture) -> Path:
        source = fixture.content / str(fixture.items[0]["path"])
        source.unlink()
        del fixture.items[0]["path"]
        fixture.items[0]["presentation"] = "learning-lab-case-study"
        fixture.write_manifest()
        return fixture.root / "src/client/src/data/case-studies/learning-lab-evidence.json"

    def test_clean_portfolio_has_no_findings(self) -> None:
        self.assertEqual([], self.validate())

    def test_editorial_writing_requires_the_publication_floor_and_complete_contract(self) -> None:
        mutations = {
            "fewer than five essays": (
                lambda fixture: fixture.items.__delitem__(-1),
                "at least five published essays",
            ),
            "duplicate lead": (
                lambda fixture: fixture.items[2]["editorial"].__setitem__("indexLead", True),
                "exactly one indexLead",
            ),
            "missing lead": (
                lambda fixture: fixture.items[1]["editorial"].__setitem__("indexLead", False),
                "exactly one indexLead",
            ),
            "unknown visual": (
                lambda fixture: fixture.items[1]["editorial"]["visual"].__setitem__("id", "unknown-visual"),
                "unknown visual id 'unknown-visual'",
            ),
            "empty visual description": (
                lambda fixture: fixture.items[1]["editorial"]["visual"].__setitem__("description", " "),
                "visual description must be nonempty",
            ),
            "empty proposition": (
                lambda fixture: fixture.items[1]["editorial"]["homepageFeature"].__setitem__("proposition", " "),
                "homepage proposition must be nonempty",
            ),
            "malformed dateline": (
                lambda fixture: fixture.items[1]["editorial"].__setitem__("dateline", "2026-08-21"),
                "has invalid editorial dateline",
            ),
            "generic featured": (
                lambda fixture: fixture.items[1].__setitem__("featured", True),
                "must not use generic featured",
            ),
            "generic related slugs": (
                lambda fixture: fixture.items[1].__setitem__("relatedSlugs", ["essay-2"]),
                "must not use generic relatedSlugs",
            ),
            "missing continuation target": (
                lambda fixture: fixture.items[1]["editorial"]["continuations"][0].__setitem__("slug", "missing"),
                "references missing continuation 'missing'",
            ),
            "duplicate continuation": (
                lambda fixture: fixture.items[1]["editorial"]["continuations"][1].__setitem__("slug", "essay-2"),
                "has duplicate continuation 'essay-2'",
            ),
            "self continuation": (
                lambda fixture: fixture.items[1]["editorial"]["continuations"][0].__setitem__("slug", "essay-1"),
                "cannot continue to itself",
            ),
        }

        for label, (mutate_editorial, expected_finding) in mutations.items():
            with self.subTest(label=label):
                def mutate(fixture: PortfolioFixture) -> None:
                    mutate_editorial(fixture)
                    fixture.write_manifest()

                findings = self.validate(mutate)
                self.assertTrue(any(expected_finding in finding for finding in findings), findings)

    def test_editorial_writing_accepts_six_seven_and_eight_essays(self) -> None:
        for count in (6, 7, 8):
            with self.subTest(count=count):
                def mutate(fixture: PortfolioFixture) -> None:
                    for number in range(6, count + 1):
                        fixture.items.append({
                            "slug": f"essay-{number}",
                            "kind": "writing",
                            "title": f"Example essay {number}",
                            "status": "published",
                            "summary": "A useful essay.",
                            "date": "2026-08-21",
                            "readingMinutes": 4,
                            "path": f"writing/essay-{number}.md",
                            "tags": ["writing"],
                            "relatedSlugs": [],
                            "editorial": {
                                "dateline": "Autumn 2026",
                                "readingMinutes": 4,
                                "indexLead": False,
                                "homepageFeature": {"eligible": True, "proposition": "A clear proposition."},
                                "visual": {"id": f"essay-{number}-visual", "description": "A text equivalent."},
                                "continuations": [
                                    {"slug": "essay-1", "rationale": "A deliberate next reading."},
                                    {"slug": "essay-2", "rationale": "A second deliberate next reading."},
                                ],
                            },
                        })
                    fixture.write()

                self.assertEqual([], self.validate(mutate))

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

    def test_patch_showcase_accepts_authored_presentations(self) -> None:
        for presentation in ("patch-identity-emporium", "patch-tournament", "patch-lawful-heist"):
            with self.subTest(presentation=presentation):
                def mutate(fixture: PortfolioFixture) -> None:
                    source = fixture.content / str(fixture.items[0]["path"])
                    source.unlink()
                    fixture.items[0].update({
                        "slug": "patch-story",
                        "kind": "patch",
                        "title": "Patch Story",
                        "status": "visual development",
                        "summary": "A shaped visual story.",
                        "presentation": presentation,
                    })
                    del fixture.items[0]["path"]
                    fixture.write_manifest()

                findings = self.validate(mutate)

                self.assertEqual(findings, [])

    def test_learning_lab_presentation_requires_project_content_and_evidence(self) -> None:
        def missing(fixture: PortfolioFixture) -> None:
            self.use_learning_lab_presentation(fixture)

        missing_findings = self.validate(missing)
        self.assertTrue(any("cannot load Learning Lab evidence" in finding for finding in missing_findings))

        def malformed(fixture: PortfolioFixture) -> None:
            evidence_path = self.use_learning_lab_presentation(fixture)
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text("{", encoding="utf-8")

        malformed_findings = self.validate(malformed)
        self.assertTrue(any("cannot load Learning Lab evidence" in finding for finding in malformed_findings))

        def both_sources(fixture: PortfolioFixture) -> None:
            fixture.items[0]["presentation"] = "learning-lab-case-study"
            fixture.write_manifest()
            fixture.write_learning_lab_evidence()

        self.assertTrue(any("exactly one body source" in finding for finding in self.validate(both_sources)))

        def non_project(fixture: PortfolioFixture) -> None:
            source = fixture.content / str(fixture.items[1]["path"])
            source.unlink()
            del fixture.items[1]["path"]
            fixture.items[1]["presentation"] = "learning-lab-case-study"
            fixture.write_manifest()
            fixture.write_learning_lab_evidence()

        self.assertTrue(any("only supported for project content" in finding for finding in self.validate(non_project)))

    def test_learning_lab_evidence_rejects_invalid_taxonomy_and_maturity(self) -> None:
        mutations = {
            "invalid observation date": (
                lambda evidence: evidence.__setitem__("observedAt", "24 August 2026"),
                "observedAt must be an ISO date",
            ),
            "short revision": (
                lambda evidence: evidence.__setitem__("sourceRevision", "short"),
                "sourceRevision must be a 40-character commit",
            ),
            "stale valid revision": (
                lambda evidence: evidence.__setitem__("sourceRevision", "315442bd2661bbc99a0834e57ff5f500b549326c"),
                "sourceRevision must match the course-local numbering revision",
            ),
            "wrong source change": (
                lambda evidence: evidence.__setitem__("sourceChangeUrl", "https://github.com/HarleyBartles/agentic-learning-lab/pull/12"),
                "sourceChangeUrl must match the merged course-numbering change",
            ),
            "stale integrity run": (
                lambda evidence: evidence.__setitem__("integrityRunUrl", "https://github.com/HarleyBartles/agentic-learning-lab/actions/runs/32619166005"),
                "integrityRunUrl must match the successful run for the pinned source revision",
            ),
            "duplicate identifier": (
                lambda evidence: evidence["courses"][1]["modules"][1].__setitem__("id", "1"),
                "module identifiers must be unique within each course",
            ),
            "missing Course 2 Module 5": (
                lambda evidence: evidence["courses"][1]["modules"].__delitem__(4),
                "course-2 modules must be 1, 2, 3, 4, 5, 6, 7, 8, 9",
            ),
            "identifier outside curriculum": (
                lambda evidence: evidence["courses"][1]["modules"][8].__setitem__("id", "10"),
                "course-2 modules must be 1, 2, 3, 4, 5, 6, 7, 8, 9",
            ),
            "unknown maturity": (
                lambda evidence: evidence["courses"][0]["modules"][0].__setitem__("state", "complete"),
                "module 1 state must be mature-lab or roadmap-module",
            ),
            "missing editorial summary": (
                lambda evidence: evidence["courses"][0]["modules"][0].__setitem__("summary", ""),
                "module 1 requires a nonempty editorial summary",
            ),
            "count-preserving maturity swap": (
                lambda evidence: (
                    evidence["courses"][0]["modules"][0].__setitem__("state", "roadmap-module"),
                    evidence["courses"][1]["modules"][0].__setitem__("state", "mature-lab"),
                ),
                "course-1 module 1 state must be mature-lab",
            ),
            "wrong mature count": (
                lambda evidence: evidence.__setitem__("matureLabCount", 9),
                "matureLabCount must match the 10 mature-lab modules",
            ),
            "wrong course stage": (
                lambda evidence: evidence["courses"][2].__setitem__("stage", "substantially-planned"),
                "course-3 stage must be early-outline",
            ),
        }

        for label, (mutate_evidence, expected) in mutations.items():
            with self.subTest(label=label):
                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = self.use_learning_lab_presentation(fixture)
                    fixture.write_learning_lab_evidence()
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                self.assertTrue(any(expected in finding for finding in self.validate(mutate)), expected)

    def test_learning_lab_delivery_changes_only_from_authored_evidence(self) -> None:
        def stale_planned(fixture: PortfolioFixture) -> None:
            self.use_learning_lab_presentation(fixture)
            fixture.write_learning_lab_evidence()

        stale = self.validate(stale_planned, today=date(2026, 9, 1))
        self.assertTrue(any("delivery planned state is stale after 2026-08" in finding for finding in stale))

        started_mutations = {
            "missing date": (lambda delivery: delivery.pop("startedOn", None), "started delivery requires startedOn"),
            "invalid date": (lambda delivery: delivery.__setitem__("startedOn", "late August"), "startedOn must be an ISO date"),
            "future date": (lambda delivery: delivery.__setitem__("startedOn", "2026-08-25"), "startedOn must not be in the future"),
        }
        for label, (mutate_delivery, expected) in started_mutations.items():
            with self.subTest(label=label):
                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = self.use_learning_lab_presentation(fixture)
                    fixture.write_learning_lab_evidence()
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    evidence["delivery"] = {"status": "started", "startedOn": "2026-08-23", "display": "23 August 2026"}
                    mutate_delivery(evidence["delivery"])
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                findings = self.validate(mutate, today=date(2026, 8, 24))
                self.assertTrue(any(expected in finding for finding in findings), expected)

        def planned_with_started_date(fixture: PortfolioFixture) -> None:
            evidence_path = self.use_learning_lab_presentation(fixture)
            fixture.write_learning_lab_evidence()
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["delivery"]["startedOn"] = "2026-08-23"
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(planned_with_started_date, today=date(2026, 8, 24))
        self.assertTrue(any("planned delivery must not include startedOn" in finding for finding in findings))

    def test_learning_lab_evidence_bounds_licensing_and_public_claims(self) -> None:
        mutations = {
            "missing curriculum licence": (
                lambda evidence: evidence["licensing"]["curriculum"].__setitem__("spdx", ""),
                "freelyLicensed requires curriculum SPDX CC-BY-4.0",
            ),
            "missing tooling licence": (
                lambda evidence: evidence["licensing"]["tooling"].__setitem__("spdx", ""),
                "freelyLicensed requires tooling SPDX MIT",
            ),
            "missing policy path": (
                lambda evidence: evidence["licensing"].__setitem__("policyPath", ""),
                "freelyLicensed requires policyPath LICENSE.md",
            ),
            "missing licence link": (
                lambda evidence: evidence["licensing"]["curriculum"].__setitem__("url", ""),
                "freelyLicensed requires HTTPS curriculum and tooling licence links",
            ),
            "false freely licensed flag": (
                lambda evidence: evidence["licensing"].__setitem__("freelyLicensed", False),
                "licensing freelyLicensed must be true",
            ),
            "missing freely licensed flag": (
                lambda evidence: evidence["licensing"].pop("freelyLicensed"),
                "licensing freelyLicensed must be true",
            ),
            "non-boolean freely licensed flag": (
                lambda evidence: evidence["licensing"].__setitem__("freelyLicensed", "true"),
                "licensing freelyLicensed must be true",
            ),
            "snapshot without commit": (
                lambda evidence: evidence.__setitem__("sourceRevision", ""),
                "sourceRevision must be a 40-character commit",
            ),
            "unsupported learner claim": (
                lambda evidence: evidence["proof"].__setitem__("claim", "tested with real learners"),
                "must not claim tested with real learners",
            ),
        }

        for label, (mutate_evidence, expected) in mutations.items():
            with self.subTest(label=label):
                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = self.use_learning_lab_presentation(fixture)
                    fixture.write_learning_lab_evidence()
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                self.assertTrue(any(expected in finding for finding in self.validate(mutate)), expected)

    def test_learning_lab_evidence_accepts_planned_and_started_states(self) -> None:
        def planned(fixture: PortfolioFixture) -> None:
            self.use_learning_lab_presentation(fixture)
            fixture.write_learning_lab_evidence()

        self.assertEqual([], self.validate(planned, today=date(2026, 8, 24)))

        def started(fixture: PortfolioFixture) -> None:
            evidence_path = self.use_learning_lab_presentation(fixture)
            fixture.write_learning_lab_evidence()
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["delivery"] = {"status": "started", "startedOn": "2026-08-23", "display": "23 August 2026"}
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        self.assertEqual([], self.validate(started, today=date(2026, 8, 24)))

        def started_without_display(fixture: PortfolioFixture) -> None:
            evidence_path = self.use_learning_lab_presentation(fixture)
            fixture.write_learning_lab_evidence()
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
            evidence["delivery"] = {"status": "started", "startedOn": "2026-08-23"}
            evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

        findings = self.validate(started_without_display, today=date(2026, 8, 24))
        self.assertTrue(any("started delivery requires display text" in finding for finding in findings))

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

    def test_patch_evidence_rejects_invalid_production_claims_and_private_coordinates(self) -> None:
        mutations = {
            "short source revision": (
                lambda evidence: evidence.__setitem__("sourceRevision", "short"),
                "sourceRevision must be a 40-character commit",
            ),
            "mutable public artefact URL": (lambda evidence: evidence["published"][0].__setitem__(
                "publicArtefactUrl",
                "https://github.com/HarleyBartles/adventures-of-patch/blob/main/published/adventures/club-db.pptx",
            ), "must use the pinned source revision"),
            "unsupported status": (lambda evidence: evidence["inFlight"][0].__setitem__("status", "live"), "unsupported status 'live'"),
            "published record without public artefact": (lambda evidence: evidence["published"][0].pop("publicArtefactUrl"), "published record 1 requires a publicArtefactUrl"),
            "in-flight record without remaining work": (lambda evidence: evidence["inFlight"][0].pop("remaining"), "in-flight record 1 requires remaining"),
            "future item with a date": (lambda evidence: evidence["storyLab"]["fairytalePlans"].append(
                {"title": "A future fairytale", "lesson": "A future lesson.", "date": "2026-09-01"}
            ), "future-work item must not contain date"),
            "Linear identifier": (lambda evidence: evidence["pipeline"][0].__setitem__("decision", "PATCH-42 decides it."), "private coordinate or credential"),
            "private coordinate": (lambda evidence: evidence["pipeline"][0].__setitem__("output", "Z:/private/output"), "private coordinate or credential"),
            "signed URL": (lambda evidence: evidence["pipeline"][0].__setitem__(
                "input", "https://example.test/file?signature=private"
            ), "private coordinate or credential"),
            "credential": (lambda evidence: evidence["pipeline"][0].__setitem__("input", "token=private"), "private coordinate or credential"),
            "connector identifier": (lambda evidence: evidence["pipeline"][0].__setitem__("input", "connector_id=private"), "private coordinate or credential"),
            "file URL": (lambda evidence: evidence["pipeline"][0].__setitem__("input", "file:///var/private/receipt"), "private coordinate or credential"),
            "Unix coordinate": (lambda evidence: evidence["pipeline"][0].__setitem__("input", "/var/private/receipt"), "private coordinate or credential"),
            "wrong in-flight status": (lambda evidence: evidence["inFlight"][0].__setitem__("status", "visual-development"), "Lawful Heist must use status"),
            "media without dimensions and custody": (lambda evidence: evidence["media"][0].update(
                {"width": 0, "height": 0, "custody": ""}
            ), "requires positive intrinsic dimensions"),
            "false media dimension": (lambda evidence: evidence["media"][0].__setitem__("width", 2), "does not match derivative receipt"),
            "mismatched media custody": (lambda evidence: evidence["media"][0].__setitem__("custody", "unrelated custody"), "custody must match derivative sourcePath"),
            "duplicate media": (lambda evidence: evidence["media"].append(dict(evidence["media"][0])), "complete unique derivative receipt inventory"),
            "swapped fairytale lesson": (lambda evidence: evidence["storyLab"]["fairytalePlans"].reverse(), "must match the seven approved title and lesson pairs"),
            "swapped adventure lesson": (lambda evidence: evidence["storyLab"]["adventurePlans"][0].__setitem__("lesson", "wrong"), "must match the four approved title and lesson pairs"),
            "swapped published path": (lambda evidence: evidence["published"][0].__setitem__("publicArtefactUrl", evidence["published"][1]["publicArtefactUrl"]), "must match the four approved title and path pairs"),
            "generated pose without accepted source": (lambda evidence: evidence["media"][0].update(
                {"sourceType": "generated-pose", "sourceStatus": "candidate"}
            ), "generated pose requires accepted sourceStatus"),
        }

        for label, (mutate_evidence, expected_finding) in mutations.items():
            with self.subTest(label=label):
                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]["path"]
                    fixture.items[0]["presentation"] = "patch-pipeline-case-study"
                    fixture.items[0]["status"] = "active project"
                    fixture.write_manifest()
                    (fixture.content / "projects/example-project.md").unlink()
                    fixture.write_patch_evidence()
                    evidence_path = fixture.root / "src/client/src/data/case-studies/patch-evidence.json"
                    evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding="utf-8")

                findings = self.validate(mutate)
                self.assertTrue(any(expected_finding in finding for finding in findings), findings)

    def test_patch_evidence_accepts_the_public_safe_contract(self) -> None:
        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]["path"]
            fixture.items[0]["presentation"] = "patch-pipeline-case-study"
            fixture.items[0]["status"] = "active project"
            fixture.write_manifest()
            (fixture.content / "projects/example-project.md").unlink()
            fixture.write_patch_evidence()

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

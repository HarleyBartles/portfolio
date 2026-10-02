from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

import check_agent_guidance
import check_local_skills
import check_operating_standards
import check_plugin_subscriptions


class AgentAssetChecksTests(unittest.TestCase):
    def test_router_check_enforces_the_repository_budget_and_live_links(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            router = root / "AGENTS.md"
            router.write_text("# Router\n\n[Guidance](missing.md)\n", encoding="utf-8")

            findings = check_agent_guidance.check_router(root, router, budget=2)

            self.assertTrue(any("budget" in finding.lower() for finding in findings))
            self.assertTrue(any("missing.md" in finding for finding in findings))

    def test_standard_check_rejects_unresolvable_certification_anchor(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            contract = root / ".agents/contracts"
            contract.mkdir(parents=True)
            (contract / "operating-standards.json").write_text(
                json.dumps(
                    {
                        "version": 2,
                        "standards": [
                            {
                                "id": "root-agent-router",
                                "source": {
                                    "repository": "https://example.test/aom.git",
                                    "commit": "a" * 40,
                                    "definition": "skills/agents-routing/references/standard.md",
                                },
                                "certification": ".agents/contracts/standards-certification.md#missing",
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )
            (contract / "standards-certification.md").write_text("# Certification\n", encoding="utf-8")

            findings = check_operating_standards.check_subscriptions(root)

            self.assertTrue(any("missing" in finding.lower() for finding in findings))

    def test_plugin_check_requires_codex_and_devin_to_match_catalog(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / ".agents/plugins").mkdir(parents=True)
            (root / ".codex").mkdir()
            (root / ".devin").mkdir()
            (root / ".agents/plugins/marketplace.json").write_text(
                json.dumps(
                    {
                        "name": "portfolio",
                        "plugins": [
                            {
                                "name": "frontend-pack",
                                "source": {
                                    "source": "git-subdir",
                                    "url": "https://example.test/plugins.git",
                                    "path": "./dist/plugins/frontend-pack",
                                    "ref": "main",
                                },
                            }
                        ],
                    }
                ),
                encoding="utf-8",
            )
            (root / ".codex/config.toml").write_text(
                '[marketplaces.portfolio]\nsource_type="git"\nsource="https://github.com/HarleyBartles/portfolio.git"\nref="main"\n'
                '[plugins."frontend-pack@portfolio"]\nenabled=true\n',
                encoding="utf-8",
            )
            (root / ".devin/config.json").write_text('{"requiredPlugins": [], "optionalPlugins": [], "forbiddenPlugins": []}', encoding="utf-8")

            findings = check_plugin_subscriptions.check_plugins(root)

            self.assertTrue(any("frontend-pack" in finding for finding in findings))
            (root / ".devin/config.json").write_text(
                '{"requiredPlugins": [{"source": "git-subdir", "url": "https://example.test/plugins.git", '
                '"path": "dist/plugins/other-pack", "ref": "main"}], '
                '"optionalPlugins": [], "forbiddenPlugins": []}',
                encoding="utf-8",
            )
            self.assertTrue(any("path, and selector" in finding for finding in check_plugin_subscriptions.check_plugins(root)))
            (root / ".devin/config.json").write_text(
                '{"requiredPlugins": [{"source": "git-subdir", "url": "https://example.test/plugins.git", '
                '"path": "dist/plugins/frontend-pack", "ref": "develop"}], '
                '"optionalPlugins": [], "forbiddenPlugins": []}',
                encoding="utf-8",
            )
            self.assertTrue(any("path, and selector" in finding for finding in check_plugin_subscriptions.check_plugins(root)))
            (root / ".devin/config.json").write_text(
                '{"requiredPlugins": [{"source": "git-subdir", "url": "https://example.test/plugins.git", '
                '"path": "dist/plugins/frontend-pack", "ref": "main"}], '
                '"optionalPlugins": [], "forbiddenPlugins": []}',
                encoding="utf-8",
            )
            self.assertEqual([], check_plugin_subscriptions.check_plugins(root))

    def test_local_skill_check_accepts_repository_authored_frontmatter_and_wrapper(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            skill = root / ".agents/skills/example-skill"
            (skill / "agents").mkdir(parents=True)
            (skill / "SKILL.md").write_text(
                "---\nname: example-skill\nmetadata:\n  source-id: example-skill\n  source-path: .agents/skills/example-skill/SKILL.md\n  source-category: first_party\n---\n# Example\n",
                encoding="utf-8",
            )
            (skill / "agents/openai.yaml").write_text(
                "version: 1\nmetadata:\n  skill_name: example-skill\n  source_category: first_party\n"
                "interface:\n  display_name: Example\n  short_description: Example skill\n"
                "  default_prompt: Follow example-skill guidance\npolicy:\n  allow_implicit_invocation: true\n",
                encoding="utf-8",
            )

            self.assertEqual([], check_local_skills.check_skills(root))

    def test_local_skill_check_preserves_existing_source_categories(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            skill = root / ".agents/skills/generating-images"
            (skill / "agents").mkdir(parents=True)
            (skill / "SKILL.md").write_text("---\nname: generating-images\n---\n", encoding="utf-8")
            (skill / "agents/openai.yaml").write_text(
                "version: 1\nmetadata:\n  skill_name: generating-images\n  source_category: skills-with-source\n"
                "interface:\n  display_name: Generating Images\n  short_description: Image skill\n"
                "  default_prompt: Use generating-images to follow the image workflow.\n"
                "policy:\n  allow_implicit_invocation: true\n",
                encoding="utf-8",
            )

            self.assertEqual([], check_local_skills.check_skills(root))


if __name__ == "__main__":
    unittest.main()

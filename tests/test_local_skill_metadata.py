from __future__ import annotations

import re
import sys
import unittest
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
SKILL_ROOT = ROOT / ".agents" / "skills" / "writing-portfolio-articles"
MARKETPLACE_TOOLS = ROOT / ".agents" / "plugins" / "marketplace-source" / "tools"
sys.path.insert(0, str(MARKETPLACE_TOOLS))

import skill_validation  # noqa: E402


def load_frontmatter() -> dict[str, object]:
    raw = (SKILL_ROOT / "SKILL.md").read_text(encoding="utf-8")
    _, frontmatter, _ = raw.split("---", 2)
    data = yaml.safe_load(frontmatter)
    if not isinstance(data, dict):
        raise AssertionError("SKILL.md frontmatter must be a mapping")
    return data


class LocalSkillMetadataContractTests(unittest.TestCase):
    def test_article_skill_frontmatter_passes_the_pinned_marketplace_contract(self) -> None:
        skill_validation.validate_skill_markdown_frontmatter(SKILL_ROOT)
        frontmatter = load_frontmatter()
        metadata = frontmatter["metadata"]

        self.assertEqual(frontmatter["name"], "writing-portfolio-articles")
        self.assertEqual(frontmatter["license"], "MIT")
        self.assertNotIn("custody", metadata)
        self.assertNotIn("lane", metadata)
        self.assertEqual(metadata["source-id"], "writing-portfolio-articles")
        self.assertEqual(metadata["source-path"], ".agents/skills/writing-portfolio-articles/SKILL.md")
        self.assertEqual(metadata["source-category"], "first_party")
        self.assertEqual(metadata["status"], "active")
        self.assertEqual(metadata["owner"], "Harley Bartles")

        for field in (
            "use_when",
            "do_not_use_when",
            "related_skills",
            "use_before",
            "use_with",
        ):
            values = metadata[field]
            self.assertIsInstance(values, list)
            self.assertTrue(values)
            self.assertTrue(all(isinstance(value, str) and value.strip() for value in values))

        for field in ("related_skills", "use_before", "use_with"):
            self.assertTrue(all(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", value) for value in metadata[field]))

    def test_article_skill_openai_wrapper_passes_the_pinned_field_language(self) -> None:
        path = SKILL_ROOT / "agents" / "openai.yaml"
        raw = path.read_bytes()
        self.assertFalse(raw.startswith(b"\xef\xbb\xbf"))
        wrapper = yaml.safe_load(raw.decode("utf-8"))

        self.assertIsInstance(wrapper, dict)
        self.assertEqual(wrapper["version"], 1)
        self.assertEqual(wrapper["metadata"]["skill_name"], "writing-portfolio-articles")
        self.assertEqual(wrapper["metadata"]["source_category"], "first_party")

        interface = wrapper["interface"]
        for field in ("display_name", "short_description", "default_prompt"):
            self.assertIsInstance(interface[field], str)
            self.assertTrue(interface[field].strip())
        self.assertFalse(interface["short_description"].lower().startswith("use when"))
        self.assertIn("writing-portfolio-articles", interface["default_prompt"])
        self.assertNotRegex(interface["default_prompt"], r"(?i)^use when\b|\bto use when\b")
        self.assertNotRegex(interface["default_prompt"], r"[/\$]writing-portfolio-articles")

        policy = wrapper["policy"]
        self.assertIsInstance(policy, dict)
        self.assertIsInstance(policy["allow_implicit_invocation"], bool)


if __name__ == "__main__":
    unittest.main()

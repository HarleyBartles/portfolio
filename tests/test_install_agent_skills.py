from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "install_agent_skills.py"


def load_module():
    spec = importlib.util.spec_from_file_location("install_agent_skills", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class InstallAgentSkillsTests(unittest.TestCase):
    def test_repo_manifest_matches_real_plugin_surface(self) -> None:
        module = load_module()
        manifest = module.load_manifest(ROOT / ".agents" / "plugins" / "marketplace.json")

        self.assertEqual(
            manifest.default_plugins,
            [
                "repo-worker-pack",
                "superpowers-plus",
                "architecture-pack",
                "frontend-pack",
                "dotnet-kit",
            ],
        )
        self.assertIn("wild-bunch-project-pack", manifest.excluded_plugins)
        self.assertTrue(
            (ROOT / ".agents" / "plugins" / "marketplace-source" / manifest.plugins["repo-worker-pack"].source_path / "skills").is_dir()
        )

    def test_sync_copies_default_plugins_and_writes_provenance(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source_root = temp / "marketplace-source"
            output_root = temp / "skills"
            source_root.mkdir()

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack", "dotnet-kit"],
                "excluded_plugins": ["wild-bunch-project-pack"],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "codex-marketplace/plugins/repo-worker-pack",
                        "skills_path": "skills",
                    },
                    "dotnet-kit": {
                        "version": "1.0.0",
                        "source_path": "codex-marketplace/plugins/dotnet-kit",
                        "skills_path": "skills",
                    },
                },
            }

            for plugin_name, skill_name in [
                ("repo-worker-pack", "boring-loop"),
                ("repo-worker-pack", "work-mode-router"),
                ("dotnet-kit", "testing"),
            ]:
                skill_root = source_root / manifest["plugins"][plugin_name]["source_path"] / "skills" / skill_name
                skill_root.mkdir(parents=True, exist_ok=True)
                if skill_name == "boring-loop":
                    (skill_root / "SKILL.md").write_text(f"# {skill_name}   \n\n", encoding="utf-8")
                else:
                    (skill_root / "SKILL.md").write_text(f"# {skill_name}\n", encoding="utf-8")

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            result = module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            self.assertEqual(result.copied_skills, ["boring-loop", "work-mode-router", "testing"])
            self.assertTrue((output_root / "boring-loop" / "SKILL.md").exists())
            self.assertTrue((output_root / "testing" / "SKILL.md").exists())
            self.assertTrue((output_root / ".provenance.json").exists())
            self.assertEqual((output_root / "boring-loop" / "SKILL.md").read_text(encoding="utf-8"), "# boring-loop\n")

            provenance = json.loads((output_root / ".provenance.json").read_text(encoding="utf-8"))
            self.assertEqual(provenance["source_revision"], "abc123")
            self.assertEqual(provenance["default_plugins"], ["repo-worker-pack", "dotnet-kit"])
            self.assertEqual(provenance["copied_skills"], ["boring-loop", "work-mode-router", "testing"])

    def test_sync_check_mode_detects_stale_output(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source_root = temp / "marketplace-source"
            output_root = temp / "skills"
            source_root.mkdir()
            output_root.mkdir()

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack"],
                "excluded_plugins": [],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "codex-marketplace/plugins/repo-worker-pack",
                        "skills_path": "skills",
                    }
                },
            }

            skill_root = source_root / "codex-marketplace" / "plugins" / "repo-worker-pack" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (output_root / "boring-loop").mkdir(parents=True, exist_ok=True)
            (output_root / "boring-loop" / "SKILL.md").write_text("# stale\n", encoding="utf-8")

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )


if __name__ == "__main__":
    unittest.main()

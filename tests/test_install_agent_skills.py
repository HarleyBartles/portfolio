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
    def test_check_mode_skips_worktree_guard(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)

            manifest = {
                "schema_version": 1,
                "default_plugins": [],
                "excluded_plugins": [],
                "plugins": {},
            }

            module.require_linked_worktree = unittest.mock.Mock()
            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )

            module.require_linked_worktree.assert_not_called()

    def test_sync_copies_default_plugins_and_writes_provenance(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack", "dotnet-kit"],
                "excluded_plugins": ["wild-bunch-project-pack"],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "repo-worker-pack/1.0.0",
                        "skills_path": "skills",
                    },
                    "dotnet-kit": {
                        "version": "1.0.0",
                        "source_path": "dotnet-kit/1.0.0",
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
                (skill_root / "SKILL.md").write_text(f"# {skill_name}\n", encoding="utf-8")
                plugin_manifest = skill_root.parents[1] / ".codex-plugin"
                plugin_manifest.mkdir(parents=True, exist_ok=True)
                (plugin_manifest / "plugin.json").write_text(
                    json.dumps({"name": plugin_name, "version": "1.0.0"}),
                    encoding="utf-8",
                )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]

            result = module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            self.assertEqual(result.copied_skills, ["boring-loop", "work-mode-router", "testing"])
            self.assertTrue((output_root / "boring-loop" / "SKILL.md").exists())
            self.assertTrue((output_root / "testing" / "SKILL.md").exists())
            self.assertTrue((output_root / ".provenance.json").exists())

            provenance = json.loads((output_root / ".provenance.json").read_text(encoding="utf-8"))
            self.assertEqual(provenance["source_revision"], "abc123")
            self.assertEqual(provenance["source_root"], ".agents/plugins/marketplace-source")
            self.assertEqual(provenance["default_plugins"], ["repo-worker-pack", "dotnet-kit"])
            self.assertEqual(provenance["copied_skills"], ["boring-loop", "work-mode-router", "testing"])

    def test_sync_rejects_version_mismatch_between_manifest_and_plugin(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source_root = temp / "marketplace-source"
            output_root = temp / "skills"
            source_root.mkdir()

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack"],
                "excluded_plugins": [],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "repo-worker-pack/1.0.0",
                        "skills_path": "skills",
                    }
                },
            }

            plugin_root = source_root / "repo-worker-pack" / "1.0.0"
            (plugin_root / "skills" / "boring-loop").mkdir(parents=True, exist_ok=True)
            (plugin_root / "skills" / "boring-loop" / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (plugin_root / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (plugin_root / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "2.0.0"}),
                encoding="utf-8",
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

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
                        "source_path": "repo-worker-pack/1.0.0",
                        "skills_path": "skills",
                    }
                },
            }

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
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

    def test_sync_check_mode_does_not_create_output_root(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source_root = temp / "marketplace-source"
            output_root = temp / "skills"
            source_root.mkdir()

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

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )

            self.assertFalse(output_root.exists())


if __name__ == "__main__":
    unittest.main()

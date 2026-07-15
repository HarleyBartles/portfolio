from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import Mock, patch
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "install_agent_skills.py"
MARKETPLACE_SOURCE = {
    "repository": "https://github.com/HarleyBartles/agent-asset-marketplace.git",
    "path": ".agents/plugins/marketplace-source",
}


def load_module():
    spec = importlib.util.spec_from_file_location("install_agent_skills", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def stub_pinned_source_checkout(module) -> None:
    module.assert_pinned_source_checkout = Mock()


def stub_marketplace_source_binding(module) -> None:
    module.assert_marketplace_source_binding = Mock()


def with_marketplace_source(manifest: dict) -> dict:
    manifest["marketplace_source"] = dict(MARKETPLACE_SOURCE)
    return manifest


def create_directory_link(link: Path, target: Path) -> None:
    if sys.platform.startswith("win"):
        result = subprocess.run(
            ["cmd", "/c", "mklink", "/J", str(link), str(target)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            raise unittest.SkipTest(f"Unable to create test junction: {result.stderr.strip()}")
        return
    link.symlink_to(target, target_is_directory=True)


def create_file_hardlink(link: Path, target: Path) -> None:
    if sys.platform.startswith("win"):
        result = subprocess.run(
            ["cmd", "/c", "mklink", "/H", str(link), str(target)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            raise unittest.SkipTest(f"Unable to create test hardlink: {result.stderr.strip()}")
        return
    try:
        os.link(target, link)
    except OSError as exc:
        raise unittest.SkipTest(f"Unable to create test hardlink: {exc}") from exc


class InstallAgentSkillsTests(unittest.TestCase):
    def test_sync_rejects_canonical_output_root_when_it_is_a_directory_link(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            module.ROOT = root
            source_root = root / ".agents" / "plugins" / "marketplace-source"
            output_root = root / ".agents" / "skills"
            external_output = temp / "external-skills"
            source_root.mkdir(parents=True)
            output_root.parent.mkdir(parents=True, exist_ok=True)
            external_output.mkdir()
            sentinel = external_output / "sentinel.txt"
            sentinel.write_text("do not delete\n", encoding="utf-8")
            create_directory_link(output_root, external_output)

            manifest = with_marketplace_source(
                {
                    "schema_version": 1,
                    "default_plugins": [],
                    "excluded_plugins": [],
                    "plugins": {},
                }
            )

            module.require_linked_worktree = Mock()
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)
            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaisesRegex(ValueError, "link or reparse point"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

            self.assertTrue(sentinel.exists())

    def test_read_skill_directories_rejects_nested_directory_links(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source_root = temp / "marketplace-source"
            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "testing"
            external = temp / "external"
            skill_root.mkdir(parents=True)
            external.mkdir()
            (external / "payload.txt").write_text("external\n", encoding="utf-8")
            create_directory_link(skill_root / "linked-content", external)

            plugin = module.PluginSpec(
                name="repo-worker-pack",
                version="1.0.0",
                source_path="repo-worker-pack/1.0.0",
                skills_path="skills",
            )

            with self.assertRaisesRegex(ValueError, "link or reparse point"):
                module.read_skill_directories(plugin, source_root)

    def test_read_skill_directories_rejects_linked_skill_roots(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            source_root = Path(temp_dir) / "marketplace-source"
            skills_root = source_root / "repo-worker-pack" / "1.0.0" / "skills"
            real_skill = skills_root / "real-skill"
            real_skill.mkdir(parents=True)
            (real_skill / "SKILL.md").write_text("# real\n", encoding="utf-8")
            create_directory_link(skills_root / "linked-skill", real_skill)

            plugin = module.PluginSpec(
                name="repo-worker-pack",
                version="1.0.0",
                source_path="repo-worker-pack/1.0.0",
                skills_path="skills",
            )

            with self.assertRaisesRegex(ValueError, "link or reparse point"):
                module.read_skill_directories(plugin, source_root)

    @unittest.skipIf(sys.platform.startswith("win"), "POSIX executable bits are not portable on Windows")
    def test_trees_match_detects_executable_mode_drift(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source = temp / "source"
            destination = temp / "destination"
            source.mkdir()
            destination.mkdir()
            source_script = source / "run.sh"
            destination_script = destination / "run.sh"
            source_script.write_text("#!/usr/bin/env bash\n", encoding="utf-8")
            destination_script.write_text("#!/usr/bin/env bash\n", encoding="utf-8")
            source_script.chmod(0o755)
            destination_script.chmod(0o644)

            self.assertFalse(module.trees_match(source, destination))

    def test_trees_match_detects_empty_directory_drift(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            source = temp / "source"
            destination = temp / "destination"
            (source / "empty").mkdir(parents=True)
            destination.mkdir()

            self.assertFalse(module.trees_match(source, destination))

    def test_assert_pinned_source_checkout_reports_uninitialized_submodule(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            root = (Path(temp_dir) / "repo").resolve()
            source_root = root / ".agents" / "plugins" / "marketplace-source"
            source_root.mkdir(parents=True)
            module.ROOT = root

            with self.assertRaisesRegex(ValueError, "git submodule update --init --checkout"):
                module.assert_pinned_source_checkout(source_root, root)

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
            manifest = with_marketplace_source(manifest)

            module.require_linked_worktree = Mock()
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)
            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )

            module.require_linked_worktree.assert_not_called()

    def test_sync_rejects_noncanonical_output_root(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / "skills"
            source_root.mkdir(parents=True)

            manifest = with_marketplace_source(
                {
                    "schema_version": 1,
                    "default_plugins": [],
                    "excluded_plugins": [],
                    "plugins": {},
                }
            )

            module.require_linked_worktree = Mock()
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)
            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]

            with self.assertRaisesRegex(ValueError, "Derived skills must be written to the canonical repo-local output root"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

    def test_sync_rejects_case_insensitive_duplicate_skill_names(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)

            manifest = with_marketplace_source(
                {
                    "schema_version": 1,
                    "default_plugins": ["repo-worker-pack", "dotnet-kit"],
                    "excluded_plugins": [],
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
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)
            module.validate_plugin_versions = Mock()

            def fake_read_skill_directories(plugin, _source_root):  # type: ignore[no-untyped-def]
                if plugin.name == "repo-worker-pack":
                    return [("Testing", Path("testing"))]
                return [("testing", Path("testing-2"))]

            with patch.object(module, "read_skill_directories", side_effect=fake_read_skill_directories):
                with self.assertRaisesRegex(ValueError, "Duplicate skill name in marketplace selection: testing"):
                    module.sync_default_skills(
                        module.load_manifest_data(manifest),
                        source_root,
                        output_root,
                    )

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
            manifest = with_marketplace_source(manifest)

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
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

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

    def test_sync_write_mode_preserves_hardlinked_provenance_target(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            external = temp / "external"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)
            external.mkdir()

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
            manifest = with_marketplace_source(manifest)

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )
            sentinel = external / "sentinel.txt"
            sentinel.write_text("keep me\n", encoding="utf-8")
            create_file_hardlink(output_root / ".provenance.json", sentinel)

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            result = module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            self.assertEqual(result.copied_skills, ["boring-loop"])
            self.assertEqual(sentinel.read_text(encoding="utf-8"), "keep me\n")
            self.assertIn("source_revision", (output_root / ".provenance.json").read_text(encoding="utf-8"))

    def test_sync_rejects_version_mismatch_between_manifest_and_plugin(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

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
            manifest = with_marketplace_source(manifest)

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
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

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
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

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
            manifest = with_marketplace_source(manifest)

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )
            (output_root / "boring-loop").mkdir(parents=True, exist_ok=True)
            (output_root / "boring-loop" / "SKILL.md").write_text("# stale\n", encoding="utf-8")

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaisesRegex(ValueError, "Derived skills are stale"):
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
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)

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
            manifest = with_marketplace_source(manifest)

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaisesRegex(ValueError, "Derived skills are stale"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )

            self.assertFalse(output_root.exists())

    def test_sync_rejects_escaped_plugin_source_path(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

            manifest = with_marketplace_source(
                {
                    "schema_version": 1,
                    "default_plugins": ["repo-worker-pack"],
                    "excluded_plugins": [],
                    "plugins": {
                        "repo-worker-pack": {
                            "version": "1.0.0",
                            "source_path": "../outside",
                            "skills_path": "skills",
                        }
                    },
                }
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaisesRegex(ValueError, "escapes the marketplace source root"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

    def test_sync_rejects_escaped_skill_root_path(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

            plugin_root = source_root / "repo-worker-pack" / "1.0.0"
            (plugin_root / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (plugin_root / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )

            manifest = with_marketplace_source(
                {
                    "schema_version": 1,
                    "default_plugins": ["repo-worker-pack"],
                    "excluded_plugins": [],
                    "plugins": {
                        "repo-worker-pack": {
                            "version": "1.0.0",
                            "source_path": "repo-worker-pack/1.0.0",
                            "skills_path": "../../../outside-skills",
                        }
                    },
                }
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaisesRegex(ValueError, "escapes the marketplace source root"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

    def test_sync_write_mode_normalizes_case_variant_root_entries(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

            manifest = with_marketplace_source(
                {
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
            )

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "testing"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# testing\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )

            stale_root = output_root / "Testing"
            stale_root.mkdir(parents=True, exist_ok=True)
            (stale_root / "SKILL.md").write_text("# stale\n", encoding="utf-8")
            (output_root / "AGENTS.md").write_text("# agents\n", encoding="utf-8")
            (output_root / "INDEX.md").write_text("# index\n", encoding="utf-8")
            (output_root / ".provenance.json").write_text("{}", encoding="utf-8")

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            entries = sorted(path.name for path in output_root.iterdir())
            self.assertIn("testing", entries)
            self.assertNotIn("Testing", entries)

            module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
                check=True,
            )

    def test_sync_write_mode_replaces_changed_skills_and_removes_unexpected_root_files(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack"],
                "excluded_plugins": [],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "repo-worker-pack/1.0.0",
                        "skills_path": "skills",
                    },
                },
            }
            manifest = with_marketplace_source(manifest)

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop v1\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            (skill_root / "SKILL.md").write_text("# boring-loop v2\n", encoding="utf-8")
            (output_root / "stray.txt").write_text("unexpected\n", encoding="utf-8")

            module.sync_default_skills(
                module.load_manifest_data(manifest),
                source_root,
                output_root,
            )

            self.assertEqual((output_root / "boring-loop" / "SKILL.md").read_text(encoding="utf-8"), "# boring-loop v2\n")
            self.assertFalse((output_root / "stray.txt").exists())

    def test_sync_check_mode_detects_unexpected_root_files(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            module.ROOT = temp
            source_root = temp / ".agents" / "plugins" / "marketplace-source"
            output_root = temp / ".agents" / "skills"
            source_root.mkdir(parents=True)
            output_root.mkdir(parents=True)

            manifest = {
                "schema_version": 1,
                "default_plugins": ["repo-worker-pack"],
                "excluded_plugins": [],
                "plugins": {
                    "repo-worker-pack": {
                        "version": "1.0.0",
                        "source_path": "repo-worker-pack/1.0.0",
                        "skills_path": "skills",
                    },
                },
            }
            manifest = with_marketplace_source(manifest)

            skill_root = source_root / "repo-worker-pack" / "1.0.0" / "skills" / "boring-loop"
            skill_root.mkdir(parents=True, exist_ok=True)
            (skill_root / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (skill_root.parents[1] / ".codex-plugin").mkdir(parents=True, exist_ok=True)
            (skill_root.parents[1] / ".codex-plugin" / "plugin.json").write_text(
                json.dumps({"name": "repo-worker-pack", "version": "1.0.0"}),
                encoding="utf-8",
            )
            (output_root / "boring-loop").mkdir(parents=True, exist_ok=True)
            (output_root / "boring-loop" / "SKILL.md").write_text("# boring-loop\n", encoding="utf-8")
            (output_root / "stray.txt").write_text("unexpected\n", encoding="utf-8")

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaises(ValueError):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                    check=True,
                )

    def test_sync_rejects_duplicate_skill_names(self) -> None:
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
                "excluded_plugins": [],
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
            manifest = with_marketplace_source(manifest)

            for plugin_name in ["repo-worker-pack", "dotnet-kit"]:
                skill_root = source_root / manifest["plugins"][plugin_name]["source_path"] / "skills" / "boring-loop"
                skill_root.mkdir(parents=True, exist_ok=True)
                (skill_root / "SKILL.md").write_text(f"# {plugin_name}\n", encoding="utf-8")
                plugin_manifest = skill_root.parents[1] / ".codex-plugin"
                plugin_manifest.mkdir(parents=True, exist_ok=True)
                (plugin_manifest / "plugin.json").write_text(
                    json.dumps({"name": plugin_name, "version": "1.0.0"}),
                    encoding="utf-8",
                )

            module.get_git_revision = lambda _path: "abc123"  # type: ignore[assignment]
            module.require_linked_worktree = lambda _path: None  # type: ignore[assignment]
            stub_pinned_source_checkout(module)
            stub_marketplace_source_binding(module)

            with self.assertRaisesRegex(ValueError, "Duplicate skill name in marketplace selection: boring-loop"):
                module.sync_default_skills(
                    module.load_manifest_data(manifest),
                    source_root,
                    output_root,
                )

    def test_assert_pinned_source_checkout_rejects_dirty_source_tree(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            source_root = (root / ".agents" / "plugins" / "marketplace-source").resolve()
            source_root.mkdir(parents=True)

            module.ROOT = root
            module.assert_initialized_source_checkout = Mock()
            module.get_git_status_entries = lambda _path: [" M skills/boring-loop/SKILL.md"]  # type: ignore[assignment]
            module.get_gitlink_revision = Mock()
            module.get_git_revision = Mock()

            with self.assertRaisesRegex(ValueError, "Marketplace source tree must be clean"):
                module.assert_pinned_source_checkout(source_root, root)

            module.get_gitlink_revision.assert_not_called()
            module.get_git_revision.assert_not_called()

    def test_assert_pinned_source_checkout_rejects_gitlink_mismatch(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            source_root = (root / ".agents" / "plugins" / "marketplace-source").resolve()
            source_root.mkdir(parents=True)

            module.ROOT = root
            module.assert_initialized_source_checkout = Mock()
            module.get_git_status_entries = lambda _path: []  # type: ignore[assignment]
            module.get_gitlink_revision = lambda _repo_root, _relative_path: "expected-sha"  # type: ignore[assignment]
            module.get_git_revision = lambda _path: "actual-sha"  # type: ignore[assignment]

            with self.assertRaisesRegex(ValueError, "Marketplace source HEAD does not match the parent gitlink"):
                module.assert_pinned_source_checkout(source_root, root)

    def test_assert_marketplace_source_binding_rejects_path_mismatch(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            source_root = (root / ".agents" / "plugins" / "marketplace-source").resolve()
            source_root.mkdir(parents=True)
            (root / ".gitmodules").write_text(
                '[submodule ".agents/plugins/marketplace-source"]\n'
                "\tpath = .agents/plugins/marketplace-source\n"
                "\turl = https://github.com/HarleyBartles/agent-asset-marketplace.git\n",
                encoding="utf-8",
            )

            manifest = module.load_manifest_data(
                {
                    "schema_version": 1,
                    "marketplace_source": {
                        "repository": "https://github.com/HarleyBartles/agent-asset-marketplace.git",
                        "path": ".agents/plugins/elsewhere",
                    },
                    "default_plugins": [],
                    "excluded_plugins": [],
                    "plugins": {},
                }
            )

            with self.assertRaisesRegex(ValueError, "Marketplace manifest source path does not match"):
                module.assert_marketplace_source_binding(manifest, source_root, root)

    def test_assert_marketplace_source_binding_rejects_repository_mismatch(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            source_root = (root / ".agents" / "plugins" / "marketplace-source").resolve()
            source_root.mkdir(parents=True)
            (root / ".gitmodules").write_text(
                '[submodule ".agents/plugins/marketplace-source"]\n'
                "\tpath = .agents/plugins/marketplace-source\n"
                "\turl = https://github.com/HarleyBartles/agent-asset-marketplace.git\n",
                encoding="utf-8",
            )

            manifest = module.load_manifest_data(
                {
                    "schema_version": 1,
                    "marketplace_source": {
                        "repository": "https://example.com/not-the-marketplace.git",
                        "path": ".agents/plugins/marketplace-source",
                    },
                    "default_plugins": [],
                    "excluded_plugins": [],
                    "plugins": {},
                }
            )

            with self.assertRaisesRegex(ValueError, "Marketplace manifest source coordinates do not match the git submodule configuration"):
                module.assert_marketplace_source_binding(manifest, source_root, root)


if __name__ == "__main__":
    unittest.main()

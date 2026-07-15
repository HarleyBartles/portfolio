from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import Mock, patch
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_index_mesh.py"


def load_module():
    spec = importlib.util.spec_from_file_location("generate_index_mesh", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class GenerateIndexMeshTests(unittest.TestCase):
    def test_render_index_uses_provenance_for_new_derived_skills_only(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            root = (Path(temp_dir) / "repo").resolve()
            skills_root = root / ".agents" / "skills"
            existing = skills_root / "existing-skill"
            refreshed = skills_root / "newly-refreshed-skill"
            scratch = skills_root / "scratch"
            existing.mkdir(parents=True)
            refreshed.mkdir()
            scratch.mkdir()
            (existing / "SKILL.md").write_text("# existing\n", encoding="utf-8")
            (refreshed / "SKILL.md").write_text("# refreshed\n", encoding="utf-8")
            (scratch / "notes.txt").write_text("local only\n", encoding="utf-8")
            (skills_root / ".provenance.json").write_text(
                json.dumps(
                    {
                        "schema_version": 1,
                        "copied_skills": ["existing-skill", "newly-refreshed-skill"],
                    }
                ),
                encoding="utf-8",
            )

            module.ROOT = root
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {
                ".agents/skills/.provenance.json",
                ".agents/skills/existing-skill/SKILL.md",
            }

            rendered = module.render_index(skills_root)

            self.assertIn("[existing-skill](existing-skill/)", rendered)
            self.assertIn("[newly-refreshed-skill](newly-refreshed-skill/)", rendered)
            self.assertNotIn("scratch", rendered)

    def test_render_index_rejects_parent_path_in_derived_skill_provenance(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            root = (Path(temp_dir) / "repo").resolve()
            skills_root = root / ".agents" / "skills"
            skills_root.mkdir(parents=True)
            (skills_root / ".provenance.json").write_text(
                json.dumps({"schema_version": 1, "copied_skills": [".."]}),
                encoding="utf-8",
            )

            module.ROOT = root

            with self.assertRaisesRegex(ValueError, "Invalid derived skill name"):
                module.render_index(skills_root)

    def test_render_index_with_only_a_gitlink_does_not_report_no_children(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            root = (Path(temp_dir) / "repo").resolve()
            root.mkdir()
            gitlink = root / "marketplace-source"
            gitlink.mkdir()

            module.ROOT = root
            module.GITLINK_PATHS = {"marketplace-source"}
            module.GITIGNORED_PATHS = set()
            module.TRACKED_PATHS = {"marketplace-source"}

            rendered = module.render_index(root)

            self.assertIn("## Repositories", rendered)
            self.assertNotIn("No child entries.", rendered)

    def test_generated_header_routes_to_bash_and_powershell_wrappers(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            root = (Path(temp_dir) / "repo").resolve()
            root.mkdir()
            module.ROOT = root
            module.GITLINK_PATHS = set()
            module.GITIGNORED_PATHS = set()
            module.TRACKED_PATHS = set()

            rendered = module.render_index(root)

            self.assertIn(r".\scripts\generate_index_mesh.ps1", rendered)
            self.assertIn("bash ./scripts/generate_index_mesh.sh", rendered)

    def test_write_mode_is_stable_across_repeated_runs(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            docs = root / "docs"
            docs.mkdir(parents=True)
            (root / "README.md").write_text("root\n", encoding="utf-8")
            (docs / "guide.md").write_text("guide\n", encoding="utf-8")

            module.ROOT = root
            module.require_linked_worktree = Mock()
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {"README.md", "docs", "docs/guide.md"}

            with patch.object(sys, "argv", ["generate_index_mesh.py"]):
                first_result = module.main()
                first_snapshot = {
                    path.relative_to(root).as_posix(): path.read_text(encoding="utf-8")
                    for path in sorted(root.rglob("INDEX.md"))
                }
                second_result = module.main()
                second_snapshot = {
                    path.relative_to(root).as_posix(): path.read_text(encoding="utf-8")
                    for path in sorted(root.rglob("INDEX.md"))
                }

            self.assertEqual(first_result, 0)
            self.assertEqual(second_result, 0)
            self.assertEqual(first_snapshot, second_snapshot)

    def test_check_mode_skips_worktree_guard(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()

            module.ROOT = root
            module.require_linked_worktree = Mock()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = set()

            with patch.object(module, "walk_index_targets", return_value=[]), patch.object(
                sys, "argv", ["generate_index_mesh.py", "--check"]
            ):
                result = module.main()

            self.assertEqual(result, 0)
            module.require_linked_worktree.assert_not_called()

    def test_leaf_skill_indexes_link_directories_not_missing_child_indexes(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            current = root / ".agents" / "skills"
            child = current / "boring-loop"
            child.mkdir(parents=True)

            module.ROOT = root

            link = module.dir_link(current, child)

            self.assertEqual(link, "[boring-loop](boring-loop/)")

    def test_gitlink_directory_is_linked_as_directory_only(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()
            current = root / ".agents"
            child = current / "plugins"
            child.mkdir(parents=True)

            module.ROOT = root
            module.GITLINK_PATHS = {".agents/plugins"}

            self.assertFalse(module.should_descend(child))
            self.assertFalse(module.should_index(child))
            self.assertEqual(module.dir_link(current, child), "[plugins](plugins/)")

    def test_render_index_lists_gitlink_directory_without_descending_into_it(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            current = root / ".agents" / "plugins"
            gitlink = current / "marketplace-source"
            current.mkdir(parents=True)
            gitlink.mkdir()
            (current / "AGENTS.md").write_text("# plugins\n", encoding="utf-8")
            (current / "marketplace.json").write_text("{}", encoding="utf-8")

            module.ROOT = root
            module.GITLINK_PATHS = {".agents/plugins/marketplace-source"}
            module.GITIGNORED_PATHS = set()
            module.TRACKED_PATHS = {
                ".agents/AGENTS.md",
                ".agents/plugins/AGENTS.md",
                ".agents/plugins/marketplace.json",
            }

            rendered = module.render_index(current)

            self.assertIn("## Repositories", rendered)
            self.assertIn("- [marketplace-source](marketplace-source/)", rendered)
            self.assertNotIn("No child entries.", rendered)

    def test_render_index_includes_location_and_parent_link(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            current = root / "docs"
            current.mkdir(parents=True)
            (current / "guide.md").write_text("guide\n", encoding="utf-8")

            module.ROOT = root
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {"docs", "docs/guide.md"}

            rendered = module.render_index(current)

            self.assertIn("# `docs` Index", rendered)
            self.assertIn("## Location", rendered)
            self.assertIn("- Repo path: `docs`", rendered)
            self.assertIn("- Up: [parent index](../INDEX.md)", rendered)

    def test_validate_rendered_links_reports_missing_relative_targets(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()

            module.ROOT = root
            failures = module.validate_rendered_links(root / "INDEX.md", "- [missing](missing.md)")

            self.assertEqual(failures, ["broken-link: INDEX.md -> missing.md"])

    def test_main_requires_worktree_for_writes(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()

            module.ROOT = root
            module.require_linked_worktree = Mock()
            module.TRACKED_PATHS = set()

            with patch.object(module, "walk_index_targets", return_value=[]), patch.object(
                sys, "argv", ["generate_index_mesh.py"]
            ):
                result = module.main()

            self.assertEqual(result, 0)
            module.require_linked_worktree.assert_called_once_with(root)

    def test_gitignored_directory_is_not_descended_into(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()
            ignored = root / "ignored"
            ignored.mkdir()
            (ignored / ".git").write_text("gitdir: ../.git/modules/ignored\n", encoding="utf-8")
            (ignored / "child.txt").write_text("hidden\n", encoding="utf-8")

            module.ROOT = root
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()

            self.assertFalse(module.should_descend(ignored))
            self.assertFalse(module.should_index(ignored))

    def test_gitignored_path_is_not_descended_into(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            root.mkdir()
            target = root / "generated"
            target.mkdir()

            module.ROOT = root
            module.GITIGNORED_PATHS = {"generated"}
            module.GITLINK_PATHS = set()

            self.assertFalse(module.should_descend(target))
            self.assertFalse(module.should_index(target))

    def test_should_index_uses_repo_relative_parts(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "output" / "repo").resolve()
            child = root / "docs"
            child.mkdir(parents=True)

            module.ROOT = root
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {"docs"}

            self.assertTrue(module.should_index(child))

    def test_render_index_ignores_untracked_files(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()
            (root / "README.md").write_text("root\n", encoding="utf-8")
            (root / "scratch.tmp").write_text("scratch\n", encoding="utf-8")
            (root / "docs").mkdir()
            (root / "docs" / "guide.md").write_text("guide\n", encoding="utf-8")

            module.ROOT = root
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {"README.md", "docs", "docs/guide.md"}

            rendered = module.render_index(root)

            self.assertIn("# Repository Root", rendered)
            self.assertIn("## Location", rendered)
            self.assertIn("- [README.md](README.md)", rendered)
            self.assertIn("- [docs](docs/INDEX.md)", rendered)
            self.assertNotIn("scratch.tmp", rendered)

    def test_write_mode_prunes_orphaned_index_only_directory(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()
            (root / "README.md").write_text("root\n", encoding="utf-8")
            orphan = root / "orphan"
            orphan.mkdir()
            (orphan / "INDEX.md").write_text("# orphan\n", encoding="utf-8")

            module.ROOT = root
            module.require_linked_worktree = Mock()
            module.GITIGNORED_PATHS = set()
            module.GITLINK_PATHS = set()
            module.TRACKED_PATHS = {"README.md", "orphan/INDEX.md"}

            with patch.object(sys, "argv", ["generate_index_mesh.py"]):
                result = module.main()

            self.assertEqual(result, 0)
            self.assertFalse((orphan / "INDEX.md").exists())
            self.assertFalse(orphan.exists())

    def test_discover_existing_index_paths_uses_tracked_paths_only(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = (temp / "repo").resolve()
            root.mkdir()
            (root / "INDEX.md").write_text("# root\n", encoding="utf-8")
            (root / "docs").mkdir()
            (root / "docs" / "INDEX.md").write_text("# docs\n", encoding="utf-8")
            (root / "marketplace-source").mkdir()
            (root / "marketplace-source" / "INDEX.md").write_text("# submodule\n", encoding="utf-8")

            module.ROOT = root
            module.TRACKED_PATHS = {"INDEX.md", "docs", "docs/INDEX.md"}
            module.GITLINK_PATHS = {"marketplace-source"}

            paths = module.discover_existing_index_paths(root)

            self.assertEqual(
                {path.relative_to(root).as_posix() for path in paths},
                {"INDEX.md", "docs/INDEX.md"},
            )


if __name__ == "__main__":
    unittest.main()

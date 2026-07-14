from __future__ import annotations

import importlib.util
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
    def test_write_mode_is_stable_across_repeated_runs(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            docs = root / "docs"
            docs.mkdir(parents=True)
            (root / "README.md").write_text("root\n", encoding="utf-8")
            (docs / "guide.md").write_text("guide\n", encoding="utf-8")

            module.ROOT = root
            module.require_linked_worktree = Mock()
            module.GITIGNORED_PATHS = set()
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
            root = temp / "repo"
            root.mkdir()

            module.ROOT = root
            module.require_linked_worktree = Mock()

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
            root = temp / "repo"
            current = root / ".agents" / "skills"
            child = current / "boring-loop"
            child.mkdir(parents=True)

            module.ROOT = root

            link = module.dir_link(current, child)

            self.assertEqual(link, "[boring-loop](boring-loop/)")

    def test_validate_rendered_links_reports_missing_relative_targets(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            root.mkdir()

            module.ROOT = root
            failures = module.validate_rendered_links(root / "INDEX.md", "- [missing](missing.md)")

            self.assertEqual(failures, ["broken-link: INDEX.md -> missing.md"])

    def test_main_requires_worktree_for_writes(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            root.mkdir()

            module.ROOT = root
            module.require_linked_worktree = Mock()

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
            root = temp / "repo"
            root.mkdir()
            ignored = root / "ignored"
            ignored.mkdir()
            (ignored / ".git").write_text("gitdir: ../.git/modules/ignored\n", encoding="utf-8")
            (ignored / "child.txt").write_text("hidden\n", encoding="utf-8")

            module.ROOT = root
            module.GITIGNORED_PATHS = set()

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

            self.assertFalse(module.should_descend(target))
            self.assertFalse(module.should_index(target))


if __name__ == "__main__":
    unittest.main()

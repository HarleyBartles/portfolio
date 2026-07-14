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

    def test_submodule_directories_link_to_directory_not_child_index(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            current = root / ".agents" / "plugins"
            child = current / "marketplace-source"
            child.mkdir(parents=True)
            (child / ".git").write_text("gitdir: ../.git/modules/marketplace-source\n", encoding="utf-8")

            module.ROOT = root

            link = module.dir_link(current, child)

            self.assertEqual(link, "[marketplace-source](marketplace-source/)")

    def test_declared_submodule_is_detected_without_nested_git_file(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            current = root / ".agents" / "plugins"
            child = current / "marketplace-source"
            child.mkdir(parents=True)
            (root / ".gitmodules").write_text(
                """
[submodule ".agents/plugins/marketplace-source"]
	path = .agents/plugins/marketplace-source
	url = https://example.invalid/repo.git
""".lstrip(),
                encoding="utf-8",
            )

            module.ROOT = root
            module.load_declared_submodule_paths.cache_clear()

            self.assertTrue(module.is_submodule_root(child))
            self.assertEqual(module.dir_link(current, child), "[marketplace-source](marketplace-source/)")

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
                module, "should_index", return_value=False
            ), patch.object(sys, "argv", ["generate_index_mesh.py"]):
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

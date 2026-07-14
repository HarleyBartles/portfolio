from __future__ import annotations

import importlib.util
import io
import sys
from pathlib import Path
from unittest.mock import patch
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "assert_active_worktree.py"


def load_module():
    spec = importlib.util.spec_from_file_location("assert_active_worktree", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class AssertActiveWorktreeTests(unittest.TestCase):
    def test_accepts_linked_worktree(self) -> None:
        module = load_module()
        paths = module.GitPaths(".git/worktrees/portfolio", ".git", "")
        with patch.object(module, "read_git_paths", return_value=paths):
            result = module.assert_active_worktree(ROOT)
        self.assertEqual(result, paths)

    def test_allow_shared_checkout_bypasses_guard(self) -> None:
        module = load_module()
        paths = module.GitPaths(".git", ".git", "")
        with patch.object(module, "read_git_paths", return_value=paths):
            result = module.assert_active_worktree(ROOT, allow_shared_checkout=True)
        self.assertEqual(result, paths)

    def test_allow_shared_checkout_does_not_bypass_submodule(self) -> None:
        module = load_module()
        paths = module.GitPaths(".git", ".git", "C:/repo")
        with patch.object(module, "read_git_paths", return_value=paths):
            with self.assertRaises(RuntimeError):
                module.assert_active_worktree(ROOT, allow_shared_checkout=True)

    def test_rejects_shared_checkout(self) -> None:
        module = load_module()
        paths = module.GitPaths(".git", ".git", "")
        with patch.object(module, "read_git_paths", return_value=paths):
            with self.assertRaises(RuntimeError):
                module.assert_active_worktree(ROOT)

    def test_rejects_submodule(self) -> None:
        module = load_module()
        paths = module.GitPaths(".git", ".git", "C:/repo")
        with patch.object(module, "read_git_paths", return_value=paths):
            with self.assertRaises(RuntimeError):
                module.assert_active_worktree(ROOT)

    def test_main_reports_checkout_state_when_shared_checkout_is_allowed(self) -> None:
        module = load_module()
        stdout = io.StringIO()
        paths = module.GitPaths(".git", ".git", "")
        with patch.object(module, "read_git_paths", return_value=paths):
            result = module.main(["--allow-shared-checkout"], stdout=stdout)
        self.assertEqual(result, 0)
        self.assertIn("shared checkout", stdout.getvalue())


if __name__ == "__main__":
    unittest.main()

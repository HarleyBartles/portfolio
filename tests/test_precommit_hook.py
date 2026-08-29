from __future__ import annotations

import os
import re
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCAL_GIT_ENV_VARS = tuple(
    subprocess.run(
        ["git", "rev-parse", "--local-env-vars"],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=True,
    ).stdout.splitlines()
)


def run_git(repo: Path, *args: str, env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    isolated_env = (env or os.environ).copy()
    for variable in LOCAL_GIT_ENV_VARS:
        isolated_env.pop(variable, None)
    return subprocess.run(
        ["git", *args],
        cwd=repo,
        env=isolated_env,
        text=True,
        capture_output=True,
        check=False,
    )


class PreCommitHookTests(unittest.TestCase):
    def test_hook_enforces_the_complete_local_ci_gate(self) -> None:
        hook = (ROOT / ".githooks/pre-commit").read_text(encoding="utf-8")

        self.assertIn('"${PYTHON[@]}" tools/run.py ci --check --diagnostics', hook)
        self.assertNotIn('"${PYTHON[@]}" tools/run.py precommit --check', hook)

    def test_hook_commands_resolve_the_linked_worktree(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            temporary_root = Path(temporary)
            repo = temporary_root / "repo"
            repo.mkdir()
            self.assertEqual(run_git(repo, "init").returncode, 0)
            run_git(repo, "config", "user.name", "Hook Test")
            run_git(repo, "config", "user.email", "hook-test@example.invalid")
            tracked = repo / "tracked.txt"
            tracked.write_text("main\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            self.assertEqual(run_git(repo, "commit", "-m", "main").returncode, 0)

            worktree = temporary_root / "topic"
            self.assertEqual(run_git(repo, "worktree", "add", "-b", "topic", worktree.as_posix()).returncode, 0)
            tracked_in_worktree = worktree / "tracked.txt"
            tracked_in_worktree.write_text("topic\n", encoding="utf-8")
            run_git(worktree, "add", "tracked.txt")
            self.assertEqual(run_git(worktree, "commit", "-m", "topic").returncode, 0)
            topic_head = run_git(worktree, "rev-parse", "HEAD").stdout.strip()

            nested_repo = temporary_root / "nested-repo"
            nested_repo.mkdir()
            self.assertEqual(run_git(nested_repo, "init").returncode, 0)
            run_git(nested_repo, "config", "user.name", "Hook Test")
            run_git(nested_repo, "config", "user.email", "hook-test@example.invalid")
            nested_file = nested_repo / "nested.txt"
            nested_file.write_text("nested\n", encoding="utf-8")
            run_git(nested_repo, "add", "nested.txt")
            self.assertEqual(run_git(nested_repo, "commit", "-m", "nested").returncode, 0)
            nested_head = run_git(nested_repo, "rev-parse", "HEAD").stdout.strip()

            run_git(repo, "config", "core.hooksPath", ".githooks")
            hook = worktree / ".githooks/pre-commit"
            hook.parent.mkdir()
            shutil.copyfile(ROOT / ".githooks/pre-commit", hook)
            hook.chmod(0o755)
            fake_bin = temporary_root / "fake-bin"
            fake_bin.mkdir()
            fake_runner = """#!/usr/bin/env sh
case "$*" in
  *"ci --check"*)
    git rev-parse --show-toplevel > "$OBSERVED_ROOT"
    git -C "$NESTED_REPO" rev-parse HEAD > "$OBSERVED_HEAD"
    ;;
esac
exit 0
"""
            for executable in ("py", "python3", "python"):
                path = fake_bin / executable
                path.write_text(fake_runner, encoding="utf-8", newline="\n")
                path.chmod(0o755)

            tracked_in_worktree.write_text("ready\n", encoding="utf-8")
            run_git(worktree, "add", "tracked.txt")
            observed_root = temporary_root / "observed-root.txt"
            observed_head = temporary_root / "observed-head.txt"
            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}{os.pathsep}{env['PATH']}"
            env["OBSERVED_ROOT"] = str(observed_root)
            env["OBSERVED_HEAD"] = str(observed_head)
            env["NESTED_REPO"] = str(nested_repo)

            result = run_git(worktree, "commit", "-m", "ready", env=env)

            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(Path(observed_root.read_text(encoding="utf-8").strip()).resolve(), worktree.resolve())
            self.assertNotEqual(topic_head, nested_head)
            self.assertEqual(observed_head.read_text(encoding="utf-8").strip(), nested_head)

    def assert_hook_rejects_uncommitted_submodule_source(self, state: str) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            temporary_root = Path(temporary)
            source = temporary_root / "marketplace-source"
            source.mkdir()
            self.assertEqual(run_git(source, "init").returncode, 0)
            run_git(source, "config", "user.name", "Hook Test")
            run_git(source, "config", "user.email", "hook-test@example.invalid")
            source_file = source / "source.txt"
            source_file.write_text("committed source\n", encoding="utf-8")
            run_git(source, "add", "source.txt")
            self.assertEqual(run_git(source, "commit", "-m", "source").returncode, 0)

            repo = temporary_root / "repo"
            repo.mkdir()
            self.assertEqual(run_git(repo, "init").returncode, 0)
            run_git(repo, "config", "user.name", "Hook Test")
            run_git(repo, "config", "user.email", "hook-test@example.invalid")
            tracked = repo / "tracked.txt"
            tracked.write_text("initial\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            self.assertEqual(run_git(repo, "commit", "-m", "initial").returncode, 0)

            added = run_git(
                repo,
                "-c",
                "protocol.file.allow=always",
                "submodule",
                "add",
                source.as_posix(),
                ".agents/plugins/marketplace-source",
            )
            self.assertEqual(added.returncode, 0, added.stderr)
            run_git(repo, "add", ".gitmodules", ".agents/plugins/marketplace-source")
            self.assertEqual(run_git(repo, "commit", "-m", "add source").returncode, 0)

            submodule = repo / ".agents/plugins/marketplace-source"
            if state == "dirty":
                (submodule / "draft.txt").write_text("uncommitted source\n", encoding="utf-8")
            elif state == "wrong-head":
                run_git(submodule, "config", "user.name", "Hook Test")
                run_git(submodule, "config", "user.email", "hook-test@example.invalid")
                (submodule / "source.txt").write_text("different committed source\n", encoding="utf-8")
                run_git(submodule, "add", "source.txt")
                self.assertEqual(run_git(submodule, "commit", "-m", "different source").returncode, 0)
            else:
                self.fail(f"unknown submodule state: {state}")

            hook = repo / ".git/hooks/pre-commit"
            hook.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / ".githooks/pre-commit", hook)
            hook.chmod(0o755)

            fake_bin = temporary_root / "fake-bin"
            fake_bin.mkdir()
            fake_runner = """#!/usr/bin/env sh
case "$*" in
  *"ci --apply"*)
    printf 'ran\n' > "$FAKE_APPLY_MARKER"
    ;;
esac
exit 0
"""
            for executable in ("py", "python3", "python"):
                path = fake_bin / executable
                path.write_text(fake_runner, encoding="utf-8", newline="\n")
                path.chmod(0o755)

            tracked.write_text("staged change\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            apply_marker = temporary_root / "apply-ran.txt"
            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}{os.pathsep}{env['PATH']}"
            env["FAKE_APPLY_MARKER"] = str(apply_marker)
            result = run_git(repo, "commit", "-m", "must reject source drift", env=env)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("submodule source does not match the staged gitlink", result.stderr)
            self.assertFalse(apply_marker.exists(), "regeneration ran before rejecting submodule drift")

    def test_hook_rejects_dirty_submodule_before_regeneration(self) -> None:
        self.assert_hook_rejects_uncommitted_submodule_source("dirty")

    def test_hook_rejects_submodule_head_that_differs_from_staged_gitlink(self) -> None:
        self.assert_hook_rejects_uncommitted_submodule_source("wrong-head")

    def test_hook_validates_staged_content_not_an_unstaged_fix(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            temporary_root = Path(temporary)
            repo = temporary_root / "repo"
            repo.mkdir()
            self.assertEqual(run_git(repo, "init").returncode, 0)
            self.assertEqual(Path(run_git(repo, "rev-parse", "--show-toplevel").stdout.strip()).resolve(), repo.resolve())
            run_git(repo, "config", "user.name", "Hook Test")
            run_git(repo, "config", "user.email", "hook-test@example.invalid")

            tracked = repo / "tracked.txt"
            tracked.write_text("initial\n", encoding="utf-8")
            generated = repo / "docs/INDEX.md"
            generated.parent.mkdir()
            generated.write_text("initial\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt", "docs/INDEX.md")
            self.assertEqual(run_git(repo, "commit", "-m", "initial").returncode, 0)

            hook = repo / ".git/hooks/pre-commit"
            hook.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / ".githooks/pre-commit", hook)
            hook.chmod(0o755)

            fake_bin = temporary_root / "fake-bin"
            fake_bin.mkdir()
            fake_runner = """#!/usr/bin/env sh
case "$*" in
  *"ci --apply"*)
    cp tracked.txt docs/INDEX.md
    ;;
  *"ci --check"*)
    if grep -q BROKEN tracked.txt; then
      echo "staged check saw BROKEN" >&2
      exit 17
    fi
    ;;
esac
exit 0
"""
            for executable in ("py", "python3", "python"):
                path = fake_bin / executable
                path.write_text(fake_runner, encoding="utf-8", newline="\n")
                path.chmod(0o755)

            tracked.write_text("BROKEN staged content\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            tracked.write_text("unstaged fix\n", encoding="utf-8")
            untracked = repo / "draft.txt"
            untracked.write_text("keep me\n", encoding="utf-8")

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}{os.pathsep}{env['PATH']}"
            result = run_git(repo, "commit", "-m", "must fail", env=env)

            self.assertNotEqual(result.returncode, 0)
            self.assertIn("staged check saw BROKEN", result.stderr)
            self.assertEqual(tracked.read_text(encoding="utf-8"), "unstaged fix\n")
            self.assertEqual(untracked.read_text(encoding="utf-8"), "keep me\n")
            staged = run_git(repo, "show", ":tracked.txt")
            self.assertEqual(staged.stdout, "BROKEN staged content\n")
            generated_from_staged = run_git(repo, "show", ":docs/INDEX.md")
            self.assertEqual(generated_from_staged.stdout, "BROKEN staged content\n")

    def test_hook_preserves_patch_when_unstaged_restore_fails(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            temporary_root = Path(temporary)
            repo = temporary_root / "repo"
            repo.mkdir()
            self.assertEqual(run_git(repo, "init").returncode, 0)
            run_git(repo, "config", "user.name", "Hook Test")
            run_git(repo, "config", "user.email", "hook-test@example.invalid")

            tracked = repo / "tracked.txt"
            tracked.write_text("initial\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            self.assertEqual(run_git(repo, "commit", "-m", "initial").returncode, 0)

            hook = repo / ".git/hooks/pre-commit"
            hook.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / ".githooks/pre-commit", hook)
            hook.chmod(0o755)

            fake_bin = temporary_root / "fake-bin"
            fake_bin.mkdir()
            fake_runner = """#!/usr/bin/env sh
case "$*" in
  *"ci --check"*)
    printf 'gate mutation\n' > tracked.txt
    ;;
esac
exit 0
"""
            for executable in ("py", "python3", "python"):
                path = fake_bin / executable
                path.write_text(fake_runner, encoding="utf-8", newline="\n")
                path.chmod(0o755)

            tracked.write_text("staged content\n", encoding="utf-8")
            run_git(repo, "add", "tracked.txt")
            tracked.write_text("unstaged content\n", encoding="utf-8")
            draft = repo / "draft.txt"
            draft.write_text("keep me\n", encoding="utf-8")

            env = os.environ.copy()
            env["PATH"] = f"{fake_bin}{os.pathsep}{env['PATH']}"
            result = run_git(repo, "commit", "-m", "restore must fail safely", env=env)

            self.assertNotEqual(result.returncode, 0)
            match = re.search(r"unstaged patch could not be restored from (.+)", result.stderr)
            if match is None:
                self.fail(result.stderr)
            raw_patch_path = match.group(1).strip()
            patch_path = Path(raw_patch_path)
            if os.name == "nt" and raw_patch_path.startswith("/tmp/"):
                patch_path = Path(tempfile.gettempdir()) / patch_path.name
            try:
                self.assertTrue(patch_path.is_file(), result.stderr)
                self.assertIn("unstaged content", patch_path.read_text(encoding="utf-8"))
                self.assertEqual(draft.read_text(encoding="utf-8"), "keep me\n")
                self.assertEqual(run_git(repo, "show", ":tracked.txt").stdout, "staged content\n")
            finally:
                patch_path.unlink(missing_ok=True)


if __name__ == "__main__":
    unittest.main()

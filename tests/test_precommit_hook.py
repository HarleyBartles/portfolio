from __future__ import annotations

import os
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
  *"precommit --check"*)
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


if __name__ == "__main__":
    unittest.main()

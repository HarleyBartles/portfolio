#!/usr/bin/env python3
"""Fail fast when a mutation is about to run in the shared checkout."""

from __future__ import annotations

import argparse
import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class GitPaths:
    git_dir: str
    common_dir: str
    superproject: str


def read_git_paths(repo_root: Path) -> GitPaths:
    def run_git(*args: str) -> str:
        result = subprocess.run(
            ["git", "-C", str(repo_root), *args],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            raise RuntimeError(
                f"git {' '.join(args)} failed for {repo_root}:\n{result.stderr.strip()}"
            )
        return result.stdout.strip()

    return GitPaths(
        git_dir=run_git("rev-parse", "--git-dir"),
        common_dir=run_git("rev-parse", "--git-common-dir"),
        superproject=run_git("rev-parse", "--show-superproject-working-tree"),
    )


def is_linked_worktree(paths: GitPaths) -> bool:
    return paths.git_dir != paths.common_dir and not paths.superproject


def assert_active_worktree(repo_root: Path, *, allow_shared_checkout: bool = False) -> GitPaths:
    paths = read_git_paths(repo_root)
    if allow_shared_checkout:
        return paths
    if is_linked_worktree(paths):
        return paths

    reason = "shared checkout"
    if paths.superproject:
        reason = "submodule"
    raise RuntimeError(
        "This command must run from a linked worktree, not the "
        f"{reason}. Current git-dir={paths.git_dir!r}, common-dir={paths.common_dir!r}, "
        f"superproject={paths.superproject!r}."
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Assert that the current checkout is a linked worktree")
    parser.add_argument(
        "--allow-shared-checkout",
        action="store_true",
        help="Permit the shared checkout for intentional main-branch work",
    )
    args = parser.parse_args()

    paths = assert_active_worktree(ROOT, allow_shared_checkout=args.allow_shared_checkout)
    print(
        "OK linked worktree: "
        f"git-dir={paths.git_dir} common-dir={paths.common_dir} superproject={paths.superproject!r}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

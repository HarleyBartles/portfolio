#!/usr/bin/env python3
"""Fail fast when a mutation is about to run in the shared checkout."""

from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence, TextIO


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


def checkout_kind(paths: GitPaths) -> str:
    if paths.superproject:
        return "submodule"
    if paths.git_dir != paths.common_dir:
        return "linked worktree"
    return "shared checkout"


def resolve_main_checkout_root(repo_root: Path, common_dir: str) -> Path:
    common_path = Path(common_dir)
    if not common_path.is_absolute():
        common_path = repo_root / common_path
    common_path = common_path.resolve()
    return common_path.parents[0]


def canonical_worktree_root(main_checkout_root: Path) -> Path:
    return (main_checkout_root / ".." / "_agent-worktrees" / main_checkout_root.name).resolve()


def is_under(path: Path, ancestor: Path) -> bool:
    return path == ancestor or ancestor in path.parents


def assert_active_worktree(
    repo_root: Path, *, allow_shared_checkout: bool = False
) -> GitPaths:
    paths = read_git_paths(repo_root)
    kind = checkout_kind(paths)
    if kind == "linked worktree":
        main_checkout_root = resolve_main_checkout_root(repo_root, paths.common_dir)
        allowed_root = canonical_worktree_root(main_checkout_root)
        if not is_under(repo_root.resolve(), allowed_root):
            raise RuntimeError(
                "This linked worktree is outside the canonical external worktree root. "
                f"Current checkout={repo_root.resolve()!s}, allowed root={allowed_root!s}, "
                f"main checkout={main_checkout_root!s}."
            )
        return paths
    if allow_shared_checkout and kind == "shared checkout":
        return paths

    raise RuntimeError(
        "This command must run from a linked worktree, not the "
        f"{kind}. Current git-dir={paths.git_dir!r}, "
        f"common-dir={paths.common_dir!r}, superproject={paths.superproject!r}."
    )


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Assert that the current checkout is a linked worktree"
    )
    parser.add_argument(
        "--allow-shared-checkout",
        action="store_true",
        help="Permit the shared checkout for intentional main-branch work",
    )
    return parser.parse_args(argv)


def main(
    argv: Sequence[str] | None = None,
    *,
    stdout: TextIO | None = None,
) -> int:
    args = parse_args(argv)
    output = stdout or sys.stdout
    paths = assert_active_worktree(ROOT, allow_shared_checkout=args.allow_shared_checkout)
    if args.allow_shared_checkout and checkout_kind(paths) == "shared checkout":
        print(
            "WARNING: shared-checkout mutation override is active. "
            "Proceed only with explicit human approval for this task.",
            file=output,
        )
    print(
        f"OK {checkout_kind(paths)}: git-dir={paths.git_dir} "
        f"common-dir={paths.common_dir} superproject={paths.superproject!r}",
        file=output,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

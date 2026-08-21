#!/usr/bin/env python3
"""Canonical task runner for the portfolio repo."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

import shared_checkout


ROOT = Path(__file__).resolve().parent.parent
SCRIPT_NAME = "tools/run"


@dataclass(frozen=True)
class Ctx:
    mode: str
    allow_shared: bool
    verbose: bool = False


def _run(cmd: list[str], ctx: Ctx) -> None:
    if ctx.verbose:
        print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def _repo_standards_cmd(mode: str, allow_shared: bool) -> list[str]:
    cmd = [
        sys.executable,
        ".agents/skills/repo-standards/scripts/repo_standards.py",
        f"--{mode}",
        "--yes",
    ]
    if mode == "apply" and allow_shared:
        cmd.append("--allow-shared-checkout")
    return cmd


def _skills_cmd(mode: str, allow_shared: bool) -> list[str]:
    cmd = [
        sys.executable,
        ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
        f"--{mode}",
    ]
    if mode == "apply" and allow_shared:
        cmd.append("--allow-shared-checkout")
    return cmd


def _mesh_generate_cmd(mode: str, allow_shared: bool) -> list[str]:
    cmd = [
        sys.executable,
        "tools/generate_index_mesh.py",
        f"--{mode}",
    ]
    if mode == "apply" and allow_shared:
        cmd.append("--allow-shared-checkout")
    return cmd


def _mesh_validate_cmd() -> list[str]:
    return [
        sys.executable,
        ".agents/skills/generating-agent-mesh/scripts/validate_agent_mesh.py",
        "--check",
    ]


def _tests_cmd() -> list[str]:
    return [sys.executable, "-m", "unittest", "discover", "-s", "tests", "-v"]


def _link_hygiene_check_cmd() -> list[str]:
    return [sys.executable, "tools/check_link_hygiene.py"]


def _refresh_seo_files_cmd() -> list[str]:
    return [sys.executable, "tools/refresh_seo_files.py"]


def _client_cmd(*args: str) -> list[str]:
    return [shutil.which("npm") or "npm", "--prefix", "src/client", *args]


def _repo_standards_apply(ctx: Ctx) -> None:
    _run(_repo_standards_cmd("apply", ctx.allow_shared), ctx)
    _run(_repo_standards_cmd("check", ctx.allow_shared), ctx)


def _repo_standards_check(ctx: Ctx) -> None:
    _run(_repo_standards_cmd("check", ctx.allow_shared), ctx)


def _skills_apply(ctx: Ctx) -> None:
    _run(_skills_cmd("apply", ctx.allow_shared), ctx)
    _run(_skills_cmd("check", ctx.allow_shared), ctx)


def _skills_check(ctx: Ctx) -> None:
    _run(_skills_cmd("check", ctx.allow_shared), ctx)


def _mesh_apply(ctx: Ctx) -> None:
    _run(_mesh_generate_cmd("apply", ctx.allow_shared), ctx)
    _run(_mesh_generate_cmd("check", ctx.allow_shared), ctx)
    _run(_mesh_validate_cmd(), ctx)


def _mesh_check(ctx: Ctx) -> None:
    _run(_mesh_generate_cmd("check", ctx.allow_shared), ctx)
    _run(_mesh_validate_cmd(), ctx)


def _ci_apply(ctx: Ctx) -> None:
    _repo_standards_apply(ctx)
    _skills_apply(ctx)
    _mesh_apply(ctx)
    _run(_refresh_seo_files_cmd(), ctx)


def _precommit_check(ctx: Ctx) -> None:
    _repo_standards_check(ctx)
    _skills_check(ctx)
    _mesh_check(ctx)
    _run(_link_hygiene_check_cmd(), ctx)
    if any((ROOT / "tests").rglob("test*.py")):
        _run(_tests_cmd(), ctx)
    else:
        print("[tools/run] no Python tests under tests/; skipping test step")
    _run(_client_cmd("test", "--", "--run"), ctx)
    _run(_client_cmd("run", "build"), ctx)


def _ci_check(ctx: Ctx) -> None:
    _precommit_check(ctx)
    _run(_client_cmd("run", "test:e2e"), ctx)


def _all_apply(ctx: Ctx) -> None:
    _ci_apply(ctx)


def _all_check(ctx: Ctx) -> None:
    _ci_check(ctx)


TARGETS = {
    "repo-standards": {
        "apply": _repo_standards_apply,
        "check": _repo_standards_check,
    },
    "skills": {"apply": _skills_apply, "check": _skills_check},
    "mesh": {"apply": _mesh_apply, "check": _mesh_check},
    "precommit": {"apply": _ci_apply, "check": _precommit_check},
    "ci": {"apply": _ci_apply, "check": _ci_check},
    "all": {"apply": _all_apply, "check": _all_check},
}


def _run_steps(target: str, ctx: Ctx, step: object) -> None:
    print(f"[tools/run] === {target} ({ctx.mode})")
    step(ctx)


def main() -> int:
    parser = argparse.ArgumentParser(description="Canonical task runner for the portfolio repo")
    parser.add_argument("target", choices=list(TARGETS.keys()), help="target to run")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--apply", action="store_true", help="apply (write) mode")
    group.add_argument("--check", action="store_true", help="check (read-only) mode")
    parser.add_argument(
        "--allow-shared-checkout",
        action="store_true",
        help="allow writes in a shared/main checkout",
    )
    parser.add_argument("--verbose", "-v", action="store_true", help="print each sub-command")
    args = parser.parse_args()

    mode = "apply" if args.apply else "check"
    ctx = Ctx(mode=mode, allow_shared=args.allow_shared_checkout, verbose=args.verbose)

    if args.allow_shared_checkout and not args.apply:
        print("error: --allow-shared-checkout requires --apply", file=sys.stderr)
        return 1
    if args.apply:
        if not shared_checkout.approve_mutation(ROOT, SCRIPT_NAME, args.allow_shared_checkout):
            return 1

    try:
        _run_steps(args.target, ctx, TARGETS[args.target][mode])
    except subprocess.CalledProcessError as exc:
        print(f"[tools/run] target '{args.target}' failed: {exc}", file=sys.stderr)
        return 1

    print(f"[tools/run] {args.target} {mode} passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

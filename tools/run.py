#!/usr/bin/env python3
"""Canonical task runner for the portfolio repo."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import shared_checkout


ROOT = Path(__file__).resolve().parent.parent
SCRIPT_NAME = "tools/run"


@dataclass(frozen=True)
class Ctx:
    mode: str
    allow_shared: bool
    verbose: bool = False
    diagnostics: bool = False


@dataclass(frozen=True)
class DiagnosticResult:
    name: str
    blocked_by: str | None = None


class DiagnosticCheckError(RuntimeError):
    def __init__(self, failures: list[DiagnosticResult], skipped: list[DiagnosticResult]) -> None:
        self.failures = failures
        self.skipped = skipped
        failure_names = ", ".join(result.name for result in failures)
        super().__init__(f"diagnostic checks failed: {failure_names}")


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


def _refresh_skills_cmd(mode: str, allow_shared: bool) -> list[str]:
    cmd = [
        sys.executable,
        ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
        f"--{mode}",
    ]
    if mode == "apply" and allow_shared:
        cmd.append("--allow-shared-checkout")
    return cmd


def _skills_cmd(mode: str, allow_shared: bool) -> list[str]:
    """Compatibility alias for the pre-standard command name."""
    return _refresh_skills_cmd(mode, allow_shared)


def _index_mesh_cmd(mode: str, allow_shared: bool) -> list[str]:
    cmd = [
        sys.executable,
        ".agents/skills/generating-agent-mesh/scripts/generate_index_mesh.py",
        f"--{mode}",
        "--exclusions",
        "tools/index_mesh_exclusions.json",
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


def _portfolio_quality_check_cmd() -> list[str]:
    return [sys.executable, "tools/check_portfolio_quality.py"]


def _refresh_seo_files_cmd() -> list[str]:
    return [sys.executable, "tools/refresh_seo_files.py"]


def _client_cmd(*args: str) -> list[str]:
    return [shutil.which("npm") or "npm", "--prefix", "src/client", *args]


def _install_deps_cmd(mode: str) -> list[str]:
    if mode == "apply":
        return _client_cmd("ci")
    return _client_cmd("ls", "--depth=0")


def _install_deps_apply(ctx: Ctx) -> None:
    _run(_install_deps_cmd("apply"), ctx)


def _install_deps_check(ctx: Ctx) -> None:
    _run(_install_deps_cmd("check"), ctx)


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
    _index_mesh_apply(ctx)
    _run(_mesh_validate_cmd(), ctx)


def _mesh_check(ctx: Ctx) -> None:
    _index_mesh_check(ctx)
    _run(_mesh_validate_cmd(), ctx)


def _index_mesh_apply(ctx: Ctx) -> None:
    _run(_index_mesh_cmd("apply", ctx.allow_shared), ctx)
    _run(_index_mesh_cmd("check", ctx.allow_shared), ctx)


def _index_mesh_check(ctx: Ctx) -> None:
    _run(_index_mesh_cmd("check", ctx.allow_shared), ctx)


def _ci_apply(ctx: Ctx) -> None:
    _repo_standards_apply(ctx)
    _skills_apply(ctx)
    _mesh_apply(ctx)
    _run(_refresh_seo_files_cmd(), ctx)


def _python_tests_check(ctx: Ctx) -> None:
    if any((ROOT / "tests").rglob("test*.py")):
        _run(_tests_cmd(), ctx)
    else:
        print("[tools/run] no Python tests under tests/; skipping test step")


def _check_steps(include_e2e: bool) -> list[tuple[str, Callable[[Ctx], None], str | None]]:
    steps = [
        ("repository standards", _repo_standards_check, None),
        ("installed skills", _skills_check, None),
        ("agent mesh", _mesh_check, None),
        ("link hygiene", lambda ctx: _run(_link_hygiene_check_cmd(), ctx), None),
        ("portfolio quality", lambda ctx: _run(_portfolio_quality_check_cmd(), ctx), None),
        ("Python tests", _python_tests_check, None),
        ("client unit tests", lambda ctx: _run(_client_cmd("test", "--", "--run"), ctx), None),
        ("production build", lambda ctx: _run(_client_cmd("run", "build"), ctx), None),
    ]
    if include_e2e:
        steps.append(("Playwright journeys", lambda ctx: _run(_client_cmd("run", "test:e2e"), ctx), "production build"))
    return steps


def _diagnostic_check(ctx: Ctx, include_e2e: bool) -> None:
    failures: list[DiagnosticResult] = []
    skipped: list[DiagnosticResult] = []
    failed_names: set[str] = set()

    for name, action, blocked_by in _check_steps(include_e2e):
        if blocked_by in failed_names:
            skipped.append(DiagnosticResult(name, blocked_by))
            print(f"[tools/run] {name}: skipped because {blocked_by} failed")
            continue
        try:
            action(ctx)
        except Exception as exc:
            failures.append(DiagnosticResult(name))
            failed_names.add(name)
            print(f"[tools/run] {name}: failed ({exc})", file=sys.stderr)

    if failures:
        print("[tools/run] diagnostic report:", file=sys.stderr)
        for result in failures:
            print(f"[tools/run] FAIL {result.name}", file=sys.stderr)
        for result in skipped:
            print(f"[tools/run] SKIP {result.name}: requires {result.blocked_by}", file=sys.stderr)
        raise DiagnosticCheckError(failures, skipped)


def _precommit_check(ctx: Ctx) -> None:
    if ctx.diagnostics:
        _diagnostic_check(ctx, include_e2e=False)
        return
    _repo_standards_check(ctx)
    _skills_check(ctx)
    _mesh_check(ctx)
    _run(_link_hygiene_check_cmd(), ctx)
    _run(_portfolio_quality_check_cmd(), ctx)
    _python_tests_check(ctx)
    _run(_client_cmd("test", "--", "--run"), ctx)
    _run(_client_cmd("run", "build"), ctx)


def _ci_check(ctx: Ctx) -> None:
    if ctx.diagnostics:
        _diagnostic_check(ctx, include_e2e=True)
        return
    _precommit_check(ctx)
    _run(_client_cmd("run", "test:e2e"), ctx)


def _all_apply(ctx: Ctx) -> None:
    _ci_apply(ctx)


def _all_check(ctx: Ctx) -> None:
    _ci_check(ctx)


TARGETS = {
    "install-deps": {"apply": _install_deps_apply, "check": _install_deps_check},
    "repo-standards": {
        "apply": _repo_standards_apply,
        "check": _repo_standards_check,
    },
    "refresh-skills": {"apply": _skills_apply, "check": _skills_check},
    "skills": {"apply": _skills_apply, "check": _skills_check},
    "index-mesh": {"apply": _index_mesh_apply, "check": _index_mesh_check},
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
    parser.add_argument(
        "--diagnostics",
        action="store_true",
        help="collect independent check failures before rejecting a check run",
    )
    parser.add_argument("--verbose", "-v", action="store_true", help="print each sub-command")
    args = parser.parse_args()

    mode = "apply" if args.apply else "check"
    ctx = Ctx(
        mode=mode,
        allow_shared=args.allow_shared_checkout,
        verbose=args.verbose,
        diagnostics=args.diagnostics,
    )

    if args.allow_shared_checkout and not args.apply:
        print("error: --allow-shared-checkout requires --apply", file=sys.stderr)
        return 1
    if args.diagnostics and args.apply:
        print("error: --diagnostics requires --check", file=sys.stderr)
        return 1
    if args.apply:
        if not shared_checkout.approve_mutation(ROOT, SCRIPT_NAME, args.allow_shared_checkout):
            return 1

    try:
        _run_steps(args.target, ctx, TARGETS[args.target][mode])
    except (subprocess.CalledProcessError, DiagnosticCheckError) as exc:
        print(f"[tools/run] target '{args.target}' failed: {exc}", file=sys.stderr)
        return 1

    print(f"[tools/run] {args.target} {mode} passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

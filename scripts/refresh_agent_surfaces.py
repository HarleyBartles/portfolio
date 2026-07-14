#!/usr/bin/env python3
"""Refresh deterministic repo surfaces that agent workflows depend on."""

from __future__ import annotations

import argparse
import dataclasses
import subprocess
import sys
from pathlib import Path
from typing import Sequence


ROOT = Path(__file__).resolve().parents[1]


@dataclasses.dataclass(frozen=True)
class RefreshStep:
    name: str
    script: Path
    check_args: tuple[str, ...] = ("--check",)
    write_args: tuple[str, ...] = ()


REFRESH_STEPS: tuple[RefreshStep, ...] = (
    RefreshStep(name="index mesh", script=ROOT / "scripts" / "generate_index_mesh.py"),
    RefreshStep(name="derived skills", script=ROOT / "scripts" / "install_agent_skills.py"),
)


def run_script(script: Path, args: Sequence[str]) -> None:
    result = subprocess.run(
        [sys.executable, str(script), *args],
        cwd=ROOT,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"{script.name} failed with exit code {result.returncode}")


def run_refresh(*, check: bool) -> None:
    for step in REFRESH_STEPS:
        run_script(step.script, step.check_args if check else step.write_args)


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Refresh deterministic repo surfaces that agent workflows depend on"
    )
    parser.add_argument("--check", action="store_true", help="Validate without writing")
    args = parser.parse_args(argv)

    run_refresh(check=args.check)
    mode = "checked" if args.check else "refreshed"
    print(f"OK {mode} agent surfaces: {', '.join(step.name for step in REFRESH_STEPS)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

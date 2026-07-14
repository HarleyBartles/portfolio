#!/usr/bin/env python3
"""Refresh or validate the deterministic agent-facing repo surfaces."""

from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Sequence, TextIO


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class RefreshStep:
    name: str
    script_name: str

    def command(self, *, check: bool) -> list[str]:
        command = [sys.executable, str(ROOT / "scripts" / self.script_name)]
        if check:
            command.append("--check")
        return command


STEPS = (
    RefreshStep(name="index mesh", script_name="generate_index_mesh.py"),
    RefreshStep(name="agent skills", script_name="install_agent_skills.py"),
)


def run_refresh(
    *,
    check: bool,
    stdout: TextIO,
    stderr: TextIO,
    runner: Callable[..., subprocess.CompletedProcess[str]] = subprocess.run,
) -> int:
    mode = "Check" if check else "Refresh"
    for step in STEPS:
        print(f"{mode} {step.name}...", file=stdout)
        result = runner(
            step.command(check=check),
            cwd=ROOT,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )
        if result.stdout:
            print(result.stdout.rstrip(), file=stdout)
        if result.returncode != 0:
            if result.stderr:
                print(result.stderr.rstrip(), file=stderr)
            print(
                f"{mode} failed for {step.name} with exit code {result.returncode}.",
                file=stderr,
            )
            return result.returncode
    print(f"{mode} completed for {len(STEPS)} surfaces.", file=stdout)
    return 0


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Refresh the deterministic agent-facing repo surfaces"
    )
    parser.add_argument("--check", action="store_true", help="Validate without writing")
    return parser.parse_args(argv)


def main(
    argv: Sequence[str] | None = None,
    *,
    stdout: TextIO | None = None,
    stderr: TextIO | None = None,
    runner: Callable[..., subprocess.CompletedProcess[str]] = subprocess.run,
) -> int:
    args = parse_args(argv)
    return run_refresh(
        check=args.check,
        stdout=stdout or sys.stdout,
        stderr=stderr or sys.stderr,
        runner=runner,
    )


if __name__ == "__main__":
    raise SystemExit(main())

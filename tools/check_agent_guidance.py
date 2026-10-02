#!/usr/bin/env python3
"""Check authored AGENTS routers for local budgets and resolvable links."""

from __future__ import annotations

import re
import argparse
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
MARKDOWN_LINK = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
HEADING = re.compile(r"(?m)^#{1,6}\s+(.+?)\s*#*\s*$")
ROOT_BUDGET = 80
SCOPED_BUDGET = 32


def _anchor(text: str, name: str) -> bool:
    target = name.strip().lower().replace("`", "")
    target = re.sub(r"[^\w -]", "", target)
    target = re.sub(r"\s+", "-", target)
    return target in {re.sub(r"[^\w-]", "", heading.lower().replace(" ", "-")) for heading in HEADING.findall(text)}


def check_router(root: Path, path: Path, budget: int) -> list[str]:
    findings: list[str] = []
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"{path}: cannot read router: {exc}"]
    relative = path.relative_to(root).as_posix()
    lines = len(text.splitlines())
    if lines > budget:
        findings.append(f"{relative}: {lines} lines exceeds router budget {budget}")
    for match in MARKDOWN_LINK.finditer(text):
        destination = match.group(1).strip().split(maxsplit=1)[0].strip("<>")
        parsed = urlsplit(destination)
        if parsed.scheme or parsed.netloc or destination.startswith("//"):
            continue
        target = unquote(parsed.path)
        if not target:
            if parsed.fragment and not _anchor(text, unquote(parsed.fragment)):
                findings.append(f"{relative}: missing heading anchor #{parsed.fragment}")
            continue
        resolved = (path.parent / target).resolve()
        try:
            resolved.relative_to(root.resolve())
        except ValueError:
            findings.append(f"{relative}: link escapes repository: {destination}")
            continue
        if not resolved.is_file():
            findings.append(f"{relative}: linked file does not exist: {destination}")
        elif parsed.fragment and resolved.suffix.lower() == ".md":
            try:
                linked_text = resolved.read_text(encoding="utf-8")
            except (OSError, UnicodeError):
                continue
            if not _anchor(linked_text, unquote(parsed.fragment)):
                findings.append(f"{relative}: linked heading does not exist: {destination}")
    return findings


def check_all(root: Path = ROOT) -> list[str]:
    routers = [root / "AGENTS.md", *root.rglob("AGENTS.md")]
    excluded = {".git", "node_modules", ".venv"}
    unique = sorted({path for path in routers if path.is_file() and not excluded.intersection(path.relative_to(root).parts)})
    findings: list[str] = []
    for path in unique:
        budget = ROOT_BUDGET if path == root / "AGENTS.md" else SCOPED_BUDGET
        findings.extend(check_router(root, path, budget))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check without modifying repository files")
    parser.parse_args()
    findings = check_all()
    if findings:
        print("\n".join(f"ERROR: {finding}" for finding in findings))
        return 1
    print("OK authored AGENTS routers: budgets and local links are valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

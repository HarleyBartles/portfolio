#!/usr/bin/env python3
"""Validate that every doctrine document is discoverable from the agents mesh."""

from __future__ import annotations

import argparse
import os
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCTRINE_ROOT = ROOT / ".agents" / "doctrine"
LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
ALWAYS_EXCLUDED_DIR_NAMES = {
    ".git",
    ".codex",
    "__pycache__",
    "bin",
    "obj",
    "dist",
    "output",
    "node_modules",
    ".pytest_cache",
}


def is_under(path: Path, ancestor: Path) -> bool:
    return path == ancestor or ancestor in path.parents


def resolve_link_target(current: Path, target: str) -> Path | None:
    if target.startswith(("http://", "https://", "mailto:")):
        return None
    clean_target = target.split("#", 1)[0]
    if not clean_target:
        return None
    resolved = (current.parent / clean_target).resolve()
    if not is_under(resolved, ROOT):
        return None
    return resolved if resolved.exists() else None


def discover_doctrine_docs() -> list[Path]:
    if not DOCTRINE_ROOT.exists():
        return []
    docs: list[Path] = []
    for path in DOCTRINE_ROOT.rglob("*.md"):
        if path.name == "INDEX.md":
            continue
        docs.append(path)
    return sorted(docs)


def discover_mesh_files() -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "-z"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "git ls-files failed:\n"
            + result.stderr.decode("utf-8", errors="replace").strip()
        )

    files: list[Path] = []
    for raw_path in result.stdout.decode("utf-8", errors="replace").split("\0"):
        if not raw_path:
            continue
        if not raw_path.endswith("AGENTS.md"):
            continue
        path = ROOT / raw_path
        if any(part in ALWAYS_EXCLUDED_DIR_NAMES for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return sorted(files)


def build_reference_map(mesh_files: list[Path]) -> dict[Path, list[Path]]:
    references: dict[Path, list[Path]] = {}
    for mesh_file in mesh_files:
        current_text = mesh_file.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
        for _label, raw_target in LINK_PATTERN.findall(current_text):
            resolved = resolve_link_target(mesh_file, raw_target)
            if resolved is None:
                continue
            references.setdefault(resolved, []).append(mesh_file)
    return references


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate doctrine discoverability through the agents mesh")
    parser.add_argument("--check", "--validate", dest="check", action="store_true", help="validate without writing")
    args = parser.parse_args()

    docs = discover_doctrine_docs()
    mesh_files = discover_mesh_files()
    references = build_reference_map(mesh_files)

    missing: list[str] = []
    for doc in docs:
        if doc not in references:
            missing.append(str(doc.relative_to(ROOT)))

    if missing:
        raise ValueError("Doctrine mesh is missing references for:\n" + "\n".join(f"- {item}" for item in missing))

    print(f"OK doctrine mesh: {len(docs)} doctrine docs referenced from {len(mesh_files)} mesh files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

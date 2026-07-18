#!/usr/bin/env python3
"""Validate that every doctrine document is discoverable from the agents mesh."""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCTRINE_ROOT = ROOT / ".agents" / "doctrine"
SKILLS_ROOT = ROOT / ".agents" / "skills"
PROVENANCE_PATH = SKILLS_ROOT / ".provenance.json"
LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
LOCAL_SKILL_PREFIX = "port-"
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


def discover_authored_documents() -> list[Path]:
    roots = [
        ROOT / ".agents" / "doctrine",
        ROOT / ".agents" / "docs",
        ROOT / ".agents" / "guides",
        ROOT / "scripts",
    ]
    documents: set[Path] = {ROOT / "AGENTS.md"}
    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*.md"):
            if path.name != "INDEX.md":
                documents.add(path)
    if SKILLS_ROOT.exists():
        for skill_root in SKILLS_ROOT.iterdir():
            if not skill_root.is_dir() or not skill_root.name.casefold().startswith(LOCAL_SKILL_PREFIX):
                continue
            for path in skill_root.rglob("*.md"):
                if path.name != "INDEX.md":
                    documents.add(path)
    return sorted(path for path in documents if path.exists())


def discover_tracked_mesh_files() -> set[Path]:
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

    files: set[Path] = set()
    for raw_path in result.stdout.decode("utf-8", errors="replace").split("\0"):
        if not raw_path:
            continue
        if not raw_path.endswith("AGENTS.md"):
            continue
        path = ROOT / raw_path
        if any(part in ALWAYS_EXCLUDED_DIR_NAMES for part in path.relative_to(ROOT).parts):
            continue
        files.add(path)
    return files


def discover_reachable_mesh_files() -> list[Path]:
    tracked_mesh_files = discover_tracked_mesh_files()
    root_agents = ROOT / "AGENTS.md"
    if root_agents not in tracked_mesh_files:
        return []

    reachable: set[Path] = set()
    queue = [root_agents]
    while queue:
        mesh_file = queue.pop()
        if mesh_file in reachable:
            continue
        reachable.add(mesh_file)
        current_text = mesh_file.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
        for _label, raw_target in LINK_PATTERN.findall(current_text):
            resolved = resolve_link_target(mesh_file, raw_target)
            if resolved is None or resolved.name != "AGENTS.md":
                continue
            if resolved in tracked_mesh_files and resolved not in reachable:
                queue.append(resolved)
    return sorted(reachable)


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


def find_broken_authored_links() -> list[str]:
    broken: list[str] = []
    for document in discover_authored_documents():
        text = document.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
        for _label, raw_target in LINK_PATTERN.findall(text):
            if raw_target.startswith(("http://", "https://", "mailto:")):
                continue
            clean_target = raw_target.split("#", 1)[0]
            if not clean_target:
                continue
            if resolve_link_target(document, raw_target) is None:
                broken.append(f"{document.relative_to(ROOT).as_posix()} -> {raw_target}")
    return broken


def find_local_skill_provenance_conflicts() -> list[str]:
    if not SKILLS_ROOT.exists() or not PROVENANCE_PATH.exists():
        return []

    try:
        provenance = json.loads(PROVENANCE_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return [f"{PROVENANCE_PATH.relative_to(ROOT)} is not valid JSON: {exc}"]

    copied_skills = {
        str(name).casefold() for name in provenance.get("copied_skills", [])
    }
    conflicts: list[str] = []
    for path in SKILLS_ROOT.iterdir():
        if not path.name.casefold().startswith(LOCAL_SKILL_PREFIX):
            continue
        if not path.is_dir():
            conflicts.append(f"{path.relative_to(ROOT).as_posix()} is not a directory")
            continue
        if path.name.casefold() in copied_skills:
            conflicts.append(
                f"{path.relative_to(ROOT).as_posix()} is incorrectly listed in marketplace provenance"
            )
        if not (path / "SKILL.md").is_file():
            conflicts.append(f"{path.relative_to(ROOT).as_posix()} is missing SKILL.md")
    return conflicts


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate doctrine discoverability through the agents mesh")
    parser.add_argument("--check", "--validate", dest="check", action="store_true", help="validate without writing")
    args = parser.parse_args()

    docs = discover_doctrine_docs()
    mesh_files = discover_reachable_mesh_files()
    references = build_reference_map(mesh_files)

    missing: list[str] = []
    for doc in docs:
        if doc not in references:
            missing.append(str(doc.relative_to(ROOT)))

    if missing:
        raise ValueError("Doctrine mesh is missing references for:\n" + "\n".join(f"- {item}" for item in missing))

    broken_links = find_broken_authored_links()
    if broken_links:
        raise ValueError("Authored agent links are broken:\n" + "\n".join(f"- {item}" for item in broken_links))

    provenance_conflicts = find_local_skill_provenance_conflicts()
    if provenance_conflicts:
        raise ValueError("Portfolio local skill custody is invalid:\n" + "\n".join(f"- {item}" for item in provenance_conflicts))

    print(f"OK doctrine mesh: {len(docs)} doctrine docs referenced from {len(mesh_files)} mesh files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

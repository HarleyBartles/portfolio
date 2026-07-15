#!/usr/bin/env python3
"""Generate or validate the repo-wide INDEX.md mesh for portfolio."""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
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
ALWAYS_EXCLUDED_FILE_NAMES = {".git"}
INDEX_NAME = "INDEX.md"


@dataclass(frozen=True)
class IndexTarget:
    path: Path
    lines: list[str]


LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


def load_gitlink_paths(root: Path) -> set[str]:
    """Ask git which repo-relative paths are submodule gitlinks."""
    result = subprocess.run(
        ["git", "ls-files", "--stage", "-z"],
        cwd=root,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "git ls-files --stage failed:\n"
            + result.stderr.decode("utf-8", errors="replace").strip()
        )

    gitlinks: set[str] = set()
    for record in result.stdout.decode("utf-8", errors="replace").split("\0"):
        if not record:
            continue
        try:
            metadata, relative_path = record.split("\t", 1)
        except ValueError:
            continue
        mode = metadata.split(" ", 1)[0]
        if mode == "160000":
            gitlinks.add(relative_path)
    return gitlinks


GITLINK_PATHS = load_gitlink_paths(ROOT)


def is_gitlink(path: Path) -> bool:
    relative_path = path.relative_to(ROOT).as_posix()
    if relative_path in GITLINK_PATHS:
        return True

    for parent in path.parents:
        if parent == ROOT:
            break
        parent_relative = parent.relative_to(ROOT).as_posix()
        if parent_relative in GITLINK_PATHS:
            return True

    return False


def collect_candidate_paths(root: Path) -> list[Path]:
    """Collect repo-relative paths that may be ignored by git."""
    candidates: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        current = Path(dirpath)
        dirnames[:] = sorted(
            (
                name
                for name in dirnames
                if name not in ALWAYS_EXCLUDED_DIR_NAMES and not is_gitlink(current / name)
            ),
            key=lambda name: (name.casefold(), name),
        )
        for dirname in dirnames:
            candidates.append(current / dirname)
        for filename in sorted(filenames, key=lambda name: (name.casefold(), name)):
            if filename in ALWAYS_EXCLUDED_FILE_NAMES:
                continue
            candidates.append(current / filename)
    return candidates


def load_gitignored_paths(root: Path) -> set[str]:
    """Ask git which repo-relative paths are ignored."""
    gitignore_path = root / ".gitignore"
    if not gitignore_path.exists():
        return set()

    candidates = collect_candidate_paths(root)
    if not candidates:
        return set()

    relative_candidates = [path.relative_to(root).as_posix() for path in candidates]
    input_data = ("\0".join(relative_candidates) + "\0").encode("utf-8")
    result = subprocess.run(
        ["git", "check-ignore", "-z", "--stdin"],
        cwd=root,
        input=input_data,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode not in {0, 1}:
        raise RuntimeError(
            "git check-ignore failed:\n"
            + result.stderr.decode("utf-8", errors="replace").strip()
        )

    ignored = {item for item in result.stdout.decode("utf-8", errors="replace").split("\0") if item}
    return ignored


GITIGNORED_PATHS = load_gitignored_paths(ROOT)
TRACKED_PATHS = {
    path
    for path in (
        subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=ROOT,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False,
        ).stdout.decode("utf-8", errors="replace").split("\0")
    )
    if path
}


def is_under(path: Path, ancestor: Path) -> bool:
    return path == ancestor or ancestor in path.parents


def is_gitignored(path: Path) -> bool:
    if path.name in ALWAYS_EXCLUDED_DIR_NAMES:
        return True
    if path.name in ALWAYS_EXCLUDED_FILE_NAMES:
        return True
    if is_gitlink(path):
        return True

    relative_path = path.relative_to(ROOT)
    path_str = relative_path.as_posix()

    if path_str in GITIGNORED_PATHS:
        return True

    for parent in path.parents:
        if parent == ROOT:
            break
        if is_gitlink(parent):
            return True
        parent_relative = parent.relative_to(ROOT)
        parent_str = parent_relative.as_posix()
        if parent_str in GITIGNORED_PATHS:
            return True

    return False


def relative_parts(path: Path) -> tuple[str, ...]:
    return path.relative_to(ROOT).parts


def has_tracked_content(path: Path) -> bool:
    try:
        relative = path.relative_to(ROOT).as_posix()
    except ValueError:
        return False
    if relative == ".":
        return any(Path(item).name != INDEX_NAME for item in TRACKED_PATHS)
    prefix = relative + "/"
    return any(
        item == relative or item.startswith(prefix)
        for item in TRACKED_PATHS
        if Path(item).name != INDEX_NAME
    )


def is_tracked(path: Path) -> bool:
    try:
        relative = path.relative_to(ROOT).as_posix()
    except ValueError:
        return False
    if path.is_file():
        return relative in TRACKED_PATHS
    if path == ROOT:
        return True
    return has_tracked_content(path)


def should_descend(child: Path) -> bool:
    if child.name in ALWAYS_EXCLUDED_DIR_NAMES:
        return False
    if is_gitlink(child):
        return False
    if is_gitignored(child):
        return False
    if not has_tracked_content(child):
        return False
    return True


def should_index(path: Path) -> bool:
    if path == ROOT:
        return True
    if any(part in ALWAYS_EXCLUDED_DIR_NAMES for part in relative_parts(path)):
        return False
    if is_gitlink(path):
        return False
    if is_gitignored(path):
        return False
    if not has_tracked_content(path):
        return False
    return True


def is_leaf_index_dir(path: Path) -> bool:
    try:
        relative = path.relative_to(ROOT).as_posix()
    except ValueError:
        return False
    return relative in {".agents/skills", ".agents/plugins/marketplace-source"}


def rel_link(current: Path, target: Path, label: str | None = None) -> str:
    rel = os.path.relpath(target, start=current).replace(os.sep, "/")
    return f"[{label or target.name}]({rel})"


def index_title(path: Path) -> str:
    if path == ROOT:
        return "Repository Root"
    return f"`{path.relative_to(ROOT).as_posix()}` Index"


def dir_link(current: Path, child: Path) -> str:
    if is_gitlink(child):
        rel = os.path.relpath(child, start=current).replace(os.sep, "/")
        return f"[{child.name}]({rel}/)"
    if is_leaf_index_dir(current):
        rel = os.path.relpath(child, start=current).replace(os.sep, "/")
        return f"[{child.name}]({rel}/)"
    index_md = child / "INDEX.md"
    if should_index(child):
        rel = os.path.relpath(index_md, start=current).replace(os.sep, "/")
        return f"[{child.name}]({rel})"
    if index_md.exists():
        rel = os.path.relpath(index_md, start=current).replace(os.sep, "/")
        return f"[{child.name}]({rel})"
    rel = os.path.relpath(child, start=current).replace(os.sep, "/")
    return f"[{child.name}]({rel}/)"


def render_index(path: Path) -> str:
    repos: list[Path] = []
    dirs: list[Path] = []
    files: list[Path] = []

    for entry in sorted(path.iterdir(), key=lambda p: (not p.is_dir(), p.name.casefold(), p.name)):
        if entry.name == INDEX_NAME:
            continue
        if entry.is_dir():
            if is_gitlink(entry):
                repos.append(entry)
                continue
            if not should_descend(entry):
                continue
            dirs.append(entry)
        else:
            if entry.name in ALWAYS_EXCLUDED_FILE_NAMES:
                continue
            if is_gitignored(entry):
                continue
            if not is_tracked(entry):
                continue
            files.append(entry)

    lines: list[str] = [f"# {index_title(path)}", ""]
    lines.append(
        "> **Generated by `scripts/generate_index_mesh.py`.** "
        "Do not hand-edit this file. If it is stale, regenerate it with "
        r"`python scripts/generate_index_mesh.py` (or `.\scripts\generate_index_mesh.ps1`) "
        "and commit the result. Do not reason about merging or manually updating INDEX.md files."
    )
    lines.append("")

    lines.append("## Location")
    lines.append(f"- Repo path: `{'.' if path == ROOT else path.relative_to(ROOT).as_posix()}`")
    if path != ROOT:
        lines.append(f"- Up: {rel_link(path, path.parent / INDEX_NAME, 'parent index')}")
    lines.append("")

    if repos:
        lines.append("## Repositories")
        for child in repos:
            lines.append(f"- {dir_link(path, child)}")
        lines.append("")

    if dirs:
        lines.append("## Directories")
        for child in dirs:
            lines.append(f"- {dir_link(path, child)}")
        lines.append("")

    if files:
        lines.append("## Files")
        for child in files:
            lines.append(f"- {rel_link(path, child)}")
        lines.append("")

    if not dirs and not files:
        lines.append("No child entries.")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def resolve_link_target(current: Path, target: str) -> Path | None:
    if target.startswith(("http://", "https://", "mailto:")):
        return None
    clean_target = target.split("#", 1)[0]
    if not clean_target:
        return None
    resolved = (current.parent / clean_target).resolve()
    if not is_under(resolved, ROOT):
        return None
    return resolved


def validate_rendered_links(path: Path, rendered: str) -> list[str]:
    failures: list[str] = []
    for _label, raw_target in LINK_PATTERN.findall(rendered):
        resolved = resolve_link_target(path, raw_target)
        if resolved is None:
            continue
        if raw_target.endswith("/") and not resolved.is_dir():
            failures.append(f"broken-link: {path.relative_to(ROOT)} -> {raw_target}")
            continue
        if not raw_target.endswith("/") and not resolved.exists():
            failures.append(f"broken-link: {path.relative_to(ROOT)} -> {raw_target}")
    return failures


def require_linked_worktree(repo_root: Path) -> None:
    result = subprocess.run(
        [sys.executable, str(repo_root / "scripts" / "assert_active_worktree.py")],
        cwd=repo_root,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "This command must run from a linked worktree:\n" + result.stderr.strip()
        )


def walk_index_targets() -> list[IndexTarget]:
    targets: list[IndexTarget] = []
    for dirpath, dirnames, _filenames in os.walk(ROOT):
        current = Path(dirpath)
        if is_leaf_index_dir(current):
            dirnames[:] = []
        dirnames[:] = sorted(
            (name for name in dirnames if should_descend(current / name)),
            key=lambda name: (name.casefold(), name),
        )
        if should_index(current):
            targets.append(IndexTarget(path=current / "INDEX.md", lines=render_index(current).splitlines()))
    return targets


def discover_existing_index_paths(root: Path) -> set[Path]:
    existing_paths: set[Path] = set()
    for raw_path in TRACKED_PATHS:
        if not raw_path.endswith("INDEX.md"):
            continue
        relative = Path(raw_path)
        if any(part in ALWAYS_EXCLUDED_DIR_NAMES for part in relative.parts):
            continue
        candidate = root / relative
        if is_gitlink(candidate):
            continue
        existing_paths.add(candidate)
    return existing_paths


def prune_empty_directories(paths: list[Path]) -> None:
    for path in sorted(paths, key=lambda item: len(item.relative_to(ROOT).parts), reverse=True):
        current = path.parent
        while current != ROOT and current.exists():
            try:
                next(current.iterdir())
            except StopIteration:
                current.rmdir()
                current = current.parent
                continue
            break


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate or validate the repo-wide INDEX.md mesh")
    parser.add_argument("--check", "--validate", dest="check", action="store_true", help="validate without writing")
    args = parser.parse_args()

    if not args.check:
        require_linked_worktree(ROOT)

    targets = walk_index_targets()
    expected_paths = {target.path for target in targets}
    actual_paths = discover_existing_index_paths(ROOT)
    unexpected = sorted(path for path in actual_paths if path not in expected_paths)
    missing = sorted(path for path in expected_paths if path not in actual_paths)

    if args.check:
        mismatches: list[str] = []
        for target in targets:
            if not target.path.exists():
                mismatches.append(f"missing: {target.path.relative_to(ROOT)}")
                continue
            current = target.path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
            rendered = "\n".join(target.lines).rstrip() + "\n"
            if current != rendered:
                mismatches.append(f"stale: {target.path.relative_to(ROOT)}")
            mismatches.extend(validate_rendered_links(target.path, rendered))
        if unexpected:
            mismatches.extend(f"unexpected: {path.relative_to(ROOT)}" for path in unexpected)
        if missing:
            mismatches.extend(f"missing: {path.relative_to(ROOT)}" for path in missing)
        if mismatches:
            raise ValueError("INDEX mesh is stale or inconsistent:\n" + "\n".join(mismatches))
        print(f"OK index mesh: {len(targets)} indexes current")
        return 0

    written = 0
    for target in targets:
        rendered = "\n".join(target.lines).rstrip() + "\n"
        target.path.parent.mkdir(parents=True, exist_ok=True)
        with target.path.open("w", encoding="utf-8", newline="\n") as handle:
            handle.write(rendered)
        written += 1

    obsolete = sorted(path for path in actual_paths if path not in expected_paths)
    for path in obsolete:
        if path.exists():
            path.unlink()
    prune_empty_directories(obsolete)

    link_failures: list[str] = []
    for target in targets:
        rendered = "\n".join(target.lines).rstrip() + "\n"
        link_failures.extend(validate_rendered_links(target.path, rendered))
    if link_failures:
        raise ValueError("INDEX mesh produced broken links:\n" + "\n".join(link_failures))

    print(f"Wrote index mesh: {written} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

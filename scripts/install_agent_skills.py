#!/usr/bin/env python3
"""Install repo-local Codex skills from the pinned marketplace source."""

from __future__ import annotations

import argparse
import dataclasses
import json
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST_PATH = ROOT / ".agents" / "plugins" / "marketplace.json"
DEFAULT_SOURCE_ROOT = ROOT / ".agents" / "plugins" / "marketplace-source"
DEFAULT_OUTPUT_ROOT = ROOT / ".agents" / "skills"
RESERVED_OUTPUT_NAMES = {"AGENTS.md", "INDEX.md", ".provenance.json"}


@dataclasses.dataclass(frozen=True)
class PluginSpec:
    name: str
    version: str
    source_path: str
    skills_path: str


@dataclasses.dataclass(frozen=True)
class MarketplaceManifest:
    schema_version: int
    default_plugins: list[str]
    excluded_plugins: list[str]
    plugins: dict[str, PluginSpec]


@dataclasses.dataclass(frozen=True)
class SyncResult:
    copied_skills: list[str]
    provenance_path: Path
    source_revision: str


def load_manifest(path: Path) -> MarketplaceManifest:
    return load_manifest_data(json.loads(path.read_text(encoding="utf-8")))


def load_manifest_data(data: dict) -> MarketplaceManifest:
    schema_version = data.get("schema_version")
    if schema_version != 1:
        raise ValueError(f"Unsupported marketplace manifest schema: {schema_version!r}")

    default_plugins = list(data.get("default_plugins", []))
    excluded_plugins = list(data.get("excluded_plugins", []))
    plugins_data = data.get("plugins", {})
    if not isinstance(plugins_data, dict):
        raise ValueError("Marketplace manifest plugins entry must be an object")

    plugins: dict[str, PluginSpec] = {}
    for name, raw_plugin in plugins_data.items():
        if not isinstance(raw_plugin, dict):
            raise ValueError(f"Marketplace manifest plugin {name!r} must be an object")
        plugins[name] = PluginSpec(
            name=name,
            version=str(raw_plugin["version"]),
            source_path=str(raw_plugin["source_path"]),
            skills_path=str(raw_plugin.get("skills_path", "skills")),
        )

    return MarketplaceManifest(
        schema_version=schema_version,
        default_plugins=default_plugins,
        excluded_plugins=excluded_plugins,
        plugins=plugins,
    )


def get_git_revision(path: Path) -> str:
    result = subprocess.run(
        ["git", "-C", str(path), "rev-parse", "HEAD"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"Unable to read git revision for {path}:\n{result.stderr.strip()}"
        )
    return result.stdout.strip()


def run_git_command(repo_root: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo_root), *args],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"git {' '.join(args)} failed for {repo_root}:\n{result.stderr.strip()}"
        )
    return result.stdout


def get_git_status_entries(path: Path) -> list[str]:
    output = run_git_command(path, "status", "--porcelain", "--untracked-files=all")
    return [line for line in output.splitlines() if line]


def get_gitlink_revision(repo_root: Path, relative_path: Path) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo_root), "ls-files", "--stage", "-z", "--", relative_path.as_posix()],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"Unable to read gitlink for {relative_path.as_posix()}:\n{result.stderr.strip()}"
        )

    for record in result.stdout.split("\0"):
        if not record:
            continue
        try:
            metadata, _record_path = record.split("\t", 1)
        except ValueError as exc:
            raise ValueError(
                f"Malformed gitlink record for {relative_path.as_posix()}: {record!r}"
            ) from exc
        mode, object_id, _stage = metadata.split(" ", 2)
        if mode != "160000":
            raise ValueError(
                f"Expected gitlink mode 160000 for {relative_path.as_posix()}, got {mode}"
            )
        return object_id

    raise ValueError(f"Gitlink not found for {relative_path.as_posix()}")


def assert_pinned_source_checkout(source_root: Path, repo_root: Path) -> None:
    resolved_repo_root = repo_root.resolve()
    resolved_source_root = source_root.resolve()
    try:
        relative_source_root = resolved_source_root.relative_to(resolved_repo_root)
    except ValueError as exc:
        raise ValueError(
            f"Marketplace source root must live inside the repository: {resolved_source_root}"
        ) from exc

    dirty_entries = get_git_status_entries(resolved_source_root)
    if dirty_entries:
        raise ValueError(
            "Marketplace source tree must be clean before syncing derived skills:\n"
            + "\n".join(f"- {entry}" for entry in dirty_entries)
        )

    expected_revision = get_gitlink_revision(resolved_repo_root, relative_source_root)
    actual_revision = get_git_revision(resolved_source_root)
    if actual_revision != expected_revision:
        raise ValueError(
            "Marketplace source HEAD does not match the parent gitlink:\n"
            f"- source HEAD: {actual_revision}\n"
            f"- gitlink SHA: {expected_revision}"
        )


def get_repo_relative_path(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def read_plugin_manifest(plugin: PluginSpec, source_root: Path) -> dict:
    plugin_manifest_path = source_root / plugin.source_path / ".codex-plugin" / "plugin.json"
    if not plugin_manifest_path.is_file():
        raise ValueError(f"Plugin manifest not found for {plugin.name!r}: {plugin_manifest_path}")
    return json.loads(plugin_manifest_path.read_text(encoding="utf-8"))


def validate_plugin_versions(manifest: MarketplaceManifest, source_root: Path) -> None:
    mismatches: list[str] = []
    for plugin in manifest.plugins.values():
        plugin_manifest = read_plugin_manifest(plugin, source_root)
        actual_version = str(plugin_manifest.get("version"))
        if actual_version != plugin.version:
            mismatches.append(f"{plugin.name} ({actual_version} != {plugin.version})")
    if mismatches:
        raise ValueError("Marketplace plugin versions do not match the manifest:\n" + "\n".join(f"- {item}" for item in mismatches))


def read_skill_directories(plugin: PluginSpec, source_root: Path) -> list[tuple[str, Path]]:
    skills_root = source_root / plugin.source_path / plugin.skills_path
    if not skills_root.is_dir():
        raise ValueError(f"Skill root not found for plugin {plugin.name!r}: {skills_root}")

    skills: list[tuple[str, Path]] = []
    for child in sorted(skills_root.iterdir(), key=lambda item: (item.name.casefold(), item.name)):
        if not child.is_dir():
            continue
        if child.name == "INDEX.md":
            continue
        skills.append((child.name, child))
    return skills


def relative_path(root: Path, path: Path) -> Path:
    return path.relative_to(root)


def trees_match(source: Path, destination: Path) -> bool:
    if not source.is_dir() or not destination.is_dir():
        return False

    source_files = sorted(
        relative_path(source, path) for path in source.rglob("*") if path.is_file()
    )
    destination_files = sorted(
        relative_path(destination, path) for path in destination.rglob("*") if path.is_file()
    )
    if source_files != destination_files:
        return False

    for rel_path in source_files:
        if (source / rel_path).read_bytes() != (destination / rel_path).read_bytes():
            return False
    return True


def copy_tree(source: Path, destination: Path, *, force: bool) -> None:
    if destination.exists():
        if force or not trees_match(source, destination):
            if destination.is_dir():
                shutil.rmtree(destination)
            else:
                destination.unlink()
        else:
            return
    shutil.copytree(source, destination)


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


def sync_default_skills(
    manifest: MarketplaceManifest,
    source_root: Path,
    output_root: Path,
    *,
    check: bool = False,
    force: bool = False,
) -> SyncResult:
    if check and force:
        raise ValueError("--check and --force cannot be used together")
    if not source_root.exists():
        raise ValueError(f"Marketplace source root not found: {source_root}")
    if not check:
        require_linked_worktree(ROOT)
    assert_pinned_source_checkout(source_root, ROOT)

    missing_plugins = [name for name in manifest.default_plugins if name not in manifest.plugins]
    if missing_plugins:
        raise ValueError("Manifest is missing plugin definitions for: " + ", ".join(missing_plugins))

    validate_plugin_versions(manifest, source_root)

    expected_plugins = [
        manifest.plugins[name]
        for name in manifest.default_plugins
        if name not in manifest.excluded_plugins
    ]

    skill_sources: list[tuple[str, Path, str]] = []
    seen_skills: set[str] = set()
    for plugin in expected_plugins:
        for skill_name, skill_source in read_skill_directories(plugin, source_root):
            if skill_name in seen_skills:
                raise ValueError(f"Duplicate skill name in marketplace selection: {skill_name}")
            seen_skills.add(skill_name)
            skill_sources.append((skill_name, skill_source, plugin.name))

    expected_skill_names = [skill_name for skill_name, _source, _plugin in skill_sources]
    desired_skill_dirs = {skill_name: source for skill_name, source, _plugin in skill_sources}

    source_revision = get_git_revision(source_root)
    provenance_path = output_root / ".provenance.json"
    provenance_data = {
        "schema_version": 1,
        "source_root": get_repo_relative_path(source_root),
        "source_revision": source_revision,
        "default_plugins": list(manifest.default_plugins),
        "excluded_plugins": list(manifest.excluded_plugins),
        "copied_skills": expected_skill_names,
    }

    if check:
        mismatches: list[str] = []
        for skill_name, source in desired_skill_dirs.items():
            destination = output_root / skill_name
            if not trees_match(source, destination):
                mismatches.append(skill_name)

        if output_root.exists():
            actual_root_entries = sorted(
                path.name for path in output_root.iterdir() if path.name not in RESERVED_OUTPUT_NAMES
            )
        else:
            actual_root_entries = []
        if actual_root_entries != sorted(expected_skill_names):
            mismatches.append("skill-tree")

        if not provenance_path.exists():
            mismatches.append(".provenance.json")
        else:
            current = json.loads(provenance_path.read_text(encoding="utf-8"))
            if current != provenance_data:
                mismatches.append(".provenance.json")

        if mismatches:
            raise ValueError("Derived skills are stale: " + ", ".join(sorted(set(mismatches))))

        return SyncResult(
            copied_skills=expected_skill_names,
            provenance_path=provenance_path,
            source_revision=source_revision,
        )

    output_root.mkdir(parents=True, exist_ok=True)
    for skill_name, source in desired_skill_dirs.items():
        copy_tree(source, output_root / skill_name, force=force)

    expected_root_names = set(expected_skill_names) | RESERVED_OUTPUT_NAMES
    stale_root_entries = sorted(
        path for path in output_root.iterdir() if path.name not in expected_root_names
    )
    for path in stale_root_entries:
        if path.is_dir():
            shutil.rmtree(path)
        else:
            path.unlink()

    provenance_path.write_text(
        json.dumps(provenance_data, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )

    return SyncResult(
        copied_skills=expected_skill_names,
        provenance_path=provenance_path,
        source_revision=source_revision,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Install repo-local Codex skills from the pinned marketplace source")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST_PATH)
    parser.add_argument("--source-root", type=Path, default=DEFAULT_SOURCE_ROOT)
    parser.add_argument("--output-root", type=Path, default=DEFAULT_OUTPUT_ROOT)
    parser.add_argument("--check", action="store_true", help="Validate without writing")
    parser.add_argument("--force", action="store_true", help="Replace existing installed skills")
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    result = sync_default_skills(
        manifest,
        args.source_root,
        args.output_root,
        check=args.check,
        force=args.force,
    )
    mode = "checked" if args.check else "installed"
    print(f"OK {mode} skills: {len(result.copied_skills)} copied from {result.source_revision}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

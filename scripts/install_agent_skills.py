#!/usr/bin/env python3
"""Install repo-local Codex skills from the pinned marketplace source."""

from __future__ import annotations

import argparse
import configparser
import dataclasses
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST_PATH = ROOT / ".agents" / "plugins" / "marketplace.json"
DEFAULT_SOURCE_ROOT = ROOT / ".agents" / "plugins" / "marketplace-source"
DEFAULT_OUTPUT_ROOT = ROOT / ".agents" / "skills"
RESERVED_OUTPUT_NAMES = {"AGENTS.md", "INDEX.md", ".provenance.json"}
RESERVED_OUTPUT_NAME_KEYS = {name.casefold() for name in RESERVED_OUTPUT_NAMES}
LOCAL_SKILL_PREFIX = "port-"
MISSING_SOURCE_REMEDIATION = (
    "If this is a fresh worktree, initialize the pinned submodule with "
    "`git submodule update --init --checkout -- .agents/plugins/marketplace-source`."
)


@dataclasses.dataclass(frozen=True)
class MarketplaceSourceSpec:
    repository: str
    path: str


@dataclasses.dataclass(frozen=True)
class PluginSpec:
    name: str
    version: str
    source_path: str
    skills_path: str


@dataclasses.dataclass(frozen=True)
class MarketplaceManifest:
    schema_version: int
    marketplace_source: MarketplaceSourceSpec
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

    marketplace_source_data = data.get("marketplace_source")
    if not isinstance(marketplace_source_data, dict):
        raise ValueError("Marketplace manifest marketplace_source entry must be an object")

    default_plugins = list(data.get("default_plugins", []))
    excluded_plugins = list(data.get("excluded_plugins", []))
    plugins_data = data.get("plugins", {})
    if not isinstance(plugins_data, dict):
        raise ValueError("Marketplace manifest plugins entry must be an object")

    try:
        marketplace_source = MarketplaceSourceSpec(
            repository=str(marketplace_source_data["repository"]),
            path=str(marketplace_source_data["path"]),
        )
    except KeyError as exc:
        raise ValueError(
            "Marketplace manifest marketplace_source entry must include repository and path"
        ) from exc

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
        marketplace_source=marketplace_source,
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


def load_gitmodules_section(repo_root: Path, submodule_path: str) -> configparser.SectionProxy:
    gitmodules_path = repo_root / ".gitmodules"
    if not gitmodules_path.is_file():
        raise ValueError(f"Git submodule manifest not found: {gitmodules_path}")

    parser = configparser.ConfigParser()
    parser.read(gitmodules_path, encoding="utf-8")
    section_name = f'submodule "{submodule_path}"'
    if not parser.has_section(section_name):
        raise ValueError(f"Git submodule section not found for {submodule_path!r} in {gitmodules_path}")
    return parser[section_name]


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


def assert_marketplace_source_binding(
    manifest: MarketplaceManifest, source_root: Path, repo_root: Path
) -> None:
    resolved_repo_root = repo_root.resolve()
    resolved_source_root = source_root.resolve()
    try:
        relative_source_root = resolved_source_root.relative_to(resolved_repo_root)
    except ValueError as exc:
        raise ValueError(
            f"Marketplace source root must live inside the repository: {resolved_source_root}"
        ) from exc

    relative_source_root_text = relative_source_root.as_posix()
    if manifest.marketplace_source.path != relative_source_root_text:
        raise ValueError(
            "Marketplace manifest source path does not match the configured source root:\n"
            f"- manifest path: {manifest.marketplace_source.path}\n"
            f"- source root: {relative_source_root_text}"
        )

    gitmodules = load_gitmodules_section(resolved_repo_root, manifest.marketplace_source.path)
    actual_path = gitmodules.get("path", "").strip()
    actual_repository = gitmodules.get("url", "").strip()
    if actual_path != manifest.marketplace_source.path or actual_repository != manifest.marketplace_source.repository:
        raise ValueError(
            "Marketplace manifest source coordinates do not match the git submodule configuration:\n"
            f"- manifest path: {manifest.marketplace_source.path}\n"
            f"- gitmodules path: {actual_path}\n"
            f"- manifest repository: {manifest.marketplace_source.repository}\n"
            f"- gitmodules repository: {actual_repository}"
        )


def assert_pinned_source_checkout(source_root: Path, repo_root: Path) -> None:
    resolved_repo_root = repo_root.resolve()
    resolved_source_root = source_root.resolve()
    try:
        relative_source_root = resolved_source_root.relative_to(resolved_repo_root)
    except ValueError as exc:
        raise ValueError(
            f"Marketplace source root must live inside the repository: {resolved_source_root}"
        ) from exc

    assert_initialized_source_checkout(resolved_source_root)

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


def assert_initialized_source_checkout(source_root: Path) -> None:
    git_marker = source_root / ".git"
    if not source_root.is_dir() or not git_marker.exists():
        raise ValueError(
            f"Marketplace source submodule is not initialized: {source_root}\n"
            f"{MISSING_SOURCE_REMEDIATION}"
        )
    if is_link_or_reparse_point(source_root) or is_link_or_reparse_point(git_marker):
        raise ValueError(
            f"Marketplace source checkout metadata must not be a link or reparse point: {git_marker}"
        )

    try:
        top_level = run_git_command(source_root, "rev-parse", "--show-toplevel").strip()
    except RuntimeError as exc:
        raise ValueError(
            f"Marketplace source submodule is not initialized: {source_root}\n"
            f"{MISSING_SOURCE_REMEDIATION}"
        ) from exc

    if not top_level or Path(top_level).resolve() != source_root.resolve():
        raise ValueError(
            "Marketplace source path is not the root of its own initialized git checkout:\n"
            f"- source root: {source_root.resolve()}\n"
            f"- detected git root: {top_level or '<none>'}\n"
            f"{MISSING_SOURCE_REMEDIATION}"
        )


def get_repo_relative_path(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def lexical_absolute(path: Path) -> Path:
    return Path(os.path.abspath(path))


def is_link_or_reparse_point(path: Path) -> bool:
    try:
        metadata = path.lstat()
    except FileNotFoundError:
        return False
    if stat.S_ISLNK(metadata.st_mode):
        return True
    reparse_flag = getattr(stat, "FILE_ATTRIBUTE_REPARSE_POINT", 0x400)
    return bool(getattr(metadata, "st_file_attributes", 0) & reparse_flag)


def entry_kind(path: Path) -> str:
    if is_link_or_reparse_point(path):
        raise ValueError(f"Filesystem tree contains a link or reparse point: {path}")
    metadata = path.lstat()
    if stat.S_ISDIR(metadata.st_mode):
        return "directory"
    if stat.S_ISREG(metadata.st_mode):
        return "file"
    raise ValueError(f"Filesystem tree contains an unsupported entry type: {path}")


def assert_path_contained(
    root: Path,
    candidate: Path,
    *,
    description: str,
    escape_root_name: str | None = None,
) -> None:
    lexical_root = lexical_absolute(root)
    lexical_candidate = lexical_absolute(candidate)
    try:
        relative = lexical_candidate.relative_to(lexical_root)
    except ValueError as exc:
        root_name = escape_root_name or "its lexical root"
        raise ValueError(f"{description} escapes {root_name}: {lexical_candidate}") from exc

    current = lexical_root
    for part in relative.parts:
        current /= part
        if is_link_or_reparse_point(current):
            raise ValueError(f"{description} contains a link or reparse point: {current}")

    resolved_root = lexical_root.resolve()
    resolved_candidate = lexical_candidate.resolve()
    try:
        resolved_candidate.relative_to(resolved_root)
    except ValueError as exc:
        root_name = escape_root_name or "its resolved root"
        raise ValueError(f"{description} escapes {root_name}: {resolved_candidate}") from exc


def assert_plain_tree(root: Path, *, description: str) -> None:
    if is_link_or_reparse_point(root):
        raise ValueError(f"{description} contains a link or reparse point: {root}")
    if not root.exists():
        return
    if entry_kind(root) != "directory":
        raise ValueError(f"{description} root must be a directory: {root}")

    for current_path, dirnames, filenames in os.walk(root, topdown=True, followlinks=False):
        current = Path(current_path)
        for name in [*dirnames, *filenames]:
            entry_kind(current / name)


def resolve_within(root: Path, *parts: str | Path, description: str) -> Path:
    lexical_candidate = lexical_absolute(root).joinpath(*parts)
    assert_path_contained(
        root,
        lexical_candidate,
        description=description,
        escape_root_name="the marketplace source root",
    )
    resolved_root = root.resolve()
    candidate = lexical_candidate.resolve()
    try:
        candidate.relative_to(resolved_root)
    except ValueError as exc:
        raise ValueError(f"{description} escapes the marketplace source root: {candidate}") from exc
    return candidate


def write_text_atomic(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            "w",
            encoding="utf-8",
            newline="\n",
            delete=False,
            dir=path.parent,
            prefix=f".{path.name}.",
            suffix=".tmp",
        ) as handle:
            handle.write(content)
            temp_path = Path(handle.name)
        os.replace(temp_path, path)
    finally:
        if temp_path is not None and temp_path.exists():
            temp_path.unlink(missing_ok=True)


def load_previous_marketplace_skill_names(provenance_path: Path) -> set[str]:
    """Load the last marketplace-owned skill names without trusting malformed data."""
    if not provenance_path.is_file():
        return set()

    try:
        data = json.loads(provenance_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError):
        return set()

    copied_skills = data.get("copied_skills") if isinstance(data, dict) else None
    if not isinstance(copied_skills, list):
        return set()
    return {name for name in copied_skills if isinstance(name, str)}


def find_case_variant(root: Path, name: str) -> Path | None:
    target_key = name.casefold()
    for entry in root.iterdir():
        if entry.name.casefold() == target_key and entry.name != name:
            return entry
    return None


def read_plugin_manifest(plugin: PluginSpec, source_root: Path) -> dict:
    plugin_manifest_path = resolve_within(
        source_root,
        plugin.source_path,
        ".codex-plugin",
        "plugin.json",
        description=f"Plugin manifest for {plugin.name!r}",
    )
    if not plugin_manifest_path.is_file():
        raise ValueError(f"Plugin manifest not found for {plugin.name!r}: {plugin_manifest_path}")
    return json.loads(plugin_manifest_path.read_text(encoding="utf-8"))


def validate_plugin_versions(manifest: MarketplaceManifest, source_root: Path) -> None:
    mismatches: list[str] = []
    for plugin in manifest.plugins.values():
        plugin_manifest = read_plugin_manifest(plugin, source_root)
        actual_name = str(plugin_manifest.get("name"))
        actual_version = str(plugin_manifest.get("version"))
        if actual_name != plugin.name:
            mismatches.append(f"{plugin.name} name ({actual_name} != {plugin.name})")
        if actual_version != plugin.version:
            mismatches.append(f"{plugin.name} ({actual_version} != {plugin.version})")
    if mismatches:
        raise ValueError("Marketplace plugin versions do not match the manifest:\n" + "\n".join(f"- {item}" for item in mismatches))


def read_skill_directories(plugin: PluginSpec, source_root: Path) -> list[tuple[str, Path]]:
    skills_root = resolve_within(
        source_root,
        plugin.source_path,
        plugin.skills_path,
        description=f"Skill root for plugin {plugin.name!r}",
    )
    if not skills_root.is_dir():
        raise ValueError(f"Skill root not found for plugin {plugin.name!r}: {skills_root}")

    skills: list[tuple[str, Path]] = []
    for child in sorted(skills_root.iterdir(), key=lambda item: (item.name.casefold(), item.name)):
        if is_link_or_reparse_point(child):
            raise ValueError(
                f"Skill root for plugin {plugin.name!r} contains a link or reparse point: {child}"
            )
        if not child.is_dir():
            continue
        resolved_child = child.resolve()
        try:
            resolved_child.relative_to(skills_root.resolve())
        except ValueError as exc:
            raise ValueError(
                f"Skill directory for plugin {plugin.name!r} escapes the marketplace source root: {resolved_child}"
            ) from exc
        if child.name == "INDEX.md":
            continue
        assert_plain_tree(resolved_child, description=f"Skill {child.name!r} for plugin {plugin.name!r}")
        skills.append((child.name, resolved_child))
    return skills


def relative_path(root: Path, path: Path) -> Path:
    return path.relative_to(root)


def trees_match(source: Path, destination: Path) -> bool:
    if not source.is_dir() or not destination.is_dir():
        return False

    source_entries = tree_inventory(source)
    destination_entries = tree_inventory(destination)
    if source_entries != destination_entries:
        return False

    for rel_path, (kind, _executable_bits) in source_entries.items():
        if kind == "file" and (source / rel_path).read_bytes() != (destination / rel_path).read_bytes():
            return False
    return True


def tree_inventory(root: Path) -> dict[Path, tuple[str, int]]:
    assert_plain_tree(root, description=f"Tree rooted at {root}")
    inventory: dict[Path, tuple[str, int]] = {}
    for current_path, dirnames, filenames in os.walk(root, topdown=True, followlinks=False):
        current = Path(current_path)
        for name in sorted(dirnames, key=lambda item: (item.casefold(), item)):
            path = current / name
            inventory[relative_path(root, path)] = ("directory", 0)
        for name in sorted(filenames, key=lambda item: (item.casefold(), item)):
            path = current / name
            executable_bits = 0 if os.name == "nt" else stat.S_IMODE(path.stat().st_mode) & 0o111
            inventory[relative_path(root, path)] = ("file", executable_bits)
    return inventory


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


def tracked_local_skill_names(output_root: Path) -> set[str]:
    """Return tracked Portfolio-owned skill directories below the output root."""
    if not output_root.exists():
        return set()
    try:
        relative_root = output_root.relative_to(ROOT).as_posix()
    except ValueError as exc:
        raise ValueError(f"Skills output root is outside the repository: {output_root}") from exc

    result = subprocess.run(
        ["git", "ls-files", "-z", "--", f"{relative_root}/"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            "git ls-files failed while checking Portfolio local skill custody:\n"
            + result.stderr.decode("utf-8", errors="replace").strip()
        )

    names: set[str] = set()
    root_path = Path(relative_root)
    for raw_path in result.stdout.decode("utf-8", errors="replace").split("\0"):
        if not raw_path:
            continue
        relative_path = Path(raw_path)
        try:
            skill_path = relative_path.relative_to(root_path)
        except ValueError:
            continue
        if skill_path.parts and skill_path.parts[0].casefold().startswith(LOCAL_SKILL_PREFIX):
            names.add(skill_path.parts[0])
    return names


def local_skill_names(output_root: Path) -> set[str]:
    """Return Portfolio-owned skill directories that refresh must preserve."""
    if not output_root.exists():
        return set()

    names: set[str] = set()
    for path in output_root.iterdir():
        if not path.name.casefold().startswith(LOCAL_SKILL_PREFIX):
            continue
        if not path.is_dir():
            raise ValueError(
                f"Portfolio local skill must be a directory: {path.name}"
            )
        names.add(path.name)
    if not names:
        return set()
    tracked_names = tracked_local_skill_names(output_root)
    tracked_keys = {name.casefold() for name in tracked_names}
    untracked = sorted(name for name in names if name.casefold() not in tracked_keys)
    if untracked:
        raise ValueError(
            "Portfolio local skills must be tracked before refresh: "
            + ", ".join(untracked)
        )
    return names


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
        raise ValueError(f"Marketplace source root not found: {source_root}\n{MISSING_SOURCE_REMEDIATION}")
    canonical_output_root = ROOT / ".agents" / "skills"
    requested_output_root = lexical_absolute(output_root)
    expected_output_root = lexical_absolute(canonical_output_root)
    if os.path.normcase(str(requested_output_root)) != os.path.normcase(str(expected_output_root)):
        raise ValueError(
            "Derived skills must be written to the canonical repo-local output root:\n"
            f"- requested: {requested_output_root}\n"
            f"- expected: {expected_output_root}"
        )
    assert_path_contained(ROOT, output_root, description="Derived skills output root")
    assert_plain_tree(output_root, description="Derived skills output tree")
    if not check:
        require_linked_worktree(ROOT)
    assert_marketplace_source_binding(manifest, source_root, ROOT)
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

    preserved_local_skill_names = local_skill_names(output_root)
    preserved_local_skill_keys = {
        name.casefold() for name in preserved_local_skill_names
    }

    skill_sources: list[tuple[str, Path, str]] = []
    seen_skills: set[str] = set()
    for plugin in expected_plugins:
        for skill_name, skill_source in read_skill_directories(plugin, source_root):
            normalized_skill_name = skill_name.casefold()
            if normalized_skill_name in seen_skills:
                raise ValueError(f"Duplicate skill name in marketplace selection: {skill_name}")
            if normalized_skill_name in preserved_local_skill_keys:
                raise ValueError(
                    "Marketplace skill collides with a Portfolio local skill: "
                    f"{skill_name}"
                )
            if normalized_skill_name in RESERVED_OUTPUT_NAME_KEYS:
                raise ValueError(f"Marketplace skill name collides with a reserved output name: {skill_name}")
            seen_skills.add(normalized_skill_name)
            skill_sources.append((skill_name, skill_source, plugin.name))

    expected_skill_names = [skill_name for skill_name, _source, _plugin in skill_sources]
    desired_skill_dirs = {skill_name: source for skill_name, source, _plugin in skill_sources}
    desired_skill_keys = {skill_name.casefold() for skill_name in expected_skill_names}
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
            assert_path_contained(output_root, destination, description=f"Derived skill destination {skill_name!r}")
            if not trees_match(source, destination):
                mismatches.append(skill_name)

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
        destination = output_root / skill_name
        assert_path_contained(output_root, destination, description=f"Derived skill destination {skill_name!r}")
        case_variant = find_case_variant(output_root, skill_name)
        if case_variant is not None:
            assert_path_contained(output_root, case_variant, description=f"Case-variant skill destination {case_variant.name!r}")
            if case_variant.is_dir():
                shutil.rmtree(case_variant)
            else:
                case_variant.unlink()
        copy_tree(source, destination, force=force)

    previous_marketplace_skill_names = load_previous_marketplace_skill_names(provenance_path)
    for skill_name in sorted(previous_marketplace_skill_names):
        if skill_name.casefold() in desired_skill_keys:
            continue
        if skill_name.casefold().startswith(LOCAL_SKILL_PREFIX):
            continue
        stale_path = output_root / skill_name
        if not stale_path.exists():
            stale_path = find_case_variant(output_root, skill_name) or stale_path
        if not stale_path.exists():
            continue
        assert_path_contained(
            output_root,
            stale_path,
            description=f"Stale derived-skills entry {stale_path.name!r}",
        )
        if stale_path.is_dir():
            shutil.rmtree(stale_path)
        else:
            stale_path.unlink()

    write_text_atomic(provenance_path, json.dumps(provenance_data, indent=2, sort_keys=True) + "\n")

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

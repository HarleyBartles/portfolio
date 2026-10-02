#!/usr/bin/env python3
"""Check native Codex and Devin declarations for declared repository plugins."""

from __future__ import annotations

import json
import re
import argparse
import sys
import tomllib
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
PLUGIN_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
FULL_SHA = re.compile(r"^(?:[0-9a-f]{40}|[0-9a-f]{64})$")


def _valid_dependency(
    value: object,
    path: str,
    findings: list[str],
    implied_name: str | None = None,
) -> tuple[str, str, str, str] | None:
    if not isinstance(value, dict) or value.get("source") != "git-subdir":
        findings.append(f"{path}: dependency must use git-subdir")
        return None
    url, plugin_path = value.get("url"), value.get("path")
    if not isinstance(url, str) or not url.startswith("https://"):
        findings.append(f"{path}: dependency URL must be HTTPS")
    raw_path = plugin_path[2:] if isinstance(plugin_path, str) and plugin_path.startswith("./") else plugin_path
    parts = PurePosixPath(raw_path).parts if isinstance(raw_path, str) else ()
    if not parts or PurePosixPath(raw_path).is_absolute() or ".." in parts:
        findings.append(f"{path}: dependency path must be a safe repository-relative path")
    if implied_name is not None and (len(parts) != 3 or parts[:2] != ("dist", "plugins")):
        findings.append(f"{path}: plugin catalog path must identify dist/plugins/<name>")
    ref, sha = value.get("ref"), value.get("sha")
    has_ref = isinstance(ref, str) and bool(ref.strip())
    has_sha = "sha" in value
    if has_ref == has_sha:
        findings.append(f"{path}: provide exactly one non-empty ref or full immutable sha")
    if has_sha and (not isinstance(sha, str) or not FULL_SHA.fullmatch(sha)):
        findings.append(f"{path}: sha must be a full immutable hexadecimal commit")
    name = value.get("name", implied_name or (PurePosixPath(plugin_path[2:] if isinstance(plugin_path, str) and plugin_path.startswith("./") else plugin_path).name if isinstance(plugin_path, str) else ""))
    if not isinstance(name, str) or not PLUGIN_ID.fullmatch(name):
        findings.append(f"{path}: dependency requires a valid plugin name")
        return None
    normalized_path = raw_path if isinstance(raw_path, str) else ""
    selector = f"ref:{ref}" if has_ref else f"sha:{sha}" if has_sha else ""
    return name, url if isinstance(url, str) else "", normalized_path, selector


def check_plugins(root: Path = ROOT) -> list[str]:
    findings: list[str] = []
    try:
        catalog = json.loads((root / ".agents/plugins/marketplace.json").read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        return [f".agents/plugins/marketplace.json: invalid JSON: {exc}"]
    if not isinstance(catalog, dict) or not isinstance(catalog.get("plugins"), list):
        return ["plugin catalog must contain a plugins array"]
    expected: dict[str, tuple[str, str, str]] = {}
    for index, plugin in enumerate(catalog["plugins"]):
        if not isinstance(plugin, dict) or not isinstance(plugin.get("source"), dict):
            findings.append(f"plugin catalog plugins[{index}] is invalid")
            continue
        plugin_id, source = plugin.get("name"), dict(plugin["source"])
        result = _valid_dependency(source, f"plugin catalog plugins[{index}]", findings, implied_name=plugin_id)
        if result:
            name, url, plugin_path, selector = result
            if PurePosixPath(plugin_path).name != name or name in expected:
                findings.append(f"plugin catalog has a duplicate or mismatched plugin path for {name}")
            expected[name] = (url, plugin_path, selector)
    try:
        codex = tomllib.loads((root / ".codex/config.toml").read_text(encoding="utf-8"))
    except (OSError, UnicodeError, tomllib.TOMLDecodeError) as exc:
        return [*findings, f".codex/config.toml: invalid or missing Codex binding: {exc}"]
    catalog_name = catalog.get("name")
    registration = codex.get("marketplaces", {}).get(catalog_name)
    if not isinstance(catalog_name, str) or not PLUGIN_ID.fullmatch(catalog_name):
        findings.append("plugin catalog name must be a valid identifier")
    if not isinstance(registration, dict) or registration.get("source_type") != "git" or registration.get("source") != "https://github.com/HarleyBartles/portfolio.git" or registration.get("ref") != "main":
        findings.append(".codex/config.toml must register the Portfolio Git catalog at main")
    activation = codex.get("plugins", {})
    if not isinstance(activation, dict):
        findings.append(".codex/config.toml plugins must be a table")
        activation = {}
    activation_names = {key.rsplit("@", 1)[0] for key in activation if isinstance(key, str) and key.endswith(f"@{catalog_name}")}
    if activation_names != set(expected):
        findings.append(".codex/config.toml must activate exactly the catalog plugins")
    for name in expected:
        entry = activation.get(f"{name}@{catalog_name}")
        if not isinstance(entry, dict) or entry.get("enabled") is not True:
            findings.append(f".codex/config.toml must enable {name}@{catalog_name}")
    try:
        devin = json.loads((root / ".devin/config.json").read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        return [*findings, f".devin/config.json: invalid or missing Devin dependencies: {exc}"]
    dependencies = devin.get("requiredPlugins", []) if isinstance(devin, dict) else None
    if isinstance(devin, dict) and (not isinstance(devin.get("optionalPlugins", []), list) or not isinstance(devin.get("forbiddenPlugins", []), list)):
        findings.append(".devin/config.json optionalPlugins and forbiddenPlugins must be arrays")
    if not isinstance(dependencies, list):
        return [*findings, ".devin/config.json requiredPlugins must be an array"]
    found: dict[str, tuple[str, str, str]] = {}
    for index, entry in enumerate(dependencies):
        result = _valid_dependency(entry, f".devin/config.json requiredPlugins[{index}]", findings)
        if result:
            name, url, plugin_path, selector = result
            found[name] = (url, plugin_path, selector)
    for name, dependency in expected.items():
        if found.get(name) != dependency:
            findings.append(f"Devin dependency for {name} must match the catalog source, path, and selector")
    if set(found) != set(expected):
        findings.append("Devin requiredPlugins must declare exactly the catalog plugins")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check without modifying repository files")
    parser.parse_args()
    findings = check_plugins()
    if findings:
        print("\n".join(f"ERROR: {finding}" for finding in findings))
        return 1
    print("OK Codex and Devin repository plugin declarations are structurally aligned; availability is unverified")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

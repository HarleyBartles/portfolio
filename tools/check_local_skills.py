#!/usr/bin/env python3
"""Check that local skill directories remain repository-authored and well formed."""

from __future__ import annotations

import argparse
import sys
import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
IDENTIFIER = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def validate_skill_markdown_frontmatter(skill_root: Path) -> None:
    skill_path = skill_root / "SKILL.md"
    raw = skill_path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        raise ValueError(f"{skill_path} begins with a UTF-8 BOM")
    text = raw.decode("utf-8")
    lines = text.splitlines()
    if not lines or lines[0] != "---" or "---" not in lines[1:]:
        raise ValueError(f"{skill_path} must have opening and closing YAML frontmatter delimiters")
    source = "\n".join(lines[1 : lines.index("---", 1)])
    frontmatter = yaml.safe_load(source)
    if not isinstance(frontmatter, dict):
        raise ValueError(f"{skill_path} frontmatter must be a mapping")
    name, description = frontmatter.get("name"), frontmatter.get("description")
    if not isinstance(name, str) or not name.strip() or name != skill_root.name:
        raise ValueError(f"{skill_path} name must match its repository-owned directory")
    if not isinstance(description, str) or not description.strip() or not description.startswith("Use when "):
        raise ValueError(f"{skill_path} description must be a standalone Use when trigger sentence")
    metadata = frontmatter.get("metadata")
    if not isinstance(metadata, dict) or metadata.get("source-category") != "first_party":
        raise ValueError(f"{skill_path} must declare Portfolio first-party metadata")
    if metadata.get("source-id") != name or metadata.get("source-path") != skill_path.relative_to(ROOT).as_posix():
        raise ValueError(f"{skill_path} metadata must identify its Portfolio-owned source")
    if metadata.get("status") != "active" or not isinstance(metadata.get("owner"), str):
        raise ValueError(f"{skill_path} must declare its active status and owner")
    for field in ("use_when", "do_not_use_when", "related_skills", "use_before", "use_with"):
        values = metadata.get(field)
        if not isinstance(values, list) or not values or any(not isinstance(value, str) or not value.strip() for value in values):
            raise ValueError(f"{skill_path} metadata {field} must be a non-empty list of nonblank strings")
    for field in ("related_skills", "use_before", "use_with"):
        if any(not IDENTIFIER.fullmatch(value) for value in metadata[field]):
            raise ValueError(f"{skill_path} metadata {field} must contain skill identifiers")


def validate_openai_wrapper(path: Path, skill_name: str) -> None:
    raw = path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        raise ValueError(f"{path} begins with a UTF-8 BOM")
    wrapper = yaml.safe_load(raw.decode("utf-8"))
    if not isinstance(wrapper, dict) or wrapper.get("version") != 1:
        raise ValueError(f"{path} must declare version 1")
    metadata = wrapper.get("metadata")
    if not isinstance(metadata, dict) or metadata.get("skill_name") != skill_name:
        raise ValueError(f"{path} must identify its skill")
    interface = wrapper.get("interface")
    if not isinstance(interface, dict):
        raise ValueError(f"{path} interface must be a mapping")
    for field in ("display_name", "short_description", "default_prompt"):
        if not isinstance(interface.get(field), str) or not interface[field].strip():
            raise ValueError(f"{path} interface {field} must be a nonblank string")
    if interface["short_description"].lower().startswith("use when"):
        raise ValueError(f"{path} short_description must describe capability, not repeat a trigger")
    if skill_name not in interface["default_prompt"] or re.search(r"(?i)^use when\b|\bto use when\b", interface["default_prompt"]):
        raise ValueError(f"{path} default_prompt must directly instruct the selected skill")
    policy = wrapper.get("policy")
    if not isinstance(policy, dict) or not isinstance(policy.get("allow_implicit_invocation"), bool):
        raise ValueError(f"{path} policy must declare allow_implicit_invocation")


def check_skills(root: Path = ROOT) -> list[str]:
    skills_root = root / ".agents/skills"
    findings: list[str] = []
    skill_files = sorted(skills_root.glob("*/SKILL.md"))
    if not skill_files:
        return [".agents/skills contains no Portfolio-owned skills"]
    for skill_file in skill_files:
        name = skill_file.parent.name
        try:
            source = skill_file.read_text(encoding="utf-8")
            if not source.startswith("---\n"):
                raise ValueError("missing YAML frontmatter opening delimiter")
            parts = source.split("---", 2)
            if len(parts) != 3:
                raise ValueError("frontmatter must have closing delimiter")
            frontmatter = yaml.safe_load(parts[1])
            if not isinstance(frontmatter, dict) or frontmatter.get("name") != name:
                raise ValueError("frontmatter name must match its repository-owned directory")
            metadata = frontmatter.get("metadata", {})
            if not isinstance(metadata, dict):
                raise ValueError("metadata must be a mapping")
            source_path = metadata.get("source-path")
            expected_path = skill_file.relative_to(root).as_posix()
            if source_path is not None and source_path != expected_path:
                raise ValueError(f"metadata source-path must be {expected_path}")
            wrapper_path = skill_file.parent / "agents/openai.yaml"
            if wrapper_path.is_file():
                validate_openai_wrapper(wrapper_path, name)
        except (OSError, UnicodeError, ValueError, yaml.YAMLError, AttributeError) as exc:
            findings.append(f"{skill_file.relative_to(root).as_posix()}: {exc}")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check without modifying repository files")
    parser.parse_args()
    findings = check_skills()
    if findings:
        print("\n".join(f"ERROR: {finding}" for finding in findings))
        return 1
    print("OK local authored skill names and optional wrappers are consistent")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

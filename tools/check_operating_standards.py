#!/usr/bin/env python3
"""Validate v2 AOM subscription structure without claiming certification."""

from __future__ import annotations

import json
import re
import argparse
import sys
from pathlib import Path, PurePosixPath


ROOT = Path(__file__).resolve().parents[1]
HEX_SHA = re.compile(r"^(?:[0-9a-f]{40}|[0-9a-f]{64})$")
STANDARD_ID = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")


def _safe_relative(value: object) -> bool:
    if not isinstance(value, str) or not value or "\\" in value or value.startswith("/") or ":" in value:
        return False
    path = PurePosixPath(value)
    return not any(part in {"", ".", ".."} for part in value.split("/")) and not path.is_absolute()


def _anchor_exists(text: str, anchor: str) -> bool:
    title = re.sub(r"[^\w -]", "", anchor.replace("-", " ")).strip().lower()
    for heading in re.findall(r"(?m)^#{1,6}\s+(.+?)\s*#*\s*$", text):
        normalized = re.sub(r"[^\w -]", "", heading.replace("`", "")).strip().lower()
        if re.sub(r"\s+", "-", normalized) == anchor.lower():
            return True
    return bool(title and title == text.strip().lower())


def check_subscriptions(root: Path = ROOT) -> list[str]:
    path = root / ".agents/contracts/operating-standards.json"
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        return [f"{path.relative_to(root)}: invalid JSON: {exc}"]
    findings: list[str] = []
    if not isinstance(value, dict) or set(value) != {"version", "standards"} or value.get("version") != 2:
        return ["operating-standards.json must contain only version 2 and standards"]
    standards = value.get("standards")
    if not isinstance(standards, list) or not standards:
        return ["operating-standards.json standards must be a non-empty array"]
    seen: set[str] = set()
    for index, record in enumerate(standards):
        prefix = f"standards[{index}]"
        if not isinstance(record, dict) or set(record) != {"id", "source", "certification"}:
            findings.append(f"{prefix} must contain id, source, and certification only")
            continue
        standard_id = record["id"]
        if not isinstance(standard_id, str) or not STANDARD_ID.fullmatch(standard_id):
            findings.append(f"{prefix} has an invalid standard id")
        elif standard_id in seen:
            findings.append(f"{prefix} duplicates standard id {standard_id}")
        else:
            seen.add(standard_id)
        source = record["source"]
        if not isinstance(source, dict) or set(source) != {"repository", "commit", "definition"}:
            findings.append(f"{prefix} source must contain repository, commit, and definition only")
            continue
        if not isinstance(source["repository"], str) or not source["repository"].startswith("https://"):
            findings.append(f"{prefix} repository must be an HTTPS source URL")
        if not isinstance(source["commit"], str) or not HEX_SHA.fullmatch(source["commit"]):
            findings.append(f"{prefix} must use a full immutable hexadecimal commit")
        if not _safe_relative(source["definition"]):
            findings.append(f"{prefix} definition must be a safe repository-relative path")
        certification = record["certification"]
        if not isinstance(certification, str) or certification.count("#") != 1:
            findings.append(f"{prefix} certification must reference a file and heading anchor")
            continue
        cert_path, anchor = certification.split("#", 1)
        if not _safe_relative(cert_path) or not anchor or "/" in anchor:
            findings.append(f"{prefix} certification reference is invalid")
            continue
        target = root / PurePosixPath(cert_path)
        if not target.is_file():
            findings.append(f"{prefix} certification file is missing: {cert_path}")
        else:
            content = target.read_text(encoding="utf-8")
            if not _anchor_exists(content, anchor):
                findings.append(f"{prefix} certification anchor is missing: {certification}")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="check without modifying repository files")
    parser.parse_args()
    findings = check_subscriptions()
    if findings:
        print("\n".join(f"ERROR: {finding}" for finding in findings))
        return 1
    print("OK AOM v2 subscription structure and certification routes; semantic compliance requires human assessment")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

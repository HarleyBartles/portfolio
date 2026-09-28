"""Content validation rules."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path, PurePosixPath
from typing import Any

from .common import CONTENT_ROOT, Finding, MANIFEST_PATH, _finding
from .config import ALL_STATUSES, EDITORIAL_DATELINE_RE, SLUG_RE, STATUS_BY_KIND

def _load_manifest(root: Path, findings: list[Finding]) -> list[dict[str, Any]] | None:
    manifest_path = root / MANIFEST_PATH
    try:
        raw = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        findings.append(_finding(MANIFEST_PATH, f"cannot load manifest: {exc}"))
        return None

    items = raw.get("items") if isinstance(raw, dict) else None
    if not isinstance(items, list):
        findings.append(_finding(MANIFEST_PATH, "manifest must contain an items array"))
        return None

    if not items:
        findings.append(_finding(MANIFEST_PATH, "items array must not be empty"))

    valid_items: list[dict[str, Any]] = []
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            findings.append(_finding(MANIFEST_PATH, f"item {index + 1} must be an object"))
            continue
        valid_items.append(item)
    return valid_items

def _validate_manifest(
    root: Path,
    items: list[dict[str, Any]],
    findings: list[Finding],
    warnings: list[Finding],
    today: date,
) -> None:
    content_root = (root / CONTENT_ROOT).resolve()
    seen: dict[str, str] = {}
    manifest_paths: set[Path] = set()

    for index, item in enumerate(items):
        label = f"item {index + 1}"
        slug = item.get("slug")
        if not isinstance(slug, str) or SLUG_RE.fullmatch(slug) is None:
            findings.append(_finding(MANIFEST_PATH, f"{label} has invalid slug {slug!r}"))
            slug = str(slug)
        slug_key = slug.casefold()
        if slug_key in seen:
            findings.append(
                _finding(MANIFEST_PATH, f"duplicate slug '{slug}' conflicts with '{seen[slug_key]}'")
            )
        else:
            seen[slug_key] = slug

        kind = item.get("kind")
        if kind not in STATUS_BY_KIND:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsupported kind '{kind}'"))

        status = item.get("status")
        if status not in ALL_STATUSES:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsupported status '{status}'"))
        elif kind in STATUS_BY_KIND and status not in STATUS_BY_KIND[kind]:
            findings.append(
                _finding(MANIFEST_PATH, f"'{slug}' cannot use status '{status}' for kind '{kind}'")
            )

        for field in ("title", "summary"):
            value = item.get(field)
            if not isinstance(value, str) or not value.strip():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires a nonempty {field}"))

        relative_path = item.get("path")
        has_path = isinstance(relative_path, str)
        if "presentation" in item:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' must not contain rendering metadata"))

        if has_path:
            if "\\" in relative_path:
                findings.append(
                    _finding(MANIFEST_PATH, f"'{slug}' Markdown path must use POSIX separators: '{relative_path}'")
                )
            else:
                pure_path = PurePosixPath(relative_path)
                if relative_path != pure_path.as_posix():
                    findings.append(
                        _finding(MANIFEST_PATH, f"'{slug}' Markdown path must be a canonical POSIX path: '{relative_path}'")
                    )
                else:
                    unsafe = pure_path.is_absolute() or ".." in pure_path.parts or pure_path.suffix != ".md"
                    resolved_path = (content_root / Path(*pure_path.parts)).resolve()
                    if unsafe or not resolved_path.is_relative_to(content_root):
                        findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsafe Markdown path '{relative_path}'"))
                    else:
                        manifest_paths.add(resolved_path)
                        if not resolved_path.is_file():
                            findings.append(_finding(Path(relative_path), "content file does not exist"))

        if kind == "writing":
            date_value = item.get("date")
            try:
                if not isinstance(date_value, str) or date.fromisoformat(date_value).isoformat() != date_value:
                    raise ValueError
            except ValueError:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' has invalid ISO date {date_value!r}"))

            reading_minutes = item.get("readingMinutes")
            if not isinstance(reading_minutes, int) or isinstance(reading_minutes, bool) or reading_minutes <= 0:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' readingMinutes must be a positive integer"))

        for field in ("tags", "relatedSlugs"):
            value = item.get(field)
            if not isinstance(value, list) or not all(isinstance(entry, str) for entry in value):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' {field} must be a string array"))

    known_slugs = set(seen)
    for item in items:
        slug = str(item.get("slug"))
        related = item.get("relatedSlugs", [])
        if not isinstance(related, list):
            continue
        for related_slug in related:
            if not isinstance(related_slug, str):
                continue
            if related_slug.casefold() not in known_slugs:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' references unknown related slug '{related_slug}'"))
            if related_slug.casefold() == slug.casefold():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' cannot relate to itself"))

    editorial_writing = [
        item for item in items
        if item.get("kind") == "writing" and item.get("status") == "published" and "editorial" in item
    ]
    if editorial_writing:
        if len(editorial_writing) < 5:
            findings.append(_finding(MANIFEST_PATH, "editorial writing requires at least five published essays"))

        editorial_slugs = {str(item.get("slug")).casefold() for item in editorial_writing}
        leads = 0
        for item in editorial_writing:
            slug = str(item.get("slug"))
            if item.get("featured") is not None:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' must not use generic featured"))
            if item.get("relatedSlugs") not in (None, []):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' must not use generic relatedSlugs"))

            editorial = item.get("editorial")
            if not isinstance(editorial, dict):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' editorial must be an object"))
                continue
            if not EDITORIAL_DATELINE_RE.fullmatch(editorial.get("dateline", "")):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' has invalid editorial dateline"))
            reading_minutes = editorial.get("readingMinutes")
            if not isinstance(reading_minutes, int) or isinstance(reading_minutes, bool) or reading_minutes <= 0:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' editorial readingMinutes must be a positive integer"))
            if editorial.get("indexLead") is True:
                leads += 1

            homepage = editorial.get("homepageFeature")
            if not isinstance(homepage, dict) or not isinstance(homepage.get("eligible"), bool):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires homepage feature eligibility"))
            if not isinstance(homepage, dict) or not isinstance(homepage.get("proposition"), str) or not homepage["proposition"].strip():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' homepage proposition must be nonempty"))

            visual = editorial.get("visual")
            visual_id = visual.get("id") if isinstance(visual, dict) else None
            if visual_id != f"{slug}-visual":
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unknown visual id {visual_id!r}"))
            if not isinstance(visual, dict) or not isinstance(visual.get("description"), str) or not visual["description"].strip():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' visual description must be nonempty"))

            continuations = editorial.get("continuations")
            if not isinstance(continuations, list) or len(continuations) != 2:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires exactly two editorial continuations"))
                continue
            continuation_slugs: list[str] = []
            for continuation in continuations:
                target = continuation.get("slug") if isinstance(continuation, dict) else None
                rationale = continuation.get("rationale") if isinstance(continuation, dict) else None
                if not isinstance(target, str) or not isinstance(rationale, str) or not rationale.strip():
                    findings.append(_finding(MANIFEST_PATH, f"'{slug}' continuation requires slug and rationale"))
                    continue
                target_key = target.casefold()
                continuation_slugs.append(target_key)
                if target_key not in editorial_slugs:
                    findings.append(_finding(MANIFEST_PATH, f"'{slug}' references missing continuation '{target}'"))
                elif target_key == slug.casefold():
                    findings.append(_finding(MANIFEST_PATH, f"'{slug}' cannot continue to itself"))
            for target in set(continuation_slugs):
                if continuation_slugs.count(target) > 1:
                    findings.append(_finding(MANIFEST_PATH, f"'{slug}' has duplicate continuation '{target}'"))

        if leads != 1:
            findings.append(_finding(MANIFEST_PATH, "editorial writing requires exactly one indexLead"))

    for markdown_path in content_root.rglob("*.md"):
        if markdown_path.name == "INDEX.md":
            continue
        if markdown_path.resolve() not in manifest_paths:
            relative = markdown_path.relative_to(root)
            findings.append(_finding(relative, "Markdown file is not listed in the manifest"))

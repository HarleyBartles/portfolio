"""Objective content, privacy, and public-asset contracts for the portfolio."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path, PurePosixPath
from typing import Any


CONTENT_ROOT = Path("src/client/src/data/content")
MANIFEST_PATH = CONTENT_ROOT / "content-manifest.json"
PUBLIC_ROOT = Path("src/client/public")
CUSTODY_PATH = Path("docs/asset-custody.md")
PRODUCTION_ROOT = Path("src/client/src")
PRODUCTION_TEXT_SUFFIXES = {".css", ".html", ".js", ".json", ".md", ".mjs", ".scss", ".ts", ".tsx"}
PUBLIC_ASSET_SUFFIXES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}
RASTER_IMAGE_SUFFIXES = PUBLIC_ASSET_SUFFIXES - {".svg"}
MAX_IMAGE_BYTES = 400 * 1024

STATUS_BY_KIND = {
    "project": {"incomplete", "live", "pre-alpha"},
    "writing": {"published"},
    "fairytales": {"published"},
}
ALL_STATUSES = set().union(*STATUS_BY_KIND.values())
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
PHONE_RE = re.compile(r"(?:\+44[\s().-]*7|\b07)(?:[\s().-]*\d){9}\b")
PRIVATE_PATH_RE = re.compile(r"(?:\b[A-Za-z]:[\\/]|/Users/)")
CUSTODY_PUBLIC_PATH_RE = re.compile(r"`(src/client/public/[^`\r\n]+)`")


@dataclass(frozen=True)
class Finding:
    path: Path
    message: str

    def __str__(self) -> str:
        return f"{self.path.as_posix()}: {self.message}"


def _finding(path: Path, message: str) -> Finding:
    return Finding(path=path, message=message)


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


def _validate_manifest(root: Path, items: list[dict[str, Any]], findings: list[Finding]) -> None:
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
        if not isinstance(relative_path, str):
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires a Markdown path"))
        elif "\\" in relative_path:
            findings.append(
                _finding(MANIFEST_PATH, f"'{slug}' Markdown path must use POSIX separators: '{relative_path}'")
            )
        else:
            pure_path = PurePosixPath(relative_path)
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

    for markdown_path in content_root.rglob("*.md"):
        if markdown_path.resolve() not in manifest_paths:
            relative = markdown_path.relative_to(root)
            findings.append(_finding(relative, "Markdown file is not listed in the manifest"))


def _production_text_files(root: Path) -> list[Path]:
    files = [root / "src/client/index.html"]
    source_root = root / PRODUCTION_ROOT
    files.extend(
        path
        for path in source_root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in PRODUCTION_TEXT_SUFFIXES
        and ".test." not in path.name
    )
    return files


def _validate_privacy(root: Path, findings: list[Finding]) -> None:
    for path in _production_text_files(root):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(root)
        if "mailto:" in text.lower():
            findings.append(_finding(relative, "production source contains a mailto: contact literal"))
        if "tel:" in text.lower():
            findings.append(_finding(relative, "production source contains a tel: contact literal"))
        if EMAIL_RE.search(text):
            findings.append(_finding(relative, "production source contains an email address literal"))
        if PHONE_RE.search(text):
            findings.append(_finding(relative, "production source contains a phone number literal"))
        if PRIVATE_PATH_RE.search(text):
            findings.append(_finding(relative, "production source contains a private filesystem path"))


def _validate_assets(root: Path, findings: list[Finding]) -> None:
    public_root = root / PUBLIC_ROOT
    custody_path = root / CUSTODY_PATH
    custody = custody_path.read_text(encoding="utf-8") if custody_path.is_file() else ""
    custody_paths = set(CUSTODY_PUBLIC_PATH_RE.findall(custody))

    for path in public_root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in PUBLIC_ASSET_SUFFIXES:
            continue
        relative = path.relative_to(root)
        if relative.as_posix() not in custody_paths:
            findings.append(_finding(relative, "public asset is missing from docs/asset-custody.md"))
        if path.suffix.lower() in RASTER_IMAGE_SUFFIXES and path.stat().st_size > MAX_IMAGE_BYTES:
            findings.append(
                _finding(relative, f"image is {path.stat().st_size} bytes and exceeds {MAX_IMAGE_BYTES} bytes")
            )


def validate_portfolio(root: Path) -> list[Finding]:
    """Return every objective portfolio-quality finding under ``root``."""

    findings: list[Finding] = []
    items = _load_manifest(root, findings)
    if items is not None:
        _validate_manifest(root, items, findings)
    _validate_privacy(root, findings)
    _validate_assets(root, findings)
    return findings

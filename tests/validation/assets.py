"""Assets validation rules."""

from __future__ import annotations

import re
from pathlib import Path

from .common import Finding, PUBLIC_ROOT, _custody_asset_paths, _finding
from .config import DECORATIVE_EMOJI_RE, EMAIL_RE, MAX_IMAGE_BYTES, PHONE_RE, PRIVATE_PATH_RE, PRODUCTION_ROOT, PRODUCTION_TEXT_SUFFIXES, PUBLIC_ASSET_SUFFIXES, PUBLIC_VOICE_EMOJI_EXEMPT_PATHS, RASTER_IMAGE_SUFFIXES

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

def _validate_public_voice(root: Path, findings: list[Finding]) -> None:
    for path in _production_text_files(root):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(root)
        if "—" in text:
            findings.append(_finding(relative, "Harley-authored public source contains an em dash"))
        if relative not in PUBLIC_VOICE_EMOJI_EXEMPT_PATHS and DECORATIVE_EMOJI_RE.search(text):
            findings.append(_finding(relative, "Harley-authored public source contains decorative emoji"))

def _validate_assets(root: Path, findings: list[Finding]) -> None:
    custody_paths = _custody_asset_paths(root, findings)
    asset_paths: set[str] = set()

    for asset_root in (root / PUBLIC_ROOT, root / PRODUCTION_ROOT):
        for path in asset_root.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in PUBLIC_ASSET_SUFFIXES:
                continue
            relative = path.relative_to(root)
            relative_text = relative.as_posix()
            asset_paths.add(relative_text)
            if relative_text not in custody_paths:
                findings.append(_finding(relative, "asset is missing from asset custody ledgers"))
            if path.suffix.lower() in RASTER_IMAGE_SUFFIXES and path.stat().st_size > MAX_IMAGE_BYTES:
                findings.append(
                    _finding(relative, f"image is {path.stat().st_size} bytes and exceeds {MAX_IMAGE_BYTES} bytes")
                )

    for stale_path in sorted(custody_paths - asset_paths):
        findings.append(_finding(Path(stale_path), "custody record points to a missing asset"))

"""Wild Bunch validation rules."""

from __future__ import annotations

from datetime import date
from ipaddress import ip_address
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import unquote, urlparse

from .common import Finding, WILD_BUNCH_EVIDENCE_PATH, _custody_asset_paths, _finding, _read_json
from .config import PRIVATE_EVIDENCE_RE, SHA256_RE, SHA_RE, WILD_BUNCH_FORBIDDEN_COORDINATE_RE, WILD_BUNCH_REPOSITORY_URL

def _wild_bunch_strings(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, dict):
        return [text for nested in value.values() for text in _wild_bunch_strings(nested)]
    if isinstance(value, list):
        return [text for nested in value for text in _wild_bunch_strings(nested)]
    return []

def _is_forbidden_wild_bunch_url(value: str) -> bool:
    try:
        parsed = urlparse(value)
        hostname = parsed.hostname
    except ValueError:
        return True

    if not parsed.scheme:
        return False
    if parsed.scheme != "https" or parsed.username is not None or parsed.password is not None:
        return True
    if hostname is None:
        return True
    hostname = hostname.casefold()
    if hostname == "localhost" or hostname.endswith(".localhost"):
        return True
    try:
        return ip_address(hostname).is_loopback
    except ValueError:
        return False

def _is_canonical_wild_bunch_evidence_link(value: Any, revision: str) -> bool:
    if not isinstance(value, str) or _is_forbidden_wild_bunch_url(value):
        return False
    parsed = urlparse(value)
    prefix = f"/HarleyBartles/wild-bunch/blob/{revision}/"
    if parsed.netloc != "github.com" or not parsed.path.startswith(prefix) or parsed.query or parsed.fragment:
        return False
    relative_path = parsed.path.removeprefix(prefix)
    decoded_path = unquote(relative_path)
    if decoded_path != relative_path or "%" in decoded_path:
        return False
    pure_path = PurePosixPath(relative_path)
    return (
        bool(relative_path)
        and relative_path != "."
        and relative_path == pure_path.as_posix()
        and not pure_path.is_absolute()
        and "." not in pure_path.parts
        and ".." not in pure_path.parts
    )

def _validate_wild_bunch_evidence(root: Path, findings: list[Finding]) -> None:
    evidence = _read_json(root / WILD_BUNCH_EVIDENCE_PATH, findings, "Wild Bunch evidence")
    if not isinstance(evidence, dict):
        return

    observed_at = evidence.get("observedAt")
    try:
        is_canonical_date = isinstance(observed_at, str) and date.fromisoformat(observed_at).isoformat() == observed_at
    except ValueError:
        is_canonical_date = False
    if not is_canonical_date:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "invalid observedAt; use ISO date format"))
    revision = evidence.get("revision")
    if not isinstance(revision, str) or SHA_RE.fullmatch(revision) is None:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "revision must be a 40-character commit"))

    for field in ("repositoryUrl", "historicalReferenceUrl"):
        value = evidence.get(field)
        if not isinstance(value, str) or not value.startswith("https://"):
            findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"{field} must use HTTPS"))
    if evidence.get("repositoryUrl") != WILD_BUNCH_REPOSITORY_URL:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "repositoryUrl must identify the Wild Bunch repository"))

    if not isinstance(evidence.get("status"), str) or not evidence["status"].strip():
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "status must be nonempty"))

    recipe = evidence.get("captureRecipe")
    if not isinstance(recipe, dict):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "captureRecipe must be an object"))
    elif not recipe or any(not isinstance(value, str) or not value.strip() for value in recipe.values()):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "captureRecipe values must be nonempty strings"))

    capabilities = evidence.get("capabilities")
    if not isinstance(capabilities, dict):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "capabilities must be an object"))
    else:
        for category in ("implemented", "transitional", "planned"):
            entries = capabilities.get(category)
            if not isinstance(entries, list) or not entries or not all(isinstance(entry, str) and entry.strip() for entry in entries):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"capabilities {category} must be a nonempty string array"))

    representative_evidence = evidence.get("representativeEvidence")
    if not isinstance(representative_evidence, list) or not representative_evidence:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "representativeEvidence must be a nonempty array"))
    else:
        pinned_prefix = f"{WILD_BUNCH_REPOSITORY_URL}/blob/{revision}/" if isinstance(revision, str) else ""
        for index, entry in enumerate(representative_evidence, start=1):
            if not isinstance(entry, dict):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} must be an object"))
                continue
            if not isinstance(entry.get("claim"), str) or not entry["claim"].strip():
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} requires a claim"))
            for field in ("sourceUrl", "testUrl"):
                value = entry.get(field)
                if not isinstance(value, str) or not value.startswith(pinned_prefix):
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} {field} must use the pinned revision"))
                elif not isinstance(revision, str) or not _is_canonical_wild_bunch_evidence_link(value, revision):
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} {field} must use a canonical pinned repository path"))

    images = evidence.get("images")
    if not isinstance(images, list):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "images must be an array"))
    else:
        custody_paths = _custody_asset_paths(root, [])
        for index, image in enumerate(images, start=1):
            if not isinstance(image, dict):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must be an object"))
                continue
            path = image.get("path")
            if not isinstance(path, str) or not path.startswith("src/client/public/media/wild-bunch/"):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} path must be a public custody path"))
            elif path not in custody_paths:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} path is missing from asset custody ledgers"))
            width, height = image.get("width"), image.get("height")
            if (
                not isinstance(width, int)
                or isinstance(width, bool)
                or width <= 0
                or not isinstance(height, int)
                or isinstance(height, bool)
                or height <= 0
            ):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} requires a positive width and height"))
            capture = image.get("capture")
            if capture not in {"dustwell-town", "trail-map", "session-audit", "wanted-notice", "case-file"}:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must name a screened capture"))
            if image.get("format") not in {"avif", "webp"}:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must use AVIF or WebP"))
            if not isinstance(image.get("sourceFile"), str) or not image["sourceFile"].endswith("-1440.png"):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain its raw source filename"))
            source_hash = image.get("sourceSha256")
            if not isinstance(source_hash, str) or SHA256_RE.fullmatch(source_hash) is None:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain a SHA-256 source hash"))
            if image.get("sourceWidth") != 1440 or image.get("sourceHeight") != 1100:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain 1440 by 1100 raw dimensions"))
            bytes_count = image.get("bytes")
            if not isinstance(bytes_count, int) or isinstance(bytes_count, bool) or bytes_count <= 0:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} requires a positive byte count"))
            for field, required_text in (("altIntent", "current development build"), ("caption", "working skeleton")):
                value = image.get(field)
                if not isinstance(value, str) or required_text not in value.lower():
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} {field} must preserve development-skeleton framing"))
            if isinstance(path, str) and path.startswith("src/client/public/media/wild-bunch/"):
                asset_path = root / path
                if not asset_path.is_file():
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} derivative is missing from the public tree"))
                elif isinstance(bytes_count, int) and not isinstance(bytes_count, bool) and asset_path.stat().st_size != bytes_count:
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} byte count does not match the committed derivative"))

    for text in _wild_bunch_strings(evidence):
        if (
            PRIVATE_EVIDENCE_RE.search(text)
            or WILD_BUNCH_FORBIDDEN_COORDINATE_RE.search(text)
            or _is_forbidden_wild_bunch_url(text)
        ):
            findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "contains a private local coordinate or secret"))
            break

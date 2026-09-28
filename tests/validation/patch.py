"""Patch validation rules."""

from __future__ import annotations

from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from PIL import Image

from .common import Finding, PATCH_DERIVATIVE_RECEIPT_PATH, PATCH_EVIDENCE_PATH, _custody_asset_paths, _finding, _read_json
from .config import PATCH_PRIVATE_COORDINATE_RE, PATCH_REPOSITORY_URL, PATCH_SOURCE_STATES, PATCH_SOURCE_TYPES, PATCH_STATUSES, SHA_RE

def _patch_strings(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, dict):
        return [text for nested in value.values() for text in _patch_strings(nested)]
    if isinstance(value, list):
        return [text for nested in value for text in _patch_strings(nested)]
    return []

def _is_pinned_patch_url(value: Any, revision: str) -> bool:
    if not isinstance(value, str):
        return False
    prefix = f"{PATCH_REPOSITORY_URL}/blob/{revision}/"
    if not value.startswith(prefix):
        return False
    parsed = urlparse(value)
    return parsed.query == "" and parsed.fragment == "" and bool(parsed.path.removeprefix(urlparse(prefix).path))

def _is_private_patch_coordinate(value: str) -> bool:
    if PATCH_PRIVATE_COORDINATE_RE.search(value):
        return True
    try:
        parsed = urlparse(value)
    except ValueError:
        return True
    return parsed.scheme == "file" or (not parsed.scheme and value.startswith("/"))

def _require_patch_string(evidence: dict[str, Any], field: str, findings: list[Finding], message: str) -> None:
    value = evidence.get(field)
    if not isinstance(value, str) or not value.strip():
        findings.append(_finding(PATCH_EVIDENCE_PATH, message))

def _validate_patch_evidence(root: Path, findings: list[Finding]) -> None:
    evidence = _read_json(root / PATCH_EVIDENCE_PATH, findings, "Patch evidence")
    if not isinstance(evidence, dict):
        return

    observed_at = evidence.get("observedAt")
    try:
        valid_date = isinstance(observed_at, str) and date.fromisoformat(observed_at).isoformat() == observed_at
    except ValueError:
        valid_date = False
    if not valid_date:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "invalid observedAt; use ISO date format"))
    revision = evidence.get("sourceRevision")
    if not isinstance(revision, str) or SHA_RE.fullmatch(revision) is None:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "sourceRevision must be a 40-character commit"))

    if evidence.get("repositoryUrl") != PATCH_REPOSITORY_URL:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "repositoryUrl must match the approved HTTPS public repository URL"))

    pipeline = evidence.get("pipeline")
    expected_stages = (
        ("seed", "Seed"),
        ("frame", "Frame"),
        ("visual-preproduction", "Visual pre-production"),
        ("image-generation-and-qa", "Image generation and QA"),
        ("deterministic-compilation", "Deterministic compilation"),
        ("published-artefact-and-receipt", "Published artefact and receipt"),
    )
    pipeline_ids = [entry.get("id") if isinstance(entry, dict) else None for entry in pipeline] if isinstance(pipeline, list) else []
    pipeline_names = [entry.get("name") if isinstance(entry, dict) else None for entry in pipeline] if isinstance(pipeline, list) else []
    if not isinstance(pipeline, list) or pipeline_ids != [stage[0] for stage in expected_stages] or pipeline_names != [stage[1] for stage in expected_stages]:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "pipeline must contain the six ordered production stages"))
    else:
        for index, stage in enumerate(pipeline, start=1):
            for field in ("input", "decision", "output", "stopCondition"):
                _require_patch_string(stage, field, findings, f"pipeline stage {index} requires {field}")

    def validate_records(field: str, in_flight: bool) -> None:
        records = evidence.get(field)
        if not isinstance(records, list) or not records:
            findings.append(_finding(PATCH_EVIDENCE_PATH, f"{field} must be a nonempty array"))
            return
        for index, record in enumerate(records, start=1):
            label = "in-flight" if in_flight else "published"
            if not isinstance(record, dict):
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"{label} record {index} must be an object"))
                continue
            _require_patch_string(record, "title", findings, f"{label} record {index} requires a title")
            status = record.get("status")
            if status not in PATCH_STATUSES:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"{label} record {index} has unsupported status {status!r}"))
            if not in_flight:
                if status != "published":
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"published record {index} must use status 'published'"))
                url = record.get("publicArtefactUrl")
                if not isinstance(url, str) or not url:
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"published record {index} requires a publicArtefactUrl"))
                elif not isinstance(revision, str) or not _is_pinned_patch_url(url, revision):
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"published record {index} publicArtefactUrl must use the pinned source revision"))
            elif status not in {"advanced-visual-preproduction", "visual-development", "legacy-reference"}:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"in-flight record {index} has unsupported in-flight status {status!r}"))
            if in_flight:
                _require_patch_string(record, "lesson", findings, f"in-flight record {index} requires lesson")
                _require_patch_string(record, "currentEvidence", findings, f"in-flight record {index} requires currentEvidence")
                _require_patch_string(record, "remaining", findings, f"in-flight record {index} requires remaining")

    validate_records("published", in_flight=False)
    validate_records("inFlight", in_flight=True)
    story_lab = evidence.get("storyLab")
    if not isinstance(story_lab, dict):
        findings.append(_finding(PATCH_EVIDENCE_PATH, "storyLab must be an object"))
    else:
        fairytale_plans = story_lab.get("fairytalePlans")
        adventure_plans = story_lab.get("adventurePlans")
        for name, plans in (("fairytalePlans", fairytale_plans), ("adventurePlans", adventure_plans)):
            if not isinstance(plans, list):
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"storyLab {name} must be an array"))
        for collection in (fairytale_plans if isinstance(fairytale_plans, list) else [], adventure_plans if isinstance(adventure_plans, list) else []):
            for entry in collection:
                if not isinstance(entry, dict) or any(not isinstance(entry.get(field), str) or not entry[field].strip() for field in ("title", "lesson")):
                    findings.append(_finding(PATCH_EVIDENCE_PATH, "future-work item requires a title and lesson"))
                elif any(field in entry for field in ("date", "progress", "link", "url")):
                    findings.append(_finding(PATCH_EVIDENCE_PATH, "future-work item must not contain date, progress, or link"))

    receipt = _read_json(root / PATCH_DERIVATIVE_RECEIPT_PATH, findings, "Patch derivative receipt")
    receipt_images = receipt.get("images") if isinstance(receipt, dict) else None
    receipt_by_path = {
        entry.get("path"): entry for entry in receipt_images
        if isinstance(entry, dict) and isinstance(entry.get("path"), str)
    } if isinstance(receipt_images, list) else {}
    media = evidence.get("media")
    custody_paths = _custody_asset_paths(root, [])
    if not isinstance(media, list) or not media:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "media must be a nonempty array"))
    else:
        media_paths = [item.get("path") if isinstance(item, dict) else None for item in media]
        if len(media_paths) != len(set(media_paths)) or set(media_paths) != set(receipt_by_path):
            findings.append(_finding(PATCH_EVIDENCE_PATH, "media must match the complete unique derivative receipt inventory"))
        for index, item in enumerate(media, start=1):
            if not isinstance(item, dict):
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} must be an object"))
                continue
            path = item.get("path")
            if not isinstance(path, str) or not path.startswith("src/client/public/media/patch/"):
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} path must be a Patch public custody path"))
            elif path not in custody_paths:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} path is missing from asset custody ledgers"))
            receipt_item = receipt_by_path.get(path)
            if receipt_item is None:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} is missing from the derivative receipt"))
            width, height = item.get("width"), item.get("height")
            if not all(isinstance(value, int) and not isinstance(value, bool) and value > 0 for value in (width, height)):
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} requires positive intrinsic dimensions"))
            bytes_count = item.get("bytes")
            if not isinstance(bytes_count, int) or isinstance(bytes_count, bool) or bytes_count <= 0:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} requires a positive byte count"))
            _require_patch_string(item, "custody", findings, f"media record {index} requires custody")
            source_type = item.get("sourceType")
            if source_type not in PATCH_SOURCE_TYPES:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} has unsupported sourceType {source_type!r}"))
            if item.get("sourceStatus") not in PATCH_SOURCE_STATES:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} has unsupported sourceStatus {item.get('sourceStatus')!r}"))
            source_revision = item.get("sourceRevision")
            if not isinstance(source_revision, str) or SHA_RE.fullmatch(source_revision) is None:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} sourceRevision must be a 40-character commit"))
            if source_type == "generated-pose" and item.get("sourceStatus") != "accepted":
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} generated pose requires accepted sourceStatus"))
            if isinstance(receipt_item, dict):
                for field in ("width", "height", "bytes", "sourceRevision", "sourceStatus"):
                    if item.get(field) != receipt_item.get(field):
                        findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} {field} does not match derivative receipt"))
            if isinstance(path, str) and path.startswith("src/client/public/media/patch/"):
                asset_path = root / path
                if not asset_path.is_file():
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} derivative is missing from the public tree"))
                elif isinstance(bytes_count, int) and not isinstance(bytes_count, bool) and asset_path.stat().st_size != bytes_count:
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} byte count does not match the committed derivative"))
                else:
                    try:
                        with Image.open(asset_path) as image:
                            intrinsic = image.size
                    except (OSError, ValueError):
                        findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} derivative dimensions cannot be read"))
                    else:
                        if intrinsic != (width, height):
                            findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} intrinsic dimensions do not match the committed derivative"))

    for text in _patch_strings(evidence):
        if _is_private_patch_coordinate(text):
            findings.append(_finding(PATCH_EVIDENCE_PATH, "contains a private coordinate or credential"))
            break

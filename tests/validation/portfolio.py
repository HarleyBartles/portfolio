"""Composition point for checked-out portfolio validation."""
from __future__ import annotations

from datetime import date
from pathlib import Path

from .assets import _validate_assets, _validate_privacy, _validate_public_voice
from .common import Finding
from .content import _load_manifest, _validate_manifest
from .learning_lab import _validate_learning_lab_evidence
from .marketplace import _validate_marketplace_evidence
from .patch import _validate_patch_evidence
from .wild_bunch import _validate_wild_bunch_evidence

def validate_portfolio(root: Path, today: date | None = None, warnings: list[Finding] | None = None) -> list[Finding]:
    """Return every objective portfolio-quality finding under ``root``."""
    findings: list[Finding] = []
    collected_warnings = warnings if warnings is not None else []
    effective_today = today or date.today()
    items = _load_manifest(root, findings)
    if items is not None:
        _validate_manifest(root, items, findings, collected_warnings, effective_today)
        slugs = {item.get("slug") for item in items}
        if "agentic-learning-lab" in slugs:
            _validate_learning_lab_evidence(root, findings, effective_today)
        if "codex-marketplace" in slugs:
            _validate_marketplace_evidence(root, findings, collected_warnings)
        if "wild-bunch" in slugs:
            _validate_wild_bunch_evidence(root, findings)
        if "adventures-of-patch" in slugs:
            _validate_patch_evidence(root, findings)
    _validate_privacy(root, findings)
    _validate_public_voice(root, findings)
    _validate_assets(root, findings)
    return findings

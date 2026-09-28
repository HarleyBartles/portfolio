"""Shared result and file helpers for portfolio validation."""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import urlparse

from .config import PUBLIC_ASSET_SUFFIXES

@dataclass(frozen=True)
class Finding:
    path: Path
    message: str

    def __str__(self) -> str:
        return f"{self.path.as_posix()}: {self.message}"

CONTENT_ROOT = Path("src/client/src/data/content")

MANIFEST_PATH = CONTENT_ROOT / "content-manifest.json"

PUBLIC_ROOT = Path("src/client/public")

CUSTODY_DIR = Path("docs/asset-custody")

MARKETPLACE_EVIDENCE_PATH = Path("src/client/src/data/case-studies/marketplace-evidence.json")

WILD_BUNCH_EVIDENCE_PATH = Path("src/client/src/data/case-studies/wild-bunch-evidence.json")

PATCH_EVIDENCE_PATH = Path("src/client/src/data/case-studies/patch-evidence.json")

LEARNING_LAB_EVIDENCE_PATH = Path("src/client/src/data/case-studies/learning-lab-evidence.json")

PATCH_DERIVATIVE_RECEIPT_PATH = Path("src/client/public/media/patch/patch-derivatives.json")

def _finding(path: Path, message: str) -> Finding:
    return Finding(path=path, message=message)

def _read_json(path: Path, findings: list[Finding], label: str) -> Any | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        findings.append(_finding(path, f"cannot load {label}: {exc}"))
        return None

def _custody_asset_paths(root: Path, findings: list[Finding]) -> set[str]:
    ledger_files = sorted((root / CUSTODY_DIR).glob("*.json"))
    if not ledger_files:
        findings.append(_finding(CUSTODY_DIR, "asset custody ledgers are missing"))
        return set()

    paths: set[str] = set()
    for ledger_file in ledger_files:
        ledger = _read_json(ledger_file, findings, "asset custody ledger")
        if not isinstance(ledger, dict) or not isinstance(ledger.get("assetPaths"), list):
            findings.append(_finding(ledger_file, "asset custody ledger needs an assetPaths array"))
            continue
        for index, value in enumerate(ledger["assetPaths"], start=1):
            if (
                not isinstance(value, str)
                or not value.startswith("src/client/")
                or "\\" in value
                or ".." in PurePosixPath(value).parts
                or PurePosixPath(value).suffix.lower() not in PUBLIC_ASSET_SUFFIXES
            ):
                findings.append(_finding(ledger_file, f"assetPaths item {index} must be a canonical client asset path"))
                continue
            paths.add(value)
    return paths

def _is_https_url(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    parsed = urlparse(value)
    return parsed.scheme == "https" and bool(parsed.netloc) and parsed.username is None and parsed.password is None

__all__ = ["Finding", "_finding", "_read_json", "_custody_asset_paths", "_is_https_url", "CONTENT_ROOT", "MANIFEST_PATH", "PUBLIC_ROOT", "CUSTODY_DIR", "MARKETPLACE_EVIDENCE_PATH", "WILD_BUNCH_EVIDENCE_PATH", "PATCH_EVIDENCE_PATH", "LEARNING_LAB_EVIDENCE_PATH", "PATCH_DERIVATIVE_RECEIPT_PATH"]

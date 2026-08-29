"""Read the one tracked public deployment profile for repository tooling."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_CONFIG = ROOT / "src" / "client" / "site.config.json"
ROUTE_CATALOGUE = ROOT / "src" / "client" / "src" / "data" / "routes" / "route-metadata.generated.json"


def active_profile() -> dict[str, str]:
    configuration = json.loads(SITE_CONFIG.read_text(encoding="utf-8"))
    return configuration["profiles"][configuration["activeProfile"]]


def public_url(route: str) -> str:
    profile = active_profile()
    origin = profile["canonicalOrigin"].rstrip("/")
    base_path = profile["basePath"]
    base = "" if base_path == "/" else base_path.rstrip("/")
    return f"{origin}{base}/" if route == "/" else f"{origin}{base}{route}"


def public_routes() -> list[str]:
    catalogue = json.loads(ROUTE_CATALOGUE.read_text(encoding="utf-8"))
    return sorted(entry["path"] for entry in catalogue if entry["indexability"] == "index")

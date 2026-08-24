#!/usr/bin/env python3
"""Regenerate public/robots.txt and public/sitemap.xml from the content manifest."""

from __future__ import annotations

import json
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src" / "client" / "src" / "data" / "content" / "content-manifest.json"
PUBLIC = ROOT / "src" / "client" / "public"

ORIGIN = "https://harleybartles.github.io"
BASE_URL = "/portfolio/"

INDEX_ROUTES = ["/", "/projects", "/writing", "/patch", "/about", "/cv"]

PLURAL = {
    "project": "projects",
}


def _kind_route(kind: str) -> str:
    return PLURAL.get(kind, kind)


def _loc(route: str) -> str:
    base = f"{ORIGIN.rstrip('/')}{BASE_URL.rstrip('/')}"
    return f"{base}/" if route == "/" else f"{base}{route}"


def build_routes() -> list[str]:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    slugs = {item["slug"] for item in manifest["items"]}
    routes = set(INDEX_ROUTES)

    for item in manifest["items"]:
        if item["slug"] not in slugs:
            continue
        kind = _kind_route(item["kind"])
        routes.add(f"/{kind}/{item['slug']}")

    return sorted(routes)


def _write_robots() -> None:
    text = (
        "User-agent: *\n"
        "Allow: /\n"
        "\n"
        f"Sitemap: {_loc('/sitemap.xml')}\n"
    )
    (PUBLIC / "robots.txt").write_text(text, encoding="utf-8", newline="\n")


def _write_sitemap(routes: list[str]) -> None:
    urlset = ET.Element(
        "urlset",
        {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"},
    )

    for route in routes:
        url = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = _loc(route)

    xml = ET.tostring(urlset, encoding="unicode")
    sitemap = f'<?xml version="1.0" encoding="UTF-8"?>\n{xml}\n'
    (PUBLIC / "sitemap.xml").write_text(sitemap, encoding="utf-8", newline="\n")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    routes = build_routes()
    _write_robots()
    _write_sitemap(routes)
    print(f"[tools/refresh_seo_files] wrote {len(routes)} routes to public/sitemap.xml")


if __name__ == "__main__":
    main()

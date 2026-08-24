#!/usr/bin/env python3
"""Fail the build if any internal or SEO links are broken or stale."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "src" / "client" / "src" / "data" / "content" / "content-manifest.json"
PUBLIC = ROOT / "src" / "client" / "public"
SRC_CLIENT = ROOT / "src" / "client" / "src"
CONTENT_DIR = SRC_CLIENT / "data" / "content"

ORIGIN = "https://harleybartles.github.io"
BASE_URL = "/portfolio/"

PLURAL = {"project": "projects"}

INDEX_ROUTES = {"/", "/projects", "/writing", "/patch", "/about", "/cv"}
COMPATIBILITY_ROUTES = {"/fairytales", "/fairytales/goldilocks", "/fairytales/sorcerers-apprentice"}

ANCHOR_RE = re.compile(r'<a\s[^>]*?\bhref\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|\{\s*["\']([^"\']*)["\']\s*\})', re.IGNORECASE)
ANCHOR_TAG_RE = re.compile(r'<a\b[^>]*>', re.IGNORECASE | re.DOTALL)
LINK_RE = re.compile(r'!?\[[^\]]*\]\(([^)]+)\)')
ABSOLUTE_LOCAL_RE = re.compile(r'^/[a-zA-Z0-9_/.-]')


def _kind_route(kind: str) -> str:
    return PLURAL.get(kind, kind)


def build_routes() -> set[str]:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    routes = set(INDEX_ROUTES)
    slugs = {item["slug"]: item["kind"] for item in manifest["items"]}

    for item in manifest["items"]:
        if item["slug"] not in slugs:
            continue
        routes.add(f"/{_kind_route(item['kind'])}/{item['slug']}")

    return routes


def _is_allowed_external(url: str) -> bool:
    return url.startswith(("http://", "https://", "//", "mailto:", "tel:", "#"))


def _public_file_exists(url: str) -> bool:
    if not url.startswith("/"):
        return False
    return (PUBLIC / url.lstrip("/")).is_file()


def check_related_slugs(manifest: dict, errors: list[str]) -> None:
    slugs = {item["slug"] for item in manifest["items"]}
    for item in manifest["items"]:
        for related in item.get("relatedSlugs", []):
            if related not in slugs:
                errors.append(
                    f"content-manifest.json: '{item['slug']}' references missing related slug '{related}'"
                )


def check_jsx_anchors(errors: list[str], source_root: Path = SRC_CLIENT) -> None:
    for path in source_root.rglob("*.tsx"):
        if path.name == "ExternalLink.tsx":
            continue
        if path.name == "MarkdownContent.tsx":
            continue
        text = path.read_text(encoding="utf-8")
        for tag in ANCHOR_TAG_RE.findall(text):
            if re.search(r'\btarget\s*=\s*["\']_blank["\']', tag, re.IGNORECASE):
                errors.append(
                    f"{path.relative_to(ROOT) if path.is_relative_to(ROOT) else path.name}: raw new-tab anchor bypasses the accessible ExternalLink component"
                )
            if re.search(r'\bhref\s*=\s*["\']https?://', tag, re.IGNORECASE):
                errors.append(
                    f"{path.relative_to(ROOT) if path.is_relative_to(ROOT) else path.name}: raw external anchor bypasses the accessible ExternalLink component"
                )
        for match in ANCHOR_RE.finditer(text):
            href = next(g for g in match.groups() if g is not None)
            if href.startswith("/") and not href.startswith("//"):
                errors.append(
                    f"{path.relative_to(ROOT)}: <a href=\"{href}\"> uses a root-relative href; use react-router Link instead"
                )


def check_external_link_contract(errors: list[str], source_root: Path = SRC_CLIENT) -> None:
    component = source_root / "components" / "ExternalLink.tsx"
    if not component.is_file():
        errors.append("src/client/src/components/ExternalLink.tsx: accessible external-link component is missing")
        return

    text = component.read_text(encoding="utf-8")
    required_fragments = {
        'target="_blank"': "open external destinations in a new tab",
        "noopener": "protect the opener context",
        "noreferrer": "avoid leaking the portfolio URL",
        "external-link__icon": "show a visible external-link icon",
        "opens in a new tab": "announce the new browsing context",
        'aria-hidden="true"': "hide the decorative icon from assistive technology",
    }
    for fragment, purpose in required_fragments.items():
        if fragment not in text:
            errors.append(
                f"src/client/src/components/ExternalLink.tsx: must {purpose} ({fragment!r} missing)"
            )


def _content_md_paths(manifest: dict) -> set[Path]:
    return {
        CONTENT_DIR / item["path"]
        for item in manifest["items"]
        if isinstance(item.get("path"), str) and item["path"].endswith(".md")
    }


def check_markdown_links(manifest: dict, routes: set[str], errors: list[str]) -> None:
    for path in _content_md_paths(manifest):
        text = path.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(text):
            is_image = text[match.start()] == "!"
            url = match.group(1)

            if _is_allowed_external(url):
                continue

            if not url.startswith("/"):
                errors.append(
                    f"{path.relative_to(ROOT)}: {'image ' if is_image else ''}link '{url}' is not an absolute local or known external URL"
                )
                continue

            if is_image:
                if not _public_file_exists(url):
                    errors.append(
                        f"{path.relative_to(ROOT)}: image '{url}' does not exist in public/"
                    )
                continue

            if url not in routes and url not in INDEX_ROUTES and url not in COMPATIBILITY_ROUTES:
                errors.append(
                    f"{path.relative_to(ROOT)}: link '{url}' does not resolve to a known route"
                )


def check_seo_files(routes: set[str], errors: list[str]) -> None:
    expected_sitemap = f"{ORIGIN.rstrip('/')}{BASE_URL.rstrip('/')}/sitemap.xml"
    robots = PUBLIC / "robots.txt"
    sitemap = PUBLIC / "sitemap.xml"

    if not robots.is_file():
        errors.append("public/robots.txt is missing")
        return

    robots_text = robots.read_text(encoding="utf-8")
    sitemap_line = None
    for line in robots_text.splitlines():
        if line.lower().startswith("sitemap:"):
            sitemap_line = line.split(":", 1)[1].strip()
            break

    if sitemap_line != expected_sitemap:
        errors.append(
            f"public/robots.txt Sitemap line is '{sitemap_line}', expected '{expected_sitemap}'"
        )

    if not sitemap.is_file():
        errors.append("public/sitemap.xml is missing")
        return

    tree = ET.parse(sitemap)
    root = tree.getroot()
    seen = set()
    base = f"{ORIGIN.rstrip('/')}{BASE_URL.rstrip('/')}"

    for url in root:
        for child in url:
            if child.tag.endswith("}loc"):
                loc = child.text or ""
                if not loc.startswith(base):
                    errors.append(f"public/sitemap.xml: <loc> '{loc}' does not use the public base URL")
                    continue
                route = loc[len(base):]
                if not route.startswith("/"):
                    route = "/" + route
                seen.add(route)

    missing = routes - seen
    extra = seen - routes
    for route in sorted(missing):
        errors.append(f"public/sitemap.xml is missing route '{route}'")
    for route in sorted(extra):
        errors.append(f"public/sitemap.xml has stale route '{route}'")


def main() -> int:
    errors: list[str] = []
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    routes = build_routes()

    check_related_slugs(manifest, errors)
    check_jsx_anchors(errors)
    check_external_link_contract(errors)
    check_markdown_links(manifest, routes, errors)
    check_seo_files(routes, errors)

    if errors:
        print("[tools/check_link_hygiene] broken links detected:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    print(f"[tools/check_link_hygiene] {len(routes)} routes, all links OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

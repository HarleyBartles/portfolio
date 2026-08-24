#!/usr/bin/env python3
"""Verify that the deployed Pages site serves route-correct public HTML."""

from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Mapping, Sequence

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MANIFEST = ROOT / "src" / "client" / "src" / "data" / "content" / "content-manifest.json"
INDEX_ROUTES = ("/", "/about", "/cv", "/fairytales", "/patch", "/projects", "/writing")
KIND_ROOT = {"project": "projects", "writing": "writing", "patch": "patch"}
LEGACY_ROUTE_CANONICALS = {
    "/fairytales": "/patch",
    "/fairytales/goldilocks": "/patch/goldilocks",
    "/fairytales/sorcerers-apprentice": "/patch/sorcerers-apprentice",
}
UNKNOWN_ROUTE = "/__portfolio-route-smoke__"
USER_AGENT = "portfolio-public-route-check/1.0"


class DocumentMetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.canonical: str | None = None
        self.in_title = False
        self.title_parts: list[str] = []

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {name.lower(): value for name, value in attrs}
        if tag.lower() == "title":
            self.in_title = True
        if tag.lower() == "link" and "canonical" in (attributes.get("rel") or "").lower().split():
            self.canonical = attributes.get("href")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)


@dataclass(frozen=True)
class FetchResult:
    status: int
    content_type: str
    body: bytes
    final_url: str


def expected_public_routes(manifest: Mapping[str, Any]) -> list[str]:
    """Return every public route in deterministic review order."""
    content_routes = []
    for item in manifest.get("items", []):
        root = KIND_ROOT.get(item.get("kind"))
        slug = item.get("slug")
        if root is not None and isinstance(slug, str) and slug:
            content_routes.append(f"/{root}/{slug}")
    legacy_routes = [route for route, canonical in LEGACY_ROUTE_CANONICALS.items() if canonical == "/patch" or canonical in content_routes]
    return [*INDEX_ROUTES, *sorted(set(content_routes + legacy_routes) - set(INDEX_ROUTES))]


def _request_url(origin: str, route: str) -> str:
    base = origin.rstrip("/")
    return f"{base}/" if route == "/" else f"{base}{route}"


def _canonical_url(origin: str, route: str) -> str:
    base = origin.rstrip("/")
    return base if route == "/" else f"{base}{route}"


def _read_response(response: Any, status: int | None = None) -> FetchResult:
    content_type = response.headers.get_content_type() if response.headers is not None else ""
    return FetchResult(
        status=response.status if status is None else status,
        content_type=content_type,
        body=response.read(2_000_000),
        final_url=response.geturl(),
    )


def _fetch(url: str, *, retries: int, retry_delay: float, timeout: float) -> FetchResult:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                result = _read_response(response)
        except urllib.error.HTTPError as error:
            with error:
                result = _read_response(error, error.code)
        except urllib.error.URLError as error:
            last_error = error
            if attempt < retries:
                time.sleep(retry_delay)
                continue
            raise

        if result.status >= 500 and attempt < retries:
            time.sleep(retry_delay)
            continue
        return result

    assert last_error is not None
    raise last_error


def _looks_like_github_error(body: str) -> bool:
    lowered = body.lower()
    return "github pages" in lowered and (
        "page not found" in lowered or "there is no github pages site here" in lowered
    )


def _inspect_html(route: str, result: FetchResult, expected_canonical: str, *, unknown: bool) -> list[str]:
    findings: list[str] = []
    if result.content_type != "text/html":
        findings.append(f"{route}: Content-Type is {result.content_type or 'missing'}, expected text/html")
        return findings

    text = result.body.decode("utf-8", errors="replace")
    if _looks_like_github_error(text):
        findings.append(f"{route}: response is the generic GitHub Pages error document")
        return findings

    parser = DocumentMetadataParser()
    parser.feed(text)
    if not parser.title:
        findings.append(f"{route}: HTML has no nonempty title")
    if not unknown and parser.canonical != expected_canonical:
        findings.append(
            f"{route}: canonical is {parser.canonical!r}, expected {expected_canonical!r}"
        )
    return findings


def check_public_routes(
    origin: str,
    manifest: Mapping[str, Any],
    *,
    retries: int = 2,
    retry_delay: float = 1.0,
    timeout: float = 15.0,
) -> list[str]:
    """Return actionable findings for known routes and the custom 404 document."""
    findings: list[str] = []
    for route in expected_public_routes(manifest):
        url = _request_url(origin, route)
        try:
            result = _fetch(url, retries=retries, retry_delay=retry_delay, timeout=timeout)
        except urllib.error.URLError as error:
            findings.append(f"{route}: network failure: {error.reason}")
            continue

        if result.status != 200:
            qualifier = " redirect response" if 300 <= result.status < 400 else ""
            findings.append(f"{route}: HTTP {result.status}{qualifier}; known routes must return 200")
            continue
        canonical_route = LEGACY_ROUTE_CANONICALS.get(route, route)
        findings.extend(_inspect_html(route, result, _canonical_url(origin, canonical_route), unknown=False))

    unknown_url = _request_url(origin, UNKNOWN_ROUTE)
    try:
        unknown_result = _fetch(unknown_url, retries=retries, retry_delay=retry_delay, timeout=timeout)
    except urllib.error.URLError as error:
        findings.append(f"{UNKNOWN_ROUTE}: network failure: {error.reason}")
        return findings

    if unknown_result.status != 404:
        findings.append(
            f"{UNKNOWN_ROUTE}: HTTP {unknown_result.status}; an unknown route must return the custom 404"
        )
    else:
        findings.extend(_inspect_html(UNKNOWN_ROUTE, unknown_result, _canonical_url(origin, "/"), unknown=True))
    return findings


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--origin", required=True, help="Deployed base URL, including /portfolio")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--retries", type=int, default=2)
    parser.add_argument("--retry-delay", type=float, default=1.0)
    parser.add_argument("--timeout", type=float, default=15.0)
    return parser.parse_args(argv)


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(argv)
    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    findings = check_public_routes(
        args.origin,
        manifest,
        retries=max(0, args.retries),
        retry_delay=max(0, args.retry_delay),
        timeout=args.timeout,
    )
    if findings:
        print("[tools/check_public_routes] public route failures:", file=sys.stderr)
        for finding in findings:
            print(f"  - {finding}", file=sys.stderr)
        return 1

    print(
        f"[tools/check_public_routes] {len(expected_public_routes(manifest))} known routes and custom 404 OK"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

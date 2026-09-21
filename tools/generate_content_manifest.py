#!/usr/bin/env python3
"""Generate the public content catalogue from content-owned source metadata."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent.parent
CONTENT_ROOT = Path("src/client/src/data/content")
MANIFEST_PATH = CONTENT_ROOT / "content-manifest.json"
WRITING_NAME_RE = re.compile(r"^(?P<date>\d{4}-\d{2}-\d{2})-(?P<slug>[a-z0-9-]+)\.md$")
KIND_ORDER = {"project": 0, "writing": 1, "patch": 2}
OUTPUT_FIELDS = (
    "slug",
    "kind",
    "title",
    "date",
    "readingMinutes",
    "status",
    "featured",
    "summary",
    "homepageFeature",
    "path",
    "tags",
    "relatedSlugs",
)


def _parse_frontmatter_value(raw: str) -> Any:
    value = raw.strip()
    if not value:
        return ""
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        if (value.startswith("'") and value.endswith("'")) or (
            value.startswith('"') and value.endswith('"')
        ):
            return value[1:-1]
        return value


def _frontmatter(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    lines = text.splitlines()
    if len(lines) < 3 or lines[0].strip() != "---":
        return {}
    metadata: dict[str, Any] = {}
    for line in lines[1:]:
        if line.strip() == "---":
            return metadata
        if not line.strip() or line.lstrip().startswith("#") or ":" not in line:
            continue
        key, raw = line.split(":", 1)
        metadata[key.strip()] = _parse_frontmatter_value(raw)
    raise ValueError(f"{path}: unterminated frontmatter")


def _markdown_item(root: Path, path: Path) -> dict[str, Any]:
    content_root = root / CONTENT_ROOT
    relative = path.relative_to(content_root).as_posix()
    metadata = _frontmatter(path)
    if relative.startswith("writing/"):
        match = WRITING_NAME_RE.fullmatch(path.name)
        if match is None:
            raise ValueError(f"{relative}: writing filename must start with YYYY-MM-DD-")
        item: dict[str, Any] = {
            "slug": match.group("slug"),
            "kind": "writing",
            "title": metadata.get("title"),
            "date": match.group("date"),
            "readingMinutes": metadata.get("readingMinutes"),
            "status": metadata.get("status", "published"),
            "summary": metadata.get("summary"),
            "path": relative,
            "tags": metadata.get("tags", []),
            "relatedSlugs": metadata.get("relatedSlugs", []),
        }
        if metadata.get("featured") is True:
            item["featured"] = True
        if isinstance(metadata.get("homepageFeature"), dict):
            item["homepageFeature"] = metadata["homepageFeature"]
        return item
    if relative.startswith("fairytales/"):
        return {
            "slug": path.stem,
            "kind": "patch",
            "title": metadata.get("title"),
            "status": metadata.get("status", "published"),
            "summary": metadata.get("summary"),
            "path": relative,
            "tags": metadata.get("tags", []),
            "relatedSlugs": metadata.get("relatedSlugs", []),
        }
    raise ValueError(f"{relative}: unsupported Markdown content location")


def _colocated_items(root: Path) -> list[dict[str, Any]]:
    source_root = root / "src/client/src"
    items: list[dict[str, Any]] = []
    for path in sorted(source_root.rglob("*.content.json")):
        source = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(source, dict):
            raise ValueError(f"{path.relative_to(root)}: content metadata must be an object")
        if "presentation" in source:
            raise ValueError(
                f"{path.relative_to(root)}: rendering metadata does not belong in content metadata"
            )
        items.append(dict(source))
    return items


def _normalize(item: dict[str, Any]) -> dict[str, Any]:
    return {field: item[field] for field in OUTPUT_FIELDS if field in item}


def build_manifest(root: Path = ROOT) -> dict[str, list[dict[str, Any]]]:
    content_root = root / CONTENT_ROOT
    items = [
        *(_markdown_item(root, path) for path in sorted(content_root.rglob("*.md"))),
        *_colocated_items(root),
    ]
    normalized = [_normalize(item) for item in items]
    normalized.sort(
        key=lambda item: (
            KIND_ORDER.get(str(item.get("kind")), 99),
            str(item.get("date", "")),
            str(item.get("slug", "")),
        )
    )
    slugs = [str(item.get("slug", "")) for item in normalized]
    duplicates = sorted({slug for slug in slugs if slugs.count(slug) > 1})
    if duplicates:
        raise ValueError(f"duplicate generated content slugs: {', '.join(duplicates)}")
    return {"items": normalized}


def refresh_manifest(root: Path = ROOT, *, check: bool = False) -> None:
    output_path = root / MANIFEST_PATH
    text = json.dumps(build_manifest(root), indent=2, ensure_ascii=False) + "\n"
    if check:
        existing = output_path.read_text(encoding="utf-8")
        if existing != text:
            raise RuntimeError("content-manifest.json is stale; run tools/run.py content-manifest --apply")
        return
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(text, encoding="utf-8", newline="\n")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--apply", action="store_true")
    mode.add_argument("--check", action="store_true")
    args = parser.parse_args()
    refresh_manifest(ROOT, check=args.check and not args.apply)
    print(f"[tools/generate_content_manifest] {'checked' if args.check and not args.apply else 'wrote'} content manifest")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

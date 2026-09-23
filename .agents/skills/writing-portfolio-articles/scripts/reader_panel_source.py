"""Bounded Markdown inputs for the experimental editorial reader panel."""

from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path


MAX_ARTICLE_BYTES = 200_000
_HEADING = re.compile(r"^## (.+?)\s*$")
_TITLE = re.compile(r"^# (.+?)\s*$")
_FENCE = re.compile(r"^\s{0,3}(`{3,}|~{3,})")
_PROFILE_ID = re.compile(r"^[a-z][a-z0-9-]{0,63}$")


class SourceError(ValueError):
    """An article or reader-profile input cannot be used safely."""


@dataclass(frozen=True)
class ReaderProfile:
    id: str
    arrival_intent: str
    background: str
    desired_payoff: str
    drawn_in_by: str = ""
    put_off_by: str = ""


@dataclass(frozen=True)
class Beat:
    index: int
    heading: str
    visible_prefix: str


@dataclass(frozen=True)
class Article:
    path: Path
    title: str
    promise: str
    beats: tuple[Beat, ...]
    sha256: str


def _frontmatter_and_body(source: str) -> tuple[dict[str, str], list[str]]:
    lines = source.splitlines()
    if not lines or lines[0].strip() != "---":
        raise SourceError("Article requires YAML frontmatter")
    try:
        end = next(index for index in range(1, len(lines)) if lines[index].strip() == "---")
    except StopIteration as error:
        raise SourceError("Article frontmatter is not closed") from error
    metadata: dict[str, str] = {}
    for line in lines[1:end]:
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value.startswith(('"', "'")) and value.endswith(value[:1]):
            value = value[1:-1]
        metadata[key.strip()] = value.strip()
    return metadata, lines[end + 1 :]


def parse_article(path: Path) -> Article:
    """Parse a local Markdown draft into cumulative, future-blind beats."""
    try:
        raw = path.read_bytes()
    except OSError as error:
        raise SourceError("Article cannot be read") from error
    if not raw or len(raw) > MAX_ARTICLE_BYTES:
        raise SourceError("Article is empty or exceeds the 200 KB input limit")
    try:
        metadata, lines = _frontmatter_and_body(raw.decode("utf-8-sig"))
    except UnicodeError as error:
        raise SourceError("Article must be UTF-8") from error
    title = ""
    prose: list[str] = []
    title_fence_character = ""
    title_fence_length = 0
    for line in lines:
        if fence := _FENCE.match(line):
            marker = fence.group(1)
            if not title_fence_character:
                title_fence_character, title_fence_length = marker[0], len(marker)
            elif marker[0] == title_fence_character and len(marker) >= title_fence_length:
                title_fence_character, title_fence_length = "", 0
        if not title_fence_character and not title and (match := _TITLE.match(line)):
            title = match.group(1).strip()
            continue
        prose.append(line)
    promise = metadata.get("summary", "").strip()
    if not title or not promise or not any(line.strip() for line in prose):
        raise SourceError("Article requires a Markdown title, frontmatter summary and body")

    boundaries: list[tuple[str, int]] = [("Opening", 0)]
    fence_character = ""
    fence_length = 0
    for index, line in enumerate(prose):
        if fence := _FENCE.match(line):
            marker = fence.group(1)
            if not fence_character:
                fence_character, fence_length = marker[0], len(marker)
            elif marker[0] == fence_character and len(marker) >= fence_length:
                fence_character, fence_length = "", 0
            continue
        if not fence_character and (heading := _HEADING.match(line)):
            boundaries.append((heading.group(1).strip(), index))
    if len(boundaries) > 1 and not any(line.strip() for line in prose[: boundaries[1][1]]):
        boundaries.pop(0)
    beats = tuple(
        Beat(index, heading, "\n".join(prose[:next_start]).strip())
        for index, (heading, _) in enumerate(boundaries)
        for next_start in [boundaries[index + 1][1] if index + 1 < len(boundaries) else len(prose)]
    )
    return Article(path.resolve(), title, promise, beats, hashlib.sha256(raw).hexdigest())


def load_profiles(path: Path, selected_ids: tuple[str, ...] | None) -> tuple[ReaderProfile, ...]:
    """Load at most 100 distinct, explicitly authored reader intents."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise SourceError("Reader profiles must be readable UTF-8 JSON") from error
    if not isinstance(data, list) or not 1 <= len(data) <= 100:
        raise SourceError("Reader profiles must contain 1–100 entries")
    profiles: list[ReaderProfile] = []
    seen: set[str] = set()
    for entry in data:
        base_fields = {"id", "arrival_intent", "background", "desired_payoff"}
        optional_fields = {"drawn_in_by", "put_off_by"}
        if not isinstance(entry, dict) or set(entry) not in (base_fields, base_fields | optional_fields):
            raise SourceError("Reader profile fields are invalid")
        if not all(isinstance(value, str) and value.strip() for value in entry.values()):
            raise SourceError("Reader profile fields must be nonempty text")
        if not _PROFILE_ID.fullmatch(entry["id"]) or entry["id"] in seen:
            raise SourceError("Reader profile ID is invalid or duplicated")
        if any(len(value) > 500 for value in entry.values()):
            raise SourceError("Reader profile fields must be under 500 characters")
        seen.add(entry["id"])
        profiles.append(ReaderProfile(**entry))
    if selected_ids is None:
        return tuple(profiles)
    if not selected_ids or len(set(selected_ids)) != len(selected_ids) or set(selected_ids) - seen:
        raise SourceError("Selected reader profile IDs are empty, duplicated or unknown")
    selected = set(selected_ids)
    return tuple(profile for profile in profiles if profile.id in selected)

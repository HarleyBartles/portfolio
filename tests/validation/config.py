"""Validation policy values shared by portfolio domain checks."""
from __future__ import annotations

import re
from pathlib import Path

WILD_BUNCH_REPOSITORY_URL = "https://github.com/HarleyBartles/wild-bunch"

PATCH_REPOSITORY_URL = "https://github.com/HarleyBartles/adventures-of-patch"

PRODUCTION_ROOT = Path("src/client/src")

PRODUCTION_TEXT_SUFFIXES = {".css", ".html", ".js", ".json", ".md", ".mjs", ".scss", ".ts", ".tsx"}

PUBLIC_ASSET_SUFFIXES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}

RASTER_IMAGE_SUFFIXES = PUBLIC_ASSET_SUFFIXES - {".svg"}

MAX_IMAGE_BYTES = 400 * 1024

STATUS_BY_KIND = {
    "project": {"active project", "Course 1 complete", "incomplete", "live", "pre-alpha"},
    "writing": {"published"},
    "patch": {"published", "visual development", "advanced visual pre-production"},
}

ALL_STATUSES = set().union(*STATUS_BY_KIND.values())

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)

PHONE_RE = re.compile(r"(?:\+44[\s().-]*7|\b07)(?:[\s().-]*\d){9}\b")

PRIVATE_PATH_RE = re.compile(r"(?:\b[A-Za-z]:[\\/]|/Users/)")

SHA_RE = re.compile(r"^[0-9a-f]{40}$")

SHA256_RE = re.compile(r"^[0-9a-f]{64}$")

ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

EDITORIAL_DATELINE_RE = re.compile(r"^(Spring|Summer|Autumn|Winter) \d{4}$")

PRIVATE_EVIDENCE_RE = re.compile(r"(?:\b[A-Za-z]:[\\/]|/Users/|\bworktree\b|\bbranch\b)", re.IGNORECASE)

WILD_BUNCH_FORBIDDEN_COORDINATE_RE = re.compile(
    r"(?:\blocalhost\b|\b(?:password|passwd|pwd|secret|token|api[_-]?key)\s*[=:]|\b(?:server|host|data source|user id|uid)\s*=|\bsession[-_ ]?(?:id|[0-9a-f]{8,})\b)",
    re.IGNORECASE,
)

PATCH_PRIVATE_COORDINATE_RE = re.compile(
    r"(?:\blinear\.app\b|\bPATCH-\d+\b|\b[A-Za-z]:[\\/]|\bfile:|"
    r"\blocalhost\b|[?&](?:signature|sig|token|x-amz-signature)=[^&#\s]+|"
    r"\b(?:password|passwd|pwd|secret|token|api[_-]?key)\s*[=:]|\bconnector[_ -]?id\s*[=:])",
    re.IGNORECASE,
)

PATCH_STATUSES = {
    "published",
    "advanced-visual-preproduction",
    "visual-development",
    "legacy-reference",
    "story-seed",
    "archived-source-material",
}

PATCH_SOURCE_TYPES = {"repository-evidence", "public-artefact", "user-supplied-professional-project-context", "generated-pose"}

PATCH_SOURCE_STATES = {"accepted", "published", "advanced_visual_preproduction", "visual_development", "legacy_reference"}

DECORATIVE_EMOJI_RE = re.compile(r"[\u2600-\u27BF\U0001F1E6-\U0001FAFF]")

PUBLIC_VOICE_EMOJI_EXEMPT_PATHS: frozenset[Path] = frozenset()

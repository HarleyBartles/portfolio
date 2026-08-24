"""Objective content, privacy, and public-asset contracts for the portfolio."""

from __future__ import annotations

import json
import re
import subprocess
from dataclasses import dataclass
from datetime import date
from ipaddress import ip_address
from pathlib import Path, PurePosixPath
from typing import Any
from urllib.parse import unquote, urlparse

from PIL import Image


CONTENT_ROOT = Path("src/client/src/data/content")
MANIFEST_PATH = CONTENT_ROOT / "content-manifest.json"
PUBLIC_ROOT = Path("src/client/public")
CUSTODY_PATH = Path("docs/asset-custody.md")
MARKETPLACE_ROOT = Path(".agents/plugins/marketplace-source/codex-marketplace")
MARKETPLACE_EVIDENCE_PATH = Path("src/client/src/data/case-studies/marketplace-evidence.json")
WILD_BUNCH_EVIDENCE_PATH = Path("src/client/src/data/case-studies/wild-bunch-evidence.json")
PATCH_EVIDENCE_PATH = Path("src/client/src/data/case-studies/patch-evidence.json")
PATCH_DERIVATIVE_RECEIPT_PATH = Path("src/client/public/media/patch/patch-derivatives.json")
WILD_BUNCH_REVISION = "2a9814d094148bb789766a27d316095fecce5a60"
WILD_BUNCH_REPOSITORY_URL = "https://github.com/HarleyBartles/wild-bunch"
WILD_BUNCH_HISTORICAL_REFERENCE_URL = "https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd"
PATCH_SOURCE_REVISION = "0240a8657aae5b580c1a7a0d31e0be7a68b27f4e"
PATCH_REPOSITORY_URL = "https://github.com/HarleyBartles/adventures-of-patch"
PRODUCTION_ROOT = Path("src/client/src")
PRODUCTION_TEXT_SUFFIXES = {".css", ".html", ".js", ".json", ".md", ".mjs", ".scss", ".ts", ".tsx"}
PUBLIC_ASSET_SUFFIXES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}
RASTER_IMAGE_SUFFIXES = PUBLIC_ASSET_SUFFIXES - {".svg"}
MAX_IMAGE_BYTES = 400 * 1024

STATUS_BY_KIND = {
    "project": {"active project", "incomplete", "live", "pre-alpha"},
    "writing": {"published"},
    "fairytales": {"published"},
}
ALL_STATUSES = set().union(*STATUS_BY_KIND.values())
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
PHONE_RE = re.compile(r"(?:\+44[\s().-]*7|\b07)(?:[\s().-]*\d){9}\b")
PRIVATE_PATH_RE = re.compile(r"(?:\b[A-Za-z]:[\\/]|/Users/)")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
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
PATCH_IN_FLIGHT_STATUSES = {
    "Lawful Heist": "advanced-visual-preproduction",
    "Tournament of Reasonable Defaults": "visual-development",
    "Identity Emporium": "legacy-reference",
}
PATCH_PUBLISHED_PATHS = {
    "Club DB": "published/adventures/club_db_bouncer_queue_v6_canonical.pptx",
    "Goldilocks": "published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png",
    "The Sorcerer's Apprentice": "published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png",
    "Introducing Patch": "published/misc/introducing-patch/page__v1.png",
}
PATCH_FAIRYTALE_LESSONS = [
    "Preserve escalation signal.", "Agreement is not evidence.", "Leave purposeful recovery breadcrumbs.",
    "Build resilience before predictable pressure.", "Let temporary authority expire.",
    "Verify identity, provenance, and authority.", "Distinguish technical capability from authorisation.",
]
PATCH_ADVENTURE_QUESTIONS = [
    ("Test Goblin", "Turn failure-mode suspicion into ranked, executable test scenarios."),
    ("The Tiny Change That Wasn't", "Map consumers, tests, migrations, documentation, and operations before treating a small diff as a small blast radius."),
    ("Review Dragon", "Shape completed work into a reviewer handoff with intent, risk, evidence, gaps, and requested attention."),
    ("Hall of Mirrors", "Separate observation, inference, assumption, contradiction, and uncertainty before proposing a bounded hypothesis and next check."),
]
PATCH_CUSTODY_BY_FAMILY = {
    "hero": "Introducing Patch source base, mobile-safe crop.",
    "introducingPage": "Published Introducing Patch page derivative.",
    "goldilocks": "Published Goldilocks page derivative.",
    "sorcerersApprentice": "Published Sorcerer's Apprentice page derivative.",
    "clubDb": None,
    "heist": "Lawful Heist receipt-folder derivative.",
    "tournament": "Tournament route-check derivative.",
    "identity": "Identity Emporium world-proof derivative.",
}
CUSTODY_ASSET_PATH_RE = re.compile(r"`(src/client/(?:public|src)/[^`\r\n]+)`")
DECORATIVE_EMOJI_RE = re.compile(r"[\u2600-\u27BF\U0001F1E6-\U0001FAFF]")
# Add a path only when the emoji itself is necessary to the quoted material or medium.
PUBLIC_VOICE_EMOJI_EXEMPT_PATHS: frozenset[Path] = frozenset()


@dataclass(frozen=True)
class Finding:
    path: Path
    message: str

    def __str__(self) -> str:
        return f"{self.path.as_posix()}: {self.message}"


def _finding(path: Path, message: str) -> Finding:
    return Finding(path=path, message=message)


def _load_manifest(root: Path, findings: list[Finding]) -> list[dict[str, Any]] | None:
    manifest_path = root / MANIFEST_PATH
    try:
        raw = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        findings.append(_finding(MANIFEST_PATH, f"cannot load manifest: {exc}"))
        return None

    items = raw.get("items") if isinstance(raw, dict) else None
    if not isinstance(items, list):
        findings.append(_finding(MANIFEST_PATH, "manifest must contain an items array"))
        return None

    if not items:
        findings.append(_finding(MANIFEST_PATH, "items array must not be empty"))

    valid_items: list[dict[str, Any]] = []
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            findings.append(_finding(MANIFEST_PATH, f"item {index + 1} must be an object"))
            continue
        valid_items.append(item)
    return valid_items


def _validate_manifest(root: Path, items: list[dict[str, Any]], findings: list[Finding]) -> None:
    content_root = (root / CONTENT_ROOT).resolve()
    seen: dict[str, str] = {}
    manifest_paths: set[Path] = set()

    for index, item in enumerate(items):
        label = f"item {index + 1}"
        slug = item.get("slug")
        if not isinstance(slug, str) or SLUG_RE.fullmatch(slug) is None:
            findings.append(_finding(MANIFEST_PATH, f"{label} has invalid slug {slug!r}"))
            slug = str(slug)
        slug_key = slug.casefold()
        if slug_key in seen:
            findings.append(
                _finding(MANIFEST_PATH, f"duplicate slug '{slug}' conflicts with '{seen[slug_key]}'")
            )
        else:
            seen[slug_key] = slug

        kind = item.get("kind")
        if kind not in STATUS_BY_KIND:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsupported kind '{kind}'"))

        status = item.get("status")
        if status not in ALL_STATUSES:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsupported status '{status}'"))
        elif kind in STATUS_BY_KIND and status not in STATUS_BY_KIND[kind]:
            findings.append(
                _finding(MANIFEST_PATH, f"'{slug}' cannot use status '{status}' for kind '{kind}'")
            )

        for field in ("title", "summary"):
            value = item.get(field)
            if not isinstance(value, str) or not value.strip():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires a nonempty {field}"))

        relative_path = item.get("path")
        presentation = item.get("presentation")
        has_path = isinstance(relative_path, str)
        has_presentation = isinstance(presentation, str)
        if has_path == has_presentation:
            findings.append(_finding(MANIFEST_PATH, f"'{slug}' requires exactly one body source: Markdown path or presentation"))

        if has_presentation:
            if presentation not in {"marketplace-case-study", "patch-pipeline-case-study", "wild-bunch-case-study"}:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unknown presentation '{presentation}'"))
            elif kind != "project":
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' presentation is only supported for project content"))

        if has_path:
            if "\\" in relative_path:
                findings.append(
                    _finding(MANIFEST_PATH, f"'{slug}' Markdown path must use POSIX separators: '{relative_path}'")
                )
            else:
                pure_path = PurePosixPath(relative_path)
                if relative_path != pure_path.as_posix():
                    findings.append(
                        _finding(MANIFEST_PATH, f"'{slug}' Markdown path must be a canonical POSIX path: '{relative_path}'")
                    )
                else:
                    unsafe = pure_path.is_absolute() or ".." in pure_path.parts or pure_path.suffix != ".md"
                    resolved_path = (content_root / Path(*pure_path.parts)).resolve()
                    if unsafe or not resolved_path.is_relative_to(content_root):
                        findings.append(_finding(MANIFEST_PATH, f"'{slug}' has unsafe Markdown path '{relative_path}'"))
                    else:
                        manifest_paths.add(resolved_path)
                        if not resolved_path.is_file():
                            findings.append(_finding(Path(relative_path), "content file does not exist"))

        if kind == "writing":
            date_value = item.get("date")
            try:
                if not isinstance(date_value, str) or date.fromisoformat(date_value).isoformat() != date_value:
                    raise ValueError
            except ValueError:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' has invalid ISO date {date_value!r}"))

            reading_minutes = item.get("readingMinutes")
            if not isinstance(reading_minutes, int) or isinstance(reading_minutes, bool) or reading_minutes <= 0:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' readingMinutes must be a positive integer"))

        for field in ("tags", "relatedSlugs"):
            value = item.get(field)
            if not isinstance(value, list) or not all(isinstance(entry, str) for entry in value):
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' {field} must be a string array"))

    known_slugs = set(seen)
    for item in items:
        slug = str(item.get("slug"))
        related = item.get("relatedSlugs", [])
        if not isinstance(related, list):
            continue
        for related_slug in related:
            if not isinstance(related_slug, str):
                continue
            if related_slug.casefold() not in known_slugs:
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' references unknown related slug '{related_slug}'"))
            if related_slug.casefold() == slug.casefold():
                findings.append(_finding(MANIFEST_PATH, f"'{slug}' cannot relate to itself"))

    for markdown_path in content_root.rglob("*.md"):
        if markdown_path.name == "INDEX.md":
            continue
        if markdown_path.resolve() not in manifest_paths:
            relative = markdown_path.relative_to(root)
            findings.append(_finding(relative, "Markdown file is not listed in the manifest"))

    if any(item.get("presentation") == "marketplace-case-study" for item in items):
        _validate_marketplace_evidence(root, findings)
    if any(item.get("presentation") == "wild-bunch-case-study" for item in items):
        _validate_wild_bunch_evidence(root, findings)
    if any(item.get("presentation") == "patch-pipeline-case-study" for item in items):
        _validate_patch_evidence(root, findings)


def _read_json(path: Path, findings: list[Finding], label: str) -> Any | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        findings.append(_finding(path, f"cannot load {label}: {exc}"))
        return None


def _marketplace_inventory(root: Path, findings: list[Finding]) -> tuple[list[str], int, int] | None:
    marketplace_root = root / MARKETPLACE_ROOT
    manifest = _read_json(marketplace_root / "manifest.json", findings, "Marketplace manifest")
    plugins = manifest.get("plugins") if isinstance(manifest, dict) else None
    if not isinstance(plugins, list):
        findings.append(_finding(MARKETPLACE_ROOT / "manifest.json", "Marketplace manifest must contain a plugins array"))
        return None

    names = [entry.get("name") for entry in plugins if isinstance(entry, dict)]
    if len(names) != len(plugins) or not all(isinstance(name, str) and name for name in names):
        findings.append(_finding(MARKETPLACE_ROOT / "manifest.json", "Marketplace plugins must have names"))
        return None

    entry_count = 0
    canonical_names: set[str] = set()
    for plugin_name in names:
        bundle_path = marketplace_root / "plugins" / plugin_name / "references/bundle-manifest.json"
        bundle = _read_json(bundle_path, findings, f"Marketplace bundle for {plugin_name}")
        entries = bundle.get("entries") if isinstance(bundle, dict) else None
        if not isinstance(entries, list):
            findings.append(_finding(bundle_path.relative_to(root), "Marketplace bundle must contain an entries array"))
            continue
        canonical_entries = [entry.get("canonical_name") for entry in entries if isinstance(entry, dict)]
        if len(canonical_entries) != len(entries) or not all(isinstance(name, str) and name for name in canonical_entries):
            findings.append(_finding(bundle_path.relative_to(root), "Marketplace entries must have canonical_name values"))
            continue
        entry_count += len(canonical_entries)
        canonical_names.update(canonical_entries)
    return sorted(names), entry_count, len(canonical_names)


def _validate_marketplace_evidence(root: Path, findings: list[Finding]) -> None:
    evidence = _read_json(root / MARKETPLACE_EVIDENCE_PATH, findings, "Marketplace evidence")
    if not isinstance(evidence, dict):
        return
    inventory = _marketplace_inventory(root, findings)
    if inventory is None:
        return
    plugin_names, entry_count, unique_skill_count = inventory

    observed_at = evidence.get("observedAt")
    if not isinstance(observed_at, str) or ISO_DATE_RE.fullmatch(observed_at) is None:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "invalid observedAt; use ISO date format"))

    marketplace_root = root / MARKETPLACE_ROOT
    try:
        tree_entry = subprocess.check_output(
            ["git", "ls-tree", "HEAD", MARKETPLACE_ROOT.as_posix()], cwd=root, text=True, stderr=subprocess.DEVNULL
        ).strip()
        checked_out_revision = tree_entry.split()[2] if tree_entry.startswith("160000 commit ") else ""
        if SHA_RE.fullmatch(checked_out_revision) is None:
            raise subprocess.CalledProcessError(1, "git ls-tree")
    except (OSError, subprocess.CalledProcessError):
        try:
            checked_out_revision = subprocess.check_output(
                ["git", "rev-parse", "HEAD"], cwd=marketplace_root, text=True, stderr=subprocess.DEVNULL
            ).strip()
        except (OSError, subprocess.CalledProcessError):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "cannot resolve Marketplace revision"))
            checked_out_revision = None
    evidence_revision = evidence.get("marketplaceRevision")
    if not isinstance(evidence_revision, str) or SHA_RE.fullmatch(evidence_revision) is None:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "marketplaceRevision must be a 40-character commit"))
    elif checked_out_revision is not None and evidence_revision != checked_out_revision:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "marketplaceRevision does not match Marketplace revision"))

    evidence_inventory = evidence.get("inventory")
    expected_counts = {"pluginCount": len(plugin_names), "entryCount": entry_count, "uniqueSkillCount": unique_skill_count}
    if not isinstance(evidence_inventory, dict):
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "inventory must be an object"))
    else:
        for field, expected in expected_counts.items():
            if evidence_inventory.get(field) != expected:
                label = {"pluginCount": "plugin count", "entryCount": "entry count", "uniqueSkillCount": "unique skill count"}[field]
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"inventory {label} does not match Marketplace {label}"))

    evidence_plugins = evidence.get("plugins")
    if not isinstance(evidence_plugins, list) or sorted(evidence_plugins) != plugin_names:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "plugin names do not match Marketplace inventory"))

    consumers = evidence.get("consumers")
    if not isinstance(consumers, list) or not consumers:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "consumers must be a nonempty array"))
        return
    consumer_names: set[str] = set()
    for index, consumer in enumerate(consumers, start=1):
        label = f"consumer {index}"
        if not isinstance(consumer, dict):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} must be an object"))
            continue
        name = consumer.get("name")
        if not isinstance(name, str) or not name:
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} requires a name"))
        elif name.casefold() in consumer_names:
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"duplicate consumer name '{name}'"))
        else:
            consumer_names.add(name.casefold())
        url = consumer.get("url")
        if not isinstance(url, str) or not url.startswith("https://"):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} URL must use HTTPS"))
        commit = consumer.get("commit")
        if not isinstance(commit, str) or SHA_RE.fullmatch(commit) is None:
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} commit must be a 40-character commit"))
        consumer_revision = consumer.get("marketplaceRevision")
        if consumer_revision is not None and (not isinstance(consumer_revision, str) or SHA_RE.fullmatch(consumer_revision) is None):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} marketplaceRevision must be a 40-character commit"))
        for field in ("plugins", "localPlugins"):
            value = consumer.get(field)
            if not isinstance(value, list) or not all(isinstance(entry, str) and entry for entry in value):
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} {field} must be a string array"))
            elif len(value) != len(set(value)):
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} {field} must not contain duplicates"))
        local_skills = consumer.get("localSkills")
        local_skill_count = consumer.get("localSkillCount")
        has_local_skills = isinstance(local_skills, list) and all(isinstance(entry, str) and entry for entry in local_skills)
        has_local_skill_count = isinstance(local_skill_count, int) and not isinstance(local_skill_count, bool) and local_skill_count >= 0
        if has_local_skills == has_local_skill_count:
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} requires exactly one local skill boundary"))
        elif has_local_skills and len(local_skills) != len(set(local_skills)):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} localSkills must not contain duplicates"))
        installed_skill_count = consumer.get("installedSkillCount")
        if not isinstance(installed_skill_count, int) or isinstance(installed_skill_count, bool) or installed_skill_count <= 0:
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} installedSkillCount must be a positive integer"))
        used_plugins = consumer.get("plugins")
        if isinstance(used_plugins, list):
            for plugin_name in used_plugins:
                if isinstance(plugin_name, str) and plugin_name not in plugin_names:
                    findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} references unknown Marketplace plugin '{plugin_name}'"))
        for value in consumer.values():
            if isinstance(value, str) and PRIVATE_EVIDENCE_RE.search(value):
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} contains a private local coordinate"))


def _wild_bunch_strings(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, dict):
        return [text for nested in value.values() for text in _wild_bunch_strings(nested)]
    if isinstance(value, list):
        return [text for nested in value for text in _wild_bunch_strings(nested)]
    return []


def _is_forbidden_wild_bunch_url(value: str) -> bool:
    try:
        parsed = urlparse(value)
        hostname = parsed.hostname
    except ValueError:
        return True

    if not parsed.scheme:
        return False
    if parsed.scheme != "https" or parsed.username is not None or parsed.password is not None:
        return True
    if hostname is None:
        return True
    hostname = hostname.casefold()
    if hostname == "localhost" or hostname.endswith(".localhost"):
        return True
    try:
        return ip_address(hostname).is_loopback
    except ValueError:
        return False


def _is_canonical_wild_bunch_evidence_link(value: Any) -> bool:
    if not isinstance(value, str) or _is_forbidden_wild_bunch_url(value):
        return False
    parsed = urlparse(value)
    prefix = f"/HarleyBartles/wild-bunch/blob/{WILD_BUNCH_REVISION}/"
    if parsed.netloc != "github.com" or not parsed.path.startswith(prefix) or parsed.query or parsed.fragment:
        return False
    relative_path = parsed.path.removeprefix(prefix)
    decoded_path = unquote(relative_path)
    if decoded_path != relative_path or "%" in decoded_path:
        return False
    pure_path = PurePosixPath(relative_path)
    return (
        bool(relative_path)
        and relative_path != "."
        and relative_path == pure_path.as_posix()
        and not pure_path.is_absolute()
        and "." not in pure_path.parts
        and ".." not in pure_path.parts
    )


def _validate_wild_bunch_evidence(root: Path, findings: list[Finding]) -> None:
    evidence = _read_json(root / WILD_BUNCH_EVIDENCE_PATH, findings, "Wild Bunch evidence")
    if not isinstance(evidence, dict):
        return

    observed_at = evidence.get("observedAt")
    try:
        is_canonical_date = isinstance(observed_at, str) and date.fromisoformat(observed_at).isoformat() == observed_at
    except ValueError:
        is_canonical_date = False
    if not is_canonical_date:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "invalid observedAt; use ISO date format"))
    elif observed_at != "2026-08-21":
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "observedAt must be '2026-08-21'"))

    revision = evidence.get("revision")
    if not isinstance(revision, str) or SHA_RE.fullmatch(revision) is None:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "revision must be a 40-character commit"))
    elif revision != WILD_BUNCH_REVISION:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "revision must match the approved evidence revision"))

    for field, expected in (
        ("repositoryUrl", WILD_BUNCH_REPOSITORY_URL),
        ("historicalReferenceUrl", WILD_BUNCH_HISTORICAL_REFERENCE_URL),
    ):
        value = evidence.get(field)
        if not isinstance(value, str) or not value.startswith("https://"):
            findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"{field} must use HTTPS"))
        elif value != expected:
            findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"{field} must match the approved public URL"))

    if evidence.get("status") != "pre-alpha":
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "status must be 'pre-alpha'"))

    recipe = evidence.get("captureRecipe")
    expected_recipe = {
        "playerName": "Ranger Vale",
        "worldSeed": "00000000-0000-0000-0000-000000000000",
        "difficulty": "Standard",
        "entropy": "Boring",
        "startingTown": "Dustwell",
    }
    if not isinstance(recipe, dict):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "captureRecipe must be an object"))
    else:
        for field, expected in expected_recipe.items():
            if recipe.get(field) != expected:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"captureRecipe {field} must be '{expected}'"))

    capabilities = evidence.get("capabilities")
    if not isinstance(capabilities, dict):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "capabilities must be an object"))
    else:
        for category in ("implemented", "transitional", "planned"):
            entries = capabilities.get(category)
            if not isinstance(entries, list) or not entries or not all(isinstance(entry, str) and entry.strip() for entry in entries):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"capabilities {category} must be a nonempty string array"))

    representative_evidence = evidence.get("representativeEvidence")
    if not isinstance(representative_evidence, list) or not representative_evidence:
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "representativeEvidence must be a nonempty array"))
    else:
        pinned_prefix = f"{WILD_BUNCH_REPOSITORY_URL}/blob/{WILD_BUNCH_REVISION}/"
        for index, entry in enumerate(representative_evidence, start=1):
            if not isinstance(entry, dict):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} must be an object"))
                continue
            if not isinstance(entry.get("claim"), str) or not entry["claim"].strip():
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} requires a claim"))
            for field in ("sourceUrl", "testUrl"):
                value = entry.get(field)
                if not isinstance(value, str) or not value.startswith(pinned_prefix):
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} {field} must use the pinned revision"))
                elif not _is_canonical_wild_bunch_evidence_link(value):
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"representative evidence {index} {field} must use a canonical pinned repository path"))

    images = evidence.get("images")
    if not isinstance(images, list):
        findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "images must be an array"))
    else:
        custody = (root / CUSTODY_PATH).read_text(encoding="utf-8") if (root / CUSTODY_PATH).is_file() else ""
        for index, image in enumerate(images, start=1):
            if not isinstance(image, dict):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must be an object"))
                continue
            path = image.get("path")
            if not isinstance(path, str) or not path.startswith("src/client/public/media/wild-bunch/"):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} path must be a public custody path"))
            elif f"`{path}`" not in custody:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} path is missing from docs/asset-custody.md"))
            width, height = image.get("width"), image.get("height")
            if (
                not isinstance(width, int)
                or isinstance(width, bool)
                or width <= 0
                or not isinstance(height, int)
                or isinstance(height, bool)
                or height <= 0
            ):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} requires a positive width and height"))
            capture = image.get("capture")
            if capture not in {"dustwell-town", "trail-map", "session-audit", "wanted-notice", "case-file"}:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must name a screened capture"))
            if image.get("format") not in {"avif", "webp"}:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must use AVIF or WebP"))
            if not isinstance(image.get("sourceFile"), str) or not image["sourceFile"].endswith("-1440.png"):
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain its raw source filename"))
            source_hash = image.get("sourceSha256")
            if not isinstance(source_hash, str) or SHA256_RE.fullmatch(source_hash) is None:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain a SHA-256 source hash"))
            if image.get("sourceWidth") != 1440 or image.get("sourceHeight") != 1100:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} must retain 1440 by 1100 raw dimensions"))
            bytes_count = image.get("bytes")
            if not isinstance(bytes_count, int) or isinstance(bytes_count, bool) or bytes_count <= 0:
                findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} requires a positive byte count"))
            for field, required_text in (("altIntent", "current development build"), ("caption", "working skeleton")):
                value = image.get(field)
                if not isinstance(value, str) or required_text not in value.lower():
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} {field} must preserve development-skeleton framing"))
            if isinstance(path, str) and path.startswith("src/client/public/media/wild-bunch/"):
                asset_path = root / path
                if not asset_path.is_file():
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} derivative is missing from the public tree"))
                elif isinstance(bytes_count, int) and not isinstance(bytes_count, bool) and asset_path.stat().st_size != bytes_count:
                    findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, f"image {index} byte count does not match the committed derivative"))

    for text in _wild_bunch_strings(evidence):
        if (
            PRIVATE_EVIDENCE_RE.search(text)
            or WILD_BUNCH_FORBIDDEN_COORDINATE_RE.search(text)
            or _is_forbidden_wild_bunch_url(text)
        ):
            findings.append(_finding(WILD_BUNCH_EVIDENCE_PATH, "contains a private local coordinate or secret"))
            break


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
    elif observed_at != "2026-08-24":
        findings.append(_finding(PATCH_EVIDENCE_PATH, "observedAt must be '2026-08-24'"))

    revision = evidence.get("sourceRevision")
    if not isinstance(revision, str) or SHA_RE.fullmatch(revision) is None:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "sourceRevision must be a 40-character commit"))
    elif revision != PATCH_SOURCE_REVISION:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "sourceRevision must match the approved evidence revision"))

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
    published = evidence.get("published")
    if not isinstance(published, list) or [record.get("title") if isinstance(record, dict) else None for record in published] != [
        "Club DB", "Goldilocks", "The Sorcerer's Apprentice", "Introducing Patch",
    ]:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "published must contain the four approved artefacts in order"))
    elif any(
        record.get("publicArtefactUrl") != f"{PATCH_REPOSITORY_URL}/blob/{PATCH_SOURCE_REVISION}/{PATCH_PUBLISHED_PATHS[record['title']]}"
        for record in published
    ):
        findings.append(_finding(PATCH_EVIDENCE_PATH, "published must match the four approved title and path pairs"))
    in_flight = evidence.get("inFlight")
    if not isinstance(in_flight, list) or [record.get("title") if isinstance(record, dict) else None for record in in_flight] != [
        "Lawful Heist", "Tournament of Reasonable Defaults", "Identity Emporium",
    ]:
        findings.append(_finding(PATCH_EVIDENCE_PATH, "inFlight must contain the three approved worlds in order"))
    else:
        for record in in_flight:
            title = record["title"]
            if record.get("status") != PATCH_IN_FLIGHT_STATUSES[title]:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"{title} must use status '{PATCH_IN_FLIGHT_STATUSES[title]}'"))

    story_lab = evidence.get("storyLab")
    if not isinstance(story_lab, dict):
        findings.append(_finding(PATCH_EVIDENCE_PATH, "storyLab must be an object"))
    else:
        lessons = story_lab.get("fairytaleLessons")
        questions = story_lab.get("adventureQuestions")
        if lessons != PATCH_FAIRYTALE_LESSONS:
            findings.append(_finding(PATCH_EVIDENCE_PATH, "storyLab fairytaleLessons must match the seven approved lessons"))
        if not isinstance(questions, list) or [
            (entry.get("title"), entry.get("lesson")) if isinstance(entry, dict) else None for entry in questions
        ] != PATCH_ADVENTURE_QUESTIONS:
            findings.append(_finding(PATCH_EVIDENCE_PATH, "storyLab adventureQuestions must match the four approved title and lesson pairs"))
        for collection in (lessons if isinstance(lessons, list) else [], questions if isinstance(questions, list) else []):
            for entry in collection:
                if isinstance(entry, dict) and any(field in entry for field in ("date", "progress", "link", "url")):
                    findings.append(_finding(PATCH_EVIDENCE_PATH, "future-work item must not contain date, progress, or link"))

    receipt = _read_json(root / PATCH_DERIVATIVE_RECEIPT_PATH, findings, "Patch derivative receipt")
    receipt_images = receipt.get("images") if isinstance(receipt, dict) else None
    receipt_by_path = {
        entry.get("path"): entry for entry in receipt_images
        if isinstance(entry, dict) and isinstance(entry.get("path"), str)
    } if isinstance(receipt_images, list) else {}
    media = evidence.get("media")
    custody = (root / CUSTODY_PATH).read_text(encoding="utf-8") if (root / CUSTODY_PATH).is_file() else ""
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
            elif f"`{path}`" not in custody:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} path is missing from docs/asset-custody.md"))
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
            if not isinstance(source_revision, str) or SHA_RE.fullmatch(source_revision) is None or source_revision != PATCH_SOURCE_REVISION:
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} must retain the approved source revision"))
            if source_type == "generated-pose" and item.get("sourceStatus") != "accepted":
                findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} generated pose requires accepted sourceStatus"))
            if isinstance(receipt_item, dict):
                for field in ("width", "height", "bytes", "sourceRevision", "sourceStatus"):
                    if item.get(field) != receipt_item.get(field):
                        findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} {field} does not match derivative receipt"))
                expected_custody = PATCH_CUSTODY_BY_FAMILY.get(receipt_item.get("family"))
                if receipt_item.get("family") == "clubDb":
                    expected_custody = f"Club DB origin slide {receipt_item.get('slide')} derivative."
                if item.get("custody") != expected_custody:
                    findings.append(_finding(PATCH_EVIDENCE_PATH, f"media record {index} custody must match derivative sourcePath family"))
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


def _production_text_files(root: Path) -> list[Path]:
    files = [root / "src/client/index.html"]
    source_root = root / PRODUCTION_ROOT
    files.extend(
        path
        for path in source_root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in PRODUCTION_TEXT_SUFFIXES
        and ".test." not in path.name
    )
    return files


def _validate_privacy(root: Path, findings: list[Finding]) -> None:
    for path in _production_text_files(root):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(root)
        if "mailto:" in text.lower():
            findings.append(_finding(relative, "production source contains a mailto: contact literal"))
        if "tel:" in text.lower():
            findings.append(_finding(relative, "production source contains a tel: contact literal"))
        if EMAIL_RE.search(text):
            findings.append(_finding(relative, "production source contains an email address literal"))
        if PHONE_RE.search(text):
            findings.append(_finding(relative, "production source contains a phone number literal"))
        if PRIVATE_PATH_RE.search(text):
            findings.append(_finding(relative, "production source contains a private filesystem path"))


def _validate_public_voice(root: Path, findings: list[Finding]) -> None:
    for path in _production_text_files(root):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(root)
        if "—" in text:
            findings.append(_finding(relative, "Harley-authored public source contains an em dash"))
        if relative not in PUBLIC_VOICE_EMOJI_EXEMPT_PATHS and DECORATIVE_EMOJI_RE.search(text):
            findings.append(_finding(relative, "Harley-authored public source contains decorative emoji"))


def _validate_assets(root: Path, findings: list[Finding]) -> None:
    custody_path = root / CUSTODY_PATH
    custody = custody_path.read_text(encoding="utf-8") if custody_path.is_file() else ""
    custody_paths = {
        path
        for path in CUSTODY_ASSET_PATH_RE.findall(custody)
        if Path(path).suffix.lower() in PUBLIC_ASSET_SUFFIXES
    }
    asset_paths: set[str] = set()

    for asset_root in (root / PUBLIC_ROOT, root / PRODUCTION_ROOT):
        for path in asset_root.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in PUBLIC_ASSET_SUFFIXES:
                continue
            relative = path.relative_to(root)
            relative_text = relative.as_posix()
            asset_paths.add(relative_text)
            if relative_text not in custody_paths:
                findings.append(_finding(relative, "asset is missing from docs/asset-custody.md"))
            if path.suffix.lower() in RASTER_IMAGE_SUFFIXES and path.stat().st_size > MAX_IMAGE_BYTES:
                findings.append(
                    _finding(relative, f"image is {path.stat().st_size} bytes and exceeds {MAX_IMAGE_BYTES} bytes")
                )

    for stale_path in sorted(custody_paths - asset_paths):
        findings.append(_finding(Path(stale_path), "custody record points to a missing asset"))


def validate_portfolio(root: Path) -> list[Finding]:
    """Return every objective portfolio-quality finding under ``root``."""

    findings: list[Finding] = []
    items = _load_manifest(root, findings)
    if items is not None:
        _validate_manifest(root, items, findings)
    _validate_privacy(root, findings)
    _validate_public_voice(root, findings)
    _validate_assets(root, findings)
    return findings

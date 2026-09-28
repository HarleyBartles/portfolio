"""Marketplace validation rules."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .common import Finding, MARKETPLACE_EVIDENCE_PATH, _finding, _read_json
from .config import ISO_DATE_RE, PRIVATE_EVIDENCE_RE, SHA_RE

def _validate_marketplace_evidence(root: Path, findings: list[Finding], warnings: list[Finding]) -> None:
    evidence = _read_json(root / MARKETPLACE_EVIDENCE_PATH, findings, "Marketplace evidence")
    if not isinstance(evidence, dict):
        return

    observed_at = evidence.get("observedAt")
    if not isinstance(observed_at, str) or ISO_DATE_RE.fullmatch(observed_at) is None:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "invalid observedAt; use ISO date format"))

    evidence_revision = evidence.get("marketplaceRevision")
    if not isinstance(evidence_revision, str) or SHA_RE.fullmatch(evidence_revision) is None:
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "marketplaceRevision must be a 40-character commit"))

    evidence_inventory = evidence.get("inventory")
    if not isinstance(evidence_inventory, dict):
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "inventory must be an object"))
    else:
        for field in ("pluginCount", "entryCount", "uniqueSkillCount"):
            value = evidence_inventory.get(field)
            if not isinstance(value, int) or isinstance(value, bool) or value < 0:
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"inventory {field} must be a non-negative integer"))
        entry_count = evidence_inventory.get("entryCount")
        unique_skill_count = evidence_inventory.get("uniqueSkillCount")
        if (
            isinstance(entry_count, int)
            and not isinstance(entry_count, bool)
            and isinstance(unique_skill_count, int)
            and not isinstance(unique_skill_count, bool)
            and unique_skill_count > entry_count
        ):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "inventory uniqueSkillCount cannot exceed entryCount"))

    evidence_plugins = evidence.get("plugins")
    if not isinstance(evidence_plugins, list) or not all(isinstance(name, str) and name for name in evidence_plugins):
        findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "plugins must be a string array"))
        snapshot_plugins: set[str] = set()
    else:
        snapshot_plugins = set(evidence_plugins)
        if len(snapshot_plugins) != len(evidence_plugins):
            findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "plugins must not contain duplicates"))
        if isinstance(evidence_inventory, dict):
            plugin_count = evidence_inventory.get("pluginCount")
            if isinstance(plugin_count, int) and not isinstance(plugin_count, bool) and plugin_count != len(evidence_plugins):
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, "inventory pluginCount must match the snapshot plugin list"))

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
                if isinstance(plugin_name, str) and plugin_name not in snapshot_plugins:
                    findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} references plugin '{plugin_name}' absent from this evidence snapshot"))
        for value in consumer.values():
            if isinstance(value, str) and PRIVATE_EVIDENCE_RE.search(value):
                findings.append(_finding(MARKETPLACE_EVIDENCE_PATH, f"{label} contains a private local coordinate"))

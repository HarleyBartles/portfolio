"""Learning Lab validation rules."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Any

from .common import Finding, LEARNING_LAB_EVIDENCE_PATH, _finding, _is_https_url, _read_json
from .config import SHA_RE

def _validate_learning_lab_evidence(root: Path, findings: list[Finding], today: date) -> None:
    evidence = _read_json(root / LEARNING_LAB_EVIDENCE_PATH, findings, "Learning Lab evidence")
    if not isinstance(evidence, dict):
        if evidence is not None:
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "Learning Lab evidence must be an object"))
        return

    observed_at = evidence.get("observedAt")
    try:
        if not isinstance(observed_at, str) or date.fromisoformat(observed_at).isoformat() != observed_at:
            raise ValueError
    except ValueError:
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "observedAt must be an ISO date"))

    source_revision = evidence.get("sourceRevision")
    if not isinstance(source_revision, str) or SHA_RE.fullmatch(source_revision) is None:
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "sourceRevision must be a 40-character commit"))
    for field in ("repositoryUrl", "sourceChangeUrl", "integrityRunUrl"):
        if not _is_https_url(evidence.get(field)):
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"{field} must use a public HTTPS URL"))

    courses = evidence.get("courses")
    seen_module_ids: set[tuple[str, str]] = set()
    mature_count = 0
    if not isinstance(courses, list) or not courses:
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "courses must be a nonempty array"))
    else:
        course_ids: set[str] = set()

        for course in courses:
            if not isinstance(course, dict):
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "each course must be an object"))
                continue
            course_id = course.get("id")
            if not isinstance(course_id, str) or not course_id.strip():
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "each course requires an id"))
            elif course_id in course_ids:
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"duplicate course id '{course_id}'"))
            else:
                course_ids.add(course_id)
            if not isinstance(course.get("stage"), str) or not course["stage"].strip():
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"{course_id} requires a nonempty stage"))
            for field in ("title", "outcome"):
                if not isinstance(course.get(field), str) or not course[field].strip():
                    findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"{course_id} requires a nonempty {field}"))
            modules = course.get("modules")
            if not isinstance(modules, list):
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"{course_id} modules must be an array"))
                continue
            for module in modules:
                if not isinstance(module, dict):
                    findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"{course_id} modules must be objects"))
                    continue
                module_id = module.get("id")
                if isinstance(module_id, str):
                    scoped_module_id = (str(course_id), module_id)
                    if scoped_module_id in seen_module_ids:
                        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "module identifiers must be unique within each course"))
                    seen_module_ids.add(scoped_module_id)
                if not isinstance(module.get("title"), str) or not module["title"].strip():
                    findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"module {module_id} requires a nonempty title"))
                if not isinstance(module.get("summary"), str) or not module["summary"].strip():
                    findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, f"module {module_id} requires a nonempty editorial summary"))
                state = module.get("state")
                if state not in {"mature-lab", "roadmap-module"}:
                    findings.append(_finding(
                        LEARNING_LAB_EVIDENCE_PATH,
                        f"module {module_id} state must be mature-lab or roadmap-module",
                    ))
                if state == "mature-lab":
                    mature_count += 1

    declared_mature_count = evidence.get("matureLabCount")
    if declared_mature_count != mature_count:
        findings.append(_finding(
            LEARNING_LAB_EVIDENCE_PATH,
            f"matureLabCount must match the {mature_count} mature-lab modules",
        ))

    delivery = evidence.get("delivery")
    if not isinstance(delivery, dict):
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "delivery must be an object"))
    else:
        delivery_status = delivery.get("status")
        if delivery_status == "planned":
            target = delivery.get("target")
            try:
                if not isinstance(target, str) or date.fromisoformat(f"{target}-01").strftime("%Y-%m") != target:
                    raise ValueError
            except ValueError:
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "planned delivery target must be YYYY-MM"))
            else:
                if target < today.strftime("%Y-%m"):
                    findings.append(_finding(
                        LEARNING_LAB_EVIDENCE_PATH,
                        f"delivery planned state is stale after {target}",
                    ))
            if not isinstance(delivery.get("display"), str) or not delivery["display"].strip():
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "planned delivery requires display text"))
            if "startedOn" in delivery:
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "planned delivery must not include startedOn"))
        elif delivery_status == "started":
            started_on = delivery.get("startedOn")
            try:
                if not isinstance(started_on, str):
                    raise TypeError
                parsed_started_on = date.fromisoformat(started_on)
                if parsed_started_on.isoformat() != started_on:
                    raise ValueError
            except TypeError:
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "started delivery requires startedOn"))
            except ValueError:
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "startedOn must be an ISO date"))
            else:
                if parsed_started_on > today:
                    findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "startedOn must not be in the future"))
            if not isinstance(delivery.get("display"), str) or not delivery["display"].strip():
                findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "started delivery requires display text"))
        else:
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "delivery status must be planned or started"))

    licensing = evidence.get("licensing")
    if not isinstance(licensing, dict):
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "licensing must be an object"))
    elif licensing.get("freelyLicensed") is not True:
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "licensing freelyLicensed must be true"))
    else:
        curriculum = licensing.get("curriculum")
        tooling = licensing.get("tooling")
        if licensing.get("policyPath") != "LICENSE.md":
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "freelyLicensed requires policyPath LICENSE.md"))
        if not isinstance(curriculum, dict) or curriculum.get("spdx") != "CC-BY-4.0":
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "freelyLicensed requires curriculum SPDX CC-BY-4.0"))
        if not isinstance(tooling, dict) or tooling.get("spdx") != "MIT":
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "freelyLicensed requires tooling SPDX MIT"))
        if (
            not isinstance(curriculum, dict)
            or curriculum.get("path") != "LICENSES/CC-BY-4.0.txt"
            or not isinstance(tooling, dict)
            or tooling.get("path") != "LICENSES/MIT.txt"
        ):
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "freelyLicensed requires both licence text paths"))
        if (
            not isinstance(curriculum, dict)
            or not _is_https_url(curriculum.get("url"))
            or not isinstance(tooling, dict)
            or not _is_https_url(tooling.get("url"))
        ):
            findings.append(_finding(
                LEARNING_LAB_EVIDENCE_PATH,
                "freelyLicensed requires HTTPS curriculum and tooling licence links",
            ))

    proof = evidence.get("proof")
    if not isinstance(proof, dict):
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "proof must be an object"))
    else:
        if not proof or any(
            not isinstance(path, str)
            or not path.strip()
            or "\\" in path
            or ".." in Path(path).parts
            or Path(path).is_absolute()
            for path in proof.values()
        ):
            findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "proof must contain safe relative evidence paths"))

    if "tested with real learners" in json.dumps(evidence).casefold():
        findings.append(_finding(LEARNING_LAB_EVIDENCE_PATH, "must not claim tested with real learners"))

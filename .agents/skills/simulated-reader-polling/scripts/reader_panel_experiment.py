"""Execute agent-authored reading pieces with explicit aside exposure."""

from __future__ import annotations

import hashlib
import asyncio
import inspect
import json
import math
import os
import re
import tempfile
import time
from pathlib import Path
from typing import Callable

from reader_panel_decisions import Decision, DecisionError, experiment_prompt_fingerprint
from reader_panel_source import ReaderProfile, SourceError


_ID = re.compile(r"^[a-z][a-z0-9-]{0,63}$")
CONDITIONS = {"omit", "closed", "force_open", "reader_choice"}
POST_ARTICLE_CONDITIONS = {"omit", "post_article_choice"}
ATTENTION = ("read_closely", "skim", "leave_lost_interest", "stop_satisfied")
SCAN_ATTENTION = ("read_closely", "skim")
ASIDE_CHOICE = ("open_now", "return_later", "skip")
RETURN_CHOICE = ("open", "skip")
POST_READ_EFFECT = ("increased", "maintained", "decreased")
MAX_EXPERIMENT_BYTES = 200_000
MAX_VISIBLE_BYTES = 80_000
PRICE_PER_MILLION_INPUT_TOKENS = 0.042
CURRENT_MANIFEST_VERSION = "0.0.5"


def validate_experiment(data: dict) -> dict:
    if not isinstance(data, dict) or data.get("version") != CURRENT_MANIFEST_VERSION:
        raise SourceError(f"Only manifest version {CURRENT_MANIFEST_VERSION} is supported")
    flow = data.get("reader_flow")
    required = {"version", "reader_flow", "title", "promise", "sources", "route", "conditions"}
    if flow == "scan_entry":
        required.add("scan_surface")
    elif flow != "article_route":
        raise SourceError("Manifest reader_flow must be article_route or scan_entry")
    if set(data) != required:
        raise SourceError("Current experiment manifest fields are invalid")
    if not all(isinstance(data[key], str) and data[key].strip() for key in ("title", "promise")):
        raise SourceError("Experiment title and promise must be nonempty")
    if not isinstance(data["sources"], list) or not isinstance(data["route"], list) or not data["route"]:
        raise SourceError("Experiment requires source records and an ordered route")
    seen: set[str] = set()
    route = [_validate_route_piece(piece, seen) for piece in data["route"]]
    if route[0]["kind"] != "beat" or route[-1]["kind"] != "beat":
        raise SourceError("Experiment route must open and end with an ordinary beat")
    if flow == "article_route":
        _validate_article_conditions(data["conditions"])
    else:
        _validate_scan_surface(data)
    return data


def _validate_route_piece(piece: object, seen: set[str]) -> dict:
    if not isinstance(piece, dict) or piece.get("kind") not in {"beat", "optional_read"}:
        raise SourceError("Experiment route piece kind is invalid")
    kind = piece["kind"]
    required = {"id", "kind", "text"} if kind == "beat" else {
        "id", "kind", "title", "standfirst", "reading_time", "body",
    }
    optional_fields = {"preview", "eyebrow", "disclosure_label"} if kind == "optional_read" else set()
    if (not required <= set(piece) or set(piece) - required - optional_fields or
            not isinstance(piece.get("id"), str) or not _ID.fullmatch(piece["id"])):
        raise SourceError("Experiment route piece fields or ID are invalid")
    if piece["id"] in seen or any(not isinstance(piece[key], str) or not piece[key].strip()
                                   for key in required - {"id", "kind"}):
        raise SourceError("Experiment route text is empty or IDs are duplicated")
    if any(field in piece and not isinstance(piece[field], str) for field in optional_fields):
        raise SourceError("Optional-read eyebrow and preview must be text")
    seen.add(piece["id"])
    return piece


def _validate_article_conditions(conditions: object) -> None:
    if not isinstance(conditions, list) or not conditions:
        raise SourceError("Article-route conditions are invalid")
    ids: set[str] = set()
    policies = {"core_only": "omit", "asides_in_flow": "inline",
                "optional_with_defer": "read_now_or_defer"}
    for condition in conditions:
        if (not isinstance(condition, dict) or set(condition) != {"id", "optional_reads"} or
                condition.get("id") not in policies or condition.get("id") in ids or
                condition.get("optional_reads") != policies[condition.get("id")]):
            raise SourceError("Article-route condition ID and optional-read policy are invalid")
        ids.add(condition["id"])


def _validate_scan_surface(data: dict) -> None:
    """Validate an authored scan surface and the route targets it can open."""
    route = data["route"]
    if not isinstance(data.get("scan_surface"), list) or not data["scan_surface"]:
        raise SourceError("Scan experiment requires an authored scan surface")
    conditions = data["conditions"]
    if not isinstance(conditions, list) or not conditions:
        raise SourceError("Scanner conditions are invalid")
    by_id = {piece["id"]: piece for piece in route}
    entry_ids: set[str] = set()
    heading_targets: list[str] = []
    surfaced_targets: set[str] = set()
    for entry in data["scan_surface"]:
        if not isinstance(entry, dict):
            raise SourceError("Scan surface entries must be objects")
        kind = entry.get("kind")
        expected = {"id", "kind", "target", "text"} if kind in {"heading", "pull_quote"} else {
            "id", "kind", "target", "title", "standfirst"
        } if kind == "aside" else set()
        if (not expected or set(entry) != expected or
                not isinstance(entry.get("id"), str) or not _ID.fullmatch(entry["id"]) or
                entry["id"] in entry_ids or not isinstance(entry.get("target"), str) or
                entry["target"] not in by_id):
            raise SourceError("Scan surface entry fields, ID or target are invalid")
        if kind in {"heading", "pull_quote"}:
            if by_id[entry["target"]]["kind"] != "beat" or not isinstance(entry["text"], str) or not entry["text"].strip():
                raise SourceError("Headings and pull quotes must target a beat and contain text")
            if kind == "heading":
                heading_targets.append(entry["target"])
        else:
            target = by_id[entry["target"]]
            if (target["kind"] != "optional_read" or
                    not all(isinstance(entry[key], str) and entry[key].strip()
                            for key in ("title", "standfirst")) or
                    entry["title"] != target["title"] or entry["standfirst"] != target["standfirst"]):
                raise SourceError("Aside entries must show their target's exact title and standfirst")
        entry_ids.add(entry["id"])
        surfaced_targets.add(entry["target"])
    beat_ids = {piece["id"] for piece in route if piece["kind"] == "beat"}
    optional_ids = {piece["id"] for piece in route if piece["kind"] == "optional_read"}
    if set(heading_targets) != beat_ids or len(heading_targets) != len(beat_ids):
        raise SourceError("Every article beat must have exactly one heading entry on the scan surface")
    if surfaced_targets != beat_ids | optional_ids:
        raise SourceError("Every beat and optional read must appear on the scan surface")
    conditions = data["conditions"]
    if not isinstance(conditions, list) or not conditions:
        raise SourceError("Scanner conditions are invalid")
    condition_ids: set[str] = set()
    condition_ids: set[str] = set()
    for condition in conditions:
        if (not isinstance(condition, dict) or
                set(condition) != {"id", "scan_features", "optional_reads"} or
                not isinstance(condition.get("id"), str) or not _ID.fullmatch(condition["id"]) or
                condition["id"] in condition_ids or not isinstance(condition["scan_features"], list) or
                any(not isinstance(feature, str) for feature in condition["scan_features"]) or
                len(set(condition["scan_features"])) != len(condition["scan_features"]) or
                set(condition["scan_features"]) - {"heading", "pull_quote", "aside"} or
                "heading" not in condition["scan_features"] or
                condition.get("optional_reads") not in {"omit", "inline", "read_now_or_defer"}):
            raise SourceError("Scanner conditions require a unique ID, heading feature and optional-read policy")
        if condition["id"] in condition_ids:
            raise SourceError("Scanner condition IDs must be unique")
        condition_ids.add(condition["id"])
def compile_experiment(data: dict) -> dict:
    """Normalize the single supported manifest contract for execution."""
    validate_experiment(data)
    route = [({**piece, "preview": piece.get("preview", ""),
               "eyebrow": piece.get("eyebrow", ""),
               "disclosure_label": piece.get("disclosure_label", "")}
              if piece["kind"] == "optional_read" else piece) for piece in data["route"]]
    canonical = {"version": CURRENT_MANIFEST_VERSION, "reader_flow": data["reader_flow"],
                 "title": data["title"], "promise": data["promise"],
                 "sources": data["sources"], "route": route,
                 "conditions": data["conditions"]}
    if data["reader_flow"] == "scan_entry":
        canonical["scan_surface"] = data["scan_surface"]
    return canonical


def load_experiment(path: Path) -> dict:
    try:
        raw = path.read_bytes()
        if not raw or len(raw) > MAX_EXPERIMENT_BYTES:
            raise SourceError("Experiment manifest is empty or too large")
        data = validate_experiment(json.loads(raw.decode("utf-8-sig")))
        if not data["sources"]:
            raise SourceError("Experiment requires at least one source hash")
        sources = []
        for item in data["sources"]:
            if not isinstance(item, dict) or set(item) != {"path", "sha256"}:
                raise SourceError("Experiment source record is invalid")
            if not isinstance(item["path"], str) or not isinstance(item["sha256"], str):
                raise SourceError("Experiment source path or hash is invalid")
            source = (path.parent / item["path"]).resolve()
            if not source.is_file() or not re.fullmatch(r"[a-fA-F0-9]{64}", item["sha256"]):
                raise SourceError("Experiment source path or hash is invalid")
            if hashlib.sha256(source.read_bytes()).hexdigest() != item["sha256"].lower():
                raise SourceError("Experiment source hash has changed")
            sources.append({"path": str(source), "sha256": item["sha256"].lower()})
        data["sources"] = sources
        return data
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise SourceError("Experiment manifest must be readable UTF-8 JSON") from error


def run_experiment(
    experiment: dict,
    profiles: tuple[ReaderProfile, ...],
    *,
    decide_fn: Callable[..., Decision],
    max_calls: int,
    max_usd: float,
    progress: Callable[[str], None] | None = None,
    concurrency: int = 1,
) -> dict:
    """Run the current authoring format through one canonical route engine."""
    validate_experiment(experiment)
    if not profiles or max_calls < 1 or not 0 < max_usd < math.inf:
        raise ValueError("Experiment requires readers and positive finite limits")
    if not 1 <= concurrency <= 32:
        raise ValueError("Concurrency must be between 1 and 32")
    canonical = compile_experiment(experiment)
    if canonical.get("reader_flow") == "scan_entry" and not inspect.iscoroutinefunction(decide_fn):
        async def scan_decide(*args):
            return await asyncio.to_thread(decide_fn, *args)
        return asyncio.run(_run_experiment_async_engine(canonical, profiles, decide_fn=scan_decide,
                                         max_calls=max_calls, max_usd=max_usd,
                                         concurrency=concurrency, progress=progress))
    if inspect.iscoroutinefunction(decide_fn):
        return asyncio.run(_run_experiment_async_engine(canonical, profiles, decide_fn=decide_fn,
                                         max_calls=max_calls, max_usd=max_usd,
                                         concurrency=concurrency, progress=progress))
    return _run_experiment_sync_engine(canonical, profiles, decide_fn=decide_fn, max_calls=max_calls,
                   max_usd=max_usd, progress=progress)


async def run_experiment_async(experiment: dict, profiles: tuple[ReaderProfile, ...], *,
                               decide_fn, max_calls: int, max_usd: float,
                               concurrency: int = 4, progress=None,
                               resume_checkpoint: dict | None = None,
                               checkpoint_path: Path | None = None,
                               reconciled_unpriced_usd: float | None = None) -> dict:
    validate_experiment(experiment)
    if not profiles or max_calls < 1 or not 0 < max_usd < math.inf or not 1 <= concurrency <= 32:
        raise ValueError("Experiment requires readers, finite limits and concurrency from 1 to 32")
    canonical = compile_experiment(experiment)
    return await _run_experiment_async_engine(canonical, profiles, decide_fn=decide_fn,
                                max_calls=max_calls, max_usd=max_usd,
                                concurrency=concurrency, progress=progress,
                                resume_checkpoint=resume_checkpoint, checkpoint_path=checkpoint_path,
                                reconciled_unpriced_usd=reconciled_unpriced_usd)


def _optional_metrics(journeys: list[dict], item_id: str) -> dict:
    events = [event for journey in journeys for event in journey["events"]
              if event.get("item_id") == item_id]

    def count(event_type: str, key: str | None = None, value: str | None = None) -> int:
        return sum(event["type"] == event_type and (key is None or event.get(key) == value)
                   for event in events)

    return {
        "eligible_journeys": len(journeys),
        "inline_invitation_reach": count("invitation", "origin", "inline"),
        "read_now": count("inline_choice", "choice", "read_now"),
        "deferred": count("inline_choice", "choice", "defer_to_end"),
        "first_offer_unseen": count("terminal_offer", "origin", "first_offer_unseen"),
        "deferred_reoffer": count("terminal_offer", "origin", "deferred_reoffer"),
        "later_reads": sum(event["type"] == "body_opened" and
                            event.get("origin") in {"first_offer_unseen", "deferred_reoffer"}
                            for event in events),
        "later_skips": count("choice", "choice", "skip"),
        "effects": {effect: sum(event["type"] == "optional_read_effect" and
                                event.get("effect") == effect for event in events)
                    for effect in POST_READ_EFFECT},
    }


def _optional_summaries(experiment: dict, journeys: list[dict]) -> list[dict]:
    summaries = []
    def append_summary(condition_id: str, piece: dict, selected: list[dict]) -> None:
        outcome_values = ("reached_end", "stop_satisfied", "leave_lost_interest")
        outcome_breakdowns = [
            {"value": outcome, **_optional_metrics(
                [journey for journey in selected if journey["core_outcome"] == outcome], piece["id"])}
            for outcome in outcome_values
            if any(journey["core_outcome"] == outcome for journey in selected)
        ]
        archetype_values = sorted({journey["archetype"] or "unassigned" for journey in selected})
        archetype_breakdowns = [
            {"value": archetype, **_optional_metrics(
                [journey for journey in selected
                 if (journey["archetype"] or "unassigned") == archetype], piece["id"])}
            for archetype in archetype_values
        ]
        summaries.append({"condition": condition_id, "aside_id": piece["id"],
                          **_optional_metrics(selected, piece["id"]),
                          "breakdowns": {"core_outcome": outcome_breakdowns,
                                         "archetype": archetype_breakdowns}})

    for condition in experiment["conditions"]:
        for piece in experiment["route"]:
            if piece["kind"] == "optional_read":
                append_summary(condition["id"], piece,
                               [journey for journey in journeys if journey["condition"] == condition["id"]])
    for piece in experiment["route"]:
        if piece["kind"] == "optional_read":
            append_summary("combined", piece, journeys)
    return summaries


def _scan_summaries(experiment: dict, journeys: list[dict]) -> list[dict]:
    summaries = []
    for condition in experiment["conditions"]:
        selected = [journey for journey in journeys if journey["condition"] == condition["id"]]
        no_entry = [journey for journey in selected if not any(
            event.get("type") == "scan_entry_selected" for event in journey["events"])]
        entries = []
        for entry in experiment["scan_surface"]:
            if entry["kind"] not in condition["scan_features"]:
                continue
            selected_events = [event for journey in selected for event in journey["events"]
                               if event.get("type") == "scan_entry_selected" and
                               event.get("entry_id") == entry["id"]]
            attention_events = [event for journey in selected for event in journey["events"]
                                if event.get("type") == "scan_entry_attention" and
                                event.get("entry_id") == entry["id"]]
            navigation_events = [event for journey in selected for event in journey["events"]
                                 if event.get("type") == "scan_navigation" and
                                 event.get("entry_id") == entry["id"]]
            entry_outcomes = [event for journey in selected for event in journey["events"]
                              if event.get("type") == "scan_entry_outcome" and
                              event.get("entry_id") == entry["id"]]
            archetypes = sorted({journey["archetype"] or "unassigned" for journey in selected})
            by_archetype = []
            for archetype in archetypes:
                group = [journey for journey in selected
                         if (journey["archetype"] or "unassigned") == archetype]
                by_archetype.append({
                    "archetype": archetype,
                    "eligible_journeys": len(group),
                    "selected": sum(any(event.get("type") == "scan_entry_selected" and
                                         event.get("entry_id") == entry["id"]
                                         for event in journey["events"]) for journey in group),
                    "read_closely": sum(any(event.get("type") == "scan_entry_attention" and
                                             event.get("entry_id") == entry["id"] and
                                             event.get("choice") == "read_closely"
                                             for event in journey["events"]) for journey in group),
                    "skim": sum(any(event.get("type") == "scan_entry_attention" and
                                    event.get("entry_id") == entry["id"] and
                                    event.get("choice") == "skim"
                                    for event in journey["events"]) for journey in group),
                    "read_from_opening": sum(any(event.get("type") == "scan_navigation" and
                                                  event.get("entry_id") == entry["id"] and
                                                  event.get("choice") == "read_from_opening"
                                                  for event in journey["events"]) for journey in group),
                    "continue_forward": sum(any(event.get("type") == "scan_navigation" and
                                                event.get("entry_id") == entry["id"] and
                                                event.get("choice") == "continue_forward"
                                                for event in journey["events"]) for journey in group),
                    "scan_again": sum(any(event.get("type") == "scan_navigation" and
                                          event.get("entry_id") == entry["id"] and
                                          event.get("choice") == "scan_again"
                                          for event in journey["events"]) for journey in group),
                    "stop_satisfied": sum(any(event.get("type") == "scan_entry_outcome" and
                                              event.get("entry_id") == entry["id"] and
                                              event.get("outcome") == "stop_satisfied"
                                              for event in journey["events"]) for journey in group),
                    "leave_lost_interest": sum(any(event.get("type") == "scan_entry_outcome" and
                                                    event.get("entry_id") == entry["id"] and
                                                    event.get("outcome") == "leave_lost_interest"
                                                    for event in journey["events"]) for journey in group),
                })
            entries.append({
                "entry_id": entry["id"], "kind": entry["kind"], "target_id": entry["target"],
                "eligible_journeys": len(selected), "selected": len(selected_events),
                "read_closely": sum(event.get("choice") == "read_closely" for event in attention_events),
                "skim": sum(event.get("choice") == "skim" for event in attention_events),
                "reached_end": sum(journey["reached_end"] and any(
                    event.get("type") == "scan_entry_selected" and event.get("entry_id") == entry["id"]
                    for event in journey["events"]) for journey in selected),
                "stop_satisfied": sum(event.get("outcome") == "stop_satisfied" for event in entry_outcomes),
                "leave_lost_interest": sum(event.get("outcome") == "leave_lost_interest"
                                            for event in entry_outcomes),
                "read_from_opening": sum(event.get("choice") == "read_from_opening" for event in navigation_events),
                "continue_forward": sum(event.get("choice") == "continue_forward" for event in navigation_events),
                "scan_again": sum(event.get("choice") == "scan_again" for event in navigation_events),
                "by_archetype": by_archetype,
            })
        summaries.append({
            "condition": condition["id"], "eligible_journeys": len(selected),
            "no_entry_exit": {
                "eligible_journeys": len(no_entry),
                "stop_satisfied": sum(item["terminal"] == "stop_satisfied" for item in no_entry),
                "leave_lost_interest": sum(item["terminal"] == "leave_lost_interest" for item in no_entry),
                "by_archetype": [
                    {"archetype": archetype, "eligible_journeys": len([
                        item for item in no_entry if (item["archetype"] or "unassigned") == archetype]),
                     "stop_satisfied": sum(item["terminal"] == "stop_satisfied" for item in no_entry
                                           if (item["archetype"] or "unassigned") == archetype),
                     "leave_lost_interest": sum(item["terminal"] == "leave_lost_interest" for item in no_entry
                                                if (item["archetype"] or "unassigned") == archetype)}
                    for archetype in sorted({item["archetype"] or "unassigned" for item in no_entry})
                ],
            },
            "entries": entries,
        })
    return summaries


def _run_experiment_sync_engine(experiment: dict, profiles: tuple[ReaderProfile, ...], *, decide_fn,
            max_calls: int, max_usd: float, progress=None) -> dict:
    run_started = time.perf_counter()
    calls = 0
    cost = 0.0
    unpriced_attempts = 0
    unpriced_cost_estimate = 0.0
    tokens = 0
    retries = 0
    latencies: list[float] = []
    stopped = False
    limits: list[str] = []
    if experiment.get("reader_flow") == "scan_entry":
        limits.append("Scanner panels model the authored text surface and simulated entry choices; "
                      "they do not assess rendered visual hierarchy, spatial layout or human eye movement.")
    observations: list[dict] = []
    journeys: list[dict] = []
    source_hashes = [item["sha256"] for item in experiment["sources"]]
    final_beat_id = next(item["id"] for item in reversed(experiment["route"])
                         if item["kind"] == "beat")
    manifest_hash = hashlib.sha256(json.dumps(experiment, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    cohort_hash = hashlib.sha256(json.dumps([vars(p) for p in profiles], ensure_ascii=False,
                                           sort_keys=True).encode()).hexdigest()

    for reader_number, profile in enumerate(profiles, 1):
        for condition in experiment["conditions"]:
            if stopped:
                break
            condition_id = condition["id"]
            policy = condition["optional_reads"]
            visible = ""
            events: list[dict] = []
            unread: list[dict] = []
            journey = {"reader": profile.id, "archetype": profile.archetype_id,
                       "condition": condition_id, "reached_end": False,
                       "reached_aside": False, "aside_choice": None, "return_choice": None,
                       "offer_reason": None, "optional_effect": None,
                       "core_outcome": None, "terminal": None, "events": events,
                       "exposed_pieces": [], "completed": False}

            def expose(item_id: str, kind: str, text: str) -> None:
                nonlocal visible
                visible += f"\n\n{text}"
                journey["exposed_pieces"].append(item_id)
                events.append({"type": "content_exposed", "item_id": item_id, "kind": kind})

            def ask(stage: str, choices: tuple[str, ...], *, event_item: str = "") -> str | None:
                nonlocal calls, cost, unpriced_attempts, unpriced_cost_estimate, tokens, retries, stopped
                history = tuple({"item_id": event["item_id"], "stage": event["stage"],
                                 "choice": event["choice"]} for event in events
                                if event["type"] == "choice")
                if calls >= max_calls:
                    limits.append("Maximum call count reached")
                    stopped = True
                    return None
                request_bytes = len(visible.encode("utf-8")) + len(json.dumps(
                    history, ensure_ascii=False).encode("utf-8")) + sum(
                    len(value.encode("utf-8")) for value in (
                        profile.arrival_intent, profile.background, profile.desired_payoff,
                        profile.drawn_in_by, profile.put_off_by, experiment["title"], experiment["promise"],
                    )) + 1_000
                if request_bytes > MAX_VISIBLE_BYTES:
                    limits.append("Decision request exceeded the 80 KB state limit")
                    stopped = True
                    return None
                estimate = request_bytes / 4 * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000
                attempts = min(3, max_calls - calls)
                if cost + unpriced_cost_estimate + estimate * attempts > max_usd:
                    limits.append("Estimated spend cap reached before next request")
                    stopped = True
                    return None
                try:
                    request_started = time.perf_counter()
                    answer = decide_fn(profile, condition_id, stage, visible, choices, attempts, history)
                    latency_seconds = time.perf_counter() - request_started
                except DecisionError as error:
                    latency_seconds = time.perf_counter() - request_started
                    latencies.append(latency_seconds)
                    calls += error.attempts
                    retries += max(0, error.attempts - 1)
                    if error.attempts:
                        unpriced_attempts += error.attempts
                        unpriced_cost_estimate += estimate * error.attempts
                    limits.append(f"Decision attempt failed: {error}")
                    stopped = True
                    return None
                if answer.choice not in choices or not 1 <= answer.attempts <= attempts:
                    raise ValueError(f"Experiment decision for {stage} did not match offered choices or attempt limit")
                calls += answer.attempts
                retries += answer.attempts - 1
                cost += answer.cost_usd
                tokens += answer.input_tokens or 0
                latencies.append(latency_seconds)
                observation = {"reader": profile.id, "archetype": profile.archetype_id,
                               "condition": condition_id, "stage": stage, "choice": answer.choice,
                               "probabilities": answer.probabilities, "cost_usd": answer.cost_usd,
                               "input_tokens": answer.input_tokens, "model": answer.model,
                               "attempts": answer.attempts,
                               "latency_seconds": round(latency_seconds, 6)}
                observations.append(observation)
                events.append({"type": "choice", "item_id": event_item, "stage": stage,
                               "choice": answer.choice})
                if progress:
                    progress(f"{condition_id}: reader {reader_number}/{len(profiles)}, {stage}, "
                             f"calls {calls}, cost ${cost:.6f}, active 1")
                if cost >= max_usd:
                    limits.append("Reported spend reached the cap")
                    stopped = True
                return answer.choice

            for piece in experiment["route"]:
                if stopped or journey["terminal"]:
                    break
                if piece["kind"] == "beat":
                    expose(piece["id"], "beat", piece["text"])
                    if piece["id"] == final_beat_id:
                        journey["reached_end"] = True
                    answer = ask(piece["id"], ATTENTION, event_item=piece["id"])
                    if answer in {"leave_lost_interest", "stop_satisfied"}:
                        journey["terminal"] = answer
                        break
                    continue
                if policy == "omit":
                    continue
                if policy == "post_article_choice":
                    continue
                journey["reached_aside"] = True
                invitation = f"{piece.get('eyebrow', '')}\n{piece['title']}\n{piece['standfirst']}".lstrip()
                if policy != "inline" and piece["reading_time"] != "unspecified":
                    invitation += f"\n{piece['reading_time']}"
                invitation += f"\n{piece.get('preview', '')}" if piece.get("preview") else ""
                if policy != "inline" and piece.get("disclosure_label"):
                    invitation += f"\n{piece['disclosure_label']}"
                if policy == "read_now_or_defer":
                    invitation += "\nYou can read this now, or continue with the article and choose whether to read it at the end."
                expose(piece["id"] + ":invitation", "invitation", invitation)
                events.append({"type": "invitation", "item_id": piece["id"], "origin": "inline"})
                if policy in {"inline", "force_open"}:
                    expose(piece["id"] + ":body", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                    answer = ask(piece["id"] + ":read", ATTENTION, event_item=piece["id"])
                elif policy == "read_now_or_defer":
                    answer = ask(piece["id"] + ":inline-choice", ("read_now", "defer_to_end"),
                                 event_item=piece["id"])
                    events.append({"type": "inline_choice", "item_id": piece["id"], "choice": answer})
                    journey["aside_choice"] = "open_now" if answer == "read_now" else (
                        "return_later" if answer == "defer_to_end" else None)
                    if answer == "read_now":
                        expose(piece["id"] + ":body", "optional_body", piece["body"])
                        events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                        answer = ask(piece["id"] + ":read", ATTENTION, event_item=piece["id"])
                elif policy == "reader_choice":
                    answer = ask("aside-choice", ("open_now", "return_later", "skip"), event_item=piece["id"])
                    journey["aside_choice"] = answer
                    events.append({"type": "inline_choice", "item_id": piece["id"], "choice": answer})
                    if answer == "open_now":
                        expose(piece["id"] + ":body", "optional_body", piece["body"])
                        events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                        answer = ask("aside-read", ATTENTION, event_item=piece["id"])
                    else:
                        answer = None
                elif policy == "closed":
                    answer = None
                else:
                    unread.append({**piece, "origin": "deferred_reoffer"})
                    answer = None
                if policy == "closed" or (policy in {"reader_choice", "read_now_or_defer"} and
                                             journey["aside_choice"] not in {"open_now", "read_now"}):
                    closed_stage = f"{piece['id']}:closed" if policy == "read_now_or_defer" else "aside-closed"
                    answer = ask(closed_stage, ATTENTION, event_item=piece["id"])
                if answer in {"leave_lost_interest", "stop_satisfied"}:
                    journey["terminal"] = answer

            if journey["terminal"] in {"leave_lost_interest", "stop_satisfied"}:
                journey["core_outcome"] = journey["terminal"]
                events.append({"type": "core_outcome", "outcome": journey["core_outcome"]})
            elif journey["reached_end"]:
                journey["core_outcome"] = "reached_end"
                events.append({"type": "core_outcome", "outcome": "reached_end"})

            if policy == "read_now_or_defer":
                opened_inline = {event["item_id"] for event in events
                                 if event["type"] == "body_opened" and event["origin"] == "inline"}
                unread = [piece for piece in experiment["route"]
                          if piece["kind"] == "optional_read" and piece["id"] not in opened_inline]
                for piece in unread:
                    if stopped:
                        break
                    origin = "deferred_reoffer" if any(
                        event["type"] == "inline_choice" and event["item_id"] == piece["id"]
                        for event in events) else "first_offer_unseen"
                    expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                           f"{piece['title']}\n{piece['standfirst']}\n{piece['reading_time']}")
                    events.append({"type": "terminal_offer", "item_id": piece["id"], "origin": origin,
                                   "title": piece["title"], "standfirst": piece["standfirst"],
                                   "reading_time": piece["reading_time"]})
                    answer = ask(piece["id"] + ":terminal-choice", ("read", "skip"), event_item=piece["id"])
                    if answer == "read":
                        expose(piece["id"] + ":body-terminal", "optional_body", piece["body"])
                        events.append({"type": "body_opened", "item_id": piece["id"], "origin": origin})
                        effect = ask(piece["id"] + ":read-effect", POST_READ_EFFECT, event_item=piece["id"])
                        events.append({"type": "optional_read_effect", "item_id": piece["id"], "effect": effect})
            elif policy == "reader_choice" and journey["reached_end"] and journey["terminal"] != "leave_lost_interest":
                for piece in experiment["route"]:
                    if piece["kind"] != "optional_read" or not any(
                            event["type"] == "inline_choice" and event["item_id"] == piece["id"] and
                            event["choice"] == "return_later" for event in events):
                        continue
                    expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                           f"{piece['title']}\n{piece['standfirst']}")
                    events.append({"type": "terminal_offer", "item_id": piece["id"],
                                   "origin": "deferred_reoffer", "title": piece["title"],
                                   "standfirst": piece["standfirst"]})
                    answer = ask("return-choice", ("open", "skip"), event_item=piece["id"])
                    journey["return_choice"] = answer
                    if answer == "open":
                        expose(piece["id"] + ":body-later", "optional_body", piece["body"])
                        events.append({"type": "body_opened", "item_id": piece["id"], "origin": "deferred_reoffer"})
                        answer = ask("return-read", ATTENTION, event_item=piece["id"])
                        if answer in {"leave_lost_interest", "stop_satisfied"}:
                            break
            elif policy == "post_article_choice" and journey["terminal"] != "leave_lost_interest" and (
                    journey["reached_end"] or journey["terminal"] == "stop_satisfied"):
                piece = next(piece for piece in experiment["route"] if piece["kind"] == "optional_read")
                journey["offer_reason"] = "reached_end" if journey["reached_end"] else "stop_satisfied"
                expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                       f"{piece['title']}\n{piece['standfirst']}")
                events.append({"type": "terminal_offer", "item_id": piece["id"],
                               "origin": "post_article", "title": piece["title"],
                               "standfirst": piece["standfirst"]})
                answer = ask("post-choice", ("open", "skip"), event_item=piece["id"])
                journey["aside_choice"] = answer
                if answer == "open":
                    expose(piece["id"] + ":body", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "post_article"})
                    journey["optional_effect"] = ask("post-read-effect", POST_READ_EFFECT, event_item=piece["id"])
            journey["completed"] = journey["core_outcome"] is not None and not stopped
            journeys.append(journey)
    completed_journeys = [journey for journey in journeys if journey["completed"]]
    completed_keys = {(journey["reader"], journey["condition"]) for journey in completed_journeys}
    observations = [item for item in observations if (item["reader"], item["condition"]) in completed_keys]
    optional_summary = _optional_summaries(experiment, completed_journeys)
    return {"manifest_sha256": manifest_hash, "source_sha256": source_hashes,
            "cohort_sha256": cohort_hash,
            "conditions": [item["id"] for item in experiment["conditions"]],
            "journeys": completed_journeys, "total_journeys": len(profiles) * len(experiment["conditions"]),
            "incomplete_journeys": len(profiles) * len(experiment["conditions"]) - len(completed_journeys),
            "observations": observations,
            "optional_summary": optional_summary, "limitations": limits,
            "calls": calls, "cost_usd": cost, "input_tokens": tokens,
            "reported_cost_usd": cost, "unpriced_attempts": unpriced_attempts,
            "unpriced_cost_estimate_usd": round(unpriced_cost_estimate, 10),
            "cost_reconciliation_required": unpriced_attempts > 0,
            "reconciled_unpriced_cost_usd": 0.0,
            "wall_time_seconds": round(time.perf_counter() - run_started, 6),
            "performance": _performance_summary(observations, latencies, retries, 1)}


async def _run_experiment_async_engine(experiment: dict, profiles: tuple[ReaderProfile, ...], *, decide_fn,
                        max_calls: int, max_usd: float, concurrency: int, progress=None,
                        resume_checkpoint: dict | None = None, checkpoint_path: Path | None = None,
                        reconciled_unpriced_usd: float | None = None) -> dict:
    """Run independent reader-condition journeys concurrently with reserved global caps."""
    run_started = time.perf_counter()
    semaphore = asyncio.Semaphore(concurrency)
    budget_lock = asyncio.Lock()
    budget = {"calls": 0, "reserved_calls": 0, "cost": 0.0, "reported_cost": 0.0,
              "reconciled_unpriced_cost": 0.0, "unpriced_attempts": 0,
              "unpriced_cost_estimate": 0.0, "reserved_cost": 0.0,
              "tokens": 0, "retries": 0, "latencies": [], "stopped": False,
              "active_requests": 0, "max_active_requests": 0}
    limits: list[str] = []
    if experiment.get("reader_flow") == "scan_entry":
        limits.append("Scanner panels model the authored text surface and simulated entry choices; "
                      "they do not assess rendered visual hierarchy, spatial layout or human eye movement.")
    source_hashes = [item["sha256"] for item in experiment["sources"]]
    final_beat_id = next(item["id"] for item in reversed(experiment["route"])
                         if item["kind"] == "beat")
    manifest_hash = hashlib.sha256(json.dumps(experiment, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    cohort_hash = hashlib.sha256(json.dumps([vars(p) for p in profiles], ensure_ascii=False,
                                           sort_keys=True).encode()).hexdigest()
    prompt_hash = experiment_prompt_fingerprint()
    fingerprint = hashlib.sha256(json.dumps({"manifest": manifest_hash, "sources": source_hashes,
        "cohort": cohort_hash, "model": "typesafe/jev-1.13", "prompt": prompt_hash},
        sort_keys=True).encode()).hexdigest()
    if resume_checkpoint is not None and not isinstance(resume_checkpoint.get("completed_journeys"), dict):
        raise ValueError("Resume checkpoint completed journeys are invalid")
    completed = dict(resume_checkpoint.get("completed_journeys", {})) if resume_checkpoint else {}
    if resume_checkpoint and (resume_checkpoint.get("format_version") != 1 or
                              resume_checkpoint.get("fingerprint") != fingerprint):
        raise ValueError("Resume checkpoint does not match cohort, source, manifest, model and prompts")
    prior_usage = resume_checkpoint.get("usage", {}) if resume_checkpoint else {}
    if (not isinstance(prior_usage, dict) or
            any(type(prior_usage.get(key, default)) is not expected
                for key, default, expected in (("calls", 0, int), ("input_tokens", 0, int),
                                               ("retries", 0, int))) or
            not isinstance(prior_usage.get("latencies_seconds", []), list) or
            any(isinstance(value, bool) or not isinstance(value, (int, float)) or
                not math.isfinite(value) or value < 0
                for value in prior_usage.get("latencies_seconds", [])) or
            isinstance(prior_usage.get("cost_usd", 0.0), bool) or
            not isinstance(prior_usage.get("cost_usd", 0.0), (int, float)) or
            not math.isfinite(prior_usage.get("cost_usd", 0.0)) or prior_usage.get("cost_usd", 0.0) < 0):
        raise ValueError("Resume checkpoint usage totals are invalid")
    for key, record in completed.items():
        if (not isinstance(key, str) or not isinstance(record, dict) or
                set(record) != {"journey", "observations", "usage"} or
                not isinstance(record["journey"], dict) or record["journey"].get("completed") is not True or
                not isinstance(record["observations"], list) or not isinstance(record["usage"], dict)):
            raise ValueError("Resume checkpoint contains a malformed completed journey")
    budget["calls"] = prior_usage.get("calls", 0)
    budget["cost"] = float(prior_usage.get("cost_usd", 0.0))
    budget["reported_cost"] = float(prior_usage.get("reported_cost_usd", budget["cost"]))
    budget["unpriced_attempts"] = prior_usage.get("unpriced_attempts", 0)
    budget["unpriced_cost_estimate"] = float(prior_usage.get("unpriced_cost_estimate_usd", 0.0))
    budget["reconciled_unpriced_cost"] = float(prior_usage.get("reconciled_unpriced_cost_usd", 0.0))
    if type(budget["unpriced_attempts"]) is not int or budget["unpriced_attempts"] < 0:
        raise ValueError("Resume checkpoint unpriced attempt count is invalid")
    if budget["unpriced_attempts"] and reconciled_unpriced_usd is None:
        raise ValueError("Unpriced failed attempts require provider-billing reconciliation before resume; pass --reconciled-unpriced-usd")
    if reconciled_unpriced_usd is not None:
        if (isinstance(reconciled_unpriced_usd, bool) or
                not isinstance(reconciled_unpriced_usd, (int, float)) or
                not math.isfinite(reconciled_unpriced_usd) or reconciled_unpriced_usd < 0 or
                not budget["unpriced_attempts"]):
            raise ValueError("Reconciled unpriced cost must be finite, nonnegative and match pending failed attempts")
        budget["cost"] += reconciled_unpriced_usd
        budget["reconciled_unpriced_cost"] += reconciled_unpriced_usd
        budget["unpriced_attempts"] = 0
        budget["unpriced_cost_estimate"] = 0.0
    budget["tokens"] = prior_usage.get("input_tokens", 0)
    budget["retries"] = prior_usage.get("retries", 0)
    budget["latencies"] = list(prior_usage.get("latencies_seconds", []))
    checkpoint_lock = asyncio.Lock()

    def persist_checkpoint() -> None:
        if checkpoint_path is None:
            return
        checkpoint_path.parent.mkdir(parents=True, exist_ok=True)
        data = {"format_version": 1, "fingerprint": fingerprint,
                "manifest_sha256": manifest_hash, "source_sha256": source_hashes,
                "cohort_sha256": cohort_hash, "model": "typesafe/jev-1.13",
                "prompt_sha256": prompt_hash,
                "usage": {"calls": budget["calls"], "cost_usd": budget["cost"],
                          "reported_cost_usd": budget["reported_cost"],
                          "reconciled_unpriced_cost_usd": budget["reconciled_unpriced_cost"],
                          "unpriced_attempts": budget["unpriced_attempts"],
                          "unpriced_cost_estimate_usd": budget["unpriced_cost_estimate"],
                          "input_tokens": budget["tokens"], "retries": budget["retries"],
                          "latencies_seconds": budget["latencies"]},
                "completed_journeys": completed}
        with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=checkpoint_path.parent,
                                         prefix=checkpoint_path.name + ".", suffix=".tmp",
                                         delete=False) as handle:
            json.dump(data, handle, ensure_ascii=False, separators=(",", ":"))
            handle.write("\n")
            temporary = Path(handle.name)
        os.replace(temporary, checkpoint_path)

    async def save_checkpoint() -> None:
        if checkpoint_path is not None:
            async with checkpoint_lock:
                persist_checkpoint()

    async def run_journey(reader_number: int, profile: ReaderProfile, condition: dict) -> tuple[dict, list[dict]]:
        condition_id = condition["id"]
        journey_key = f"{profile.id}/{condition_id}"
        policy = condition["optional_reads"]
        visible = ""
        events: list[dict] = []
        unread: list[dict] = []
        observations: list[dict] = []
        usage = {"calls": 0, "cost_usd": 0.0, "input_tokens": 0}
        journey = {"reader": profile.id, "archetype": profile.archetype_id,
                   "condition": condition_id, "reached_end": False,
                   "reached_aside": False, "aside_choice": None, "return_choice": None,
                   "offer_reason": None, "optional_effect": None,
                   "core_outcome": None, "terminal": None, "events": events,
                   "exposed_pieces": [], "completed": False}
        interrupted = False

        def expose(item_id: str, kind: str, text: str) -> None:
            nonlocal visible
            visible += f"\n\n{text}"
            journey["exposed_pieces"].append(item_id)
            events.append({"type": "content_exposed", "item_id": item_id, "kind": kind})

        async def ask(stage: str, choices: tuple[str, ...], *, event_item: str = "") -> str | None:
            nonlocal interrupted
            history = tuple({"item_id": event["item_id"], "stage": event["stage"],
                             "choice": event["choice"]} for event in events
                            if event["type"] == "choice")
            request_bytes = len(visible.encode("utf-8")) + len(json.dumps(
                history, ensure_ascii=False).encode("utf-8")) + sum(
                len(value.encode("utf-8")) for value in (
                    profile.arrival_intent, profile.background, profile.desired_payoff,
                    profile.drawn_in_by, profile.put_off_by, experiment["title"], experiment["promise"],
                )) + 1_000
            if request_bytes > MAX_VISIBLE_BYTES:
                limits.append("Decision request exceeded the 80 KB state limit")
                interrupted = True
                return None
            estimate = request_bytes / 4 * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000
            async with semaphore:
                while True:
                    wait_for_budget = False
                    async with budget_lock:
                        available = max_calls - budget["calls"] - budget["reserved_calls"]
                        attempts = min(3, available)
                        if budget["stopped"] or attempts < 1:
                            if budget["reserved_calls"]:
                                wait_for_budget = True
                            else:
                                limits.append("Maximum call count reached before the next decision")
                                interrupted = True
                                return None
                        else:
                            reserve_cost = estimate * attempts
                            if (budget["cost"] + budget["unpriced_cost_estimate"] +
                                    budget["reserved_cost"] + reserve_cost > max_usd):
                                if budget["reserved_calls"]:
                                    wait_for_budget = True
                                else:
                                    limits.append("Estimated spend cap reached before next request")
                                    interrupted = True
                                    return None
                            else:
                                budget["reserved_calls"] += attempts
                                budget["reserved_cost"] += reserve_cost
                                budget["active_requests"] += 1
                                budget["max_active_requests"] = max(
                                    budget["max_active_requests"], budget["active_requests"])
                                break
                    if wait_for_budget:
                        await asyncio.sleep(0.01)
                request_started = time.perf_counter()
                try:
                    if inspect.iscoroutinefunction(decide_fn):
                        result = await decide_fn(profile, condition_id, stage, visible, choices, attempts,
                                                 history)
                    else:
                        result = await asyncio.to_thread(
                            decide_fn, profile, condition_id, stage, visible, choices, attempts, history)
                except DecisionError as error:
                    latency_seconds = time.perf_counter() - request_started
                    async with budget_lock:
                        budget["reserved_calls"] -= attempts
                        budget["reserved_cost"] -= reserve_cost
                        budget["active_requests"] -= 1
                        budget["calls"] += error.attempts
                        budget["retries"] += max(0, error.attempts - 1)
                        budget["unpriced_attempts"] += error.attempts
                        budget["unpriced_cost_estimate"] += estimate * error.attempts
                        budget["latencies"].append(latency_seconds)
                        usage["calls"] += error.attempts
                        budget["stopped"] = True
                    await save_checkpoint()
                    limits.append(f"Decision attempt failed: {error}")
                    interrupted = True
                    return None
                latency_seconds = time.perf_counter() - request_started
                async with budget_lock:
                    budget["reserved_calls"] -= attempts
                    budget["reserved_cost"] -= reserve_cost
                    budget["active_requests"] -= 1
                    if result.choice not in choices or not 1 <= result.attempts <= attempts:
                        budget["stopped"] = True
                        raise ValueError(f"Experiment decision for {stage} did not match offered choices or attempt limit")
                    budget["calls"] += result.attempts
                    budget["retries"] += result.attempts - 1
                    budget["latencies"].append(latency_seconds)
                    budget["cost"] += result.cost_usd
                    budget["reported_cost"] += result.cost_usd
                    budget["tokens"] += result.input_tokens or 0
                    usage["calls"] += result.attempts
                    usage["cost_usd"] += result.cost_usd
                    usage["input_tokens"] += result.input_tokens or 0
                    if budget["cost"] + budget["reserved_cost"] >= max_usd:
                        budget["stopped"] = True
                    calls_now, cost_now = budget["calls"], budget["cost"]
                    active_now = budget["active_requests"]
                await save_checkpoint()
                observations.append({"reader": profile.id, "archetype": profile.archetype_id,
                                     "condition": condition_id, "stage": stage, "choice": result.choice,
                                     "probabilities": result.probabilities, "cost_usd": result.cost_usd,
                                     "input_tokens": result.input_tokens, "model": result.model,
                                     "attempts": result.attempts,
                                     "latency_seconds": round(latency_seconds, 6)})
                events.append({"type": "choice", "item_id": event_item, "stage": stage,
                               "choice": result.choice})
                if progress:
                    progress(f"{condition_id}: reader {reader_number}/{len(profiles)}, {stage}, "
                             f"calls {calls_now}, cost ${cost_now:.6f}, active {active_now}")
                return result.choice

        route_plan = experiment["route"]
        if experiment.get("reader_flow") == "scan_entry":
            route_plan = []
            route_by_id = {piece["id"]: piece for piece in experiment["route"]}
            route_position = {piece["id"]: index for index, piece in enumerate(experiment["route"])}
            visited_targets: set[str] = set()
            features = set(condition["scan_features"])
            while not interrupted and not journey["terminal"]:
                entries = [entry for entry in experiment["scan_surface"]
                           if entry["kind"] in features and entry["target"] not in visited_targets]
                if not entries:
                    break
                surface = [f"{experiment['title']}\n{experiment['promise']}",
                           "Choose a place to enter this article:"]
                for entry in entries:
                    if entry["kind"] == "heading":
                        surface.append(f"Section: {entry['text']}")
                    elif entry["kind"] == "pull_quote":
                        surface.append(f"Pull quote: {entry['text']}")
                    else:
                        surface.append(f"Additional read: {entry['title']}\n{entry['standfirst']}")
                expose(f"scan-surface-{len(visited_targets) + 1}", "scan_surface", "\n\n".join(surface))
                events.append({"type": "scan_surface_shown", "entry_ids": [entry["id"] for entry in entries],
                               "features": sorted(features)})
                scan_choices = tuple(f"entry--{entry['id']}" for entry in entries) + (
                    "stop_satisfied", "leave_lost_interest")
                selected = await ask(f"scan-entry-{len(visited_targets)}", scan_choices,
                                     event_item="scan-surface")
                if selected in {"stop_satisfied", "leave_lost_interest"}:
                    journey["terminal"] = selected
                    break
                if selected is None:
                    break
                entry = next(entry for entry in entries if selected == f"entry--{entry['id']}")
                piece = route_by_id[entry["target"]]
                visited_targets.add(piece["id"])
                journey["scan_entry"] = entry["id"]
                events.append({"type": "scan_entry_selected", "entry_id": entry["id"],
                               "entry_kind": entry["kind"], "target_id": piece["id"],
                               "target_kind": piece["kind"]})
                if piece["kind"] == "beat":
                    expose(piece["id"], "beat", piece["text"])
                    if piece["id"] == final_beat_id:
                        journey["reached_end"] = True
                else:
                    journey["reached_aside"] = True
                    expose(piece["id"] + ":body-scan", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"],
                                   "origin": "scan_entry"})
                attention = await ask(f"scan-attention:{piece['id']}", SCAN_ATTENTION,
                                      event_item=piece["id"])
                if attention is None:
                    break
                events.append({"type": "scan_entry_attention", "entry_id": entry["id"],
                               "target_id": piece["id"], "choice": attention})
                navigation = ["stop_satisfied", "leave_lost_interest"]
                if any(route_position[item["id"]] < route_position[piece["id"]]
                       for item in experiment["route"] if item["id"] not in visited_targets):
                    navigation.append("read_from_opening")
                if any(route_position[item["id"]] > route_position[piece["id"]]
                       for item in experiment["route"] if item["id"] not in visited_targets):
                    navigation.append("continue_forward")
                if any(entry["kind"] in features and entry["target"] not in visited_targets
                       for entry in experiment["scan_surface"]):
                    navigation.append("scan_again")
                next_move = await ask(f"scan-navigation:{piece['id']}", tuple(navigation),
                                      event_item=piece["id"])
                if next_move in {"stop_satisfied", "leave_lost_interest"}:
                    journey["terminal"] = next_move
                    events.append({"type": "scan_entry_outcome", "entry_id": entry["id"],
                                   "target_id": piece["id"], "outcome": next_move})
                    break
                if next_move == "scan_again":
                    events.append({"type": "scan_navigation", "item_id": piece["id"],
                                   "entry_id": entry["id"], "choice": next_move})
                    continue
                if next_move == "read_from_opening":
                    route_plan = [item for item in experiment["route"]
                                  if item["id"] not in visited_targets]
                elif next_move == "continue_forward":
                    route_plan = [item for item in experiment["route"]
                                  if route_position[item["id"]] > route_position[piece["id"]]
                                  and item["id"] not in visited_targets]
                events.append({"type": "scan_navigation", "item_id": piece["id"],
                               "entry_id": entry["id"], "choice": next_move})
                break

        for piece in route_plan:
            if interrupted or journey["terminal"]:
                break
            if piece["kind"] == "beat":
                expose(piece["id"], "beat", piece["text"])
                if piece["id"] == final_beat_id:
                    journey["reached_end"] = True
                answer = await ask(piece["id"], ATTENTION, event_item=piece["id"])
                if answer in {"leave_lost_interest", "stop_satisfied"}:
                    journey["terminal"] = answer
                    break
                continue
            if policy == "omit":
                continue
            if policy == "post_article_choice":
                continue
            journey["reached_aside"] = True
            invitation = f"{piece.get('eyebrow', '')}\n{piece['title']}\n{piece['standfirst']}".lstrip()
            if policy != "inline" and piece["reading_time"] != "unspecified":
                invitation += f"\n{piece['reading_time']}"
            invitation += f"\n{piece.get('preview', '')}" if piece.get("preview") else ""
            if policy != "inline" and piece.get("disclosure_label"):
                invitation += f"\n{piece['disclosure_label']}"
            if policy == "read_now_or_defer":
                invitation += "\nYou can read this now, or continue with the article and choose whether to read it at the end."
            expose(piece["id"] + ":invitation", "invitation", invitation)
            events.append({"type": "invitation", "item_id": piece["id"], "origin": "inline"})
            if policy in {"inline", "force_open"}:
                expose(piece["id"] + ":body", "optional_body", piece["body"])
                events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                answer = await ask(piece["id"] + ":read", ATTENTION, event_item=piece["id"])
            elif policy == "read_now_or_defer":
                answer = await ask(piece["id"] + ":inline-choice", ("read_now", "defer_to_end"),
                                   event_item=piece["id"])
                events.append({"type": "inline_choice", "item_id": piece["id"], "choice": answer})
                journey["aside_choice"] = "open_now" if answer == "read_now" else (
                    "return_later" if answer == "defer_to_end" else None)
                if answer == "read_now":
                    expose(piece["id"] + ":body", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                    answer = await ask(piece["id"] + ":read", ATTENTION, event_item=piece["id"])
            elif policy == "reader_choice":
                answer = await ask("aside-choice", ("open_now", "return_later", "skip"),
                                   event_item=piece["id"])
                journey["aside_choice"] = answer
                events.append({"type": "inline_choice", "item_id": piece["id"], "choice": answer})
                if answer == "open_now":
                    expose(piece["id"] + ":body", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "inline"})
                    answer = await ask("aside-read", ATTENTION, event_item=piece["id"])
            elif policy == "closed":
                answer = None
            else:
                answer = None
            if policy == "closed" or (policy in {"reader_choice", "read_now_or_defer"} and
                                         journey["aside_choice"] not in {"open_now", "read_now"}):
                closed_stage = f"{piece['id']}:closed" if policy == "read_now_or_defer" else "aside-closed"
                answer = await ask(closed_stage, ATTENTION, event_item=piece["id"])
            if answer in {"leave_lost_interest", "stop_satisfied"}:
                journey["terminal"] = answer

        if journey["terminal"] in {"leave_lost_interest", "stop_satisfied"}:
            journey["core_outcome"] = journey["terminal"]
            events.append({"type": "core_outcome", "outcome": journey["core_outcome"]})
        elif journey["reached_end"]:
            journey["core_outcome"] = "reached_end"
            events.append({"type": "core_outcome", "outcome": "reached_end"})
        if policy == "read_now_or_defer" and not interrupted:
            opened_inline = {event["item_id"] for event in events
                             if event["type"] == "body_opened" and
                             event["origin"] in {"inline", "scan_entry"}}
            for piece in experiment["route"]:
                if piece["kind"] != "optional_read" or piece["id"] in opened_inline:
                    continue
                async with budget_lock:
                    if budget["stopped"]:
                        interrupted = True
                        break
                origin = "deferred_reoffer" if any(
                    event["type"] == "inline_choice" and event["item_id"] == piece["id"]
                    for event in events) else "first_offer_unseen"
                expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                       f"{piece['title']}\n{piece['standfirst']}\n{piece['reading_time']}")
                events.append({"type": "terminal_offer", "item_id": piece["id"], "origin": origin,
                               "title": piece["title"], "standfirst": piece["standfirst"],
                               "reading_time": piece["reading_time"]})
                answer = await ask(piece["id"] + ":terminal-choice", ("read", "skip"), event_item=piece["id"])
                if answer == "read":
                    expose(piece["id"] + ":body-terminal", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": origin})
                    effect = await ask(piece["id"] + ":read-effect", POST_READ_EFFECT, event_item=piece["id"])
                    events.append({"type": "optional_read_effect", "item_id": piece["id"], "effect": effect})
        elif (policy == "reader_choice" and experiment.get("reader_flow") != "scan_entry" and
              journey["reached_end"] and journey["terminal"] != "leave_lost_interest"):
            for piece in experiment["route"]:
                if piece["kind"] != "optional_read" or not any(
                        event["type"] == "inline_choice" and event["item_id"] == piece["id"] and
                        event["choice"] == "return_later" for event in events):
                    continue
                expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                       f"{piece['title']}\n{piece['standfirst']}")
                events.append({"type": "terminal_offer", "item_id": piece["id"],
                               "origin": "deferred_reoffer", "title": piece["title"],
                               "standfirst": piece["standfirst"]})
                answer = await ask("return-choice", ("open", "skip"), event_item=piece["id"])
                journey["return_choice"] = answer
                if answer == "open":
                    expose(piece["id"] + ":body-later", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "deferred_reoffer"})
                    answer = await ask("return-read", ATTENTION, event_item=piece["id"])
                    if answer in {"leave_lost_interest", "stop_satisfied"}:
                        break
        elif (policy == "post_article_choice" and experiment.get("reader_flow") != "scan_entry" and
              journey["terminal"] != "leave_lost_interest" and (
                  journey["reached_end"] or journey["terminal"] == "stop_satisfied")):
            piece = next(piece for piece in experiment["route"] if piece["kind"] == "optional_read")
            journey["offer_reason"] = "reached_end" if journey["reached_end"] else "stop_satisfied"
            expose(piece["id"] + ":terminal-invitation", "terminal_invitation",
                   f"{piece['title']}\n{piece['standfirst']}")
            events.append({"type": "terminal_offer", "item_id": piece["id"],
                           "origin": "post_article", "title": piece["title"],
                           "standfirst": piece["standfirst"]})
            answer = await ask("post-choice", ("open", "skip"), event_item=piece["id"])
            journey["aside_choice"] = answer
            if answer == "open":
                expose(piece["id"] + ":body", "optional_body", piece["body"])
                events.append({"type": "body_opened", "item_id": piece["id"], "origin": "post_article"})
                journey["optional_effect"] = await ask("post-read-effect", POST_READ_EFFECT, event_item=piece["id"])
        journey["completed"] = journey["core_outcome"] is not None and not interrupted
        if journey["completed"]:
            async with checkpoint_lock:
                completed[journey_key] = {"journey": journey, "observations": observations,
                                           "usage": usage}
                if checkpoint_path is not None:
                    persist_checkpoint()
        return journey, observations

    completed_keys = set(completed)
    if checkpoint_path is not None and not completed:
        persist_checkpoint()
    jobs = [(reader_number, profile, condition)
            for reader_number, profile in enumerate(profiles, 1)
            for condition in experiment["conditions"]
            if f"{profile.id}/{condition['id']}" not in completed_keys]
    results = await asyncio.gather(*(run_journey(number, profile, condition)
                                     for number, profile, condition in jobs))
    journeys = [record["journey"] for record in completed.values()]
    observations = [item for record in completed.values() for item in record["observations"]]
    journeys.sort(key=lambda item: (next(n for n, p in enumerate(profiles) if p.id == item["reader"]),
                                    next(n for n, c in enumerate(experiment["conditions"])
                                         if c["id"] == item["condition"])))
    optional_summary = []
    if experiment.get("reader_flow") != "scan_entry":
        for condition in experiment["conditions"]:
            for piece in experiment["route"]:
                if piece["kind"] != "optional_read":
                    continue
                selected = [journey for journey in journeys if journey["condition"] == condition["id"]]
                events = [event for journey in selected for event in journey["events"]
                          if event.get("item_id") == piece["id"]]
                def count(event_type: str, key: str | None = None, value: str | None = None) -> int:
                    return sum(event["type"] == event_type and
                               (key is None or event.get(key) == value) for event in events)
                optional_summary.append({"condition": condition["id"], "aside_id": piece["id"],
                    "eligible_journeys": len(selected), "inline_invitation_reach": count("invitation", "origin", "inline"),
                    "read_now": count("inline_choice", "choice", "read_now"),
                    "deferred": count("inline_choice", "choice", "defer_to_end"),
                    "first_offer_unseen": count("terminal_offer", "origin", "first_offer_unseen"),
                    "deferred_reoffer": count("terminal_offer", "origin", "deferred_reoffer"),
                    "later_reads": sum(event["type"] == "body_opened" and event.get("origin") in
                                       {"first_offer_unseen", "deferred_reoffer"} for event in events),
                    "later_skips": count("choice", "choice", "skip"),
                    "effects": {effect: sum(event["type"] == "optional_read_effect" and
                                            event.get("effect") == effect for event in events)
                                for effect in POST_READ_EFFECT},
                    "breakdowns": _optional_summaries(
                        {"route": experiment["route"], "conditions": [condition]}, selected)[0]["breakdowns"]})
        optional_summary.extend(item for item in _optional_summaries(experiment, journeys)
                                if item["condition"] == "combined")
    scan_summary = (_scan_summaries(experiment, journeys)
                    if experiment.get("reader_flow") == "scan_entry" else [])
    total_journeys = len(profiles) * len(experiment["conditions"])
    return {"manifest_sha256": manifest_hash, "source_sha256": source_hashes,
            "cohort_sha256": cohort_hash, "conditions": [c["id"] for c in experiment["conditions"]],
            "journeys": journeys, "observations": observations, "total_journeys": total_journeys,
            "incomplete_journeys": total_journeys - len(journeys),
            "optional_summary": optional_summary, "scan_summary": scan_summary,
            "limitations": limits,
            "calls": budget["calls"], "cost_usd": budget["cost"], "input_tokens": budget["tokens"],
            "reported_cost_usd": budget["reported_cost"],
            "reconciled_unpriced_cost_usd": budget["reconciled_unpriced_cost"],
            "unpriced_attempts": budget["unpriced_attempts"],
            "unpriced_cost_estimate_usd": round(budget["unpriced_cost_estimate"], 10),
            "cost_reconciliation_required": budget["unpriced_attempts"] > 0,
            "checkpoint_fingerprint": fingerprint,
            "wall_time_seconds": round(time.perf_counter() - run_started, 6),
            "performance": _performance_summary(observations, budget["latencies"], budget["retries"],
                                                budget["max_active_requests"])}


def _performance_summary(observations: list[dict], latencies: list[float], retries: int,
                         max_active_requests: int) -> dict:
    return {"completed_decisions": len(observations), "wire_retries": retries,
            "max_active_requests": max_active_requests,
            "decision_latencies_seconds": [round(value, 6) for value in latencies]}

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

from reader_panel_decisions import Decision, DecisionError
from reader_panel_source import ReaderProfile, SourceError


_ID = re.compile(r"^[a-z][a-z0-9-]{0,63}$")
CONDITIONS = {"omit", "closed", "force_open", "reader_choice"}
POST_ARTICLE_CONDITIONS = {"omit", "post_article_choice"}
ATTENTION = ("read_closely", "skim", "leave_lost_interest", "stop_satisfied")
ASIDE_CHOICE = ("open_now", "return_later", "skip")
RETURN_CHOICE = ("open", "skip")
POST_READ_EFFECT = ("increased", "maintained", "decreased")
MAX_EXPERIMENT_BYTES = 200_000
MAX_VISIBLE_BYTES = 80_000
PRICE_PER_MILLION_INPUT_TOKENS = 0.042


def validate_experiment(data: dict) -> dict:
    common = {"version", "title", "promise", "sources", "beats", "conditions"}
    if not isinstance(data, dict) or type(data.get("version")) is not int or data["version"] not in {1, 2, 3}:
        raise SourceError("Experiment manifest requires version 1, 2 or 3")
    version = data["version"]
    if version == 3:
        return _validate_v3(data)
    if set(data) != (common | ({"optional_read"} if version == 2 else set())):
        raise SourceError("Experiment manifest fields are invalid")
    if not all(isinstance(data[key], str) and data[key].strip() for key in ("title", "promise")):
        raise SourceError("Experiment title and promise must be nonempty")
    if not isinstance(data["sources"], list) or not isinstance(data["beats"], list) or not data["beats"]:
        raise SourceError("Experiment requires source records and reading beats")
    conditions = data["conditions"]
    if (not isinstance(conditions, list) or not conditions or
            any(not isinstance(item, str) for item in conditions) or
            len(set(conditions)) != len(conditions) or
            set(conditions) - (POST_ARTICLE_CONDITIONS if version == 2 else CONDITIONS) or
            (version == 2 and "post_article_choice" not in conditions)):
        raise SourceError("Experiment conditions are invalid")
    if version == 2:
        optional = data["optional_read"]
        if (not isinstance(optional, dict) or set(optional) != {"id", "title", "standfirst", "body"} or
                not all(isinstance(value, str) and value.strip() for value in optional.values()) or
                not _ID.fullmatch(optional["id"])):
            raise SourceError("Optional read fields are invalid")
    seen = set()
    for piece in data["beats"]:
        if not isinstance(piece, dict) or piece.get("kind") not in {"beat", "aside"}:
            raise SourceError("Experiment piece kind is invalid")
        if version == 2 and piece["kind"] != "beat":
            raise SourceError("Post-article experiment beats must contain only the article")
        required = {"id", "kind", "text"} if piece["kind"] == "beat" else {
            "id", "kind", "title", "standfirst", "body",
        }
        if set(piece) != required or not _ID.fullmatch(str(piece["id"])) or piece["id"] in seen:
            raise SourceError("Experiment piece fields or ID are invalid")
        if not all(isinstance(piece[key], str) and piece[key].strip() for key in required - {"id", "kind"}):
            raise SourceError("Experiment piece text must be nonempty")
        seen.add(piece["id"])
    if data["beats"][0]["kind"] != "beat" or data["beats"][-1]["kind"] != "beat":
        raise SourceError("Experiment must open and end with an ordinary beat")
    if version == 2 and data["optional_read"]["id"] in seen:
        raise SourceError("Optional read ID must be distinct from article beats")
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


def _validate_v3(data: dict) -> dict:
    if set(data) != {"version", "title", "promise", "sources", "route", "conditions"}:
        raise SourceError("Version 3 experiment manifest fields are invalid")
    if not all(isinstance(data[key], str) and data[key].strip() for key in ("title", "promise")):
        raise SourceError("Experiment title and promise must be nonempty")
    if not isinstance(data["sources"], list) or not isinstance(data["route"], list) or not data["route"]:
        raise SourceError("Experiment requires source records and an ordered route")
    seen: set[str] = set()
    route = [_validate_route_piece(piece, seen) for piece in data["route"]]
    if route[0]["kind"] != "beat" or route[-1]["kind"] != "beat":
        raise SourceError("Experiment route must open and end with an ordinary beat")
    conditions = data["conditions"]
    if not isinstance(conditions, list) or not conditions:
        raise SourceError("Experiment conditions are invalid")
    ids: set[str] = set()
    for condition in conditions:
        if (not isinstance(condition, dict) or set(condition) != {"id", "optional_reads"} or
                condition.get("id") not in {"core_only", "asides_in_flow", "optional_with_defer"} or
                condition.get("optional_reads") not in {"omit", "inline", "read_now_or_defer"} or
                condition["id"] in ids):
            raise SourceError("Version 3 condition policy is invalid")
        expected = {"core_only": "omit", "asides_in_flow": "inline",
                    "optional_with_defer": "read_now_or_defer"}[condition["id"]]
        if condition["optional_reads"] != expected:
            raise SourceError("Version 3 condition ID does not match its optional-read policy")
        ids.add(condition["id"])
    return data


def compile_experiment(data: dict) -> dict:
    """Compile legacy and current manifests into the canonical ordered route."""
    validate_experiment(data)
    if data["version"] == 3:
        route = [({**piece, "preview": piece.get("preview", ""),
                   "eyebrow": piece.get("eyebrow", ""),
                   "disclosure_label": piece.get("disclosure_label", "")} if piece["kind"] == "optional_read" else piece)
                 for piece in data["route"]]
        return {"version": 3, "title": data["title"], "promise": data["promise"],
                "sources": data["sources"], "route": route,
                "conditions": data["conditions"]}
    route = []
    for piece in data["beats"]:
        if piece["kind"] == "beat":
            route.append({"id": piece["id"], "kind": "beat", "text": piece["text"]})
        else:
            route.append({"id": piece["id"], "kind": "optional_read", "title": piece["title"],
                          "standfirst": piece["standfirst"], "reading_time": "unspecified",
                          "eyebrow": "", "preview": "", "disclosure_label": "", "body": piece["body"]})
    if data["version"] == 2:
        route.append({**data["optional_read"], "kind": "optional_read", "reading_time": "unspecified",
                      "eyebrow": "", "preview": "", "disclosure_label": ""})
        policies = [{"id": name, "optional_reads": name} for name in data["conditions"]]
    else:
        policies = [{"id": name, "optional_reads": name} for name in data["conditions"]]
    return {"version": data["version"], "title": data["title"], "promise": data["promise"],
            "sources": data["sources"], "route": route, "conditions": policies}


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
    decide_fn: Callable[[ReaderProfile, str, str, str, tuple[str, ...], int], Decision],
    max_calls: int,
    max_usd: float,
    progress: Callable[[str], None] | None = None,
    concurrency: int = 1,
) -> dict:
    """Run legacy or current authoring formats through one canonical route engine."""
    validate_experiment(experiment)
    if not profiles or max_calls < 1 or not 0 < max_usd < math.inf:
        raise ValueError("Experiment requires readers and positive finite limits")
    if not 1 <= concurrency <= 32:
        raise ValueError("Concurrency must be between 1 and 32")
    canonical = compile_experiment(experiment)
    if concurrency > 1 or inspect.iscoroutinefunction(decide_fn):
        return asyncio.run(_run_v3_async(canonical, profiles, decide_fn=decide_fn,
                                         max_calls=max_calls, max_usd=max_usd,
                                         concurrency=concurrency, progress=progress))
    return _run_v3(canonical, profiles, decide_fn=decide_fn, max_calls=max_calls,
                   max_usd=max_usd, progress=progress)


async def run_experiment_async(experiment: dict, profiles: tuple[ReaderProfile, ...], *,
                               decide_fn, max_calls: int, max_usd: float,
                               concurrency: int = 4, progress=None,
                               resume_checkpoint: dict | None = None,
                               checkpoint_path: Path | None = None) -> dict:
    validate_experiment(experiment)
    if not profiles or max_calls < 1 or not 0 < max_usd < math.inf or not 1 <= concurrency <= 32:
        raise ValueError("Experiment requires readers, finite limits and concurrency from 1 to 32")
    canonical = compile_experiment(experiment)
    return await _run_v3_async(canonical, profiles, decide_fn=decide_fn,
                               max_calls=max_calls, max_usd=max_usd,
                               concurrency=concurrency, progress=progress,
                               resume_checkpoint=resume_checkpoint, checkpoint_path=checkpoint_path)


def _run_v3(experiment: dict, profiles: tuple[ReaderProfile, ...], *, decide_fn,
            max_calls: int, max_usd: float, progress=None) -> dict:
    run_started = time.perf_counter()
    calls = 0
    cost = 0.0
    tokens = 0
    retries = 0
    latencies: list[float] = []
    stopped = False
    limits: list[str] = []
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
                nonlocal calls, cost, tokens, retries, stopped
                if calls >= max_calls:
                    limits.append("Maximum call count reached")
                    stopped = True
                    return None
                request_bytes = len(visible.encode("utf-8")) + sum(
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
                if cost + estimate * attempts > max_usd:
                    limits.append("Estimated spend cap reached before next request")
                    stopped = True
                    return None
                try:
                    request_started = time.perf_counter()
                    answer = decide_fn(profile, condition_id, stage, visible, choices, attempts)
                    latency_seconds = time.perf_counter() - request_started
                except DecisionError as error:
                    latency_seconds = time.perf_counter() - request_started
                    latencies.append(latency_seconds)
                    calls += error.attempts
                    retries += max(0, error.attempts - 1)
                    limits.append(f"Decision attempt failed: {error}")
                    stopped = True
                    return None
                if answer.choice not in choices or not 1 <= answer.attempts <= attempts:
                    raise ValueError("Experiment decision did not match offered choices or attempt limit")
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
                             f"calls {calls}, cost ${cost:.6f}")
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
    optional_summary = []
    for condition in experiment["conditions"]:
        for piece in experiment["route"]:
            if piece["kind"] != "optional_read":
                continue
            selected = [journey for journey in journeys
                        if journey["condition"] == condition["id"] and journey["completed"]]
            events = [event for journey in selected for event in journey["events"]
                      if event.get("item_id") == piece["id"]]
            def count(event_type: str, value_key: str | None = None, value: str | None = None) -> int:
                return sum(event["type"] == event_type and
                           (value_key is None or event.get(value_key) == value) for event in events)
            optional_summary.append({
                "condition": condition["id"], "aside_id": piece["id"],
                "eligible_journeys": len(selected),
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
            })
    return {"manifest_sha256": manifest_hash, "source_sha256": source_hashes,
            "cohort_sha256": cohort_hash,
            "conditions": [item["id"] for item in experiment["conditions"]],
            "journeys": journeys, "observations": observations,
            "optional_summary": optional_summary, "limitations": limits,
            "calls": calls, "cost_usd": cost, "input_tokens": tokens,
            "wall_time_seconds": round(time.perf_counter() - run_started, 6),
            "performance": _performance_summary(observations, latencies, retries, 1)}


async def _run_v3_async(experiment: dict, profiles: tuple[ReaderProfile, ...], *, decide_fn,
                        max_calls: int, max_usd: float, concurrency: int, progress=None,
                        resume_checkpoint: dict | None = None, checkpoint_path: Path | None = None) -> dict:
    """Run independent reader-condition journeys concurrently with reserved global caps."""
    run_started = time.perf_counter()
    semaphore = asyncio.Semaphore(concurrency)
    budget_lock = asyncio.Lock()
    budget = {"calls": 0, "reserved_calls": 0, "cost": 0.0, "reserved_cost": 0.0,
              "tokens": 0, "retries": 0, "latencies": [], "stopped": False,
              "active_requests": 0, "max_active_requests": 0}
    limits: list[str] = []
    source_hashes = [item["sha256"] for item in experiment["sources"]]
    final_beat_id = next(item["id"] for item in reversed(experiment["route"])
                         if item["kind"] == "beat")
    manifest_hash = hashlib.sha256(json.dumps(experiment, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    cohort_hash = hashlib.sha256(json.dumps([vars(p) for p in profiles], ensure_ascii=False,
                                           sort_keys=True).encode()).hexdigest()
    prompt_hash = hashlib.sha256(b"reader-panel-v3-prompts-2026-09").hexdigest()
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
            request_bytes = len(visible.encode("utf-8")) + sum(
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
                            if budget["cost"] + budget["reserved_cost"] + reserve_cost > max_usd:
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
                        result = await decide_fn(profile, condition_id, stage, visible, choices, attempts)
                    else:
                        result = await asyncio.to_thread(
                            decide_fn, profile, condition_id, stage, visible, choices, attempts)
                except DecisionError as error:
                    latency_seconds = time.perf_counter() - request_started
                    async with budget_lock:
                        budget["reserved_calls"] -= attempts
                        budget["reserved_cost"] -= reserve_cost
                        budget["active_requests"] -= 1
                        budget["calls"] += error.attempts
                        budget["retries"] += max(0, error.attempts - 1)
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
                        raise ValueError("Experiment decision did not match offered choices or attempt limit")
                    budget["calls"] += result.attempts
                    budget["retries"] += result.attempts - 1
                    budget["latencies"].append(latency_seconds)
                    budget["cost"] += result.cost_usd
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

        for piece in experiment["route"]:
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
                             if event["type"] == "body_opened" and event["origin"] == "inline"}
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
                answer = await ask("return-choice", ("open", "skip"), event_item=piece["id"])
                journey["return_choice"] = answer
                if answer == "open":
                    expose(piece["id"] + ":body-later", "optional_body", piece["body"])
                    events.append({"type": "body_opened", "item_id": piece["id"], "origin": "deferred_reoffer"})
                    answer = await ask("return-read", ATTENTION, event_item=piece["id"])
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
    journeys = [record["journey"] for record in completed.values()] + [
        journey for journey, _ in results if not journey["completed"]]
    observations = [item for record in completed.values() for item in record["observations"]]
    observations += [item for journey, local in results if not journey["completed"] for item in local]
    journeys.sort(key=lambda item: (next(n for n, p in enumerate(profiles) if p.id == item["reader"]),
                                    next(n for n, c in enumerate(experiment["conditions"])
                                         if c["id"] == item["condition"])))
    optional_summary = []
    for condition in experiment["conditions"]:
        for piece in experiment["route"]:
            if piece["kind"] != "optional_read":
                continue
            selected = [journey for journey in journeys if journey["condition"] == condition["id"] and
                        journey["completed"]]
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
                            for effect in POST_READ_EFFECT}})
    return {"manifest_sha256": manifest_hash, "source_sha256": source_hashes,
            "cohort_sha256": cohort_hash, "conditions": [c["id"] for c in experiment["conditions"]],
            "journeys": journeys, "observations": observations,
            "optional_summary": optional_summary, "limitations": limits,
            "calls": budget["calls"], "cost_usd": budget["cost"], "input_tokens": budget["tokens"],
            "checkpoint_fingerprint": fingerprint,
            "wall_time_seconds": round(time.perf_counter() - run_started, 6),
            "performance": _performance_summary(observations, budget["latencies"], budget["retries"],
                                                budget["max_active_requests"])}


def _performance_summary(observations: list[dict], latencies: list[float], retries: int,
                         max_active_requests: int) -> dict:
    return {"completed_decisions": len(observations), "wire_retries": retries,
            "max_active_requests": max_active_requests,
            "decision_latencies_seconds": [round(value, 6) for value in latencies]}

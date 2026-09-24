"""Execute agent-authored reading pieces with explicit aside exposure."""

from __future__ import annotations

import hashlib
import json
import math
import re
from pathlib import Path
from typing import Callable

from reader_panel_decisions import Decision, DecisionError
from reader_panel_source import ReaderProfile, SourceError


_ID = re.compile(r"^[a-z][a-z0-9-]{0,63}$")
CONDITIONS = {"omit", "closed", "force_open", "reader_choice"}
ATTENTION = ("read_closely", "skim", "leave_lost_interest", "stop_satisfied")
ASIDE_CHOICE = ("open_now", "return_later", "skip")
RETURN_CHOICE = ("open", "skip")
MAX_EXPERIMENT_BYTES = 200_000
MAX_VISIBLE_BYTES = 80_000
PRICE_PER_MILLION_INPUT_TOKENS = 0.042


def validate_experiment(data: dict) -> dict:
    if not isinstance(data, dict) or set(data) != {
        "version", "title", "promise", "sources", "beats", "conditions",
    } or type(data["version"]) is not int or data["version"] != 1:
        raise SourceError("Experiment manifest requires version 1 and the declared fields")
    if not all(isinstance(data[key], str) and data[key].strip() for key in ("title", "promise")):
        raise SourceError("Experiment title and promise must be nonempty")
    if not isinstance(data["sources"], list) or not isinstance(data["beats"], list) or not data["beats"]:
        raise SourceError("Experiment requires source records and reading beats")
    conditions = data["conditions"]
    if (not isinstance(conditions, list) or not conditions or
            any(not isinstance(item, str) for item in conditions) or
            len(set(conditions)) != len(conditions) or set(conditions) - CONDITIONS):
        raise SourceError("Experiment conditions are invalid")
    seen = set()
    for piece in data["beats"]:
        if not isinstance(piece, dict) or piece.get("kind") not in {"beat", "aside"}:
            raise SourceError("Experiment piece kind is invalid")
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
    if sum(piece["kind"] == "aside" for piece in data["beats"]) > 1:
        raise SourceError("Experiment currently supports one optional aside")
    return data


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
) -> dict:
    validate_experiment(experiment)
    if not profiles or max_calls < 1 or not 0 < max_usd < math.inf:
        raise ValueError("Experiment requires readers and positive finite limits")
    calls = 0
    cost = 0.0
    tokens = 0
    observations: list[dict] = []
    journeys: list[dict] = []
    limits: list[str] = []
    stopped = False
    source_hashes = [item["sha256"] for item in experiment["sources"]]
    manifest_hash = hashlib.sha256(json.dumps(experiment, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    cohort_hash = hashlib.sha256(json.dumps([vars(p) for p in profiles], ensure_ascii=False,
                                           sort_keys=True).encode()).hexdigest()

    for reader_number, profile in enumerate(profiles, 1):
        if stopped:
            break
        for condition in experiment["conditions"]:
            if stopped:
                break
            visible = ""
            pending: list[tuple[str, str, str, str]] = []
            journey = {"reader": profile.id, "archetype": profile.archetype_id,
                       "condition": condition, "aside_choice": None, "return_choice": None,
                       "reached_aside": False, "reached_end": False, "terminal": None,
                       "exposed_pieces": []}
            if progress:
                progress(f"{condition}: reader {reader_number}/{len(profiles)}, calls {calls}, cost ${cost:.6f}")

            def ask(stage: str, choices: tuple[str, ...]) -> str | None:
                nonlocal calls, cost, tokens, stopped
                if calls >= max_calls:
                    limits.append("Maximum call count reached")
                    stopped = True
                    return None
                request_bytes = len(visible.encode("utf-8")) + sum(
                    len(value.encode("utf-8")) for value in (
                        profile.arrival_intent, profile.background, profile.desired_payoff,
                        profile.drawn_in_by, profile.put_off_by, experiment["title"],
                        experiment["promise"],
                    )
                ) + 1_000
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
                    result = decide_fn(profile, condition, stage, visible, choices, attempts)
                except DecisionError as error:
                    calls += error.attempts
                    limits.append(f"Decision attempt failed: {error}")
                    stopped = True
                    return None
                if result.choice not in choices or not 1 <= result.attempts <= attempts:
                    raise ValueError("Experiment decision did not match offered choices or attempt limit")
                calls += result.attempts
                cost += result.cost_usd
                tokens += result.input_tokens or 0
                observations.append({"reader": profile.id, "archetype": profile.archetype_id,
                                     "condition": condition, "stage": stage, "choice": result.choice,
                                     "probabilities": result.probabilities, "cost_usd": result.cost_usd,
                                     "input_tokens": result.input_tokens, "model": result.model,
                                     "attempts": result.attempts})
                if progress:
                    progress(f"{condition}: reader {reader_number}/{len(profiles)}, {stage}, "
                             f"calls {calls}, cost ${cost:.6f}")
                if cost >= max_usd:
                    limits.append("Reported spend reached the cap")
                    stopped = True
                return result.choice

            def attention(stage: str) -> bool:
                answer = ask(stage, ATTENTION)
                if answer in {"leave_lost_interest", "stop_satisfied"}:
                    journey["terminal"] = answer
                    return False
                return answer is not None and not stopped

            for piece in experiment["beats"]:
                if stopped or journey["terminal"]:
                    break
                if piece["kind"] == "beat":
                    visible += f"\n\n{piece['text']}"
                    journey["exposed_pieces"].append(piece["id"])
                    if piece is experiment["beats"][-1]:
                        journey["reached_end"] = True
                    if not attention(piece["id"]):
                        break
                    continue
                if condition == "omit":
                    continue
                journey["reached_aside"] = True
                visible += f"\n\n{piece['title']}\n{piece['standfirst']}"
                journey["exposed_pieces"].append(piece["id"] + ":invitation")
                if condition == "reader_choice":
                    answer = ask("aside-choice", ASIDE_CHOICE)
                    journey["aside_choice"] = answer
                    if answer is None or stopped:
                        break
                    if answer == "return_later":
                        pending.append((piece["id"], piece["title"], piece["standfirst"], piece["body"]))
                    if answer == "open_now":
                        visible += f"\n\n{piece['body']}"
                        journey["exposed_pieces"].append(piece["id"] + ":body")
                elif condition == "force_open":
                    visible += f"\n\n{piece['body']}"
                    journey["exposed_pieces"].append(piece["id"] + ":body")
                if not attention("aside-read" if piece["id"] + ":body" in journey["exposed_pieces"] else "aside-closed"):
                    break
            if (not stopped and journey["reached_end"] and
                    journey["terminal"] != "leave_lost_interest"):
                for aside_id, title, standfirst, body in pending:
                    visible += f"\n\nEarlier optional detail: {title}\n{standfirst}\nRead it now or skip it."
                    answer = ask("return-choice", RETURN_CHOICE)
                    journey["return_choice"] = answer
                    if answer is None or stopped:
                        break
                    if answer == "open":
                        visible += f"\n\n{body}"
                        journey["exposed_pieces"].append(aside_id + ":body-later")
                        if not attention("return-read"):
                            break
            journeys.append(journey)
    return {"manifest_sha256": manifest_hash, "source_sha256": source_hashes,
            "cohort_sha256": cohort_hash, "conditions": experiment["conditions"],
            "journeys": journeys, "observations": observations, "limitations": limits,
            "calls": calls, "cost_usd": cost, "input_tokens": tokens}

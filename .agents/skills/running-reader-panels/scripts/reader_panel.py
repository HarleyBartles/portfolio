"""Opt-in, bounded simulated-reader panel for local editorial diagnosis."""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import os
import statistics
import subprocess
import sys
import time
from dataclasses import asdict, replace
from pathlib import Path
from typing import Callable, Mapping
from uuid import uuid4

from reader_panel_decisions import (Decision, DecisionClient, DecisionError, build_request,
                                    render_experiment_request)
from reader_panel_report import Observation, PanelReport, render_panel, write_report
from reader_panel_source import Article, Beat, ReaderProfile, SourceError, load_profiles, parse_article, validate_cohort
from reader_panel_experiment import (compile_experiment, load_experiment, run_experiment,
                                     run_experiment_async)


REPO_ROOT = Path(__file__).resolve().parents[4]
ARTICLE_ROOT = REPO_ROOT / "src/client/src/data/content/writing"
ARCHETYPE_POOL = Path(__file__).resolve().parents[1] / "assets/reader-archetypes.json"
WORKSPACE_SCRIPT = REPO_ROOT / ".agents/skills/subagent-workspace/scripts/workspace.py"
PRICE_PER_MILLION_INPUT_TOKENS = 0.042
MAX_REQUEST_BYTES = 80_000
CHOICE_LABELS = {
    "read_closely": "Continue reading attentively",
    "skim": "Continue by skimming",
    "leave_lost_interest": "Leave because interest or relevance was lost",
    "stop_satisfied": "Stop because the reader's goal was met",
    "open_now": "Open and read the aside inline now",
    "return_later": "Continue and consider returning at the end",
    "read_now": "Read this optional piece now, then continue the article",
    "defer_to_end": "Continue with the article and choose whether to read it at the end",
    "skip": "Skip the optional reading",
    "open": "Open and read the aside now",
    "read": "Read this optional piece now",
    "increased": "The optional reading increased satisfaction with the article for this reader's original goal",
    "maintained": "The optional reading maintained satisfaction with the article for this reader's original goal",
    "decreased": "The optional reading decreased satisfaction with the article for this reader's original goal",
}


def _labels(choices: tuple[str, ...]) -> dict[str, str]:
    return {choice: CHOICE_LABELS[choice] for choice in choices}


class PanelError(ValueError):
    """A panel run is invalid or exceeds its explicit operating boundary."""


def _payload_size(profile: ReaderProfile, article: Article, beat: Beat) -> int:
    return len(json.dumps(build_request(profile, article, beat), ensure_ascii=False).encode("utf-8"))


def estimate_cost(profile: ReaderProfile, article: Article, beat: Beat) -> float:
    """Approximate only: one input token per four UTF-8 bytes."""
    return (_payload_size(profile, article, beat) / 4) * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000


def run_panel(
    articles: tuple[Article, ...],
    profiles: tuple[ReaderProfile, ...],
    *,
    decide_fn: Callable[[ReaderProfile, Article, Beat, int], Decision],
    max_calls: int,
    max_usd: float,
    progress: Callable[[str], None] | None = None,
) -> PanelReport:
    if not articles or not profiles or max_calls < 1 or not 0 < max_usd < float("inf"):
        raise PanelError("A panel requires articles, profiles and positive finite call/spend limits")
    observations: list[Observation] = []
    limitations: list[str] = []
    calls = 0
    cost = 0.0
    tokens = 0
    stopped = False
    for article in articles:
        if stopped:
            break
        for reader_number, profile in enumerate(profiles, 1):
            if stopped:
                break
            if progress:
                progress(f"{article.path.name}: reader {reader_number}/{len(profiles)}, "
                         f"calls {calls}, cost ${cost:.6f}")
            for beat in article.beats:
                if calls >= max_calls:
                    limitations.append("Maximum call count reached; remaining decisions were not requested")
                    stopped = True
                    break
                if _payload_size(profile, article, beat) > MAX_REQUEST_BYTES:
                    limitations.append("A request exceeded the 80 KB state limit; remaining decisions were not requested")
                    stopped = True
                    break
                remaining_calls = max_calls - calls
                max_attempts = min(3, remaining_calls)
                if cost + estimate_cost(profile, article, beat) * max_attempts > max_usd:
                    limitations.append("Estimated spend cap reached before the next request")
                    stopped = True
                    break
                try:
                    result = decide_fn(profile, article, beat, max_attempts)
                except DecisionError as error:
                    calls += error.attempts
                    limitations.append(f"Decision attempt failed: {error}; remaining decisions were not requested")
                    stopped = True
                    break
                if not 1 <= result.attempts <= max_attempts:
                    raise PanelError("Decision transport reported an invalid attempt count")
                calls += result.attempts
                cost += result.cost_usd
                tokens += result.input_tokens or 0
                observations.append(Observation(
                    article.sha256, article.path.name, beat.index, beat.heading,
                    profile.id, result.choice, result.probabilities,
                    result.cost_usd, result.input_tokens, result.model, profile.archetype_id,
                ))
                if progress:
                    progress(f"{article.path.name}: reader {reader_number}/{len(profiles)}, "
                             f"{beat.heading}, calls {calls}, cost ${cost:.6f}")
                if cost >= max_usd:
                    limitations.append("Reported spend reached the cap; remaining decisions were not requested")
                    stopped = True
                    break
                if result.choice in {"leave_lost_interest", "stop_satisfied"}:
                    break
    article_summaries = tuple({
        "name": article.path.name,
        "sha256": article.sha256,
        "beats": tuple({"index": beat.index, "heading": beat.heading} for beat in article.beats),
    } for article in articles)
    cohort_sizes: dict[str, int] = {}
    for profile in profiles:
        if profile.archetype_id:
            cohort_sizes[profile.archetype_id] = cohort_sizes.get(profile.archetype_id, 0) + 1
    cohort_bytes = json.dumps([asdict(profile) for profile in profiles], ensure_ascii=False,
                              sort_keys=True, separators=(",", ":")).encode("utf-8")
    return PanelReport(
        article_summaries, tuple(observations), tuple(limitations), calls, cost,
        tokens, len(articles) == 2 and len(articles[0].beats) == len(articles[1].beats),
        cohort_sizes, hashlib.sha256(cohort_bytes).hexdigest(),
    )


def _workspace() -> Path:
    result = subprocess.run(
        [sys.executable, str(WORKSPACE_SCRIPT), "--apply"],
        cwd=REPO_ROOT, capture_output=True, text=True, encoding="utf-8", check=False,
    )
    if result.returncode != 0:
        raise PanelError("Could not resolve the canonical off-repo scratch workspace")
    return Path(result.stdout.strip()).resolve()


def _source(path: str, allow_external: bool) -> Article:
    source = Path(path).resolve()
    if not source.is_file() or source.suffix.lower() != ".md":
        raise PanelError("Article source must be a local Markdown file")
    if not allow_external and not source.is_relative_to(ARTICLE_ROOT.resolve()):
        raise PanelError("External article source requires --allow-external-source")
    return parse_article(source)


def main(
    argv: list[str] | None = None,
    *,
    environ: Mapping[str, str] | None = None,
    decision_fn: Callable[..., Decision] | None = None,
    workspace_resolver: Callable[[], Path] | None = None,
) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
    parser = argparse.ArgumentParser(description=__doc__)
    source_mode = parser.add_mutually_exclusive_group(required=True)
    source_mode.add_argument("--article")
    source_mode.add_argument("--experiment-file", type=Path)
    parser.add_argument("--compare")
    parser.add_argument("--profile-file", type=Path, required=True)
    parser.add_argument("--profiles", help="Comma-separated profile IDs")
    parser.add_argument("--max-calls", type=int)
    parser.add_argument("--max-usd", type=float)
    parser.add_argument("--allow-external-source", action="store_true")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--concurrency", type=int,
                        help="Maximum concurrent journeys for experiment manifests (default: 4; flat article mode is serial)")
    parser.add_argument("--resume", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    mode.add_argument("--trace-choices", type=Path,
                      help="Run a scripted, zero-network route trace from a JSON choice script")
    args = parser.parse_args(argv)
    concurrency = 4 if args.concurrency is None else args.concurrency
    if not 1 <= concurrency <= 32:
        raise PanelError("--concurrency must be between 1 and 32")
    if args.article and args.concurrency is not None and concurrency != 1:
        raise PanelError("--concurrency applies only to experiment manifests; flat article mode is serial")
    if args.experiment_file and args.compare:
        raise PanelError("--compare applies only to article mode")
    if args.trace_choices and not args.experiment_file:
        raise PanelError("--trace-choices requires --experiment-file")
    experiment = load_experiment(args.experiment_file) if args.experiment_file else None
    if args.resume and (not args.apply or not experiment or experiment["version"] != 3):
        raise PanelError("--resume requires --apply with a version 3 experiment")
    compiled_experiment = compile_experiment(experiment) if experiment else None
    articles = () if experiment else (_source(args.article, args.allow_external_source),)
    if args.compare:
        articles += (_source(args.compare, args.allow_external_source),)
    ids = tuple(item.strip() for item in args.profiles.split(",")) if args.profiles else None
    catalogue_read = args.profile_file.resolve() == ARCHETYPE_POOL.resolve()
    profiles = load_profiles(args.profile_file, ids, max_profiles=None if catalogue_read else 100)
    if catalogue_read:
        profiles = tuple(replace(profile, archetype_id=profile.id) for profile in profiles)
    validate_cohort(profiles, {profile.id for profile in load_profiles(ARCHETYPE_POOL, None, max_profiles=None)})
    if experiment and experiment["version"] == 2:
        calls_per_profile = (len(experiment["beats"]) * len(experiment["conditions"]) +
                             2 * ("post_article_choice" in experiment["conditions"]))
    elif experiment and experiment["version"] == 3:
        route = compiled_experiment["route"]
        core_count = sum(piece["kind"] == "beat" for piece in route)
        optional_count = sum(piece["kind"] == "optional_read" for piece in route)
        calls_per_profile = sum(
            core_count + optional_count * ({"omit": 0, "inline": 2, "read_now_or_defer": 4}[
                condition["optional_reads"]])
            for condition in compiled_experiment["conditions"]
        )
    elif experiment:
        calls_per_profile = len(experiment["conditions"]) * (
            len(experiment["beats"]) + 3 * sum(p["kind"] == "aside" for p in experiment["beats"]))
    planned = (len(profiles) * calls_per_profile if experiment else
               len(profiles) * sum(len(article.beats) for article in articles))
    if experiment and experiment["version"] == 3:
        full_text = "\n\n".join(
            piece["text"] if piece["kind"] == "beat" else
            "\n".join((piece.get("eyebrow", ""), piece["title"], piece["standfirst"],
                        piece["reading_time"], piece.get("preview", ""),
                        piece.get("disclosure_label", ""), piece["body"]))
            for piece in compiled_experiment["route"]
        )
        estimated_bytes = sum(
            len(json.dumps({"reader": asdict(profile), "title": experiment["title"],
                            "promise": experiment["promise"], "visible_text": full_text},
                           ensure_ascii=False).encode("utf-8")) * calls_per_profile
            for profile in profiles
        )
    elif experiment:
        full_text = "\n\n".join(
            piece["text"] if piece["kind"] == "beat" else
            "\n".join((piece["title"], piece["standfirst"], piece["body"]))
            for piece in experiment["beats"]
        )
        if experiment["version"] == 2:
            optional = experiment["optional_read"]
            full_text += "\n\n" + "\n".join(
                (optional["title"], optional["standfirst"], optional["body"]))
        estimated_bytes = sum(
            len(json.dumps({"reader": asdict(profile), "title": experiment["title"],
                            "promise": experiment["promise"], "visible_text": full_text},
                           ensure_ascii=False).encode("utf-8")) * calls_per_profile
            for profile in profiles
        )
    else:
        estimated_bytes = sum(_payload_size(profile, article, beat)
                              for article in articles for profile in profiles for beat in article.beats)
    estimated_tokens = estimated_bytes / 4
    estimated = estimated_tokens * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000
    if args.trace_choices:
        if not experiment:
            raise PanelError("--trace-choices requires an experiment manifest")
        try:
            script = json.loads(args.trace_choices.read_text(encoding="utf-8"))
            choices_data = script["choices"]
            if not isinstance(choices_data, list):
                raise ValueError
            scripted = {}
            for item in choices_data:
                key = (item["reader"], item["condition"], item["stage"])
                if set(item) != {"reader", "condition", "stage", "choice"} or key in scripted:
                    raise ValueError
                scripted[key] = item["choice"]
        except (OSError, UnicodeError, json.JSONDecodeError, KeyError, TypeError, ValueError):
            raise PanelError("Choice script must contain unique reader/condition/stage choices") from None
        trace_requests = []

        def trace_decision(profile, condition, stage, visible, choices, attempts):
            key = (profile.id, condition, stage)
            choice = scripted.pop(key, None)
            if choice not in choices:
                raise PanelError(f"Choice script lacks a valid choice for {profile.id}/{condition}/{stage}")
            trace_requests.append({"reader": profile.id, "condition": condition, "stage": stage,
                                  "offered_choices": list(choices),
                                  "request": render_experiment_request(
                                      profile, experiment["title"], experiment["promise"], visible,
                                      stage, _labels(choices))})
            return Decision(choice, {choice: 1.0}, 0.0, 0, "typesafe/jev-1.13-20260917")

        trace_report = run_experiment(experiment, profiles, decide_fn=trace_decision,
                                      max_calls=max(1, len(scripted)), max_usd=1.0, concurrency=1)
        if scripted:
            raise PanelError("Choice script contains choices for branches the journey did not reach")
        if any(not journey["completed"] for journey in trace_report["journeys"]):
            raise PanelError("Choice script did not complete every selected reader-condition journey")
        print(json.dumps({"requests": trace_requests, "report": trace_report}, ensure_ascii=False, indent=2))
        print("0 remote calls; requests rendered by the same builder used by the SDK client.")
        return 0
    if not args.apply:
        if experiment and experiment["version"] == 3:
            print("Experiment: " + ", ".join(item["id"] for item in compiled_experiment["conditions"]))
            print("Route: " + ", ".join(
                piece["id"] + (" (optional read)" if piece["kind"] == "optional_read" else "")
                for piece in compiled_experiment["route"]))
        elif experiment:
            print("Experiment: " + ", ".join(experiment["conditions"]))
            print("Beats: " + ", ".join(piece["id"] for piece in experiment["beats"]))
            if experiment["version"] == 2:
                print("Optional read after article: " + experiment["optional_read"]["id"])
        for article in articles:
            print(f"{article.path.name}: {len(article.beats)} beats: " +
                  ", ".join(beat.heading for beat in article.beats))
            if article.asides:
                print("Inline asides excluded from core beats: " +
                      ", ".join(item["id"] for item in article.asides))
        allocation: dict[str, int] = {}
        for profile in profiles:
            if profile.archetype_id:
                allocation[profile.archetype_id] = allocation.get(profile.archetype_id, 0) + 1
        if allocation:
            print("Allocation: " + ", ".join(f"{name}: {count}" for name, count in sorted(allocation.items())))
        print(f"{len(profiles)} profiles; up to {planned} decisions; approximately {estimated_tokens:,.0f} input tokens and ${estimated:.6f} input cost")
        print("0 remote calls. --apply sends visible text to OpenRouter; cost and token counts are estimates, not billing guarantees.")
        return 0
    if args.max_calls is None or args.max_usd is None or args.max_calls < 1 or not 0 < args.max_usd < float("inf"):
        raise PanelError("--apply requires positive --max-calls and finite --max-usd limits")
    env = environ if environ is not None else os.environ
    api_key = env.get("OPENROUTER_API_KEY")
    if not api_key:
        raise PanelError("--apply requires OPENROUTER_API_KEY in the process environment")
    workspace = (workspace_resolver or _workspace)().resolve()
    output = args.output.resolve() if args.output else None
    if output and (not args.output.is_absolute() or not output.is_relative_to(workspace)):
        raise PanelError("--output must be an absolute path inside the canonical off-repo scratch workspace")
    if args.resume and (not args.resume.is_absolute() or not args.resume.resolve().is_relative_to(workspace)):
        raise PanelError("--resume must name a checkpoint inside the canonical off-repo scratch workspace")
    resume_checkpoint = None
    if args.resume:
        try:
            resume_checkpoint = json.loads(args.resume.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError):
            raise PanelError("--resume checkpoint must be readable UTF-8 JSON") from None
    saved = output or workspace / (
        f"reader-experiment-resumed-{uuid4().hex}.json" if args.resume else
        f"reader-experiment-{uuid4().hex}.json")
    checkpoint_path = args.resume or saved.with_name(saved.stem + ".partial.json")
    last_progress = 0.0
    def progress(message: str) -> None:
        nonlocal last_progress
        now = time.monotonic()
        if now - last_progress >= 5:
            print(f"Panel progress: {message}", file=sys.stderr, flush=True)
            last_progress = now
    if experiment:
        def run(decide):
            return run_experiment(experiment, profiles, decide_fn=decide,
                                  max_calls=args.max_calls, max_usd=args.max_usd, progress=progress,
                                  concurrency=concurrency)

        if decision_fn is not None and experiment["version"] == 3:
            async def fake_async(*args):
                return await asyncio.to_thread(decision_fn, *args)
            try:
                experiment_report = asyncio.run(run_experiment_async(
                    experiment, profiles, decide_fn=fake_async,
                    max_calls=args.max_calls, max_usd=args.max_usd,
                    concurrency=concurrency, progress=progress,
                    resume_checkpoint=resume_checkpoint, checkpoint_path=checkpoint_path))
            except ValueError as error:
                raise PanelError(str(error)) from None
        elif decision_fn is not None:
            experiment_report = run(decision_fn)
        else:
            async def apply_async():
                async with DecisionClient(api_key) as client:
                    async def decide_stage(profile, condition, stage, visible, choices, attempts):
                        return await client.decide_experiment_async(
                            profile, experiment["title"], experiment["promise"], visible,
                            stage, _labels(choices), attempts)
                    return await run_experiment_async(
                        experiment, profiles, decide_fn=decide_stage,
                        max_calls=args.max_calls, max_usd=args.max_usd,
                        concurrency=concurrency, progress=progress,
                        resume_checkpoint=resume_checkpoint,
                        checkpoint_path=checkpoint_path)
            try:
                experiment_report = asyncio.run(apply_async())
            except ValueError as error:
                raise PanelError(str(error)) from None
        saved.parent.mkdir(parents=True, exist_ok=True)
        with saved.open("x", encoding="utf-8") as handle:
            json.dump(experiment_report, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        expected_journeys = len(profiles) * len(compiled_experiment["conditions"])
        if (experiment["version"] == 3 and
                sum(item.get("completed") is True for item in experiment_report["journeys"]) == expected_journeys):
            checkpoint_path.unlink(missing_ok=True)
        print(f"Experiment: {len(experiment_report['journeys'])} journeys, "
              f"{experiment_report['calls']} calls, ${experiment_report['cost_usd']:.8f} reported cost.")
        performance = experiment_report["performance"]
        latencies = sorted(performance["decision_latencies_seconds"])
        if latencies:
            p95_index = min(len(latencies) - 1, (95 * len(latencies) + 99) // 100 - 1)
            print(f"Performance: {experiment_report['wall_time_seconds']:.2f}s elapsed, "
                  f"{performance['wire_retries']} retries, peak {performance['max_active_requests']} active, "
                  f"decision latency median {statistics.median(latencies):.2f}s / "
                  f"p95 {latencies[p95_index]:.2f}s.")
        print(f"Report: {saved}")
        if checkpoint_path.exists():
            print(f"Checkpoint: {checkpoint_path}")
        return 0
    if decision_fn is not None:
        report = run_panel(articles, profiles, decide_fn=decision_fn,
                           max_calls=args.max_calls, max_usd=args.max_usd, progress=progress)
    else:
        with DecisionClient(api_key) as client:
            report = run_panel(articles, profiles, decide_fn=client.decide,
                               max_calls=args.max_calls, max_usd=args.max_usd, progress=progress)
    try:
        saved = write_report(report, workspace, output)
    except (OSError, ValueError):
        raise PanelError("Could not save the off-repo panel report") from None
    print(render_panel(report))
    print(f"Report: {saved}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (PanelError, SourceError) as error:
        print(f"reader panel: {error}", file=sys.stderr)
        raise SystemExit(2) from None

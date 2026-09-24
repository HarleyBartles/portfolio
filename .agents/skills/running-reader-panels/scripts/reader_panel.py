"""Opt-in, bounded simulated-reader panel for local editorial diagnosis."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
import sys
import time
from dataclasses import asdict, replace
from pathlib import Path
from typing import Callable, Mapping
from uuid import uuid4

from reader_panel_decisions import Decision, DecisionClient, DecisionError, build_request
from reader_panel_report import Observation, PanelReport, render_panel, write_report
from reader_panel_source import Article, Beat, ReaderProfile, SourceError, load_profiles, parse_article, validate_cohort
from reader_panel_experiment import load_experiment, run_experiment


REPO_ROOT = Path(__file__).resolve().parents[4]
ARTICLE_ROOT = REPO_ROOT / "src/client/src/data/content/writing"
ARCHETYPE_POOL = Path(__file__).resolve().parents[1] / "assets/reader-archetypes.json"
WORKSPACE_SCRIPT = REPO_ROOT / ".agents/skills/subagent-workspace/scripts/workspace.py"
PRICE_PER_MILLION_INPUT_TOKENS = 0.042
MAX_REQUEST_BYTES = 80_000


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
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    args = parser.parse_args(argv)
    if args.experiment_file and args.compare:
        raise PanelError("--compare applies only to article mode")
    experiment = load_experiment(args.experiment_file) if args.experiment_file else None
    articles = () if experiment else (_source(args.article, args.allow_external_source),)
    if args.compare:
        articles += (_source(args.compare, args.allow_external_source),)
    ids = tuple(item.strip() for item in args.profiles.split(",")) if args.profiles else None
    catalogue_read = args.profile_file.resolve() == ARCHETYPE_POOL.resolve()
    profiles = load_profiles(args.profile_file, ids, max_profiles=None if catalogue_read else 100)
    if catalogue_read:
        profiles = tuple(replace(profile, archetype_id=profile.id) for profile in profiles)
    validate_cohort(profiles, {profile.id for profile in load_profiles(ARCHETYPE_POOL, None, max_profiles=None)})
    planned = (len(profiles) * len(experiment["conditions"]) *
               (len(experiment["beats"]) + 2 * sum(p["kind"] == "aside" for p in experiment["beats"]))
               if experiment else len(profiles) * sum(len(article.beats) for article in articles))
    if experiment:
        full_text = "\n\n".join(
            piece["text"] if piece["kind"] == "beat" else
            "\n".join((piece["title"], piece["standfirst"], piece["body"]))
            for piece in experiment["beats"]
        )
        estimated_bytes = sum(
            len(json.dumps({"reader": asdict(profile), "title": experiment["title"],
                            "promise": experiment["promise"], "visible_text": full_text},
                           ensure_ascii=False).encode("utf-8")) * (
                               len(experiment["beats"]) + 2 * sum(
                                   piece["kind"] == "aside" for piece in experiment["beats"]
                               )
                           ) * len(experiment["conditions"])
            for profile in profiles
        )
    else:
        estimated_bytes = sum(_payload_size(profile, article, beat)
                              for article in articles for profile in profiles for beat in article.beats)
    estimated_tokens = estimated_bytes / 4
    estimated = estimated_tokens * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000
    if not args.apply:
        if experiment:
            print("Experiment: " + ", ".join(experiment["conditions"]))
            print("Beats: " + ", ".join(piece["id"] for piece in experiment["beats"]))
        for article in articles:
            print(f"{article.path.name}: {len(article.beats)} beats: " +
                  ", ".join(beat.heading for beat in article.beats))
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
    last_progress = 0.0
    def progress(message: str) -> None:
        nonlocal last_progress
        now = time.monotonic()
        if now - last_progress >= 5:
            print(f"Panel progress: {message}", file=sys.stderr, flush=True)
            last_progress = now
    if experiment:
        def labels(choices: tuple[str, ...]) -> dict[str, str]:
            names = {
                "read_closely": "Continue reading attentively",
                "skim": "Continue by skimming",
                "leave_lost_interest": "Leave because interest or relevance was lost",
                "stop_satisfied": "Stop because the reader's goal was met",
                "open_now": "Open and read the aside inline now",
                "return_later": "Continue and consider returning at the end",
                "skip": "Skip the aside",
                "open": "Open and read the aside now",
            }
            return {choice: names[choice] for choice in choices}

        def run(decide):
            return run_experiment(experiment, profiles, decide_fn=decide,
                                  max_calls=args.max_calls, max_usd=args.max_usd, progress=progress)

        if decision_fn is not None:
            experiment_report = run(decision_fn)
        else:
            with DecisionClient(api_key) as client:
                experiment_report = run(
                    lambda profile, condition, stage, visible, choices, attempts:
                    client.decide_experiment(profile, experiment["title"], experiment["promise"],
                                             visible, stage, labels(choices), attempts))
        saved = output or workspace / f"reader-experiment-{uuid4().hex}.json"
        saved.parent.mkdir(parents=True, exist_ok=True)
        with saved.open("x", encoding="utf-8") as handle:
            json.dump(experiment_report, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        print(f"Experiment: {len(experiment_report['journeys'])} journeys, "
              f"{experiment_report['calls']} calls, ${experiment_report['cost_usd']:.8f} reported cost.")
        print(f"Report: {saved}")
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

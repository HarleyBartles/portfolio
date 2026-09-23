"""Opt-in, bounded simulated-reader panel for local editorial diagnosis."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Callable, Mapping

from reader_panel_decisions import Decision, DecisionError, build_request, decide
from reader_panel_report import Observation, PanelReport, render_panel, write_report
from reader_panel_source import Article, Beat, ReaderProfile, SourceError, load_profiles, parse_article


REPO_ROOT = Path(__file__).resolve().parents[4]
ARTICLE_ROOT = REPO_ROOT / "src/client/src/data/content/writing"
DEFAULT_PROFILES = Path(__file__).resolve().parents[1] / "assets/reader-intents.json"
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
        for profile in profiles:
            if stopped:
                break
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
                    result.cost_usd, result.input_tokens, result.model,
                ))
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
    return PanelReport(
        article_summaries, tuple(observations), tuple(limitations), calls, cost,
        tokens, len(articles) == 2 and len(articles[0].beats) == len(articles[1].beats),
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
    decision_fn: Callable[[ReaderProfile, Article, Beat, int], Decision] | None = None,
    workspace_resolver: Callable[[], Path] | None = None,
) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--article", required=True)
    parser.add_argument("--compare")
    parser.add_argument("--profile-file", type=Path, default=DEFAULT_PROFILES)
    parser.add_argument("--profiles", help="Comma-separated profile IDs")
    parser.add_argument("--max-calls", type=int)
    parser.add_argument("--max-usd", type=float)
    parser.add_argument("--allow-external-source", action="store_true")
    parser.add_argument("--output", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    args = parser.parse_args(argv)
    articles = (_source(args.article, args.allow_external_source),)
    if args.compare:
        articles += (_source(args.compare, args.allow_external_source),)
    ids = tuple(item.strip() for item in args.profiles.split(",")) if args.profiles else None
    profiles = load_profiles(args.profile_file, ids)
    planned = len(profiles) * sum(len(article.beats) for article in articles)
    estimated_bytes = sum(_payload_size(profile, article, beat)
                          for article in articles for profile in profiles for beat in article.beats)
    estimated_tokens = estimated_bytes / 4
    estimated = estimated_tokens * PRICE_PER_MILLION_INPUT_TOKENS / 1_000_000
    if not args.apply:
        for article in articles:
            print(f"{article.path.name}: {len(article.beats)} beats: " +
                  ", ".join(beat.heading for beat in article.beats))
        print(f"{len(profiles)} profiles; up to {planned} decisions; approximately {estimated_tokens:,.0f} input tokens and ${estimated:.6f} input cost")
        print("0 remote calls. --apply sends article prefixes to OpenRouter; cost and token counts are estimates, not billing guarantees.")
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
    choose = decision_fn or (lambda profile, article, beat, attempts: decide(
        profile, article, beat, api_key=api_key, max_attempts=attempts))
    report = run_panel(articles, profiles, decide_fn=choose, max_calls=args.max_calls, max_usd=args.max_usd)
    try:
        saved = write_report(report, workspace, output)
    except (OSError, ValueError) as error:
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

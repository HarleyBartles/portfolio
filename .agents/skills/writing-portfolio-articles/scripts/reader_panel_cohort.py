"""Create one reusable, off-repo 100-reader experimental cohort from ten rich archetypes."""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import asdict, replace
from pathlib import Path
from typing import Callable

from reader_panel import _workspace
from reader_panel_source import ReaderProfile, SourceError, load_profiles


DEFAULT_ARCHETYPES = Path(__file__).resolve().parents[1] / "assets/reader-intents-rich.json"

# Each lens changes how a reader approaches the article, not the choice they should make.
LENSES = (
    ("A clear stake early earns more of this reader's time.", "A prolonged opening without a stake tests their patience."),
    ("They will follow a slow causal build when each step changes their understanding.", "A premature takeaway feels like the article skipped the interesting work."),
    ("Observed evidence that could disprove the claim keeps them engaged.", "Unsupported certainty makes them distrust the next claim."),
    ("They want to see how the relevant parts interact, not just their names.", "A causal leap hidden behind technical nouns loses them."),
    ("Constraints they could recognise in their own work make the lesson useful.", "Advice that ignores adoption cost feels detached from practice."),
    ("They notice what the decision changed for users or colleagues.", "Implementation detail without human or operational consequence feels inert."),
    ("A live alternative helps them test why this route was chosen.", "An outcome presented as inevitable invites resistance."),
    ("Precise, personal observation makes the author's voice worth following.", "Stock drama or generic editorial phrasing feels unearned."),
    ("Economical explanation lets them stay with a demanding argument.", "Repetition after the point has landed makes them move on."),
    ("They want to know what held up after the immediate win.", "A neat ending that hides the aftermath leaves the lesson incomplete."),
)


class CohortError(ValueError):
    """The proposed reader cohort cannot be generated or saved safely."""


def expand_profiles(archetypes: tuple[ReaderProfile, ...]) -> tuple[ReaderProfile, ...]:
    """Make ten distinct reading postures per rich archetype, preserving its intent."""
    if len(archetypes) != 10 or any(not profile.drawn_in_by or not profile.put_off_by or profile.archetype_id
                                   for profile in archetypes):
        raise CohortError("Cohort generation requires exactly ten rich archetypes")
    readers = tuple(
        replace(archetype,
                id=f"{archetype.id}-r{index:02d}",
                drawn_in_by=f"{archetype.drawn_in_by} {drawn}",
                put_off_by=f"{archetype.put_off_by} {put_off}",
                archetype_id=archetype.id)
        for archetype in archetypes
        for index, (drawn, put_off) in enumerate(LENSES, 1)
    )
    if len({reader.id for reader in readers}) != 100 or any(
        len(reader.id) > 64 or any(len(value) > 500 for value in asdict(reader).values())
        for reader in readers
    ):
        raise CohortError("Generated reader IDs or fields exceed profile limits")
    return readers


def main(argv: list[str] | None = None, *, workspace_resolver: Callable[[], Path] = _workspace) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--profile-file", type=Path, default=DEFAULT_ARCHETYPES)
    parser.add_argument("--output", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    args = parser.parse_args(argv)
    readers = expand_profiles(load_profiles(args.profile_file, None))
    if not args.apply:
        print(f"{len(readers)} distinct readers from 10 archetypes; no file written")
        return 0
    if args.output is None or not args.output.is_absolute():
        raise CohortError("--apply requires an absolute --output path in off-repo scratch")
    workspace = workspace_resolver().resolve()
    target = args.output.resolve()
    if not target.is_relative_to(workspace):
        raise CohortError("Cohort output must stay in the canonical off-repo scratch workspace")
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("x", encoding="utf-8") as handle:
        json.dump([asdict(reader) for reader in readers], handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    print(f"Saved {len(readers)} readers: {target}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (CohortError, SourceError, OSError) as error:
        print(f"reader cohort: {error}", file=sys.stderr)
        raise SystemExit(2) from None

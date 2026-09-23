"""Non-authoritative, draft-free reports from simulated reader decisions."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from uuid import uuid4


@dataclass(frozen=True)
class Observation:
    article_hash: str
    article_name: str
    beat_index: int
    heading: str
    profile_id: str
    choice: str
    probabilities: dict[str, float]
    cost_usd: float
    input_tokens: int | None
    model: str
    archetype_id: str = ""


@dataclass(frozen=True)
class PanelReport:
    articles: tuple[dict, ...]
    observations: tuple[Observation, ...]
    limitations: tuple[str, ...]
    calls: int
    cost_usd: float
    input_tokens: int
    comparable_beats: bool
    cohort_sizes: dict[str, int] = field(default_factory=dict)
    cohort_sha256: str = ""


def render_panel(report: PanelReport) -> str:
    lines = ["Simulated reader decisions under this setup; not real-reader retention."]
    for article in report.articles:
        lines.append(f"Article {article['name']} ({article['sha256'][:12]})")
        for beat in article["beats"]:
            observations = [item for item in report.observations
                            if item.article_hash == article["sha256"] and item.beat_index == beat["index"]]
            counts: dict[str, int] = {}
            for item in observations:
                counts[item.choice] = counts.get(item.choice, 0) + 1
            display = ", ".join(f"{key.replace('_', ' ')}: {count}" for key, count in sorted(counts.items()))
            lines.append(f"  {beat['index']}. {beat['heading']}: {display or 'no decisions'}")
            archetypes = sorted({item.archetype_id for item in observations if item.archetype_id})
            for archetype in archetypes:
                group = [item for item in observations if item.archetype_id == archetype]
                counts = {}
                for item in group:
                    counts[item.choice] = counts.get(item.choice, 0) + 1
                cohort_size = report.cohort_sizes[archetype]
                group_display = ", ".join(f"{key.replace('_', ' ')}: {count}"
                                          for key, count in sorted(counts.items()))
                lines.append(f"    {archetype} ({len(group)}/{cohort_size} readers responded): {group_display}")
    if len(report.articles) == 2:
        lines.append("A/B trajectories shown separately; " +
                     ("beat indices are comparable." if report.comparable_beats else "beat indices are not aligned."))
    lines.append(f"{report.calls} calls; reported cost ${report.cost_usd:.8f}; {report.input_tokens} reported input tokens.")
    lines.extend(f"Limit: {limit}" for limit in report.limitations)
    return "\n".join(lines)


def write_report(report: PanelReport, workspace: Path, output: Path | None = None) -> Path:
    workspace.mkdir(parents=True, exist_ok=True)
    target = output or workspace / f"reader-panel-{uuid4().hex}.json"
    if not target.is_absolute() or not target.resolve().is_relative_to(workspace.resolve()):
        raise ValueError("Report output must stay in the canonical off-repo scratch workspace")
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("x", encoding="utf-8") as handle:
        json.dump(asdict(report), handle, ensure_ascii=False, indent=2)
        handle.write("\n")
    return target

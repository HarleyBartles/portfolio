---
name: running-editorial-reader-panels
description: Use when an article needs a bounded simulated-reader experiment to locate possible changes in attention, compare drafts, or test distinct reader intents.
metadata:
  source-id: running-editorial-reader-panels
  source-path: .agents/skills/running-editorial-reader-panels/SKILL.md
  provenance-name: Editorial Reader Panel first-party skill
  source-category: first_party
  status: active
  owner: Harley Bartles
  scope: Simulated reader-panel experiments for Portfolio article drafts.
  use_when:
    - a draft has an uncertain attention or comprehension passage.
    - two versions need a bounded reader-intent comparison.
    - distinct reader reactions may inform a developmental edit.
  do_not_use_when:
    - human readership or retention measurement is required.
    - a quality score or automated publication decision is requested.
  related_skills:
    - writing-portfolio-articles
license: MIT
---

# Running Editorial Reader Panels

Use this panel to identify passages worth reading again with editorial judgment. The decisions are correlated model simulations, not a sample of people or a retention forecast.

## Run a panel

Start with a dry run; it lists beats, estimated calls and estimated input cost without sending text:

```powershell
py -3 .agents/skills/running-editorial-reader-panels/scripts/reader_panel.py --article src/client/src/data/content/writing/<draft>.md --check
```

Headed articles use sections as beats. An unheaded long-form article uses paragraph-boundary passages, so lack of headings does not collapse the whole piece into one decision. A very short lead-in before the first heading joins the reader promise instead of becoming a standalone abandonment point. Check the listed beats against the actual article before a paid run; boundaries are a reading aid, not editorial structure.

For a paid run, set `OPENROUTER_API_KEY` in the process environment and pass `--apply --max-calls <count> --max-usd <amount>`. Article prefixes go to OpenRouter's Jev Decisions API. The JSON report is saved in canonical off-repo scratch. Use `--help` for paired drafts, profile files, selection, and source limits.

## Experiment with 100 readers

The default ten profiles are concise reader intents retained as a pilot baseline. `assets/reader-intents-rich.json` preserves their richer versions. [The working pool](assets/reader-archetypes.json) contains fourteen motive-led archetypes; [the catalogue guide](references/reader-archetype-catalogue.md) helps select a relevant panel. Use `reader_panel.py --profile-file` and `--profiles` to try selected archetypes directly. To build a 100-reader cohort, give `reader_panel_cohort.py` that pool with `--archetypes <ten-comma-separated-ids>`, check it, then apply with `--output <absolute-scratch-path>`. Give its output to `reader_panel.py --profile-file <path>`. The current generator adds ten generic reading lenses to each selected archetype; that is a mechanical variation, not yet ten developed reader profiles. Keep experimental cohorts in scratch until a useful version earns promotion to the repository.

Compare an original and a deliberately weakened passage to check whether the panel detects an obvious loss. Inspect the per-archetype choices and individual trajectories as well as totals. Readers who stop satisfied have not lost interest. Read every flagged passage in context; a slow build or resolved ending may be doing its job. The panel cannot authorize a rewrite or publication.

## Common mistakes

- Treating 100 correlated decisions as 100 human votes.
- Presenting a dry-run cost estimate as the billed cost.
- Treating a reaction to deliberate pacing as a defect without reading the passage.
- Promoting a cohort based on one article or one control run.

---
name: running-reader-panels
description: Use when an article needs a bounded simulated-reader experiment to locate possible changes in attention, compare drafts, or test distinct reader intents.
metadata:
  source-id: running-reader-panels
  source-path: .agents/skills/running-reader-panels/SKILL.md
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

# Running Reader Panels

Use this panel to identify passages worth reading again with editorial judgment. The decisions are correlated model simulations, not a sample of people or a retention forecast.

## Run a panel

Start with a dry run; it lists beats, estimated calls and estimated input cost without sending text:

```powershell
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --article src/client/src/data/content/writing/<draft>.md --profile-file <cohort.json> --check
```

Headed articles use sections as beats. An unheaded long-form article uses paragraph-boundary passages, so lack of headings does not collapse the whole piece into one decision. A very short lead-in before the first heading joins the reader promise instead of becoming a standalone abandonment point. Check the listed beats against the actual article before a paid run; boundaries are a reading aid, not editorial structure.

For a paid run, set `OPENROUTER_API_KEY` in the process environment and pass `--apply --max-calls <count> --max-usd <amount>`. Article prefixes go to OpenRouter's Jev Decisions API. The JSON report is saved in canonical off-repo scratch. Use `--help` for paired drafts, profile files, selection, and source limits.

## Assemble readers for this article

For a new article, use the expandable [motive-led archetype pool](assets/reader-archetypes.json), its [catalogue](references/reader-archetype-catalogue.md) and the [quorum-authoring method](references/assembling-a-quorum.md). A reasoning agent chooses the archetype allocation, writes article-specific readers, checks for leading or duplicate profiles, and freezes the charter and cohort JSON in off-repo scratch *before* a paid call. Pass that JSON with `--profile-file`; there is no default cohort. A normal full panel has 100 readers; the starting cap is ten per archetype. A smaller panel is better than irrelevant padding. The runner does not generate readers.

Compare an original and a deliberately weakened passage to check whether the panel detects an obvious loss. Inspect the per-archetype choices and individual trajectories as well as totals. Readers who stop satisfied have not lost interest. Read every flagged passage in context; a slow build or resolved ending may be doing its job. The panel cannot authorize a rewrite or publication.

## Common mistakes

- Treating 100 correlated decisions as 100 human votes.
- Presenting a dry-run cost estimate as the billed cost.
- Treating a reaction to deliberate pacing as a defect without reading the passage.
- Promoting a cohort based on one article or one control run.
- Writing readers as predictions that the article succeeds or fails, then treating the panel as an independent test.

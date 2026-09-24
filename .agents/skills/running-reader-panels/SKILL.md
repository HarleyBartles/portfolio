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

For a new run, author and freeze an [experiment manifest](references/experiment-manifest.md) in off-repo scratch beside the cohort. Its ordered beats describe what readers can actually see, including the visible invitation and hidden body of an optional aside. Choose the conditions before inspecting outcomes. Start with a dry run; it lists beats, estimated calls and estimated input cost without sending text:

```powershell
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <cohort.json> --check
```

The reasoning agent chooses the beats and their editorial jobs. Do not let Markdown headings or a parser decide attention boundaries. Start from an editorial review: write the question, a plausible result and counter-result, the exposure groups that will answer it, and what the simulation cannot tell you. An exploratory run can use an open question without inventing a prediction. Check the manifest against the actual article and rendered page before a paid run; the source hashes prevent stale inputs but cannot certify that the route is editorially faithful. Keep the cohort separate so exactly the same readers can assess controlled conditions and later drafts.

The text harness renders a figure as its description and caption, not as the visual object. Keep that text with the surrounding prose in a beat when they form one editorial movement. Record that the panel can test the verbal account but cannot judge the diagram's visual explanation or placement; read the rendered page for that question.

Before `--apply`, inspect the actual reader-facing instruction and choices assembled by the harness, then trace representative routes from first beat to exit. Include early satisfied and lost-interest exits and each optional-read branch that the experiment uses. Confirm who has seen an inline invitation, who is being offered new text, and what the prompt implies about where they stopped. A dry-run cost estimate does not perform this semantic check. If the available branches cannot represent the intended reading situation, qualify the proxy explicitly or repair the route before paying.

When the extra material is offered only after the article, use a version 2 manifest with ordinary article beats and a separate `optional_read`. Offer it to readers who reach the ending or stop satisfied; record their choice and, for openers, the effect on satisfaction with their original reading goal. Keep readers who leave from lost interest out of the offer denominator.

For a paid run, set `OPENROUTER_API_KEY` in the process environment and pass `--apply --max-calls <count> --max-usd <amount>`. Only the text actually exposed on a reader's route goes to OpenRouter's Jev Decisions API. The CLI prints periodic progress while running and saves a JSON report in canonical off-repo scratch. Use `--help` for profile selection and source limits. The older `--article` mode is available for existing flat-text runs but does not model optional content.

## Assemble readers for this article

For a new article, use the expandable [motive-led archetype pool](assets/reader-archetypes.json), its [catalogue](references/reader-archetype-catalogue.md) and the [quorum-authoring method](references/assembling-a-quorum.md). Aim for 100 credible readers, with at most ten per archetype. Before a paid call, audit every reader for dependence on the current draft's specific examples, structure or conclusions. Make one repair pass on readers that fail, recheck only those readers, and remove any still tainted. Do not refill or repeat the repair cycle to reach 100: a smaller clean cohort is preferable. Freeze the admitted charter and cohort JSON in off-repo scratch, then pass that JSON with `--profile-file`; there is no default cohort. The runner checks mechanical boundaries, not this editorial admission gate, and does not generate readers.

Compare an original and a deliberately weakened passage to check whether the panel detects an obvious loss. Inspect the per-archetype choices and individual trajectories as well as totals. Readers who stop satisfied have not lost interest. Read every flagged passage in context; a slow build or resolved ending may be doing its job. The panel cannot authorize a rewrite or publication.

Read the result editorially before spending time on a post-run code-review or commit loop. Report the denominator for each claim: readers who reached a beat, saw an invitation, chose to open, and reported an effect after opening are different groups. Compare motives and individual paths without treating self-selected openers as an experimental control. A satisfied stop before the argument's evidence may signal premature closure; the same choice at a resolved ending may mean the piece has done its job. Discuss the article-level meaning and the experiment's limits before deciding on edits or a rerun.

## Common mistakes

- Treating 100 correlated decisions as 100 human votes.
- Presenting a dry-run cost estimate as the billed cost.
- Treating a reaction to deliberate pacing as a defect without reading the passage.
- Promoting a cohort based on one article or one control run.
- Writing readers as predictions that the article succeeds or fails, then treating the panel as an independent test.
- Keeping draft-dependent readers to preserve a 100-reader total, or repeatedly replacing them until the total reaches 100.
- Inferring an aside-opening preference from a run that forced every reader to see its body.
- Comparing the choices of self-selected aside readers as though they were randomly assigned.

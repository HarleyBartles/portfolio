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

For a new run, author and freeze a version 3 [experiment manifest](references/experiment-manifest.md) in off-repo scratch beside the cohort. Its ordered route describes what readers can actually see: article beats, optional-read invitations, any inline previews, and bodies revealed only after an open choice. Existing version 1 and 2 manifests remain supported and compile to the same route engine. Choose the conditions before inspecting outcomes. Start with a dry run; it lists the route, estimated calls and estimated input cost without sending text:

```powershell
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <cohort.json> --check
```

The current named policies are `core_only`, `asides_in_flow` and `optional_with_defer`. In the defer condition, readers see the invitation and inline preview, then choose to read now or continue. The invitation promises a choice at the end of their journey. Every unread optional piece is offered there, including a piece whose first invitation they never reached. Preserve the distinction between `first_offer_unseen` and `deferred_reoffer` in interpretation.

The reasoning agent chooses the beats and their editorial jobs. Do not let Markdown headings or a parser decide attention boundaries. Start from an editorial review: write the question, a plausible result and counter-result, the exposure groups that will answer it, and what the simulation cannot tell you. An exploratory run can use an open question without inventing a prediction. Check the manifest against the actual article and rendered page before a paid run; the source hashes prevent stale inputs but cannot certify that the route is editorially faithful. Keep the cohort separate so exactly the same readers can assess controlled conditions and later drafts.

The text harness renders a figure as its description and caption, not as the visual object. Keep that text with the surrounding prose in a beat when they form one editorial movement. Record that the panel can test the verbal account but cannot judge the diagram's visual explanation or placement; read the rendered page for that question.

Before `--apply`, inspect the actual reader-facing instruction and choices assembled by the harness, then run `--trace-choices <choices.json>` for representative routes. Trace early satisfied and lost-interest exits, both inline choices, later opens and skips, and an exit before an invitation. Confirm visible previews, hidden body boundaries, truthful end offers and what each prompt implies about where the reader stopped. The trace must complete every selected reader-condition journey; it rejects scripts that stop partway through a route. A dry-run cost estimate does not perform this semantic check. If the available route cannot represent the intended reading situation, repair the harness or qualify the proxy before paying.

For a paid run, set `OPENROUTER_API_KEY` in the process environment and pass `--apply --max-calls <count> --max-usd <amount>`. The SDK runs independent reader-condition journeys concurrently, while each journey stays sequential. `--concurrency` bounds active requests. The harness reserves global call and estimated-spend capacity before sending work, counts retries per request, and reconciles reported usage. Costs are estimates, not billing guarantees. Progress is printed while running. Completed journeys are checkpointed atomically in canonical off-repo scratch; `--resume <partial-report>` continues only when source, manifest, frozen cohort, model and prompt fingerprints still match. Only exposed text goes to OpenRouter's Jev Decisions API. The older `--article` mode remains for flat-text runs and does not model optional content.

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

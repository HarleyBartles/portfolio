# Operate the polling harness

Load this reference when validating, tracing, applying or resuming a study with `reader_panel.py`. Load [the experiment manifest reference](experiment-manifest.md) when authoring its route or conditions.

## Preflight and trace

Use `--check` to validate source hashes, route shape, conditions, cohort, estimated maximum calls and input cost without a remote call. Then run `--trace-choices <choices.json>` to inspect exact requests and exposures with scripted decisions and no network. Trace representative complete journeys: continue, skim, stop satisfied, leave from lost interest, read inline, defer and later open, defer and later skip, and exit before an invitation. Confirm visible text, choice wording, body boundaries, terminal-offer origins and the reader's stated prior choices. Trace calls use the same prompt builder as live SDK requests.

Scanner choice scripts use `entry--<entry-id>` for `scan-entry-<iteration>`, then `read_closely` or `skim` at `scan-attention:<target-id>`, followed by a navigation choice at `scan-navigation:<target-id>`. Use complete scripts for the selected reader-condition journeys; the trace rejects missing, invalid, duplicate, unreachable or incomplete choices.

Check `reading_history` in the traced request state. It should list earlier exposed items and the reader's choices, not the current decision or unseen content. Later beat prompts can distinguish skim from close read; an end offer can recall a reader's previous deferral. A first offer for an unseen aside has no prior deferral to recall.

```powershell
py -3 .agents/skills/simulated-reader-polling/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --check
py -3 .agents/skills/simulated-reader-polling/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --trace-choices <choices.json>
```

If the intended reading situation cannot be represented by the available route, repair the harness or state the proxy's limits before paying. A dry-run estimate does not replace prompt inspection and trace review.

## Apply and resume

Run a paid study only when it has been explicitly authorized. Set `OPENROUTER_API_KEY` in the process environment and choose call and spend ceilings deliberately:

```powershell
py -3 .agents/skills/simulated-reader-polling/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --apply --max-calls <count> --max-usd <amount> --concurrency 4
```

The SDK runs independent reader-condition journeys concurrently, while each journey stays sequential because each answer controls the next exposure. `--concurrency` bounds active journeys; its supported range and default are shown by `--help`. The harness reserves global call and estimated-spend capacity before dispatch, uses the SDK retry policy, counts attempts and reconciles returned usage. Costs are estimates until the provider reports usage.

If an attempted request fails without returned usage, the checkpoint records the attempts as unpriced and stops new dispatch. Reconcile those attempts in provider billing before resuming, then pass the actual amount with `--reconciled-unpriced-usd <amount>`; estimates alone do not authorize resumption.

Progress is printed during execution. Reports and atomic partial checkpoints are written to canonical off-repo scratch. Continue an interrupted run with `--resume <partial-report>` only when the source, manifest, frozen cohort, model and rendered-prompt fingerprints still match. Completed journeys are skipped; an in-flight journey without a completed checkpoint restarts from its beginning. Incomplete journeys stay in the checkpoint but are excluded from journey and observation results.

Reports include actual call usage and journey outcomes. Optional-read summaries include denominators and breakdowns by condition, core outcome and archetype. Scanner summaries count each visible entry and its linked beat or aside. Reports contain identifiers, choices, exposure events, usage and outcomes, not article text or credentials.

The older `--article` mode supports flat-text runs only. It does not model optional content or authored article boundaries; use a manifest when the page has asides, diagrams, pull quotes or other distinct components.

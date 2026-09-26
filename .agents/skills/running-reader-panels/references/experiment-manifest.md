# Author a reading experiment

Build the reader cohort and the experiment manifest as separate frozen inputs. The cohort JSON contains the admitted reader profiles. The manifest supplies an ordered route, any visible previews and hidden optional bodies, named conditions, source hashes, and the route-policy choices. The reasoning agent writes the beats and hypotheses; the harness does not infer editorial boundaries from Markdown headings.

## Current manifest: version 3

```json
{
  "version": 3,
  "title": "Article title",
  "promise": "The standfirst or reader promise",
  "sources": [
    {"path": "absolute/or/relative/article.md", "sha256": "64 lowercase hex digits"},
    {"path": "absolute/or/relative/article-shell.tsx", "sha256": "64 lowercase hex digits"}
  ],
  "route": [
    {"id": "opening", "kind": "beat", "text": "An authored editorial beat."},
    {
      "id": "optional-example",
      "kind": "optional_read",
      "eyebrow": "Optional visible eyebrow",
      "title": "Visible title",
      "standfirst": "Visible invitation",
      "reading_time": "About 45 seconds",
      "disclosure_label": "The button or link label for opening the hidden body",
      "preview": "Optional text shown beside the invitation, such as a figure description and caption. Omit or use an empty string when there is none.",
      "body": "Hidden detail revealed only after an open choice."
    },
    {"id": "ending", "kind": "beat", "text": "The next editorial beat."}
  ],
  "conditions": [
    {"id": "core_only", "optional_reads": "omit"},
    {"id": "asides_in_flow", "optional_reads": "inline"},
    {"id": "optional_with_defer", "optional_reads": "read_now_or_defer"}
  ]
}
```

The three named conditions have fixed policies. `core_only` omits every optional invitation and body. `asides_in_flow` shows each invitation, preview and full body at its authored route position. `optional_with_defer` shows the invitation and preview at that position, asks `read_now` or `defer_to_end`, then offers each unread body once at the end of the reader's journey. The inline choice explicitly promises another choice at the end. There is no inline skip option.

Every unread optional read is offered at journey end, including an item whose invitation was never reached because the reader left early. The event ledger distinguishes `first_offer_unseen` from `deferred_reoffer`. The end offer shows the title, standfirst and reading time. Only after `read` does the body enter visible text. After each such read, ask whether it increased, maintained or decreased satisfaction with the article for the reader's original goal. The original core outcome is recorded first and does not change after optional reading.

Each route item uses a stable ID. An optional read may have an `eyebrow`, `preview` and `disclosure_label` for the visible elements surrounding its hidden body. A preview can describe material placed outside a collapsed disclosure, such as a diagram. Describe visual content accurately and include its caption. The panel can test the verbal description, not the image's visual explanation or placement. Keep the React article shell source in `sources` when it supplies the actual eyebrow, title, standfirst, preview, disclosure label or order. Hashes catch source drift; they do not establish that the manifest faithfully represents the page.

## Existing formats

Version 1 manifests with a `beats` array and string conditions (`omit`, `closed`, `force_open`, `reader_choice`) remain supported. Version 2 manifests with `optional_read` after the article and `post_article_choice` remain supported. The runner compiles these inputs to the same ordered route engine; their legacy choices and report fields retain their meanings. New experiments should use version 3 and stable item IDs.

## Validate and trace before a paid run

Start from a fresh editorial review. State the editorial question, a plausible result and counter-result, which readers can answer it, and what a simulation cannot establish. Freeze the cohort before making predictions. For a deliberate hypothesis, specify what observation would challenge the hypothesis; exploratory questions may remain open.

Use `--check` to validate source hashes, route shape, conditions, cohort, estimated maximum calls and input cost without a remote call. Then run `--trace-choices <choices.json>` to inspect exact requests and exposures with scripted decisions and no network. Choice scripts use this shape:

```json
{
  "choices": [
    {"reader": "reader-01", "condition": "optional_with_defer", "stage": "opening", "choice": "read_closely"},
    {"reader": "reader-01", "condition": "optional_with_defer", "stage": "optional-example:inline-choice", "choice": "defer_to_end"}
  ]
}
```

Trace the actual decision routes of interest: continue, skim, stop satisfied, leave from lost interest, read inline, defer and later open, defer and later skip, and an exit before an invitation. Confirm visible text, choice wording, body boundaries and terminal offer origins. Use a complete script for the selected reader-condition journeys; the trace rejects missing, invalid, duplicate, unreachable or incomplete choices. Every prompt in a trace is rendered by the same builder as live SDK requests.

## CLI

```powershell
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --check
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --trace-choices <choices.json>
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --apply --max-calls <count> --max-usd <amount> --concurrency 4
```

`--concurrency` bounds independent reader-condition journeys. The questions within one journey remain sequential, because each answer controls what that reader sees next. The default is a conservative four concurrent requests; use 1 for a serial run, and a value from 1 to 32 for a different bound. OpenRouter's Python SDK async Decisions call uses the same SDK retry policy, including bounded retries and `Retry-After` handling. Attempts are counted per request, and the harness reserves global call and estimated-spend capacity before dispatch. Costs are estimates; OpenRouter-reported usage is reconciled in the report.

Progress output reports the current reader, condition, decision stage, cumulative wire calls and cost, and active requests. The final report includes total elapsed time, per-decision latency, retry count and peak concurrency. A synthetic scheduler benchmark can verify overlap but cannot establish provider latency, retry rates or a best Jev concurrency; tune concurrency from a bounded live run when those measurements matter.

Apply runs save a report and an atomic partial checkpoint in canonical off-repo scratch. If interrupted, continue with `--apply --resume <partial-report>` and adequate call and spend caps. Resume accepts only a matching source, manifest, frozen cohort, model and prompt fingerprint. It skips completed journeys; an in-flight journey without a completed checkpoint is rerun from its start. Reports are text-free: they store identifiers, choices, exposure events, usage and outcomes, not the article body or credentials.

The older `--article` mode remains available for flat-text runs; it has no authored optional-read route and runs serially. It is not a substitute for a manifest when the page has asides, diagrams, pull quotes or other authored boundaries.

## Read results as an experiment

The choice condition describes self-selection, not a randomized effect of reading an aside. Compare `core_only` and `asides_in_flow` as distinct routes over the same frozen cohort, then inspect the choice condition separately. Report the eligible denominator for each claim: readers reaching the inline invitation, choosing `read_now`, deferring, getting an unseen first offer, getting a deferred re-offer, reading later, skipping later, and answering an effect question are different groups. Break down the paths by condition, core outcome and archetype. Keep `stop_satisfied` distinct from `leave_lost_interest`; neither outcome is changed by the optional read.

Read the experiment editorially before ordering a code review or deciding on another run. Describe what the paths suggest about the article and its readers, distinguish observed choices from inference, and state the design and simulation limits. A paid 100-reader run is a separate editorial action; preparing or tracing an experiment does not authorize it.

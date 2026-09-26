# Author the experiment manifest

Load this reference when building or revising an experiment's JSON route, conditions or scan surface. Define the study using [poll-study design](designing-poll-studies.md), then freeze the audience using [cohort authoring](assembling-a-cohort.md). This file specifies the manifest contract; it does not decide the editorial question or select readers.

The harness accepts one manifest schema at a time: the current semantic version, `0.0.5`. The `reader_flow` field chooses between `article_route` and `scan_entry`; these are two flows in the same versioned contract. Old scratch runs are records, not replay inputs. To rerun one, rewrite its manifest in the current format and review the changed experiment before spending calls.

## Shared manifest shape

Both flows use the same top-level fields and ordered `route`. An ordinary beat has `id`, `kind: "beat"` and authored `text`. An optional read has `id`, `kind: "optional_read"`, `title`, `standfirst`, `reading_time` and hidden `body`; optional visible metadata can include `eyebrow`, `preview` and `disclosure_label`.

```json
{
  "version": "0.0.5",
  "reader_flow": "article_route",
  "title": "Article title",
  "promise": "The standfirst or reader promise",
  "sources": [
    {"path": "article.md", "sha256": "64 lowercase hex digits"},
    {"path": "article-shell.tsx", "sha256": "64 lowercase hex digits"}
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
      "preview": "Optional material outside a collapsed disclosure, such as a figure description and caption.",
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

The three article-route condition IDs have fixed policies. `core_only` omits every optional invitation and body. `asides_in_flow` shows each invitation, preview and full body at its authored route position. `optional_with_defer` shows the invitation and preview there, asks `read_now` or `defer_to_end`, then offers each unread body once at the end of the reader's journey. The inline choice explicitly promises another choice at the end. There is no inline skip option.

Every unread optional read is offered at journey end, including an item whose invitation was not reached because the reader left early. The event ledger distinguishes `first_offer_unseen` from `deferred_reoffer`. The end offer shows the title, standfirst and reading time. Only after `read` does the body enter visible text. After each such read, ask whether it increased, maintained or decreased satisfaction with the article for the reader's original goal. Record the core outcome first; optional reading does not change it.

Every route must start and end with an ordinary beat. Each route item has a unique stable ID. `sources` must contain at least one source record when loading a run; include the Markdown backing and any React shell that supplies the actual visible title, promise, heading, pull quote, aside invitation, preview, disclosure label or order. Hashes catch source drift; they do not establish that the authored manifest faithfully represents the page.

## Article route

Choose `"reader_flow": "article_route"` when readers start at the opening and make choices as they encounter each authored beat. Use article-route conditions from the shared example. The harness records reading history and passes that state into each later decision.

## Scan-entry route

Choose `"reader_flow": "scan_entry"` when the question begins with a reader scanning the page and choosing where to enter. Add an authored `scan_surface` that mirrors the visible page: one heading for each beat, optional pull quotes linked to their beat, and optional aside invitations linked to their hidden optional-read body. Every beat and optional read must have a scan entry. Aside titles and standfirsts must match the target body metadata exactly. The harness never derives the scan menu from Markdown headings or component markup.

```json
{
  "version": "0.0.5",
  "reader_flow": "scan_entry",
  "title": "Article title",
  "promise": "The article standfirst",
  "sources": [{"path": "article.md", "sha256": "64 lowercase hex digits"}],
  "route": [
    {"id": "opening", "kind": "beat", "text": "Opening beat text."},
    {"id": "story", "kind": "beat", "text": "The story beat text."},
    {"id": "aside-story", "kind": "optional_read", "title": "Related story", "standfirst": "A short invitation.", "reading_time": "About 1 minute", "body": "The hidden aside body."},
    {"id": "ending", "kind": "beat", "text": "The ending beat text."}
  ],
  "scan_surface": [
    {"id": "heading-opening", "kind": "heading", "target": "opening", "text": "The opening"},
    {"id": "heading-story", "kind": "heading", "target": "story", "text": "The story"},
    {"id": "quote-story", "kind": "pull_quote", "target": "story", "text": "A line that invites entry into the story beat."},
    {"id": "aside-story-entry", "kind": "aside", "target": "aside-story", "title": "Related story", "standfirst": "A short invitation."},
    {"id": "heading-ending", "kind": "heading", "target": "ending", "text": "The ending"}
  ],
  "conditions": [
    {"id": "headings-only", "scan_features": ["heading"], "optional_reads": "read_now_or_defer"},
    {"id": "headings-quotes-asides", "scan_features": ["heading", "pull_quote", "aside"], "optional_reads": "read_now_or_defer"}
  ]
}
```

The reader sees the title, promise and enabled scan entries, then chooses a heading, pull quote or aside to enter, or stops from the scan surface. A heading or pull quote opens its target beat. An aside entry reproduces its visible invitation fields exactly: eyebrow, title, standfirst and any visible preview or disclosure label present on the target route item. Hidden body text is never included in the scan surface. A preview can carry a text equivalent of a visible figure; this allows the reader to consider its content, but does not simulate visual prominence or layout. The reader reports close reading or skimming, then can read the remaining article from the opening, continue forward from the chosen entry, scan again for another unread entry, stop satisfied, or leave after losing interest. The route continues through authored article order after the reader chooses to read more. Content already read is skipped if they return to the opening.

Conditions vary `scan_features`; keep other article text and policy settings identical when testing the attention effect of pull quotes. These are entry-type filters, not individual-entry switches: a condition can include or omit all pull quotes, but cannot currently remove one specific quote. `heading` is required. The `optional_reads` policy governs asides encountered during the subsequent article route. Directly choosing an aside from the scan surface counts as reading it now and prevents a duplicate end offer.

The report's `scan_summary` gives each entry's eligible denominator, selection count, close-read and skim choices, subsequent route choices, reached-end count, and satisfied/lost-interest exits, with archetype breakdowns. It also counts readers who left from the scan surface without choosing an entry. Read this alongside individual journeys. The denominator is readers who saw that surface under that condition; selection is self-chosen, so it does not establish that the entry caused a later outcome.

For study question, stimulus and condition design, load [poll-study design](designing-poll-studies.md). For no-network traces and CLI operation, load [operating the harness](operating-the-harness.md). Interpret a completed report with [poll-results guidance](interpreting-poll-results.md).

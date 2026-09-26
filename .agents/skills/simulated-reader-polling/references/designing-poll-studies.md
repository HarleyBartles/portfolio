# Design a polling study

Load this reference when turning an editorial review into a poll question, selecting conditions, or deciding what choices to offer.

## Start with an editorial question

Read the article and complete the editorial review first. State the question the study should illuminate. For a directional hypothesis, record what you expect and what observation would challenge it. An exploratory study may begin with an open research question; do not invent a prediction just to fill a field.

Decide what the result would help the editor choose. Name the reader motives and exposure groups relevant to that decision, the stimulus each group should see, and what the study cannot establish. Keep the editorial hypothesis in the study charter, not in reader-facing text or Jev prompts.

## Choose a polling question

Polling is the useful analogue when the study can present a controlled stimulus and ask readers to choose among defined responses. Use a neutral, concrete question that describes the decision in front of the reader. Offer distinct and sufficiently complete choices, including a meaningful exit or none-of-these option when the route needs one. Avoid asking the reader to agree with the hypothesis or presuming an intent they have not expressed.

The Jev Decisions API returns typed decisions such as choices or scores. Do not treat it as an open-response interview or ask it to produce qualitative explanations. If the editorial question needs detailed, unexpected reasons in the reader's own words, use a separately designed qualitative method rather than disguising it as a poll.

Use a focus group or another qualitative method when the research needs participant discussion, follow-up probes, shared interpretation or discovery of unanticipated language. A simulated poll can standardize exposures and compare selected response patterns; it does not reproduce group interaction or moderator probing.

## Control the comparison

- Keep the article, cohort, reader-facing wording and route stable across conditions except for the variable the study is testing.
- Use the same frozen profiles for paired conditions or drafts when the comparison calls for matched reader motives. Treat each profile-condition journey separately; include only completed matched journeys in paired comparisons and report exclusions.
- For scan-entry studies, use the page's visible order for the scan surface. Link each heading, pull quote or aside invitation to the content it opens. Show readers the authored wording without injecting labels such as “section” or “pull quote” unless those words appear on the page. For an aside, include its visible eyebrow, title, standfirst, disclosure label and any text equivalent of a visible figure; exclude its hidden body. This represents textual content, not visual prominence.
- Use the article title as the opening entry's heading when the opening has no section heading; do not invent an “Opening” label for the scan surface.
- Record which condition and stimulus each response belongs to. If answer order is counterbalanced, record the offered order; do not claim counterbalancing when the harness did not vary and record it.
- Treat choices to open, defer, skim, continue or leave as self-selection. Those choices describe the route in this experiment; they do not isolate a causal effect unless the study design actually controls exposure.

The current scan manifest varies entry types by condition, not individual entry IDs. It can compare a surface with all pull quotes against one without pull quotes, but cannot yet remove a single selected quote as a condition. Separate manifests can use the same frozen cohort, but the harness does not report those runs as a paired comparison. Do not claim a native entry-level comparison until the manifest and report support it.

For the supported route formats and exact manifest fields, load [the experiment manifest reference](experiment-manifest.md). For runner controls and preflight, load [operating the harness](operating-the-harness.md).

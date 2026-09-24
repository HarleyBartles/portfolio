# Author a reading experiment

Build the reader cohort and the reading route as separate frozen inputs. The cohort JSON contains the admitted reader profiles. The experiment JSON contains an ordered `beats` array and the conditions to run. The harness executes that route; it does not decide where an article should pause or what an aside means.

## Input shape

```json
{
  "version": 1,
  "title": "Article title",
  "promise": "The standfirst or reader promise",
  "sources": [{"path": "absolute/or/relative/article.md", "sha256": "64 lowercase hex digits"}],
  "beats": [
    {"id": "opening", "kind": "beat", "text": "Text visible through the first editorial pause."},
    {
      "id": "optional-example",
      "kind": "aside",
      "title": "Visible aside title",
      "standfirst": "Visible standfirst and invitation",
      "body": "Text hidden until opened."
    },
    {"id": "ending", "kind": "beat", "text": "The next passage through the end."}
  ],
  "conditions": ["omit", "closed", "force_open", "reader_choice"]
}
```

The first and last entries must be ordinary beats. Use stable IDs across versions for comparable editorial jobs; do not reuse an ID for a different job merely to manufacture a matched result. Source hashes make a stale manifest fail before paid calls. List every file needed to establish the visible copy, including article-specific shell copy when it supplies a figure caption or aside invitation. Read and check the authored text against the rendered page; hashes guard drift, not editorial accuracy.
The current runner supports one optional aside per experiment.

For an optional additional read offered after the article, use version 2. Keep the `beats` array to ordinary article beats and supply the extra piece separately:

```json
{
  "version": 2,
  "title": "Article title",
  "promise": "The standfirst or reader promise",
  "sources": [{"path": "absolute/or/relative/article.md", "sha256": "64 lowercase hex digits"}],
  "beats": [{"id": "opening", "kind": "beat", "text": "Article opening."}],
  "optional_read": {
    "id": "additional-read",
    "title": "Visible optional title",
    "standfirst": "Visible invitation",
    "body": "Hidden until chosen."
  },
  "conditions": ["omit", "post_article_choice"]
}
```

`post_article_choice` offers the title and standfirst after the final article beat or when a reader stops satisfied earlier. Readers who leave because they lost interest receive no offer. The choice is `open` or `skip`; only an opener sees the body and answers whether it increased, maintained or decreased satisfaction with the article for their original reading goal. The comparison is to their satisfaction immediately before opening, so it does not require a fabricated numeric score. The `omit` condition provides a paired no-offer article route. Do not place the optional body among the article beats in this mode.

This mode offers the optional read at that point; it does not model a reader spontaneously remembering, noticing or scrolling back to an inline disclosure. If the real page showed an inline invitation earlier, describe this route as a proxy for willingness to take an additional read, not a measurement of return behaviour. The version 1 `reader_choice` route models an inline invitation and a deferred return at the final beat, but does not offer that return to someone who stopped satisfied earlier. If neither route represents the hypothesis, revise the experiment or the harness before making a stronger claim.

An ordinary beat is shown to the reader before an attention decision. An aside has a visible title and standfirst, plus a body hidden by default. The harness never sends that body to a reader who has not opened it.

## Conditions

- `omit`: remove the invitation and body.
- `closed`: show the invitation, keep the body closed.
- `force_open`: show the invitation and body in place.
- `reader_choice`: offer `open_now`, `return_later` or `skip` from the invitation alone. A deferer who reaches the end sees the invitation again and chooses `open` or `skip`, including a reader satisfied by the ending. Readers who leave before the aside have no aside choice; those who leave before the end have no return choice. A reader who loses interest at the final beat does not return.

These are separate conditions of one experiment over the same frozen cohort. The choice branch reports self-selection, not a randomised effect of reading the aside. Compare controlled conditions for possible exposure effects, then inspect individual journeys and the page's visual treatment. Keep `stop_satisfied` distinct from `leave_lost_interest`.

## Preflight and reading the report

Write the editorial hypothesis or exploratory question beside the manifest before a paid call. Name a plausible counter-result, the beat or optional-read boundary under test, the readers eligible for each choice, and the conclusion the harness cannot support. This prevents a result from supplying its own question after the fact.

Review a few complete request payloads or trace the exact prompt templates and cumulative visible text with a no-network decision stub. Include a reader who continues, one who stops satisfied early, one who leaves from lost interest, and the applicable aside choices. Check that each instruction describes the reader's actual exposure and position, not merely a convenient branch name. Then run `--check` for hashes, allocation and cost; neither source validation nor cost estimation replaces this route review.

After the run, report attention choices out of readers who reached each beat. For optional material, separately report readers offered the invitation, readers who opened, and openers who reported an effect. Use their motives to explain possible editorial value while stating the self-selection and correlated-simulation limits. Interpret the article first; fix a flawed prompt only with a qualified result or a deliberately new run, never by silently treating the old result as corrected.

## CLI

```powershell
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --check
py -3 .agents/skills/running-reader-panels/scripts/reader_panel.py --experiment-file <experiment.json> --profile-file <frozen-cohort.json> --apply --max-calls <count> --max-usd <amount>
```

`--check` lists the ordered beats, conditions, allocation and an upper estimate without a remote call. An apply run prints periodic progress to stderr and saves a text-free report in canonical off-repo scratch. The report records condition, reader, choices, exposed beat IDs, terminal reason, source and cohort fingerprints, calls and reported cost. Stop to inspect the authored route before paying for decisions.

The older `--article` mode remains for existing flat-text runs. Its heading-based boundaries do not model a page with optional content or article-specific presentation.

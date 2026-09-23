# Editorial Reader Panel Design

Status: experimental implementation and bounded pilot accepted; 100-reader cohort tested
Owner: Portfolio repository
Scope: an opt-in, local editorial experiment for public article drafts

Quorum-design amendment (23 September 2026): the original small-panel design remains the experimental baseline. The durable pool contains fifteen motive-led archetypes, with no fixed upper limit: `hiring-evaluator` is sharpened from the portfolio's weary sceptical hiring-manager lens and the jaded cynical architect is a distinct archetype. A normal full panel is 100 article-specific readers, assembled for that article from selected archetypes with no more than ten readers from any one archetype. Smaller pilots remain valid. The ten Hughes-article `craft-admirer` readers demonstrated useful specificity; they are a run cohort, not ten standing readers to reuse unchanged on other articles. The former goal of 140 stored readers is superseded.

## Purpose

Locate passages where simulated readers with different reasons for arriving at an article may lose interest, skim, or stop satisfied. The panel provides a map for human developmental review, not a prediction of human retention, a quality score, a publication gate, or authority to revise prose. It complements the current writing policy, article-writing playbook, and `writing-portfolio-articles` skill without changing their authority order.

## Delivery boundary

- Build a local command in the repo-owned `running-editorial-reader-panels` skill. It reads an explicitly named Markdown article and never ships in the Vite site or exposes an API key to browser code. The writing skill points to the panel when a developmental edit calls for it.
- Use the user's `OPENROUTER_API_KEY` environment variable to call OpenRouter's Decisions API with the pinned `typesafe/jev-1.13` model. The Jev Community MCP remains available for occasional manual decisions but is not the bulk-panel transport. Do not silently fall back to another model or provider.
- The command defaults to a read-only `--check` preview, showing the sections, selected profile count, number of decisions, an approximate input-token and model-cost estimate, and the fact that `--apply` sends article text to OpenRouter. It makes no remote calls in check mode.
- `--apply` explicitly authorises the bounded remote experiment. It requires the key, a maximum call count, and a maximum estimated spend. The runner preflights each call against its remaining estimated budget, records actual usage/cost, and stops when the cap is reached. Estimates are not a billing guarantee; a dedicated OpenRouter key with its own spend limit is the outside-the-script backstop. Handle a bounded 429 retry without an unbounded loop.
- Write output only to the repository's canonical off-repo scratch workspace. The report contains article/content hashes, section labels, profile IDs, typed responses, probabilities when supplied, actual usage, and run limitations; it does not copy full drafts or credentials. No panel result is committed as a corpus benchmark.

## Assemble an article-specific quorum

- Before writing profiles, an agent records a panel charter: the editorial question; core readers promised by the article; adjacent readers with a credible route in; challengers whose scrutiny could expose a real weakness; allocations and reasons for inclusion and conspicuous exclusion. Counts may differ by archetype but sum to 100 for a normal full panel. No fixed ratio or equal-sized groups applies. At the initial cap of ten per archetype, a full panel requires at least ten credible archetypes; use a smaller panel rather than pad with irrelevant readers. Add a standing archetype when field use reveals a genuinely different reading motive, not to satisfy an inventory target.
- An agent authors the allocated readers for this run from each selected archetype and an article brief: title, précis, intended audience and a neutral inventory of subjects. This is an editorial authoring step, not a hidden model call inside the runner. Vary the readers' questions, prior familiarity, attention and plausible reasons to stay or disengage; retain the parent archetype ID. Cap each archetype at ten run readers until meaningful variation knobs justify more. The weary manager and jaded architect lenses define distinct scrutiny but do not preordain either reader's reaction.
- Profiles may name article subjects but must not assert the draft's success, failure or desired Jev decision. Phrase a curiosity as a question or test, not a verdict. Review the cohort for loaded wording, duplicate motives, missing counterpressure and a mix selected only to flatter or condemn the draft. Record the allocation and its rationale.
- Freeze the exact cohort and charter before sending the first paid call. Store them alongside the run report in canonical off-repo scratch; the report records article hashes, allocation counts and a fingerprint of the ordered reader definitions. A paired draft or revision comparison reuses that cohort unchanged; changing the cohort creates a new experiment. No article-specific run cohort becomes standing skill inventory merely because one panel was informative.
- The CLI consumes the frozen JSON through `--profile-file`. Validate unique IDs, known archetype IDs, at most ten readers per archetype and at most 100 overall for an archetype-labelled cohort. Preserve the small legacy/unlabelled pilot path. The report keeps per-archetype denominators and individual trajectories; overall counts are a barometer, not the sole diagnostic.

## Panel method

- Start with a small, manually authored purpose-based cohort when piloting: arrival intent, relevant background, and what each reader hopes to gain. Avoid invented demographic authority, caricatured personalities, or a model-generated imitation of actual visitors. The runner accepts the assembled 100-reader quorum without requiring 100 for a bounded pilot.
- Split the article at authored level-two Markdown headings. Treat prose before the first such heading as an opening beat. Ignore frontmatter and headings inside fenced code. Reject an empty, malformed, or overlong source instead of silently truncating it.
- For each active profile and beat, send only the profile, the article's reader promise, and text visible through that beat. Do not leak future sections into an earlier decision. A profile that leaves does not make later decisions; a satisfied stop is separate from lost interest.
- Ask one direct `choice` question per profile/beat: `read_closely`, `skim`, `leave_lost_interest`, or `stop_satisfied`. Descriptions must distinguish these outcomes. No numerical quality score or generated explanation is requested from Jev.
- Aggregate decisions in code into a section-by-section display of choices and likely friction points. Label counts as *simulated decisions under this setup*, never percentages of real readers. Present the source section and probability distribution so an editor can inspect the passage. The writing skill and Harley own diagnosis and revisions.
- Support a paired A/B run with the same profiles, sectioning rule, model and question wording. Show the two trajectories separately; compare beats by index only when the drafts have the same number of beats, and never declare a winner by default. The corpus remains fluid: live articles may be tried during use, but no published article becomes a pinned fixture or golden rewrite.

## Validation and limits

- Deterministic tests use synthetic Markdown and a fake Decisions transport; they prove parsing, prefix-only visibility, profile/state isolation, terminal choices, budgets, retry limits, response validation, report custody, and no secret leakage. No CI test requires a paid call or a real key.
- A small live smoke call on current, non-sensitive material proves the actual endpoint/schema before a panel run. Record the observed model, response shape, usage and cost without persisting the secret or full draft.
- The original 8–12-reader and 100-reader pilots established feasibility and elicited Harley's editorial judgement. Further field use should test whether article-specific cohorts reveal useful friction and whether deliberate slow builds or satisfied endings are misclassified. A normal full run may use 100 profiles, but routine invocation remains an editorial choice, not an automatic writing or publication gate.
- Jev is a fast typed decision model, not an independent group of people. Shared model and prompt framing can correlate all 100 outcomes. Low confidence, disagreement, malformed output, missing usage, rate limits, or a privacy concern returns control to the human workflow; none authorises an automatic rewrite or publication decision.

## References

- [Jev Community MCP contract](https://www.jevai.org/mcp)
- [OpenRouter Jev 1.13 model and current pricing](https://openrouter.ai/typesafe/jev-1.13/api)
- [OpenRouter Decisions API usage](https://openrouter.ai/blog/tutorials/jev-vs-llm-when-to-use-each/)
- [TypeSafe Jev limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
- [Portfolio writing policy](../doctrine/writing-policy.md)
- [Article-writing playbook](../playbooks/article-writing.md)

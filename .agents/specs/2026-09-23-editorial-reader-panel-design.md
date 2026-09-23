# Editorial Reader Panel Design

Status: experimental implementation and bounded pilot complete; editorial judgement pending
Owner: Portfolio repository
Scope: an opt-in, local editorial experiment for public article drafts

## Purpose

Locate passages where simulated readers with different reasons for arriving at an article may lose interest, skim, or stop satisfied. The panel provides a map for human developmental review, not a prediction of human retention, a quality score, a publication gate, or authority to revise prose. It complements the current writing policy, article-writing playbook, and `writing-portfolio-articles` skill without changing their authority order.

## Delivery boundary

- Build a local, server-side-only command under the repo-owned article-writing skill. It reads an explicitly named Markdown article and never ships in the Vite site or exposes an API key to browser code.
- Use the user's `OPENROUTER_API_KEY` environment variable to call OpenRouter's Decisions API with the pinned `typesafe/jev-1.13` model. The Jev Community MCP remains available for occasional manual decisions but is not the bulk-panel transport. Do not silently fall back to another model or provider.
- The command defaults to a read-only `--check` preview, showing the sections, selected profile count, number of decisions, an approximate input-token and model-cost estimate, and the fact that `--apply` sends article text to OpenRouter. It makes no remote calls in check mode.
- `--apply` explicitly authorises the bounded remote experiment. It requires the key, a maximum call count, and a maximum estimated spend. The runner preflights each call against its remaining estimated budget, records actual usage/cost, and stops when the cap is reached. Estimates are not a billing guarantee; a dedicated OpenRouter key with its own spend limit is the outside-the-script backstop. Handle a bounded 429 retry without an unbounded loop.
- Write output only to the repository's canonical off-repo scratch workspace. The report contains article/content hashes, section labels, profile IDs, typed responses, probabilities when supplied, actual usage, and run limitations; it does not copy full drafts or credentials. No panel result is committed as a corpus benchmark.

## Panel method

- Start with 8–12 manually authored, purpose-based reader profiles: arrival intent, relevant background, and what that reader hopes to gain. Avoid invented demographic authority, caricatured personalities, or a model-generated imitation of actual visitors. The runner accepts a larger validated profile set, up to 100, without requiring that many for ordinary use.
- Split the article at authored level-two Markdown headings. Treat prose before the first such heading as an opening beat. Ignore frontmatter and headings inside fenced code. Reject an empty, malformed, or overlong source instead of silently truncating it.
- For each active profile and beat, send only the profile, the article's reader promise, and text visible through that beat. Do not leak future sections into an earlier decision. A profile that leaves does not make later decisions; a satisfied stop is separate from lost interest.
- Ask one direct `choice` question per profile/beat: `read_closely`, `skim`, `leave_lost_interest`, or `stop_satisfied`. Descriptions must distinguish these outcomes. No numerical quality score or generated explanation is requested from Jev.
- Aggregate decisions in code into a section-by-section display of choices and likely friction points. Label counts as *simulated decisions under this setup*, never percentages of real readers. Present the source section and probability distribution so an editor can inspect the passage. The writing skill and Harley own diagnosis and revisions.
- Support a paired A/B run with the same profiles, sectioning rule, model and question wording. Show the two trajectories separately; compare beats by index only when the drafts have the same number of beats, and never declare a winner by default. The corpus remains fluid: live articles may be tried during use, but no published article becomes a pinned fixture or golden rewrite.

## Validation and limits

- Deterministic tests use synthetic Markdown and a fake Decisions transport; they prove parsing, prefix-only visibility, profile/state isolation, terminal choices, budgets, retry limits, response validation, report custody, and no secret leakage. No CI test requires a paid call or a real key.
- A small live smoke call on current, non-sensitive material proves the actual endpoint/schema before a panel run. Record the observed model, response shape, usage and cost without persisting the secret or full draft.
- Pilot first with 8–12 profiles on a few current articles or temporary degraded variants. Harley judges whether flagged passages reveal useful reader friction and whether deliberate slow builds or satisfied endings are misclassified. Only after that judgement should a 100-profile run or routine skill/playbook invocation be considered.
- Jev is a fast typed decision model, not an independent group of people. Shared model and prompt framing can correlate all 100 outcomes. Low confidence, disagreement, malformed output, missing usage, rate limits, or a privacy concern returns control to the human workflow; none authorises an automatic rewrite or publication decision.

## References

- [Jev Community MCP contract](https://www.jevai.org/mcp)
- [OpenRouter Jev 1.13 model and current pricing](https://openrouter.ai/typesafe/jev-1.13/api)
- [OpenRouter Decisions API usage](https://openrouter.ai/blog/tutorials/jev-vs-llm-when-to-use-each/)
- [TypeSafe Jev limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
- [Portfolio writing policy](../doctrine/writing-policy.md)
- [Article-writing playbook](../playbooks/article-writing.md)

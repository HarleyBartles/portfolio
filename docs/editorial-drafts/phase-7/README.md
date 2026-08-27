# Phase 7 editorial drafts

These files are durable internal editorial source material for the Phase 7 writing-authority publication. They preserve the draft stack between article cycles so work on one article cannot strand or erase the others.

## Authority and status

- A draft is not public, admitted or author-approved merely because it is stored here.
- Harley remains the authority on his experience, intended meaning, factual boundaries and final publication decision.
- Open questions, provisional claims and plausible prose are not source truth.
- Cross-repository facts must be reverified against the live source before publication.
- Public article content lives in `src/client/src/data/content/writing/`; the admission and source-custody ledgers govern publication.

## Preserved draft stack

- `context-terra-draft.md`
- `pass-references-terra-draft.md`
- `provisioning-terra-draft.md`
- `provisioning-cloud-editorial-brief.md`
- `provisioning-cloud-discovery-record.md`
- `provisioning-cloud-discovery-addendum.md`
- `provisioning-cloud-first-draft.md`
- `cross-article-thread-ledger.md`
- `review-graph-terra-draft.md`
- `review-graph-cloud-discovery-checkpoint.md`
- `testing-evidence-terra-draft.md`
- `why-adrs-terra-draft.md`
- `why-adrs-sol-draft.md`

The Terra files are first-pass working drafts. The Why ADRs Sol file incorporates Harley's story-discovery and argument decisions, but remains an editorial working document until its production article is separately approved.

`provisioning-cloud-editorial-brief.md` records the completed cross-runtime editorial handoff. Cloud Sol supplied the discovery and first manuscript on the named PR branch; local Sol and Harley completed the settled copy, rendered production and merge approval. Publication proof remains with the exact-head merge and deployment closeout.

`provisioning-cloud-discovery-record.md` is the durable snapshot of the long-form Cloud discovery conversation through the first major drain. It preserves the cross-repo argument, evidence boundaries, corrections, anti-inferences, voice anchors, related article seeds and unresolved drafting decisions. It is deliberately more complete than the eventual article and must not be mistaken for settled public copy.

`provisioning-cloud-discovery-addendum.md` preserves the late-stage discussion that happened after the main record was written. It contains the final capability framing, Goldilocks connection, Linear `save_*` anecdote, tool/manual boundary, Superpowers adapter-to-fork judgement, workflow provisioning model, contracted spec/plan semantics, Handoff Gates mechanism and evidence, the fresh-agent-as-lens correction, AI-fatigue warning, and the final supported/first-party/anti-inference boundaries. **Local Sol must read both discovery documents before treating the first draft as evidence-backed copy.**

`provisioning-cloud-first-draft.md` preserves the first coherent Cloud manuscript rather than the settled public copy. The final article was completed in the production source after an in-repo editorial pass using the discovery records and installed writing/fatigue skills.

`cross-article-thread-ledger.md` preserves valuable material deliberately cut from a current article and routes it towards a plausible future home. It is editorial memory, not a promise that every thread will become an article.

`review-graph-cloud-discovery-checkpoint.md` is the durable record of the completed time-boxed editorial room. The brief, working manuscript and first local pass were deliberately removed once the article settled; the public source is the production article, while the checkpoint retains the facts, boundaries, decisions and cutting-room material needed by later work.

For Provisioning, the current editorial read order is:

1. `provisioning-cloud-editorial-brief.md`
2. `provisioning-cloud-discovery-record.md`
3. `provisioning-cloud-discovery-addendum.md`
4. `provisioning-cloud-first-draft.md`
5. source surfaces named by the two discovery records as needed for verification

For Review Graph, the durable editorial read order is:

1. `review-graph-cloud-discovery-checkpoint.md`
2. `src/client/src/data/content/writing/2026-08-05-graph-iterative-review.md`
3. the Graph passages in the Phase 7 plan
4. `cross-article-thread-ledger.md`
5. the pinned Marketplace implementation, design and roadmap named in the checkpoint

Preserve superseded drafts or record their disposition. Do not silently rewrite another article's factual boundaries while working on the current one.

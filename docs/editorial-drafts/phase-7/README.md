# Phase 7 editorial drafts

These files are durable internal editorial source material for the Phase 7 writing-authority publication. They preserve the draft stack between article cycles so work on one article cannot strand or erase the others.

## Authority and status

- A draft is not public, admitted or author-approved merely because it is stored here.
- Harley remains the authority on his experience, intended meaning, factual boundaries and final publication decision.
- Open questions, provisional claims and plausible prose are not source truth.
- Cross-repository facts must be reverified against the live source before publication.
- Public article content lives in `src/client/src/data/content/writing/`; the admission and source-custody ledgers govern publication.

## Cloud editorial-room persistence cadence

Keep a repo-local answer log throughout the conversation. Append every material answer, correction, factual boundary, editorial decision and valuable cutting-room thread while it is fresh. Local writes are cheap protection against context rot; they do not need a GitHub commit on every turn.

Commit and push a coherent editorial checkpoint only when the accumulated state justifies the wall-clock cost. Useful checkpoint triggers are:

- a meaningful batch of new evidence or answered questions;
- a changed factual boundary or governing argument;
- acceptance of a curveball reframe, after its consequences have been carried through the argument and notes;
- approaching a context, session or time-box risk where losing the local state would be expensive; and
- the final handoff back to local production.

There is no fixed turn count or timer. Judge the recovery value of the accumulated state against the cost of interrupting discovery to prepare, commit and push it. Between GitHub checkpoints, keep the local log current enough that a sudden interruption loses conversation time, not editorial knowledge.

Before each GitHub checkpoint, reconcile the local answer log, current manuscript and cross-article ledger so the commit is a coherent recovery point. At final handoff, retain the durable discovery record and valuable cross-article notes; remove disposable briefs and intermediate manuscripts once their decisions are present in the production article or durable record.

## Governing-argument pressure test: the hot take

When an article has good material but its governing thesis still feels descriptive, taxonomic or merely agreeable, try the **hot-take pressure test**.

Internal shorthand: **`I say X; fight me.`**

Reader-facing posture: **`Bold claim. Click here to see me prove it.`**

The point is not to manufacture controversy, force contrarianism or reward provocative wording for its own sake. Ask whether the article makes a clear proposition that a competent reader could reasonably dispute, then earns that proposition through evidence, trade-offs, reasoning and honest boundaries.

If the supposed argument collapses into a truism, a catalogue, a pattern-name explainer or an unbounded `it depends`, keep discovering what the article actually wants to say. Use the hot-take shape as a tool for finding the governing argument, not as a requirement that every title sound aggressive or every article disagree with received wisdom.

The useful target is an article that makes the reader think: **bold claim; show me.** Then the body does.

## Preserved draft stack

- `api-is-only-the-middle-next-room-seed.md`
- `api-is-only-the-middle-sol-first-pass.md`
- `api-is-only-the-middle-cloud-editorial-brief.md`
- `api-is-only-the-middle-cloud-discovery-record.md`
- `api-is-only-the-middle-cloud-handoff-addendum.md`
- `api-is-only-the-middle-cloud-first-draft.md`
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
- `testing-evidence-sol-first-pass.md`
- `testing-evidence-cloud-editorial-brief.md`
- `testing-evidence-cloud-discovery-record.md`
- `testing-evidence-cloud-handoff-addendum.md`
- `testing-evidence-cloud-first-draft.md`
- `why-adrs-terra-draft.md`
- `why-adrs-sol-draft.md`

The Terra files are first-pass working drafts. The Why ADRs Sol file incorporates Harley's story-discovery and argument decisions, but remains an editorial working document until its production article is separately approved.

`provisioning-cloud-editorial-brief.md` records the completed cross-runtime editorial handoff. Cloud Sol supplied the discovery and first manuscript on the named PR branch; local Sol and Harley completed the settled copy, rendered production and merge approval. Publication proof remains with the exact-head merge and deployment closeout.

`provisioning-cloud-discovery-record.md` is the durable snapshot of the long-form Cloud discovery conversation through the first major drain. It preserves the cross-repo argument, evidence boundaries, corrections, anti-inferences, voice anchors, related article seeds and unresolved drafting decisions. It is deliberately more complete than the eventual article and must not be mistaken for settled public copy.

`provisioning-cloud-discovery-addendum.md` preserves the late-stage discussion that happened after the main record was written. It contains the final capability framing, Goldilocks connection, Linear `save_*` anecdote, tool/manual boundary, Superpowers adapter-to-fork judgement, workflow provisioning model, contracted spec/plan semantics, Handoff Gates mechanism and evidence, the fresh-agent-as-lens correction, AI-fatigue warning, and the final supported/first-party/anti-inference boundaries. **Local Sol must read both discovery documents before treating the first draft as evidence-backed copy.**

`provisioning-cloud-first-draft.md` preserves the first coherent Cloud manuscript rather than the settled public copy. The final article was completed in the production source after an in-repo editorial pass using the discovery records and installed writing/fatigue skills.

`cross-article-thread-ledger.md` preserves valuable material deliberately cut from a current article and routes it towards a plausible future home. It is editorial memory, not a promise that every thread will become an article.

`review-graph-cloud-discovery-checkpoint.md` is the durable record of the completed time-boxed editorial room. The brief, working manuscript and first local pass were deliberately removed once the article settled; the public source is the production article, while the checkpoint retains the facts, boundaries, decisions and cutting-room material needed by later work.

`testing-evidence-cloud-discovery-record.md` preserves the backend and frontend discovery through the final conventional-engineering checkpoint. `testing-evidence-cloud-handoff-addendum.md` supersedes its unresolved/open-discovery tail with the accepted governing argument, curveball decision, pressure-scenario boundary, three-lens review, £8,750 valuation and local-Sol handoff. `testing-evidence-cloud-first-draft.md` is the resulting Cloud manuscript to stand up into the production article frame. None of those surfaces makes an admission decision.

`api-is-only-the-middle-next-room-seed.md` records the original correction from an API-specific premise to the wider observation that implementation is only the middle of engineering. `api-is-only-the-middle-cloud-discovery-record.md` preserves the main Harley-led discovery and accepted curveball. `api-is-only-the-middle-cloud-handoff-addendum.md` closes the late discovery with the anti-adversarial `no dev is an island` argument, breadcrumb stewardship, regulated-supplier handoff, SQL circularity, profanity/cadence rules and final three-lens review. `api-is-only-the-middle-cloud-first-draft.md` is the accepted Cloud manuscript for local Sol to stand up in the production article frame. None of those surfaces makes an admission decision.

For Provisioning, the current editorial read order is:

1. `provisioning-cloud-editorial-brief.md`
2. `provisioning-cloud-discovery-record.md`
3. `provisioning-cloud-discovery-addendum.md`
4. `provisioning-cloud-first-draft.md`
5. source surfaces named by the two discovery records as needed for verification

For Review Graph, the durable editorial read order is:

1. `review-graph-cloud-discovery-checkpoint.md`
2. `src/client/src/data/content/writing/2026-08-22-graph-iterative-review.md`
3. the Graph passages in the Phase 7 plan
4. `cross-article-thread-ledger.md`
5. the pinned Marketplace implementation, design and roadmap named in the checkpoint

Preserve superseded drafts or record their disposition. Do not silently rewrite another article's factual boundaries while working on the current one.

For Testing, the durable local-Sol handoff read order is:

1. `testing-evidence-cloud-editorial-brief.md` for the room contract and protected boundaries;
2. `testing-evidence-cloud-discovery-record.md` for the backend/frontend evidence, corrections and factual custody;
3. `testing-evidence-cloud-handoff-addendum.md` for the accepted reframe, agentic worked example, editorial lenses and final handoff decisions;
4. `testing-evidence-cloud-first-draft.md` for the £8,750 manuscript to stand up into the article frame;
5. the Testing passages in the Phase 7 specification and plan, plus live source surfaces named by the discovery documents, when factual/source refresh is needed;
6. `testing-evidence-terra-draft.md` and `testing-evidence-sol-first-pass.md` only as superseded historical working material; and
7. `cross-article-thread-ledger.md` for adjacent material already routed elsewhere.

The accepted public-facing proposition is **The right test isn't your favourite test**. The article is engineering-first; agentic pressure testing is a worked transfer of the same judgement, not the centre of gravity. Local Sol owns the aggressive final edit, production article frame, source refresh where needed, presentation and any later admission decision.

For `api-is-only-the-middle`, the durable local-Sol handoff read order is:

1. `api-is-only-the-middle-cloud-editorial-brief.md` for the room contract and protected boundaries;
2. `api-is-only-the-middle-cloud-discovery-record.md` for the main lived-story discovery, evidence classes and anti-inferences;
3. `api-is-only-the-middle-cloud-handoff-addendum.md` for the accepted late discoveries, SQL circularity, stewardship argument, cadence rule and final value lenses;
4. `api-is-only-the-middle-cloud-first-draft.md` for the accepted Cloud manuscript, valued at approximately £9,500 / £10,000 before final local polish;
5. live source surfaces named by the discovery documents when production claims need reverification;
6. `api-is-only-the-middle-next-room-seed.md` and `api-is-only-the-middle-sol-first-pass.md` only as superseded historical working material; and
7. `cross-article-thread-ledger.md` for the repeating new-guy-reset thread deliberately routed away from this manuscript.

The accepted article proposition is **“I just write the code” is not a full sentence**. The implementation remains central, but responsibility continues before and after it. Local Sol owns final subtraction, production article framing, SQL-aside presentation, source refresh where needed, corpus-level fatigue review, any later admission decision and publication proof.

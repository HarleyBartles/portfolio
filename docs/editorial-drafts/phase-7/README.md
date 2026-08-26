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
- `review-graph-terra-draft.md`
- `testing-evidence-terra-draft.md`
- `why-adrs-terra-draft.md`
- `why-adrs-sol-draft.md`

The Terra files are first-pass working drafts. The Why ADRs Sol file incorporates Harley's story-discovery and argument decisions, but remains an editorial working document until its production article is separately approved.

`provisioning-cloud-editorial-brief.md` dogfoods the cross-runtime editorial handoff. Cloud Sol owns story discovery and settled copy on its named draft-PR branch; local Sol accepts the baton only after Harley's copy approval, then owns rendered production and publication proof.

`provisioning-cloud-discovery-record.md` is the durable snapshot of the long-form Cloud discovery conversation through the first major drain. It preserves the cross-repo argument, evidence boundaries, corrections, anti-inferences, voice anchors, related article seeds and unresolved drafting decisions. It is deliberately more complete than the eventual article and must not be mistaken for settled public copy.

`provisioning-cloud-discovery-addendum.md` preserves the late-stage discussion that happened after the main record was written. It contains the final capability framing, Goldilocks connection, Linear `save_*` anecdote, tool/manual boundary, Superpowers adapter-to-fork judgement, workflow provisioning model, contracted spec/plan semantics, Handoff Gates mechanism and evidence, the fresh-agent-as-lens correction, AI-fatigue warning, and the final supported/first-party/anti-inference boundaries. **Local Sol must read both discovery documents before treating the first draft as evidence-backed copy.**

`provisioning-cloud-first-draft.md` is the first coherent manuscript produced from the discovery. Harley has approved saving it as a first draft, not as settled copy. It is subordinate to the two discovery documents where wording, emphasis or evidence boundaries differ. It should receive an in-repo editorial pass using the installed writing/fatigue skills, including scrutiny for stock AI comparisons, false reversal tics, symmetrical scaffolding, comfort phrases and other patterns that weaken Harley's voice.

For Provisioning, the current editorial read order is:

1. `provisioning-cloud-editorial-brief.md`
2. `provisioning-cloud-discovery-record.md`
3. `provisioning-cloud-discovery-addendum.md`
4. `provisioning-cloud-first-draft.md`
5. source surfaces named by the two discovery records as needed for verification

Preserve superseded drafts or record their disposition. Do not silently rewrite another article's factual boundaries while working on the current one.

# Cloud editorial handoff — Phase 8 homepage evidence choreography

**Status:** Opening brief for a time-boxed Cloud chat on this branch's draft PR.

## Your job

Work conversationally with Harley to settle the homepage's material editorial, hierarchy, art-direction and interaction judgments before local Sol writes an implementation plan. Inspect the current homepage and the evidence now available after Phase 7A; do not begin from the 22 August mock assumptions as though the intervening work had not happened.

This is a design and editorial room. Do not implement components, write the JIT plan, update visual baselines or broaden Phase 8 into discovery, first-paint, analytics or launch work owned by later phases. Local Sol retains architecture, planning, implementation, validation and publication authority after Harley closes the room.

## Why the room exists

The approved specification defines the outcome and hard boundaries, but several high-value choices should be judged against the finished site rather than improvised during planning:

1. What exact first-viewport message identifies Harley as a senior full-stack engineer while keeping agentic engineering as an edge rather than the whole identity?
2. Which concrete professional or technical signal earns first-fold space for every selected doorway?
3. How should identity, selected evidence and its direct CTA share the first viewport without becoming either a generic hero or an overfilled dashboard?
4. How much session-stable variation genuinely adds editorial life, and which controls feel authored rather than carousel-like?
5. What is the right visual and reading relationship between the complete four-project deck, the Patch interlude and one admitted essay feature?
6. Which current sections should disappear outright, which ideas should be absorbed, and which existing visual grammar is worth carrying forward?
7. How quiet can the professional route be while still making About, CV, availability and contact obvious to a hiring manager?

The current page provides concrete pressure points, not protected answers: its lead says `I build reliable agentic systems`; it waits on a navigation query before rendering; the shuffled feature deck and a separate three-project grid repeat project evidence; `Working principles` restates claims already better demonstrated elsewhere; the writing surface is a latest/recent feed; and the close announces `Yes, this is also a portfolio.` Phase 8 is expected to replace that architecture, but Cloud must judge the better composition with Harley rather than merely negate the old one.

## Adversarial lenses

Use all three as challenge lenses, not vibes:

- **£ value:** name the plausible agency valuation of the current direction and of the settled recommendation, identify what would lose money at a final design gate, and state what evidence would justify the uplift.
- **Weary hiring manager:** test the first ten seconds, the first deliberate click, the legibility of senior full-stack scope and whether the page reduces the work needed to decide that Harley merits an interview.
- **Cynical principal architect:** attack unsupported architecture theatre, agent-first identity, selection gimmicks, repeated claims, concealed costs and evidence routes that do not survive inspection.

Do not average the lenses into general approval. Record disagreements and the call Harley makes.

## Authority and boundaries

Harley owns taste, professional identity, public facts, privacy, intended tone and final editorial acceptance. The active design policy and approved Phase 8 specification own protected defaults and non-goals. Current repository state owns implementation truth. Project registries, writing metadata, Patch records and the professional profile own their respective facts.

Cloud may propose exact homepage copy and composition. It must distinguish settled decisions from explorations and must not invent experience, outcomes, project maturity, metrics or asset provenance. If a desirable direction conflicts with a protected invariant, identify the conflict for explicit policy/spec amendment rather than eroding it silently.

## Read order

1. `.agents/plans/portfolio-10k/roadmap.md`
2. `.agents/specs/2026-08-21-portfolio-10k-08-homepage-choreography-design.md`
3. `.agents/doctrine/portfolio-design-policy.md`
4. `docs/design-decisions.md`
5. `docs/editorial-drafts/phase-7a/phase-7a-cloud-closeout.md`
6. `docs/editorial-drafts/phase-7a/phase-7a-site-visual-language-recommendations.md`
7. `src/client/src/pages/HomePage.tsx`
8. `src/client/src/features/home/FeatureDeck.tsx`, `featureCatalog.ts` and `featureOrder.ts`
9. the current rendered `/` route at representative desktop and narrow widths
10. this brief and `phase-8-cloud-decision-record.md`

Inspect project and writing sources only when a proposed homepage treatment depends on their exact evidence or visual custody. Do not turn the room into a fresh review of every case study or essay.

## Conversational method

Begin by showing Harley your concise diagnosis of the current homepage through the three adversarial lenses, then ask which problem he most wants the first viewport to solve. Work one material decision at a time. Use sketches in prose, hierarchy outlines or competing copy/composition options when they help Harley judge; do not bury him in a comprehensive questionnaire.

For each direction that survives discussion:

1. state the intended reader effect;
2. identify the exact evidence and source owner;
3. identify what it replaces or demotes;
4. pressure-test the weakest eligible random/selected state;
5. test desktop, narrow, keyboard, reduced-motion, missing-media and storage-failure implications at design level; and
6. record Harley's call and the rejected alternative.

Use the historical editorial-room discipline: preserve useful corrections as they happen, commit only coherent recovery checkpoints, and begin closure before context or time pressure turns the record into a dump.

## Required handoff on this branch

Before Harley closes the room, update, commit and push to this same branch and draft PR:

1. `phase-8-cloud-decision-record.md` with settled hierarchy, copy, interaction, art-direction and responsive decisions;
2. the explicit £, hiring-manager and architect judgments, including disagreements and rejected alternatives;
3. a section-by-section homepage order with each section's job, evidence source, CTA and visual intent;
4. exact public copy only where Harley has approved it; otherwise a bounded copy brief;
5. protected defaults, spec amendments, asset/custody needs and unresolved human gates;
6. a current-repository drift table classifying material spec assumptions as `still true`, `implementation seam moved` or `design conflict`;
7. a clear baton of either `Ready for local planning` or `Blocked`, with the reason; and
8. regenerated indexes if repository machinery requires them.

Do not write the implementation plan. Do not create another branch or PR. Do not mark this draft PR ready. Local Sol will inspect the returned record, reconcile any approved spec amendment and write the JIT plan only after Harley explicitly closes the Cloud room.

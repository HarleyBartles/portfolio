# Portfolio £10k Phase 7A: Professional Outcomes and Proof Compression Design

**Status:** Proposed, source-gated

**Design input:** Weary-skeptic reviews completed 25 August 2026

**Spec-readiness:** 8/10

**Roadmap:** [Portfolio £10k Quality](../plans/portfolio-10k/roadmap.md)

**Depends on:** Phases 1-7 and Harley's approval of one employer-safe outcome
account

## Goal

Close the remaining gap between evidence of responsibility and evidence of
consequence before the homepage turns the portfolio into a faster hiring
journey.

The site already shows what Harley owns, how he reasons, and how he verifies
work. It does not yet make one professional outcome legible enough to answer a
skeptical hiring manager's next questions: who relies on the system, what was
at stake, what condition changed because of Harley's judgement, and how did
that affect the people around the product?

This phase also reduces the cognitive distance to the strongest case-study
evidence. A reader should be able to understand the question, design choice,
proof, cost, and present status near the start of a long case study without
flattening its narrative or art direction.

## Outcome

Phase 7A will deliver:

- one approved, employer-safe Access Checks outcome account;
- a compact stakes, change, outcome, and influence treatment on About;
- a deliberate decision on whether a shorter version belongs in the CV;
- a concise professional-provenance treatment identifying Barbican and Arch as
  the place Harley acquired his DDD, CQRS, event-sourcing, and related
  architectural kit in practice;
- canonical professional-fact ownership in `professionalProfile.ts`, with
  claim precision and disclosure boundaries recorded;
- a compact evidence abstract near the start of each long engineering case
  study;
- Phase 8 inputs that can bring consequential professional evidence into the
  first-click hiring journey without duplicating the About narrative;
- skeptical-reader and confidentiality review; and
- no invented metric, generic impact claim, or employer case-study sprawl.

## The missing evidence class

Responsibility evidence answers `what did Harley carry?` Outcome evidence
answers `what changed because Harley carried it well?`

Both matter. Scope without consequence can read as self-positioning. Outcome
without scope can hide the judgement that produced it. The public account must
connect them in one bounded chain:

1. **Dependants and stakes:** who or what relies on the product, at a safe
   level of abstraction, and what goes wrong when it is unavailable, wrong, or
   ambiguous;
2. **Before:** the relevant condition before Harley's decision;
3. **Change:** the exact decision, intervention, or delivery move Harley can
   honestly own;
4. **Outcome:** the observable condition afterwards;
5. **Influence:** how Product, Support, QA, operations, customers, or other
   engineers were able to act differently; and
6. **Disclosure:** whether each fact is exact, approximate, qualitative, or
   withheld for confidentiality.

The bounded AI architecture should appear only when it affected this chain. A
description of deterministic boundaries pays rent when it explains safer
operation, clearer recovery, supportability, or another approved human or
business consequence. Architecture labels alone do not satisfy this phase.

## Source discovery gate

Before public copy is drafted, ask Harley for one strong example. Do not seek a
metric for every responsibility. Record:

1. who or what relies on Access Checks;
2. the consequence when it is unavailable, wrong, or unclear;
3. the relevant before condition;
4. Harley's exact decision or change;
5. the observable result;
6. the effect on Product, Support, QA, operations, customers, or other
   engineers; and
7. which details are exact, approximate, qualitative, or confidential.

Harley's approved account is the source for private professional experience.
Repository evidence may corroborate public technical facts but cannot infer
employer outcomes. Existing portfolio prose, an agent summary, or a plausible
industry consequence is not source truth.

If no employer-safe example survives this gate, the phase remains blocked. It
must not substitute adjectives, implied metrics, or a generic statement that
the work was important.

## Professional-surface contract

### About

About receives one compact outcome treatment, not a full employer product case
study. It should let the consequence of Harley's judgement establish seniority
without claiming a title he does not hold.

The treatment must:

- preserve the formal `Software Engineer` title and the existing explanation
  of effective scope;
- state the stakes at an employer-safe level;
- show one before, change, and after chain;
- include one example of organisational influence;
- connect bounded AI to a consequence only when the source account earns it;
  and
- remain concise enough that the broader professional chronology still has
  room to breathe.

About may also carry one compact professional-history statement connecting the
Barbican and Arch period to Harley's current architecture and knowledge-custody
practice. The `Why ADRs?` essay owns the full argument. About should establish
provenance, selective use, and the consequence of lost reasoning without
becoming another architecture essay.

### CV

The CV is not required to repeat the About narrative. At implementation time,
decide whether a shorter outcome line adds more hiring value than it costs in
space and repetition. Record the decision either way.

### Canonical facts

Reusable public facts belong in `professionalProfile.ts`, not independently
worded literals across About, CV, homepage, and writing. The implementation may
extend the current profile type, but it must distinguish:

- the public statement;
- its basis;
- its precision;
- its disclosure limit; and
- the routes allowed to consume it.

The model should prevent accidental strengthening while allowing About, CV,
Phase 7 writing, and Phase 8 choreography to use different lengths of the same
approved truth.

## Case-study proof-compression contract

Each long engineering case study should offer a compact evidence abstract near
its beginning. The abstract answers:

- **Question:** what difficult product or engineering question shaped the
  work?
- **Design:** what consequential choice did Harley make?
- **Proof:** what can the reader inspect?
- **Cost:** what trade-off or ongoing burden came with the choice?
- **Status:** what is true today?

This is an orientation aid, not a standardised scorecard. It may use prose,
metadata, or a small composition that suits the case study's own visual
language. It must not displace a strong narrative opening, turn every page into
the same template, or repeat the article in miniature.

The current long-form candidates are Marketplace, Wild Bunch, Adventures of
Patch, and Agentic Learning Lab. The implementation plan must inspect their
then-current openings before deciding which already satisfy part of the
contract and which need a bounded retrofit.

Wild Bunch carries specific deferred inputs from the Phase 7 ADR work:

- ADR-0028 records event recording masquerading as event sourcing and rejects
  that drift;
- later architecture makes typed events, replay, projection authority,
  optimistic concurrency, disposable snapshots, and version or upcasting
  behaviour materially true; and
- integration tests damage or stale snapshot state and require production
  loading to recover equivalent state from the event stream.

These are proof-compression candidates because they expose a mistake,
correction history, and falsifiers. Phase 7 must not edit the accepted Wild
Bunch page. Phase 7A re-inspects the pinned public source before deciding how
much of this evidence the case study can carry without losing its narrative.

## Optional portfolio-as-software receipt

The repository's release discipline is legitimate corroborating evidence:
quality gates, asset custody, accessibility checks, route verification, bundle
budgets, and deployed checks show that the portfolio itself is engineered.

Phase 7A may surface one restrained example only if it strengthens the reader's
understanding of Harley's practice. It must link to an inspectable receipt and
must not become a badge wall, CI dashboard, or self-awarded certificate.

## Non-goals

Phase 7A will not:

- publish customer names, candidate data, internal volumes, financial figures,
  security detail, contractual information, or private system topology;
- invent or reverse-engineer employer outcomes;
- turn Access Checks into a public product case study;
- add a generic impact section full of adjectives;
- rewrite the complete About chronology or CV;
- duplicate the same professional narrative on homepage, About, CV, and
  writing;
- reopen the accepted arguments or art direction of completed case studies;
- replace narrative hooks with tables;
- turn proof compression into one rigid component used everywhere;
- build the Phase 8 homepage; or
- expand into a general site-polish pass.

## Fast-to-break skepticism handoff

Phase 8 should receive three stable inputs from this phase:

1. one consequential professional signal suitable for a short first-click
   route;
2. an About destination that proves responsibility and consequence together;
   and
3. case-study openings that disclose their proof responsibility before the
   reader has to reconstruct it from several screens.

The homepage may compress these inputs, but it must not strengthen them. The
quiet professional route should land where the outcome chain is immediately
legible. Project doorways should promise only the question and proof the
destination actually supplies.

## Validation

Validation must include:

- a claim-by-claim source and disclosure review with Harley;
- negative checks for unapproved employer details and stronger title language;
- tests proving canonical professional facts are consumed rather than copied;
- About and CV component or document checks appropriate to the implementation;
- manual reading of each affected case-study opening as one coherent piece;
- desktop, tablet, mobile, 200% zoom, keyboard, and representative screen-
  reader review for changed layouts;
- a weary-skeptic review beginning at About and at every affected case study;
- canonical `py -3 tools/run.py ci --check`; and
- hosted checks on the exact PR head.

## Acceptance criteria

- [ ] one employer-safe professional example records dependants, stakes,
      before, Harley's change, observable outcome, organisational influence,
      and disclosure class;
- [ ] About makes both responsibility and consequence legible without becoming
      an employer product case study;
- [ ] About identifies the professional provenance and selective use of
      Harley's architectural kit without duplicating the ADR essay;
- [ ] the bounded AI decision is connected to an approved human, operational,
      or business consequence, or is deliberately omitted from the outcome
      treatment;
- [ ] seniority is inferable from judgement and consequences while the formal
      title remains exact;
- [ ] the CV inclusion decision is recorded and any retained line shares the
      canonical fact source;
- [ ] reusable professional facts have one authority and cannot silently grow
      stronger across routes;
- [ ] each long engineering case study gives an early question, design, proof,
      cost, and status fast path without losing its narrative opening or visual
      identity;
- [ ] Wild Bunch proof compression uses refreshed public evidence of mistake,
      correction, and falsification, while Phase 7 leaves the accepted page
      untouched;
- [ ] any portfolio-as-software receipt is inspectable, restrained, and
      corroborating rather than self-certifying;
- [ ] a skeptical reviewer can identify why the professional responsibility
      mattered and what changed because of Harley's judgement;
- [ ] confidentiality and precision boundaries survive copy, metadata, tests,
      and previews; and
- [ ] canonical and hosted validation pass on the final source.

## Readiness assessment

**Rating: 8/10, direction is clear and implementation is source-gated.**

The independent review identified a distinct missing evidence class rather
than another presentation defect. The route ownership, compression contract,
privacy boundary, and downstream homepage responsibility are clear. Readiness
cannot reach 9/10 until Harley supplies and approves one concrete professional
outcome account.

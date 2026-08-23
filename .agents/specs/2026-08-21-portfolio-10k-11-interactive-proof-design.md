# Portfolio £10k Phase 11: Interactive Proof Value-gate Design

**Status:** Approved

**Approved design dialogue:** 22 August 2026

**Approved written specification:** 22 August 2026

**Spec-readiness:** 9/10

**Implementation-plan readiness:** No feature plan authorised; perform the
approved evidence re-check after Phases 1–10 land

**Repository snapshot inspected:** `d650c387f4487754092e5f6dee484983f7514b08`

**Depends on:** the implemented evidence and interaction system produced by
Phases 1–10

This specification records a deliberate no-build decision for the launch
version. Restraint is the designed outcome, not an omitted task. Phase 11 is a
value gate: interaction enters the portfolio only when it exposes important
senior-engineering evidence that the static editorial system cannot carry.

## Goal

Protect launch velocity, accessibility, performance, and argumentative clarity
from an interaction added primarily to demonstrate that the site can be
interactive. Preserve the strongest candidates with objective reconsideration
triggers instead of adding “coming soon” surfaces or speculative infrastructure.

## Value-gate method

Judge each candidate against:

1. **Unique senior proof:** what consequential judgement becomes inspectable
   only through interaction?
2. **Evidence fidelity:** is the interaction driven by real, attributable
   project evidence rather than a portfolio-only simulation?
3. **Readiness:** are stable data, assets, and behaviours available now?
4. **Accessibility:** does the interaction have an equally meaningful keyboard,
   zoom, reduced-motion, and non-visual route?
5. **Performance:** does its proof repay initial and deferred payload?
6. **Maintenance:** can it remain truthful as the source project evolves?
7. **Launch velocity:** can it be delivered and reviewed without displacing a
   higher-value hiring surface?
8. **Static sufficiency:** does an existing case study already communicate the
   same decision more clearly?

A candidate must materially beat no-build, not merely be feasible.

## Candidate decision matrix

| Candidate | Distinct potential | Launch evidence and cost | Decision |
| --- | --- | --- | --- |
| Marketplace explorer | Let a reader inspect how capabilities are packaged and selected across repositories. | The Phase 3 case study already explains boundaries, provenance, shared-versus-local choice, and maintenance. A live inventory introduces freshness, filtering, and generated-data ownership without exposing a new consequential decision. | Do not build for v1. |
| Patch pipeline visualisation | Make controlled creative production, custody, gates, and rework paths explorable. | Phase 5 already turns the pipeline into an authored visual argument. A richer visualisation repeats that proof while adding motion, asset, responsive, and accessibility burden. | Do not build for v1. |
| Learning Lab exercise | Let a visitor experience a bounded teaching activity and its guardrails. | The curriculum is new and deliberately honest about delivery maturity. A runner would imply an LMS-like product and learner evidence that does not yet exist. | Do not build for v1. |
| Wild Bunch replay/event viewer | Expose controlled determinism, event history, reproduction, and diagnosis in a way prose and screenshots cannot fully simulate. | This is the strongest future candidate, but the game is pre-alpha and no stable public replay payload or finished viewer contract is available. A portfolio-only facsimile would weaken the evidence claim. | Defer until source evidence stabilises. |
| No build | Preserve a fast, accessible editorial portfolio whose existing interactions serve navigation, disclosure, sharing, and comprehension. | Adds no new proof but avoids diluting the four distinct case-study arguments or delaying launch. | **Selected for v1.** |

## Approved outcome

Phase 11 closes without a visitor-facing feature, feature implementation plan,
placeholder, or empty navigation destination.

After Phases 1–10 land, the implementation wave performs one short evidence
re-check against the matrix. If the evidence has not materially changed, the
roadmap records the no-build closeout and its current commit context. This may
be included in Phase 12's documentation change rather than creating a theatre
PR whose only purpose is to say that nothing was built.

If a candidate newly clears the gate, stop and return to design. Do not treat
this specification as latent authority to implement it.

## Reconsideration triggers

Reopen interactive proof only when at least one of these becomes true:

- Wild Bunch publishes a stable replay/event fixture with an attributable
  schema and an accessible viewer can expose diagnosis without depending on a
  running private environment;
- Learning Lab has real delivery evidence and one contained exercise whose
  interactive form proves facilitation better than the case study;
- Marketplace publishes a stable machine-readable composition view where a
  bounded explorer reveals a decision the static case study cannot;
- Patch gains a real branching production receipt where inspection changes the
  reader's understanding of creative governance; or
- another project provides evidence whose essential relationship cannot be
  communicated accessibly in static editorial form.

Readiness alone is insufficient: the candidate must still beat the complete
site on unique hiring value and maintenance cost.

## Non-goals

- no interactive feature at launch;
- no dashboard, terminal simulation, repository browser, playground, game
  embed, LMS runner, or animated pipeline;
- no “coming soon”, disabled control, waitlist, or roadmap card in public UI;
- no speculative data-export contract added to another repository;
- no reduction of useful existing navigation, disclosure, share, or accessible
  motion because those are not novelty features; and
- no implication that restraint means the portfolio lacks frontend ability.

## Binding execution model

This binding, prospective execution model governs implementation,
continuation, or rework begun after 23 August 2026. It does not claim who
planned, implemented, reviewed, or accepted earlier work.

GPT-5.6 Sol is the sole main phase orchestrator. Sol reads the roadmap, this
approved phase specification, current repository truth, the portfolio design
policy, design-decision ledger, and relevant runbooks; writes the JIT
implementation plan; selects `/subagent-driven-development`; and maintains the
whole-plan view, task sequencing, integration, evidence, handoff readiness,
and completion drive.

Every subagent must use GPT-5.6 Terra. This includes implementation,
research, repair, task-review, re-review, and final-review subagents. Only the
main GPT-5.6 Sol orchestrator may create subagents: Terra workers cannot
delegate or create children. A Terra worker may propose decomposition or a
fresh-context review to Sol; Sol alone decides dispatch, role and reasoning
effort, sequencing, budget, concurrency, and reconciliation, and records that
decision in the plan or ledger. Keep the topology shallow: Sol -> Terra only;
Terra -> Terra descendants are prohibited. Generic escalation must not create a
Sol child: the Sol main agent narrows or replans the work and redispatches
Terra.

Before Terra begins material creative work, Sol records a phase-specific
creative-review brief in the JIT plan. Sol derives it from the approved phase
outcome, non-goals, protected defaults, design policy, decision ledger, and
current repository truth. The brief names the audience, intended response,
constraints and protected defaults, factual and privacy boundaries,
distinctive design intent, failure modes, observable acceptance signals, and
evidence surface.

The JIT plan records Sol's selected review lenses. Sol must use
`/writing-with-clarity` and the matching `/unslop-profiles` profile for
material prose, creative writing, documentation, plans, and handoffs, plus
the relevant artifact-specific skills and doctrine lenses. Model reputation or
an unsupported claim that Sol has better taste is never acceptance evidence.

Terra may draft creative work, but Sol personally reviews every material
creative output: public copy, creative writing, visual style, art direction,
hierarchy, imagery and capture framing, and interaction tone. Sol assesses
taste, humanness, restraint, specificity, and AI-slop risk against the £10k
portfolio bar.

Sol inspects the actual rendered or readable artifact, not Terra's
self-description, and records `pass` or `veto`, the artifact and evidence
reviewed, every criterion result, limitations, and unresolved human gates. A
veto becomes a bounded Terra revision brief naming the failed criterion or
emergent defect, observed evidence, intended effect, preserved constraints,
and re-review evidence. It constrains badness and preserves intent without
prescribing the creative answer or collapsing the result into formula.

The rubric is a floor and diagnostic aid, never an exhaustive formula or taste
scorecard; satisfying its listed criteria does not force a pass. Sol may veto
technically compliant work that is lifeless, generic, overwritten, derivative,
predictable, or off-tone, but must identify the artifact evidence, observed
defect, and intended effect. Unarticulated dislike is insufficient.

This process supports consistent, inspectable review and evidence-backed
decisions. It does not mechanically prove taste, humanness, originality, or
£10k quality. CI, profile conformance, or model identity cannot substitute for
Sol's review or a named Harley gate.

This creative gate precedes and does not replace any named Harley approval or
factual, privacy, custody, accessibility, deployed-proof, or protected-default
gate. Iteration stops only on a recorded pass or a genuine Harley-owned
decision.


## Evidence re-check contract

The closeout reviewer must inspect the then-current portfolio and relevant
public source repositories, then record:

- the commit or public evidence inspected for each candidate;
- whether readiness or unique-proof circumstances changed;
- whether static case-study coverage still carries the argument;
- any new accessibility, performance, custody, or maintenance cost; and
- the resulting no-build confirmation or design-escalation reason.

The check is evidence gathering, not an invitation to brainstorm a sixth
candidate. Private plans may establish that ideas exist but cannot support
public proof on their own.

## Validation and acceptance criteria

- [ ] all five options are assessed against the same eight value criteria;
- [ ] the final implemented Phases 1–10 are re-inspected rather than assuming
      this snapshot remains current;
- [ ] no candidate is credited with evidence that its source project does not
      expose;
- [ ] no-build remains selected unless a candidate uniquely strengthens the
      senior-hiring argument and clears every evidence, accessibility,
      performance, maintenance, and velocity gate;
- [ ] a changed decision returns to design and human approval before planning;
- [ ] no public placeholder or speculative implementation is added;
- [ ] the shortlist and reconsideration triggers remain available for future
      work without becoming commitments; and
- [ ] the roadmap records the closeout evidence and decision.

## Readiness assessment

**Rating: 9/10 — approved for a bounded post-Phase-10 evidence re-check; no
feature implementation is authorised.**

The comparison method, current evidence, no-build outcome, reconsideration
triggers, and closeout proof are explicit. The only intentionally live input is
whether preceding implementation or upstream public projects materially change
the evidence before launch.

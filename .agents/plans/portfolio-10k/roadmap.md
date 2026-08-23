# Portfolio £10k Quality — Roadmap

This is the live control document for the next portfolio-quality epic. It turns
the approved [direction checkpoint](../../../docs/portfolio-10k-direction-checkpoint.md)
into consecutive, independently reviewable releases without pretending the
implementation details can be planned months in advance.

**Created:** 21 August 2026

**Status:** Approved; design wave complete; implementation wave in progress (Phase 1 merged via PR #19)

**Starting main:** `bd07d8a09581bdde40cddff4e880db426a50cd82`

**Design-wave completeness:** 12/12 written phase specifications approved at
9/10 spec-readiness.

**Implementation-handoff readiness:** 9/10. Phase outcomes, dependencies,
current-truth checks, model routing, human taste gates, and stop conditions are
bounded without manufacturing implementation plans before their time.

## Epic outcome

Move the portfolio from a strong editorial foundation toward a £10k-quality
hiring instrument for senior full-stack roles: professionally explicit,
evidence-rich, visually specific, technically finished, and honest under close
engineering scrutiny.

The active [portfolio design policy](../../doctrine/portfolio-design-policy.md)
continues to govern every phase. This roadmap sequences change; it does not
replace the policy, the [design-decision ledger](../../../docs/design-decisions.md),
or live repository evidence.

## Artifact contract

This epic intentionally adapts the default `/writing-roadmaps` sequence.

### Design wave

1. Brainstorm each phase as a bounded product and engineering problem.
2. Write the named design spec under `.agents/specs/`.
3. Define exact outcomes, non-goals, source-of-truth boundaries, content and
   asset inputs, affected file families, accessibility and performance
   expectations, validation, and user-owned decisions.
4. Run spec self-review and the `handoff-gates` spec-readiness lane. The minimum
   is 8/10 and the target is 9/10.
5. Obtain Harley's approval and record the approved spec link and rating here.

Complete the design wave for all retained phases before beginning the
implementation wave unless Harley explicitly changes the sequence. Specs are
solid design artefacts, but they are not immutable contracts.

### Implementation wave

For each next phase:

1. Inspect current repository and relevant external source truth.
2. Compare that evidence with the approved spec.
3. Update and re-approve the spec when divergence changes the design; record
   the reason in Handoff Notes.
4. Use `/writing-plans` to create the implementation plan just in time. Do not
   manufacture all implementation plans upfront.
5. Run plan-readiness, execute, review, merge, and record the plan, commit, PR,
   rating, and learning here before moving on.

A later agent may refine implementation detail from current truth. It may not
silently invent a missing product decision. If a spec cannot support planning
at 8/10 or higher, return to design and ask one focused question.

### Binding execution model

This binding, prospective execution model governs every JIT implementation
plan and all implementation, continuation, or rework begun after 23 August
2026. It does not claim that earlier planning, implementation, review, or
acceptance used this model.

GPT-5.6 Sol is the sole main phase orchestrator. For every phase, Sol must
read, in order:

1. this roadmap and its latest Handoff Notes;
2. the active approved phase specification;
3. the current repository and merged predecessor work;
4. the portfolio design policy and design-decision ledger; and
5. the relevant repository runbooks and skills.

Sol writes the JIT implementation plan; no other agent assumes that phase
orchestration role.

Before writing the plan, record a compact drift table. Classify each material
spec assumption as `still true`, `implementation seam moved`, or `design
conflict`. A moved seam updates the plan to current truth. A design conflict
returns to the specification and Harley; it is never silently reinterpreted.

Sol may split an oversized phase into consecutive implementation plans
when that preserves reviewability, but every plan must state which part of the
approved outcome it delivers and the roadmap phase closes only when its full
acceptance contract is met. Phase 1 and Phase 2 predate the normalised spec
headings: treat their Outcome boundaries as non-goals and their Acceptance
outcomes as acceptance criteria rather than rewriting them cosmetically.

Sol selects `/subagent-driven-development` and maintains the whole-plan view,
task sequencing, integration, evidence, handoff readiness, and completion
drive. Every subagent must use GPT-5.6 Terra. This includes implementation,
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
gate. Deterministic checks and human quality judgement remain separate gates.
Iteration stops only on a recorded pass or a genuine Harley-owned decision.
Every presentation-bearing phase marks manual review at 1440, 768, 390, and
320 CSS pixels, 200% zoom, keyboard navigation, and reduced motion. Stop for
Harley when a change affects public facts or tone, privacy, asset custody or
licensing, protected design defaults, launch/no-build scope, or a genuinely
unresolved visual or editorial choice.

A fresh-context Terra review provides contextual independence, not model-family
diversity. Every handoff reports evidence coverage, tools used, limitations,
unrun checks, and decisions still owned by Harley; a clean reviewer or CI result
alone is never described as proof-grade green.

## Status and table conventions

`Status` tracks the implementation-plan lifecycle and uses the required epic
values: `pending`, `writing`, `ready`, `executing`, `done`, or `blocked`.

Until a spec exists, its cell contains the intended source path as plain code.
After human approval, replace it with a link and record the spec-readiness
rating in Notes. Plan files remain `—` until written just in time. `Rating`
records the current stage's latest handoff rating: spec-readiness before a plan
exists, then plan-readiness or final handoff readiness as the phase advances.

## Plan sequence

| # | Title | Status | Spec File | Plan File | Commit | PR | Rating | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Professional truth and About narrative | done | [approved spec](../../specs/2026-08-21-portfolio-10k-01-professional-truth-about-design.md) | [JIT implementation plan](2026-08-22-portfolio-10k-phase-1-professional-truth.md) | [`cd5b73b`](https://github.com/HarleyBartles/portfolio/commit/cd5b73b2ea402f8e6a2a8fe175e9569536bbd376) | [#19](https://github.com/HarleyBartles/portfolio/pull/19) | 9/10 | Local canonical validation passed on the final PR head; the hosted Portfolio quality gate then passed before PR #19 merged to `main` on 22 August 2026. |
| 2 | CV and contact conversion | done | [approved spec](../../specs/2026-08-21-portfolio-10k-02-cv-contact-design.md) | [JIT implementation plan](2026-08-22-portfolio-10k-phase-2-cv-contact.md) | [`f8b76a7`](https://github.com/HarleyBartles/portfolio/commit/f8b76a74d9900574eb645ecefece85800f14b791) | [#20](https://github.com/HarleyBartles/portfolio/pull/20) | 9/10 | PR #20 merged on 22 August 2026 after the hosted Linux Portfolio quality gate passed. Formspree and GitHub secret configuration were completed externally; controlled live delivery remains the post-merge proof step. |
| 3 | Marketplace flagship and case-study system | ready | [approved spec](../../specs/2026-08-21-portfolio-10k-03-marketplace-case-study-design.md) | [JIT implementation plan](2026-08-22-portfolio-10k-phase-3-marketplace-case-study.md) | — | — | 9/10 | JIT plan written from merged `main` at `f8b76a7`. The Marketplace gitlink already equals the approved evidence revision `52866df…`; implementation verifies it rather than creating a redundant update. |
| 4 | Wild Bunch architectural proof | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-04-wild-bunch-case-study-design.md) | — | — | — | 9/10 | Written spec approved by Harley on 21 August 2026. Demonstrate complex architecture when earned; depends on the case-study system. The implementation agent gathers final gameplay captures from the approved deterministic recipe. |
| 5 | Adventures of Patch pipeline story | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-05-patch-pipeline-case-study-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Turn the project origin, published work, in-flight worlds, governed pipeline, and private story lab into evidence of controlled creative production. |
| 6 | Agentic Learning Lab leadership proof | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-06-learning-lab-case-study-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Make curriculum architecture, cognitive grades, mentoring, learner safety, and practical agent adoption visually inspectable. |
| 7 | Writing authority and breadth | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-07-writing-authority-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Deliver a five-essay launch floor: two core-engineering arguments, three distinct agentic arguments, an evidence-gated Graph/Context choice, curated continuation paths, and homepage-feature-ready metadata. |
| 8 | Homepage evidence choreography | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-08-homepage-choreography-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Build a progressively enhanced editorial front page, a complete four-project deck, one Patch fairytale interlude, one essay feature, and a quiet professional route without feed, repetition, autoplay, or pitch clutter. |
| 9 | Discovery and sharing finish | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-09-discovery-sharing-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Finish custom-domain identity, shared route metadata, route-aware previews, deterministic discovery files, restrained sharing, and a tested project-URL fallback while explicitly deferring RSS. |
| 10 | Direct-route first-paint finish | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-10-direct-route-first-paint-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Replace generic preparation states with catalogue-derived route identity while preserving static delivery and lazy loading. |
| 11 | Interactive proof value gate | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-11-interactive-proof-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. No-build is selected for v1, subject to one evidence re-check after Phases 1–10; a changed decision returns to design. |
| 12 | Launch audit and measurement decision | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-12-launch-audit-design.md) | — | — | — | 9/10 | Written specification approved by Harley on 22 August 2026. Whole-site launch audit and bounded defect closure, with a dated evidence report and no analytics at launch. |

## Case-study proof responsibilities

Reinforcement across case studies is expected. Evidence before adjectives,
proportionate complexity, accountable human authority, and honest maturity are
portfolio-wide values. A case study earns its place only when it applies those
values to a distinct senior-level decision and consequence.

| Case study | Distinct senior proof | Legitimate reinforcement | Duplication failure to avoid |
| --- | --- | --- | --- |
| Agent Asset Marketplace | Boundary-setting and operational governance for reusable worker capabilities: what is shared, selected, or kept local. | Provenance, evidence, maintainability, and resistance to unnecessary accumulation. | A generic agentic-workflow explainer or a catalogue whose inventory substitutes for judgement. |
| Wild Bunch | Architectural depth under product constraints: determinism, replay, diagnosis, and domain boundaries that repay their complexity. | Testing, evidence, trade-offs, and engineer-directed agent implementation. | A pattern inventory or another generic defence of AI-assisted authorship. |
| Adventures of Patch | Controlled creative production and memorable technical communication through framing, custody, QA, and acceptance gates. | Human judgement, evidence receipts, production pipelines, and honest work states. | A generic lesson catalogue or a second curriculum case study distinguished only by imagery. |
| Agentic Learning Lab | Mentoring and capability transfer through curriculum architecture, learner safety, cognitive progression, and bounded experimentation. | Safe authority, verification, agent-assisted construction, and honest maturity. | A repository tour or another Patch-style teaching showcase without evidence of learner-system design. |

Phase 8 must preserve these distinctions in homepage choreography and project
previews. If a case study's implemented argument collapses into another row,
strengthen, merge, or remove it rather than preserving it for catalogue volume.

## Phase boundaries

### 1. Professional truth and About narrative

Create one durable source for employment dates, qualification state, public-
safe claims, and role language. Use it to replace stale duration copy and turn
About into the authored professional narrative described by the checkpoint.
Keep CV production, contact delivery, and homepage recomposition out of this
phase.

### 2. CV and contact conversion

Produce the conventional hiring artefact and a working, abuse-conscious contact
journey without publishing personal contact literals or adding a runtime
backend to this repository. Decide availability and location wording here. If
provider choice is externally blocked, preserve a meaningful contained release
and record the activation dependency rather than blocking unrelated phases.

### 3. Marketplace flagship and case-study system

Design the reusable anatomy of a senior-level case study through Agent Asset
Marketplace: problem, role, constraints, decisions, evidence, present state,
and learning. Add project-native diagrams or artefacts with custody. The system
must remain flexible enough for later projects to receive distinct art
direction rather than identical templates.

### 4. Wild Bunch architectural proof

Show why this domain earns DDD and complex architecture, what Harley decided,
and what visitors can inspect. Real gameplay captures replace the current
placeholder; the spec must include an exact capture brief, let the implementing
agent gather the final images, and retain a fallback if the local build is not
available. Do not position DDD as Harley's whole identity.

### 5. Adventures of Patch pipeline story

Use role kits, scene assets, pipeline stages, and finished work to explain a
controlled creative system. Design a legible pipeline composition rather than
shrinking a text-heavy finished page into a meaningless thumbnail. Preserve
Patch as a supporting signature across the wider site.

### 6. Agentic Learning Lab leadership proof

Make the curriculum, exercises, learner journey, guardrails, and practical
outcomes concrete. The case study should prove leadership and communication,
not merely that a repository of teaching files exists.

### 7. Writing authority and breadth

Deliver five fully groomed, author-approved essays rather than preserving the
current mix of one finished article and four placeholders. The launch roster
contains two core-engineering arguments and three agentic-engineering arguments
with distinct responsibilities: professional position, environment design,
process governance, end-to-end API ownership, and evidence-led testing.

The review-graph article proceeds only when refreshed public default-branch
evidence can support it at JIT time. `Context is not the same as state` is the
pre-approved Plan B and absorbs the strongest material from `Pass references,
not paragraphs` if needed.

The phase owns article argument, principal figures, editorial datelines,
reading finish, source and asset custody, two curated continuation choices per
essay, author review, and the metadata that makes every published essay
eligible for a homepage feature. It does not choose or render the Phase 8
homepage feature, create a search or taxonomy system without archive-scale
evidence, or make editorial dates into publication receipts.

### 8. Homepage evidence choreography

Only after the professional narrative, flagship projects, and writing are
substantially stable, redesign the homepage journey around the strongest
evidence. Retain useful randomness and manual motion, eliminate adjacent
duplicate stories, and make the senior full-stack proposition clear within the
first viewport without turning the page into a generic sales funnel.

### 9. Discovery and sharing finish

Finish how pages are found, shared, and identified: `harleybartles.com`, static
route metadata, canonical URLs, route-appropriate social artwork, deterministic
discovery files, and restrained sharing. Record RSS as deliberately deferred.
The spec must distinguish repository work from DNS or platform actions
requiring Harley's authority and must preserve GitHub Pages static delivery.

### 10. Direct-route first-paint finish

Reproduce the full generated-HTML, router, and content-loading lifecycle, then
replace the brief generic “Preparing the portfolio” state with small useful
route identity derived from Phase 9's catalogue. Preserve static GitHub Pages
delivery, lazy loading, accessibility, layout stability, and bundle budgets;
do not add SSR or duplicate the content system.

### 11. Interactive proof value gate

The approved v1 outcome is no-build. The Marketplace explorer, Patch pipeline,
Learning Lab exercise, and Wild Bunch replay viewer do not currently beat the
complete static evidence on unique hiring value, readiness, accessibility,
maintenance, performance, and launch velocity. Re-check the landed evidence
once after Phase 10; any changed selection requires fresh design approval.

### 12. Launch audit and measurement decision

Audit the complete hiring journey and every public route against the frozen
£10k baseline. Resolve launch blockers and bounded defects, publish a dated
evidence report, and seek final human launch approval. No analytics are added:
there is no concrete launch decision that currently earns their privacy,
performance, and maintenance cost. This phase validates the whole rather than
introducing a second redesign.

## Dependency logic

- Phase 1 is the source for professional claims used everywhere else.
- Phase 2 depends on Phase 1's facts but may be bypassed temporarily if an
  external contact-provider decision is blocked.
- Phase 3 establishes the case-study system consumed by Phases 4–6.
- Phases 4–6 may be re-ordered after Phase 3 if asset readiness changes, but
  the reason must be recorded in Handoff Notes.
- Phase 7 precedes the homepage so the final editorial hierarchy uses real
  flagship material.
- Phase 8 depends on the stable outputs of Phases 1 and 3–7.
- Phase 9 follows route and content stabilisation; Phase 10 may move earlier if
  investigation proves it blocks trustworthy content review.
- Phase 11 is conditional and must not hold Phase 12 hostage after a justified
  no-build decision.
- Phase 12 is the only whole-site closeout phase.

## Epic-wide constraints

- The site remains a static React/Vite GitHub Pages application unless a later
  approved requirement demonstrates that static delivery cannot satisfy it.
- Every public claim is user-supplied, repository-proven, or source-backed and
  appropriate for publication.
- No phase publishes proprietary employer information, plaintext personal
  contact details, invented metrics, screenshots, or maturity.
- Visual assets require project relevance, ownership evidence, responsive
  treatment, useful alt intent, and custody records.
- Motion communicates hierarchy or state, never autoplays, and respects
  reduced motion.
- Objective guards may evolve with approved behaviour; brittle assertions
  about exact prose, component names, or incidental styling are not the goal.
- Each implementation phase should be independently mergeable and should
  leave the public site more useful than it found it.

## Handoff Notes

- Roadmap source: approved Portfolio £10k Direction Checkpoint, merged through
  [PR #16](https://github.com/HarleyBartles/portfolio/pull/16) at
  `1663f8ead33c3854c93f3bd46978811b6c968708`.
- User-approved workflow variation: write and approve a granular design spec
  for every retained roadmap phase before writing implementation plans; write
  those plans just in time from the spec plus current repository truth.
- Imagery is owned by the case study whose argument it supports. There is no
  detached “add pictures” phase.
- Phase 4 capture ownership: the implementation agent gathers final Wild Bunch
  screenshots using the approved deterministic recipe; exploratory design-wave
  captures are reference evidence, not deployed assets.
- The interactive artefact is a value gate, not a promise to add novelty.
- If a phase spec reveals multiple independent deliverables, split the roadmap
  item before plan-writing and record the reason here.
- Design dialogue for Phases 10–12 was approved as one consolidated packet on
  22 August 2026. Each outcome remains a separate specification and handoff
  gate; Harley approved all three written specifications on 22 August 2026.
- The design wave completed on 22 August 2026 with all twelve phase specs at
  9/10 readiness. The binding prospective execution model is recorded above;
  it does not rewrite the history of that design wave.

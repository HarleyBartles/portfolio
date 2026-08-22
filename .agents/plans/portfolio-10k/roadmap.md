# Portfolio £10k Quality — Roadmap

This is the live control document for the next portfolio-quality epic. It turns
the approved [direction checkpoint](../../../docs/portfolio-10k-direction-checkpoint.md)
into consecutive, independently reviewable releases without pretending the
implementation details can be planned months in advance.

**Created:** 21 August 2026

**Status:** Approved; design wave complete; implementation wave pending

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

This epic intentionally adapts the default `/working-with-epics` sequence.

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

### Implementation-wave agent contract

The implementation wave is deliberately suitable for an efficient execution
model without delegating product taste to it. For every phase, the JIT planner
must read, in order:

1. this roadmap and its latest Handoff Notes;
2. the active approved phase specification;
3. the current repository and merged predecessor work;
4. the portfolio design policy and design-decision ledger; and
5. the relevant repository runbooks and skills.

Before writing the plan, record a compact drift table. Classify each material
spec assumption as `still true`, `implementation seam moved`, or `design
conflict`. A moved seam updates the plan to current truth. A design conflict
returns to the specification and Harley; it is never silently reinterpreted.

The planner may split an oversized phase into consecutive implementation plans
when that preserves reviewability, but every plan must state which part of the
approved outcome it delivers and the roadmap phase closes only when its full
acceptance contract is met. Phase 1 and Phase 2 predate the normalised spec
headings: treat their Outcome boundaries as non-goals and their Acceptance
outcomes as acceptance criteria rather than rewriting them cosmetically.

Deterministic checks and human quality judgement are separate gates. CI cannot
prove the £10k quality bar. Every presentation-bearing phase marks manual review
at 1440, 768, 390, and 320 CSS pixels, 200% zoom, keyboard navigation, and
reduced motion. Stop for Harley when a change affects public facts or tone,
privacy, asset custody or licensing, protected design defaults, launch/no-build
scope, or a genuinely unresolved visual or editorial choice.

Preferred model routing for this epic:

- GPT-5.6 Terra high for JIT planning, cross-boundary engineering judgement,
  difficult debugging, and fresh whole-change review;
- GPT-5.6 Terra medium for bounded implementation, integration, and small
  repairs;
- GPT-5.6 Sol only when consequential architecture or taste remains unresolved;
  and
- SWE-1.7 or GLM-5.2 may execute an approved bounded plan, but must not invent
  presentation decisions and must stop at marked taste gates.

### Cloud Sol creative-review layer

Cloud Sol with its GitHub connector is an always-available frontier review
surface for creative-bearing work, independent of the local seat's usage cap.
Use it after a coherent draft exists and before final human approval whenever a
phase changes public copy, editorial structure, case-study argument, art
direction, visual hierarchy, interaction language, or another surface where
taste materially affects the £10k result.

Give Cloud Sol the exact GitHub branch or PR, the approved phase spec, the
relevant design policy and decisions, and a narrow review charter. Ask it to
inspect the live GitHub diff and improve or challenge:

- voice, clarity, rhythm, specificity, and originality;
- hierarchy, progressive disclosure, cognitive load, and calls to action;
- repetition across homepage, case studies, articles, About, CV, and contact;
- fidelity to the phase's unique senior-proof responsibility;
- accidental generic portfolio, sales, AI-slop, or over-claiming language; and
- consistency with accessibility, factual, confidentiality, custody, and
  protected-design boundaries visible in GitHub.

Cloud Sol may propose exact copy or bounded presentation revisions and, when
explicitly tasked, may commit those improvements through GitHub for review. It
then reviews the revised diff. Its role is a creative critic and improver, not a
new product owner. It must not invent facts, relax acceptance criteria, infer
private context, or turn a review into an unapproved redesign. Suggestions that
change public meaning, product scope, privacy, attribution, or a protected
default return to Harley. Revisions that stay inside the approved intent remain
subject to repository validation and the ordinary technical review lane.

The GitHub connector proves only the repository state it can inspect. Upstream
local repositories, private Linear material, deployed behaviour, asset source
files, and Harley's uncommitted context remain unavailable unless separately
and safely evidenced. Record the reviewed commit, review charter, material
findings accepted or rejected, limitations, and revision commit in the phase
handoff.

This layer supplements rather than replaces Terra technical review, automated
checks, manual browser inspection, or Harley's final taste and factual approval.
For SWE-1.7 or GLM-5.2 implementation, it is the preferred frontier taste
backstop; for Terra implementation, it remains a useful independent-context
creative review.

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
| 1 | Professional truth and About narrative | ready | [approved spec](../../specs/2026-08-21-portfolio-10k-01-professional-truth-about-design.md) | [JIT implementation plan](2026-08-22-portfolio-10k-phase-1-professional-truth.md) | — | — | 9/10 | Written spec approved by Harley on 21 August 2026. JIT plan written from `9d10f9b` current truth and rated 9/10 on 22 August 2026; execution pending. |
| 2 | CV and contact conversion | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-02-cv-contact-design.md) | — | — | — | 9/10 | Written spec approved by Harley on 21 August 2026. Replace the two most conspicuous unfinished hiring states with a real CV and privacy-preserving contact route. |
| 3 | Marketplace flagship and case-study system | pending | [approved spec](../../specs/2026-08-21-portfolio-10k-03-marketplace-case-study-design.md) | — | — | — | 9/10 | Written spec approved by Harley on 21 August 2026. Prove frontier agentic practice and establish the case-study anatomy through one concrete project, not speculative abstraction. |
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
  9/10 readiness. The implementation wave uses Terra for JIT planning and
  bounded execution, with Cloud Sol as the always-available creative-review
  layer and Harley retaining final taste and factual authority.

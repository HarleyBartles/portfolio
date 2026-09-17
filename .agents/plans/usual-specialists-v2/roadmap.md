# The Usual Specialists V2 — Roadmap

**Created:** 17 September 2026

**Status:** Design/planning refactor in review; no product implementation has begun from this roadmap

**Preview route:** `/patch/the-usual-specialists/next/`

**Page design authority:** [The Usual Specialists V2: Page-System Design](../../specs/2026-09-17-usual-specialists-visual-story-design.md)

## Why this is a roadmap

Completing The Usual Specialists V2 is not one executable implementation plan.
Each specialist chapter is a material visual-story deliverable with its own design,
wireframe, responsive composition, asset commissioning/custody, browser review and
acceptance gate.

The earlier whole-page plan at Git commit `f7267b6` usefully identified React and
asset seams, but Harley rejected its planning shape on 17 September 2026: Silk was
the only later chapter designed deeply enough to justify its implementation detail,
while Writ, Klause, Rollback and Receipt were being treated as plan tasks before
their compositions had actually been designed.

That plan has therefore left the live planning tree. Git history preserves it as
planning provenance. It has no current execution authority.

## Epic outcome

Build `/patch/the-usual-specialists/next/` chapter by chapter as one coherent
recruitment story:

**Index → Silk → Writ → Klause → Rollback → Receipt → completed folder close**.

Every milestone must leave a reviewable preview route and preserve the parent
page's safehouse, folder, responsive, accessibility and route-publication
contracts. The actual caper remains off screen.

## Artifact contract

This epic uses one page spec, one spec per specialist chapter and one JIT
implementation plan per roadmap milestone.

The design and implementation sequence for a chapter is:

1. Read the page spec and the chapter spec.
2. If the chapter spec says local composition is unresolved, resume brainstorming
   and update that spec. Do not plan around the gap.
3. Harley reviews/approves the resulting chapter design.
4. Run `handoff-gates` spec-readiness. Target 9/10; never plan below 8/10.
5. Inspect current repository truth and predecessor milestone output.
6. Write **only this milestone's** implementation plan with `writing-plans`.
7. Run plan-readiness. Target 9/10; never execute below 8/10.
8. Execute the milestone, including live React/styled-components wireframe review
   before any missing final imagery is commissioned.
9. Review and commit the completed milestone before activating the next one.

Future plans are deliberately not written now. A JIT plan must consume current
source, the actual accepted predecessor chapter and lessons learned from its
responsive/media work.

## Shared implementation posture

Every JIT plan inherits these page-level seams unless current source proves a
design conflict:

- `UsualSpecialistsPage.tsx` remains a thin explicit composer.
- Each specialist owns a semantic chapter section, styled-components layout,
  chapter-local responsive vocabulary, media and tests.
- Chapter-to-chapter seams are explicit narrative transitions, not one generic
  configurable connector.
- The canonical `RecruitmentFolder` is the deliberate cross-chapter continuity
  primitive.
- The folder implementation grows incrementally. A chapter adds its own marker;
  an earlier milestone does not manufacture later chapters' visual assets.
- Materially new/redesigned chapters prove their live React/styled-components
  composition before commissioning missing imagery.
- Accepted source/candidate/provenance lives under
  `src/client/assets/patch/the-usual-specialists/`; processor-owned browser
  derivatives are never hand-edited.
- Each material visual milestone reviews 1440, 768, 390, 320, actual 200% browser
  zoom, keyboard-only use and reduced motion.
- The unlinked V2 preview remains `noindex, nofollow` and non-canonical throughout
  this roadmap. Canonical cutover is a separate decision.

## Roadmap sequence

`Status` follows the epic values `pending`, `writing`, `ready`, `executing`,
`done`, or `blocked`. `Plan File` remains `—` until the plan is actually written
just in time.

| # | Title | Status | Spec File | Plan File | Commit | PR | Rating | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Index + page foundation | pending | [Index chapter spec](../../specs/2026-09-17-usual-specialists-index-chapter-design.md) + [page spec](../../specs/2026-09-17-usual-specialists-visual-story-design.md) | — | — | — | — | Preserve the accepted Index composition. Correct stale semantics, establish only the shared page/folder infrastructure the first two chapters actually need, demote obsolete route-wide rope/navigation assumptions, and leave a clean seam for Silk. JIT plan only after this refactor is reviewed. |
| 2 | Silk | pending | [Silk chapter spec](../../specs/2026-09-17-usual-specialists-silk-chapter-design.md) | — | — | — | — | First major chapter redesign. Black comic takeover, one canonical breakout, causal route-pressure sequence and corridor assent aftermath. Audit old accepted Silk media against the live wireframe rather than carrying old apertures forward by default. |
| 3 | Writ | pending | [Writ chapter spec](../../specs/2026-09-17-usual-specialists-writ-chapter-design.md) | — | — | — | 9.4/10 spec | Chapter design approved and spec-readiness green: threshold loop, continuous rounds/caseload, object-transparency polyptych, dominant `Absolutely not. On whose authority?` interruption, Writ-supplied bounded authority, and white/yellow/pink triplicate split. JIT plan waits for the actual Silk milestone output. |
| 4 | Klause | pending | [Klause chapter spec](../../specs/2026-09-17-usual-specialists-klause-chapter-design.md) | — | — | — | — | Reduction/decision principle and assent are settled. Design the actual four/five-state composition before planning; do not revive the nine-panel wireframe by inertia. |
| 5 | Rollback | pending | [Rollback chapter spec](../../specs/2026-09-17-usual-specialists-rollback-chapter-design.md) | — | — | — | — | Failure/recovery role, basement, calm-vs-moving-field contrast and dog-tag assent are settled. Design the dominant containment sequence before planning. No CRT `I'M IN`. |
| 6 | Receipt | pending | [Receipt chapter spec](../../specs/2026-09-17-usual-specialists-receipt-chapter-design.md) | — | — | — | — | Alcove, already-done inversion, thermal assent and tea release are settled. Design the record-always-existed reveal and deceleration before planning. |
| 7 | Final page close + whole-route proof | pending | [Page spec](../../specs/2026-09-17-usual-specialists-visual-story-design.md) | — | — | — | — | After all six chapter states exist, let the completed folder become hero once; reconcile stale homepage Specialists semantics; prove complete source order, folder continuity, responsive/accessibility behaviour and approved visual baselines. Canonical route cutover remains out of scope. |

## Milestone dependency logic

- Milestones are sequential because the folder state, page source order, transition
  seams and accepted route composition accumulate.
- Index establishes the smallest useful shared continuity implementation; Silk
  consumes it rather than waiting for all future folder assets to exist.
- Silk establishes the first new chapter-owned wireframe/generation pattern.
- Writ must be designed in the actual page state left by Silk, especially the
  termination of the black comic field.
- Klause consumes Writ's actual authority handoff rather than a hypothetical one.
- Rollback consumes Klause's actual committed-plan representation.
- Receipt consumes the real accumulated history and any subtle record traces that
  earlier chapters deliberately established.
- The final close cannot be judged until all six assent states exist in the live
  route.

## Folder pre-vis reference used by every milestone

The Adventures of Patch repository contains the useful stage-level continuity
pre-vis at verified revision `13bf77adc63cf5c8f49363cedd5dd392822b8375`:

`workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/`

The chapter specs name their relevant image. Workers should inspect those plates
when building each state. They are good material/continuity references despite
known generated folder/list drift and their older Rollback-before-Writ sequence.
The page spec, current V2 story order and canonical folder implementation outrank
those limitations.

## Handoff Notes

- The previous monolithic design spec was approved by Harley on 17 September 2026
  at 9.4/10 spec-readiness before the planning-shape problem became visible.
- The previous whole-route implementation plan was committed as
  `f7267b6 plan: wire specialists v2 as chapter slices` and passed the repository's
  tracked complete local hook. Its validation proves that historical planning
  commit was mechanically healthy; it does **not** make its oversized execution
  shape current authority.
- Harley explicitly corrected the planning model on 17 September 2026: the route
  contains far too much design and implementation work for one executable plan,
  and later specialists looked thin because they were under-designed relative to
  Silk.
- Harley explicitly approved refactoring the monolithic approved spec into a page
  spec plus chapter specs, then sequencing the work through a roadmap with one JIT
  plan per active chapter/milestone.
- No product implementation began under `f7267b6`.
- Index remains the protected visual control case. Silk is a substantial redesign.
  Writ has now completed its chapter-design return. Klause, Rollback and Receipt
  deliberately return to design before their JIT plans.
- Do not write all future implementation plans in advance. The point of this
  roadmap is that each plan is informed by the chapter actually landed before it.

## Epic non-goals

- No canonical cutover without a separate explicit Harley decision.
- No actual caper/vault sequence.
- No route-wide responsive geometry owner.
- No generic config-driven specialist renderer.
- No generation of later chapter art merely to "complete" the folder system.
- No deletion of accepted historical masters/provenance solely because a later
  composition stops using them.
- No visual-baseline update used as substitute for human design approval.

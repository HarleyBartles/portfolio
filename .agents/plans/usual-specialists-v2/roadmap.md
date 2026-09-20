# The Usual Specialists V2 — Roadmap

**Created:** 17 September 2026

**Status:** Index milestone complete; Silk is the next fresh chapter design/spec target

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
- At 1920 CSS pixels and above, each specialist chapter uses the page-level
  wide-screen cadence: its complete chapter box, including local top/bottom padding,
  fits within 1080 CSS pixels. Named inter-chapter seams sit outside that envelope;
  the rule is achieved through chapter-local recomposition rather than a fixed-height
  route shell. Review 1920×1080 and 2560×1080 explicitly.
- The unlinked V2 preview remains `noindex, nofollow` and non-canonical throughout
  this roadmap. Canonical cutover is a separate decision.

## Roadmap sequence

`Status` follows the epic values `pending`, `writing`, `ready`, `executing`,
`done`, or `blocked`. `Plan File` remains `—` until the plan is actually written
just in time.

| # | Title | Status | Spec File | Plan File | Commit | PR | Rating | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Index editorial close | done | [Index chapter spec](../../specs/2026-09-17-usual-specialists-index-chapter-design.md) + [page spec](../../specs/2026-09-17-usual-specialists-visual-story-design.md) | retired after merge; preserved in Git history | `3a73424` | #67 | 9/10 | Index responsive estate is locked. The retired Silk/rope/crossing implementation was subsequently removed from the live tree so Index remains an independent foundation. |
| 2 | Silk | pending | fresh chapter spec required | — | — | — | — | Silk remains specialist #2 and still owns `prove the route`. Start from the accepted Index boundary with a fresh chapter design. Reuse only the retained traced `SILK` name mark plus `PRESSURE | PROVE THE ROUTE` lockup unless new design work explicitly chooses otherwise. |
| 3 | Writ | pending | [Writ chapter spec](../../specs/2026-09-17-usual-specialists-writ-chapter-design.md) | — | — | — | — | Chapter design approved and spec-readiness green: threshold loop, continuous rounds/caseload, object-transparency polyptych, dominant `Absolutely not. On whose authority?` interruption, Writ-supplied bounded authority, and white/yellow/pink triplicate split. JIT plan waits for the actual Silk milestone output. |
| 4 | Klause | pending | [Klause chapter spec](../../specs/2026-09-17-usual-specialists-klause-chapter-design.md) | — | — | — | — | Chapter design approved and spec-readiness green: one stable master field, minimal Klause motion, five-state reduction sequence, page-deletes-itself subtraction grammar, IKEA-white working field, and manila-folder/red-`K` colour payoff. JIT plan waits for the actual Writ milestone output. |
| 5 | Rollback | pending | [Rollback chapter spec](../../specs/2026-09-17-usual-specialists-rollback-chapter-design.md) | — | — | — | — | Chapter design approved: chamber-side audience position, off-camera failure evidence, rebar-concrete containment pressure, slow amber state cycle, shutter-to-black `What's your Plan B?`, safe-side diagnosis, silent realisation, dog-tag clank and immediate move to the next failure test. No CRT `I'M IN`. JIT plan waits for the actual Klause milestone output. |
| 6 | Receipt | pending | [Receipt chapter spec](../../specs/2026-09-17-usual-specialists-receipt-chapter-design.md) | — | — | — | — | Chapter design approved: already-present thermal record reveal, quiet avuncular alcove, courteous no-pitch-needed interruption, gentlemanly sign-off, staple, Patch's first true rest beat and tea/hospitality release. The final folder field grows directly out of the same tea scene. JIT plan waits for the actual Rollback milestone output. |
| 7 | Final page close + whole-route proof | pending | [Page spec](../../specs/2026-09-17-usual-specialists-visual-story-design.md) | — | — | — | — | After all six chapter states exist, prove the approved close in which the folder finally stops on Receipt's table and becomes foreground hero while Patch and Receipt drink tea behind it; reconcile stale homepage Specialists semantics; prove complete source order, folder continuity, responsive/accessibility behaviour and approved visual baselines. Canonical route cutover remains out of scope. |

## Milestone dependency logic

- Milestones are sequential because the folder state, page source order, transition
  seams and accepted route composition accumulate.
- Index lands the approved editorial close and a materially readable outgoing state;
  Silk consumes that actual accepted result rather than planning against a
  hypothetical Index handoff.
- Silk establishes a fresh chapter-owned wireframe/generation pattern without
  inheriting the retired Silk/rope implementation estate.
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
  with a green spec-readiness result before the planning-shape problem became
  visible.
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
- Index remains the protected visual control case. Harley approved a focused
  editorial recomposition of its closing research cluster on 18 September 2026.
  Earlier assumptions that Index needed a synthetic folder primitive were explicitly
  rejected after inspecting the live implementation. The real Index
  opportunity was story clarity: earlier story-card placement, `“Ah. This one.”` as
  the semantic bridge between research and retrieval, and a new sticky-note-first
  carried-folder outcome panel. That Index milestone is now complete.
- Silk remains the first substantial chapter redesign. Its old implementation and
  dedicated old chapter spec were removed after the Index checkpoint; the next pass
  consumes the actual Index closing composition and retained Silk identity lockup only.
- Writ, Klause, Rollback and Receipt have completed their chapter-design returns.
  Silk intentionally requires a fresh local design; implementation planning still advances just
  in time from actual predecessor output rather than from hypothetical future page
  state.
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

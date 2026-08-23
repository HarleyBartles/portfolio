# Portfolio £10k Phase 4 Editorial Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the merged Wild Bunch page's defensive, pattern-catalogue copy with a concise, human architectural story that meets the Phase 4 £10k quality bar without weakening factual, evidence, accessibility, or visual contracts.

**Architecture:** Keep the specialist Phase 3 presentation seam, pinned Wild Bunch evidence, responsive captures, semantic figures, and shared route shell. Rewrite the specialist body around five connected reasoning movements, then simplify its composition so diagrams and captures prove the story instead of repeating it. Preserve factual capability data in the evidence snapshot while reducing the public close to one source note.

**Tech Stack:** React 18, TypeScript, Vitest, React Testing Library, Sass, Playwright, Python portfolio-quality checks, generated INDEX mesh.

**Execution Strategy:** `subagent-driven-development` — Sol owns sequencing, copy judgement, integration, manual inspection, and acceptance; GPT-5.6 Terra receives bounded research, implementation, test, repair, and review tasks and may not delegate.

## Global Constraints

- Continue roadmap Phase 4; PR #22 is a merged implementation iteration, not the phase exit.
- Preserve the pinned Wild Bunch evidence revision `2a9814d094148bb789766a27d316095fecce5a60` and the Ranger Vale / all-zero UUID / Standard / Boring / Dustwell capture receipt.
- Do not modify the Wild Bunch repository, add captures, change public facts, or imply finished game art, public hosting, or production readiness.
- Retain real captures, asset custody, responsive image dimensions, lazy-loading behaviour, semantic source order, keyboard access, reduced-motion parity, 320 CSS-pixel support, and 200% zoom usability.
- Keep `Every complexity pays rent.` as the exact thesis and `pre-alpha` as the route status.
- State maturity confidently and economically: one route status plus one concise development-build evidence note; no repeated apology language in body sections or captions.
- Explain architecture from pressure → decision → implementation → payoff → cost or learning. Pattern names are labels for an already-understood decision, never the premise.
- Describe the code's actual CQRS split directly. Do not use `CQRS-style`.
- Distinguish the `GameSession` aggregate boundary, its command repository, projection read repositories, and the Unit of Work instead of compressing them into `aggregate-scoped repositories`.
- Say `React Testing Library`; group test tools, test types, and verification methods coherently.
- Use `/writing-with-clarity` with composition/flow as the primary lens, clarity/concision as the secondary lens, and the writing, technical-writing, architecture, implementation-plan, and frontend-UI unslop profiles at their owning stages.
- Preserve the active portfolio design policy: authored hierarchy, proof before pitch, editorial restraint, specific imagery, honest state, accessibility, privacy, and performance.
- Treat Windows as canonical for visual baselines; do not loosen screenshot tolerances or replace unrelated baselines.
- Retain canonically generated setup/index files and inspect them before committing.

## Current-truth drift table

| Material assumption | Classification | Current truth and plan response |
| --- | --- | --- |
| Phase 4 still needs an implementation plan | implementation seam moved | PR #22 merged as `c29e449`, so this is a corrective plan attached to the same open roadmap item, not a replay of the original build plan. |
| Specialist case-study seam exists | still true | `WildBunchCaseStudy.tsx` remains the single specialist body selected by the Phase 3 registry. |
| Product captures and custody still need gathering | implementation seam moved | Five responsive capture families, custody records, and metadata already exist and remain unchanged. |
| Copy should follow a ten-part architecture reading order | design conflict resolved by Harley | The merged form became repetitive and defensive. The approved 23 August amendment permits consolidation into five connected movements plus one concise source note. |
| A prominent capability ledger is required | design conflict resolved by Harley | Capability categories remain in `wild-bunch-evidence.json`; the public three-column recap is removed because it repeats the article and ends on project administration. |
| CQRS needs cautious `-style` qualification | implementation seam moved | Live Wild Bunch code has separate command/query handlers, projection read repositories, query non-mutation guardrails, and command-side persistence coordination. Call it CQRS and qualify topology only when useful. |
| `aggregate-scoped repositories` is useful orientation copy | design conflict resolved by Harley | Replace it with the concrete responsibilities of the aggregate, command repository, read repositories, and Unit of Work. |
| `Testing Library` is sufficient terminology | design conflict resolved by Harley | Name React Testing Library and repair the mixed taxonomy in the evidence dossier. |
| Existing semantic figures and image contracts are useful | still true | Retain and, only where prose duplication demands it, edit figure captions or surrounding transitions. |
| Existing visual register is the right foundation | still true | Warm field journal, dark evidence panels, copper/faded-gold restraint, real game imagery, and portfolio typography remain approved. Composition and pacing may change. |
| Current generated indexes can be discarded as setup residue | design conflict resolved by Harley | The setup generator created canonical mesh deltas; retain them, regenerate through the owning command, and include them if `ci --check` proves them canonical. |

## Creative-review brief

**Audience:** A hiring manager or senior engineer deciding whether Harley can make difficult full-stack architectural decisions and communicate them clearly.

**Intended response:** “I understand what Harley wanted the game to feel like, why a simple implementation would have lost capabilities he values, how the chosen architecture creates those capabilities, and where he knows the costs are.” The reader should want to inspect the source, not feel obliged to audit disclaimers.

**Distinctive intent:** A personal field note about turning chance into something reproducible and turning a playthrough into an explainable history. The childhood origin opens the door; seed design, map generation, stable towns, event replay, safe projections, and deterministic developer interventions carry the proof.

**Protected defaults:** Keep the exact thesis, real product imagery, pinned evidence, pre-alpha status, first-person ownership boundaries, no saloon theming, no generated Western art, no autoplay, no new route/runtime request, and no unverified current capability claims.

**Factual/privacy boundaries:** Do not expose hidden culprit truth, session identifiers, private paths, localhost, credentials, branch/worktree names, or claims beyond the pinned revision. Do not imply original-game architecture authorship, handwritten implementation, public hosting, finished visuals, or complete entropy/dev-control coverage.

**Failure modes:** Legalistic caveat stacking; architecture-name inventory; detached testing-library names; patterns presented before needs; repeated prose/diagram/card summaries; pseudo-profound headings without consequence; generic AI-authorship defence; five-card wall; administrative ending; decorative whitespace that strands the reading column; copy whose paragraph could be moved to another architecture case study unchanged.

**Observable acceptance signals:** The personal origin reaches the central engineering desire within the opening movement; every architecture name answers a visible pressure; CQRS/repository/UoW wording matches code; a reader can retell determinism and replay after one scan; each retained section does one job; screenshots have evidence-specific captions without repeated apology; the page is materially shorter; the close lands on judgement and source inspection; responsive/keyboard/zoom/reduced-motion contracts remain intact.

**Evidence surface:** `WildBunchCaseStudy.tsx`, semantic figure components, deployed responsive captures, `wild-bunch-evidence.json`, pinned source URLs, focused Vitest/Playwright tests, Windows visual baselines, manual 1440/768/390/320/200%-zoom review, and canonical CI.

---

### Task 1: Lock the amended editorial contract and rewrite the article

**Files:**
- Modify: `.agents/specs/2026-08-21-portfolio-10k-04-wild-bunch-case-study-design.md`
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify only if copy duplication remains: `src/client/src/features/case-study/wild-bunch/WildBunchDeterminismFigure.tsx`
- Modify only if copy duplication remains: `src/client/src/features/case-study/wild-bunch/WildBunchEventFlow.tsx`
- Modify captions: `src/client/src/features/case-study/wild-bunch/WildBunchProductEvidence.tsx`
- Modify tests: adjacent Wild Bunch `*.test.tsx`
- Retain/regenerate: canonical `INDEX.md` mesh files produced during setup

**Interfaces:**
- Consumes: merged PR #22 specialist presentation and the 23 August Harley editorial correction.
- Produces: a red-to-green public-copy contract and a shorter specialist body whose pattern claims, evidence links, figures, and captions Task 2 can compose visually.

- [x] **Step 1: Record the design and roadmap amendment.** Keep the spec changes narrow to editorial emphasis, exact terminology, consolidation authority, and closing posture. Set roadmap Phase 4 to `executing`, link this plan, retain the original merged PR #22 as prior iteration evidence, and state that the phase remains open until the corrective acceptance contract passes.

- [x] **Step 2: Replace tests that canonise the rejected copy.** Remove assertions requiring the three-paragraph development-build introduction, `CQRS-style`, the prominent three-column capability ledger, exactly three supporting-pattern bullets, and five decision cards. Add assertions that:

  ```tsx
  expect(screen.queryByRole('region', { name: 'Development-build position' })).not.toBeInTheDocument()
  expect(screen.getByText(/CQRS separates state-changing commands from projection reads/i)).toBeVisible()
  expect(screen.queryByText(/CQRS-style/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/aggregate-scoped repositories/i)).not.toBeInTheDocument()
  expect(screen.getByText(/React Testing Library/i)).toBeVisible()
  expect(screen.getByText(/repository.*GameSession aggregate/i)).toBeVisible()
  expect(screen.getByText(/Unit of Work.*commit/i)).toBeVisible()
  ```

  Assert the origin follows the thesis without an intervening disclaimer region; determinism, event history, player knowledge, engineering control, and the source note remain in meaningful order; one concise visual-state note exists; and the public close contains the pinned repository invitation but no `Built, in motion, beyond pre-alpha` heading.

- [x] **Step 3: Add browser-level editorial regression checks.** In `project-story.spec.ts`, assert no `Development-build position` region, no `CQRS-style`, no `aggregate-scoped repositories`, a visible `React Testing Library` label, and no prominent capability ledger. Retain status, evidence links, image loading, keyboard, narrow-width, and semantic figure checks.

- [x] **Step 4: Run the focused tests and confirm the intended red state.** Run:

  ```powershell
  npm.cmd --prefix src/client test -- src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx
  npm.cmd --prefix src/client run test:e2e -- e2e/project-story.spec.ts
  ```

  Expected: FAIL on rejected introduction/dossier/ledger copy, not on test setup or unrelated routes.

- [x] **Step 5: Record the red evidence without committing it.** The repository hook correctly rejects a red tree. Keep the failing tests in the working tree, record their exact failures in the task report, and continue directly into the rewrite below. Commit only the green red-to-green slice.

#### Task 1 implementation: Rewrite the article around Harley's reasoning

**Files:**
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify only if copy duplication remains: `src/client/src/features/case-study/wild-bunch/WildBunchDeterminismFigure.tsx`
- Modify only if copy duplication remains: `src/client/src/features/case-study/wild-bunch/WildBunchEventFlow.tsx`
- Modify captions: `src/client/src/features/case-study/wild-bunch/WildBunchProductEvidence.tsx`
- Modify tests: adjacent Wild Bunch `*.test.tsx`

**Interfaces:**
- Consumes: Task 1 editorial assertions, creative brief, pinned evidence URLs, existing semantic figures and captures.
- Produces: a shorter specialist body whose pattern claims, evidence links, figures, and captions Task 3 can compose visually.

- [x] **Step 1: Have Terra produce a bounded architecture-fact brief.** Read the pinned Wild Bunch files or equivalent live checkout at revision `2a9814d...` for command/query handlers, `IGameSessionRepository`, projection read repositories, `IGameSessionUnitOfWork`, replay, dev action injection, map generation, and persisted town layout. Return exact responsibilities, tensions, and safe public formulations; do not draft portfolio prose or edit files.

- [x] **Step 2: Draft five connected movements in source order.** Replace the rejected ten-part catalogue with:

  1. **The game I wanted to return to** — childhood origin becomes the desire to preserve surprise without surrendering reproducibility.
  2. **Making chance reproducible** — UUID bit budget, neighbouring seed worlds, deterministic shuffle, Delaunay/MST/alternate-edge/repair generation, and persisted town layouts flow as one discovery.
  3. **A playthrough worth keeping** — exact event replay introduces `GameSession`, event sourcing, CQRS, Onion direction, repository/read-repository/UoW responsibilities, snapshots, concurrency, projections, and upcasting only as the pressure demands.
  4. **The player and the developer should not see the same game** — safe projections, dev-only queries/commands, and deterministic next-salted-action preparation show how exact reconstruction becomes useful diagnosis.
  5. **Choosing the complicated version** — integrate the simpler alternative, accepted costs, bounded React/Phaser and manual-client restraint, agent-directed implementation, and what would make a layer lose its rent.

  Follow with one concise source note/invitation. Keep first person natural; do not manufacture private internal monologue beyond Harley's supplied needs and inspected decisions.

- [x] **Step 3: Repair the scannable technical snapshot without interrupting the story.** Retain a compact orientation aside after the first movement. Use direct formulations:

  ```text
  Architecture — DDD around GameSession; CQRS command/query separation; Onion dependency direction; event sourcing, projections, snapshots, optimistic concurrency and upcasting.
  Persistence — a command repository loads and stages the GameSession aggregate; read repositories serve projections; a Unit of Work commits the staged command-side changes.
  Evidence — xUnit unit and ASP.NET integration suites; Vitest with React Testing Library; replay-equality and architecture guardrail tests; manual browser review.
  ```

  Keep backend/web dependencies only where they orient a hiring manager; remove any dependency that does not help interpret the proof.

- [x] **Step 4: Make captions prove one thing each.** Replace repeated `Current development build / working skeleton` prefixes with evidence-specific captions: Dustwell establishes a playable town surface; the map shows topology and travel distance; audit shows ordered typed events; wanted/case images show player-safe knowledge. Preserve concise alt descriptions and the single global visual-state note.

- [x] **Step 5: Run focused tests to green.** Run:

  ```powershell
  npm.cmd --prefix src/client test -- src/features/case-study/wild-bunch src/features/case-study/projectPresentations.test.tsx
  npm.cmd --prefix src/client run test:e2e -- e2e/project-story.spec.ts
  ```

  Expected: PASS. Search production source for `CQRS-style`, `aggregate-scoped repositories`, bare `Testing Library`, repeated `working skeleton`, localhost, hidden-truth identifiers, and unsupported production claims.

- [ ] **Step 6: Sol copy gate.** Read the complete rendered text in order. Record pass/veto for human voice, paragraph purpose, narrative propulsion, architecture precision, non-defensive honesty, consequence-led terminology, repetition, and ending. Veto if the copy can be rearranged without losing its argument, if a pattern precedes its pressure, or if status language outweighs desire/decision/learning.

  Sol creative pass/veto remains pending; Task 1 does not claim it.

- [ ] **Step 7: Mark Task 1 boxes complete and commit.** Commit the tests and implementation together with `feat: tell Wild Bunch through architectural reasoning` only after the focused green evidence and Sol copy pass are recorded in the plan.

### Task 2: Recompose the page around the shorter story

**Files:**
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.scss`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Update only reviewed Wild Bunch snapshots: `src/client/e2e/visual-regression.spec.ts-snapshots/wild-bunch-*.png`
- Modify: `docs/design-decisions.md`

**Interfaces:**
- Consumes: Task 1 final source order, semantic figures, capture dimensions, existing portfolio tokens.
- Produces: the final authored responsive composition and focused visual contracts for Task 3.

- [ ] **Step 1: Add a failing structural/visual contract where useful.** Assert the specialist body exposes named movement hooks (`wild-bunch-story-movement`) and one source-note close; no decision-card grid or capability-ledger class remains. Keep figures ordered and relationship semantics independent of layout.

- [ ] **Step 2: Replace the repetitive page rhythm.** Use the existing warm field-journal system to create deliberate alternation: readable prose blocks; wide proof moments where a semantic figure and capture belong together; a compact technical field note; and a quiet source-note ending. Remove the five-card wall, three-column status ledger, oversized dossier treatment, and CSS that strands a narrow reading column beside unused canvas. Do not introduce new fonts, colours, animation, dependencies, or themed decoration.

- [ ] **Step 3: Tune hierarchy and spacing at all contract widths.** At 1440 and 768, use wide space for evidence/prose relationships instead of empty remainder. At 390 and 320, preserve semantic order, comfortable measure, figure labels, caption legibility, and no horizontal overflow. At 200% zoom, retain the same content and usable link/focus order.

- [ ] **Step 4: Record the editorial design decision.** Add a dated ledger entry: human reasoning is the Wild Bunch case-study spine; status is established once; architecture inventories and duplicated proof cards are rejected; technical evidence is introduced at the moment it pays off.

- [ ] **Step 5: Build and inspect before updating snapshots.** Run `npm.cmd --prefix src/client run build`, serve the production preview, and inspect 1440, 768, 390, and 320 CSS pixels, keyboard-only, reduced motion, and native 200% zoom. Fix content/layout defects before baselines.

- [ ] **Step 6: Update only affected Windows baselines.** Keep the existing focused town hero unless source pixels changed. Update determinism, event flow, product evidence, or a new editorial-movement visual contract only when the reviewed composition changes that exact region. Do not refresh unrelated Marketplace/homepage snapshots.

- [ ] **Step 7: Sol visual/creative gate.** Record pass/veto for hierarchy, game-first recognition, reading momentum, evidence adjacency, whitespace purpose, caption restraint, field-journal continuity, and mobile/zoom finish. Compare against the rejected deployed page, not merely the current test baseline.

- [ ] **Step 8: Mark Task 2 boxes complete and commit.** Commit with `style: compose Wild Bunch as an authored field note` after focused visual and browser checks pass.

### Task 3: Complete review, canonical verification, and draft PR publication

**Files:**
- Modify: `.agents/plans/portfolio-10k/2026-08-23-portfolio-10k-phase-4-editorial-revision.md`
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Regenerate: canonical `INDEX.md` mesh files
- Modify only for evidenced defects: files owned by Tasks 1–3

**Interfaces:**
- Consumes: Tasks 1–2 committed outputs and review evidence.
- Produces: a self-reviewed draft PR for the still-open Phase 4 roadmap item.

- [ ] **Step 1: Run independent Terra reviews.** Dispatch fresh-context bounded reviews for (a) requirements/factual terminology and copy, (b) React/test quality and accessibility/responsiveness, and (c) £10k editorial/visual quality. Each reviewer returns findings with exact evidence and does not edit. Reconcile findings against source and rendered truth; dispatch bounded repairs to the owning implementation task.

- [ ] **Step 2: Run focused automated proof.** Run:

  ```powershell
  npm.cmd --prefix src/client test -- src/features/case-study src/features/home/ProjectVisual.test.tsx
  npm.cmd --prefix src/client run test:e2e -- e2e/project-story.spec.ts e2e/accessibility.spec.ts e2e/visual-regression.spec.ts
  py -3 -m unittest tests.test_portfolio_quality.PortfolioQualityTests -v
  ```

  Expected: PASS with Windows visual comparisons using the existing tolerance.

- [ ] **Step 3: Run final manual proof.** Re-read the whole page without source context, then inspect 1440, 768, 390, 320, keyboard-only, reduced motion, and native 200% zoom. Confirm the first five minutes establish Harley's motive and competence, architecture terms are precise, no disclaimer stack returns, each image/figure pays for its space, and the close invites inspection rather than forgiveness.

- [ ] **Step 4: Regenerate, stage, and run the canonical gate.** Run:

  ```powershell
  py -3 tools/run.py ci --apply
  git add -A
  py -3 tools/run.py ci --check
  git diff --cached --check
  ```

  Expected: PASS. Inspect every generated delta; keep canonical mesh files and reject only outputs proven unrelated or non-canonical.

- [ ] **Step 5: Record completion evidence and commit.** Mark all plan boxes accurately, record Sol pass/veto outcomes, review repairs, manual viewport evidence, commands and limitations. Set roadmap Phase 4 to `executing` until hosted PR evidence and Harley acceptance; do not mark the phase `done` merely because the corrective PR exists. Commit with `docs: record Wild Bunch editorial revision evidence`.

- [ ] **Step 6: Publish a draft PR.** Push `codex/portfolio-10k-phase-4-editorial-revision`, open a draft PR into `main`, and follow `.agents/runbooks/pr.md`. The PR body must link PR #22 as the merged first iteration, explain why Phase 4 remained open, summarize the editorial correction, name the unchanged pinned/capture boundaries, include test/manual/creative-review evidence, and state any limitations without repeating them as promotional copy.

- [ ] **Step 7: Verify GitHub truth and stop at the human gate.** Confirm draft state, base/head branches, exact remote SHA, diff, PR body, and hosted check status. Stop only when the draft PR is self-reviewed and ready for Harley to flip out of draft. Phase 4 closes only after Harley accepts the result and required hosted checks/merge proof are recorded.

## Plan readiness

**Rating:** 9/10.

The plan is executable from merged commit `c29e449`, names the rejected editorial contracts and their replacements, preserves the pinned evidence/capture/accessibility boundaries, includes failing-first tests, separates prose from composition and final review, defines Sol/Terra responsibilities, retains canonical generated files, and binds the exact focused and canonical commands. Remaining uncertainty is legitimate authored judgement during copy and responsive review; it is governed by explicit veto criteria rather than hidden replanning.

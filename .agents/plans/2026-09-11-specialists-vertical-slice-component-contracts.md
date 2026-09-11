# Specialists Vertical Slice Component Contracts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan sequentially. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the PORT-17 Specialists React components obey the approved vertical-slice ownership model and persist that model in the repository code-style guidance.

**Architecture:** Each vertical-slice component owns its internal composition and exposes semantic typed props plus the standard root-only `style?: React.CSSProperties` escape hatch. Parents own only whole-child placement and scale through parent-owned wrapper elements; they do not style child internals through `className`, `styled(Component)`, or cross-boundary CSS variables. Every vertical-slice component has one colocated test file that proves that component's own contract, while compositor tests assert only composition.

**Tech Stack:** React 19, TypeScript 6, styled-components 6, Vitest, Testing Library, Playwright.

**Execution Strategy:** `executing-plans` because the interface refactor and test redistribution are tightly coupled and must preserve the existing approved composition while ownership moves one boundary at a time.

## Global Constraints

- Continue on `codex/port-17-index-react` in the existing linked worktree.
- Preserve the accepted PORT-17 Index-only milestone and all existing visual baselines.
- Do not add later Specialist chapters or change public copy, asset bytes, route loading, accessibility semantics, or breakpoint intent.
- Vertical-slice component props must not expose or forward caller-supplied `className`.
- Every vertical-slice component may expose `style?: React.CSSProperties`; the style applies to that component's root only and is an exceptional override, not the normal composition mechanism.
- Supported child variations must use semantic typed props, not raw coordinate/style knobs.
- Parent components own whole-child position, scale, rotation, width, and z-order through parent-owned wrappers.
- A child owns the position and scale of every element inside its boundary. Parents must not control child internals through CSS variables or selectors.
- Ambient presentation/theme CSS custom properties are allowed; cross-boundary custom properties that control a child's internal geometry are not.
- One component owns one colocated test file for its own contract. Do not create a catch-all component test file.
- Keep browser-level responsive geometry in Playwright and pixel appearance in the existing protected visual regression suite.
- Prefer named `const` arrow functions throughout touched JS/TS/TSX files.
- Never bypass the tracked pre-commit hook and never update snapshots merely to make tests pass.

---

### Task 1: Persist the vertical-slice component contract

**Files:**
- Modify: `.agents/runbooks/code-style.md`

**Interfaces:**
- Consumes: the user-approved component ownership rules in this conversation.
- Produces: durable agent guidance for React component ownership, props, styling escape hatches, and test colocation.

- [x] **Step 1: Add a React vertical-slice section to the code-style runbook**

Record all of these rules explicitly: parent owns whole-child composition; child owns internal composition; no caller `className`; standard `style?: React.CSSProperties` is root-only and exceptional; semantic typed props express supported variants; no coordinate props for child internals; no cross-boundary internal-geometry CSS variables; one colocated test file per component contract.

- [x] **Step 2: Verify the guidance is reachable through the existing repo router**

Run:

```powershell
py -3 tools/run.py mesh --check
```

Expected: PASS with the existing `AGENTS.md` code-style pointer remaining valid.

- [x] **Step 3: Mark Task 1 complete in this plan**

Change this task's checklist boxes to `[x]` after the guidance and reachability check pass.

---

### Task 2: Make the shared traversal and rope leaves explicit vertical slices

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexTraversal.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexTraversal.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx`

**Interfaces:**
- Consumes: existing traversal image semantics and the locked temporary rope geometry.
- Produces: `IndexTraversal` as a typed function component with `src`, traversal/substrate identifiers, optional root `style`, fixed decorative/lazy image semantics; `SpecialistsJourneyRope` with optional root `style` and no external class seam.

- [x] **Step 1: Write failing direct contract tests for `IndexTraversal` and `SpecialistsJourneyRope`**

`IndexTraversal.test.tsx` must render the component directly and prove width `320`, height `480`, `loading="lazy"`, `decoding="async"`, empty alt, `aria-hidden="true"`, supplied traversal/substrate data attributes, and forwarding of a root `style` override.

`SpecialistsJourneyRope.test.tsx` must render the component directly and prove the temporary marker, decorative semantics, locked path, `viewBox="0 0 1000 3300"`, `preserveAspectRatio="none"`, and forwarding of a root `style` override.

- [x] **Step 2: Run the two new tests and confirm they fail for the missing typed APIs**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexTraversal.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.test.tsx
```

Expected: FAIL before implementation.

- [x] **Step 3: Implement the typed leaf APIs without `className`**

Convert `IndexTraversal` from an exported styled component to a function component whose internal styled image remains private. Accept typed semantic identifiers plus `style?: React.CSSProperties`; apply `style` only to the root image. Convert `SpecialistsJourneyRope` to accept only optional root `style` and apply it to `RopeClip`.

- [x] **Step 4: Replace `styled(IndexTraversal)` use with parent-owned placement wrappers inside owning components**

Each component that composes a traversal owns a styled placement wrapper; the traversal leaf itself owns only its image contract.

- [x] **Step 5: Slim the opening test to composition ownership**

`UsualSpecialistsOpening.test.tsx` should prove the opening composes a rope but must no longer assert the rope path. Add direct root-style forwarding coverage for `UsualSpecialistsOpening` itself.

- [x] **Step 6: Run the focused leaf/opening tests**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexTraversal.test.tsx src/features/patch-showcase/usual-specialists/SpecialistsJourneyRope.test.tsx src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx
```

Expected: PASS.

- [x] **Step 7: Mark Task 2 complete in this plan**

Change this task's checklist boxes to `[x]` after the focused tests pass.

---

### Task 3: Give every Index child slice its own typed boundary and colocated contract test

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexDeskDocument.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexDeskDocument.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexBlueCarrier.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexBlueCarrier.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexGraphPaper.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexGraphPaper.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexObservation.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexAssentNote.test.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexMacguffin.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexMacguffin.test.tsx`

**Interfaces:**
- Consumes: Task 2 `IndexTraversal` typed API.
- Produces: six opaque vertical-slice components that accept optional root `style`, expose no `className`, own their internal assets/copy/traversal geometry, and can be understood/tested independently.

- [x] **Step 1: Write one failing colocated test per component**

Each test must render exactly its named component directly and prove only that component's public/internal contract: root substrate identity, owned semantic/decorative media, intrinsic image dimensions/loading behaviour, owned copy, owned traversal children where applicable, and forwarding of a root `style` override.

`IndexBlueCarrier.test.tsx` additionally owns the INDEX wordmark aspect-ratio assertion and `PROVENANCE | TRACE THE ROUTES` copy.

`IndexAssentNote.test.tsx` owns the exact semantic text `You son of a gun. I'm in!` and decorative presentation-copy relationship.

- [x] **Step 2: Run the six direct tests and confirm the current `className` APIs fail the new contract**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/usual-specialists/IndexDeskDocument.test.tsx src/features/patch-showcase/usual-specialists/IndexBlueCarrier.test.tsx src/features/patch-showcase/usual-specialists/IndexGraphPaper.test.tsx src/features/patch-showcase/usual-specialists/IndexObservation.test.tsx src/features/patch-showcase/usual-specialists/IndexAssentNote.test.tsx src/features/patch-showcase/usual-specialists/IndexMacguffin.test.tsx
```

Expected: FAIL before implementation.

- [x] **Step 3: Replace `className` props with optional root `style` props**

Use a typed props object containing `style?: React.CSSProperties` for each component. Apply it only to the component root. Do not expose coordinate props or an external styling hook.

- [x] **Step 4: Move internal-geometry CSS variables into their owning child**

Move `--index-mobile-traversal-lift` behaviour into `IndexBlueCarrier`; move `--index-03-pair-footline-drop` into `IndexObservation`; eliminate `--index-main-left` as a parent-to-child internal-layout input by expressing the equivalent responsive relationship inside `IndexDeskDocument`.

- [x] **Step 5: Run the six direct tests**

Run the Task 3 test command again.

Expected: PASS.

- [x] **Step 6: Mark Task 3 complete in this plan**

Change this task's checklist boxes to `[x]` after the direct tests pass.

---

### Task 4: Refactor Index and page composition to parent-owned wrappers

**Files:**
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx`
- Modify: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`

**Interfaces:**
- Consumes: the opaque child slices from Tasks 2 and 3.
- Produces: `IndexChapter` and `UsualSpecialistsPage` with optional root `style`, parent-owned placement wrappers, no `styled(child)` composition, and compositor tests that do not assert child internals.

- [x] **Step 1: Add root-style contract assertions to the chapter and page tests**

Both tests should prove an exceptional `style` override reaches that component's own root.

- [x] **Step 2: Replace `styled(Index...)` exports with parent-owned placement wrappers**

`IndexChapter.styles.ts` should export wrapper elements for the main document, blue carrier, graph paper, observation, macguffin, and assent note. The wrappers own whole-child position, width, rotation/scale if applicable, and z-order. They must not reach into child internals.

- [x] **Step 3: Compose opaque children inside those wrappers**

`IndexChapter.tsx` should render each child inside its placement wrapper. Add optional root `style` and forward it only to `Chapter`. Add optional root `style` to `UsualSpecialistsPage` and forward it only to `SpecialistsStory`.

- [x] **Step 4: Slim `IndexChapter.test.tsx` to the compositor contract**

Keep the Index region/heading, expected child slices, source-order/story-level content necessary to identify the chapter, and absence of future chapters. Remove assertions now owned by child tests, including traversal-image loading details and INDEX wordmark aspect ratio.

- [x] **Step 5: Run all Specialists unit tests**

Run:

```powershell
npm --prefix src/client test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/*.test.tsx
```

Expected: PASS.

- [x] **Step 6: Mark Task 4 complete in this plan**

Change this task's checklist boxes to `[x]` after the Specialists unit suite passes.

---

### Task 5: Prove visual/route parity, regenerate navigation, and publish the PR update

**Files:**
- Regenerate: generated `INDEX.md` files affected by the new colocated tests and completed plan move.
- Move on completion: `.agents/plans/2026-09-11-specialists-vertical-slice-component-contracts.md` to `.agents/plans/completed/2026-09-11-specialists-vertical-slice-component-contracts.md`.
- Update: PR #58 body/evidence only after the source commit is pushed.

**Interfaces:**
- Consumes: Tasks 1-4 completed source and tests.
- Produces: clean committed branch, unchanged approved visual baselines, refreshed mesh, and PR #58 pointing at the verified head.

- [x] **Step 1: Run the focused structural browser proof**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists"
```

Expected: all Specialists structural tests PASS across the authored responsive bands and ultrawide relationships.

- [x] **Step 2: Run focused accessibility proof**

Run:

```powershell
npm --prefix src/client run test:e2e -- e2e/accessibility.spec.ts --grep "Usual Specialists"
```

Expected: desktop and mobile Specialists WCAG checks PASS.

- [x] **Step 3: Run the protected visual regression without update mode**

Run:

```powershell
npm --prefix src/client run test:e2e:visual -- --grep "Specialists Index draft"
```

Expected: PASS against all existing protected Specialists baselines with no snapshot update.

- [x] **Step 4: Regenerate the index mesh**

Run:

```powershell
py -3 tools/run.py index-mesh --apply
py -3 tools/run.py mesh --check
```

Expected: generated navigation includes the new colocated tests and remains valid.

- [x] **Review correction checkpoint: resolve the first whole-branch review findings**

The first `reviewer-strong` pass found three Important ownership leaks plus premature completed-plan custody. Reopen this plan, then keep the repair narrow:

- make the page article own its accessible name instead of referencing an opening-owned heading id;
- make the Index story card an opaque vertical slice and keep its relationship with graph paper entirely in parent-owned chapter placement wrappers;
- keep exact opening copy and rope assertions in `UsualSpecialistsOpening.test.tsx`, not the page compositor test;
- rerun the Specialists unit suite, focused structural browser proof, focused accessibility proof, and protected visual regression without update mode.

The repaired slice passes 12 Specialists test files / 28 tests, 2 focused structural browser tests, 2 focused accessibility tests, and the protected Specialists visual regression at all six existing widths without snapshot updates.

A focused `reviewer-fixes` pass then found one remaining duplicated ownership detail: `DeskComposition` and `IndexDeskDocument` both carried the same desk height values. The follow-up repair makes the chapter composition the sole owner of those whole-child dimensions and makes `IndexDeskDocument` fill its parent. The direct desk/chapter tests pass 5/5, the Specialists structural browser proof passes 2/2, and the protected Specialists visual regression passes unchanged.

- [ ] **Step 5: Stage the complete intended tree and commit normally**

Use a normal commit such as:

```powershell
git add .
git commit -m "refactor: enforce Specialists vertical slice contracts"
```

Expected: the tracked hook runs the complete canonical gate and the commit succeeds. Do not run the full CI command immediately before or after this normal hooked commit.

- [ ] **Step 6: Push and verify PR #58**

Push `codex/port-17-index-react`, verify GitHub reports the exact local head SHA for PR #58, keep the PR open and draft, and update the PR body with the new component-contract architecture and fresh validation evidence.

- [ ] **Step 7: Report completion-readiness**

Rate the implementation against `.agents/runbooks/code-review.md`; target at least 9/10 before handing off.

- [ ] **Step 8: Mark all plan tasks complete and move this plan to completed custody**

Only after Steps 5-7 are complete, move this file to `.agents/plans/completed/2026-09-11-specialists-vertical-slice-component-contracts.md`, rerun `py -3 tools/run.py index-mesh --apply`, and publish the resulting final docs-only custody commit so the PR head and navigation remain truthful.

## Plan readiness

- Handoff gate: plan-readiness
- Rating: 9.5/10
- Rationale: dependency order is explicit, each vertical slice has a named colocated test, red/green commands are bounded, and final browser/visual proof preserves the approved composition.


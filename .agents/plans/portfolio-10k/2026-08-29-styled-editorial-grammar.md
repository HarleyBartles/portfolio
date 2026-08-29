# Styled Editorial Grammar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make shared editorial treatments and the Phase 7A professional-surface layout contracts component-owned, typed and locally testable.

**Architecture:** CSS custom properties remain the sole token value source. `styled-components` receives a typed mirror made of those variables, then supplies a shared pull quote and the discrete About/CV layout seams where stale global selector assumptions have already caused defects. Global Sass keeps reset, root tokens and generic site-shell rules.

**Tech Stack:** React 19, TypeScript, styled-components 6, Sass, Vitest, Playwright.

**Execution Strategy:** `manual` — the work is tightly coupled to active visual review and must remain one bounded professional-surface slice.

## Global constraints

- Do not relax the existing build budget.
- Do not create a second token authority; all theme values reference `_tokens.scss` custom properties.
- Do not migrate settled articles, case studies or global typography in this slice.
- Preserve semantic markup, routes, accessibility and the approved Phase 7A copy.
- Use focused unit/browser proof before staging; the hook remains the broad gate on commit.

### Task 1: Establish the typed styled-components seam

**Files:**
- Create: `src/client/src/styles/editorialTheme.ts`
- Create: `src/client/src/styles/styled.d.ts`
- Create: `src/client/src/components/editorial/EditorialThemeProvider.tsx`
- Test: `src/client/src/styles/editorialTheme.test.ts`

- [ ] Write a failing test that consumes the theme's colour, spacing and typography keys and asserts their CSS-variable values.
- [ ] Define the immutable typed theme as the explicit mirror of existing root variables and augment `styled-components` `DefaultTheme` with that type.
- [ ] Add a provider around each lazy professional-surface route that consumes the grammar. Do not place the styled-components runtime in the application shell.
- [ ] Run `npm test -- --run src/styles/editorialTheme.test.ts` from `src/client`.

### Task 2: Create the canonical pull-quote primitive

**Files:**
- Create: `src/client/src/components/editorial/EditorialPullQuote.tsx`
- Create: `src/client/src/components/editorial/EditorialPullQuote.test.tsx`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/pages/AboutPage.scss`

- [ ] Write a failing render test for quote text, optional attribution and the canonical styled rule/inset contract.
- [ ] Implement `EditorialPullQuote` with semantic `blockquote`, optional `cite`, typed theme values and responsive display type.
- [ ] Replace the About-only pull-quote markup and remove its duplicate local stylesheet rules.
- [ ] Run `npm test -- --run src/components/editorial/EditorialPullQuote.test.tsx`.

### Task 3: Move failure-prone professional layout contracts beside their routes

**Files:**
- Create: `src/client/src/pages/about/ProfessionalStory.tsx`
- Create: `src/client/src/pages/about/NextRolePanel.tsx`
- Create: `src/client/src/pages/cv/CvSheet.tsx`
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/pages/CvPage.tsx`
- Modify: `src/client/src/styles/global.scss`
- Test: `src/client/e2e/about-layout.spec.ts`

- [ ] Keep story rails, conversion panel and CV-sheet layout in styled components that own their direct children; do not use broad descendant selectors to simulate grid children.
- [ ] Remove exactly the superseded global selectors, retaining site-wide base typography and control classes.
- [ ] Extend browser proof for the 1100px conversion-panel overlap and duplicate story-rail rule; preserve existing mobile proof.
- [ ] Run the focused unit and Playwright professional-surface tests.

### Task 4: Review the composition and record the protected-default evolution

**Files:**
- Modify: `docs/design-decisions.md`
- Modify: generated outputs only through their canonical scripts when required

- [ ] Add the dated decision: shared editorial grammar is component-owned; CSS variables remain token authority; legacy Sass migrates only when a surface changes.
- [ ] Run `npm run build` and focused Playwright checks. Confirm the entry budget remains within its existing ceiling.
- [ ] Review About and CV at 1440, 768, 390 and 320 CSS pixels, plus the affected 1100px transition width.
- [ ] Stage source and generated outputs together; commit through the hook without bypassing it.

## Plan-readiness review

- Coverage: Tasks 1–3 provide typed tokens, shared grammar and the two actively changed professional surfaces; Task 4 records the deliberate visual-language evolution and proves performance/responsiveness.
- Non-goals: no global rewrite, token redesign, article/case-study migration or budget increase.
- Rating: **9/10**. The user has explicitly approved the staged adoption; exact visual acceptance remains Harley-owned at the rendered-page gate.

# Shared Editorial Asides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every current published-writing aside use one accessible, responsive `EditorialAside` primitive, without widening the change into a general article redesign.

**Architecture:** Add the typed styled-components primitive beside `EditorialPullQuote` and export it from `src/client/src/components/editorial/index.ts`. The primitive owns the shared field, reading-measure relationship, heading/precis/disclosure hierarchy, native details interaction and responsive rules; article bodies supply only their actual copy, optional eyebrow, precis, disclosure label, optional visual and body content. Migrate the five audited consumers: WorkClaw, Astra, the two product-ownership disclosures, and the testing lens, all collapsed first.

**Tech Stack:** React 19, TypeScript, styled-components, Vitest with React Testing Library, Playwright, Vite.

**Execution Strategy:** `executing-plans` — the shared interface must be established before all consumer migrations and tests can settle.

## Global Constraints

- Work only in `Z:/_agent-worktrees/portfolio/harleydbartles/port-13-use-superpowers` on `harleydbartles/port-13-use-superpowers`; keep PR #53 a draft and do not merge or deploy.
- The canonical import surface is `src/client/src/components/editorial`; articles must not retain local aside shells or aside presentation styles.
- Preserve all source copy and reading order. Astra and WorkClaw remain collapsed initially; Astra's closed five-minute path and open sub-seven-minute path remain unchanged.
- Use semantic native `details`/`summary` for every current aside body. Every consumer is collapsed first; the testing article's current always-open lens is an accidental divergence, not a contract to preserve.
- Reuse the accepted Source Serif article reading, Source Sans hierarchy, and Source Code Pro compact-control roles; do not create a new typography system.
- Add no dependencies or speculative prop variants. Do not change unrelated writing layouts, content, routes, or publication state.
- Regenerate mesh-owned indexes through `py -3 tools/run.py mesh --apply`; let the normal pre-commit hook run the full staged gate.

---

### Task 1: Prove the shared primitive contract

**Files:**
- Create: `src/client/src/components/editorial/EditorialAside.test.tsx`
- Create: `src/client/src/components/editorial/EditorialAside.tsx`
- Modify: `src/client/src/components/editorial/index.ts`

**Interfaces:**
- Produces: `EditorialAside` and `EditorialAsideProps` from `components/editorial`, accepting `title`, `precis`, `disclosureLabel`, `children`, optional `eyebrow`, and optional `visual`.
- Consumes: the existing portfolio theme and `ContentProse` consumers passed as children.

- [x] **Step 1: Write the failing primitive tests.** Cover semantic complementary naming, optional eyebrow, native collapsed disclosure, only disclosure body hidden while closed, click/Enter/Space interaction, and visible focus semantics.
- [x] **Step 2: Run the new test file and confirm it fails because the primitive does not exist.**

  Run: `npm test -- --run src/components/editorial/EditorialAside.test.tsx`

- [x] **Step 3: Implement the minimal typed styled-components primitive.** Use native details for the concrete disclosure consumers; keep the field, rule, measure, title, precis, utility control, body, narrow-width and reduced-motion grammar in this component.
- [x] **Step 4: Export the component and prop type from `components/editorial/index.ts`.**
- [x] **Step 5: Run the primitive test file and mark Task 1 steps complete.**

### Task 2: Migrate every audited published-writing consumer

**Files:**
- Modify: `src/client/src/features/writing/ContextComplexityArticle.tsx`
- Modify: `src/client/src/features/writing/ContextComplexityArticle.scss`
- Modify: `src/client/src/features/writing/ProductOwnershipArticle.tsx`
- Modify: `src/client/src/features/writing/ProductOwnershipArticle.scss`
- Modify: `src/client/src/features/writing/TestingEvidenceArticle.tsx`
- Modify: `src/client/src/features/writing/TestingEvidenceArticle.scss`
- Modify: `src/client/src/features/writing/UseSuperpowersArticle.tsx`
- Delete: `src/client/src/features/writing/UseSuperpowersArticle.scss`
- Modify: the four corresponding feature test files.

**Interfaces:**
- Consumes: `EditorialAside` from `../../components/editorial` with Task 1's exact props.
- Produces: five collapsed-first `data-editorial-aside` article instances: WorkClaw, Astra, SQL, webhook and the testing lens.

- [x] **Step 1: Write/adjust failing consumer tests.** Assert the five actual instances are shared semantic asides, no article-local shell remains, WorkClaw retains copy and collapsed disclosure, Astra retains title/precis/control-only closed state, and the testing lens now matches that collapsed-first treatment.
- [x] **Step 2: Run those focused feature tests and confirm they fail against the current local implementations.**

  Run: `npm test -- --run src/features/writing/ContextComplexityArticle.test.tsx src/features/writing/ProductOwnershipArticle.test.tsx src/features/writing/TestingEvidenceArticle.test.tsx src/features/writing/UseSuperpowersArticle.test.tsx`

- [x] **Step 3: Replace each local aside shell with `EditorialAside`.** Preserve the webhook signal map as the sole concrete `visual` consumer, preserve all body markdown and surrounding article order, and remove superseded aside shell CSS.
- [x] **Step 4: Run the focused feature tests and mark Task 2 steps complete.**

### Task 3: Validate reading, accessibility and responsive shared grammar

**Files:**
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/e2e/writing-navigation.spec.ts`
- Modify or create: focused browser coverage for shared editorial-aside interaction and responsive geometry.

**Interfaces:**
- Consumes: the shared `data-editorial-aside` marker and native summary semantics from Tasks 1–2.
- Produces: automated proof for both required articles, all five corpus consumers, keyboard disclosure behavior, 1440/768/390/320 no-overflow checks and common aside geometry.

- [x] **Step 1: Write/adjust failing route and browser tests.** Use role/text locators for real article titles and disclosure labels; assert native Enter and Space toggles, closed Astra body, WorkClaw body after opening, all body instances use the shared marker, and both routes stay within the viewport at required widths.
- [x] **Step 2: Run focused Vitest and Playwright tests to demonstrate the pre-migration failure where applicable.**

  Run: `npm test -- --run src/pages/ContentPage.test.tsx src/features/writing/ContextComplexityArticle.test.tsx src/features/writing/UseSuperpowersArticle.test.tsx`

  Run: `npm run test:e2e -- e2e/writing-navigation.spec.ts`

- [x] **Step 3: Make only the implementation/test corrections required for green behavior.**
- [x] **Step 4: Re-run the focused checks and perform live browser review at 1440, 768, 390 and 320 CSS pixels, keyboard-only, reduced motion, and actual native 200% zoom.**
- [x] **Step 5: Mark Task 3 steps complete.**

### Task 4: Record the grammar and publish the draft update

**Files:**
- Modify: `.agents/doctrine/portfolio-design-policy.md`
- Modify: `docs/design-decisions.md`
- Modify: generated editorial and plan `INDEX.md` surfaces through mesh.
- Move: `.agents/plans/2026-09-05-shared-editorial-asides.md` to `.agents/plans/completed/2026-09-05-shared-editorial-asides.md` after implementation.

**Interfaces:**
- Produces: durable rule naming `src/client/src/components/editorial/EditorialAside.tsx` / `components/editorial` as the only article-aside path, with `EditorialPullQuote` as the existing conceptual precedent.

- [x] **Step 1: Add the doctrine rule and a dated decision-ledger entry.** State that article-local aside shells/styles are prohibited unless a deliberately new grammar is designed and approved.
- [x] **Step 2: Regenerate indexes and inspect the generated diff.**

  Run: `py -3 tools/run.py mesh --apply`

- [x] **Step 3: Move the completed plan, regenerate indexes again, then review the complete staged diff.**
- [x] **Step 4: Commit the intended tree with the normal hook; do not bypass it.**

  Run: `git add -A; git commit -m "refactor: share editorial article asides"`

- [x] **Step 5: Push the branch, reread and update draft PR #53, then verify its remote head SHA, draft state and mergeability.**
- [x] **Step 6: Mark Task 4 steps complete.**

### Task 5: Integrate the approved Use Superpowers amendment

**Files:**
- Modify: `src/client/src/data/content/writing/2026-09-05-use-superpowers.md`
- Modify: `src/client/src/pages/ContentPage.test.tsx`

**Interfaces:**
- Consumes: the approved copy and its direct public receipt at `HarleyBartles/agent-asset-marketplace/.agents/plans/completed/2026-07-26-update-superpowers-plus-to-v6-2-0.md`.
- Produces: the exact two-paragraph `clownshoes` admission and literal asterisk definition without creating a new footnote presentation system.

- [x] **Step 1: Replace only the approved clean-line paragraph, retain the later first-party-authorship payoff, and link `adaptation overlays` directly to the upgrade-machinery plan.**
- [x] **Step 2: Extend the route test to pin the receipt, approved asterisk definition and separate sober payoff.**
- [x] **Step 3: Run the focused route test and mark Task 5 steps complete.**

## Validation and handoff

- Focused Vitest coverage: primitive plus the four writing-body suites and `ContentPage.test.tsx`.
- Focused production-build Playwright coverage: `npm run test:e2e -- e2e/writing-navigation.spec.ts`.
- Manual browser review: 1440, 768, 390 and 320 CSS pixels; keyboard-only details; reduced motion; actual native browser 200% zoom.
- Full gate: the tracked pre-commit hook on the final normal commit, which runs the staged full CI gate.
- Publication proof: `git push origin harleydbartles/port-13-use-superpowers`, then `gh pr view 53 --json headRefOid,isDraft,mergeStateStatus,url`.

**Plan confidence:** 9/10. The audit has identified every current writing-body aside and the canonical editorial export seam. The only concrete visual variation retained is the existing webhook signal map passed as content, rather than a new aside visual variant.

## Approved geometry correction

- [x] Make the shared aside retain the article column's left edge while breaking right into a wide editorial field only when the viewport can support it.
- [x] Stack the shared header and disclosure lanes before either becomes cramped; preserve viewport-safe single-column behavior at 768, 390, 320 and 200% zoom.
- [x] Add production-browser proof for both WorkClaw and Astra that the wide field is materially broader than prose, left-aligned and free of fragmented title wrapping.

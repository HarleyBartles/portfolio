# Phase 7A Professional Surfaces Implementation Plan

> **For agentic workers:** Execute this plan sequentially. The Cloud design room has already settled copy, hierarchy and proof-route decisions; do not re-author them during implementation.

**Goal:** Turn the approved Phase 7A professional-surface design into an evidence-led About route, first-class CV/PDF route, canonical professional facts and Wild Bunch falsifiability links.

**Architecture:** Keep reusable factual claims in `professionalProfile.ts`; compose the approved prose in `AboutPage` and `CvPage`. Extend the existing styling system rather than creating a generic design layer. Keep the existing PDF generator and two `data-cv-page` sheets as the single web/print source.

**Tech Stack:** React, TypeScript, Sass, Vite, Vitest, Playwright, existing PDF-generation script.

**Execution Strategy:** `manual` — the components, shared facts and PDF pagination are tightly coupled and require one human-visible visual review before merge.

## Global constraints

- The amended Phase 7A specification and `docs/editorial-drafts/phase-7a/` are binding editorial authority.
- Preserve formal title precision, confidentiality boundaries and employer-safe wording.
- Keep public external links in `ExternalLink`; retain current-context internal links.
- No fabricated employer UI, generated About hero or CV imagery.
- Preserve meaningful source order, 320px and 200% zoom usability, keyboard/focus behaviour, reduced motion and print readability.
- Retain exactly two A4 CV pages; do not reduce body copy below a comfortable professional-CV size to force pagination.
- Use focused tests before staging; the tracked hook runs the full canonical gate on commit.

---

### Task 1: Reconcile Phase 7A tracking and canonical professional facts

**Files:**
- Modify: `.agents/plans/portfolio-10k/roadmap.md`
- Modify: `src/client/src/data/professionalProfile.ts`
- Modify: `src/client/src/data/professionalProfile.test.ts`

**Consumes:** the amended Phase 7A design and Cloud discovery record.

**Produces:** typed, employer-safe facts used by About and CV; an in-flight plan link on the Phase 7A roadmap row.

- [ ] Add failing profile assertions for the approved browser-automation boundary, source-capture/no-charge invariant, two paid checks, migration sequencing/outcome, Recruitment CRM SQL result, Barbican/Arch progression and Brand Addition progression.
- [ ] Extend the profile with precision-aware fact groups rather than page-local strengthened literals.
- [ ] Update the Phase 7A roadmap row to show this JIT plan and in-progress implementation, without marking the phase done.
- [ ] Run `npm test -- --run src/data/professionalProfile.test.ts` from `src/client`.

### Task 2: Implement the approved About route

**Files:**
- Modify: `src/client/src/pages/AboutPage.tsx`
- Create or modify: `src/client/src/pages/AboutPage.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/e2e/about.spec.ts`

**Consumes:** Task 1 facts and `phase-7a-about-page-design.md` exact copy/order.

**Produces:** an evidence-led About page with current-work consequence, migration explanation, career provenance, independent-work routes, study, acting aside, CV conversion and contact.

- [ ] Add failing component/browser assertions for the revised hero, `No source capture, no success.` production invariant, migration dependency before avoided round trip, professional provenance, CV conversion and preserved contact route.
- [ ] Replace the current positioning/proof/capability-wall order with the approved section order and exact copy.
- [ ] Use the established pull-quote grammar for the source-capture invariant, with `PRODUCTION INVARIANT` utility copy.
- [ ] Implement responsive About-specific styling from the Cloud record without inventing an employer hero or repeating the CV's document grammar.
- [ ] Run the focused About component and Playwright tests.

### Task 3: Promote CV navigation and implement the approved two-page CV

**Files:**
- Modify: `src/client/src/components/SiteHeader.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/pages/CvPage.tsx`
- Modify: `src/client/src/pages/CvPage.test.tsx`
- Modify: `src/client/src/styles/global.scss`
- Modify: `src/client/scripts/generate-cv-pdf.mjs`
- Modify: `src/client/scripts/generate-cv-pdf.test.ts`
- Modify: `src/client/e2e/cv.spec.ts`

**Consumes:** Task 1 facts and `phase-7a-cv-page-design.md` exact copy/layout.

**Produces:** masthead CV route, conventional screen CV, two-page print/PDF result and direct PDF action.

- [ ] Add failing tests for `Projects · Writing · Patch · About · CV`, removal of `Return to About`, approved headline/profile/Access evidence, Brand Addition progression, two `data-cv-page` sheets and PDF page count.
- [ ] Recompose `CvPage` around present evidence on page 1, continued chronology and selected independent work on page 2, then compact searchable skills and education.
- [ ] Implement desktop-sheet, mobile-continuous and print-only styling specified by the design record; keep semantic page sections in every mode.
- [ ] Update PDF generation only where the exact two-page print contract requires it, then run its focused tests and generate a local PDF for visual inspection.
- [ ] Run focused CV component, navigation and PDF tests.

### Task 4: Add the Wild Bunch falsifiability route

**Files:**
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.tsx`
- Modify: `src/client/src/features/case-study/wild-bunch/WildBunchCaseStudy.test.tsx`
- Modify: `src/client/e2e/project-story.spec.ts`

**Consumes:** the two exact public pull-request links from the Phase 7A closeout.

**Produces:** an early, readable route from the replay claim to its audit scar and closure evidence.

- [ ] Add failing assertions for the rendered falsifiability paragraph and its two accessible external links.
- [ ] Replace only the approved claim paragraph with the settled wording and links; retain the personal opening and broad case-study story.
- [ ] Run focused Wild Bunch unit/component/browser tests.

### Task 5: Integrate visual language, regenerate and review

**Files:**
- Modify: `docs/design-decisions.md`
- Modify: visual baselines only when deliberate rendered changes require them
- Modify: generated indexes or SEO outputs only through canonical generators

**Consumes:** Tasks 2–4 and `phase-7a-site-visual-language-recommendations.md`.

**Produces:** a documented protected-default evolution and approved responsive visual evidence.

- [ ] Add one dated design-decision entry describing the evidence-led professional hierarchy, CV-first navigation and reused editorial grammar.
- [ ] Run `py -3 tools/run.py ci --apply` only if generation reports drift; inspect every generated diff, then stage it with the source changes.
- [ ] Review About and CV at 1440, 768, 390 and 320 CSS pixels; inspect the generated PDF as two A4 pages; review keyboard, reduced motion and 200% zoom.
- [ ] Update only intentional visual baselines and run their focused tests.

### Task 6: Validate and publish the implementation branch

**Files:**
- Modify: `.agents/plans/portfolio-10k/2026-08-29-portfolio-10k-phase-7a-professional-surfaces.md` to mark completed task checklists
- Modify: `.github` PR body through GitHub only after local validation is proven

**Consumes:** all implementation tasks.

**Produces:** a review-ready PR head with honest evidence and an updated draft-PR body.

- [ ] Stage the complete tree and run `py -3 tools/run.py ci --check`; fix only the focused failure reported by the hook before retrying commit.
- [ ] Commit, push and read back the exact remote head.
- [ ] Update PR #43's body from editorial-room status to the actual implementation scope, exact validation and remaining visual-review state.
- [ ] Keep the PR draft until Harley accepts the rendered pages.

## Plan-readiness review

- Coverage: Tasks 1–4 implement every binding source, About, CV, navigation and Wild Bunch change; Task 5 covers the explicit design-decision and visual contract; Task 6 covers validation and PR custody.
- Non-goals retained: no generic proof furniture for Marketplace, Learning Lab or Patch; no portfolio-as-software badge; no employer case study; no fabricated imagery.
- Dependency order: canonical facts precede both professional surfaces; page work precedes styling/visual baselines; validation follows staged source work.
- Rating: **9/10**. The only variable is rendered CV pagination, which the design explicitly routes to visual review rather than silent copy changes.

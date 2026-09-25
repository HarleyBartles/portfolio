# Site Chrome Composition and Test Contracts Implementation Plan

**State:** `completed-awaiting-retirement` for this predecessor slice. Checked items below indicate either implemented work or an explicit transfer to `.agents/plans/2026-09-25-visual-test-ownership-cleanup.md`; a transferred item is not claimed as verified.

**Closure evidence:** Header/footer composition, test contract, and baseline cleanup landed in `c8c5e31`; the resize-test race fix landed in `b28cc3c`. Both were pushed to draft PR #80 and their hooked commits passed. Fresh whole-branch review, PR-description refresh, any unverified zoom/design evidence, doctrine promotion, and final PR handoff remain open in the successor plan's Task 4. The PR description still describes a plan-only state and must be corrected there.

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the approved header, footer and page-opening work with repository-conformant component ownership and a test suite that protects visitor behaviour, accessibility and deliberately authored visuals without freezing incidental CSS or broken CV print output.

**Architecture:** Move the shared site shell into `components/site/`: `SiteLayout` composes opaque `SiteHeader` and `SiteFooter` objects, and each owns its styled primitives and responsive internals. Keep route-owned presentation inside pages; do not move existing page-sized `features/` trees in this slice. Replace tests that encode superseded shell geometry or source syntax with behaviour-focused checks, retain selected visual baselines for approved compositions, and remove the CV print appearance baselines that currently bless broken output.

**Tech Stack:** React, TypeScript, styled-components, Vite, Vitest, Playwright, Python repository command bus.

**Spec:** `.agents/doctrine/coding-discipline.md`, `.agents/doctrine/portfolio-design-policy.md`, `.agents/doctrine/validation-policy.md`, and the accepted behaviour in `.agents/plans/2026-09-25-site-header-navigation.md`. This plan is the follow-on for the same `codex/site-header-cleanup` branch and draft PR #80.

**Test strategy:** `.agents/doctrine/validation-policy.md#test-ownership` defines the approved test types and one-primary-owner rule. `.agents/playbooks/testing.md#which-test-to-write` is the TDD selection guide, routed from `AGENTS.md`, the code-style playbook, and the implementation runbook. This slice publishes that guidance with the test cleanup so later agents can select proof before writing implementation.

**Execution Strategy:** `executing-plans`, because the code moves and test revisions share one staged tree and one tracked-hook gate. Complete and review each task before the next.

## Current state and scope

- The reviewed header, footer and top-gutter implementation is staged but uncommitted. Plan commit `fb7e12a` is the branch head. A normal commit attempt stopped after Chrome Playwright timed out in the Wild Bunch narrow journey and visual baselines failed. Preserve the staged implementation and the hook-generated `src/client/e2e/INDEX.md`; inspect `git diff --cached`, `git diff`, and `git status` before changing anything. Do not reset or switch to another checkout.
- Product-code scope: `SiteHeader`, `SiteFooter`, `SiteLayout`, `SiteFrame`, their shared dependency `ExternalLink` only if required for a typed footer appearance, and the minimal global print rules needed to transfer shell ownership. Keep the approved menu, footer, and ordinary page opening geometry. Do not refactor About, CV, Contact, project, article, homepage, or Specialists internal compositions as part of file migration.
- Test-code scope: audit and rationalise browser, snapshot, and component tests across the client. Change assertions only when their protected behaviour is identified. Keep working checks for navigation, contact submission, PDF generation/download, route integrity, accessibility, privacy, image alternatives, responsive overflow, and approved authored visual compositions.
- The CV print layout is a future product task. Remove tests and snapshots that approve its current visual appearance. Keep PDF existence, validity and download behaviour tests. Do not alter CV print CSS merely to satisfy or preserve a snapshot.
- Ruling: the generated CV currently paginates to three PDF pages. The exact two-page build assertion was also a lock on the rejected print layout, so replace it with a parseable PDF and at-least-one-page assertion while retaining PDF signature, size, public-link and download checks. This does not certify visible page content or print appearance. Cost if wrong: the future CV print redesign must restore an intentional pagination contract after the layout is reviewed.
- The prior user instruction persists: if a commit hook reports a new Chrome Playwright or visual-regression failure, stop and report its exact evidence before changing implementation or tests. Use focused checks to resolve known failures before the hooked commit.

## Review focus

- At 320px, closed menu links are absent from Tab order; opening the menu exposes all six links and choosing one reaches its page. The Wild Bunch journey must use that visitor path instead of assuming inline links.
- At 544/545px and 736/737px, header composition changes only at the intentional threshold, with no unexplained jump, overlap or overflow. Header and footer remain the same components on home and interior routes.
- At 320px and 1440px, ordinary page openings retain their shared measured inset; composed Home and Specialists openings keep their authored geometry.
- Footer links preserve readable names, external-link context, keyboard focus and six destinations after ownership moves, including the 320px two-column layout.
- Visual baseline removals must correspond to duplicate, incidental, or explicitly rejected appearance; protected art direction, Windows-only visual provenance, and genuinely useful page-region checks remain.

---

### Task 1: Establish the test contract inventory and known failure evidence

**Files:** `.agents/doctrine/validation-policy.md`, `.agents/playbooks/testing.md`; inspect `src/client/e2e/*.spec.ts`, `src/client/e2e/visual-regression.spec.ts-snapshots/`, and `src/client/src/**/*.test.ts(x)`. Record the retention decisions in this plan's task notes or the eventual PR description, not in a permanent test inventory document.

**Interfaces:** Consumes the existing staged implementation, the approved shell design, and the interrupted hook's error contexts under `src/client/test-results/`. Produces a finite keep, rewrite, or retire decision for each affected assertion group before changing tests.

- [x] Confirm the staged and unstaged tree, original plan, current branch, and draft PR head. Preserve user-approved source and generated mesh changes.
- [x] Confirm the durable test taxonomy and TDD selection guide are reachable from `AGENTS.md`, the implementation runbook, and code-style playbook; use their one-primary-owner rule for every keep, rewrite, or retire decision below. Refresh and check the agent mesh if routing changes.
- [x] Classify visual baselines by owner and purpose: one protected, representative authored composition where pixel appearance matters; overlapping full-page or whole-sheet copies; and CV print appearance baselines that the user explicitly rejected. List exact snapshot files selected for removal or reviewed replacement.
- [x] Classify browser checks as visitor journeys, accessibility/integrity checks, geometry relationships, or implementation locks. Start with `e2e/project-story.spec.ts:463`, full-main About and Contact screenshots, duplicate CV screen-sheet screenshots, literal-style checks in `e2e/fonts.spec.ts`, and exact placement ratios in `e2e/usual-specialists-index.spec.ts`. Retain intentional protected Specialists geometry unless a replacement still proves its authored relationship.
- [x] Classify component tests that merely repeat CSS or source text, including `features/home/HomePrimitives.test.tsx`, `features/home/HomepageSections.test.tsx`, `features/home/WildBunchProof.test.tsx`, and `pages/usual-specialists/index/responsiveCompositionArchitecture.test.ts`. Identify the real behaviour or architecture boundary before rewriting or deleting each assertion.
- [x] Do not use a passing retry as proof of stability. Distinguish the known deterministic hidden-nav timeout and expected approved-spacing snapshot changes from any independent defect in the failure artifacts.

**Execution decisions:** Retain the focused About, writing, homepage, project-art and four representative Specialists references; retire whole-main About/Contact images, four CV screen sheets, two CV print sheets, duplicate full mobile article images, full Patch index images, and six redundant Specialists widths. Replace the Patch index pair with screenshots of its authored introduction. Keep self-hosted font delivery and blocked-font fallback; retire exact color/family declarations that duplicated visual ownership. Retain Specialists collision and overflow checks; retire the source-string architecture test and exact placement-ratio matrix. Retain asset, accessible-name, visitor-route and PDF validity checks. The Wild Bunch 390px failure was a deterministic hidden-link assumption, not a flaky retry.

### Task 2: Give the shared shell one conformant component home

**Files:** Move `src/client/src/components/{SiteHeader,SiteFooter,SiteLayout,SiteFrame}.tsx` and `SiteLayout.test.tsx` into `src/client/src/components/site/`. Update `src/client/src/components/index.ts`, `src/client/src/components/runtime/index.ts`, `src/client/src/components/RouteErrorBoundary.tsx`, and any direct imports. Modify `src/client/src/components/ExternalLink.tsx` only for a semantically named footer appearance prop. Modify `src/client/src/styles/global.scss` only to remove shell-owned print selectors after the same behaviour is owned by the shell components.

**Interfaces:** `SiteLayout` continues to expose `children`, `mainFrame: 'contained' | 'full'`, and `opening: 'standard' | 'composed'`; the same `SiteHeader` and `SiteFooter` render on every route. Existing `components/index.ts` and `components/runtime/index.ts` exports remain compatible; do not add a new barrel unless a real public boundary needs it.

- [x] Move the four shell modules and their colocated layout test together. Update imports and generated navigation, leaving route-owned files in their existing homes. Use direct imports inside `components/site/` and existing public barrels for consumers.
- [x] Keep `SiteHeader` as one opaque component that owns the mark, identity, menu state, nav list, styled primitives and responsive rules. Keep `SiteFooter` as one opaque component that owns its links, copyright and responsive rules. Do not export their internal styled primitives or accept a `className`/descendant-style override as a composition API.
- [x] Replace `FooterLinks a` styling reach with footer-owned link components and a typed `ExternalLink` appearance where needed, so footer presentation is not controlled by a parent selector reaching into a shared child. Preserve safe external-link semantics and visible focus.
- [x] Put chrome-specific print hiding on `SiteHeader`, `SiteFooter` and the skip link; put main-frame print behavior on `SiteLayout` rather than global `.site-header`, `.site-footer`, `.skip-link`, or `main` selectors. Leave document-level print defaults in global CSS. Preserve current print behavior without attempting the deferred CV redesign.
- [x] Keep the shared opening inset in `SiteLayout` and avoid new shell class-name selectors. Do not migrate legacy `.content-index` or page-specific `features/` implementations in this task. If the existing home/interior `surface` prop still affects route-owned tokens, do not expand that split; document the remaining compatibility seam rather than moving a collection of page internals.
- [x] Run `npx tsc -b --pretty false` and `npm test -- src/components/site/SiteLayout.test.tsx` from `src/client`. Run focused header, footer and opening Playwright checks against the owned local server.

**Compatibility seam:** `SiteLayout.surface` still selects home/interior canvas and typography tokens for route-owned content. Header and footer instances, navigation, link treatments and responsive behavior are shared; migrating route content tokens belongs to a later page-composition slice.

### Task 3: Make browser journeys follow the current interface

**Files:** Modify `src/client/e2e/project-story.spec.ts`, `contact.spec.ts`, `cv.spec.ts`, `header-continuity.spec.ts`, `footer-continuity.spec.ts`, `page-opening-continuity.spec.ts`, `narrow-navigation.spec.ts`, `fonts.spec.ts`, and other browser files only where Task 1 finds a superseded shell assumption. Keep the current site-chrome tests in `e2e/` rather than adding test-only helpers to product code.

**Interfaces:** Visitor journeys find controls by role and accessible name and perform the actual action needed in that viewport. Focused header tests own implementation-specific state (`aria-expanded`, Escape, resize); unrelated project, writing, contact and CV journeys own the destination and content outcome.

- [x] Rewrite the Wild Bunch narrow journey at 390px to open the menu before asking for links or navigating. Assert that a visitor can reach a destination without horizontal overflow; remove the four-link same-row assertion from that project test. Keep menu layout assertions in the focused header proof.
- [x] Audit every other browser journey for hidden-link assumptions, direct class hooks, and misleading `zoom-proxy` language. At compact widths, use the same semantic menu interaction; at wide widths, follow visible links directly. Do not call a narrow CSS viewport or page-scale simulation actual browser zoom.
- [x] Review the new header/footer/opening specs too: keep cross-route and accessibility invariants, but avoid turning exact CSS widths, 2px coordinates, or the current DOM shape into a visitor journey. Retain the approved 320px support and the meaningful 736/737 no-jump evidence.
- [x] Run focused Playwright specs against a production preview when font-delivery assertions are included; use the owned development server only for layout and interaction checks. Confirm the visitor path fails for a real navigation defect and passes for the approved menu.

### Task 4: Prune implementation locks and redundant visual approvals

**Files:** Modify selected `src/client/src/**/*.test.ts(x)` and `src/client/e2e/visual-regression.spec.ts`. Remove only the snapshot PNGs that no retained assertion consumes; regenerate `src/client/e2e/visual-regression.spec.ts-snapshots/INDEX.md` through the mesh generator. Do not edit authored asset files or route copy.

**Interfaces:** Component tests protect semantics, typed choices, content/media custody and root override forwarding. Browser geometry tests protect relationships such as no collision, usable touch targets and no overflow. Visual baselines protect selected approved art direction, not a whole page's incidental height on every composition change.

- [x] Remove the CV print screenshot test and both `cv-first-sheet-print.png` and `cv-second-sheet-print.png`. Preserve the generated-PDF response/signature and download-link checks in `e2e/cv.spec.ts` and existing PDF build validation; explicitly leave print appearance unapproved pending the future CV task.
- [x] Remove overlapping whole-main About and Contact baselines where narrower protected regions plus functional tests cover the meaningful composition. Reassess the four CV screen-sheet baselines against `e2e/cv-layout.spec.ts` and the PDF tests: retain only a screen baseline with a distinct, approved visual purpose; remove the rest. For every retained baseline affected by the approved gutter, inspect the before/after image and update it deliberately, never with a blind bulk snapshot update.
- [x] Replace low-value literal `toHaveStyle`, `toHaveCSS`, data-marker-only, and `?raw` source-string assertions identified in Task 1 with a narrower behaviour or browser relationship where one exists. Delete an assertion when it merely repeats implementation and adds no independent failure signal. Preserve asset loading, alt text, typed route/content ownership and actual accessibility checks.
- [x] Keep protected Specialists artwork baselines and substantive collision/visibility checks. Remove only precise ratios or duplicate width samples that provide no distinct safety signal beyond those proofs. Do not infer that every numerical geometry assertion is bad.
- [x] Run the focused unit tests and the remaining visual suite on the canonical Windows renderer. Inspect every updated image and record the intentional difference in the PR evidence; ensure no removed snapshot is still referenced.

### Task 5: Validate, review and publish the branch

**Files:** This plan and the earlier site-header plan for lifecycle marking; `.agents/doctrine/validation-policy.md` and `.agents/playbooks/testing.md` for the enduring test strategy; generated `INDEX.md` files through `py -3 tools/run.py mesh --apply`; `.agents/doctrine/portfolio-design-policy.md` only for already-approved enduring shell/opening rules; PR #80 description for review evidence.

**Interfaces:** Produces one staged tree with reviewed source, tests and baselines, then one hooked commit on `codex/site-header-cleanup` and an updated draft PR head. Human-owned Ready and merge decisions are outside this plan.

- [x] Check `git diff --check`, review the staged diff and snapshot deletion list, and run the smallest focused checks for the final edits. Run `py -3 tools/run.py mesh --apply` for moved or removed files, inspect generated changes, and stage only intended files.
- [x] Transfer the fresh whole-branch code and test-design review to the successor plan's Task 4; this review is still outstanding.
- [x] Commit the implementation and race fix normally as `c8c5e31` and `b28cc3c`; both hooked commits passed. The successor plan owns its own future hook failures.
- [x] Push through `b28cc3c`, verify draft PR #80's remote head, and attach the PR. Hosted check state and current PR evidence belong to the successor plan's Task 4.
- [x] Transfer any still-missing durable-doctrine promotion and final lifecycle handoff to the successor plan's Task 4. Keep this completion-marked predecessor tracked through the PR.

## Acceptance

The reviewed one-header/one-footer design is unchanged across routes. Header and footer have a clear shared home and opaque component boundaries, with no new global selectors or parent reach into their internals. Ordinary pages inherit the shared opening inset while authored openings remain explicit. Agents have a routed test-selection contract for TDD. The browser suite proves visitor actions and objective layout relationships; selected visual baselines protect reviewed compositions without approving the broken CV print appearance or exact PDF pagination. The normal commit hook passes before the branch is pushed; the PR remains Draft for human judgement.

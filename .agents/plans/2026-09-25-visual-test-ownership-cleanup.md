# Visual Test Ownership Cleanup Implementation Plan

**Status:** completed-awaiting-retirement

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing visual suite protect a small set of approved, authored compositions while visitor journeys, component behavior, accessibility, and layout relationships live at their proper test layers.

**Architecture:** Classify every assertion in `visual-regression.spec.ts` by the failure it can detect. Delete redundant or implementation-shaped checks; move only genuinely missing visitor or layout behavior into focused existing specs. Keep a selective set of region snapshots where appearance itself is the contract, and remove baselines that have no surviving consumer.

**Tech Stack:** React, TypeScript, Vitest, Playwright, Windows-authored screenshot baselines, Python repository command bus.

**Spec:** `.agents/doctrine/validation-policy.md#test-ownership` and `.agents/playbooks/testing.md#which-test-to-write`; the approved assessment in the current PR #80 discussion. This is a follow-on slice on `codex/site-header-cleanup`, in the same draft PR. The older plan's unfinished closeout items were transferred here explicitly.

**Execution Strategy:** `executing-plans`, because snapshot selection, duplicate-test removal, and baseline custody require one coherent review and staged commit.

**Inherited closeout:** The preceding header and site-chrome plans are closed by explicit transfer, not by claiming all their review evidence already exists. This plan owns the unverified items named in Task 4: fresh whole-branch review, PR description/evidence refresh, breakpoint and visual-review record, any honest zoom limitation, durable-doctrine promotion, and final plan lifecycle marking. The header, footer, page-opening implementation and hooked push are already present at `b28cc3c` on PR #80.

## Global Constraints

- Do not alter product UI, article copy, assets, or the known-broken CV PDF/print layout merely to preserve a test. A real shared-shell defect may be fixed when the visitor/layout contract warrants it and a focused check proves it.
- A screenshot must protect an approved visual composition that cannot be described adequately as DOM behavior or measurable layout. Keep the Windows baseline provenance and review every changed image deliberately.
- Delete a duplicate or tautological assertion; do not automatically relocate it to another test file. Add a replacement only for a genuine uncovered visitor or system behavior.
- Keep coverage for usable navigation, accessibility, 320px support, route integrity, asset loading, and intentional art direction.
- Do not run the complete CI gate just before a normal hooked commit. If the commit hook reports a Chrome Playwright or visual failure, pause and report the exact failure before editing it, per the user's standing instruction.
- Preserve the existing branch and draft PR #80. Do not refresh `main` or create a new worktree for this continuing slice.

## Review Focus

- A route-specific screenshot is retained only if its named composition is intentionally approved and a DOM check would miss a meaningful failure.
- A removed baseline has no surviving `toHaveScreenshot` consumer; generated snapshot indexes stay current.
- Shared shell, aside behavior, and focus treatment remain protected once at their owning layer, without page-by-page repetitions.
- Reducing viewport samples does not remove the only proof of a distinct authored layout mode, especially for Specialists.

---

### Task 1: Record the assertion-to-owner decisions before changing tests

**Files:** Inspect `src/client/e2e/visual-regression.spec.ts`, `writing-navigation.spec.ts`, `about.spec.ts`, `about-layout.spec.ts`, `project-story.spec.ts`, `homepage.spec.ts`, `usual-specialists-index.spec.ts`, the relevant component tests, and `src/client/e2e/visual-regression.spec.ts-snapshots/`. Record the finite disposition in the PR description or this plan's execution notes; do not create a permanent test inventory.

**Interfaces:** Consumes current test ownership doctrine. Produces a keep/delete/move decision for every assertion and screenshot in the visual spec before implementation.

- [x] Inventory every `expect`, including indirect assertions inside `openStable`, image/style wait helpers, `clipBetween`, and `enclosingClip`. Classify each as visual appearance, visitor outcome, component state, accessibility, renderer geometry, test-harness correctness, or duplication.
- [x] Map each retained screenshot to an approved composition, owning route, representative width, and distinct failure that it catches. Compare its crop with overlapping screenshots in the same or another spec. Name exact PNGs to remove before deleting any.
- [x] Check the similarly named `writing-navigation.spec.ts` Use Superpowers journey separately. Identify the visitor outcome, if any, absent from `UseSuperpowersArticle.test.tsx`, `EditorialAside.test.tsx`, and the existing writing journeys. Keep only that outcome in Playwright; do not treat its title as a visual-test case.
- [x] Establish baseline evidence with the focused visual and writing specs on the current Windows renderer. Record failures separately from the intended cleanup; do not regenerate snapshots blindly.

### Task 2: Remove nonvisual and repeated proof from the visual spec

**Files:** Modify `src/client/e2e/visual-regression.spec.ts`; modify `src/client/e2e/writing-navigation.spec.ts` only for the separately inventoried Use Superpowers duplication. Touch a focused existing layout or accessibility spec only if Task 1 found a real uncovered behavior.

**Interfaces:** Consumes Task 1's ownership decisions. Produces a visual spec containing only screenshot assertions and minimal stabilization helpers needed by those screenshots.

- [x] Delete the 12-case `nonHomeProof` route/viewport matrix. Shared chrome and type register attributes are component concerns; heading order, focus appearance, and horizontal overflow already have focused owners. Preserve a distinct missing accessibility or layout behavior only if the inventory proves one, using a representative browser check in its owning spec.
- [x] Delete the mobile article-header test and the 320px Patch snapshot test from the visual spec. Their text, figure count, order, height, and overflow assertions are DOM or geometry checks already represented in focused article/project tests; add nothing if no gap remains.
- [x] Remove the continuation focus and literal `3px` outline assertions from this spec. Retain an accessibility check only if no existing keyboard/focus test covers the behavior; never assert the exact CSS width as the contract.
- [x] Remove `origin.toBeAttached()` from the Learning Lab screenshot test and other setup-only or post-screenshot assertions without an independent failure mode.
- [x] Trim the Use Superpowers Playwright journey to one meaningful route-and-keyboard visitor outcome if it still has one. Drop page-shell marker, aside implementation attributes, exact article prose, and other component/route inventory already owned elsewhere.
- [x] Run focused Playwright specs for changed nonvisual behavior; inspect failures for lost coverage rather than restoring removed assertions by reflex.

### Task 3: Curate authored screenshots and their baselines

**Files:** Modify `src/client/e2e/visual-regression.spec.ts`; remove orphaned PNGs from `src/client/e2e/visual-regression.spec.ts-snapshots/`; regenerate its `INDEX.md` with `py -3 tools/run.py mesh --apply` after source and baseline edits.

**Interfaces:** Consumes Task 1's named snapshot inventory and Task 2's reduced spec. Produces one coherent set of reviewed, Windows-owned visual baselines.

- [x] Remove the writing-index screenshot if its only claimed protection is newest-first order. Reassess the two writing-continuations screenshots against their distinct wide/mobile destination-object composition; keep only widths that protect materially different art direction.
- [x] Keep at most one representative About current-work visual if its composition is approved. Reassess both CV-conversion screenshots against ordinary CTA layout and existing About geometry checks; retire any whose failure would merely report legitimate copy or spacing iteration.
- [x] Keep representative homepage opening and authored Wild Bunch/Specialists compositions. Remove nested lockup screenshots already covered by their parent crop unless the lockup has its own separately approved visual treatment and failure mode.
- [x] Retain a selective Marketplace, Wild Bunch, Patch, and Learning Lab set for the distinctive maps, illustrated heroes, figures, and story transitions. Remove successive ordinary section screenshots that amount to a page catalogue. Keep desktop/mobile pairs only when the two widths express distinct compositions.
- [x] Retain representative Tournament, Patch-index, and Identity-Emporium imagery. Give each modular section its own visual owner and responsive widths; for Specialists, capture only the Index region at its authored compact, high-step, walk-ready, wide, and ultrawide modes. Do not let those widths create a page-wide snapshot matrix or constrain Coming Soon and future sections.
- [x] If `clipBetween` or `enclosingClip` loses all consumers, delete the helper and its harness test. If it remains, keep one focused correctness test for document-coordinate clipping without making it a product journey.
- [x] Inspect the surviving screenshot images and every proposed deletion side by side. Remove only PNGs no retained assertion references; regenerate and check the mesh with `py -3 tools/run.py mesh --apply` then `py -3 tools/run.py mesh --check`.
- [x] Run `npx playwright test e2e/visual-regression.spec.ts e2e/writing-navigation.spec.ts --reporter=line` from `src/client` on Windows, with the production build/preview required by the Playwright config. Confirm no unexpected baseline updates, orphan references, or retry-rescued passes.

### Task 4: Review and publish the same draft PR

**Files:** This plan, `src/client/e2e/visual-regression.spec.ts`, any changed owning specs, snapshot PNGs and generated indexes; PR #80 description.

**Interfaces:** Produces a reviewed staged tree, hooked commit, pushed branch head, and a draft PR whose description explains the removed proof and retained visual ownership.

- [x] Review the final diff against the Task 1 inventory and the test ownership policy. The test-design review found a missing hosted visual invocation, unrelated chapter absence in the Index contract, and duplicate Wild Bunch markup assertions; all were removed or corrected. A separate fresh test-design reviewer slot was unavailable, so the corrected ownership and visual command were verified directly.
- [x] Obtain a fresh whole-branch code/design review covering shared header/footer ownership, stale journeys, baseline custody, and the newly reduced visual suite. No actionable findings. Record the measured 544/545px breakpoint rationale and the user's accepted mark/menu visual judgment in PR #80. Browser UI zoom at 200% was not tested; the existing browser journey's page-scale factor emulation is not equivalent.
- [x] Check `git diff --check`, snapshot references, and generated-index status. Stage only intended files and commit normally; the tracked hook runs the complete gate against the staged tree. Do not run `ci --check` immediately before or after that hooked commit.
- [x] If the hook reports any Chrome or visual failure, pause with the exact test, first-attempt status, and artifact path before changing tests or snapshots. Otherwise push `codex/site-header-cleanup`, verify draft PR #80's head SHA, and report hosted status separately.
- [x] Replace PR #80's stale plan-only description with the actual header/footer implementation, test-strategy cleanup, visual evidence and limitations. Confirm hosted checks and remote head independently from the local hook. Hosted CI jobs were skipped under the repository's draft-PR condition.
- [x] Use `completing-planning-artifacts` to promote the durable module-owned responsive testing rule to current doctrine and mark this plan `completed-awaiting-retirement`. The two predecessor plans are already closed by transfer; retain all three tracked plans in the PR through merge.

## Acceptance

The visual spec contains only selected screenshots of approved authored compositions plus helpers essential to capturing them. Visitor, component, accessibility, and renderer-layout claims have one sensible owner, with duplicates deleted. No known-broken CV print appearance is approved. The focused tests and normal hooked commit pass, and draft PR #80 contains the reviewed cleanup.

## Execution notes

- Baseline before edits: the visual and writing specs passed 52/52. After the ownership reduction, they passed 30/30 without retries. No product UI or baseline image was changed.
- Deleted the 12-case route matrix, article-header and Patch snapshot DOM checks, and duplicated Use Superpowers page test. Existing accessibility, project, writing, and component tests own their respective behavior; no replacement assertion was needed.
- The visual suite now owns 26 screenshots: 16 selected cross-route images, five homepage movement images, and five Index-chapter images. The Index captures only its own region at 320/650/700/1400/2560; 650 protects its distinct high-step mode. Coming Soon has its own browser spec and no screenshot baseline. Future Specialists modules can choose their own widths.
- Removed 21 old PNGs outright and moved five homepage PNGs to movement-owned spec directories. The deleted set includes ordinary About/CV sections, writing list and continuation cards, a redundant wide homepage lockup, verbose Learning Lab atlas/system, Marketplace's generic hero, ordinary Patch close sections, redundant Wild Bunch evidence, and seven old Specialists full-page/orphan screenshots. `clipBetween` remains necessary for the Learning Lab crop, so its harness test remains. Fresh test-design review found that the portrait Specialists lockup has no surviving mobile parent crop, so it was restored.
- Split the Specialists browser spec into opening, Index, and Coming Soon owners. Split the homepage browser spec into site, Wild Bunch, and Specialists owners. The site-level horizontal-overflow sample now checks 320/768/1440; section-specific breakpoints stay in their owning specs. Before the final review changes, 56 focused browser checks passed; after them, the updated visual command passed all 16 visual checks and a 27-check homepage/Specialists/header/opening run passed. The final hook passed 313 Vitest checks and 173 Chromium checks. The dev-server-only failure of the production chunk-name assertion was resolved by running that assertion against the built preview, where it passes.
- The hook's first attempt caught an exact-string assertion in `test_visual_ci_contract.py` rejecting the expanded visual command. Replaced it with a runner and required-spec membership check; the focused Python test and second complete hook passed.
- Pushed head `e791574adb07c52d63590978d0c3bac04f0993eb` to draft PR #80 and replaced its plan-only description. GitHub workflow jobs report `skipped` because the PR remains draft, as intended; the local hook provides the complete gate evidence.
- The page-opening contract exposed a real extra 32px top inset on `/patch`; its page-local padding now starts after the opening rather than stacking with the shared shell inset. The focused 320/1440 page-opening checks passed on the production build. No CV PDF or print appearance test was added.

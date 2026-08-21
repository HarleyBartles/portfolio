# Portfolio Quality System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` (recommended) or `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio's current editorial quality durable through active design doctrine, executable product contracts, complete local/hosted validation, visual baselines, and protected publication workflow.

**Architecture:** Keep `py -3 tools/run.py ci --check` as the one canonical gate and expand it to orchestrate repository, Python, .NET, client unit, production-build, and Playwright checks. Put subjective direction in an active portfolio design policy and append-only decision ledger; encode only objective, costly-to-rediscover contracts in tests and scripts. Make deployment consume the same validated artifact, then prove the public routes after GitHub Pages publishes it.

**Tech Stack:** Python 3.13, React 19, TypeScript 6, Vite 8, Vitest, Playwright, axe-core, GitHub Actions, GitHub Pages.

**Execution Strategy:** `executing-plans` — the canonical runner, client scripts, workflows, and documentation are coupled and should be changed sequentially in one worktree. Multi-agent execution is unavailable for this task.

## Global Constraints

- Preserve the warm editorial field-journal identity, deliberate typography, designed HB mark, honest status language, manual randomized feature deck, and explicit professional About page.
- Preserve freedom to redesign: invariants describe intent and evidence, not immutable colors, layouts, copy, or component structure.
- Do not add brittle snapshots of prose, CSS classes, or entire long pages.
- Patch remains a supporting example and exactly one candidate in the homepage feature pool.
- Feature motion never autoplays and respects `prefers-reduced-motion`.
- Do not publish plaintext personal email addresses, phone numbers, private filesystem paths, invented project facts, or fake imagery.
- Keep owned assets in repo custody with attribution and transformation records; no production image may exceed 400 KiB.
- Keep initial entry JavaScript at or below 350 KiB uncompressed and CSS at or below 40 KiB uncompressed.
- Run code behavior changes test-first and observe the intended red result before implementation.
- Work on `codex/portfolio-quality-system`, based on `origin/main` at `ed10a1c724f8c65a04e8e72071a3c53783439ccd`; publish through reviewed pull requests, not direct-main commits.
- The deployed product is a static GitHub Pages site. Remove the stale ASP.NET Core host, server tests, solution, server-starting Playwright configuration, and documentation rather than adding them to the quality gate.

---

### Task 1: Active design doctrine and review contract

**Files:**
- Create: `.agents/doctrine/portfolio-design-policy.md`
- Create: `docs/design-decisions.md`
- Create: `.github/pull_request_template.md`
- Modify: `AGENTS.md`
- Modify: `CONTRIBUTING.md`
- Modify: `REVIEW.md`
- Modify: `.agents/runbooks/design.md`
- Modify: `.agents/runbooks/code-review.md`
- Modify: `.agents/runbooks/pr.md`
- Modify: `.agents/doctrine/validation-policy.md`
- Regenerate: affected `INDEX.md` files through `py -3 tools/run.py mesh --apply`

**Interfaces:**
- Consumes: the completed editorial overhaul spec and current site as evidence, not as an immutable implementation.
- Produces: one active policy reachable from `AGENTS.md`, one append-only rationale ledger, and one PR evidence template.

- [x] **Step 1: Write the active design policy.** Define purpose, audience, design invariants, protected defaults, evidence expectations, anti-patterns, and an explicit change protocol: a future change may replace a default when its PR explains the stronger outcome, updates the decision ledger, and updates objective guards where the contract changed.
- [x] **Step 2: Seed the decision ledger.** Record dated decisions for the editorial field-journal direction, About-as-hiring-boundary, no-autoplay randomized feature deck, Patch's supporting role, honest status language, privacy-preserving contact seam, and owned-asset custody. Each entry records context, decision, consequence, and reconsideration trigger.
- [x] **Step 3: Add the PR evidence template.** Require purpose and audience impact, relevant principle or intentional departure, desktop/mobile screenshots for visual changes, accessibility and performance evidence, factual/custody checks, and an explicit visual-baseline update explanation.
- [x] **Step 4: Route every worker and reviewer to the active policy.** Update the named docs without duplicating implementation details; make the design runbook require a ledger entry for a material direction change and make review check coherent hierarchy, typography, motion, responsive behavior, factual honesty, and privacy.
- [x] **Step 5: Regenerate and verify the documentation mesh.** Run `py -3 tools/run.py mesh --apply`, stage all Task 1 files, then run `py -3 tools/run.py ci --check`.
- [x] **Step 6: Mark Task 1 complete and commit `docs: codify portfolio design quality`.**

### Task 2: Trustworthy canonical runner and portable pre-commit gate

**Files:**
- Create: `tests/test_run.py`
- Modify: `tools/run.py`
- Modify: `.githooks/pre-commit`
- Modify: `.github/workflows/ci.yml`
- Modify: `src/client/playwright.config.ts`
- Modify: `README.md`
- Modify: `src/client/README.md`
- Modify: `.devin/rules/src.md`
- Modify: `.devin/rules/tests.md`
- Delete: `.devin/rules/src-server.md`
- Delete: `.devin/rules/src-content.md`
- Delete: `Portfolio.sln`
- Delete: `src/server/`
- Delete: `tests/server/`
- Modify: `.agents/runbooks/testing.md`
- Modify: `.agents/doctrine/validation-policy.md`

**Interfaces:**
- Consumes: existing repo-standard, skills, mesh, link-hygiene, Vitest, Vite, and Playwright commands.
- Produces: `tools/run.py precommit --check` for the fast local gate and `tools/run.py ci --check` for the complete gate. Both run from any valid Git worktree.

- [x] **Step 1: Add failing Python runner tests.** Patch the command executor, invoke the orchestration functions, and assert the fast lane contains repository checks, Python tests, Vitest, and production build while the complete lane additionally contains Playwright. The tests must fail because the current runner never schedules frontend commands.
- [x] **Step 2: Run `py -3 -m unittest tests.test_run -v` and observe the missing-command failures.**
- [x] **Step 3: Implement explicit command builders and lanes.** Keep `--apply` limited to mechanical regeneration. Make `precommit --check` run repo/skills/mesh/link checks, Python tests, `npm test -- --run`, and `npm run build`; make `ci --check` call that lane and then `npm run test:e2e`. Preserve fail-fast exit codes and verbose command printing.
- [x] **Step 4: Remove the stale backend architecture.** Delete the solution, server, and server tests; remove the unused ASP.NET web server from Playwright; rewrite live README and Devin routing surfaces to describe repository-owned client content and static Pages deployment. Preserve historical completed specs and plans as records.
- [x] **Step 5: Point the tracked hook and hosted CI at the runner.** The hook invokes `precommit --check`; CI installs Node, client dependencies, and Chromium once, then runs `python3 tools/run.py ci --check`. Remove .NET setup and duplicate hand-maintained command lists.
- [x] **Step 6: Run runner tests, `precommit --check`, and `ci --check`; mark Task 2 complete and commit `build: make canonical validation prove the product`.**

### Task 3: Objective portfolio contracts and build budgets

**Files:**
- Create: `tools/portfolio_quality.py`
- Create: `tools/check_portfolio_quality.py`
- Create: `tests/test_portfolio_quality.py`
- Create: `src/client/scripts/check-build-budget.mjs`
- Create: `src/client/scripts/check-build-budget.test.ts`
- Create: `src/client/src/features/home/featureCatalog.ts`
- Create: `src/client/src/features/home/featureCatalog.test.ts`
- Modify: `src/client/src/pages/HomePage.tsx`
- Modify: `src/client/package.json`
- Modify: `tools/run.py`
- Modify: `docs/asset-custody.md`

**Interfaces:**
- Consumes: `content-manifest.json`, authored Markdown, `public/` assets, build `dist/`, and the homepage feature catalogue.
- Produces: `validate_portfolio(root: Path) -> list[Finding]`, a CLI returning non-zero for findings, `checkBuildBudget(distRoot, limits)`, and `homeFeatures` as the single typed feature pool.

- [ ] **Step 1: Add failing Python contract tests with temporary fixtures.** Independently prove detection of duplicate slugs, invalid kinds/statuses/dates/reading minutes, missing content files, missing/unknown related slugs, unsafe `mailto:`/`tel:`/personal-address literals, unrecorded public assets, and images over 409600 bytes. Include clean fixtures that return no findings.
- [ ] **Step 2: Run `py -3 -m unittest tests.test_portfolio_quality -v` and observe import failure for the missing validator.**
- [ ] **Step 3: Implement the validator and thin CLI.** Scope privacy scanning to authored production surfaces, use explicit allowlists for documented public URLs, report every finding with a relative path, and keep parsing logic importable for tests.
- [ ] **Step 4: Add failing build-budget tests.** Given a temporary Vite manifest/assets directory, prove the checker rejects an initial JS entry over 358400 bytes or CSS over 40960 bytes and ignores lazy chunks. Run the scoped Vitest file and observe failure for the missing checker.
- [ ] **Step 5: Implement and wire the build-budget checker.** Enable Vite's build manifest, call the checker at the end of `npm run build`, and print measured entry sizes plus budgets.
- [ ] **Step 6: Add a failing typed catalogue test.** Assert unique slugs, every slug resolves through the manifest, and exactly one feature has `visual: 'patch'`. Extract the existing homepage pool to `featureCatalog.ts`, then make the test green without snapshotting its exact copy or order.
- [ ] **Step 7: Add the portfolio validator to both runner lanes, update custody records where required, run all scoped tests and `npm run build`, mark Task 3 complete, and commit `test: enforce portfolio content and budget contracts`.**

### Task 4: Deterministic fonts, accessibility, and visual baselines

**Files:**
- Create: `src/client/e2e/accessibility.spec.ts`
- Create: `src/client/e2e/visual-regression.spec.ts`
- Create: `src/client/e2e/visual-regression.spec.ts-snapshots/*`
- Modify: `src/client/package.json`
- Modify: `src/client/package-lock.json`
- Modify: `src/client/index.html`
- Modify: `src/client/src/main.tsx`
- Modify: `src/client/playwright.config.ts`
- Modify: `docs/asset-custody.md`
- Modify: `.agents/runbooks/testing.md`

**Interfaces:**
- Consumes: stable homepage, writing index, representative article, project, fairytale, About, 404, and reduced-motion routes.
- Produces: self-hosted Fraunces, Source Serif 4, and Fira Code; automated axe checks; narrow screenshot baselines at desktop and mobile.

- [ ] **Step 1: Verify and install the Fontsource packages and `@axe-core/playwright`.** Record package versions and licenses; remove the Google Fonts network links and unused `jest-axe` packages. Import only the weights/styles used by the design and keep the existing fallback stacks.
- [ ] **Step 2: Prove font determinism.** Build, open the production preview with network access disabled, and assert `document.fonts.check()` succeeds for all three families. The check must fail before local font imports and pass afterward.
- [ ] **Step 3: Add axe coverage.** Run axe on the golden routes at desktop and mobile, disable no rules globally, and assert zero serious or critical violations plus zero document-title/html-lang failures. Fix product defects rather than excluding components.
- [ ] **Step 4: Add stable screenshot coverage.** Seed `Math.random` before navigation, disable animations through Playwright, wait for `document.fonts.ready`, and snapshot only the homepage masthead/feature deck, writing index lead, About professional panel, and a representative mobile article header. Use a platform-neutral snapshot path and commit the approved images.
- [ ] **Step 5: Run the font, axe, and screenshot tests twice to prove stability; run the full client suite, mark Task 4 complete, and commit `test: add accessible visual baselines`.**

### Task 5: One gated deployment and public-route smoke proof

**Files:**
- Create: `tools/check_public_routes.py`
- Create: `tests/test_public_routes.py`
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/deploy.yml`
- Modify: `.agents/runbooks/pr.md`
- Modify: `.agents/runbooks/testing.md`

**Interfaces:**
- Consumes: the content manifest, built Pages artifact, and deployed origin.
- Produces: `expected_public_routes(manifest) -> list[str]` and a CLI that verifies final HTTP 200, HTML content type, a nonempty title, and route-correct canonical URL for every public route.

- [ ] **Step 1: Add failing route-smoke tests.** Use a local HTTP fixture to prove all manifest-derived routes plus `/`, `/about`, `/projects`, `/writing`, `/fairytales`, and an unknown 404 fallback are requested; reject a GitHub 404 body masquerading as HTML, wrong canonical, redirect loop, or non-200 known route.
- [ ] **Step 2: Run `py -3 -m unittest tests.test_public_routes -v` and observe import failure for the missing checker.**
- [ ] **Step 3: Implement the route checker.** Accept `--origin`, `--manifest`, and retry options, report each failing URL, retry only transient network/5xx failures, and never treat the SPA fallback as proof for a known route.
- [ ] **Step 4: Make CI the artifact owner.** On pull requests and pushes, install dependencies once, run the canonical complete gate, upload Playwright reports on failure, and upload the built Pages artifact only after validation. Make deployment download/use that validated artifact rather than rebuilding with a weaker command list.
- [ ] **Step 5: Add post-deploy smoke.** After `actions/deploy-pages`, run the checker against `https://harleybartles.github.io/portfolio`; fail the workflow if any known direct route lacks route-correct HTML.
- [ ] **Step 6: Document local versus hosted proof, run scoped Python tests plus canonical CI, mark Task 5 complete, and commit `ci: gate deployment and smoke public routes`.**

### Task 6: Review, publication, and protected main

**Files:**
- Move: `.agents/plans/2026-08-21-portfolio-quality-system.md` to `.agents/plans/completed/2026-08-21-portfolio-quality-system.md` after implementation and review are complete.
- Regenerate: affected `INDEX.md` files through `py -3 tools/run.py mesh --apply`.

**Interfaces:**
- Consumes: the complete implementation, GitHub check runs, Pages deployment, and repository settings.
- Produces: merged PR publication proof, verified public-route proof, and main-branch protection requiring the canonical CI context.

- [ ] **Step 1: Inspect the complete diff against every Global Constraint and the design policy.** Verify no copied marketplace sources, generated caches, private addresses, oversized media, or unrelated refactors are present.
- [ ] **Step 2: Run the visual review at 1440, 768, 390, and 320 CSS pixels, keyboard-only, reduced motion, and 200% zoom.** Record screenshots in the PR; do not treat screenshot equality as the only design review.
- [ ] **Step 3: Run fresh full verification on the staged tree.** Execute `py -3 tools/run.py ci --apply`, stage all changes, then `py -3 tools/run.py ci --check --verbose`; review `git diff --cached --check` and the staged file list.
- [ ] **Step 4: Request code review, resolve findings, archive this plan, regenerate the mesh, re-stage, and rerun the canonical gate.** Commit the closeout without bypassing the pre-commit hook.
- [ ] **Step 5: Push the exact branch head, open a PR using the evidence template, and verify the remote head SHA, mergeability, and required CI checks.** Merge only after checks are green and review has no unresolved material finding.
- [ ] **Step 6: Configure and verify `main` protection.** Require pull requests and the actual canonical CI check name observed on the merged workflow; block force pushes and branch deletion. Do not invent a check context before GitHub reports it.
- [ ] **Step 7: Verify `origin/main`, the Pages deployment, and the post-deploy smoke job at the merged SHA.** Record the PR URL, full SHA, workflow URLs, protected-branch settings, clean local tree, and any external blocker.

## Plan self-review

- Dependency order is coherent: doctrine guides the implementation; the runner owns later checks; validators precede their CI integration; deterministic fonts precede visual snapshots; route checks precede post-deploy use.
- Every behavior-changing task contains an explicit red/green cycle. Human prose and GitHub settings are reviewed through reachability, workflow evidence, and live API state rather than brittle source-text assertions.
- The canonical CI gate is never intentionally run against an un-staged temporary implementation state at a commit boundary.
- The plan preserves redesign freedom by testing outcomes and budgets, not exact copy, DOM classes, component boundaries, or the current color values.
- The stale backend, incomplete canonical runner, privacy/asset/budget gaps, remote-font nondeterminism, duplicate CI command lists, and missing post-deploy proof all have named owners.
- No task consumes a later task's output and no implementation placeholder remains.

**Plan-readiness: 9.3/10.**

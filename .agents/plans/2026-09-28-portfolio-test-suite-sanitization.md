# Portfolio Test Suite Sanitation Implementation Plan

> Execute this plan inline with the `executing-plans` skill, task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Portfolio test suite a focused set of checks that fail for meaningful regressions and remain valid through legitimate implementation and editorial changes.

**Architecture:** Expose repository validation, Python unit tests, Vitest, and Playwright as named suites with separate commands, results, and wall times. Compose those suites in the tracked hook and hosted CI without a mixed test command. Keep command dispatch in `tools/`; put substantive validation rules with test machinery, split by domain. Assign each observable invariant one primary owner at the cheapest layer that proves it. Retire assertions that only repeat fixtures, inspect source spelling, freeze completed migrations, or duplicate a stronger owner. Split the largest test files by domain and visitor journey while preserving their useful failure coverage.

**Tech Stack:** Python `unittest`, React, TypeScript, Vitest, Playwright, Vite, tracked Git commit hook.

**Spec:** `.agents/doctrine/validation-policy.md`, especially `Test ownership`; `.agents/playbooks/testing.md`; the user-approved test audit in this task.

**Execution Strategy:** Native inline execution with `executing-plans`. Establish suite commands and gate composition first, then clean up repository workflow, validation, asset, Python, and browser coverage in the order below so ownership decisions precede file moves. Complete one fresh whole-branch review after implementation.

## Global Constraints

- Keep product behavior, content, asset custody, accessibility, public routes, budgets, and visual baselines unchanged. Changes to test command routing, validation-module ownership, the tracked hook, hosted CI, and their operating guidance are in scope because the suites must become independent execution units.
- A retained test must name a plausible regression, observe an outcome at its owning layer, and survive a legitimate redesign that preserves that outcome.
- Do not replace deleted source-text assertions with differently worded source-text assertions or broad snapshots.
- Do not add a bug-fix regression test without a genuine behavior-coverage gap. Do not add tests merely to maintain test count.
- Preserve existing meaningful rejection cases for generated assets, publication, privacy, routes, and the tracked hook. A test that reads an artifact to validate its output may be valuable; reading implementation source to pin its spelling is not.
- Preserve Windows and Linux behavior coverage. Keep OS-specific visual baselines on their current supported runner.
- Every Playwright case must name at least one user-visible invariant and prove it through an integrated visitor journey. Treat browser time as a finite budget: map setup, navigation, and browser lifecycle cost to those invariants, and combine redundant checks into coherent journeys when that preserves clear failure diagnosis. Move browser-level unit checks to a cheaper owner or retire them when they have no independent user contract.
- Use focused checks while editing. Stage and commit each coherent slice normally so the tracked hook runs the complete gate once on the intended staged tree. After suite separation, neither the hook nor hosted CI invokes `ci --check` as a mixed test command. Keep `ci --apply` for mechanical regeneration; any retained aggregate check is a manual convenience only.
- Keep suite execution sequential in this slice. Do not add parallel jobs, workers, sharding, or scheduling. Separate commands, results, and wall times will make a later parallelism decision evidence-based.
- Regenerate generated `INDEX.md` navigation with `py -3 tools/run.py index-mesh --apply` after adding, moving, or removing test files. Never hand-edit generated indexes.
- Mark this plan `completed-awaiting-retirement` only when the implementation and review are complete; retain it through the completing PR and retire it in the next substantive slice.

## Ownership decisions

| Invariant | Primary owner | Distinct secondary owner, if needed |
| --- | --- | --- |
| Homepage daily selection and GMT wrap | `homepageEdition.test.ts` pure date rule | `e2e/home/site.spec.ts` rendered change across a day and navigation |
| Homepage section links and semantics | `HomepageSections.test.tsx` for component choices | Browser only for visitor navigation and viewport behavior |
| Editorial route composition | One route/component test for metadata, disclosure, and authored navigation | Browser for loading, keyboard, rendered layout, and failed media |
| Asset source and derivative custody | Processor/validator behavior tests with mismatched fixtures | Build or generated-artifact check for actual committed output |
| Hook staged-tree safety | Temporary Git repository behavior in `test_precommit_hook.py` | Hosted CI confirms its workflow integration |
| Portfolio content and evidence rules | Python validator tests grouped by content/evidence domain | Generated/public-route checks only for their own output |
| Repository content, custody, privacy, and link validation | Named repository-validation suite, with substantive rules under `tests/validation/` | Python unit tests exercise validator rules against controlled valid and invalid fixtures |
| Responsive geometry | Focused Playwright layout check at relevant bounds | Visual snapshot only for approved art direction |

## Review Focus

- **Suite boundary is merely cosmetic:** Tasks 1 and 2 prove the hook and hosted workflow invoke independent repository-validation, Python, Vitest, and Playwright commands. A single `ci --check` step that internally runs all tests does not meet this plan.
- **Gate behavior regresses during separation:** Task 1 retains staged-tree safety, independent failure collection, and build-dependent Playwright skipping. Task 2 preserves hosted parity and the production artifact.
- **False green after removing source checks:** Task 4 retains hook behavior tests and Task 5 retains invalid custody/receipt cases. Prove those tests still fail on their controlled bad inputs.
- **Validation silently disappears during relocation:** Task 6 inventories every substantive checker in `tools/`, keeps real-repository validation in the local and hosted gate, and confirms bad fixtures still produce findings.
- **Lost Python discovery after splitting the fixture:** Task 7 runs each new module through the repository's Python suite command and checks that formerly distinct rejection cases are still discovered.
- **Browser coverage lost in file moves:** Tasks 8 and 9 use Playwright's file listing and focused runs to confirm every retained journey is discovered under its new path.
- **Browser cost reduced by deleting useful behavior:** Tasks 8 and 9 require an invariant-to-journey map, remove browser unit tests, and merge only repeated setup or overlapping assertions where one integrated journey still demonstrates each distinct invariant.
- **Duplicate coverage reintroduced in a different file:** Task 10 reviews the final ownership table and removes repeated exact-copy and structural assertions that do not catch a distinct failure.

## Pre-sanitation wall-clock baseline

Measured on 28 September 2026 in `Z:/_agent-worktrees/portfolio/codex/test-suite-sanitization-plan`, based on Portfolio `ac3003fd0cd162519069ee7ff40bfea4c00c8165` and marketplace submodule `1d38a0f2ff6af93f7fa8a582f92f032a8fe49d2d`. The staged changes were this plan and its generated index only. Host: Windows 11 Enterprise 10.0.26200, Node 24.15.0, npm 11.12.1, Python 3.13.13. Dependencies and Chromium were already installed. Times below are one warm local sample, measured with PowerShell `Stopwatch` around each entire command; they exclude checkout and dependency installation.

| Hosted or hook equivalent | Exact local command from repository root | Wall clock | Result |
| --- | --- | ---: | --- |
| Tracked-hook quality check phase, also used by the hosted Ubuntu quality job | `py -3 tools/run.py ci --check --diagnostics` | **215.609 s** (3m 35.609s) | Exit 0; 91 Python tests, 314 Vitest tests in 109 files, production build, and 178 Playwright journeys passed |
| Separate hosted Windows visual-regression job | `npm.cmd --prefix src/client run test:e2e:visual` | **41.417 s** | Exit 0; production build and 16 visual Playwright tests passed; Playwright reported 27.9 s for the test portion |
| Post-deploy hosted smoke job, using the GitHub Pages site's current reported URL | `py -3 tools/check_public_routes.py --origin https://harleybartles.com/` | **14.461 s** | Exit 0; 29 public routes, one preview route, and the custom 404 passed |

The aggregate quality log also reports **23.537 s for Python `unittest`**, **32.83 s for Vitest**, and **about 2.3 minutes for Playwright**. Those are framework-reported portions of the mixed command, not independent suite wall-clock measurements; its other checks and build account for additional time. The 16 visual cases are also included in the 178-journey quality run on this Windows host. Do not add the three wall times and call the sum a hosted pipeline duration: hosted quality and visual jobs run separately, and the smoke job follows deployment. The direct quality check measures the hook's test/check phase, not its preceding `ci --apply`, staged-snapshot handling, hosted setup, or deployment. The smoke result measures the live deployed site; the latest completed hosted `main` run visible during measurement was for `9d0864d`, so that result does not prove deployment of this worktree's `ac3003f` base.

For the post-sanitation comparison, time each new named suite command separately on the same warm host, including repository validation, plus the non-test gate, build, visual job, and public-route smoke. Record command-level elapsed time, test count or validated-contract count, and result; compare the composed local gate with the historical 215.609 s aggregate while acknowledging that a direct per-suite before/after wall-clock comparison is unavailable. Retain the full hook wall time as a separate measure. Baseline logs are under `Z:/_agent-scratch/portfolio/codex-test-suite-sanitization-plan/` as `baseline-quality-gate.log`, `baseline-visual-regression.log`, and `baseline-public-routes.log`.

### First-class command timings before test sanitation

Measured on the same Windows host on 28 September 2026 after exposing each command in Task 1 but before deleting or splitting the existing tests. Each wall time covers one standalone `py -3 tools/run.py <target> --check` command, including command-runner startup. This is the separated, pre-cleanup comparison point; use the table above as the historical mixed-gate baseline.

| Suite/phase | Target command | Wall clock | Result |
| --- | --- | ---: | --- |
| Mechanical and repository checks | `py -3 tools/run.py repo-checks --check` | **5.028 s** | Exit 0 |
| Repository validation | `py -3 tools/run.py repository-validation --check` | **0.565 s** | Exit 0; link and portfolio validators passed |
| Python | `py -3 tools/run.py python-tests --check` | **27.385 s** | Exit 0; 92 tests passed |
| Vitest | `py -3 tools/run.py vitest-tests --check` | **31.295 s** | Exit 0; 314 tests in 109 files passed |
| Production build | `py -3 tools/run.py production-build --check` | **12.666 s** | Exit 0; built output and generated PDF passed their checks |
| Playwright | `py -3 tools/run.py playwright-tests --check` | **142.507 s** | Exit 0; 178 journeys passed with one worker |

These standalone runs total 219.446 s and are not the wall time of the tracked hook, which also applies and checks generated surfaces and starts one process per declared phase. The Playwright result is a compaction signal for journey review, not permission to drop protected behavior.

### Post-sanitation standalone timings

Measured on 28 September 2026 on the same warm Windows host, after the final About/Home, command-runner, and route-chunk ownership sweep. Each local suite uses the named command that the hook and hosted quality job invoke. The browser suite and visual job each use one Chromium worker; the visual job includes its build. The public-route command targets the current live site, not this unmerged branch.

| Suite/phase | Exact command | Wall clock | Result |
| --- | --- | ---: | --- |
| Mechanical and repository checks | `py -3 tools/run.py repo-checks --check` | **5.123 s** | Exit 0 |
| Repository validation | `py -3 tools/run.py repository-validation --check` | **0.471 s** | Exit 0; validators passed |
| Python | `py -3 tools/run.py python-tests --check` | **28.383 s** | Exit 0; 81 tests passed |
| Vitest | `py -3 tools/run.py vitest-tests --check` | **30.488 s** | Exit 0; 294 tests in 108 files passed |
| Production build | `py -3 tools/run.py production-build --check` | **13.010 s** | Exit 0; generated PDF and 15 route-owned lazy entries passed |
| Playwright journeys | `py -3 tools/run.py playwright-tests --check` | **95.918 s** | Exit 0; 127 journeys passed with one worker |
| Hosted Windows visual job | `npm.cmd --prefix src/client run test:e2e:visual` | **41.393 s** | Exit 0; 15 visual tests passed, Playwright reported 27.6 s |
| Post-deploy public-route smoke | `py -3 -m tests.validation.deployed_routes --origin https://harleybartles.com/` | **16.713 s** | Exit 0; 29 public routes, one preview route, and custom 404 passed |

The first six independent local phases total **173.393 s**, down **46.053 s (21.0%)** from the 219.446 s separated pre-cleanup total. The Playwright phase alone fell by **46.589 s (32.7%)** while retaining named visitor journeys and reducing the discovered suite from 178 to 127 tests. Moving route chunk inspection from Chromium to the build artifact check preserved the lazy-loading contract while reducing browser contexts. The separate visual job stayed near its 41.417 s baseline and retains all 15 visual journeys; its browser portion was 27.6 s versus 27.9 s before sanitation. These are standalone phase totals, not the composed hook or hosted pipeline duration. The live smoke time is network-sensitive and does not measure this branch's deployment.

---

### Task 1: Make test suites independent commands in the local gate

**Files:**
- Modify: `tools/run.py`
- Modify: `.agents/contracts/repo-standards-commands.json`
- Modify: `githooks/pre-commit`
- Modify: `tests/test_run.py`
- Modify: `tests/test_precommit_hook.py`
- Inspect: `.agents/doctrine/validation-policy.md`, `.agents/playbooks/testing.md`

**Interfaces:** Keep `ci --apply` as the declared mechanical regeneration command. Introduce check-only command targets for mechanical/repository-standard checks, repository validation, Python `unittest`, Vitest, production build, and Playwright, each callable on its own and with its own exit status. The declaration gives the hook named commands for those units. The hook composes them against its pinned staged tree, without delegating test or validation work to `ci --check`. Playwright consumes the preceding successful build and keeps its `--skip-build` behavior.

- [x] **Step 1: Establish command boundaries.** Extract the current `_check_steps` categories into named `tools/run.py` targets: mechanical/repository-standard checks (standards, skills, mesh, generated content/routes), repository validation (link hygiene and portfolio content/custody/privacy), Python unit tests, Vitest tests, production build, and Playwright journeys. Keep the exact existing test discovery and retry arguments at first. Make the names and command syntax stable and documented in the command declaration. Keep `ci --check` only as an optional manual aggregate if callers still need it; remove it from the hook's declared `check` route.
- [x] **Step 2: Compose the local hook.** After `ci --apply` and generated-path staging, run the declared mechanical check, repository-validation, Python, Vitest, build, and Playwright commands separately. Time and label each command; collect all independent failures before exiting nonzero. Skip Playwright only when the build fails, and report that skip. Preserve the existing immediate safety exits, staged-snapshot restoration, generated-path allow-list, and hosted tree-equivalence check. Do not run validation or test commands twice through an aggregate target.
- [x] **Step 3: Prove behavior rather than spelling.** In `test_run.py`, exercise each target's actual dispatch and failure status. In `test_precommit_hook.py`, use temporary Git repositories and controlled fake commands to prove per-suite invocation, independent failure collection, build-dependent skip, and the staged-tree boundary. Keep existing submodule and unstaged-patch scenarios. Do not assert source snippets or a hard-coded command list as the test's only outcome.
- [x] **Step 4: Check transition and commit.** Run focused `test_run.py` and `test_precommit_hook.py` discovery, then each new suite command once to prove it is independently runnable. Record each command's wall time and count separately. Stage the runner, declaration, hook, tests, and any necessary guidance change together; commit through the new tracked hook. Compare its result with the baseline without treating the framework sub-times as standalone command measurements.

### Task 2: Give hosted CI separate sequential suite steps

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `githooks/pre-commit` if hosted mode needs a separate phase selection
- Modify: `.agents/contracts/repo-standards-commands.json` if the invocation contract changes
- Modify: `AGENTS.md`
- Modify: `.agents/playbooks/testing.md`
- Modify: `.agents/doctrine/validation-policy.md` if its gate contract changes
- Modify: `.agents/runbooks/pr.md` and other authored guidance that still directs hosted CI through the mixed command
- Modify or delete after behavioral review: `tests/test_visual_ci_contract.py`

**Interfaces:** Hosted `quality` retains the committed-tree hook parity check for staged-tree reconstruction, regeneration, and repository/mechanical checks. It then runs repository validation, Python, Vitest, production build, and Playwright as separately named sequential steps using the named `tools/run.py` targets also declared to the local hook. Hosted parity mode skips suites owned by those explicit workflow steps. The existing Windows visual job and post-deploy route smoke remain distinct.

- [x] **Step 1: Separate the hosted phases.** Make `Validate tracked commit gate` run the hook's staged-snapshot, regeneration, and mechanical checks, then have the `quality` job invoke repository validation, Python, Vitest, production build, and Playwright as individual named-target steps. The production build precedes Playwright so build failure blocks only the dependent browser suite; preserve the Pages artifact from that build. Keep all suite steps sequential in this job. Do not introduce new parallel jobs, test workers, or sharding.
- [x] **Step 2: Preserve failure visibility.** Independent suite steps report their own result even if another independent suite fails; Playwright requires successful build. Preserve Playwright report upload on failure. Deployment and smoke remain gated by successful required jobs. Hosted step duration and status are visible directly in Actions.
- [x] **Step 3: Update the operating contract.** AGENTS, validation/testing policy, PR and implementation guidance now describe the local composition and hosted separate steps. `ci --apply` remains mechanical regeneration; `ci --check` is optional manual aggregate. Removed the YAML-string-only `test_visual_ci_contract.py`; no behavior assertion in it had an independent outcome owner.
- [x] **Step 4: Verify parity and commit.** Focused hook and runner tests pass (28 tests); PyYAML parses the workflow and confirmed the six named quality steps are ordered as intended; `bash -n` and repository standards validation pass. Commit through the hook. Hosted Actions verification remains pending until the branch is published; it is not claimed as passed here.

### Task 3: Establish the ownership inventory and remove indisputable residue

**Files:**
- Modify: `src/client/src/features/home/homepageEdition.test.ts`
- Delete: `tests/test_phase6_closeout.py`
- Delete: `src/client/src/pages/usual-specialists/architecture.test.ts`
- Inspect: all 134 current `test_*.py`, `*.test.ts(x)`, and `*.spec.ts` files under `tests/` and `src/client/` (the inventory was captured before this task's two planned deletions)

**Interfaces:** Consumes the ownership rules above. Produces a per-file retain, narrow, split, or retire decision in the working plan during execution; later tasks use those decisions. No product interface changes.

- [x] **Step 1: Record the baseline inventory.** Recorded 134 files and 9,888 lines in the canonical external scratch inventory, with each file's first declared observable cases, plausible failure, size, and plan-scoped disposition. The full map remains scratch evidence, not a repository test ledger.
- [x] **Step 2: Remove the literal self-check.** Removed the homepage fixture that compared fields to the same literals. GMT edition selection remains in `homepageEdition.test.ts`; the alternate Tournament presentation and CTA are rendered in `HomepageSections.test.tsx`.
- [x] **Step 3: Retire completed-slice sentinels.** Deleted `test_phase6_closeout.py` (historic PR/phase and command spelling) and `architecture.test.ts` (empty-path and filename/source-organization checks). The incremental route-slice and no-React-in-styles-module guidance remains in `.agents/doctrine/coding-discipline.md`.
- [x] **Step 4: Check the affected owners.** Focused Vitest passed: 2 files, 13 tests. The removed cases protect no ongoing contract; the rendered Tournament selection remains owned by `HomepageSections.test.tsx`.
- [x] **Step 5: Commit this coherent removal with the normal hook.** Refreshed indexes and committed as `874835d`; the full hook passed. It discovered 85 Python tests and 311 Vitest tests. Playwright ran 178 journeys in 142.347s: 177 passed on first attempt and one desktop accessibility journey was retry-rescued after Chromium `ERR_NO_BUFFER_SPACE`; investigate as nondeterminism evidence during the browser audit.

### Task 4: Give repository workflow checks behavioral owners

**Files:**
- Modify: `tests/test_precommit_hook.py`
- Inspect: `.github/workflows/ci.yml`, `githooks/pre-commit`, `.agents/contracts/repo-standards-commands.json`, `src/client/playwright.config.ts`

**Interfaces:** Consumes Task 3's inventory and Tasks 1-2's separated gate. Produces a hook suite that proves staged content, submodule state, worktree resolution, apply/check and suite argument routing, and failure recovery through temporary repositories.

- [x] **Step 1: Map each existing workflow assertion to a failure.** Kept the temporary-Git commit cases for suite invocation/failure collection, linked-worktree resolution, submodule mismatch, staged content, and patch recovery. The two remaining source/data checks duplicated `repo-standards` shape validation; earlier command/guidance and YAML checks are already retired.
- [x] **Step 2: Remove source-signage and command-spelling assertions.** Removed the tracked-hook file/mode mirror and generated-path list mirror. The repository standards checker validates hook custody/executable shape; live generated-surface checks validate the projections. No YAML parser or prose scan replaces the removed assertions.
- [x] **Step 3: Keep the real authority boundary.** Retained all temporary-repository behavior cases for dirty/mismatched submodules, apply-only shared-checkout routing, staged snapshot validation, linked-worktree execution, independent failure collection, build-dependent skip, and recovery preservation.
- [x] **Step 4: Run focused Python discovery.** `py -3 -m unittest discover -s tests -p 'test_precommit_hook.py' -v` passed all 7 behavioral cases on Windows.
- [x] **Step 5: Commit through the tracked hook.** Committed as `09bb6d9`; the full hook passed (83 Python, 311 Vitest, build, and 178 Playwright journeys in 142.951s). No static workflow assertion remains in this suite.

### Task 5: Replace data pinning with custody and output evidence

**Files:**
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Modify: `src/client/scripts/process-patch-assets.test.ts`
- Delete: `src/client/scripts/process-learning-lab-assets.test.ts`
- Modify: `src/client/src/features/case-study/learning-lab/learningLabEvidence.test.ts`
- Modify: `src/client/src/styles/portfolioTheme.test.ts`
- Inspect: `src/client/scripts/validate-usual-specialists-provenance.test.ts`, `src/client/scripts/css-token-references.test.ts`, the corresponding processors and committed receipts

**Interfaces:** Consumes Task 3's inventory. Produces one test owner for each source identity, receipt integrity, output format/dimensions, provenance rejection, and theme-provider behavior.

- [x] **Step 1: Retire the implementation-text mutation.** Removed the renderer source-name assertion, exact `.resize(...)` replacement, and duplicated live receipt hash check. Kept controlled source identity, format/dimension, receipt membership, and validation short-circuit behavior in `process-usual-specialists-assets.test.ts`; `media:usual-specialists:check` remains the owner for committed output/hash/renderer receipt consistency.
- [x] **Step 2: Audit exported-constant mirrors.** Removed the Patch derivative definition mirror, Learning Lab asset test file (its assertions mirrored exported constants or the check target), fixed Learning Lab source/date/course/title values, and theme token mirror. Kept Patch builder output against controlled dimensions, custody rejection, Learning Lab evidence internal consistency, and a rendered theme-provider integration assertion. No date/revision snapshot is treated as immutable by this test.
- [x] **Step 3: Preserve objective asset rules.** Processor tests still reject wrong SHA, missing/extra/stale receipt entries, bad dimensions/format, untracked or untraced sources, and unaccepted generated inputs. `media:learning-lab:check` and `media:usual-specialists:check` compare actual source/output identity and metadata in build. Kept `css-token-references.test.ts`: build does not detect undefined CSS custom-property references, so this is an independent static validation rule.
- [x] **Step 4: Run focused Vitest.** The modified processor, provenance, Learning Lab evidence, theme provider, and CSS token validator passed (6 files, 26 tests). Both `media:usual-specialists:check` and `media:learning-lab:check` pass against the committed receipts and output files.
- [ ] **Step 5: Commit through the tracked hook.** The commit message and review notes identify which safety checks remain and which constant mirrors disappeared.

### Task 6: Move substantive validators out of `tools/` and give them suite ownership

**Files:**
- Delete after migrating callers: `tools/portfolio_quality.py` (1,219 physical lines)
- Delete: `tools/check_portfolio_quality.py` (33-line CLI wrapper called by `tools/run.py`)
- Move substantive rules from: `tools/check_link_hygiene.py` (218 lines)
- Move substantive rules from: `tools/check_public_routes.py` (293 lines)
- Create: `tests/validation/` package with separate portfolio content/evidence, privacy/assets, link-hygiene, and deployed-route modules, plus one repository-validation suite entry point
- Modify: `tools/run.py`, `tests/test_portfolio_quality*.py`, `tests/test_link_hygiene.py`, `tests/test_public_routes.py`, `.github/workflows/ci.yml`, and authored guidance for changed entry points
- Inspect: all other `tools/*.py` modules for validation or test behavior hidden behind a command name

**Interfaces:** `tools/run.py` remains the command bus. Its named repository-validation target runs substantive local content, custody, privacy, asset, and link rules against the repository and returns nonzero for findings. The hosted post-deploy smoke remains a separate suite with its own `--origin` input. Python unit tests import the moved validators to prove controlled valid/invalid cases. Remove the redundant `check_portfolio_quality.py` wrapper rather than relocating it: the command bus invokes the validation suite entry point directly. A `--check` mode that compares a generator's own output can remain with that generator; it is not automatically a misplaced test module.

- [x] **Step 1: Inventory test machinery in `tools/`.** Classified all five remaining Python modules in the external scratch `tools-validator-inventory.md`, including callers and observable contracts. Generators with output checks remain at their producer boundary; command bus, shared checkout helper, and shared production route data remain in `tools/`.
- [x] **Step 2: Decompose the portfolio validator by contract.** Split manifest/editorial rules, Learning Lab, Marketplace, Wild Bunch, Patch, privacy, public voice, asset custody, shared findings, and composition into small `tests/validation/` modules. Removed code-side equality pins for live Learning Lab inventory and run URLs, Wild Bunch observation date/status/capture values, Patch project-card inventory/order/prose/custody descriptions, and derivative revision duplication; retained evidence structure, claim safety, canonical repository identity, date validity/freshness, licenses, credentials/private coordinates, pinned source URLs, image safety, and receipt comparisons. The Wild Bunch PostgreSQL exact-sentence assertion is retired as source-change detection. `ExternalLink.test.tsx` already asserts the rendered new-tab contract, so link validation no longer duplicates it by scanning source fragments.
- [x] **Step 3: Relocate the other substantive checkers.** Moved link-hygiene rules to `tests/validation/link_hygiene.py` and deployed route HTTP/parser logic to `tests/validation/deployed_routes.py`. The repository suite runs against the checked-out tree, while hosted post-deploy smoke remains a separate `--origin` command. Updated imports and the PR smoke invocation. Removed `tools/check_portfolio_quality.py`; `tools/run.py` dispatches to the repository suite once.
- [x] **Step 4: Prove the boundary.** Real repository validation passes with 0 findings and 0 warnings before and after the move. Focused validator/link/deployed-route fixtures pass 49 tests, the full named Python suite passes 81 tests, generated indexes are current, and `python -m tests.validation.deployed_routes --help` confirms the standalone origin-based suite. The live deployed-route smoke exits 0 in 17.722 seconds. The tracked hook passed 81 Python tests, 301 Vitest tests, production build, and 178 Playwright journeys in 144.820 seconds; commit `cd293dc` records the relocation. Hook and hosted CI each run the local repository-validation suite once, while hosted post-deploy smoke remains a separate command.

### Task 7: Split the Python quality suite by its validation domains

**Files:**
- Split: `tests/test_portfolio_quality.py` (1,315 lines)
- Create: `tests/portfolio_quality_fixture.py` for the shared manifest/custody fixture and `PortfolioQualityCase`
- Create: `tests/test_portfolio_quality_content.py`
- Create: `tests/test_portfolio_quality_learning_lab.py`
- Create: `tests/test_portfolio_quality_marketplace.py`
- Create: `tests/test_portfolio_quality_wild_bunch.py`
- Create: `tests/test_portfolio_quality_patch.py`
- Create: `tests/test_portfolio_quality_assets.py`
- Inspect: the moved `tests/validation/` modules and `tools/run.py`

**Interfaces:** Each new module imports `PortfolioQualityCase` and `PortfolioFixture` from `portfolio_quality_fixture.py`. The base keeps the existing `validate(self, mutate=None, *, today=None)` method against the relocated validator package. Marketplace, Wild Bunch, Patch, and Learning Lab fixture writers move as local functions to their respective test modules; their call sites change from `fixture.write_*_evidence(...)` to the local `write_*_evidence(fixture, ...)`. The validator's public findings contract remains unchanged.

- [x] **Step 1: Move only shared fixture behavior.** Extracted generic fixture setup, manifest/custody operations, and validation into `tests/portfolio_quality_fixture.py`. Each domain class inherits `PortfolioQualityCase`; temporary fixture cleanup and injected dates remain.
- [x] **Step 2: Place evidence builders with their domains.** Marketplace, Wild Bunch, Patch, and Learning Lab fixture builders now live beside those domain tests; `use_learning_lab_content` lives with Learning Lab. Only common manifest/custody fixture behavior remains shared.
- [x] **Step 3: Move tests by contract.** Content/editorial, Learning Lab, Marketplace, Wild Bunch, Patch, and privacy/voice/custody/budget checks now have separate files. Each test method appears once; the previous monolith is deleted.
- [x] **Step 4: Prune within each domain.** Retained the distinct malformed evidence, public claim, private-coordinate, date, licensing, custody, receipt, and asset failure classes. Task 6 removed the duplicate snapshot equality cases; this split introduced no test-method deletions. Mutation labels and expected findings remain adjacent to their grouped cases. The former observation-date test name was clarified to say it rejects impossible dates.
- [x] **Step 5: Verify discovery and behavior.** Discovery passes all 39 domain cases; the prior committed monolith also had 39 methods, with one descriptive rename and no unaccounted deletion. The named Python suite passes all 81 tests. Per-test old/new names and domain ownership are in the external scratch `python-suite-domain-map.md`.
- [x] **Step 6: Delete the old monolith, regenerate indexes, and commit normally.** `1677611` split the domain files and shared fixture; its normal commit hook passed 81 Python tests, 301 Vitest tests, production build, and 178 Playwright journeys in 140.726 seconds. No replacement file became a cross-domain catch-all.

### Task 8: Split project browser journeys by project owner

**Files:**
- Split and delete: `src/client/e2e/project-story.spec.ts` (1,072 lines)
- Create: `src/client/e2e/projects/shared.spec.ts`
- Create: `src/client/e2e/projects/wild-bunch.spec.ts`
- Create: `src/client/e2e/projects/patch.spec.ts`
- Create: `src/client/e2e/projects/learning-lab.spec.ts`
- Create: `src/client/e2e/projects/marketplace.spec.ts`
- Inspect: `src/client/e2e/visual-regression.spec.ts`, `src/client/e2e/accessibility.spec.ts`, `src/client/e2e/home/wild-bunch.spec.ts`, `src/client/e2e/specialists/*.spec.ts`

**Interfaces:** Every retained Playwright journey names the user-visible invariant it protects. Shared browser helpers remain local to the owning spec unless two project specs truly need the same implementation. A project-local support module may export `expectNoHorizontalOverflow(page)` and keyboard traversal when multiple project journeys use the exact same behavior; do not use a general helper to hide distinct assertions. Treat the 2.3-minute baseline as a compaction signal: preserve worthwhile behavior with fewer independent browser contexts and repeated navigations.

- [x] **Step 1: Map cost to protected outcomes.** The original project file's 34 cases and overlapping owners are recorded in the external scratch `playwright-project-invariant-map.md`. Playwright uses one Chromium project and one worker, with a fresh test context per test. The old code-splitting case additionally opened nine pages; it now reuses its test page across the routes. Each survivor names a visitor or page-loading invariant; visual geometry is retired where an approved visual baseline owns it, and component-only semantics remain in Vitest.
- [x] **Step 2: Consolidate by visitor journey.** Moved the project cases into project-owned specs and shared route behavior into `projects/shared.spec.ts`; absorbed the Specialists canvas ceiling into its existing breakpoint journey. The project slice is eight browser tests in five files, down from 34 test contexts. Wild Bunch's pending visual, evidence links, image loading, responsive UUID, reduced-motion layout, and return navigation now form one journey. Patch, Learning Lab, and Marketplace retain loading, story, evidence, and responsive behavior in named journeys. Retired exact hashes/image dimensions, removed-content sentinels, internal figure source-order details already owned by Vitest, and caption/callout computed-style checks duplicated by component or visual tests.
- [x] **Step 3: Check coverage, cost, and discovery.** The project slice discovered eight final journeys. The focused command passed all eight; Playwright reported 9.6 seconds, and the full wrapper including its production build took 26.079 seconds. The earlier 10-journey draft exposed two locator/layout mistakes; both were corrected before the passing run. Full-suite before/after wall time remains recorded in final hook evidence, not inferred from this focused slice.
- [x] **Step 4: Delete the monolith, regenerate indexes, and commit normally.** Deleted `project-story.spec.ts`, regenerated `src/client/e2e/INDEX.md`, and committed the new project-owned journeys through the tracked hook.

### Task 9: Consolidate writing-route coverage and split the remaining browser file

**Files:**
- Split and delete: `src/client/e2e/writing-navigation.spec.ts` (450 lines)
- Create: `src/client/e2e/writing/discovery.spec.ts`
- Create: `src/client/e2e/writing/editorial-layout.spec.ts`
- Create: `src/client/e2e/writing/article-routes.spec.ts`
- Create: `src/client/e2e/fairytales.spec.ts` if the fairytale case remains distinct
- Narrow or split: `src/client/src/pages/ContentPage.test.tsx` (427 lines)
- Modify: `src/client/src/pages/WritingSurfaces.test.tsx`
- Inspect: `src/client/src/features/writing/*.test.tsx`, `src/client/e2e/accessibility.spec.ts`

**Interfaces:** The route-level React tests own shared article shell behavior, authored navigation selection, and deferred body loading. Playwright owns rendered navigation, keyboard/disclosure use, failed images, and genuine layout geometry. The build artifact check owns the route-specific lazy-loading boundary without launching Chromium. Keep test setup helpers near the tests that consume them.

- [x] **Step 1: Make an article-route coverage map.** For each article and the fairytale route, name the distinct failure exercised by the component and browser tests. Keep one representative shared-shell test plus article-specific cases only when the article has a unique behavior or media failure.
- [x] **Step 2: Reduce `ContentPage.test.tsx`.** Move a shared route-render helper into a small local support module only if more than one route test needs it. Remove long exact-copy assertions and repeated shell metadata checks. Keep stable loading, disclosure semantics, correct authored destinations, and unique figure/media behavior at their owning component or route test.
- [x] **Step 3: Split and compact integrated browser journeys.** Map each retained browser case to an invariant and visitor journey. Move writing discovery and route navigation to `discovery`/`article-routes`, shared aside and pull-quote behavior to `editorial-layout`, and fairytale transcript/imagery behavior to `fairytales`. Combine repeated navigation/setup when the same journey can assert multiple related outcomes. Move helper/component-only checks to their cheaper owner. Preserve narrow viewport and failed-media behavior only where they prove distinct rendered user outcomes.
- [x] **Step 4: Run focused checks.** From the repo root, run `npm.cmd --prefix src/client run test -- src/pages/ContentPage.test.tsx src/pages/WritingSurfaces.test.tsx src/features/writing`. From `src/client`, run `node node_modules/@playwright/test/cli.js test --list e2e/writing e2e/fairytales.spec.ts`. From the repo root, run `npm.cmd --prefix src/client run test:e2e -- e2e/writing e2e/fairytales.spec.ts`. Use `npm --prefix` on POSIX. Account for every removed journey by its surviving owner or explicit retirement rationale.
- [x] **Step 5: Regenerate indexes and commit normally.** No route file should continue to aggregate unrelated article copy inventories.

### Task 10: Final suite sweep, evidence, and plan completion

**Files:**
- Review: every remaining file matching `tests/test_*.py`, `src/client/**/*.test.ts(x)`, or `src/client/e2e/**/*.spec.ts`
- Modify: `.agents/plans/2026-09-28-portfolio-test-suite-sanitization.md` only for execution checkmarks, removal reasons, and the completion marker
- Regenerate: affected `INDEX.md` files through `py -3 tools/run.py index-mesh --apply`

**Interfaces:** Consumes all earlier task outcomes. Produces a suite with a named primary owner for every retained invariant, no unaccounted test-file move, and no product-source change.

- [x] **Step 1: Recheck the full file inventory.** Classify any test or validator not touched in Tasks 3-9 against the same four smells: tautology, source-change detection, completed implementation residue, and duplicated/TDD sprawl. Remove a remaining smell only when the contract has another owner or does not protect an ongoing invariant. Leave objective safety checks in place. The remaining large Python modules each own one cohesive contract: tracked-hook staged-tree safety, command-bus dispatch, and deployed-route verification. Split command-bus suite composition into `tests/test_run_suites.py`; keep the hook and deployed-route files intact because their cases share one fixture and one safety boundary.
- [x] **Step 2: Review the diff for contract loss.** Compare pre- and post-cleanup test names, not totals as a success metric. For each deleted case, record the surviving owner or why the assertion was worthless. Verify no product code, generated manifests, authored content, image assets, or visual baselines changed. The final About/Home sweep removes obsolete copy absences and SVG source spelling checks; component tests own static composition, while browser journeys retain route conversion, responsive readability, daily edition change/navigation, anchor landings, reduced motion, and shared frame alignment. The former Home, project, and writing chunk-request browser checks move to the production-build artifact check, with focused Vitest rejection cases. This protects route-specific lazy loading without browser sessions. The self-set CDP scale-factor assertion was tautological and protected no invariant; responsive layout remains asserted at phone, tablet, and desktop widths. **Ruling:** retain the refreshed marketplace gitlink and generated skill projection because repository instructions and the user's direct request require the submodule to track its latest `main`; verification confirmed both the submodule `HEAD` and `origin/main` at `bab1d5d7`, with installed-skill `--check` passing.
- [x] **Step 3: Run narrow proof for any final corrections.** Choose the affected named Vitest, Python, or Playwright suite command from the preceding tasks. Run `py -3 tools/run.py index-mesh --check` after regeneration. Stage and commit normally; the tracked hook owns the complete local gate. Final focused proofs passed: six About/Home journeys, five affected Home/project/writing journeys, three chunk-isolation Vitest cases, and 19 command-runner unit tests. The production build accepted all 15 route-owned lazy entries, all 83 generated indexes are current, and the marketplace projection check matches submodule `bab1d5d7`.
- [ ] **Step 4: Obtain a fresh whole-branch review.** Ask the reviewer to challenge lost coverage, accidental change detectors, oversized new files, cross-platform discovery, and assertion duplication. Correct findings and obtain a fresh review after corrections.
- [ ] **Step 5: Close the plan only when the code and evidence are complete.** Promote any enduring rule change to `.agents/doctrine/validation-policy.md` or `.agents/playbooks/testing.md`; otherwise leave those files untouched. Mark this plan `completed-awaiting-retirement` in the completing PR, commit through the hook, and hand off the reviewable branch with exact test and hosted-CI evidence. Human approval and merge are outside this checklist.

## Acceptance evidence

- The repository discovers all retained Python, Vitest, and Playwright tests after the splits; every removed test has an owner or retirement rationale.
- Substantive Python validators live under `tests/validation/`, grouped by contract. `tools/check_portfolio_quality.py` and the 1,219-line `tools/portfolio_quality.py` are gone; the command bus calls the repository-validation suite directly. Link and deployed-route check logic have the same ownership audit, while generator self-checks stay with their generators.
- The hook invokes the Python, Vitest, and Playwright suites as separate commands on its pinned staged tree and reports each result and wall time. Hosted CI invokes the same suites in separate sequential steps, with a separately visible build result; neither uses a mixed test command for required validation.
- Independent failures remain visible; Playwright runs only after a successful build. Hosted deployment is blocked by any required check or suite failure. No parallel suite scheduling is introduced by this plan.
- No test directly asserts a value it just assigned or expects implementation source spelling to remain fixed.
- Historic PR/phase completion is recorded in Git and planning history, not policed by the test suite.
- The largest files are separated by domain or visitor task, with no new catch-all replacing them.
- Every retained Playwright case names a user-visible invariant and proves it in an integrated journey. Browser unit tests are gone or moved to a cheaper owner. The plan records each removed/merged invariant's surviving journey and the new suite wall time, with no behavioral coverage deleted merely to improve elapsed time.
- The tracked commit hook passes the complete local gate on the final staged tree; hosted CI confirms the committed branch before publication claims are made. Record post-sanitation per-suite wall times, test counts, and the composed hook wall time alongside the historical baseline.

# Portfolio Ambient Standards Migration Implementation Plan

> **For agentic workers:** Use `executing-plans` for this tightly coupled migration. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** `completed-awaiting-retirement`

**Goal:** Move Portfolio from copied ambient plugin skills and generated index mesh to a pinned, opt-in standards composition while preserving the repository safeguards we rely on.

**Architecture:** Deploy selected marketplace standards from the pinned `marketplace-source` submodule into `.agents/standards/`, with a consumer-owned composition and dispatcher that remain usable in hosted CI without Codex plugins. Keep Portfolio-owned skills and site-specific policies/checks in their existing ownership lanes. Move skill refresh to the pinned submodule utility, remove mesh generation and validation in the same runner cutover, then unsubscribe from ambient plugin projections.

**Tech Stack:** Python command bus and validation, Git submodule, JSON contracts, Bash tracked pre-commit hook, GitHub Actions, React/Vitest, Playwright.

**Spec:** The user-approved direction in this task, together with the pinned source contract `.agents/plugins/marketplace-source/skills/repo-shape/references/consumer-runner-migration.md` and catalog `.agents/plugins/marketplace-source/.agents/standards/references/operating-standards-catalog.json` after advancing the gitlink to the selected published source revision. Current upstream tip observed during planning: `ae148c5c7f7b86d759b1d0db6e837abf23cbcb9f`.

**Execution Strategy:** `executing-plans`. The runner, hook, standards composition, and mesh retirement have a deliberate cutover dependency and should be reviewed as one coherent change. Execute sequentially, keeping the old runner authoritative until the deployed composition and replacement runner are ready together.

**Ruling:** Use the current main checkout on `codex/portfolio-ambient-standards`, as explicitly directed by the user because worktree creation may depend on the operating model being migrated. Do not create a linked worktree. Cost if wrong: less filesystem isolation; mitigate by checking branch/status before every mutation and keeping all changes on the named branch.

**Ruling:** The old pre-commit refresh rolled the submodule to `origin/main` and then failed on the removed `.agents/skills/repo-shape/scripts/deploy_vendor_profiles.py`, leaving all generated skill projections stale. The pre-cutover hook therefore cannot commit the plan independently. Carry the plan and predecessor-artifact retirement into the first complete runner/standards/mesh cutover commit, validate that state locally and in hosted CI while ambient subscriptions remain, then unsubscribe in a follow-up commit. Cost if wrong: the plan and retirement land with more implementation than originally intended; this preserves the required first-commit retirement and avoids publishing a knowingly broken hook state.

## Global Constraints

- Adopt only these catalog standards, subject to verifying their current contracts against Portfolio's live files: `marketplace-skill-management`, `root-agent-router`, `runbook-composition`, `playbook-composition`, `tracked-validation-hook`, `markdown-formatting`, `review-entrypoint`, `contribution-entrypoint`, `root-gitignore-hygiene`, and `completed-artifact-custody`.
- Keep Portfolio-specific design and writing policy, asset custody, privacy, content and route catalogues, and website validation as Portfolio-owned policy and checks. Do not replace them with generic marketplace standards.
- Remove subscriptions and copied skill projections for ambient plugins identified by the pinned migration contract: Agent Operating Model, Superpowers+, Repo Worker Pack, MCP Usage Pack, and Unslop+. The pinned source also records Writing Pack's completed ambient migration, so unsubscribe from it too. Preserve unrelated plugin subscriptions and all 13 declared Portfolio-owned skills.
- Ambient skill refresh must not add, remove, or update the declared standards composition or deployed standard resources. Hosted CI must run only from checked-in Portfolio code and pinned submodule material, without ambient plugin installation.
- Remove index-mesh generation and validation entirely, including generated `INDEX.md` and `INDEX.json` files. Retain authored routing pointers and useful link validation under Portfolio-owned checks.
- Preserve the public site, authored content, routes, design, asset custody, privacy, test behavior, and current outer commands `tools/run.py ci --apply` and `tools/run.py ci --check`.
- Keep the marketplace source revision and every marketplace standard revision reproducible and consistent with deployed provenance.
- Do not run the old complete CI runner after advancing the submodule pin and before the replacement runner and mesh removal are cut over together.
- In the first implementation commit, retire eligible `completed-awaiting-retirement` planning artifacts from the current `main` base as required by `.agents/doctrine/completed-artifacts.md`; retain this new plan through its completing PR and mark it `completed-awaiting-retirement` only at completion.

## Review Focus

- **An ambient projection remains required:** run refresh and hosted validation with the ambient plugin list empty; verify the 13 Portfolio-owned skills remain and no ambient skill copy is present.
- **A selected standard runs implicitly or is missing:** inspect the generated composition and dispatcher output; prove only the ten named standards are deployed and dispatched.
- **Mesh removal drops useful validation:** inventory mesh-validator behavior before removal and retain authored-link checks that protect current repository links and doctrine routing where those are actual Portfolio requirements.
- **Pin migration produces a false green:** keep the old runner authoritative until the new pinned refresh path, deployed standards, composition, and mesh-free runner are ready in the same cutover.
- **Refresh mutates standards:** compare standard composition and deployed-resource provenance before and after refresh; they must be unchanged.
- **Hook or hosted CI depends on ambient tooling:** exercise the tracked hook and hosted-parity path using only the pinned submodule and checked-in consumer resources.

## File and ownership map

| Surface | Planned responsibility |
| --- | --- |
| `.agents/plugins/marketplace-source` | Advance to the published migration-capable Marketplace revision. |
| `.agents/contracts/operating-standards.json` and `.agents/standards/` | Declare and deploy the ten selected standards, their pinned source revision, dispatcher, and provenance. |
| `.agents/plugins/marketplace.json` and `.agents/skills/` | Keep the intentional non-ambient plugin subscriptions and Portfolio-owned skills; remove ambient projections through the pinned refresh utility. |
| `tools/run.py` and repository runner tests | Preserve the outer commands while dispatching selected standards and pinned refresh; remove mesh targets and calls. |
| `.agents/contracts/repo-standards-commands.json`, `githooks/pre-commit`, `.github/workflows/ci.yml` | Keep staged-snapshot safety and named validation suites; drop mesh-only generated paths and ambient dependencies. |
| `tools/`, `tests/`, `.agents/`, `.devin/`, and repository-wide generated `INDEX.md`/`INDEX.json` | Remove mesh-only tooling, tests, exclusions, docs, and generated navigation; preserve substantive link and repository validation. |
| `AGENTS.md`, `.agents/doctrine/`, `.agents/runbooks/`, `.agents/playbooks/`, `CONTRIBUTING.md`, `REVIEW.md` | Replace mesh and copied-plugin assumptions with opt-in standards, authored routing, and capability-based workflow guidance. |

## Implementation Tasks

### Task 1: Retire predecessor artifacts and prepare the pinned migration source

- [x] Confirm the branch still starts from current `main`; inspect completion markers and promotion for eligible predecessor plans/specs, then stage those artifacts for removal in the first coherent cutover commit as the artifact policy requires.
- [x] Verify the intended Marketplace source SHA is published and contains the migration guide, standards catalog, pinned deployment/dispatch scripts, direct refresh entrypoint, and retired mesh implementation.
- [x] Advance the submodule gitlink to that published SHA and inspect the exact staged-source boundary. Do not run `refresh-skills` through the old runner after this pin changes.
- [x] Run the pinned migration preview and standards deployment preparation checks using the commands from `consumer-runner-migration.md`.
- [x] Review the preview against Portfolio's actual rules. Set the composition to the ten standards listed above, with the pinned Marketplace SHA as the source revision; keep Portfolio-specific checks repository-owned.
- [x] Prepare and validate deployment resources without activating the new composition or invoking the old full runner. Record the current plugin list, local skill list, runner, hook, CI, generated-index inventory, and validation behavior in the implementation evidence.

**Exit:** The selected standards and pinned deployed resources are valid, and the legacy runner remains the active execution path until the cutover task.

### Task 2: Cut over standards dispatch, refresh, and mesh retirement together

- [x] Update `tools/run.py` so `repo-standards` dispatches the declared composition through `.agents/standards/_runtime/repo_standards.py` and refresh invokes the utility inside the pinned `marketplace-source` checkout with `--no-roll-marketplace-source`.
- [x] Preserve `tools/run.py ci --apply` and `tools/run.py ci --check`, existing named suites, diagnostics, and shared-checkout protections.
- [x] Remove `index-mesh` and `mesh` targets, mesh helper commands, mesh-only validation calls, and any hook/CI dependency on copied Repo Worker Pack scripts.
- [x] Remove mesh-only implementation and configuration, including `tools/index_mesh_exclusions.json` and generated navigation indexes. Remove or adapt tests only when their sole contract is the retired mesh; preserve substantive repository-link, routing, and doctrine checks in consumer-owned validation.
- [x] Update the pre-commit declaration and generated-path allowlist so standard deployment/provenance and refresh-owned skill outputs are staged safely, while retired index paths are not regenerated.
- [x] Update `.github/workflows/ci.yml` so the tracked hook and separately named hosted suites validate the same deployed standards and pinned consumer runner without ambient plugin installation.
- [x] Once the new runner is complete, run its apply/check path and confirm standard provenance is stable across skill refresh.

**Exit:** Both outer commands work without mesh scripts and do not rely on installed ambient skills; the tracked hook still validates the staged snapshot and hosted CI invokes the same consumer-owned checks.

Commit the runner, hook, standards, and mesh cutover while the existing subscriptions are still declared. After that cutover commit passes the local tracked hook, make the ambient unsubscribe and refresh the immediate follow-up commit. Hosted CI validates the final migration head after those projections have been removed; the intermediate commit is a recovery boundary, not a claim that ambient projections are required.

### Task 3: Unsubscribe ambient plugins and preserve genuine Portfolio skills

- [x] Update the marketplace configuration to remove all six ambient subscriptions: Agent Operating Model, Superpowers+, Repo Worker Pack, MCP Usage Pack, Unslop+, and Writing Pack. Retain unrelated plugin subscriptions only where Portfolio intentionally uses them.
- [x] Preserve all 13 names in `repo.local_skills` and their authored source. Do not copy ambient plugin skills into a fallback directory.
- [x] Run the pinned refresh utility through the new runner. Confirm it removes stale ambient plugin projections and their provenance records while preserving local skills and intentional unrelated plugin projections.
- [x] Verify an empty ambient plugin subscription set is accepted by the local pinned refresh check; the final hosted workflow confirms the checked-in refresh state without ambient skill projections.
- [x] The follow-up tracked hook passed; hosted quality and visual-regression jobs passed for commit `e27bd07` in workflow run `36585796987`.
- [x] The completion-record commit `ab9550f` passed the tracked hook and Windows visual-regression job. Its hosted Playwright job failed the existing Wild Bunch mobile caption/image-boundary assertion twice; the test and affected source were unchanged from `main`.
- [x] Apply mobile intrinsic image sizing and verify the existing narrow-screen journey locally; hosted diagnostics proved separately timed `locator.boundingBox()` calls observed different scroll positions. Measure image, caption and status rectangles in one page evaluation so they share a coordinate frame.

**Exit:** No ambient skill projection is installed or required, and every retained skill has explicit Portfolio-owned or non-ambient plugin custody.

### Task 4: Repair repository guidance and command contracts

- [x] Update root `AGENTS.md`, `.agents/doctrine/agent-guidance-policy.md` (replace the retired mesh policy with authored navigation policy), marketplace custody policy, workflow policy, runbooks, playbooks, to remove index-mesh and ambient-subscription assumptions.
- [x] Replace exact ambient skill requirements in portable runbooks/playbooks with capability requirements; preserve exact names only for the declared Portfolio-owned skills.
- [x] Preserve clear authored routing from `AGENTS.md`, `.devin/rules/`, and relevant README/CONTRIBUTING/REVIEW surfaces without generated indexes.
- [x] Remove stale references to generated `INDEX.md` navigation, mesh validation, old installed-skill script paths, and mesh agreement from current guidance and hook/CI metadata.
- [x] Keep Markdown formatting and useful broken-link checks under their selected standard or Portfolio-owned repository validation, with clear ownership and no duplicate mesh validator.

**Exit:** Current guidance describes the new policy and every operative instruction has a live owner and valid authored link.

### Task 5: Validate the migration and close the plan

- [x] Run the full tracked hook and hosted quality gate after replacing the cross-scroll geometry measurements; hosted run `36592954787` passed the quality and Windows visual-regression jobs on `52bbb30`.
- [x] Run `py -3 tools/run.py ci --apply` and inspect generated changes; the first cutover commit passed the normal tracked hook as the complete staged-tree gate. The follow-up commit must pass the same hook.
- [x] Confirm no tracked `INDEX.md` or `INDEX.json` remains, no mesh target or call remains in tools/hook/CI/docs, ambient skill copies are absent, all 13 Portfolio-owned skills remain, and only selected standards are dispatched.
- [x] Confirm the marketplace source pin, selected standard revisions, deployed provenance, refresh result, tracked hook, and hosted CI agree on the final branch head.
- [x] Complete a fresh branch review after the hosted mobile geometry failure is resolved; retain this plan as `completed-awaiting-retirement` through the completing PR.

**Exit:** The consumer runner, hook, hosted CI, plugin refresh policy, standards composition, and authored guidance agree; all stated safeguards have an identified and passing owner.

**Review record:** The migration checks found no remaining operational mesh calls, ambient subscriptions, generated navigation indexes, or ambient skill projections. The ten selected standards and authored repository checks pass. A local responsive image sizing correction passes the focused journey and complete local hook. Hosted run `36591732401` showed that separate Playwright `boundingBox()` calls sampled image and caption at different scroll positions; the DOM rectangles in one evaluation aligned. The test now reads all related rectangles synchronously. The tracked hook passed on `52bbb30`, including 80 Python tests, 294 Vitest tests, a production build, and 127 Playwright journeys. Hosted run `36592954787` passed the quality gate and Windows visual regression on `52bbb30`. Re-run the hosted workflow after committing this completion record so the exact PR head is verified.

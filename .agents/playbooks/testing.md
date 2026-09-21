# Testing Playbook

Use this playbook to select and run the proof appropriate to a Portfolio change.

## When

- Behavior changes, validation is required, or a completion claim depends on executable evidence.
- Browser behavior, visual regression, accessibility, generated surfaces, marketplace projections, or public routes are in scope.

## Required skills

- `verification-before-completion` for evidence-backed completion claims.
- `test-driven-development` when implementing behavior or tested refactors.
- `playwright-testing` for browser behavior or visual-regression work.
- `repository-validation` for repository-focused checks and complete-gate semantics.

## Composition

1. Read the validation doctrine and identify the smallest focused check that proves the current change.
2. Use TDD when the implementation workflow requires a red-green-refactor loop.
3. Use Playwright for browser-layout or integration behavior that cannot be proven in component tests.
4. Run the complete canonical gate once through the tracked commit hook when the intended tree is staged.

## Doctrine and contracts

- [`../doctrine/validation-policy.md`](../doctrine/validation-policy.md) is the validation authority.
- [`../doctrine/workflow-policy.md`](../doctrine/workflow-policy.md) defines the tracked-hook and readiness boundary.
- [`../doctrine/coding-discipline.md`](../doctrine/coding-discipline.md) defines the component/test ownership boundary for React vertical slices.

## Local commands and paths

- Full validation: `py -3 tools/run.py ci --check`.
- Do not run `py -3 tools/run.py ci --check` immediately before a normal commit; stage the intended tree and let the tracked pre-commit hook run that complete gate once against the exact staged snapshot.
- Repository operating model: `py -3 tools/run.py repo-standards --check`.
- Marketplace projection: `py -3 tools/run.py refresh-skills --check`.
- Agent/document mesh: `py -3 tools/run.py mesh --check`.
- Content catalogue projection: `py -3 tools/run.py content-manifest --check`.
- Route metadata projection: `py -3 tools/run.py route-catalogue --check`.
- Use the affected package's focused Vitest, Playwright, asset, or build target while iterating.
- Public deployment proof: `py -3 tools/check_public_routes.py --origin https://harleybartles.github.io/portfolio`.

## Evidence contract

- Focused proof covers the changed behavior or generated surface.
- A passing retry is treated as flake evidence, not as proof that the first attempt was healthy.
- Visual baselines are reviewed intentionally and not used as substitutes for design judgment.
- Local canonical proof and deployed-route proof are not conflated.

## Prohibited combinations

- Do not bypass the tracked commit hook.
- Do not run the complete gate redundantly immediately before or after a normal hooked commit.
- Do not hide deterministic failures behind whole-gate retries.
- Do not weaken accessibility, visual, custody, or route checks to make a defect disappear.

## Runbook routing

- [Implementation](../runbooks/implementing.md) - routes here when behavior changes or validation is required.
- [Code review](../runbooks/code-review.md) - routes here when behavior or validation evidence is under review.

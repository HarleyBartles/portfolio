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

1. Before a TDD cycle, state the visitor or system behavior, a plausible failure, and the layer that owns it under the [test ownership policy](../doctrine/validation-policy.md#test-ownership).
2. Write the smallest test at that layer, observe a meaningful red result, then implement and refactor. For a refactor with existing adequate coverage, use that coverage instead of adding a change-detector test.
3. Add a second test type only if it detects a different failure. Run focused checks while iterating, then let the tracked commit hook run the complete gate once against the intended staged tree.

## Which test to write

| Contract | Primary test | Example |
| --- | --- | --- |
| Pure rule or transformation | Unit test | Route or content data maps to the right output. |
| Component behavior or semantics | Component test | The menu button exposes its expanded state and controls the link list. |
| Visitor task across a page or route | Playwright journey | At mobile width, a visitor opens the menu and reaches Projects. |
| Rendered spatial relationship | Browser layout check | The header controls remain usable without overlap or horizontal overflow at 320px. |
| Keyboard or accessibility behavior | Focused accessibility check | Escape closes the menu and focus returns to its trigger. |
| Approved art direction | Selective visual regression | A representative authored composition changes unexpectedly. |
| Built or published artifact | Build or publication check | A PDF has a valid response and signature; a public route resolves. |

Prefer roles, names, outcomes, and measurable relationships. Exact CSS declarations, source strings, class names, every pixel of a full page, and repeated assertions of the same contract are poor TDD targets. A visual baseline needs an explicit visual owner and reviewed update path.

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

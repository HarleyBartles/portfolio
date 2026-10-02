# Validation Policy

Use this reference when deciding what to verify for repo-starter work.

## Suite commands and gates

- `repo-checks`, `repository-validation`, `python-tests`, `vitest-tests`, `production-build`, and `playwright-tests` are independently callable check-only targets in `tools/run.py`.
- The tracked pre-commit hook runs each declared target against the staged snapshot, reports independent failures together, and skips Playwright only when its build dependency fails.
- Hosted CI keeps the hook's repository checks and runs repository validation, Python, Vitest, production build, and Playwright in separately named sequential steps. Each independent step still runs after a preceding failure; Playwright runs only after a successful production build. Deploy remains gated on the complete required jobs.
- `ci --check` is an optional manual aggregate. Do not run it immediately before a normal hooked commit or immediately after it passes. Use direct suite commands while iterating and the hook for the complete local gate.
- Vitest and Playwright retain their visible framework-native retry. A retry-rescued test remains actionable nondeterminism evidence.
- The Playwright target consumes the production build proved by the preceding build step. Standalone browser commands retain their own build prerequisite.

## Validation principles

- Use the smallest validation set that proves the slice you changed.
- If a change affects repository guidance, run the selected root-router, runbook, and playbook checks as applicable and validate authored Markdown links.
- If a change affects the `tools/` runner, verify the affected named command and `ci --apply` when apply behavior is in scope.
- When you need cross-platform parity evidence, run the matching command in each environment or shell family separately. Do not make that the default minimum for one agent run.
- Portfolio-authored skills under `.agents/skills/` are checked by `tools/check_local_skills.py`; no plugin skill projections are stored in this tree.
- Automated gates protect objective contracts: executable behaviour, route integrity, accessibility, privacy, asset custody, and budgets. They do not freeze exact prose, CSS classes, component structure, or every visual value.
- Dated public evidence snapshots are validated for internal consistency, safety, and the claims they actually publish. They are not required to stay revision-, count-, or inventory-equal to a moving upstream source unless a more specific repository contract explicitly declares live parity.
- Approved visual baselines protect stable, representative surfaces from accidental drift. Updating a baseline is allowed when the pull request explains and reviews the new design.
- The deployed product is static GitHub Pages output. Validation follows the live React/Vite architecture and must not retain a server toolchain after the runtime server has been removed.
- Build-owned preview servers must use task-owned process and port lifecycles, release them on success and failure, and never terminate an unrelated listener merely to make validation pass.

## Test ownership

- Start from a plausible failure and the observable contract it would break. Give that contract one primary test owner at the cheapest layer that can prove it. Add another layer only when it catches a distinct failure.
- Unit tests own pure rules and transformations. Component tests own rendered semantics, state, and public component choices. Neither should repeat the implementation through source-text, class-name, or literal CSS assertions.
- Playwright journeys own tasks a visitor can complete across the site. Use accessible controls and assert the outcome, including the menu interaction required at a narrow viewport. A journey should not prescribe incidental DOM structure or exact spacing.
- Browser layout checks own relationships that need a real renderer, such as no overlap or horizontal overflow, usable controls, and deliberately shared alignment. Accessibility checks own semantic and keyboard behavior that general journeys or automated scans do not already cover.
- Visual regression is reserved for representative, approved compositions whose appearance is itself the contract. Choose a narrow region and viewport that can reveal a meaningful unintended change; review baseline updates as design changes. Do not use pixel comparison for behavior or geometry that the DOM can express more directly, or to approve known-broken output.
- On modular pages, each visual module owns its own responsive samples and thresholds. A module's breakpoints do not require whole-page screenshots at every width; page-wide visual checks belong only to compositions that are themselves authored as a whole.
- Build and publication checks own generated routes, assets, documents, budgets, and deployed availability. Do not recast those contracts as page screenshots.
- A test is worth retaining when it can fail for a real regression and still pass after a legitimate redesign that preserves its contract. Delete duplicate or tautological checks instead of moving their assertions to another layer.

## Proof

- Do not report validation as passed unless the command output was actually observed.
- Separate command results from interpretation.
- If a validation step is skipped, say why.

## See also

- `.agents/playbooks/testing.md` for the repo's testing commands and platform notes.
- `.agents/runbooks/implementing.md` for the implementation verification workflow.

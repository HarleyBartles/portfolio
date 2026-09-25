# Validation Policy

Use this reference when deciding what to verify for repo-starter work.

## Canonical validation command

- `py -3 tools/run.py ci --check` is the repo's complete local and hosted CI verification command. For normal commit work, the tracked hook owns its single local execution against the staged tree.
- The tracked pre-commit hook enforces `py -3 tools/run.py ci --check`, including Playwright browser journeys. A commit that passes locally should reach hosted CI for confirmation, not predictable failure discovery.
- Focused repository, Python, client, build, and browser checks remain the iteration tools. There is no separate `precommit` runner target; the hook owns staged-tree orchestration around `ci --apply` and `ci --check --diagnostics`.
- Do not run the complete command immediately before a normal hooked commit or immediately after it passes. Invoke it directly only when no commit will follow, when diagnosing the complete pipeline, or when explicitly proving CI parity.
- The canonical gate gives Vitest and Playwright one visible framework-native retry. It does not retry deterministic checks or the gate as a whole. A retry-rescued test remains actionable nondeterminism evidence.
- The canonical Playwright phase consumes the production build already proved by the preceding build step. Standalone browser commands retain their own build prerequisite.

## Validation principles

- Use the smallest validation set that proves the slice you changed.
- If a change affects docs or navigation, verify the mesh.
- If a change affects doctrine or the agents mesh, verify doctrine reachability with the agent mesh validator.
- If a change affects the `tools/` runner, verify it still runs on both `ci --apply` and `ci --check`.
- When you need cross-platform parity evidence, run the matching command in each environment or shell family separately. Do not make that the default minimum for one agent run.
- Exact copied skill trees under `.agents/skills/` are validated by `tools/run.py refresh-skills --check`; exclude them from whitespace diff checks so upstream formatting does not generate false failures.
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

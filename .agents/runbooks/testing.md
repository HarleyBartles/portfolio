# Testing runbook

Use this runbook when deciding what to verify for a change.

## Read first

- `AGENTS.md` for the repo-wide build and test commands.
- `.agents/doctrine/validation-policy.md` for the validation baseline.

## Canonical validation command

- `py -3 tools/run.py ci --check` runs the full validation pipeline.
- `py -3 tools/run.py precommit --check` is an explicitly partial development check: it runs repository checks, Python tests, client unit tests, and a production build without the slower browser journeys. The tracked Git hook does not use it as proof that a commit is safe to publish.
- `py -3 tools/run.py ci --apply` regenerates mechanical surfaces and then verifies them.
- The canonical command checks the marketplace-to-derived-skill projection locally and in GitHub Actions. The marketplace source is public, so hosted checkout initializes the pinned submodule before running the same gate.

## Efficient commit gate

1. Run focused tests while implementing or repairing a known failure.
2. Stage the complete intended tree and commit normally.
3. Let the tracked pre-commit hook run the complete canonical gate once.
4. If the hook rejects the commit, use its first real failure to select the next focused test. Fix that slice, prove it independently, then retry the commit.
5. Do not pre-run `ci --check` immediately before a normal commit, rerun it immediately after a successful hooked commit, or use hosted CI to discover a failure the local hook can predict.

Do not bypass the hook. Its successful completion is the canonical local proof for the exact staged tree Git committed.

## Scoped validation

- If a change only touches generated index navigation, run `py -3 tools/run.py index-mesh --check`; use `mesh --check` when agent links or doctrine routing may also have changed.
- If a change only touches marketplace or derived skills, run `py -3 tools/run.py refresh-skills --check`.
- If a change touches the `tools/` runner, verify it still runs on both `ci --apply` and `ci --check`.
- The site is static GitHub Pages output. Do not add .NET or other backend checks unless a later approved architecture introduces a real runtime service.

## Browser quality contracts

- `src/client/e2e/fonts.spec.ts` proves the production preview needs no third-party font host and that Fraunces, Source Serif 4, and Fira Code are available from same-origin assets.
- `src/client/e2e/accessibility.spec.ts` runs automated WCAG A/AA checks across the golden routes at desktop and mobile sizes. Do not disable a rule or exclude a component to make a product defect disappear. Automated scans supplement, rather than replace, keyboard, zoom, focus, and reading-order review.
- `src/client/e2e/visual-regression.spec.ts` protects only the site's signature compositions. Its random source, motion preference, font readiness, viewport, and snapshot paths are deliberately deterministic. Windows is the sole pixel-baseline renderer: local Windows validation and the required GitHub Actions Windows job compare the same approved files. Linux runs the remaining canonical CI journeys and reports this visual suite as intentionally skipped. Author and review each new baseline once on Windows; do not create platform-specific duplicates.
- Run a new or changed screenshot test twice without `--update-snapshots` before trusting its baseline.

## Public-route proof

- `py -3 tools/check_public_routes.py --origin https://harleybartles.github.io/portfolio` checks every manifest-derived route and index against the deployed site, including status, HTML content type, title, canonical URL, generic GitHub error detection, and the custom 404 response.
- Local canonical CI proves the source and built artifact. Only the post-deploy `Verify public routes` job proves that GitHub Pages serves that artifact correctly; do not substitute one claim for the other.

## Windows and Bash

- On Windows, use `py -3 tools/run.py ...`.
- On Linux/WSL, use `python3 tools/run.py ...` or `bash tools/run ...`.

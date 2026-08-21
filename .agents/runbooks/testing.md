# Testing runbook

Use this runbook when deciding what to verify for a change.

## Read first

- `AGENTS.md` for the repo-wide build and test commands.
- `.agents/doctrine/validation-policy.md` for the validation baseline.

## Canonical validation command

- `py -3 tools/run.py ci --check` runs the full validation pipeline.
- `py -3 tools/run.py precommit --check` runs repository checks, Python tests, client unit tests, and a production build without the slower browser journeys.
- `py -3 tools/run.py ci --apply` regenerates mechanical surfaces and then verifies them.

## Scoped validation

- If a change only touches docs or navigation, run `py -3 tools/run.py mesh --check`.
- If a change only touches marketplace or derived skills, run `py -3 tools/run.py skills --check`.
- If a change touches the `tools/` runner, verify it still runs on both `ci --apply` and `ci --check`.
- The site is static GitHub Pages output. Do not add .NET or other backend checks unless a later approved architecture introduces a real runtime service.

## Browser quality contracts

- `src/client/e2e/fonts.spec.ts` proves the production preview needs no third-party font host and that Fraunces, Source Serif 4, and Fira Code are available from same-origin assets.
- `src/client/e2e/accessibility.spec.ts` runs automated WCAG A/AA checks across the golden routes at desktop and mobile sizes. Do not disable a rule or exclude a component to make a product defect disappear. Automated scans supplement, rather than replace, keyboard, zoom, focus, and reading-order review.
- `src/client/e2e/visual-regression.spec.ts` protects only the site's signature compositions. Its random source, motion preference, font readiness, viewport, and snapshot paths are deliberately deterministic. Update a baseline only after visually inspecting the changed image and recording the intentional design change in the PR.
- Run a new or changed screenshot test twice without `--update-snapshots` before trusting its baseline.

## Public-route proof

- `py -3 tools/check_public_routes.py --origin https://harleybartles.github.io/portfolio` checks every manifest-derived route and index against the deployed site, including status, HTML content type, title, canonical URL, generic GitHub error detection, and the custom 404 response.
- Local canonical CI proves the source and built artifact. Only the post-deploy `Verify public routes` job proves that GitHub Pages serves that artifact correctly; do not substitute one claim for the other.

## Windows and Bash

- On Windows, use `py -3 tools/run.py ...`.
- On Linux/WSL, use `python3 tools/run.py ...` or `bash tools/run ...`.

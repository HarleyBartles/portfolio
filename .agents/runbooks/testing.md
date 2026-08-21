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

## Windows and Bash

- On Windows, use `py -3 tools/run.py ...`.
- On Linux/WSL, use `python3 tools/run.py ...` or `bash tools/run ...`.

# Script Contract Policy

Use this reference when authoring or changing repository scripts.

## Contract

- If a script is meant to be used by agents on Windows and Linux, provide both PowerShell and Bash entrypoints.
- Prefer a single Python implementation core when that keeps behavior deterministic and easy to test.
- Keep wrappers thin: they should select a launcher, translate arguments, and delegate behavior.
- If a script needs separate shell-native implementations, keep the behavior aligned and document why the split is necessary.

## Validation

- Add or update `--check` or equivalent validation modes whenever a script mutates repository state.
- Keep check mode as close to write mode as possible without mutating files.
- Update tests, routing files, and any affected guidance in the same change when a script contract changes.

## Repository Expectations

- `scripts/AGENTS.md` is the router for tooling changes.
- `scripts/README.md` is the human catalog for tools, not the routing surface.
- The refresh family should stay deterministic and reproducible from a clean checkout.

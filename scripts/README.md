# Scripts

This directory contains deterministic tooling for the portfolio repository.

## Tool Catalog

### `generate_index_mesh.py` / `generate_index_mesh.ps1`

**Use when** you have added, removed, renamed, or moved tracked files or directories and need to regenerate the repo-wide `INDEX.md` mesh.

- `python scripts/generate_index_mesh.py` - regenerate the whole `INDEX.md` mesh
- `python scripts/generate_index_mesh.py --check` - validate the mesh without writing
- `.\scripts\generate_index_mesh.ps1` - PowerShell wrapper with the same `-Check` flag

The generator owns every tracked `INDEX.md` file in the repo. It asks git which paths are ignored, skips excluded directories, and writes deterministic navigation pages that show child directories and files.

**Use after** structural changes that affect navigation or any new surface that should be discoverable through `INDEX.md`.

### `assert_active_worktree.py` / `assert_active_worktree.ps1`

**Use when** a branch task should only mutate files inside the linked worktree.

- `python scripts/assert_active_worktree.py` - fail if the active checkout is the shared repository root or a submodule
- `python scripts/assert_active_worktree.py --allow-shared-checkout` - permit intentional main-checkout work
- `.\scripts\assert_active_worktree.ps1` - PowerShell wrapper with the same `-AllowSharedCheckout` flag

This guard is meant to be run before file mutations so agents do not accidentally write branch work into the shared checkout.

### `validate_agent_mesh.py` / `validate_agent_mesh.ps1`

**Use when** you need to verify that every doctrine document under `.agents/doctrine/` is referenced from at least one node in the agents mesh.

- `python scripts/validate_agent_mesh.py` - validate doctrine reachability without writing
- `python scripts/validate_agent_mesh.py --check` - same validation mode, explicit check flag
- `.\scripts\validate_agent_mesh.ps1` - PowerShell wrapper with the same `-Check` flag

The validator keeps doctrine discoverable through the routing mesh and is intended for local preflight and CI.

### `ci-preflight.ps1`

**Use when** you want the repo's default preflight bundle in one command.

- `.\scripts\ci-preflight.ps1` - run the mesh check and doctrine validator
- `.\scripts\ci-preflight.ps1 -Check` - validation mode without writes

This is the preferred single entrypoint for local readiness and CI jobs that should mirror the repo's current setup baseline.

## Conventions

- Keep scripts deterministic.
- Prefer a thin PowerShell wrapper over duplicating logic in two languages.
- If a script has a check mode, the check mode should match the write mode as closely as possible without mutating files.

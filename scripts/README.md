# Scripts

This directory contains deterministic tooling for the portfolio repository.

## Tool Catalog

### `generate_index_mesh.py` / `generate_index_mesh.ps1`

**Classification:** canonical helper used by the refresh family.

**Use when** you need the direct helper for the repo-wide `INDEX.md` mesh or a task only touches navigation surfaces.

- `python scripts/generate_index_mesh.py` - regenerate the whole `INDEX.md` mesh
- `python scripts/generate_index_mesh.py --check` - validate the mesh without writing
- `.\scripts\generate_index_mesh.ps1` - PowerShell wrapper with the same `-Check` flag
- `bash ./scripts/generate_index_mesh.sh` - Bash wrapper with the same behavior
- `bash ./scripts/generate_index_mesh.sh --check` - Bash validation mode without writes

The generator owns every tracked `INDEX.md` file in the repo. It asks git which paths are ignored, skips excluded directories, and writes deterministic navigation pages that show child directories and files.

**Use after** structural changes that affect navigation or any new surface that should be discoverable through `INDEX.md`. For the combined repo refresh path, prefer `refresh_agent_surfaces.py`.

### `install_agent_skills.py` / `install_agent_skills.ps1`

**Classification:** canonical helper used by the refresh family.

**Use when** you need the direct helper that installs or validates the derived repo-local skills from the pinned marketplace source.

- `python scripts/install_agent_skills.py` - copy the selected default plugin skills into `.agents/skills/`
- `python scripts/install_agent_skills.py --check` - validate the derived skills and provenance without writing
- `.\scripts\install_agent_skills.ps1` - PowerShell wrapper with the same `-Check` and `-Force` flags
- `bash ./scripts/install_agent_skills.sh` - Bash wrapper with the same behavior
- `bash ./scripts/install_agent_skills.sh --check` - Bash validation mode without writes

This helper owns the derived `.agents/skills/` tree and its `.provenance.json`. It remains directly runnable, but the refresh family is the preferred combined refresh entrypoint.

### `assert_active_worktree.py` / `assert_active_worktree.ps1`

**Classification:** standalone safety guard.

**Use when** a branch task should only mutate files inside the linked worktree.

- `python scripts/assert_active_worktree.py` - fail if the active checkout is the shared repository root or a submodule
- `python scripts/assert_active_worktree.py --allow-shared-checkout` - permit intentional main-checkout work
- `.\scripts\assert_active_worktree.ps1` - PowerShell wrapper with the same `-AllowSharedCheckout` flag
- `bash ./scripts/assert_active_worktree.sh` - Bash wrapper with the same behavior

This guard is meant to be run before file mutations so agents do not accidentally write branch work into the shared checkout.

### `validate_agent_mesh.py` / `validate_agent_mesh.ps1`

**Classification:** standalone read-only validator.

**Use when** you need to verify that every doctrine document under `.agents/doctrine/` is referenced from at least one node in the agents mesh.

- `python scripts/validate_agent_mesh.py` - validate doctrine reachability without writing
- `python scripts/validate_agent_mesh.py --check` - same validation mode, explicit check flag
- `.\scripts\validate_agent_mesh.ps1` - PowerShell wrapper with the same `-Check` flag
- `bash ./scripts/validate_agent_mesh.sh` - Bash wrapper with the same behavior
- `bash ./scripts/validate_agent_mesh.sh --check` - Bash validation mode without writes

The validator keeps doctrine discoverable through the routing mesh and is intended for local preflight and CI. It remains a separate read-only command and is not folded into the refresh family.

### `refresh_agent_surfaces.py` / `refresh_agent_surfaces.ps1`

**Classification:** combined refresh entrypoint.

**Use when** you want the deterministic repo-surface refresh bundle in one command.

- `python scripts/refresh_agent_surfaces.py` - refresh the index mesh and derived skills
- `python scripts/refresh_agent_surfaces.py --check` - validation mode without writes
- `.\scripts\refresh_agent_surfaces.ps1` - PowerShell wrapper with the same `-Check` flag
- `bash ./scripts/refresh_agent_surfaces.sh` - Bash wrapper with the same behavior
- `bash ./scripts/refresh_agent_surfaces.sh --check` - Bash validation mode without writes

This is the preferred combined refresh entrypoint for deterministic surfaces that should be updated before preflight.

### `ci-preflight.ps1` / `ci-preflight.sh`

**Use when** you want the repo's default preflight bundle in one command.

- `.\scripts\ci-preflight.ps1` - run the mesh check and doctrine validator
- `.\scripts\ci-preflight.ps1 -Check` - validation mode without writes
- `bash ./scripts/ci-preflight.sh` - Bash peer for the same bundle
- `bash ./scripts/ci-preflight.sh --check` - Bash validation mode without writes

This is the preferred single entrypoint for local readiness and CI jobs that should mirror the repo's current setup baseline.

## Conventions

- Keep scripts deterministic.
- Prefer a thin PowerShell wrapper over duplicating logic in two languages.
- If a script has a check mode, the check mode should match the write mode as closely as possible without mutating files.

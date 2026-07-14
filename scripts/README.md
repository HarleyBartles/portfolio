# Scripts

This directory contains deterministic tooling for the portfolio repository.

## Tool Catalog

### `refresh_agent_surfaces.py` / `refresh_agent_surfaces.ps1` / `refresh_agent_surfaces.sh`

Combined refresh entrypoint for deterministic repo surfaces.

- `python scripts/refresh_agent_surfaces.py` - refresh the index mesh and derived skills
- `python scripts/refresh_agent_surfaces.py --check` - validate the refresh bundle without writing
- `.\scripts\refresh_agent_surfaces.ps1` - PowerShell wrapper
- `.\scripts\refresh_agent_surfaces.ps1 -Check` - PowerShell validation mode
- `bash ./scripts/refresh_agent_surfaces.sh` - Bash wrapper
- `bash ./scripts/refresh_agent_surfaces.sh --check` - Bash validation mode

### `generate_index_mesh.py` / `generate_index_mesh.ps1` / `generate_index_mesh.sh`

Generator for the repo-wide `INDEX.md` navigation mesh.

- `python scripts/generate_index_mesh.py` - regenerate the mesh
- `python scripts/generate_index_mesh.py --check` - validate the mesh without writing
- `.\scripts\generate_index_mesh.ps1` - PowerShell wrapper
- `.\scripts\generate_index_mesh.ps1 -Check` - PowerShell validation mode
- `bash ./scripts/generate_index_mesh.sh` - Bash wrapper
- `bash ./scripts/generate_index_mesh.sh --check` - Bash validation mode

### `install_agent_skills.py` / `install_agent_skills.ps1` / `install_agent_skills.sh`

Installer for repo-local derived skills copied from the pinned marketplace source.

- `python scripts/install_agent_skills.py` - copy the selected default plugin skills into `.agents/skills/`
- `python scripts/install_agent_skills.py --check` - validate the derived skills and provenance without writing
- `.\scripts\install_agent_skills.ps1` - PowerShell wrapper
- `.\scripts\install_agent_skills.ps1 -Check` - PowerShell validation mode
- `.\scripts\install_agent_skills.ps1 -Force` - PowerShell replace mode
- `bash ./scripts/install_agent_skills.sh` - Bash wrapper
- `bash ./scripts/install_agent_skills.sh --check` - Bash validation mode

### `assert_active_worktree.py` / `assert_active_worktree.ps1` / `assert_active_worktree.sh`

Safety guard for linked-worktree-only mutations.

- `python scripts/assert_active_worktree.py` - fail if the active checkout is the shared repository root or a submodule
- `python scripts/assert_active_worktree.py --allow-shared-checkout` - permit intentional main-checkout work
- `.\scripts\assert_active_worktree.ps1` - PowerShell wrapper
- `.\scripts\assert_active_worktree.ps1 -AllowSharedCheckout` - PowerShell allow-shared-checkout mode
- `bash ./scripts/assert_active_worktree.sh` - Bash wrapper

### `validate_agent_mesh.py` / `validate_agent_mesh.ps1` / `validate_agent_mesh.sh`

Read-only validator for doctrine reachability through the agents mesh.

- `python scripts/validate_agent_mesh.py` - validate doctrine reachability without writing
- `python scripts/validate_agent_mesh.py --check` - same validation mode, explicit check flag
- `.\scripts\validate_agent_mesh.ps1` - PowerShell wrapper
- `.\scripts\validate_agent_mesh.ps1 -Check` - PowerShell validation mode
- `bash ./scripts/validate_agent_mesh.sh` - Bash wrapper
- `bash ./scripts/validate_agent_mesh.sh --check` - Bash validation mode

### `ci-preflight.ps1` / `ci-preflight.sh`

Repository preflight bundle for local readiness and CI.

- `.\scripts\ci-preflight.ps1` - run the refresh bundle, doctrine validator, and tests
- `.\scripts\ci-preflight.ps1 -Check` - validation mode without writes
- `bash ./scripts/ci-preflight.sh` - Bash peer for the same bundle
- `bash ./scripts/ci-preflight.sh --check` - Bash validation mode without writes

## Conventions

- Keep scripts deterministic.
- Prefer a thin PowerShell wrapper over duplicating logic in two languages.
- If a script has a check mode, the check mode should match the write mode as closely as possible without mutating files.

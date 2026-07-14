# Scripts Guidance

This folder contains deterministic tooling for the portfolio repository.

## Use When

- Use when you need the preferred deterministic refresh entrypoint for agent-facing repo surfaces: [`refresh_agent_surfaces.py`](refresh_agent_surfaces.py), [`refresh_agent_surfaces.ps1`](refresh_agent_surfaces.ps1), and [`refresh_agent_surfaces.sh`](refresh_agent_surfaces.sh).
- Use before editing or adding scripts in this folder: [`README.md`](README.md) for the script catalog and conventions.
- Use when you need the canonical helper used by the refresh family for the `INDEX.md` mesh: [`generate_index_mesh.py`](generate_index_mesh.py) and [`generate_index_mesh.ps1`](generate_index_mesh.ps1).
- Use when you need the Windows entrypoint for the mesh generator: [`generate_index_mesh.ps1`](generate_index_mesh.ps1).
- Use when you need the canonical helper used by the refresh family for derived repo-local skills: [`install_agent_skills.py`](install_agent_skills.py) and [`install_agent_skills.ps1`](install_agent_skills.ps1).
- Use when you need the standalone safety guard for linked-worktree-only mutations: [`assert_active_worktree.py`](assert_active_worktree.py) and [`assert_active_worktree.ps1`](assert_active_worktree.ps1).
- Use when you need the standalone read-only validator for doctrine reachability: [`validate_agent_mesh.py`](validate_agent_mesh.py) and [`validate_agent_mesh.ps1`](validate_agent_mesh.ps1).
- Use when you need the local-or-CI repo preflight: [`ci-preflight.ps1`](ci-preflight.ps1).
- Use when you need the repo's readiness wrapper rather than a refresh command: [`ci-preflight.ps1`](ci-preflight.ps1).

## Working Rules

- Keep scripts small and deterministic.
- Put the real behavior in Python where possible and keep PowerShell wrappers thin.
- Prefer `refresh_agent_surfaces.py` for repo-facing refreshes; keep `generate_index_mesh.py` and `install_agent_skills.py` available as direct helpers.
- Keep `generate_index_mesh.py` and `install_agent_skills.py` directly runnable as the canonical helpers behind the refresh family.
- Keep `validate_agent_mesh.py` standalone and read-only.
- Keep `assert_active_worktree.py` standalone as a safety guard; do not fold it into refresh orchestration.
- Keep `ci-preflight.ps1` focused on readiness checks, not refresh orchestration.
- If a tool changes the repository structure, regenerate the index mesh in the same change.

# Scripts Guidance

This folder contains deterministic tooling for the portfolio repository.

## Use When

- Use when you need the preferred deterministic refresh entrypoint for agent-facing repo surfaces: [`refresh_agent_surfaces.py`](refresh_agent_surfaces.py), [`refresh_agent_surfaces.ps1`](refresh_agent_surfaces.ps1), and [`refresh_agent_surfaces.sh`](refresh_agent_surfaces.sh).
- Use before editing or adding scripts in this folder: [`README.md`](README.md) for the script catalog and conventions.
- Use when you need to regenerate the `INDEX.md` mesh: [`generate_index_mesh.py`](generate_index_mesh.py).
- Use when you need the Windows entrypoint for the mesh generator: [`generate_index_mesh.ps1`](generate_index_mesh.ps1).
- Use when you need to assert the active checkout is the intended linked worktree: [`assert_active_worktree.py`](assert_active_worktree.py) and [`assert_active_worktree.ps1`](assert_active_worktree.ps1).
- Use when you need the agent-mesh doctrine validator: [`validate_agent_mesh.py`](validate_agent_mesh.py) and [`validate_agent_mesh.ps1`](validate_agent_mesh.ps1).
- Use when you need the local-or-CI repo preflight: [`ci-preflight.ps1`](ci-preflight.ps1).
- Use when you need to sync repo-local Codex skills from the marketplace source: [`install_agent_skills.py`](install_agent_skills.py) and [`install_agent_skills.ps1`](install_agent_skills.ps1).
- Use when you need the repo's readiness wrapper rather than a refresh command: [`ci-preflight.ps1`](ci-preflight.ps1).

## Working Rules

- Keep scripts small and deterministic.
- Put the real behavior in Python where possible and keep PowerShell wrappers thin.
- Prefer `refresh_agent_surfaces.py` for repo-facing refreshes; keep `generate_index_mesh.py` and `install_agent_skills.py` available as direct helpers.
- Keep `ci-preflight.ps1` focused on readiness checks, not refresh orchestration.
- If a tool changes the repository structure, regenerate the index mesh in the same change.

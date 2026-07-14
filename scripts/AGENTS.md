# Scripts Guidance

This folder contains deterministic tooling for the portfolio repository.

## Use When

- Use when you need the preferred deterministic refresh entrypoint for agent-facing repo surfaces: [`refresh_agent_surfaces.py`](refresh_agent_surfaces.py), [`refresh_agent_surfaces.ps1`](refresh_agent_surfaces.ps1), and [`refresh_agent_surfaces.sh`](refresh_agent_surfaces.sh).
- Use before editing or adding scripts in this folder: [`INDEX.md`](INDEX.md) for the script map and `scripts/README.md` for the human-facing catalog.
- Use when you need the canonical helper used by the refresh family for the `INDEX.md` mesh: [`generate_index_mesh.py`](generate_index_mesh.py), [`generate_index_mesh.ps1`](generate_index_mesh.ps1), and [`generate_index_mesh.sh`](generate_index_mesh.sh).
- Use when you need the canonical helper used by the refresh family for derived repo-local skills: [`install_agent_skills.py`](install_agent_skills.py), [`install_agent_skills.ps1`](install_agent_skills.ps1), and [`install_agent_skills.sh`](install_agent_skills.sh).
- Use when you need the standalone safety guard for linked-worktree-only mutations: [`assert_active_worktree.py`](assert_active_worktree.py), [`assert_active_worktree.ps1`](assert_active_worktree.ps1), and [`assert_active_worktree.sh`](assert_active_worktree.sh).
- Use when you need the standalone read-only validator for doctrine reachability: [`validate_agent_mesh.py`](validate_agent_mesh.py), [`validate_agent_mesh.ps1`](validate_agent_mesh.ps1), and [`validate_agent_mesh.sh`](validate_agent_mesh.sh).
- Use when you need the local repo preflight: [`ci-preflight.ps1`](ci-preflight.ps1) or [`ci-preflight.sh`](ci-preflight.sh).
- Use before changing shell-script wrappers or script contract rules: [`.agents/doctrine/script-contract-policy.md`](../doctrine/script-contract-policy.md).

## Working Rules

- Keep scripts small and deterministic.
- Keep Bash and PowerShell entrypoints in sync when a script needs cross-platform use.
- Put the real behavior in Python where possible and keep wrappers thin.
- Keep `generate_index_mesh.py` and `install_agent_skills.py` directly runnable as the canonical helpers behind the refresh family.
- Keep `validate_agent_mesh.py` standalone and read-only.
- Keep `assert_active_worktree.py` standalone as a safety guard; do not fold it into refresh orchestration.
- If a tool changes the repository structure, regenerate the index mesh in the same change.

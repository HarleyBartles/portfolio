# Scripts Guidance

This folder contains deterministic tooling for the portfolio repository.

## Use When

- Use before editing or adding scripts in this folder: [`README.md`](README.md) for the script catalog and conventions.
- Use when you need to regenerate the `INDEX.md` mesh: [`generate_index_mesh.py`](generate_index_mesh.py).
- Use when you need the Windows entrypoint for the mesh generator: [`generate_index_mesh.ps1`](generate_index_mesh.ps1).
- Use when you need the agent-mesh doctrine validator: [`validate_agent_mesh.py`](validate_agent_mesh.py) and [`validate_agent_mesh.ps1`](validate_agent_mesh.ps1).
- Use when you need the local-or-CI repo preflight: [`ci-preflight.ps1`](ci-preflight.ps1).

## Working Rules

- Keep scripts small and deterministic.
- Put the real behavior in Python where possible and keep PowerShell wrappers thin.
- If a tool changes the repository structure, regenerate the index mesh in the same change.

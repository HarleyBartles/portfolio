# Validation Policy

Use this reference when deciding what to verify for repo-starter work.

## Current Repo Baseline

For the current portfolio setup work, the minimum validation is:

- `py -3 scripts/generate_index_mesh.py`
- `py -3 scripts/generate_index_mesh.py --check`
- `.\scripts\generate_index_mesh.ps1 -Check`
- `git diff --check`
- `git status --short`

## Validation Rules

- Use the smallest validation set that proves the slice you changed.
- If a change affects docs or navigation, verify the mesh.
- If a change affects scripts, verify the script and its wrapper both work.
- If a change affects future application code, add the exact build/test/typecheck commands to the next layer of guidance when that code exists.

## Proof

- Do not report validation as passed unless the command output was actually observed.
- Separate command results from interpretation.
- If a validation step is skipped, say why.

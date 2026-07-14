# Validation Policy

Use this reference when deciding what to verify for repo-starter work.

## Current Repo Baseline

Run the local preflight peer that matches the shell you are actually using. The repository keeps Windows and Bash entrypoints aligned, but a single agent run does not need to execute both shell families unless the task is explicitly about cross-platform parity.

### Windows lane

- `.\scripts\ci-preflight.ps1 -Check`
- `.\scripts\generate_index_mesh.ps1 -Check`
- `.\scripts\validate_agent_mesh.ps1 -Check`
- `py -3 -m unittest discover -s tests -v`
- `git diff --check origin/main...HEAD -- . ':(exclude).agents/skills/**'`
- `git status --short`

### Bash/Linux lane

- `bash ./scripts/ci-preflight.sh --check`
- `bash ./scripts/generate_index_mesh.sh --check`
- `bash ./scripts/validate_agent_mesh.sh --check`
- `python3 -m unittest discover -s tests -v`
- `git diff --check origin/main...HEAD -- . ':(exclude).agents/skills/**'`
- `git status --short`

## Validation Rules

- Use the smallest validation set that proves the slice you changed.
- Use the preflight wrapper appropriate to your environment when you need the repo's default readiness bundle.
- If a change affects docs or navigation, verify the mesh.
- If a change affects doctrine or the agents mesh, verify doctrine reachability with the agent mesh validator.
- If a change affects scripts, verify the script contract in both shell entrypoints and the shared implementation where relevant.
- When you need cross-platform parity evidence, run the matching peer wrapper in each environment or shell family separately. Do not make that the default minimum for one agent run.
- Exact copied skill trees under `.agents/skills/` are validated by `scripts/install_agent_skills.py --check`; exclude them from whitespace diff checks so upstream formatting does not generate false failures.

## Proof

- Do not report validation as passed unless the command output was actually observed.
- Separate command results from interpretation.
- If a validation step is skipped, say why.

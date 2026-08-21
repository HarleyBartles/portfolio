# Validation Policy

Use this reference when deciding what to verify for repo-starter work.

## Canonical validation command

- `py -3 tools/run.py ci --check` is the repo's canonical pre-commit and CI verification command.

## Validation principles

- Use the smallest validation set that proves the slice you changed.
- If a change affects docs or navigation, verify the mesh.
- If a change affects doctrine or the agents mesh, verify doctrine reachability with the agent mesh validator.
- If a change affects the `tools/` runner, verify it still runs on both `ci --apply` and `ci --check`.
- When you need cross-platform parity evidence, run the matching command in each environment or shell family separately. Do not make that the default minimum for one agent run.
- Exact copied skill trees under `.agents/skills/` are validated by `tools/run.py skills --check`; exclude them from whitespace diff checks so upstream formatting does not generate false failures.
- Automated gates protect objective contracts: executable behaviour, route integrity, accessibility, privacy, asset custody, and budgets. They do not freeze exact prose, CSS classes, component structure, or every visual value.
- Approved visual baselines protect stable, representative surfaces from accidental drift. Updating a baseline is allowed when the pull request explains and reviews the new design.

## Proof

- Do not report validation as passed unless the command output was actually observed.
- Separate command results from interpretation.
- If a validation step is skipped, say why.

## See also

- `.agents/runbooks/testing.md` for the repo's testing commands and platform notes.
- `.agents/runbooks/implementing.md` for the implementation verification workflow.

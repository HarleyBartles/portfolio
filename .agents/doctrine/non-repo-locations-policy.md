# Non-repo locations policy

Status: active policy
Owner: Portfolio repository
Scope: canonical locations outside the repo tree for isolated work and scratch artifacts
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: installed `repo-worker-base` and its references

Use this policy when creating or using worktrees and scratch space.

## Worktrees

Isolated branch worktrees live in `../_agent-worktrees/<repo-name>/<branch-name>/`,
a sibling of the repo folder. Worktree payloads live entirely outside the repo
tree.

Rules:

- Use worktrees only for isolated branch checkouts and temporary local issue lanes.
- Do not store canonical source, generated outputs, or long-lived repo assets in worktrees.

## Scratch files

Scratch files (temporary scripts, commit message temp files, inspection
scripts, debug output, SDD artifacts) go in `../_agent-scratch/<repo-name>/<branch-name>/<plan-basename>/`,
not in the repo tree. The scratch directory is a sibling of the repo folder.

Rules:

- The top level of `_agent-scratch` must contain only folders named after repositories (`<repo-name>`).
- Inside each repo folder, create subfolders named after the worktree branch the scratch belongs to.
- Plan- or task-scoped scratch lives inside the branch folder.
- Scratch contents are not durable. Do not put anything in scratch that needs to survive beyond the work it supports.
- Do not commit scratch files into the repo.
- Do not leave scratch files in the repo working tree. If a scratch file ends up in the repo tree, remove it before committing.

## Shared checkout

Mutation must refuse the shared `main` checkout by default. An explicit
`--allow-shared-checkout` may continue only after current human approval and a
prominent warning. It changes no path calculation and never permits a submodule.

## Subagent profile runtime staging

Portable subagent profiles shipped with the `selecting-a-subagent` skill are
installed to the Devin Desktop user-global agents directory:

```
py -3 .agents/skills/selecting-a-subagent/scripts/install_profiles.py --apply
```

The runtime searches the user-global directory first, so portable profiles do not
need `runtime-agents` staging and should not be placed in `.agents/agents/`.

Use `runtime-agents` only for repo-local `.agents/agents/*.md` profiles (e.g.
`reviewer-marketplace.md`). The Devin runtime resolves profiles against the
`.agents/agents/` directory of the main checkout (the IDE's `cwd`), not a linked
worktree. When working in a feature branch that adds or changes repo-local
profiles, stage them into the main checkout uncommitted so the runtime can see
them. This repository does not currently expose a `runtime-agents` target in
`tools/run.py`; stage the files manually to `.agents/agents/` and restart the
IDE so the runtime picks them up.

These are local runtime staging copies only. Do not commit them to `main`.
Restart the IDE after applying so the runtime picks up the new profiles.

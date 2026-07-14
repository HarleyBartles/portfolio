# Repository Guidance

This repository is the source for Harley Bartles' personal developer portfolio website.

## Checkout Identity Check

Before any file mutation, record the current checkout once and keep it in mind:

- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git rev-parse --git-dir`
- `git rev-parse --git-common-dir`
- `git rev-parse --show-superproject-working-tree`

If this is the shared `main` checkout or a submodule, stop and use the intended worktree/branch instead unless the task explicitly says shared-checkout work is intended.
Do not repeatedly rediscover the worktree during the same task.

## Purpose

The site exists to present Harley as a software engineer through:

- a concise professional homepage;
- project showcases, including Wild Bunch as one featured project;
- technical writing and articles;
- occasional small demos or tools when they support the portfolio.

## Architectural Principles

- Keep the application straightforward.
- Favor a single maintainable web application over a layered architecture with empty abstractions.
- Assume `.NET 10`, `ASP.NET Core`, `React`, `TypeScript`, and `Vite` as the long-term stack.
- Keep authentication out of scope until there is an actual multi-project need.
- Avoid DDD, CQRS, event sourcing, microservices, and other speculative structures unless a future requirement clearly justifies them.

## Working Style

- Start from the live repository state, not from chat assumptions.
- Preserve existing patterns once they are established.
- Make the smallest change that supports the current goal.
- Keep the repository intentionally simple and easy to navigate.
- Update documentation when the repository structure changes in a meaningful way.

## Agent Guidance Surfaces

Read the scoped routers and the relevant doc before taking action:

- Use before any docs, policy, or repo-guidance work: [`.agents/docs/AGENTS.md`](./.agents/docs/AGENTS.md).
- Use before any durable doctrine or policy work: [`.agents/doctrine/AGENTS.md`](./.agents/doctrine/AGENTS.md).
- Use before any brainstorming or design-spec pass: [`.agents/docs/guides/AGENTS.md`](./.agents/docs/guides/AGENTS.md).
- Use before any worktree, branch, PR, or readiness decision: [`.agents/doctrine/workflow-policy.md`](./.agents/doctrine/workflow-policy.md).
- Use before any Superpowers planning or plan-writing pass: [`.agents/superpowers/AGENTS.md`](./.agents/superpowers/AGENTS.md).
- Use before any marketplace or plugin surface work: [`.agents/plugins/AGENTS.md`](./.agents/plugins/AGENTS.md).
- Use before inspecting or refreshing derived skills: [`.agents/skills/AGENTS.md`](./.agents/skills/AGENTS.md).
- Use before any scripts/tooling change: [`scripts/AGENTS.md`](./scripts/AGENTS.md).
- Use before any local-or-CI readiness check: [`scripts/ci-preflight.ps1`](./scripts/ci-preflight.ps1) or [`scripts/ci-preflight.sh`](./scripts/ci-preflight.sh).
- Use before changing or adding hidden agent surfaces: [`.agents/INDEX.md`](./.agents/INDEX.md) and [`.agents/doctrine/mesh-policy.md`](./.agents/doctrine/mesh-policy.md).
- Use after any structural change that adds, removes, or moves tracked directories: run `python scripts/generate_index_mesh.py`, `.\scripts\generate_index_mesh.ps1 -Check`, or `bash ./scripts/generate_index_mesh.sh --check` and update the relevant `INDEX.md` files in the same change.

## Documentation Rules

- `README.md` is the human-facing overview.
- `INDEX.md` files are navigation aids for agents and should stay descriptive, not promotional.
- `INDEX.md` files are generated navigation and should be regenerated through `scripts/generate_index_mesh.py`, not hand-edited.
- If directories are added, removed, or reorganized, update the relevant index files in the same change.
- Keep this guidance current as the repository evolves.

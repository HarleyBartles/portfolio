# Repository Guidance

This repository is the source for Harley Bartles' personal developer portfolio website.

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
- Use before any file mutation when a branch task should stay in a linked worktree: [`scripts/assert_active_worktree.py`](./scripts/assert_active_worktree.py) and [`scripts/assert_active_worktree.ps1`](./scripts/assert_active_worktree.ps1).
- Use when you need the preferred repo-facing refresh entrypoint for deterministic agent surfaces: [`scripts/refresh_agent_surfaces.py`](./scripts/refresh_agent_surfaces.py), [`scripts/refresh_agent_surfaces.ps1`](./scripts/refresh_agent_surfaces.ps1), and [`scripts/refresh_agent_surfaces.sh`](./scripts/refresh_agent_surfaces.sh).
- Use when the question is whether the repo is ready for CI or handoff: [`scripts/ci-preflight.ps1`](./scripts/ci-preflight.ps1).
- Use before any Superpowers planning or plan-writing pass: [`.agents/superpowers/AGENTS.md`](./.agents/superpowers/AGENTS.md).
- Use before any marketplace or plugin surface work: [`.agents/plugins/AGENTS.md`](./.agents/plugins/AGENTS.md).
- Use before inspecting or refreshing derived skills: [`.agents/skills/AGENTS.md`](./.agents/skills/AGENTS.md).
- Use before any scripts/tooling change: [`scripts/AGENTS.md`](./scripts/AGENTS.md).
- Use before changing or adding hidden agent surfaces: [`.agents/INDEX.md`](./.agents/INDEX.md) and [`.agents/doctrine/mesh-policy.md`](./.agents/doctrine/mesh-policy.md).
- Use after any structural change that adds, removes, or moves tracked directories: run `python scripts/generate_index_mesh.py` or `.\scripts\generate_index_mesh.ps1 -Check` and update the relevant `INDEX.md` files in the same change.

## Documentation Rules

- `README.md` is the human-facing overview.
- `INDEX.md` files are navigation aids for agents and should stay descriptive, not promotional.
- `INDEX.md` files are generated navigation and should be regenerated through `scripts/generate_index_mesh.py`, not hand-edited.
- `scripts/refresh_agent_surfaces.py` is the preferred repo-facing refresh command; `scripts/generate_index_mesh.py` and `scripts/install_agent_skills.py` remain the direct deterministic helpers.
- `scripts/ci-preflight.ps1` is the readiness wrapper, not the refresh surface.
- If directories are added, removed, or reorganized, update the relevant index files in the same change.
- Keep this guidance current as the repository evolves.

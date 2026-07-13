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

Read the relevant guidance before taking action:

- Use before any brainstorming or design-spec pass: [`.agents/docs/guides/INDEX.md`](./.agents/docs/guides/INDEX.md), then [`design-spec-guide.md`](./.agents/docs/guides/design-spec-guide.md) when the task is turning an idea into a planning-ready design spec.
- Use before any Superpowers planning or plan-writing pass: [`.agents/superpowers/INDEX.md`](./.agents/superpowers/INDEX.md) and [`.agents/superpowers/plans/INDEX.md`](./.agents/superpowers/plans/INDEX.md). Follow the `plans/` and local-only spec rules there.
- Use before changing or adding hidden agent surfaces: [`.agents/INDEX.md`](./.agents/INDEX.md), [`.agents/docs/INDEX.md`](./.agents/docs/INDEX.md), and [`.agents/docs/mesh-policy.md`](./.agents/docs/mesh-policy.md) so the surrounding navigation stays current.
- Use before updating README or index surfaces: [`.agents/docs/mesh-policy.md`](./.agents/docs/mesh-policy.md) and [`scripts/README.md`](./scripts/README.md) for the mesh contract and generator behavior.
- Use after any structural change that adds, removes, or moves tracked directories: run `python scripts/generate_index_mesh.py` or `.\scripts\generate_index_mesh.ps1 -Check` and update the relevant `INDEX.md` files in the same change.

## Documentation Rules

- `README.md` is the human-facing overview.
- `INDEX.md` files are navigation aids for agents and should stay descriptive, not promotional.
- `INDEX.md` files are generated navigation and should be regenerated through `scripts/generate_index_mesh.py`, not hand-edited.
- If directories are added, removed, or reorganized, update the relevant index files in the same change.
- Keep this guidance current as the repository evolves.

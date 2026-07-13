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
- Use before any Superpowers planning or plan-writing pass: [`.agents/superpowers/INDEX.md`](./.agents/superpowers/INDEX.md). Follow the `plans/` and `specs/` rules there, and keep plan artifacts repo-resident while respecting the local-only spec area.
- Use before changing or adding hidden agent surfaces: [`.agents/INDEX.md`](./.agents/INDEX.md) and [`.agents/docs/INDEX.md`](./.agents/docs/INDEX.md) so the surrounding navigation stays current.
- Use after any structural change that adds, removes, or moves tracked directories: update the relevant `INDEX.md` files in the same change.

## Documentation Rules

- `README.md` is the human-facing overview.
- `INDEX.md` files are navigation aids for agents and should stay descriptive, not promotional.
- If directories are added, removed, or reorganized, update the relevant index files in the same change.
- Keep this guidance current as the repository evolves.

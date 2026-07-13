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

## Documentation Rules

- `README.md` is the human-facing overview.
- `INDEX.md` files are navigation aids for agents and should stay descriptive, not promotional.
- If directories are added, removed, or reorganized, update the relevant index files in the same change.
- Keep this guidance current as the repository evolves.

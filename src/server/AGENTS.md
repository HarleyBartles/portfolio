# `src/server` Guidance

This directory contains the ASP.NET Core server scaffold.

## Read When

- Use before server source work: [`README.md`](./README.md).
- Use before implementation work: [`.agents/guides/implementing-guide.md`](../../.agents/guides/implementing-guide.md).
- Use before source-wide routing decisions: [`../AGENTS.md`](../AGENTS.md).
- Use before changing server tests: [`../../tests/AGENTS.md`](../../tests/AGENTS.md).

## Working Rules

- Keep the composition root minimal until a task asks for API behavior.
- Do not introduce authentication, database access, layered architecture, or application feature endpoints without a current requirement.
- Preserve generated `INDEX.md` navigation; regenerate the mesh instead of hand-editing indexes.

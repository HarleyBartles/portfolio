# `src/client` Guidance

This directory contains the Vite React TypeScript client scaffold.

## Read When

- Use before client source work: [`README.md`](./README.md).
- Use before implementation work: [`.agents/guides/implementing-guide.md`](../../.agents/guides/implementing-guide.md).
- Use before source-wide routing decisions: [`../AGENTS.md`](../AGENTS.md).

## Working Rules

- Keep `package.json` scripts aligned with the repository's planned client seams: `dev`, `build`, `test`, `test:watch`, and `test:e2e`.
- Do not add portfolio content, UI behavior, authentication, or data access unless the current task explicitly requires it.
- Preserve generated `INDEX.md` navigation; regenerate the mesh instead of hand-editing indexes.

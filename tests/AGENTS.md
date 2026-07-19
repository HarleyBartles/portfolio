# `tests` Guidance

This directory contains repository tooling tests and application test projects.

## Read When

- Use before test changes: [`../README.md`](../README.md).
- Use before implementation validation decisions: [`.agents/guides/implementing-guide.md`](../.agents/guides/implementing-guide.md).
- Use before server test work: [`../src/server/AGENTS.md`](../src/server/AGENTS.md).

## Working Rules

- Prefer behavior-focused tests that exercise real code.
- Keep application tests under source-specific subdirectories such as `tests/server`.
- Do not use tests to introduce product behavior outside the current task scope.

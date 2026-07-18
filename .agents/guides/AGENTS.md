# `.agents/guides` Guidance

This directory holds the task-specific stage guides for agent workflows.

## Read When

- Use before turning an idea into a planning-ready design spec: [`design-guide.md`](./design-guide.md).
- Use before translating an approved design spec into a plan: [`planning-guide.md`](./planning-guide.md).
- Use before executing an approved plan: [`implementing-guide.md`](./implementing-guide.md).
- Use before reviewing a PR, branch, or diff: [`code-review-guide.md`](./code-review-guide.md).

The generic `repo-worker-base` skill and its matching baseline reference are
required before each stage. These guides contain only Portfolio-specific
paths, commands, exclusions, and exceptions.

## Working Rules

- Keep each guide focused on one workflow step.
- Keep guide text actionable and repo-specific.
- Do not move repeatable operational procedures into this directory; use the
  optional `.agents/docs/runbooks/` home when a runbook is justified.
- If the workflow changes, update the relevant guide and this router together.

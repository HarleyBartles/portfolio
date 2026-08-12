# `.agents/runbooks` Router

This directory holds the repo-specific runbooks for agent workflow stages.

## Read When

- Use before turning an idea into a planning-ready design spec: [`design.md`](./design.md).
- Use before translating an approved design spec into a plan: [`planning.md`](./planning.md).
- Use before executing an approved plan: [`implementing.md`](./implementing.md).
- Use before reviewing a PR, branch, or diff: [`code-review.md`](./code-review.md).
- Use for testing guidance: [`testing.md`](./testing.md).
- Use for PR workflow: [`pr.md`](./pr.md).
- Use for security review: [`security.md`](./security.md).
- Use for code and writing style: [`code-style.md`](./code-style.md).
- Use for marketplace generation: [`marketplace-generation.md`](./marketplace-generation.md).
- Use for skill authoring: [`skill-authoring.md`](./skill-authoring.md).

The generic `repo-worker-base` skill and its matching baseline reference are
required before each stage. These runbooks contain only Portfolio-specific
paths, commands, exclusions, and exceptions.

## Working Rules

- Keep each runbook focused on one workflow step.
- Keep runbook text actionable and repo-specific.
- Do not move repeatable operational procedures into this directory unless they are repo-owned.
- If the workflow changes, update the relevant runbook and this router together.

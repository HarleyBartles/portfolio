# `.agents/doctrine` Guidance

This directory holds the repo's durable doctrine: policies, contracts, rule sets, and other agent-facing guidance that should be discoverable from the mesh.

## Read When

- Use before repo-workflow, worktree, branch, PR, or readiness decisions: [`workflow-policy.md`](./workflow-policy.md).
- Use before deciding where artifacts belong: [`artifact-policy.md`](./artifact-policy.md).
- Use before deciding what to validate: [`validation-policy.md`](./validation-policy.md).
- Use before scope or architecture decisions: [`coding-discipline.md`](./coding-discipline.md).
- Use before any shell-script contract or wrapper design: [`script-contract-policy.md`](./script-contract-policy.md).
- Use when you need the navigation contract for docs and indexes: [`mesh-policy.md`](./mesh-policy.md).

## Working Rules

- Keep doctrine in this directory, not in routers or guides.
- Keep the pointers short and current.
- If a doctrine file moves or a new doctrine file is added, update this router and the broader mesh in the same change.

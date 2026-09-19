# Runbooks

This directory contains only Portfolio lifecycle-stage runbooks. `using-superpowers-plus` selects the stage owner; the stage skill reads its matching runbook.

## Read When

- Design: [`design.md`](./design.md).
- Planning: [`planning.md`](./planning.md).
- Implementation: [`implementing.md`](./implementing.md).
- Code review: [`code-review.md`](./code-review.md).
- Pull request/publication: [`pr.md`](./pr.md).
- Topical concerns are available independently under [`.agents/playbooks/`](../playbooks/AGENTS.md).
- Repository workflow/readiness decisions also read [`.agents/doctrine/workflow-policy.md`](../doctrine/workflow-policy.md).

## Working Rules

- Keep lifecycle orchestration here; durable invariants belong in doctrine and conditional topical workflows belong in playbooks.
- A runbook may route to a playbook, but a playbook does not require a runbook route to be available.
- Keep declared runbook/playbook edges reciprocal and regenerate the mesh after authored routing changes.

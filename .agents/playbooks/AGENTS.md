# Playbooks

This directory contains Portfolio topical workflows. A playbook is available whenever its concern applies, whether or not a lifecycle runbook routes to it.

## Read When

- Code and technical prose: [`code-style.md`](./code-style.md).
- Testing and validation: [`testing.md`](./testing.md).
- Security, privacy, trust, credentials, or external mutation: [`security.md`](./security.md).
- Repo-owned skill authoring: [`skill-authoring.md`](./skill-authoring.md).
- Marketplace subscriptions and derived skills: [`marketplace-generation.md`](./marketplace-generation.md).
- Static asset work: [`asset.md`](./asset.md).
- Selected generated-image custody: [`generated-image-custody.md`](./generated-image-custody.md).

## Working Rules

- Durable policy and architecture invariants belong in `.agents/doctrine/`, not here.
- Playbooks compose skills, doctrine, contracts, commands, and evidence for one topical concern.
- Playbooks may compose other playbooks when the graph remains acyclic.
- Declared runbook/playbook edges must agree on both sides; `Runbook routing: None.` is valid for a directly invoked playbook.
- Regenerate the repository mesh after authored routing or file-layout changes.

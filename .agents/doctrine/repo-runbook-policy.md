# Repository Runbook and Playbook Policy

Lifecycle stages are composed in `.agents/runbooks/`; topical workflows are composed in `.agents/playbooks/`. The repository's subscriptions do not impose a fixed inventory of upstream runbooks or playbooks.

## Local composition

- Keep lifecycle guidance in runbooks and topic-specific repeatable procedures in playbooks.
- Add and retain a guide when it serves a current reader or workflow; retire it when source and usage evidence show it is obsolete.
- Link from applicable runbooks and scoped routers, and maintain those links when guidance moves.
- Avoid duplicating durable policy; link to its doctrine owner.

## Root contributor and review surfaces

- `REVIEW.md` enters through the code-review runbook.
- `CONTRIBUTING.md` enters through the applicable lifecycle runbook and exposes topical playbooks when their concern applies.

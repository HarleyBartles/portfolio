# Contributing

This repo follows the `repo-standards` and `repo-worker-base` baselines. For the canonical repo layout and runbook standard, see `.agents/doctrine/repo-runbook-policy.md`.

## Before starting

- Read root [`AGENTS.md`](./AGENTS.md) for source-of-truth, build, and routing rules.
- Invoke `/using-superpowers-plus` to route to the correct stage skill.
- Invoke `/repo-worker-base` for worktree, branch, validation, and publication boundaries.
- Invoke `/repo-standards` when the task touches repo shape, runbooks, or scaffolds.

## Stage routing

- **Design:** read [`.agents/runbooks/design.md`](./.agents/runbooks/design.md), then invoke `/brainstorming`.
- **Planning:** read [`.agents/runbooks/planning.md`](./.agents/runbooks/planning.md), then invoke `/writing-plans`.
- **Implementation:** read [`.agents/runbooks/implementing.md`](./.agents/runbooks/implementing.md), then invoke `/executing-plans` or `/subagent-driven-development`.
- **Review:** read [`.agents/runbooks/code-review.md`](./.agents/runbooks/code-review.md), then invoke `/requesting-code-review`.

## Conventions and verification

- [`.agents/runbooks/code-style.md`](./.agents/runbooks/code-style.md) for code and writing conventions.
- [`.agents/runbooks/testing.md`](./.agents/runbooks/testing.md) for what to verify.
- [`.agents/runbooks/security.md`](./.agents/runbooks/security.md) for security review guidance.
- [`.agents/runbooks/pr.md`](./.agents/runbooks/pr.md) for the pull-request workflow and publication proof.

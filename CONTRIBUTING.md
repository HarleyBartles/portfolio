# Contributing

This repository adopts the standards listed in `.agents/contracts/operating-standards.json`. Repository-specific policy and procedures are routed from `AGENTS.md` and `.agents/doctrine/repo-runbook-policy.md`.

## Before starting

- Read root [`AGENTS.md`](./AGENTS.md) for source-of-truth, build, and routing rules.
- Read [the portfolio design policy](./.agents/doctrine/portfolio-design-policy.md) before changing any visitor-facing presentation, content hierarchy, motion, imagery, typography, claim, or contact behaviour.
- Read [the portfolio writing policy](./.agents/doctrine/writing-policy.md) before changing public prose.
- Follow the applicable lifecycle runbook and repository policies; optional ambient skills may support the work but are not repository dependencies.
- Use `py -3 tools/run.py repo-checks --check` to inspect repository-owned AOM certification, plugin declarations, authored guidance, and local skills.

## Workflow routing

- **Design:** follow [`.agents/runbooks/design.md`](./.agents/runbooks/design.md).
- **Planning:** follow [`.agents/runbooks/planning.md`](./.agents/runbooks/planning.md).
- **Implementation:** follow [`.agents/runbooks/implementing.md`](./.agents/runbooks/implementing.md).
- **Review:** follow [`.agents/runbooks/code-review.md`](./.agents/runbooks/code-review.md).

## Conventions and verification

- Configure the tracked local hook once per clone with `git config core.hooksPath githooks`; it runs the complete local gate before each commit. Use focused checks while iterating and do not pre-run or immediately repeat that same complete gate around a normal commit.
- [`.agents/playbooks/code-style.md`](./.agents/playbooks/code-style.md) when code or technical prose conventions apply.
- [`.agents/playbooks/testing.md`](./.agents/playbooks/testing.md) when validation or test strategy applies.
- [`.agents/playbooks/security.md`](./.agents/playbooks/security.md) when a security, privacy, credential, trust, or external-mutation concern applies.
- [`.agents/playbooks/article-writing.md`](./.agents/playbooks/article-writing.md) for public editorial work from commission through publication proof.
- [`.agents/runbooks/pr.md`](./.agents/runbooks/pr.md) for the pull-request workflow and publication proof.
- [`docs/decisions/README.md`](./docs/decisions/README.md) for dated decision records and reconsideration triggers behind material design choices.

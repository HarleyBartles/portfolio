# Review entry point

For the repository layout and runbook standard, see `.agents/doctrine/repo-runbook-policy.md`.

## Pre-review reading

- Read root [`AGENTS.md`](./AGENTS.md) for source-of-truth and publication rules.
- For visitor-facing changes, read [`.agents/doctrine/portfolio-design-policy.md`](./.agents/doctrine/portfolio-design-policy.md) and any relevant entry in [`docs/design-decisions.md`](./docs/design-decisions.md).
- Read [`.agents/runbooks/code-review.md`](./.agents/runbooks/code-review.md) for the review lenses and methodology.
- Read [`.agents/runbooks/pr.md`](./.agents/runbooks/pr.md) for the PR workflow and publication proof requirements.
- Apply [`.agents/playbooks/security.md`](./.agents/playbooks/security.md) when the diff has a security, privacy, credential, trust, or external-mutation concern.

## Workflow routing

After `/using-superpowers-plus` has routed to the review stage, invoke:

- `/repo-standards` if the review touches repo shape or scaffolds.
- `/requesting-code-review` for the review workflow and reviewer dispatch.

## First-class review concerns

- Verify the diff against the owning specification, plan, doctrine, and current
  repository truth rather than treating generated output or historical plans as
  authority.
- Check architecture, behavior, validation, documentation, custody, and
  publication implications for the changed surfaces.
- Treat visitor-facing design judgment, generated-asset provenance, and
  repository operating-model changes as explicit review concerns when present.

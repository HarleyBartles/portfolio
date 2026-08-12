# Portfolio

This repository is the source for Harley Bartles' personal developer portfolio website.

## Repository purpose

The site exists to present Harley as a software engineer through:

- a concise professional homepage;
- project showcases, including Wild Bunch as one featured project;
- technical writing and articles;
- occasional small demos or tools when they support the portfolio.

## Source-of-truth split

- GitHub and the repository tree prove file state, landed assets, and source snapshots.
- Linear issues coordinate work but do not override the committed repo state.
- Generated artifacts (the `.agents/skills` tree and `INDEX.md` mesh) are downstream outputs; the marketplace source and `marketplace.json` are the source of truth for those assets.

## Publication proof

Repo work is not complete until it is published to GitHub. A valid return must include one of:

1. an open PR URL with branch name and full head SHA;
2. a verified direct-main commit SHA when direct-main work was explicitly authorized;
3. a concrete publication blocker.

## Build and test commands

- `py -3 tools/run.py ci --check` runs the full validation pipeline.
- `py -3 tools/run.py ci --apply` regenerates mechanical surfaces and then verifies them.

## Testing instructions

Run the canonical validation command before claiming work is complete:

```
py -3 tools/run.py ci --check
```

## Code style guidelines

- Follow the conventions in the existing `.NET`, `React`, `TypeScript`, and `Vite` application code.
- Keep documentation clear and routing surfaces up to date.
- Regenerate `INDEX.md` files after any structural change.

## Review guidelines

- Open pull requests as draft and keep them in draft while iterating.
- Flip a PR out of draft only after self-review and after `py -3 tools/run.py ci --check` passes.
- Address remote CI failures before requesting human review.

## PR instructions

- Open PRs into `main`.
- Include the branch name, head SHA, and a short test-plan in the PR body.
- Keep PRs in draft until ready for review.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor entry point and stage routing.

## Security considerations

- Do not commit secrets, API keys, or credentials.
- Keep authentication out of scope until a multi-project need justifies it.
- Review changes that touch `.gitmodules`, submodule commits, or marketplace source pinning.

## Routing pointers

- [Contributing](CONTRIBUTING.md)
- [Review entry point](REVIEW.md)
- [Repo runbook policy](.agents/doctrine/repo-runbook-policy.md)
- [Completed plans rule](.devin/rules/completed-plans.md)
- [Completed plans doctrine](.agents/doctrine/completed-plans.md)
- [Marketplace plugin selection](.agents/plugins/marketplace.json)
- [Repo mesh index](.agents/INDEX.md)

## Maintenance responsibility

Keep this router and the runbook set aligned with `repo-standards`. Regenerate the `INDEX.md` mesh after any structural change.

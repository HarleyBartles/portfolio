# Repository Guidance

This repository is the source for Harley Bartles' personal developer portfolio website.

## Repository purpose

The site exists to present Harley as a software engineer through:

- a concise professional homepage;
- project showcases, including Wild Bunch as one featured project;
- technical writing and articles;
- occasional small demos or tools when they support the portfolio.

## Source-of-truth split

- GitHub and the repository tree prove file state, landed assets, manifests, and validation.
- Linear issues coordinate work but do not override the committed repo state.

## Build and test commands

Canonical: `py -3 tools/run.py ci --check` for verification and `py -3 tools/run.py ci --apply` when mechanical surfaces need to be regenerated.

## Design quality

Before changing presentation, content hierarchy, motion, imagery, typography, public claims, or contact behaviour, read [the active portfolio design policy](.agents/doctrine/portfolio-design-policy.md). Completed design specs provide history; the active policy and [design decision ledger](docs/design-decisions.md) govern current work and its intentional evolution.

## Routing pointers

- [Repository purpose](AGENTS.md) — this file
- [Source-of-truth split](AGENTS.md)
- [Publication proof](.agents/runbooks/pr.md)
- [Build and test commands](AGENTS.md)
- [Testing instructions](.agents/runbooks/testing.md)
- [Code style guidelines](.agents/runbooks/code-style.md)
- [Review guidelines](.agents/runbooks/code-review.md)
- [PR instructions](.agents/runbooks/pr.md)
- [Contributing](CONTRIBUTING.md)
- [Security considerations](.agents/runbooks/security.md)
- [Portfolio design policy](.agents/doctrine/portfolio-design-policy.md)
- [Design decision ledger](docs/design-decisions.md)
- [Routing pointers](.devin/rules/INDEX.md)
- [Marketplace plugin selection](.agents/plugins/marketplace.json)
- [Mesh policy](.agents/doctrine/mesh-policy.md)
- [Workflow and worktree doctrine](.agents/doctrine/workflow-policy.md)
- [Repo runbook policy](.agents/doctrine/repo-runbook-policy.md)
- [Doctrine](.agents/doctrine/INDEX.md)
- [Runbooks](.agents/runbooks/INDEX.md)
- [Repo mesh index](.agents/INDEX.md)
- [Maintenance responsibility](AGENTS.md)

## Maintenance responsibility

This file is the repository's primary worker router. When repo conventions, marketplace structure, or publication rules change, update this file and the relevant doctrine in the same change.

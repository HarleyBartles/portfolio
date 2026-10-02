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

Run focused checks while iterating. The tracked pre-commit hook is the complete local gate against the staged snapshot, composed from separately named repository checks, repository validation, Python tests, Vitest, build, and Playwright journeys. It reports independent failures and skips only checks blocked by a failed dependency. Hosted CI runs the same suites as separate steps. Do not run the full `ci --check` aggregate immediately before a normal commit or repeat the complete gate after a successful hooked commit. Run suites directly while iterating, or run the aggregate only when no commit will follow or when diagnosing parity. Use `repo-standards --apply` to apply the explicitly selected repository standards, `refresh-skills --apply` to refresh declared plugin and Portfolio-owned skill projections from the pinned Marketplace source, `content-manifest --apply` for the generated content catalogue, and `route-catalogue --apply` for generated route metadata. `content-manifest.json`, `route-metadata.generated.json`, `public/robots.txt`, and `public/sitemap.xml` are generated projections owned by the normal hook and must not be hand-edited. Reserve umbrella `ci --apply` for deliberate repair of several mechanical surfaces, inspect its diff, then rely on the normal commit hook for complete verification.

## Design quality

Optional editorial polling uses an available Sheg installation and its skills, as described in the [article-writing playbook](.agents/playbooks/article-writing.md). The former repository-owned reader-panel prototype is retired.

Before changing presentation, content hierarchy, motion, imagery, typography, public claims, or contact behaviour, read [the active portfolio design policy](.agents/doctrine/portfolio-design-policy.md) and relevant [decision records](docs/decisions/README.md). The policy governs current work; the records preserve rationale and subsequent changes.

## Routing pointers

- [Repository purpose](AGENTS.md) — this file
- [Source-of-truth split](AGENTS.md)
- [Publication proof](.agents/runbooks/pr.md)
- [Build and test commands](AGENTS.md)
- [Testing instructions](.agents/playbooks/testing.md)
- [Code style guidelines](.agents/playbooks/code-style.md)
- [Review guidelines](.agents/runbooks/code-review.md)
- [PR instructions](.agents/runbooks/pr.md)
- [Contributing](CONTRIBUTING.md)
- [Security considerations](.agents/playbooks/security.md)
- [Portfolio design policy](.agents/doctrine/portfolio-design-policy.md)
- [Portfolio writing policy](.agents/doctrine/writing-policy.md)
- [Article-writing playbook](.agents/playbooks/article-writing.md)
- [Decision records](docs/decisions/README.md)
- [Routing pointers](.agents/doctrine/AGENTS.md)
- [Marketplace plugin selection](.agents/plugins/marketplace.json)
- [Operating standards](.agents/contracts/operating-standards.json)
- [Agent guidance policy](.agents/doctrine/agent-guidance-policy.md)
- [Workflow and worktree doctrine](.agents/doctrine/workflow-policy.md)
- [Repo runbook policy](.agents/doctrine/repo-runbook-policy.md)
- [Doctrine](.agents/doctrine/AGENTS.md)
- [Runbooks](.agents/runbooks/AGENTS.md)
- [Playbooks](.agents/playbooks/AGENTS.md)
- [Maintenance responsibility](AGENTS.md)

## Maintenance responsibility

This file is the repository's primary worker router. When repo conventions, marketplace structure, or publication rules change, update this file and the relevant doctrine in the same change.

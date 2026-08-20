codex-marketplace is a public agent-asset marketplace. It holds skills, runbooks, and reference material that I use across multiple repositories.

The repository started because I was copying the same skills into different projects and watching them drift. The marketplace keeps one source of truth for the shared assets and a manifest that records which version each consumer is pinned to. When a skill changes, the marketplace updates the source and consumers can pull the new revision on their own schedule.

There are 53 skills and runbooks in the marketplace today. They are not one-off prompts. Each one has a SKILL.md, authority references, a verification section, and a clear scope of when to use it and when not to use it. The marketplace also tracks provenance, so a consumer repo knows exactly which upstream revision it last synced.

The build and publication pipeline is intentional. Shared assets stay in the marketplace. Repo-owned skills stay in the repo. The boundary is enforced through a plugin manifest and a CI step that refreshes the consumer's local copy from the pinned marketplace revision. This is the shape that lets me distribute agentic engineering patterns across projects without turning every repo into a copy of every other repo.

The repository is public: [github.com/HarleyBartles/codex-marketplace](https://github.com/HarleyBartles/codex-marketplace).

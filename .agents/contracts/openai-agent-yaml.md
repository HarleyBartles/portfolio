# OpenAI Agent YAML Contract

Portfolio-owned skills declared in `repo.local_skills` adopt the pinned marketplace [OpenAI Agent YAML Contract](../plugins/marketplace-source/.agents/contracts/openai-agent-yaml.md) without a separate local schema.

Every new local skill must provide a conforming `agents/openai.yaml` before registration. Existing local skills adopt it when substantively changed; unrelated work does not require a repository-wide wrapper migration.

The wrapper describes the local skill itself. Its short description is capability copy, its default prompt directly instructs the already-selected skill, and neither surface repeats trigger discovery or uses client invocation sigils.

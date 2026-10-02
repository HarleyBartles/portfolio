# OpenAI Agent YAML Contract

Portfolio-authored skills may include an `agents/openai.yaml` wrapper. This local contract preserves the repository’s current wrapper behavior without requiring a Marketplace submodule.

Every new local skill must provide a conforming `agents/openai.yaml` before registration. Existing local skills adopt it when substantively changed; unrelated work does not require a repository-wide wrapper migration.

The wrapper describes the local skill itself. Its short description is capability copy, its default prompt directly instructs the already-selected skill, and neither surface repeats trigger discovery or uses client invocation sigils.

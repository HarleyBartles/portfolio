# Skill Frontmatter Contract

Portfolio-owned skills declared in `repo.local_skills` adopt the pinned marketplace [Skill Frontmatter Contract](../plugins/marketplace-source/.agents/contracts/skill-frontmatter.md) without a separate local schema.

Every new local skill must satisfy that contract before registration. Existing local skills adopt it when substantively changed; unrelated work does not require a repository-wide metadata migration.

For local first-party custody, `metadata.source-path` names the canonical `.agents/skills/<name>/SKILL.md` path, `metadata.source-category` is `first_party`, and provenance describes the Portfolio-owned source truth. The exact skill name remains declared in `.agents/plugins/marketplace.json`; naming prefixes do not establish custody.

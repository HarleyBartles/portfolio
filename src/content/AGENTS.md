# `src/content` Guidance

This directory contains repository-owned public portfolio content.

## Read When

- Use before changing publishable Markdown or `content-manifest.json`.
- Use before changing server content metadata expectations: [`../server/AGENTS.md`](../server/AGENTS.md).

## Working Rules

- Keep `content-manifest.json` as the canonical index of publishable content metadata.
- Keep Markdown files focused on narrative body content; do not duplicate navigation metadata there.
- Preserve the public/private boundary: no employer-confidential details, private contact details, credentials, internal URLs, or unsafe generated assets.
- Keep content repository-owned. Do not add a CMS, database, authentication, API endpoint, or React route from this directory.

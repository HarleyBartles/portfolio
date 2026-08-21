# Security runbook

Use this runbook for security review and safe-handling guidance.

## Must do

- Do not commit secrets, API keys, or credentials.
- Keep authentication out of scope until a multi-project need justifies it.
- Review changes that touch `.gitmodules`, submodule commits, or marketplace source pinning.

## Review lenses

- Verify no credentials, private filesystem paths, or internal URLs are added to public content under `src/client/src/data/content/`.
- Treat `src/client/dist/` as the complete deployable product: verify it contains no source maps, private paths, credentials, or runtime-only configuration.
- Keep contact delivery disabled unless a reviewed, abuse-resistant external form endpoint is intentionally configured; never publish a personal email address or telephone number as a shortcut.
- Verify dependency or toolchain changes do not introduce unnecessary trust boundaries.

## See also

- `.agents/runbooks/code-review.md` for the review workflow.
- `.agents/doctrine/coding-discipline.md` for scope boundaries.

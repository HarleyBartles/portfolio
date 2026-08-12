# Security runbook

Use this runbook for security review and safe-handling guidance.

## Must do

- Do not commit secrets, API keys, or credentials.
- Keep authentication out of scope until a multi-project need justifies it.
- Review changes that touch `.gitmodules`, submodule commits, or marketplace source pinning.

## Review lenses

- Verify no credentials or internal URLs are added to public content under `src/content/`.
- Verify the `.NET` server does not expose unsafe endpoints or debug surfaces.
- Verify dependency or toolchain changes do not introduce unnecessary trust boundaries.

## See also

- `.agents/runbooks/code-review.md` for the review workflow.
- `.agents/doctrine/coding-discipline.md` for scope boundaries.

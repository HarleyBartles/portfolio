# Shell copy cleanup implementation plan

Status: completed-awaiting-retirement

## Approved scope

Remove redundant shell commentary identified in the site-wide source audit. Article bodies, project narratives and professional biography are outside this change.

Preserve "I've shown you how I work", "Follow the trail" and "Tell me about it". Change only "Then tell me what you're building" to "Tell me what you're building".

## Execution

- [x] Simplify sharing, CV download, index headings, Patch group introductions, contact fallback and loading/error copy. Make IndexHeader supporting fields optional. Keep accessible state feedback and reveal a usable URL when automatic sharing/copying fails.
- [x] Update existing assertions affected by approved copy changes. Add behavior coverage only for the newly conditional manual-copy fallback, including rejected clipboard access.
- [x] Regenerate route metadata from its source, inspect responsive layouts, run focused checks, obtain fresh review and commit through the tracked hook.
- [x] Prepare the draft PR handoff with the preserved user decisions and explicit validation limitations. Publication and hosted check evidence belong in the PR and task handoff.

## Acceptance

Controls remain usable with keyboard and assistive technology. Removed copy leaves no empty layout columns. Page titles are Writing and Projects. Contact failure states remain honest. Article bodies and the three explicitly preserved homepage phrases are unchanged.

## Validation and review record

Focused shell checks passed (38 tests); six sharing behavior tests cover successful sharing/copying, cancellation, native failure and unavailable/denied clipboard access. The two repaired test files passed 22 checks; five affected browser checks passed with the four intended baseline updates. A fresh final code review found no actionable findings after both sharing corrections. The normal commit hook owns the complete local gate; the published PR records its result and hosted checks.

Responsive inspections covered relevant affected surfaces across 1440, 768, 390 and 320 CSS pixels, with visible keyboard focus. Actual 200% browser zoom could not be established through the in-app browser shortcuts and is not claimed. Existing narrow-width tests are not actual zoom evidence.

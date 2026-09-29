# Marketplace Link Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** active

**Goal:** Repair all five broken Marketplace links found across the 26 published Portfolio routes and publish a draft PR.

**Architecture:** Change only Markdown destinations in the two affected articles. Pin retired planning documents and the article's 22-skill bundle evidence to Marketplace commit `59746904a5e8f787cc53a7d4c42833de0068d439`; use current canonical `skills/` paths for the two skill references.

**Tech Stack:** Markdown content, React/Vite renderer, GitHub HTTP/API checks, Python validation, tracked commit hook.

**Spec:** The user's approved request to repair every broken Marketplace link, preserve planning-document citations through Git history, and open a draft PR. The live audit found five HTTP 404 destinations among 15 unique destinations across 17 rendered link occurrences.

**Execution Strategy:** `executing-plans`. These five destinations share one audit and one article-evidence contract; keeping one context avoids redundant reconstruction while a fresh reviewer checks the final diff.

## Global Constraints

- Preserve all article wording, labels, metadata, presentation, and working historical citations.
- Do not change Marketplace source, the submodule pin, or dependency versions.
- No new change-detector tests: the defect is external destination availability, proven by real HTTP/API checks and rendered anchors.
- Generated content and route catalogues remain generator-owned; let the normal hook regenerate them.
- Retire the eligible predecessor migration plan in the first commit, as required by the planning-artifact lifecycle. Retain this plan through the completing PR.
- Commit normally, push, open a draft PR, and verify its head and hosted checks. Ready and merge remain human-owned.

## Review Focus

- Historical documents must use full commit SHAs that contain the cited files.
- The bundle citation must retain evidence of 22 skills, while current main contains 23.
- Canonical skill destinations must still support the associated claims.

### Task 1: Repair destinations and publish the verified draft

**Files:**

- Modify: `src/client/src/data/content/writing/2026-08-07-i-made-agentic-engineering-harder-than-it-needed-to-be.md`.
- Modify: `src/client/src/data/content/writing/2026-09-05-use-superpowers.md`.
- Retire: `.agents/plans/2026-09-29-portfolio-ambient-standards-migration.md`, already marked complete on current main; its operating rules are in current doctrine, runbooks, and standards.
- Retain: this plan, marked complete after verification and review.

**Interfaces:**

- Consumes: the five live-audited broken URLs and verified GitHub replacement blobs.
- Produces: five resolving article destinations with unchanged visible copy, plus a verified draft PR.

- [ ] Replace `blob/main/.agents/skills/cleanup-custody/SKILL.md` with `blob/main/skills/cleanup-custody/SKILL.md`.
- [ ] In the two planning-document URLs, replace `blob/main/` with `blob/59746904a5e8f787cc53a7d4c42833de0068d439/` and retain their original file paths.
- [ ] Pin the bundle-manifest URL to the same historical SHA and retain its original `codex-marketplace/plugins/superpowers-plus/references/bundle-manifest.json` path; verify its 22 entries.
- [ ] Replace the review-mapping path with `blob/main/skills/selecting-a-subagent/references/codex-multi-agent-v2-profile.md`; verify `reviewer-strong` still names Sol.
- [ ] Verify every Marketplace destination in the edited source with HTTP and GitHub API, and check the five rendered anchors on both local direct routes. Expected: all destinations resolve, labels are unchanged.
- [ ] Run `py -3 -m tests.validation.link_hygiene`; expected: no link-hygiene failures. Existing baseline: `py -3 -m unittest tests.test_link_hygiene`.
- [ ] Obtain a fresh prepared-diff review and resolve any actionable findings.
- [ ] Mark this plan `completed-awaiting-retirement`, commit normally, and observe the complete tracked hook passing.
- [ ] Push and create a draft PR using the repository template; verify its exact head SHA and hosted check state, and attach it to this chat.

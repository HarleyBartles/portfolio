# Retire the Portfolio reader-panel prototype

Status: completed-awaiting-retirement.
Base: current `origin/main`, `d2960935bd82f5b28855a928d2b871f391be81bf`.

## Goal and scope

Retire the repository-owned `simulated-reader-polling` prototype now that Sheg supplies the polling tool and process. Remove its scripts, tests, assets, references and registration. Update active editorial guidance to use an available Sheg installation without adding a repository plugin subscription or copying Sheg into this repository. Preserve historical field notes, public article text and off-repo study evidence.

## Steps

- [x] Remove the prototype skill and its local-skill declaration.
- [x] Update article-writing guidance and the active editorial inventory plan; identify historical field-note references as history.
- [x] Regenerate skill provenance and verify no active prototype commands or routes remain.
- [x] Remove the homepage-wide pixel snapshot that varied with the daily homepage edition; retain the stable portrait lockup check.
- [x] Review the diff, pass the tracked commit hook and publish a draft PR with verified remote evidence.

## Validation

The existing article-writing behavior tests establish the clean baseline. Skill-refresh check mode and repository validation verify the remaining guidance and declarations. Learning Lab evidence accepts an undated planned state while still rejecting stale dated targets. The normal commit hook owns the complete staged-tree gate; do not repeat its aggregate around a successful hooked commit.

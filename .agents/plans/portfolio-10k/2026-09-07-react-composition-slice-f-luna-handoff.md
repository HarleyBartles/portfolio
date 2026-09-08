# Slice F Luna implementation handoff overlay

This file is a bounded execution overlay for `.agents/plans/portfolio-10k/2026-09-07-react-composition-slice-f.md`.

Read the base plan first, then this overlay. Where this file is more specific or conflicts with the base plan, this file wins. It does not change the accepted Slice F architecture or scope; it removes avoidable implementation discovery and corrects execution details found during the handoff review.

## Execution role

- **Implementer:** one Luna implementation agent, sequentially executing Tasks 1 through 8.
- **Do not delegate or create child workers.** The base plan's phrase `Subagent-driven development under one Sol orchestrator` is superseded for this handoff.
- Luna owns implementation mechanics, focused tests, generated-output refreshes, browser verification and normal hooked commits.
- Luna does **not** own new architecture or art-direction decisions. Escalate to Sol/Harley only for one of the explicit stop conditions below.

## Exact current branch facts

- Branch: `codex/react-composition-slice-f-plan`.
- Accepted implementation baseline: `427b990bc2090d0478772b8ef903275f7e7f4b04`.
- Base Slice F plan commit: `f3d97a7c762aec4977e6da1cfbfcec4b6dd3a58b`.
- Start implementation from the latest planning-only HEAD on this branch, with both the base plan and this overlay present.
- Current Patch evidence file is exactly `src/client/src/data/case-studies/patch-evidence.json`. The base plan's `src/client/src/data/patch/patch-evidence.json (or...)` wording is wrong and is superseded.

## Canonical Patch route table

Use these exact paths throughout code, tests, generated route documents and browser verification:

| Story/surface | Canonical path |
| --- | --- |
| Patch index | `/patch` |
| Identity Emporium | `/patch/identity-emporium` |
| Tournament of Reasonable Defaults | `/patch/tournament-of-reasonable-defaults` |
| The Usual Specialists | `/patch/the-usual-specialists` |
| Legacy Specialists alias | `/patch/lawful-heist` -> replace redirect to `/patch/the-usual-specialists` |
| Goldilocks | `/patch/goldilocks` |
| Sorcerer's Apprentice | `/patch/sorcerers-apprentice` |

The base plan's `/patch/tournament` references are wrong and are superseded by `/patch/tournament-of-reasonable-defaults`.

## Exact current focused test targets

These files already exist at the implementation baseline unless the plan explicitly says they are created/renamed:

- `src/client/src/pages/PatchRoutes.test.tsx` — route/index/direct-story/legacy redirect coverage; it already uses `createMemoryRouter(appRoutes, ...)`, so add the lawful-heist -> Specialists redirect assertion here rather than inventing a new router test file.
- `src/client/src/pages/PatchIndexPage.test.tsx` — Patch index-specific behaviour.
- `src/client/src/pages/ContentPage.test.tsx` — generic content/header seam and continuation assertions.
- `src/client/src/features/patch-showcase/IdentityEmporiumPage.test.tsx` — Identity focused coverage.
- `src/client/src/features/patch-showcase/TournamentPage.test.tsx` — Tournament focused coverage.
- `src/client/src/features/patch-showcase/LawfulHeistPage.test.tsx` — rename with the implementation to `UsualSpecialistsPage.test.tsx`.
- `src/client/src/features/case-study/projectPresentations.test.tsx` — specialist presentation registry/lazy resolution; update when `patch-lawful-heist` becomes `patch-usual-specialists`.
- `src/client/scripts/generate-route-documents.test.ts` — static route-document/canonical metadata proof.
- `src/client/src/features/home/homepageEdition.test.ts` — homepage Patch destination expectations.
- `src/client/src/features/writing/WritingContinuations.test.tsx` and `src/client/e2e/writing-navigation.spec.ts` — writing continuation/link proof.

Do not spend time searching for alternative colocated test names unless one of these files has genuinely moved after this planning overlay.

## Dependency map

Execute in this order. The `Consumes`/`Produces` statements below make the task boundaries normative.

### Task 1

**Consumes:** baseline brand SVGs and current homepage/article consumers.

**Produces:** `PatchBrand.tsx`, canonical brand asset paths, canonical Specialists wordmark custody, updated homepage/article consumers and custody/design records.

### Task 2

**Consumes:** Task 1 Patch brand API/assets; current `ContentPage`/`PatchPage`/router/manifest seams.

**Produces:** canonical Specialists slug/path, lawful-heist compatibility redirect, generated legacy route document, generic `headerVisual` seam, Patch story header branding, first-party canonical links.

### Task 3

**Consumes:** Tasks 1-2 brand/header seams; current Identity React/evidence/Sass implementation.

**Produces:** Identity local styled-components ownership and no Identity dependency on shared Patch Sass.

### Task 4

**Consumes:** Tasks 1-2 brand/header seams; current Tournament React/Sass implementation.

**Produces:** Tournament local styled-components ownership, semantic visual selectors and preserved accepted story-body geometry.

### Task 5

**Consumes:** Tasks 1-2 canonical Specialists route/brand seam; current Lawful Heist component/test/Sass/presentation registration.

**Produces:** `UsualSpecialistsPage.tsx`, `UsualSpecialistsPage.test.tsx`, `patch-usual-specialists` presentation vocabulary, local styled-components ownership, deleted `LawfulHeistPage.scss`.

### Task 6

**Consumes:** Tasks 1-2 Patch brand/canonical route data plus current Patch index.

**Produces:** branded Patch series front door, local index styled-components ownership and canonical Specialists index link.

### Task 7

**Consumes:** completed Tasks 3-6 migrations.

**Produces:** deleted `PatchShowcase.scss`, explicit specialist lazy-load isolation proof, expanded Patch accessibility matrix and final story visual custody.

### Task 8

**Consumes:** Tasks 1-7 complete implementation tree.

**Produces:** final focused/build/browser/visual/hooked-CI proof and clean worktree.

## Task-specific corrections

### Task 2

- Use `src/client/src/data/case-studies/patch-evidence.json`.
- Add the legacy redirect assertion to `src/client/src/pages/PatchRoutes.test.tsx` using its existing `renderRoute()` helper and router state assertion pattern used by the `/fairytales/*` redirects.
- Change current manifest slug `lawful-heist` -> `the-usual-specialists` and current title -> `The Usual Specialists`.
- Change all first-party links to `/patch/the-usual-specialists`.
- Keep `/patch/lawful-heist` only in explicit compatibility code/tests or historical provenance.
- For generated static compatibility, add `/patch/lawful-heist` to `LEGACY_ROUTES` with canonical route `/patch/the-usual-specialists`; do not create a second indexable manifest entry.

### Task 3

- The focused test file is `src/client/src/features/patch-showcase/IdentityEmporiumPage.test.tsx`; modify it, do not invent another Identity test surface.

### Task 4

- The canonical Tournament route is `/patch/tournament-of-reasonable-defaults` everywhere.
- The focused test file is `src/client/src/features/patch-showcase/TournamentPage.test.tsx`.

### Task 5

- Rename both `LawfulHeistPage.tsx` and `LawfulHeistPage.test.tsx` to the `UsualSpecialistsPage` names in the same task.
- Update `src/client/src/features/case-study/projectPresentations.test.tsx` together with `projectPresentations.ts`; this registry test is part of the required focused proof, not an optional fixture hunt.

### Task 6

- Include `src/client/src/pages/PatchIndexPage.test.tsx` in the focused unit proof as well as `PatchRoutes.test.tsx`.

### Task 7

Use exact routes in lazy-load and accessibility proof:

- `/patch/identity-emporium`
- `/patch/tournament-of-reasonable-defaults`
- `/patch/the-usual-specialists`
- `/patch/lawful-heist` only as redirect compatibility

## Exact final focused command

The base plan's backslash-split `npm test` example is not valid PowerShell continuation syntax. Use this single PowerShell-safe command instead from `src/client`:

```powershell
npm test -- --run src/features/patch-brand/PatchBrand.test.tsx src/features/home/homepageAssets.test.ts src/features/home/homepageEdition.test.ts src/features/writing/RianHughesArticle.test.tsx src/features/writing/WritingContinuations.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchIndexPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/patch-showcase/IdentityEmporiumPage.test.tsx src/features/patch-showcase/TournamentPage.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/case-study/projectPresentations.test.tsx scripts/generate-route-documents.test.ts
npm run routes:check
npm run build
```

Then perform the base plan's residue searches, production-render checks, Windows visual checks and normal hooked final commit.

## Luna discretion boundary

Luna may decide only local implementation mechanics that do not change observable contracts, for example styled-component identifier names, whether two local wrappers can be one component, or equivalent CSS syntax.

Stop and escalate rather than improvise if any of these occurs:

1. Preserving the accepted Identity/Tournament/Specialists story-body screenshots appears impossible without a visible redesign beyond the approved persistent Patch brand header.
2. A requested shared abstraction is necessary to complete more than one story migration but would create a new cross-story semantic API not specified in the plan.
3. The canonical `/patch/the-usual-specialists` change conflicts with a deployment/SEO mechanism that cannot represent the planned static legacy document + client replace redirect.
4. Build-budget recovery would require removing content/evidence or materially weakening lazy-loading boundaries.
5. A source/evidence rename would destroy provenance rather than merely update current public naming.
6. The branch has moved to contain substantive Slice F implementation before Luna starts; reconcile with Sol rather than replaying the plan over unknown work.

Everything else within the stated contracts is implementation work, not a reason to reopen design.

## Per-task plan tracking

At the end of each task, after focused verification and the normal commit, mark that task's existing `[ ] Task N complete` checkbox in the base plan `[x]` in the next plan-tracking commit or alongside the next bounded documentation update. Do not mark future tasks complete early.

The final Task 8 checkbox and completion-contract boxes are marked only after their stated proofs exist.

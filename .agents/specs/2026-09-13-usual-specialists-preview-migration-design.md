# The Usual Specialists preview migration design

**Status:** Approved design; migration implemented and review-complete locally on 13 September 2026. Publication remains separately gated.

**Implementation closeout:** The migration boundary, route ownership, metadata contract, PR slicing and cutover sequence were approved and executed on the existing PORT-17 branch. Final local review found no Critical or Important implementation issues; push, PR-state changes and merge remain separate authority gates.

**Scope:** Make the long-running PORT-17 work mergeable without replacing the currently published The Usual Specialists page before the new six-Specialist edition is complete.

## Problem

PORT-17 has grown into a large, long-running branch while the replacement The Usual Specialists presentation is still early in its six-Specialist sequence.

Keeping the branch open until all six Specialists are complete would continue to enlarge the PR, increase merge drift and make review progressively harder. Merging the current branch directly onto the canonical `/patch/the-usual-specialists/` route would expose an incomplete replacement and remove the currently published finished page.

The repository therefore needs a temporary migration seam that allows incomplete V2 work to live safely on `main` without making incomplete V2 the canonical public experience.

## Decision

Use a strangler-style parallel edition during construction.

- `/patch/the-usual-specialists/` remains the public, indexed canonical route and renders the frozen published legacy presentation.
- `/patch/the-usual-specialists/next/` becomes an explicit deployed preview route for the new document-world presentation.
- The preview route is deliberately unlinked, omitted from public discovery surfaces, omitted from the sitemap and marked `noindex, nofollow`.
- The preview route is still a real deployed route with its own generated static route document so direct GitHub Pages navigation and visual review work throughout construction.
- The current PORT-17 PR becomes the V2 foundation and migration PR rather than the PR that must finish the whole replacement.
- After that PR merges, each remaining Specialist is developed in an ordinary bounded PR from fresh `main`.
- Final cutover is a small route-ownership change made only after the complete V2 has been reviewed on the deployed preview route.

The governing invariant is:

> `main` may contain incomplete V2 implementation, but incomplete V2 must never become the canonical The Usual Specialists experience.

## Why this approach

### Explicit preview route outside the content manifest

The repository already separates content discovery from React routing:

- The canonical Specialists entry is manifest-driven and participates in route metadata, Patch discovery, sitemap generation and related-content behaviour.
- React Router can host an explicit route that is not a manifest content item.
- The static route-document generator already knows how to render `noindex` pages without canonical or social URL metadata.

The preview is not public portfolio content yet, so it should not pretend to be another content-manifest item. Keeping it outside the manifest avoids teaching every catalogue, navigation and sitemap consumer to special-case one intentionally hidden entry.

### Rejected alternatives

#### Keep the mega-PR open until all six Specialists are finished

Rejected because the branch and review surface are already large before two Specialists are complete. The cost grows with every additional chapter, asset commission and responsive contract.

#### Use stacked dependent PRs

Rejected because the work is visually and architecturally cumulative. Six dependent PRs would replace one long-lived branch with a stack of branches requiring cascading rebases and a final integration burden.

#### Put V2 behind a query parameter or URL-sensitive presentation switch

Rejected because route identity, metadata and testing would become conditional inside the canonical content flow. The temporary seam would be less visible in code and harder to remove cleanly.

#### Add `next` as another content-manifest item

Rejected because it would enter the same discovery model as real public portfolio content and then require exclusions from navigation, related content, route metadata and sitemap behaviour.

#### Keep V2 local-only until final cutover

Rejected because the remaining work needs a stable deployed target for responsive inspection, screenshots and end-to-end verification across several future PRs.

## Presentation ownership during migration

### Canonical legacy presentation

Recover the currently published pre-PORT-17 Specialists implementation from repository history and preserve it as a frozen `LegacyUsualSpecialistsPage`.

During construction, the existing manifest presentation identity `patch-usual-specialists` resolves to `LegacyUsualSpecialistsPage`.

The legacy component is a frozen compatibility surface. Future Specialist PRs must not redesign, refactor or progressively migrate it. Its purpose is only to preserve the published experience until V2 is ready.

### V2 presentation

Keep the current document-world implementation named `UsualSpecialistsPage`.

Do not rename the existing V2 component tree merely because it is temporarily reached through `/next/`. The current PORT-17 naming already describes the intended final page, and preserving that identity keeps the final cutover small.

The explicit `/patch/the-usual-specialists/next/` route lazy-loads this V2 `UsualSpecialistsPage` directly.

### Final ownership

After V2 is complete and accepted:

- `patch-usual-specialists` resolves to `UsualSpecialistsPage` again;
- the explicit `/patch/the-usual-specialists/next/` route is removed;
- the preview-route static document registration is removed;
- `LegacyUsualSpecialistsPage` is retired either in the cutover PR or, preferably, in one immediately following cleanup PR.

The public content manifest, canonical URL, inbound links, sitemap entry and public route identity do not change during final cutover.

## Route contract

### Canonical route

`/patch/the-usual-specialists/`

- remains linked from the Patch index and every existing public inbound surface;
- remains present exactly once in the route catalogue and sitemap;
- remains indexable;
- keeps its existing canonical URL;
- renders the frozen legacy presentation during construction;
- must not expose incomplete V2 content before the final cutover.

### Preview route

`/patch/the-usual-specialists/next/`

- is a real React Router route;
- is directly addressable in development and deployed environments;
- renders `UsualSpecialistsPage` under the same site chrome/full-frame contract intended for final publication;
- is not represented as a content-manifest item;
- is not linked from the homepage, Patch index, writing continuations, related content or other public navigation;
- is absent from the generated public route catalogue;
- is absent from the sitemap;
- is marked `noindex, nofollow` at runtime and in its generated static route document;
- emits no canonical URL;
- emits no `og:url` or social-image URL metadata that would imply a published canonical identity.

There is no redirect between the canonical and preview routes during construction.

## Preview route-document model

The static site must serve `/patch/the-usual-specialists/next/` directly rather than relying on the custom 404 fallback to bootstrap the SPA.

Add a small explicit preview-route concept to the route-document generation layer, separate from `buildRouteCatalogue()` and the content manifest.

The preview registration should contain only what the static generator needs to create the document, for example:

- path;
- title;
- description;
- `indexability: 'noindex'`.

Do not add discovery metadata that the preview does not need. In particular, do not give preview registrations content kind, share action, related slugs or public social-card semantics merely to resemble normal route-catalogue entries.

The existing `renderMetadata()` noindex branch is the authority for static preview metadata. It already removes canonical, Open Graph and Twitter metadata and emits `noindex, nofollow`.

At runtime, the preview page should use the existing `DocumentMetadata` no-index semantics rather than creating another metadata component or SEO mode.

## Public route validation

The preview must be deployed and tested without becoming part of the set described as public discoverable routes.

Keep `expected_public_routes()` manifest-driven for public portfolio surfaces. Do not add `/next/` to that list.

Add a separate explicit preview-route validation path with this contract:

- HTTP 200;
- `Content-Type: text/html`;
- non-empty title;
- robots metadata is `noindex, nofollow`;
- no canonical link is present;
- response is not the generic GitHub Pages error document.

This distinction matters: the preview is deployed surface area and must be verified, but it is not public discovery content.

## Current PORT-17 PR boundary

The current long-running PR stops being “finish The Usual Specialists.” It becomes the V2 foundation and migration PR.

Its final scope is:

- restore the frozen published legacy presentation as the canonical route body;
- introduce the explicit `/patch/the-usual-specialists/next/` preview seam;
- retain the new opening/header composition;
- retain the complete accepted Index chapter;
- retain the accepted Index-to-Silk rope, crossing and ownership architecture;
- retain the current Silk work and commissioned assets already present on the branch;
- retain the responsive strategy and visual contracts established during PORT-17;
- retain the component-ownership conventions established by the Index and Silk work;
- move V2-specific route, structural, responsive and visual regression coverage to `/next/` where appropriate;
- add route, metadata, discovery and deployment tests for the migration seam.

The PR must not add Writ.

The PR does not need to extend Silk merely to create a more narratively satisfying stopping point. Existing accepted current Silk work is enough to establish the foundation.

## PR sequence after the foundation merge

Once the foundation PR lands, close the long-running branch and return to ordinary work from current `main`.

Expected sequence:

1. Finish Silk in a bounded PR if remaining Silk work is still required.
2. Add Writ in its own PR.
3. Add Klause in its own PR.
4. Add Rollback in its own PR.
5. Add Receipt in its own PR.
6. Run whole-page integration, pacing and polish in its own PR.
7. Cut over the canonical route in a deliberately small release PR.
8. Remove the frozen legacy component in the cutover PR or a tiny immediately-following cleanup PR.

Each Specialist PR starts from fresh `main`. Do not rebuild a long-lived V2 integration branch after this migration seam exists.

## Rules for subsequent Specialist PRs

Until the final cutover, every Specialist PR must leave both route contracts valid:

- canonical route: frozen legacy, unchanged;
- preview route: evolving V2, improved by the PR.

Ordinary Specialist PRs must not:

- switch the canonical presentation to V2;
- alter or progressively refactor the frozen legacy page;
- publish links to `/next/`;
- add `/next/` to sitemap or ordinary route catalogue generation;
- change the preview route into a query flag or content-manifest item;
- introduce another preview URL for the same edition.

If a future change genuinely requires modifying the migration seam, treat that as an explicit architecture change rather than folding it casually into a Specialist PR.

## Test migration strategy

### Canonical-route proof

Tests for `/patch/the-usual-specialists/` must prove that the published legacy page remains intact during construction.

At minimum, prove:

- route resolves normally;
- expected legacy six-Specialist experience is present;
- canonical metadata remains indexable and unchanged;
- public Patch links still target the canonical URL;
- the canonical route does not render the V2 draft visual contract.

### Preview-route proof

Tests for `/patch/the-usual-specialists/next/` must prove that V2 is directly reachable and owns the current PORT-17 composition.

The existing PORT-17 browser contracts for Index, Silk, rope topology, responsive geometry, ultrawide ceiling behaviour and protected visual snapshots should target the preview route once the seam is introduced.

Do not duplicate the same full V2 visual suite against both URLs. During construction, V2 has one route owner: `/next/`.

### Discovery isolation proof

Focused tests must prove that `/next/` does not appear in:

- Patch index links;
- homepage links;
- writing continuations;
- related-content navigation;
- generated sitemap;
- generated route metadata catalogue.

Do not attempt to scan every rendered anchor in every page if existing focused authorities already cover these discovery surfaces. Test the generators and owning surfaces directly.

### Static metadata proof

Route-document generator tests must prove that the preview document:

- is written to `dist/patch/the-usual-specialists/next/index.html`;
- carries a preview-appropriate title and description;
- contains `noindex, nofollow`;
- contains no canonical link;
- contains no `og:url`;
- contains no social-image metadata inherited from a public route.

### Deployed route proof

The public-route checker should validate public and preview routes as separate classes. The preview assertion must verify reachability and noindex metadata without treating the preview as a canonical public route.

## Final cutover procedure

Cutover happens only after all six Specialists and whole-page integration have been accepted on the deployed preview route.

The cutover PR should contain as little creative work as possible.

1. Point `patch-usual-specialists` at the completed `UsualSpecialistsPage`.
2. Remove the explicit `/patch/the-usual-specialists/next/` React Router route.
3. Remove the preview static-route registration and preview-specific deployed-route check.
4. Move route-level V2 tests from `/next/` to `/patch/the-usual-specialists/`.
5. Confirm the canonical content manifest entry, public route metadata and sitemap still describe the same public URL as before.
6. Verify `/next/` is no longer a known generated route.

Prefer leaving `LegacyUsualSpecialistsPage` in place for the cutover PR itself if retaining it makes immediate rollback simpler. Delete it in one small follow-up cleanup once the new canonical deployment has been inspected and accepted.

Do not introduce a redirect from `/next/` unless a later user decision explicitly requires one. The preview URL is intentionally unlinked and temporary, so a clean removal is sufficient by default.

## Rollback strategy

Before final cutover, rollback is naturally bounded because the canonical route never left the legacy presentation.

After cutover, if the legacy component is still present, rollback is a presentation-map reversal: point `patch-usual-specialists` back to `LegacyUsualSpecialistsPage` and restore the preview route only if continued V2 inspection is needed.

This is another reason to prefer deleting the legacy component in a separate immediate cleanup PR rather than coupling deletion to the route switch.

## Non-goals

This migration does not:

- redesign either Specialists edition;
- change the accepted Index or Silk visual contracts;
- change the current compositional React/styled-components ownership doctrine;
- change the public content slug or canonical URL;
- create authentication or access control for the preview;
- create a generic preview framework for arbitrary portfolio pages;
- create an environment flag, query parameter or CMS state for edition selection;
- publish the preview in navigation or discovery surfaces;
- define the content or visual design of Writ, Klause, Rollback or Receipt;
- decide whether final legacy deletion shares the cutover PR or follows immediately after it beyond the stated preference for a separate cleanup.

## Success criteria

The migration is successful when:

1. The current PORT-17 work can merge without changing what ordinary visitors see at `/patch/the-usual-specialists/`.
2. The current V2 is inspectable at deployed `/patch/the-usual-specialists/next/`.
3. The preview is `noindex`, has no canonical identity and is absent from public discovery surfaces.
4. Current V2 structural, responsive and visual tests run against the preview route.
5. Future Specialists can land in bounded PRs directly onto `main` without touching the canonical legacy experience.
6. Final publication requires a small explicit cutover rather than merging a giant accumulated implementation branch.
7. Removing the preview seam after cutover leaves one canonical Specialists route and one V2 implementation with no permanent migration machinery.

## Planning boundary

The implementation plan should cover only the migration work required to make the current PORT-17 PR mergeable:

- recover and freeze the legacy component;
- introduce the explicit preview route;
- add static preview-route generation and metadata behaviour;
- redirect V2 tests to the preview route where required;
- add public/preview route validation and discovery-isolation proof;
- verify the current dirty V2 implementation remains visually unchanged.

Do not include future Silk completion, Writ, Klause, Rollback, Receipt, integration polish or final cutover implementation in this plan.

# Phase 8 React homepage implementation handoff

**Status:** Harley approved the production React translation on `codex/phase-8-homepage-editorial-room`. PR #48 is in merge-ready closeout; visual proof and staging artefacts are retained in Git history only.

## Standing production surface

`/` now renders the accepted six movements in a fixed editorial order: opening, Agent Asset Marketplace, Wild Bunch, Writing, The Usual Specialists, and the professional close. `HomePage` is a small orchestrator. Each movement is a focused React component under `src/client/src/features/home/`, and `HomePage.scss` owns the homepage-only visual translation.

The previous navigation-query gate, randomized lead, supporting-card deck, shuffle controls, ordering utility, catalogue, tests, screenshots, and dead global selectors are retired. Interior `ProjectVisual` consumers remain intact.

## Edition seam and copy ownership

`homepageEdition.ts` defines discriminated Writing and Patch descriptors and a pinned default edition. A descriptor owns its destination route, inward label, incoming teaser, and feature-specific copy/presentation data. The shell only selects an edition and passes the next descriptor to the current movement, so the Wild Bunch-to-Writing and Writing-to-Patch teasers change with their destinations rather than being duplicated in `HomePage`.

Selection is deterministic and stable. No date, cookie, network, or random policy exists. A future rotation policy remains a separate editorial decision.

## Assets and failure behaviour

Accepted production assets live under `src/client/public/media/homepage/`; `docs/asset-custody.md` records source identity, dimensions, output hashes, rights, semantic role, and fallbacks. Existing SVG/WebP files were promoted byte-for-byte. The seven accepted PNG masters became full-dimension WebP derivatives to meet the repository's 400 KB public-image ceiling; no artwork was regenerated, cropped, or downsampled.

Production source contains no `docs/editorial-drafts` asset reference. Wild Bunch topology is semantic HTML/CSS, so its decorative materials may fail without changing the claim. Specialists switches to a solid black field and an explicit semantic text fallback if any scene asset fails. Both outlined wordmarks retain real hidden heading text, and Klause remains an absolute zero-flow overprint.

## Rendered evidence

The production build was rendered and inspected on Windows Chromium after every lazy image decoded at:

- `1440 × 1000`
- `984 × 912`
- `768 × 900`
- `390 × 844`
- `320 × 844`

The homepage browser spec also exercises the accepted boundary pairs `1279/1280`, `900/901`, `720/721`, `520/521`, and `1099/1100`, together with the five inspection widths. Every width reported zero document overflow. Reduced motion keeps native, immediate scrolling. The 200% pass uses Chromium's 2× page scale on the 1440 viewport and is paired with the 720 CSS-pixel reflow contract.

No production translation defect required Fold 2 to be reopened. The only deliberate proof-to-production deviations are the repository-compliant WebP derivatives, production `Link` routing, the retained `SiteHeader`/`SiteFooter`, and component-owned media failure state.

## Verification record

- Focused Vitest contract: `homepageEdition.test.ts` and `HomepageSections.test.tsx` — 6 tests passed.
- Homepage Playwright contract: 4 tests passed, including movement order, inward routes, destination-owned teasers, anchor landings, keyboard entry, breakpoint overflow, reduced motion, 2× page scale, failed media, Fold 3 topology, and zero-flow overprint.
- Rendered inspection: Harley approved the real React page after the accepted-width browser passes and the subsequent production corrections.
- Public asset quality check: passed with every homepage raster below 400 KB.
- Final repository-wide hook evidence and GitHub-visible draft-PR state are recorded after the implementation commit.

## Inspection boundary

The accepted React homepage is ready for the normal merge review. Do not reopen the accepted Fold 2 direction unless a future production render demonstrates a genuine defect.

# Portfolio Phase 9: Discovery and Sharing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the static portfolio correct and useful at `https://harleybartles.com` while retaining a tested GitHub Pages project-URL fallback.

**Architecture:** Add one build-time site-profile authority and a resolved route catalogue. Derive static documents, metadata, discovery files and canonical sharing URLs from that catalogue; retain content facts with their existing owners. Use the custom profile for the reviewed deployment, but keep the fallback profile testable and selectable without runtime hostname detection.

**Tech Stack:** React 19, TypeScript, Vite, SCSS, Vitest, Playwright, Node build scripts, static GitHub Pages.

**Execution Strategy:** `executing-plans` — the route catalogue, document generator, metadata consumer, generated discovery files and sharing UI are tightly coupled and must land as one testable delivery profile.

## Global Constraints

- Keep GitHub Pages and static delivery; add no backend, host migration, analytics, RSS, JSON-LD, PWA, tracking parameters or sharing SDK.
- Canonical custom profile: `https://harleybartles.com/`; fallback: `https://harleybartles.github.io/portfolio/`.
- Never infer identity from `window.location`; test both profiles.
- Preserve editorial datelines as editorial datelines, not publication timestamps.
- No tracked `CNAME`; GitHub Pages configuration owns the custom-domain binding.
- Retain one quiet end-of-content share action on essays and fairytales only.

### Task 1: Establish profile and route authorities

**Files:**
- Create: `src/client/site.config.json`, `src/client/src/data/routes/siteProfile.ts`, `src/client/src/data/routes/routeCatalogue.ts`
- Modify: `src/client/vite.config.ts`, `src/client/src/components/DocumentMetadata.tsx`, `src/client/src/data/documents.ts`
- Test: `src/client/src/data/routes/siteProfile.test.ts`, `src/client/src/data/routes/routeCatalogue.test.ts`, `src/client/src/components/DocumentMetadata.test.tsx`

- [ ] Add both validated named profiles and select one through a build-time `PORTFOLIO_SITE_PROFILE` value.
- [ ] Resolve fixed routes plus current public manifest entries into one typed route catalogue with title, description, type, indexability, canonical path, sharing mode and social-image selection.
- [ ] Replace hard-coded origin/base metadata with profile and catalogue consumers.
- [ ] Prove custom-root and fallback-project canonicals, invalid-profile rejection, unique route identity and article metadata boundaries.

### Task 2: Generate static route identity and discovery files

**Files:**
- Modify: `src/client/scripts/generate-route-documents.mjs`, `src/client/scripts/generate-route-documents.test.ts`, `src/client/index.html`, `src/client/public/robots.txt`, `src/client/public/sitemap.xml`, `src/client/package.json`
- Create: `src/client/scripts/generate-discovery-files.mjs`, `src/client/scripts/generate-discovery-files.test.ts`

- [ ] Generate every known route document from the catalogue with one title, description, canonical, robots and complete Open Graph/Twitter set; keep unknown `404.html` noindex with no canonical or `og:url`.
- [ ] Generate deterministic sitemap and robots from indexable catalogue entries with no speculative dates, priority or change frequency.
- [ ] Add a profile-aware build script that runs route-document and discovery generation after Vite output.
- [ ] Prove apply/check generation is churn-free and both profile outputs have correct deep-route URLs.

### Task 3: Add restrained share and identity assets

**Files:**
- Create: `src/client/src/components/ShareAction.tsx`, `src/client/src/components/ShareAction.test.tsx`, `src/client/src/components/ShareAction.scss`
- Modify: `src/client/src/pages/ContentPage.tsx`, relevant Patch detail renderer, `src/client/index.html`, `docs/asset-custody.md`
- Create: `src/client/public/brand/hb-mark-32.png`, `src/client/public/brand/apple-touch-icon.png`, `src/client/public/media/social/default-card.png`

- [ ] Add a keyboard-accessible end-of-content share action for writing and Patch detail routes; native share, clipboard fallback and selectable canonical-link fallback must retain focus and announce useful outcomes.
- [ ] Add favicon and touch-icon derivatives from the existing HB mark with custody, dimensions and alt-intent records.
- [ ] Add one custody-recorded default social card; only create route-specific artwork where current owned evidence earns it.
- [ ] Prove ineligible routes have no share control and all failure/cancellation paths remain useful.

### Task 4: Deploy profile and external activation readiness

**Files:**
- Modify: `.github/workflows/ci.yml`, `tools/check_public_routes.py`, `README.md`, `docs/design-decisions.md`, `.agents/runbooks/pr.md`
- Create: `.agents/runbooks/custom-domain-activation.md`
- Test: `tests/test_public_routes.py`, `tests/test_seo_routes.py`, `src/client/e2e/sharing.spec.ts`, `src/client/e2e/route-metadata.spec.ts`

- [ ] Make the reviewed production workflow build the custom-domain profile while retaining an explicit fallback verification path.
- [ ] Record RSS as deliberately deferred and append, rather than rewrite, the domain/profile decision.
- [ ] Add a bounded Namecheap/GitHub activation and rollback runbook: verify domain, configure Pages, replace parking records, observe DNS/TLS/redirects, and revert to fallback if external proof fails.
- [ ] Prove direct routes, metadata, sharing, icons, sitemap, robots and unknown routes in browser tests at both bases where applicable.

### Task 5: Validate, publish and activate only after repository proof

- [ ] Run `py -3 tools/run.py ci --apply`, inspect generated changes, then run `py -3 tools/run.py ci --check`.
- [ ] Review desktop and narrow sharing/metadata presentation; verify route documents and production build under custom and fallback profiles.
- [ ] Commit, push and open a draft PR with exact validation evidence.
- [ ] After Harley merges, read the exact deployed Pages state, perform the separate Namecheap/GitHub cutover, and verify DNS, TLS, redirects, deep routes, sitemap, robots and representative social previews before claiming public completion.

## Plan-readiness review

The approved Phase 9 specification maps to Tasks 1–4: profiles/catalogue, static identity/discovery, sharing/assets, and deployment/external boundary. Task 5 separates repository proof from the user-authorized external activation. The plan deliberately excludes RSS, JSON-LD, analytics, PWA work, host migration and interaction work. Rating: **9/10**; exact DNS values remain a live external input and are intentionally re-read only at activation.

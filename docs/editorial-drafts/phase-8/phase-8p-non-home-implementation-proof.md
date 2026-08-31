# Phase 8P non-home implementation proof

**Status:** Rendered implementation ready for Harley's acceptance. Homepage Phase 8 remains blocked.

## Source state

- Branch: `codex/phase-8p-non-home-implementation`
- Accepted-plan base: `0335fe67c69284719b16e578c1ec64b4c4de93e7`
- Accepted RED reference: `8f6028a0bd9ca4d2021d6b1b9d3a628dac570638`
- Committed boundary slice: `1b83ce97ff11bb73aa8c2ef05552e025f1528706`
- Publication shape: the remaining Task 2-8 implementation is kept as one normally hooked closeout commit and one draft PR for review; opening that draft does not by itself mark Harley's rendered acceptance complete.
- Protected boundary: `/` retains its existing authored homepage presentation. Phase 8P changes apply only to non-home routes.

## Implemented route families

- Quiet non-home shell and mineral substrate across project, writing, Patch, About, CV and not-found routes.
- Source Sans 3 for site/interface roles, Source Serif 4 for authored longform reading, and Source Code Pro for compact machine/provenance notation. The new Sans and Mono faces are self-hosted and loaded with the lazy interior stylesheet so the protected homepage entry budget is not displaced.
- Writing index and articles retain distinct index and longform compositions instead of sharing a universal page template.
- Marketplace, Wild Bunch, Adventures of Patch and Learning Lab retain source-owned imagery and route-owned composition. Wild Bunch and Patch alone use evidence-earned bounded project fields; project colour is not a quota.
- About and CV use the restrained professional register. Patch stories retain their canonical imagery and authored overlap without inheriting a generic warm frame.
- Shared case-study custody supplies captions and provenance seams without imposing a universal evidence container.

## Source-owned assets and reference custody

- Existing public project captures remain the delivered evidence. No generated reference capture was substituted for a product screenshot.
- The self-hosted Fontsource packages are `@fontsource-variable/source-sans-3` and `@fontsource-variable/source-code-pro`; the existing Source Serif 4 remains the reading face.
- Three live Wild Bunch town-layout references are retained under `phase-8p-reference-captures/`: Gold Gulch, Canyon Falls and Hardpan. They remain internal composition evidence, not public claim support or a route-content quota. The delivered route uses the receipt-controlled Dustwell town capture; Hardpan has no public revision, seed and setup record and therefore does not support a prosperity claim on the page.

## Windows rendered proof

The Windows visual suite owns the updated non-home baselines. The protected `homepage-masthead.png` and `homepage-feature-deck.png` baselines did not change and remained pixel-identical in the pre-update and post-update runs.

Updated baseline groups:

- Writing: `writing-peer-list.png`, `article-mobile-header.png`
- About/CV: `about-current-work.png`, `about-cv-conversion.png`, `about-cv-conversion-mobile.png`, `cv-first-sheet.png`, `cv-first-sheet-mobile.png`
- Marketplace: `marketplace-case-study-hero.png`, both distribution-map baselines
- Wild Bunch: town hero, determinism desktop/mobile, event flow and product evidence
- Adventures of Patch: hero, origin, production system, showcase handoff, evidence boundary, controlled production and mobile composition
- Learning Lab: hero/origin, curriculum atlas, lab system and mobile composition
- Patch stories: Tournament desktop/mobile and Lawful Heist Rollback

The data-driven representative inventory additionally proves `/projects/wild-bunch`, `/writing/why-adrs` and `/about` at `1440 × 1100`, `390 × 844`, `320 × 844` and the `360 × 844` automated zoom proxy. At every width it asserts the expected type register, stable semantic source order, visible keyboard focus and no page overflow.

## Actual 200% browser zoom

Browser: Opera on Windows, using the browser's actual 200% zoom state.

Observed browser geometry: `outerWidth: 1920`, `outerHeight: 1032`, `innerWidth: 934`, `innerHeight: 459`, `devicePixelRatio: 2`, `visualViewport.scale: 1`. This is a browser-zoom pass, not the `360 × 844` automated proxy.

| Route | Reflow and overflow | Focus | Evidence and type |
| --- | --- | --- | --- |
| `/projects/wild-bunch` | `scrollWidth 926 === clientWidth 926`; opening reflows without clipping | Focused skip link visible | Site-Sans register, title and Dustwell evidence legible |
| `/writing/why-adrs` | `scrollWidth 926 === clientWidth 926`; article/figure relationship remains usable | Focused skip link visible | Article-Serif register, title and decision-memory evidence legible |
| `/about` | `scrollWidth 926 === clientWidth 926`; professional grid reflows cleanly | Focused skip link visible | Site-Sans register, opening claim and current-work evidence legible |

Captures:

- `phase-8p-proof-captures/wild-bunch-opera-200-percent.png`
- `phase-8p-proof-captures/why-adrs-opera-200-percent.png`
- `phase-8p-proof-captures/about-opera-200-percent.png`

## Validation recorded before acceptance

- Production build passed, including route and project-media currency checks.
- Build budgets passed: entry JavaScript `342874 / 358400` bytes; entry CSS `40890 / 40960` bytes; generated CV PDF `220075 / 524288` bytes across exactly two pages.
- Accessibility matrix: 48 passed. The existing 26 desktop/mobile WCAG 2.2 AA checks remain green. A new SC 1.1.1 guard visits all 22 canonical public routes, cycles every homepage feature state, requires non-empty alternatives for content images and permits empty alternatives only for the linked HB mark and Marketplace icons whose adjacent text already carries their meaning.
- Final Windows visual suite after baseline inspection: 35 passed, including 12 representative route/width contract checks and the unchanged homepage baseline.
- Focused typography, route-role, project, About, CV and Patch assertions passed after their owning changes.
- Review repair adds a real PDF page-count gate, computed-style checks for shared controls and captions, a no-mask Wild Bunch hero assertion, honest Source-font interception, and receipt-controlled Dustwell evidence expectations. The final validation record supersedes the pre-review counts above.
- The final normal commit hook owns the single canonical exact-tree gate. Repository guidance now says this explicitly and has a regression test: use focused checks while iterating, do not pre-run or immediately repeat the complete gate around a normal commit, and use a hook failure as the repair list for the next attempt.

## Rejected shortcuts

- Treating the `360 × 844` pressure viewport as proof of actual browser zoom.
- Reintroducing one generic card, dark evidence frame or paper panel around every artifact.
- Requiring each project to manufacture a colour field or a unique decorative trick.
- Turning bounded project colour into route-wide microsite theming.
- Replacing product evidence with the internal Wild Bunch reference captures.
- Copying the integrated proof page's composition as a production template.
- Changing `/` before the non-home implementation is accepted and landed.

## Valuation gate

- Credible AI-default resemblance found: No
- Automatic 50% penalty triggered: No
- Evidence and rationale: The rendered non-home routes are not primarily explained by the beige/cream, rusty-orange, huge-Serif, tracked-subhead, ticker and rounded outlined component cluster described in Kyle Chayka's 24 June 2026 New Yorker reference. Their shared identity instead comes from cool mineral ground, rectilinear alignment, semantic Sans/Serif roles, visible provenance and project-native evidence. The Wild Bunch earth field and Patch teal field are finite, source-explainable exceptions rather than a repeated theme. The result remains within the accepted **Working Engineering Record** territory and does not substitute a faux-handmade anti-AI collage style.

## Harley acceptance

- Status: Pending
- Reviewed routes and viewports: `/projects/wild-bunch`, `/writing/why-adrs` and `/about` at `1440 × 1100`, `390 × 844`, `320 × 844` and `360 × 844` automated zoom proxy; the same real-content routes separately at actual 200% browser zoom
- Actual 200% browser-zoom result: Passed implementation review in Opera. All three routes had `scrollWidth === clientWidth`, visible keyboard focus, intact expected type roles, visible headings and legible route evidence.
- Decision: Pending Harley's rendered review

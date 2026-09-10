# PORT-17 Index React First Draft Implementation Plan

> **Execution lane:** Harley explicitly overrode the original `/subagent-driven-development` recommendation on 2026-09-10. Continue this plan inline with `/executing-plans`, while retaining `/test-driven-development` for every production change and `/verification-before-completion` before completion claims. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing `/patch/the-usual-specialists` presentation with the accepted PORT-16 opening, apartment establishing composition, Index chapter, and temporary wireframe rope as the first React draft of the new Specialists page.

**Architecture:** The Specialists route becomes a route-owned, full-width presentation inside the existing interior site shell. `UsualSpecialistsPage` is a small chapter orchestrator; the approved opening and Index chapter are vertically sliced React modules that own their markup, styled-components contract, responsive choreography and tests locally, and future approved chapters append as sibling slices rather than being anticipated now. Parent/orchestrator styling never reaches through into a chapter's internal DOM; only genuinely page-wide surface/rope concerns stay at page scope. Accepted raster masters live in non-public asset custody and produce deterministic WebP derivatives; existing outlined brand SVGs are reused and the accepted outlined INDEX SVG is copied without publishing any commercial font binary.

**Tech Stack:** React 19, TypeScript 6, React Router 7, styled-components 6, Vitest/Testing Library, Playwright 1.61, Vite 8, Sharp 0.34.5, Windows-authored visual baselines.

**Execution Strategy:** `executing-plans`, sequential, by explicit human override of the earlier `subagent-driven-development` recommendation. Every production-changing task uses a real RED/GREEN cycle; the later browser/visual verification task writes assertions before any browser-only repair and does not manufacture a failure when the translation is already correct. Tasks share one route and must land in order. Do not parallelise edits against `ContentPage`, `UsualSpecialistsPage`, or the same visual composition files.

**Spec:** Linear `PORT-17` plus the locked accepted PORT-16 Index wireframe at `Z:\_agent-scratch\portfolio\usual-specialists-wireframe\usual-specialists-wireframe-index-approved.html` (SHA-256 `f4cd2e71a672d2ea8275e6d27bfffec6f9c39f6c078be66d1d77610b1897e0eb`). The accepted contract is restated below so execution does not depend on guessing from the disposable wireframe.

## Global Constraints

- This plan implements **only** the approved opening/header, apartment establishing composition, Index chapter, and temporary red rope.
- `Silk`, `Writ`, `Klause`, `Rollback`, `Receipt`, the completed-folder close, and their chapter navigation are out of scope until their own wireframe chapters are approved.
- The red rope is explicitly temporary. Use the **same red path and line treatment from the accepted wireframe**; do not design or generate a replacement rope in this slice.
- The current `UsualSpecialistsPage.tsx` design and its old page-specific tests are obsolete. Replace them from a failing new contract; do not refactor or adapt the old six-profile dossier implementation.
- TDD is mandatory: write one failing behavioural test, observe the intended RED, then write the minimum production code to make it GREEN. Do not write production code first.
- Do not use image generation. All visual inputs for this slice are already accepted.
- Preserve the accepted PORT-16 visual composition. Implementation may translate HTML/CSS mechanics into React/styled-components, but it may not redesign layout, typography, scale, crop, occlusion, or responsive choreography.
- Existing `PatchSeriesLockup` and `UsualSpecialistsWordmark` outlined SVG assets are canonical and must be reused. Do not duplicate them into a Specialists-specific media directory.
- Copy the accepted outlined INDEX name mark SVG byte-for-byte from the wireframe source. Do not reconstruct INDEX with live Chassis text.
- **No Chassis font binary enters the repository or production output.** Do not add `.ttf`, `.otf`, `.woff`, `.woff2`, `@font-face`, npm font package, base64 font data, or external font-host dependency for Chassis. Only traced SVG outlines may publish that typography.
- The sticky-note handwriting remains semantic HTML with the approved local/system cursive fallback stack; do not add a handwriting font binary to the repository.
- Preserve real semantic text for the page title, Index chapter heading, story copy, strapline and assent copy even where the visual wordmark is an outlined SVG.
- Accepted character PNGs are never mirrored **except** the explicitly approved ultrawide return pair: Index Model 5 (`index-return`) and Patch Model 5 (`patch-return`) are both mirrored with CSS `scaleX(-1)` so they face back toward the left-hand composition. No other character asset may be mirrored, reversed, regenerated or given a negative inline scale.
- Preserve substrate ownership: Index/Patch traversal figures remain positioned relative to the document/paper substrate they inhabit, not the viewport.
- Preserve the flat 2D document-plane reading. Patch and Index use the accepted perceived scale; no perspective scaling is introduced.
- Preserve intentional occlusion by DOM/layer order. Do not bake new crops into accepted character assets to simulate occlusion.
- The INDEX mark plus strapline must remain inside the viewport at breakpoint-band edges. Keep the approved small edge corrections; do not broadly reposition the mark.
- Meaningful copy must never be clipped by the viewport at any supported width.
- Supported visual review widths include the authored ultrawide ceiling: `2560`, `1920`, `1600`, `1440`, `768`, `390`, and `320` CSS px. Breakpoint-edge stress also covers `2560`, `1921/1920`, `1600/1599`, `1401/1400`, `1400/1399`, `901/900`, `721/720`, `621/620`, and `391/390` where relevant. `2560` is the design ceiling, not an exotic overflow check.
- Actual browser **200% zoom** is a manual acceptance gate. A narrow viewport proxy does not replace it.
- Preserve keyboard usability, reduced-motion parity, route metadata, and the canonical `/patch/the-usual-specialists` path. Harley explicitly retired the obsolete `/patch/lawful-heist` redirect on 2026-09-10; do not preserve or regenerate it.
- The site header and footer remain shared site chrome. The generic content title/summary header and standard related/navigation tail do not sit inside the route-owned Specialists story while this long-running draft is incomplete.
- Do not render dead chapter links for unimplemented chapters. The six-item wireframe chapter rail is deferred until those destinations exist.
- All public image URLs must be base-path safe for GitHub Pages.
- Store the fourteen accepted raster masters under non-public `src/client/assets/`; ship compressed derivatives under `src/client/public/media/`. These fourteen accepted generation masters are intentional durable source custody (27,747,221 bytes total) because the accepted bytes otherwise exist only in disposable scratch. Do not import rejected candidates, superseded generations, or intermediate exports.
- Public raster derivatives use metadata-free WebP and remain below the repository's existing editorial image ceiling. Keep intrinsic dimensions in markup to prevent layout shift.
- The apartment establishing image is the only eager/high-priority raster in this slice. Below-the-fold Index imagery is lazy and async-decoded.
- Keep the existing hard build budgets: entry JS `358400` bytes, entry CSS `40960` bytes, CV PDF `524288` bytes and exactly two CV pages.
- Prefer accessible names and stable `data-*` visual/substrate contracts over implementation class names in tests.
- Follow the repo's React composition convention: each chapter is a vertical slice that owns its styled-components locally. Callers position/compose the chapter as a unit and must never reach into migrated child DOM with descendant selectors, modifier class strings, incidental child-order assumptions, or styled-component interpolation selectors. If the Index CSS is kept in private `IndexChapter.styles.ts` for size, only `IndexChapter.tsx` may import/use those private styled components.
- New visual baselines are authored on Windows only. Do not overwrite unrelated existing baselines.
- Use focused checks while iterating. Normal commits must use the tracked hook; never use `--no-verify`, and do not run the full canonical CI immediately before or immediately after a successful hooked commit.
- Generated `INDEX.md` files are updated through `py -3 tools/run.py index-mesh --apply`, never hand-edited.
- This is a long-running branch. Once the React Index slice is visually approved, open a **draft** PR and then return to the wireframe for the next chapter. Do not merge or mark the whole Specialists page complete.

---

## Accepted source assets for this slice

The following masters are the accepted PORT-16 inputs. Copy them byte-for-byte into non-public source custody before producing public derivatives. Do not substitute similarly named generations.

| Accepted wireframe source | Intrinsic size | SHA-256 |
| --- | ---: | --- |
| `commission-01-current.png` | `1672x941` | `6e862160a1f6bd5cc2c5f09da560f665d9bf83aae36a6eca8cd14f5fe791f10c` |
| `commission-02-base-candidate-03.png` | `1672x941` | `807de074c28b1ef2450d24aae4eff2b70b2da8b9c23942d750493d2f8c7a1019` |
| `commission-02-index-assent-note-candidate-03.png` | `1373x1145` | `c2e4efd4c213d44e2fcbb05edece10a31ac31466b46a4b0987d5b61c68ba4bc7` |
| `commission-02-index-carrier-blue-candidate.png` | `1536x1024` | `be536fe598e746a8769891502aa66959f1845e55c7edd221d59b04cc91296a23` |
| `commission-02-index-graph-paper-spill-candidate-01.png` | `1536x1024` | `0f5fb6c12e144ff9e4b721d8996e17eba02c79bd53c3139a4d8616e01ebdb206` |
| `commission-03-index-inset-candidate-01.png` | `1774x887` | `7a7a4f7b5576b7a5b57df865f2828d5827abffc806665e451f915b3beb1318f3` |
| `commission-04-index-macguffin-accepted.png` | `1536x1024` | `0dbccb6e015804d0a65ecd46c0fd23b8c60101d42c01a1bc8269c6129c76832d` |
| `commission-index-pilot-traversal-01.png` | `1024x1536` | `d33f60c03c2f7d82bf16de8bb3244fac22c1ddde2f1ee903c2d6b779eec46970` |
| `index-traversal-02-low-inspection.png` | `1024x1536` | `b8b8e2210f04c722d8a7054168f182445dda74ed9318b8eade0c86f185c8e40e` |
| `index-traversal-03-high-step.png` | `1024x1536` | `507270ea3beba6d0467500be973839c7221158be935350b8010208c77b4b2946` |
| `index-traversal-05-rear-progression.png` | `1024x1536` | `cd501efacab482ee34364e2b98c79ebf7f712954c5fab193b7809f199b5bf56c` |
| `patch-traversal-01-following.png` | `1024x1536` | `2f93ebd8b5da683792874ce4d060d89511e5b738d6ccaabb8e407748adb0ec87` |
| `patch-traversal-02-leaning.png` | `1024x1536` | `e382059bdd34d97358237fdf51c14130a5e5e5f1728e5e953411eebaa61ad615` |
| `patch-traversal-05-rear.png` | `1024x1536` | `1df2c4860d1277092f29f83a8388c7c1750b94ed0eb3fd9f915ab338889044b2` |
| `index-wordmark-chassis-outline.svg` | `viewBox 0 0 521.7171 103.332` | `f93278a62975f77eebff4118d2deb2dc08d2270bf7599c4cba0ca663e8df3b22` |

Source root during custody import:

`Z:\_agent-scratch\portfolio\usual-specialists-wireframe\preview-assets\`

The accepted Index traversal source hashes, including Model 5 rear-three-quarter progression, match Linear provenance document `a6163be5-3bdd-425a-b144-b00e3a88423d`. Patch Model 5 uses the approved rear-three-quarter continuation brief recorded in Linear document `72833c08-cbbe-4674-889a-9024c307c415`; its exact accepted local byte identity is the hash above. For other accepted assets, carry forward the known Linear provenance without inventing missing prompt details.

### Repository source-custody names

Copy only the accepted raster files above into `src/client/assets/patch/the-usual-specialists/index/` with this exact mapping. Public WebP derivatives use the same stable stem.

| Wireframe source | Repository master | Public derivative |
| --- | --- | --- |
| `commission-01-current.png` | `safehouse-threshold.png` | `safehouse-threshold.webp` |
| `commission-02-base-candidate-03.png` | `index-desktop-base.png` | `index-desktop-base.webp` |
| `commission-02-index-assent-note-candidate-03.png` | `index-assent-note.png` | `index-assent-note.webp` |
| `commission-02-index-carrier-blue-candidate.png` | `index-blue-carrier.png` | `index-blue-carrier.webp` |
| `commission-02-index-graph-paper-spill-candidate-01.png` | `index-graph-paper.png` | `index-graph-paper.webp` |
| `commission-03-index-inset-candidate-01.png` | `index-observation.png` | `index-observation.webp` |
| `commission-04-index-macguffin-accepted.png` | `index-macguffin.png` | `index-macguffin.webp` |
| `commission-index-pilot-traversal-01.png` | `index-walk.png` | `index-walk.webp` |
| `index-traversal-02-low-inspection.png` | `index-inspect.png` | `index-inspect.webp` |
| `index-traversal-03-high-step.png` | `index-high-step.png` | `index-high-step.webp` |
| `index-traversal-05-rear-progression.png` | `index-return.png` | `index-return.webp` |
| `patch-traversal-01-following.png` | `patch-follow.png` | `patch-follow.webp` |
| `patch-traversal-02-leaning.png` | `patch-leaning.png` | `patch-leaning.webp` |
| `patch-traversal-05-rear.png` | `patch-return.png` | `patch-return.webp` |

This is an explicit custody exception to the normal preference against retaining unoptimized exports: these files are the accepted masters needed to reproduce the public derivatives, not transient raw candidates. Existing portfolio-generated Patch and Learning Lab imagery uses the same non-public-master/public-derivative boundary. Do not add any larger source, rejected candidate, or scratch-only intermediate merely because it sits beside an accepted file.

### Public derivative dimensions

Use one deterministic WebP derivative per accepted raster. Preserve aspect ratio and alpha. These dimensions are deliberately sized above their maximum CSS display width while avoiding shipping 1024-1774 px masters for ~100 px characters.

| Public asset | Output width |
| --- | ---: |
| `safehouse-threshold.webp` | `1672` |
| `index-desktop-base.webp` | `1672` |
| `index-blue-carrier.webp` | `1240` |
| `index-graph-paper.webp` | `1140` |
| `index-assent-note.webp` | `480` |
| `index-observation.webp` | `1320` |
| `index-macguffin.webp` | `1200` |
| `index-walk.webp` | `320` |
| `index-inspect.webp` | `320` |
| `index-high-step.webp` | `320` |
| `index-return.webp` | `320` |
| `patch-follow.webp` | `320` |
| `patch-leaning.webp` | `320` |
| `patch-return.webp` | `320` |

Encode with Sharp WebP options equivalent to:

```ts
{ quality: 82, alphaQuality: 100, effort: 6, smartSubsample: true }
```

Planning inspection showed every full-size source encoded with these settings is below `340 KB`, so the proposed down-sized derivatives have ample headroom without lowering visual quality. The two later-approved return masters were re-probed after selection: full-size WebP was `138,836` bytes for Index return and `103,462` bytes for Patch return; their planned 320px derivatives were `21,380` and `23,466` bytes respectively.

---

## Accepted visual contract to port

### Opening

- Page ground: warm paper `#f2ecdf`; ink `#20231f`; rope `#aa302d`; Index ink `#17364d`.
- Opening top padding: `clamp(34px, 6vw, 76px)`.
- Lockup is a vertical flex composition with `gap: clamp(14px, 2vw, 24px)` and `padding-bottom: 34px`.
- `PatchSeriesLockup`: width `min(35%, 390px)`, aligned right.
- `UsualSpecialistsWordmark`: width `min(100%, 1120px)`.
- Opening precis: width `min(46%, 33rem)`, aligned right, `font-size: clamp(1.05rem, 1.7vw, 1.36rem)`.
- At `<=900`: Patch lockup width `min(42%, 340px)`; precis width `min(62%, 33rem)`.
- At `<=620`: opening top padding `26px`; Patch lockup width `min(54%, 280px)`; Specialists mark `100%`; precis width `82%`, `margin-top: 8px`.
- Threshold is full-bleed, relative, `min-height: clamp(540px, 68vw, 820px)`, with the accepted apartment image filling it via `object-fit: cover`.
- Threshold copy on wide layouts: top `15%`, left at the content gutter, width `min(34rem, 42vw)`, `24px 26px` padding, paper field `rgb(242 236 223 / 91%)`, subtle border/shadow.
- At `<=900`: threshold copy width `min(30rem, 58vw)`.
- At `<=620`: threshold `min-height: 690px`; copy uses left/right gutter, top `18%`, auto width.
- Preserve the accepted opening precis verbatim: `Patch has a route-shaped problem. Six people make it legitimate, testable, lawful, decidable, recoverable and reviewable — mostly by carrying on with their actual jobs while he talks.`
- Preserve the accepted threshold eyebrow verbatim: `The adventure / recruitment pass`.
- Preserve the accepted threshold heading verbatim: `One ordinary apartment. Six rooms bent to purpose.`
- Preserve the accepted threshold body verbatim: `Patch moves through the safehouse with a folder and an unheard pitch. Each Specialist exposes the missing layer by doing the work they already do. The assent marker lands when the role makes itself unavoidable.`
- The scratch HTML contains mojibake around some punctuation; use the intended text above rather than copying mojibake, and do not otherwise rewrite the prose.
- Do not render the six-destination chapter rail yet; five destinations do not exist in this React slice.

### Temporary rope

Use the accepted path verbatim:

```svg
<path d="M 115 0 C 122 350 140 700 160 1000 C 175 1350 205 1700 225 2000 C 232 2250 235 2600 236 3000 C 237 3130 292 3215 308 3150 C 321 3098 276 3062 252 3102 C 235 3130 248 3174 273 3178" />
```

- `viewBox="0 0 1000 3300"`, `preserveAspectRatio="none"`.
- `stroke: #aa302d`, `stroke-width: 9px`, round cap/join, non-scaling stroke, `drop-shadow(3px 0 3px rgb(0 0 0 / 18%))`.
- Anchor: top `8.5%`, left `11%`, 30 px ring, 7 px border; at `<=620` left becomes `8%`.
- Rope starts at `calc(8.5% + 27px)` and is 3300 px tall. At `<=620`, preserve the wireframe treatment `left: -18vw; width: 226vw`.
- Keep the exact 3300-unit path geometry and clip only its not-yet-used continuation after the current Index slice. Do not vertically rescale/compress the path to fit the shorter draft page.
- Mark the DOM explicitly as temporary, e.g. `data-temporary-wireframe-rope="true"`, so the future real-rope replacement has an objective search target.

### Index - wide/base

- Chapter top `112px`; chapter bottom uses the shared accepted `clamp(74px, 10vw, 132px)` breathing space.
- Faint `01` chapter numeral remains presentation-only.
- Stage minimum height `980px`.
- Base variables:

```css
--index-03-pair-footline-drop: 12px;
--index-03-left: calc(50% - 430px);
--index-03-top: 590px;
--index-03-width: 560px;
--index-04-left: calc(50% + 80px);
--index-04-top: 675px;
--index-04-width: 600px;
--index-note-left: calc(50% + 20px);
--index-note-top: 765px;
--index-note-width: 220px;
```

- Main desktop substrate: left `max(var(--gutter), calc((100vw - 1160px) / 2 - 70px))`; right overhang `-3vw`; min height `clamp(640px, 44vw, 780px)`; accepted Commission 02 base covers the substrate.
- Story card: bottom `30px`, right `calc(var(--index-main-overhang) + var(--gutter))`, width `min(35rem, 44%)`, viewport-safe maximum width.
- Story copy is exactly:

`Index is already moving before Patch finishes the pitch. She leads him across maps, revisions and overlapping records, tracing the provenance from source to source until one route holds together.`

- Blue carrier: left `44px`, top `232px`, width `620px`, 3:2 plane, wrapper `rotate(-7deg)`, image plane `rotate(-5deg)`.
- Graph paper: left `100px`, top `445px`, width `570px`, `rotate(2deg)`.
- Commission 03 inset: `top: var(--index-03-top)`, `left: var(--index-03-left)`, width variable, 16:9, cover.
- Commission 04 inset: top/left/width variables, minimum height `255px`, cover.
- Sticky note: top/left/width variables, aspect `1373/1145`, `rotate(-5deg)`.
- INDEX visual mark: top `78px`, right `42px`, width `17.83rem`, `rotate(-1deg)`, ink `#17364d`.
- Strapline is clean live text, **not distressed**: `PROVENANCE | TRACE THE ROUTES`, Courier-style monospace, `1rem`, weight 800, centered to the wordmark width, same `#17364d` ink.
- Handwriting overlay uses `#17364d`, approved whole-copy transform `rotate(-6deg) translate(18%, -5%)`, line one `rotate(1.5deg)`, line two `margin-left: 2.65em; rotate(-2deg)`, strong line `margin-top: .42em; margin-left: .35em; rotate(.8deg)`.
- Base handwriting sizes: spans `1.25rem`; strong `1.6rem`.
- Semantic assent: `You son of a gun. I'm in!` The blank physical note image remains blank; the web layer owns the words.

### Index - wide traversal choreography

- Index 1 / `index-walk`: main desktop substrate, top `17%`, right `18%`, width `94px`.
- Patch 1 / `patch-follow`: blue carrier, top `34%`, right `-1%`, width `100px`, `rotate(7deg)`.
- Index 2 / `index-inspect`: stage/Commission 03 relationship, top `calc(var(--index-03-top) - 131px + 12px)`, left `calc(var(--index-03-left) + 108px)`, width `102px`.
- Patch 2 / `patch-peer`: same Commission 03 footline, top `calc(var(--index-03-top) - 156px + 12px)`, left `var(--index-03-left)`, width `104px`.
- Index 3 / high step is hidden above 720 px.
- Commission 03 paints above the second pair so the accepted partial occlusion remains physical.

### Index - authored ultrawide `1401-2560`

`1400px` is the accepted continuity boundary. Do not change the accepted `1400px` composition. From `1401px` upward, stop extrapolating the mixed viewport/centre anchors that previously made the traversal figures separate/cross and pulled the paper spill away from the main design-document substrate. `2560px` is the authored design ceiling; clamp the geometry rather than continuing to spread it indefinitely.

At `min-width: 1401px`, use these exact stage variables:

```css
--index-03-left: clamp(270px, calc(5vw + 200px), 328px);
--index-04-left: clamp(780px, calc(7vw + 682px), 861px);
--index-note-left: clamp(720px, calc(15vw + 510px), 894px);
```

- Main design-document substrate: `left: clamp(50px, calc(25vw - 300px), 180px)` and `right: -42px`.
- Blue carrier: `left: clamp(44px, calc(25vw - 306px), 174px)`.
- This paired movement deliberately preserves overspill: the blue carrier must remain visibly left of the main substrate edge, and the graph-paper spill must continue to break that same left boundary rather than ending up wholly on top of the substrate.
- Story card stops following the viewport's far-right edge: `left: clamp(801px, calc(12vw + 633px), 940px)` and `right: auto`.
- Index 1 stops wandering away from Patch: on the main design-document substrate use `left: 1047px; right: auto`. At and above 1401, its horizontal separation from Patch 1 must never exceed the accepted 1400 separation except for a maximum `2px` rendering tolerance.
- The six-destination wireframe chapter rail is still **not rendered in this React slice** because five destinations do not exist. Preserve its accepted future contract in the design record only: when that rail becomes live, its outer field/rules remain full-width while an inner six-column grid is centred with `max-width: 1400px`; do not enlarge the label type merely because the viewport is ultrawide.

At `min-width: 1600px`, add the approved returning traversal pair on the **main design-document substrate**:

- Index Model 5 / `index-return`: display, `top: 50%`, `left: clamp(1240px, 78%, 1780px)`, width `96px`, CSS `scaleX(-1)`, transform origin `50% 100%`.
- Patch Model 5 / `patch-return`: display behind Index, `z-index: 9`, `top: 55%`, `left: calc(clamp(1240px, 78%, 1780px) + 95px)`, width `100px`, CSS `scaleX(-1)`, transform origin `50% 100%`.
- Index paints above Patch through the normal traversal layer (`z-index: 10` versus Patch return `9`).
- This pair is a distinct later traversal beat: both face back toward the left-hand composition, Index leads, Patch follows slightly lower and farther right. Do not substitute a different pose or unmirror either asset.
- Hide both return figures below `1600px`; they are an ultrawide-only expansion of the journey, not part of the accepted 1400-and-below density.

At `min-width: 1921px`, ease the paper system toward the authored 2560 ceiling:

```css
.index-main {
  left: clamp(180px, calc(12vw - 50.4px), 257px);
}

.paper-occluder.left {
  left: clamp(174px, calc(12vw - 56.4px), 251px);
}
```

Translate these HTML-wireframe selectors into directly owned styled components. In React, `IndexWalk`, `IndexReturn`, `PatchReturn`, the main substrate, blue carrier and story card own their own geometry; do **not** reproduce `.index-main > .index-traversal...` or other parent descendant reach-through selectors.

### Index - `<=1399`

```css
--index-03-left: calc(50% - 390px);
--index-03-top: 590px;
--index-03-width: 530px;
--index-04-left: calc(50% - 10px);
--index-04-top: 810px;
--index-04-width: 460px;
--index-note-left: calc(50% - 40px);
--index-note-top: 770px;
--index-note-width: 220px;
```

### Index - `<=900`

```css
--index-03-left: 40px;
--index-03-top: 590px;
--index-03-width: 520px;
--index-04-left: 310px;
--index-04-top: 840px;
--index-04-width: 400px;
--index-note-left: 320px;
--index-note-top: 790px;
--index-note-width: 172px;
```

- Stage minimum height: `calc(var(--index-04-top) + 279px)`.
- Blue carrier: left `-6px`, top `232px`, width `540px`.
- INDEX mark: top `60px`, right `30px`, width `12.88rem`; strapline `.72rem`.
- Graph paper: left `18px`, top `445px`, width `540px`.
- Story card width `430px`.
- Index 1: top `25%`, right `18%`, width `88px`, `translateY(clamp(0px, calc(350px - 38.8889vw), 70px))`.
- Patch 1 width `94px`.
- Index 2 width `96px`, same +108 px left relationship.
- Patch 2 top uses `-147px + 12px`, width `98px`.
- Handwriting: spans `1rem`; strong `1.25rem`.

### Index - `<=720`

```css
--index-mobile-traversal-lift: 19%;
--index-03-left: -40px;
--index-03-top: 718px;
--index-03-width: 660px;
--index-04-left: 60px;
--index-04-top: 1040px;
--index-04-width: 330px;
--index-note-left: 240px;
--index-note-top: 990px;
--index-note-width: 150px;
```

- Stage min height `calc(var(--index-04-top) + 255px)`.
- Main substrate: overhang `12vw`, left `0`, min height `700px`.
- Story card: absolute, bottom `24px`, width `330px`, no responsive conversion to a normal-flow card.
- Hide Index 1, Index 2 and Patch 2.
- Patch 1 remains on blue carrier: top `calc(33% - 19%)`, left `26%`, width `82px`.
- Show Index 3 high-step on blue carrier: top `calc(0px - 19%)`, left `73%`, width `74px`.
- INDEX mark safe-edge correction: top `72px`, right `max(48px, calc(466px - 100vw))`, width `11.89rem`; strapline `.67rem`.
- Blue carrier: left `-70px`, top `250px`, width `520px`.
- Graph paper: left `-18px`, top aligned to the story-card top, width `520px`, `rotate(2deg)`.
- Handwriting: spans `.9rem`; strong `1.1rem`.

### Index - `<=390`

```css
--index-03-left: -110px;
--index-03-top: 718px;
--index-03-width: 500px;
--index-04-left: 40px;
--index-04-top: 960px;
--index-04-width: 280px;
--index-note-left: 190px;
--index-note-top: 908px;
--index-note-width: 124px;
```

- Story card width `260px`.
- Blue carrier left `-78px`, width `450px`.
- Patch 1 left `29%`.
- Index 3 left `64%`; top gets the accepted extra `-10px` after the shared 19% lift.
- INDEX mark: top `68px`, right `max(42px, calc(388px - 100vw))`, width `10.57rem`; strapline `.59rem`.
- Graph paper left `-42px`, width `460px`.
- Handwriting spans `.7rem`; **no `strong` override**, so `1.1rem` inherits from the 720 px band.

---

## Target ownership map

### Route integration

- Modify `src/client/src/components/SiteLayout.tsx` only as needed to let an interior route opt its `<main>` frame into full width without changing interior header/footer identity.
- Modify `src/client/src/pages/ContentPage.tsx` so `patch-usual-specialists` is a route-owned presentation: metadata and shared site chrome stay, but the generic `ContentHeader`, generic `ContentArticle`, related-content rail, content navigation and share tail are not inserted around this incomplete long-running story.
- Keep `src/client/src/features/case-study/projectPresentations.ts` lazy-loading `UsualSpecialistsPage`; do not make the route eager.

### Specialists page

- Replace `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx` wholesale with a small page orchestrator.
- Create the opening vertical slice as `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.tsx` plus private sibling `UsualSpecialistsOpening.styles.ts`; only the opening module imports/uses those styled components.
- Create the Index vertical slice as `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx` plus private sibling `IndexChapter.styles.ts`; only `IndexChapter.tsx` imports/uses those styled components. The slice owns every Index substrate, traversal figure, story card, note, lockup, breakpoint and ultrawide rule.
- Create `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts` only for the page root, warm-paper surface and journey-rope/clip overlay that genuinely span chapter boundaries. It must not target opening or Index descendants.
- Create `src/client/src/features/patch-showcase/usual-specialists/usualSpecialistsAssets.ts` for base-path-safe public media paths and intrinsic asset descriptors.
- Future chapters will be separate siblings under this folder. Do not create empty Silk/Writ/Klause/Rollback/Receipt components now.
- Do not expose internal styled components from a chapter slice for parent positioning. `UsualSpecialistsPage` composes `<UsualSpecialistsOpening />` and `<IndexChapter />` as units; any future chapter joins at that same sibling boundary.

### Asset custody

- Create non-public source directory `src/client/assets/patch/the-usual-specialists/index/` and copy the fourteen accepted PNG masters there with stable descriptive names.
- Create `src/client/assets/patch/the-usual-specialists/index/accepted-assets.json` with the exact accepted source hashes, dimensions, source wireframe names, PORT-16/Linear provenance references, rights basis and acceptance status. Unknown generation prompt details remain absent rather than guessed.
- Create `src/client/scripts/process-usual-specialists-assets.mjs` and `src/client/scripts/process-usual-specialists-assets.test.ts`.
- Create public directory `src/client/public/media/patch/the-usual-specialists/` containing the deterministic WebP derivatives plus `index-wordmark.svg` and `usual-specialists-derivatives.json`.
- Update `src/client/package.json` with `media:usual-specialists:apply` and `media:usual-specialists:check`; include the check in `build` before TypeScript/Vite.
- Update `docs/asset-custody.md` with this source/derivative boundary and the explicit no-font-binary rule.

### Tests to retire rather than preserve

The following old contracts describe the page being intentionally replaced and must not constrain the new design:

- Delete and recreate `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`; no old six-profile assertions survive.
- Replace the old dossier assertions in `src/client/src/pages/PatchRoutes.test.tsx` with the new Index-draft route contract; keep the canonical route. The obsolete `/patch/lawful-heist` redirect is intentionally removed by later human override.
- Delete the old `The Usual Specialists stacks its lead at the authored narrow breakpoint` test from `src/client/e2e/project-story.spec.ts`.
- Delete the old `The Usual Specialists keeps Rollback inside the story at zoom-pressure width` test.
- Remove only the Specialists-specific assertion from the general Patch-family reflow test and replace it with the new route-owned no-overflow contract in the new Specialists test block.
- Delete `waitForSpecialistsStyles` from `src/client/e2e/visual-regression.spec.ts` once no old test consumes it.
- Delete the old Rollback screenshot test and `patch-lawful-heist-rollback.png` baseline. Do not update that baseline into something unrelated.
- Keep `accessibility.spec.ts` coverage of `/patch/the-usual-specialists`; it is route-wide accessibility proof, not an obsolete design contract.
- Keep the direct-route chunk-isolation assertion in `project-story.spec.ts`; update only expected visible page content if needed.

---

## Planning-stage handoff gate - commit this plan before execution

The `writing-plans` lifecycle requires the final, readiness-reviewed plan to be committed before `/subagent-driven-development` or `/executing-plans` may consume it. This planning commit happens before Task 1 and contains no production implementation.

After the plan-readiness pass is complete, stage only this plan and commit normally:

```powershell
git add .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git commit -m "docs: plan PORT-17 Index React draft"
git status --short
```

Expected: the tracked hook passes for the exact staged plan; `git status --short` is clean afterward. Do not start Task 1 from an uncommitted plan.

---

## Task 1 - Establish the route-owned blank slate with a real RED contract

**Files:**
- Delete/recreate: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`
- Replace: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/components/SiteLayout.tsx`
- Modify: `src/client/src/components/SiteLayout.test.tsx`
- Modify: `src/client/src/pages/ContentPage.tsx`
- Modify: `src/client/src/pages/ContentPage.test.tsx`
- Modify: `src/client/src/pages/PatchRoutes.test.tsx`
- Modify: `src/client/src/features/case-study/projectPresentations.test.tsx` - update the stale retired `h2 Index` assertion to the route-owned `h1 The Usual Specialists`; production registry and lazy-loading behavior remain unchanged.
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Delete: `src/client/e2e/visual-regression.spec.ts-snapshots/patch-lawful-heist-rollback.png`

**Interfaces:**
- Consumes: existing `presentation: 'patch-usual-specialists'`, `getProjectPresentation()`, `SiteLayout` and route metadata. The former `/patch/lawful-heist` redirect is no longer part of the contract.
- Produces: `UsualSpecialistsPage` as the route-owned story root with `data-visual-contract="patch-usual-specialists-index-draft"` and semantic `#content-page-title`; an interior `SiteLayout` full-width-main option; a `ContentPage` branch that does not wrap this presentation in the obsolete generic content header/body/tail.

- [x] **Step 1: Remove the old page-specific test contracts and write the new unit RED**

Recreate `UsualSpecialistsPage.test.tsx` from scratch. The first test should require the new root and require old six-profile output to be absent:

```tsx
render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}><UsualSpecialistsPage /></MemoryRouter>)

const story = screen.getByRole('article', { name: 'The Usual Specialists' })
expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toHaveAttribute('id', 'content-page-title')
expect(story.querySelectorAll('[data-specialist]')).toHaveLength(0)
expect(within(story).queryByText('Advanced visual pre-production')).not.toBeInTheDocument()
```

- [x] **Step 2: Run the new page test and observe RED against the old implementation**

Run:

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

Expected: FAIL because the old page is a region with six `[data-specialist]` articles and does not expose the new route-owned contract.

- [x] **Step 3: Write route/shell RED tests before changing shared infrastructure**

Add a `SiteLayout.test.tsx` case that requires `surface="interior"` to retain the interior header identity while `mainFrame="full"` makes `main` full width. Add a `ContentPage.test.tsx`/`PatchRoutes.test.tsx` case that requires the Specialists presentation to render without `.content-page-header`, `.content-navigation`, or `Related content` around it while metadata/site chrome remain present.

The route test should continue to prove:

```tsx
expect(router.state.location.pathname).toBe('/portfolio/patch/the-usual-specialists')
expect(await screen.findByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
expect(document.querySelector('.content-page-header')).toBeNull()
```

Run the focused files and require the new route-owned assertions to fail for the expected current wrapper behaviour.

```powershell
cd src/client
npm test -- --run src/components/SiteLayout.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx
```

Expected: RED on the newly added full-width/route-owned assertions while the shared canonical-route expectations remain intact.

- [x] **Step 4: Replace the old production page wholesale with the minimal new skeleton and add the narrow route-owned seam**

Do not edit the old `crew` array or styled dossier pieces into a new shape. Replace the file content. The minimum page is:

```tsx
export function UsualSpecialistsPage() {
  return (
    <article aria-labelledby="content-page-title" data-visual-contract="patch-usual-specialists-index-draft">
      <h1 id="content-page-title">The Usual Specialists</h1>
    </article>
  )
}
```

Then add only the shared shell seam needed by this route:

```tsx
<SiteLayout mainFrame={routeOwnsFrame ? 'full' : 'contained'}>
```

and branch `ContentPage` so a `patch-usual-specialists` presentation is rendered directly as the route body under metadata/site chrome instead of receiving the generic content header/article/tail.

Do not generalise this into a registry rewrite in Task 1. One explicit presentation-ownership predicate is enough until a second route needs the same capability.

- [x] **Step 5: Remove obsolete browser/screenshot contracts**

Delete only the old Specialists layout/rollback tests and old Rollback baseline listed above. Preserve direct-route chunk isolation, accessibility coverage and all unrelated Patch visual baselines. Do not preserve the retired `/patch/lawful-heist` redirect.

- [x] **Step 6: Run focused GREEN proof**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/components/SiteLayout.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/case-study/projectPresentations.test.tsx
npm run test:e2e -- e2e/project-story.spec.ts --grep "direct route loads|Usual Specialists|Patch family"
```

Expected: all focused tests pass; direct route remains lazy; old six-profile dossier is no longer asserted or rendered.

- [x] **Step 7: Mark Task 1 checkboxes complete and commit normally**

```powershell
git add src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/client/src/components/SiteLayout.tsx src/client/src/components/SiteLayout.test.tsx src/client/src/pages/ContentPage.tsx src/client/src/pages/ContentPage.test.tsx src/client/src/pages/PatchRoutes.test.tsx src/client/e2e/project-story.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots/patch-lawful-heist-rollback.png .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git commit -m "refactor: reset Specialists route for PORT-17"
```

Let the tracked hook own the complete staged-tree CI gate.

---

## Task 2 - Put accepted Index imagery under deterministic asset custody

**Files:**
- Create: `src/client/assets/patch/the-usual-specialists/index/*`
- Create: `src/client/assets/patch/the-usual-specialists/index/accepted-assets.json`
- Create: `src/client/scripts/process-usual-specialists-assets.mjs`
- Create: `src/client/scripts/process-usual-specialists-assets.test.ts`
- Create: `src/client/public/media/patch/the-usual-specialists/*`
- Modify: `src/client/package.json`
- Modify: `docs/asset-custody.md`

**Interfaces:**
- Consumes: the exact source table and hashes in this plan, Sharp 0.34.5, PORT-16 provenance, accepted outline SVG.
- Produces: base-path-safe public assets and `usual-specialists-derivatives.json`; `npm run media:usual-specialists:apply`; `npm run media:usual-specialists:check`.

- [x] **Step 1: Write the processor unit RED before adding the processor**

Create `process-usual-specialists-assets.test.ts` with tests requiring:

```ts
expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('safehouse-threshold.webp')
expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('index-high-step.webp')
expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('index-return.webp')
expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('patch-return.webp')
expect(USUAL_SPECIALISTS_ASSETS.every(({ format }) => format === 'webp')).toBe(true)
expect(USUAL_SPECIALISTS_WEBP_OPTIONS).toEqual({ quality: 82, alphaQuality: 100, effort: 6, smartSubsample: true })
```

Also test that a source SHA mismatch and an extra/missing derivative receipt entry are rejected.

Run:

```powershell
cd src/client
npm test -- --run scripts/process-usual-specialists-assets.test.ts
```

Expected: RED because the processor module does not exist.

- [x] **Step 2: Copy the accepted masters byte-for-byte and prove their identity before processing**

Create the source directory and copy exactly the fourteen PNGs from the accepted wireframe source root using the exact source-custody mapping above. Verify every SHA-256 against this plan before continuing. The copied masters total 27,747,221 bytes; a different total is a stop sign until the discrepancy is explained.

Copy `index-wordmark-chassis-outline.svg` byte-for-byte to `src/client/public/media/patch/the-usual-specialists/index-wordmark.svg` and verify SHA-256 `f93278a62975f77eBFF4118D2DEB2DC08D2270BF7599C4CBA0CA663E8DF3B22` case-insensitively.

Do **not** copy any font file from `C:\Windows\Fonts` or any other machine-local font location.

- [x] **Step 3: Add the accepted source manifest**

`accepted-assets.json` records, for every master: stable id, original wireframe filename, repository source path, SHA-256, intrinsic width/height, accepted status, rights owner Harley Bartles, and the relevant PORT-16/Linear provenance document id where known. Missing prompt/seed history is omitted rather than reconstructed.

- [x] **Step 4: Implement the minimum deterministic processor and scripts**

The processor must:

1. read only the committed source manifest and source directory;
2. verify every source SHA/dimension before rendering;
3. resize without enlargement to the exact output widths above;
4. preserve alpha and aspect ratio;
5. render WebP with the approved options and no retained metadata;
6. write a derivative receipt with source hash, output hash, dimensions and bytes;
7. in `--check` mode, write nothing and fail on source, output or receipt drift.

Add package scripts:

```json
"media:usual-specialists:apply": "node scripts/process-usual-specialists-assets.mjs --apply",
"media:usual-specialists:check": "node scripts/process-usual-specialists-assets.mjs --check"
```

and add `npm run media:usual-specialists:check` to `build` before `tsc -b`.

- [x] **Step 5: Run the processor unit test RED->GREEN, apply once, then check**

```powershell
cd src/client
npm test -- --run scripts/process-usual-specialists-assets.test.ts
npm run media:usual-specialists:apply
npm run media:usual-specialists:check
```

Expected: unit tests pass; check is churn-free; all public derivatives are below the current image ceiling.

- [x] **Step 6: Prove no prohibited font was introduced**

```powershell
$fontFiles = Get-ChildItem src/client/assets/patch/the-usual-specialists,src/client/public/media/patch/the-usual-specialists -Recurse -File -Include *.ttf,*.otf,*.woff,*.woff2,*.eot
if ($fontFiles) { $fontFiles | Select-Object FullName; throw 'PORT-17 introduced a font binary' }

$fontDependencyDiff = git diff origin/main -- src/client/package.json src/client/package-lock.json | Select-String -Pattern 'chassis|ink[ -]?free'
if ($fontDependencyDiff) { $fontDependencyDiff; throw 'PORT-17 introduced a prohibited font dependency' }

$runtimeFontLoad = rg -n -i "@font-face|data:font|chassis.*url\(|url\([^)]*chassis" src/client/src/features/patch-showcase src/client/public/media/patch/the-usual-specialists src/client/assets/patch/the-usual-specialists
if ($runtimeFontLoad) { $runtimeFontLoad; throw 'PORT-17 introduced a prohibited runtime font load' }
```

Expected: all three guards produce no prohibited match. Plain `Chassis` text inside the accepted outlined SVG provenance metadata is allowed; a font binary, dependency, `@font-face`, data font, or Chassis URL is not.

- [x] **Step 7: Update asset custody documentation**

Record the accepted source identity, non-public master/public derivative split, WebP settings, generated-image provenance boundary, and explicit outlined-SVG/no-font-binary rule in `docs/asset-custody.md`.

- [x] **Step 8: Regenerate the mesh, mark Task 2 complete, and commit normally**

```powershell
py -3 tools/run.py index-mesh --apply
git add src/client/assets/patch/the-usual-specialists src/client/public/media/patch/the-usual-specialists src/client/scripts/process-usual-specialists-assets.mjs src/client/scripts/process-usual-specialists-assets.test.ts src/client/package.json docs/asset-custody.md .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git add -- ':(glob)**/INDEX.md'
git commit -m "feat: add accepted Specialists Index assets"
```

Before staging, update Task 2 Steps 1-8 to `[x]` in the plan. `index-mesh --apply` owns any generated `INDEX.md` changes; stage those generated surfaces mechanically with the pathspec above rather than hand-editing them.

---

## Task 3 - Build the approved opening and temporary rope

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/usualSpecialistsAssets.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/UsualSpecialistsPage.styles.ts`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`

**Interfaces:**
- Consumes: Task 1's route-owned `UsualSpecialistsPage` skeleton/full-width shell seam, `PatchSeriesLockup`, `UsualSpecialistsWordmark`, Task 2 public derivative receipt and the accepted opening/rope contract.
- Produces: `usualSpecialistsAssetPath(filename, baseUrl?)`, `UsualSpecialistsOpening`, page-wide paper/rope clip primitives.

- [x] **Step 1: Write failing tests for the opening before rendering it**

The opening test requires:

```tsx
const pageTitle = screen.getByRole('heading', { level: 1, name: 'The Usual Specialists' })
expect(pageTitle).toBeVisible()
expect(pageTitle).toHaveAccessibleName('The Usual Specialists')
expect(container.querySelector('[data-patch-series-lockup]')).toBeInTheDocument()
expect(pageTitle.querySelector('[data-specialists-wordmark]')).toHaveAttribute('aria-hidden', 'true')
expect(screen.getByRole('img', { name: /ordinary apartment safehouse/i })).toHaveAttribute('fetchpriority', 'high')
expect(container.querySelector('[data-temporary-wireframe-rope="true"] path')).toHaveAttribute('d', EXPECTED_WIREFRAME_ROPE_PATH)
expect(screen.queryByRole('link', { name: 'Silk' })).not.toBeInTheDocument()
```

Also test `usualSpecialistsAssetPath('safehouse-threshold.webp', '/portfolio/') === '/portfolio/media/patch/the-usual-specialists/safehouse-threshold.webp'`.

Run and observe RED because the opening module/helper does not exist:

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

- [x] **Step 2: Implement the semantic opening and reuse canonical wordmark components**

Use a real visible `h1#content-page-title` as the Specialists wordmark container: its semantic text lives in a visually-hidden internal span and the decorative `UsualSpecialistsWordmark` SVG supplies the visible outlined artwork inside the same heading. This follows the existing homepage wordmark pattern, keeps the heading itself visible for route checks, and avoids rendering a duplicate live-text title next to the accepted mark. Render `PatchSeriesLockup` separately as decorative artwork. Add stable `data-patch-series-lockup` and `data-specialists-wordmark` hooks; do not expose a styling class or `data-testid` as the public contract.

Do not use Chassis as live text anywhere in the opening.

- [x] **Step 3: Port the accepted opening geometry exactly**

Translate the Opening contract above into the private `UsualSpecialistsOpening.styles.ts` owned by `UsualSpecialistsOpening.tsx`. `UsualSpecialistsPage.styles.ts` may own only the page root, route-level CSS custom properties/gutters, clipping/surface mechanics and journey-rope/clip overlay that genuinely span chapter boundaries. It must not target `UsualSpecialistsOpening` or `IndexChapter` descendants; chapter slices read any shared CSS variables intrinsically.

Use the accepted apartment derivative as a real image with width/height attributes, eager loading and high fetch priority.

- [x] **Step 4: Port the temporary rope without changing its geometry**

Render the exact SVG path and line treatment. Put the 3300 px rope inside a clip wrapper whose visible height ends with the currently implemented story. The clip wrapper may reveal more of the same path when future chapter siblings extend the route; it must not compress the SVG vertically.

Keep the rope and anchor out of the accessibility tree and pointer interaction.

- [x] **Step 5: Run focused GREEN tests**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

- [x] **Step 6: Mark Task 3 complete and commit normally**

```powershell
git add src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/client/src/features/patch-showcase/usual-specialists .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git commit -m "feat: add Specialists opening composition"
```

---

## Task 4 - Build the accepted Index chapter with substrate-owned traversal

**Files:**
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.tsx`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.styles.ts`
- Create: `src/client/src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx`
- Modify: `src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx`

**Interfaces:**
- Consumes: `usualSpecialistsAssetPath`, accepted Index/Patch assets, exact base/ultrawide/1399/900/720/390 geometry above.
- Produces: the self-contained `IndexChapter` vertical slice; stable hooks `data-specialist-chapter="index"`, `data-index-story-card`, `data-index-lockup`, `data-index-traversal`, `data-substrate` on traversal figures, and `data-index-substrate` on chapter-owned document surfaces. No parent/orchestrator selector is part of this interface.

- [x] **Step 1: Write the Index semantic/source-order RED**

Require the chapter before implementation:

```tsx
const chapter = screen.getByRole('region', { name: 'Index' })
expect(within(chapter).getByRole('heading', { level: 2, name: 'Index' })).toBeVisible()
expect(chapter).toHaveTextContent('Index is already moving before Patch finishes the pitch.')
expect(chapter).toHaveTextContent('PROVENANCE | TRACE THE ROUTES')
expect(chapter).toHaveTextContent("You son of a gun. I'm in!")
expect(chapter.querySelectorAll('[data-index-traversal]')).toHaveLength(7)
expect(chapter.querySelector('[data-index-traversal="index-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
expect(chapter.querySelector('[data-index-traversal="patch-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
expect(document.querySelector('[data-specialist-chapter="silk"]')).toBeNull()
```

Run and observe RED because Index is not yet rendered:

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx
```

- [x] **Step 2: Implement semantic structure and explicit asset ownership first**

Build `IndexChapter` with:

- real hidden/visually unobtrusive `h2` labelled `Index`;
- accepted INDEX outline SVG as the visual name mark;
- live strapline text;
- accepted story copy;
- live assent copy over the blank note;
- seven traversal `<img>` elements with intrinsic derivative dimensions and empty alt/decorative semantics: Index 1, Index 2, Index 3, Patch 1, Patch 2, Index return and Patch return;
- document substrate images with meaningful alt only where they carry distinct visual story information.

Add `data-substrate="desk-diagram"`, `blue-carrier`, or `commission-03-baseline` exactly where the wireframe ownership says the figure lives.

Expose chapter-owned substrate hooks for relationship tests without leaking styled-component classes: `data-index-substrate="desk-diagram"` on the main design-document wrapper, `blue-carrier` on the blue carrier wrapper, `graph-paper` on the graph-paper spill, `commission-03` and `commission-04` on their insets, and `assent-note` on the note wrapper.

Keep `IndexChapter.styles.ts` private to this slice. Define directly styled owners such as `IndexWalk`, `IndexReturn`, `PatchReturn`, `MainDocument`, `BlueCarrier`, `StoryCard`, `AssentNote` and the other chapter-local surfaces; attach the relevant geometry to those owners. Do not translate the scratch HTML literally into descendant selectors such as `.index-main > .index-traversal--index-walk`, and do not export chapter-internal styled components for `UsualSpecialistsPage` to target.

- [x] **Step 3: Port the wide/base layout and layering**

Implement the base variables and positions from the accepted visual contract. Preserve z-order so:

1. document bases establish the plane;
2. wide traversal pair occupies its substrate;
3. Commission 03 physically occludes the second pair;
4. story card and note remain readable;
5. rope passes through as the separate page-wide overlay.

No mirroring transform is allowed in the base/wide choreography.

- [x] **Step 4: Port the approved `1401-2560` ultrawide composition as chapter-owned styled components**

Implement the exact authored ultrawide contract above. Required outcomes:

- `1400px` remains governed by the previously accepted base composition; the new regime starts at `1401px` with no visible jump;
- main design-document and blue-carrier edges move inward together while preserving paper overspill;
- Index 1 switches to its fixed `1047px` main-substrate offset so its distance from Patch 1 never grows beyond the 1400 relationship except `2px` rendering tolerance;
- Commission 03/04/note/story anchors use the exact clamp values above rather than continuing viewport-centred extrapolation;
- at `1600px+`, render `IndexReturn` at `top: 50%`, `left: clamp(1240px, 78%, 1780px)`, `width: 96px`, `scaleX(-1)` and `PatchReturn` behind her at `top: 55%`, `left: calc(clamp(1240px, 78%, 1780px) + 95px)`, `width: 100px`, `z-index: 9`, `scaleX(-1)`;
- both return figures remain children of the main design-document substrate and hidden below `1600px`;
- at `1921px+`, use the exact eased main-document/carrier clamps and let all clamps cap by the authored `2560px` ceiling.

The return pair is the **only** character-mirroring exception in this slice. Apply the transform in each figure's own styled component; no parent selector applies it.

- [x] **Step 5: Port `<=1399` and `<=900` without changing the locked choreography**

Use the exact variable values, character widths and Index-1 interpolation above. Patch 2 stays present through the 721-900 band. Preserve shared `12px` pair footline compensation and Index 2's `108px` offset.

- [x] **Step 6: Port `<=720` mobile composition**

Use `--index-mobile-traversal-lift: 19%`. Hide Index 1, Index 2 and Patch 2; show Index 3 high-step and Patch 1 on the blue carrier at the approved same-plane scale. Keep the story card absolute and the graph-paper relation to its top edge.

- [x] **Step 7: Port `<=390` corrections and final typography values**

Apply only the approved narrower corrections: `-10px` extra Index 3 lift, left positions, mark safe-area formula, `.7rem` handwriting span and inherited `1.1rem` strong line. Do not invent a new 320-specific design regime.

- [x] **Step 8: Prove the unit contract GREEN**

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx
```

- [x] **Step 9: Mark Task 4 complete and commit normally**

```powershell
git add src/client/src/features/patch-showcase/UsualSpecialistsPage.tsx src/client/src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/client/src/features/patch-showcase/usual-specialists .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git commit -m "feat: stand up accepted Index chapter"
```

---

## Task 5 - Add responsive, accessibility and visual proof for the accepted translation

**Files:**
- Modify: `src/client/e2e/project-story.spec.ts`
- Modify only if needed for explicit decorative classification: `src/client/e2e/accessibility.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Create after Harley approval: `src/client/e2e/visual-regression.spec.ts-snapshots/patch-usual-specialists-index-{2560,1600,1440,768,390,320}.png`

**Interfaces:**
- Consumes: stable visual/substrate hooks from Tasks 3-4 and the accepted responsive contract.
- Produces: objective breakpoint/overflow assertions plus Windows visual baselines for the approved React translation.

- [ ] **Step 1: Write browser assertions for the new route before any browser-only repair**

Add a dedicated Specialists block that visits `/patch/the-usual-specialists` and checks `2560`, `1921`, `1920`, `1600`, `1599`, `1440`, `1401`, `1400`, `768`, `390`, `320` plus the existing narrow breakpoint edges.

At every width require:

```ts
await expect(page.getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
await expect(page.getByRole('region', { name: 'Index' })).toBeVisible()
await expectNoHorizontalOverflow(page)
```

Require story-card bounds and `[data-index-lockup]` bounds to remain inside the viewport. Require source order opening -> Index and require no Silk/Writ/Klause/Rollback/Receipt chapter roots.

- [ ] **Step 2: Add band-specific traversal assertions**

For widths `721-1599`, Index 1 + Index 2 + Patch 1 + Patch 2 are displayed while Index 3 + Index return + Patch return are hidden. At `1600-2560`, Index 1 + Index 2 + Patch 1 + Patch 2 + Index return + Patch return are displayed while Index 3 remains hidden. At 720 and below, Index 3 + Patch 1 are displayed and the other five traversal figures are hidden.

At 900/768 verify Patch 2 and Index 2 remain on the same Commission 03 baseline within a small rendering tolerance. At 720/390 verify Patch 1 and Index 3 remain contained by the blue-carrier substrate bounding region rather than being viewport-anchored.

For the authored ultrawide band, add relationship assertions using bounding boxes and stable `data-*` hooks rather than implementation class names:

```ts
async function box(locator: import('@playwright/test').Locator) {
  const value = await locator.boundingBox()
  expect(value).not.toBeNull()
  return value!
}

const horizontalGap = (ahead: { x: number }, follower: { x: number; width: number }) =>
  ahead.x - (follower.x + follower.width)

const traversal = (name: string) => page.locator(`[data-index-traversal="${name}"]`)
const gapAt = async (width: number) => {
  await page.setViewportSize({ width, height: 1100 })
  await page.goto('./patch/the-usual-specialists')
  return horizontalGap(await box(traversal('index-walk')), await box(traversal('patch-follow')))
}

const separationAt1400 = await gapAt(1400)
for (const width of [1401, 1440, 1599, 1600, 1920, 1921, 2560]) {
  expect(await gapAt(width)).toBeLessThanOrEqual(separationAt1400 + 2)
}
```

At `1600`, `1920`, `1921` and `2560`, use `[data-index-substrate="desk-diagram"]`, `blue-carrier` and `graph-paper` bounding boxes to require the blue carrier and graph-paper spill to start left of the main design-document substrate edge so they still read as overspill. Require `[data-index-traversal="index-return"]` and `[data-index-traversal="patch-return"]` to be contained by the main `desk-diagram` substrate, with Index return left of and above Patch return. At `1599` both are hidden; at `1600` both are visible. Do not assert raw styled-component class names.

These assertions protect relationships, not every CSS pixel.

- [ ] **Step 3: Run the responsive/browser proof and repair only observed translation defects**

```powershell
cd src/client
npm run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists|direct route loads"
```

These are verification assertions added after the core chapter implementation, so they may already pass. Do not manufacture a failure merely to create a RED. If an assertion exposes a mismatch with the accepted wireframe, preserve TDD for that repair: keep the failing assertion as the observed RED, then change only the owning chapter styled component until it is GREEN. Do not weaken the assertion to accept a different composition.

- [ ] **Step 4: Run automated accessibility on the route**

```powershell
cd src/client
npm run test:e2e -- e2e/accessibility.spec.ts --grep "Usual Specialists"
```

Do not add accessibility exclusions to hide defects. Decorative traversal/paper imagery must be classified explicitly and semantic copy remains available.

- [ ] **Step 5: Serve the built route and perform the required human visual review**

Build and serve through the repo-owned preview flow:

```powershell
cd src/client
npm run build
npm run preview:test
```

Keep that one preview process running and reuse it for the whole visual review. Inspect `http://127.0.0.1:4173/patch/the-usual-specialists` in one browser window at:

- 2560 CSS px;
- 1920 CSS px;
- 1600 CSS px;
- 1440 CSS px;
- 768 CSS px;
- 390 CSS px;
- 320 CSS px;
- real browser 200% zoom;
- exact `1400/1401`, `1599/1600`, and `1920/1921` edges; other breakpoint edges when an obvious cliff is suspected.

Review against the locked Index-approved wireframe, not against the removed old React page. Check wordmark hierarchy, apartment crop, rope path, paper stacking, character scale/occlusion, Index safe area, sticky-note handwriting, copy containment and chapter-end breathing room. At ultrawide specifically verify: the main substrate edge still sits behind the left paper spill; Index 1 never wanders farther from Patch 1 than at 1400; the return pair appears only from 1600, both characters face left, Index leads, Patch follows lower/right and paints behind her; the layout remains deliberately composed at the 2560 design ceiling.

**STOP for Harley's explicit React visual approval before authoring new pixel baselines.**

- [ ] **Step 6: After approval, write the six visual-regression tests and author the accepted Windows baselines**

Use the route root contract:

```ts
const story = page.locator('[data-visual-contract="patch-usual-specialists-index-draft"]')
await waitForImages(story)
await expect(story).toHaveScreenshot(`patch-usual-specialists-index-${width}.png`)
```

Author baselines once with `--update-snapshots` only after Harley has approved the React translation. Then run the affected test **twice without update mode** and require both passes.

```powershell
cd src/client
npm run test:e2e:visual -- --grep "Specialists Index draft" --update-snapshots
npm run test:e2e:visual -- --grep "Specialists Index draft"
npm run test:e2e:visual -- --grep "Specialists Index draft"
```

- [ ] **Step 7: Run the focused build/budget proof**

```powershell
cd src/client
npm run media:usual-specialists:check
npm run build
```

Record the `UsualSpecialistsPage` route chunk size and entry JS/CSS budget output in the plan execution notes. A passing global budget does not excuse an unexplained large route chunk.

- [ ] **Step 8: Mark Task 5 complete and commit normally**

```powershell
git add src/client/e2e/project-story.spec.ts src/client/e2e/accessibility.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots .agents/plans/2026-09-10-port-17-index-react-first-draft.md
git commit -m "test: lock accepted Specialists Index draft"
```

---

## Task 6 - Record the repo decision and open the long-running draft PR

**Files:**
- Modify: `docs/design-decisions.md`
- Modify: `.agents/plans/2026-09-10-port-17-index-react-first-draft.md`
- Move after publication proof: `.agents/plans/2026-09-10-port-17-index-react-first-draft.md` -> `.agents/plans/completed/2026-09-10-port-17-index-react-first-draft.md`
- Regenerate affected `INDEX.md` files mechanically.

**Interfaces:**
- Consumes: Harley's approved React rendering, green focused/browser/visual proof and successful normal hooked commits.
- Produces: durable repo decision, completed Index implementation plan, pushed branch and draft PR linked to PORT-17 while leaving the broader Specialists page explicitly incomplete.

- [ ] **Step 1: Add the dated design-decision entry**

Record that `/patch/the-usual-specialists` now follows the accepted PORT-16 document-world chapter composition instead of the retired six-profile dossier; opening + Index are implemented first; later chapters are appended only after wireframe approval; the red rope is temporary; wordmarks publish as outlined SVGs with no commercial font binary.

Reconsideration trigger: reopen the Index composition only if a real browser/accessibility/performance constraint makes the accepted geometry unworkable, or Harley explicitly reopens the design.

- [ ] **Step 2: Run final focused verification before the closing commit**

Run the complete affected unit files, Specialists `project-story` tests, accessibility route, media check, build/budgets, and Windows Specialists visual test twice. Do not run the full canonical CI here if the next action is a normal commit; the hook owns that full run.

```powershell
cd src/client
npm test -- --run src/features/patch-showcase/UsualSpecialistsPage.test.tsx src/features/patch-showcase/usual-specialists/UsualSpecialistsOpening.test.tsx src/features/patch-showcase/usual-specialists/IndexChapter.test.tsx src/components/SiteLayout.test.tsx src/pages/ContentPage.test.tsx src/pages/PatchRoutes.test.tsx src/features/case-study/projectPresentations.test.tsx scripts/process-usual-specialists-assets.test.ts
npm run test:e2e -- e2e/project-story.spec.ts --grep "Usual Specialists|direct route loads"
npm run test:e2e -- e2e/accessibility.spec.ts --grep "Usual Specialists"
npm run test:e2e:visual -- --grep "Specialists Index draft"
npm run test:e2e:visual -- --grep "Specialists Index draft"
npm run media:usual-specialists:check
npm run build
```

- [ ] **Step 3: Mark Tasks 1-5 complete and record final verification evidence**

Update all executed Task 1-5 checkboxes to `[x]`, include concise observed command evidence and Harley's approval note, and leave Task 6 open while publication is still pending.

- [ ] **Step 4: Commit the design decision and verified implementation state normally**

```powershell
git add docs/design-decisions.md .agents/plans/2026-09-10-port-17-index-react-first-draft.md src/client
git commit -m "docs: record accepted Specialists Index draft"
```

The hook must pass. Never bypass it.

- [ ] **Step 5: Verify clean branch state and publish a draft PR**

Verify:

```powershell
git status --short
git log --oneline origin/main..HEAD
git diff --stat origin/main...HEAD
```

Require `git status --short` to be empty. Then prepare the PR body outside the repo from the checked-in template and publish through the repo's GitHub route:

```powershell
$scratch = 'Z:\_agent-scratch\portfolio\codex-port-17-index-react'
New-Item -ItemType Directory -Force -Path $scratch | Out-Null
$prBodyPath = Join-Path $scratch 'port-17-pr-body.md'
$template = Get-Content -LiteralPath '.github\pull_request_template.md' -Raw
$milestone = @'

## PORT-17 Index milestone

- Index is the only completed Specialist chapter in React.
- Opening, apartment and Index visuals are the accepted PORT-16 composition.
- The red rope is the temporary wireframe placeholder, not final art.
- Silk, Writ, Klause, Rollback, Receipt and the completed-folder close are intentionally absent.
- This PR remains draft while the branch returns to wireframe -> chapter approval -> React integration cycles.
- Local publication proof: use the actual successful hooked-commit SHA and the focused/visual evidence recorded in the implementation plan.
'@
Set-Content -LiteralPath $prBodyPath -Value ($template + $milestone) -Encoding UTF8

git push -u origin codex/port-17-index-react
gh pr create --draft --base main --head codex/port-17-index-react --title "PORT-17: stand up accepted Index chapter in React" --body-file $prBodyPath
gh pr view --json number,url,state,isDraft,baseRefName,headRefName,headRefOid
```

Before `gh pr create`, fill every applicable prompt in the copied PR template with the actual Task 5/Task 6 evidence; do not delete the design, accessibility, performance, factual, custody or visual-evidence prompts. The milestone section must still say clearly:

- Index is the only completed Specialist chapter in React;
- opening/apartment/Index visuals are accepted;
- red rope is the wireframe placeholder, not final art;
- remaining chapters are intentionally absent;
- this PR stays draft while the branch returns to wireframe -> chapter approval -> React integration cycles.

Do not merge it as part of this plan.

Use the repo PR template and the repo's GitHub publication route. After creation, read the draft PR back and record its URL, number, branch, and full head SHA in this plan. Draft PR creation is publication proof for this milestone; draft CI is intentionally not expected to run under current repo policy.

Compare `headRefOid` from `gh pr view` with `git rev-parse HEAD`; they must match before continuing.

- [ ] **Step 6: Complete and archive the plan only after draft-PR readback**

After the draft PR exists and its published head matches the local branch:

1. mark Task 6 Steps 1-5 `[x]`;
2. record the draft PR URL/number and published head SHA;
3. mark this Step 6 `[x]`;
4. move the plan to `.agents/plans/completed/2026-09-10-port-17-index-react-first-draft.md`;
5. regenerate the plan indexes mechanically;
6. commit the archive move normally;
7. push that archive commit to the same draft PR;
8. read the PR back again and verify its head matches the archive commit.

```powershell
Move-Item -LiteralPath .agents/plans/2026-09-10-port-17-index-react-first-draft.md -Destination .agents/plans/completed/2026-09-10-port-17-index-react-first-draft.md
py -3 tools/run.py index-mesh --apply
git add .agents/plans .agents/INDEX.md
git commit -m "docs: archive PORT-17 Index React plan"
git push origin codex/port-17-index-react
gh pr view --json number,url,state,isDraft,headRefName,headRefOid
```

If `index-mesh --apply` updates additional generated `INDEX.md` files, stage exactly those generated outputs as well; never hand-edit them.

---

## Handoff Gate

**Plan-readiness: 9.8 / 10.**

- Scope is now explicit after Harley corrected `Silk` to `Index`: only opening, apartment, Index and temporary rope are in this slice.
- The old React dossier and obsolete tests are explicitly retired instead of being allowed to constrain the approved replacement.
- The route-owned shell seam, source-custody boundary, public derivative pipeline, no-font rule, vertical chapter ownership and future chapter extension seam are named.
- The locked Index-approved wireframe is identified by path and SHA-256; exact accepted source files, hashes, responsive values, character choreography, typography values and rope geometry are restated in the plan.
- The repo's React composition grammar is explicit: each chapter is a vertical slice with private styled-components ownership; parents compose the chapter as a unit and do not reach through into child DOM or style internals.
- The authored `1401-2560` regime is fully specified: 1400 continuity, inward paper/substrate choreography, Index/Patch maximum separation, 1600 return-pair threshold, approved CSS mirroring exception, 1921 easing and 2560 design ceiling.
- TDD RED/GREEN steps are explicit for route ownership, asset pipeline, opening and Index implementation.
- Breakpoint edges through the 2560 ultrawide ceiling, 320 px, actual 200% zoom, accessibility, route laziness, asset budgets and Windows visual baselines are explicit.
- The final plan is committed before implementation handoff, and the plan remains in-flight until the draft PR has been created and read back; its own completion/archive sequence is therefore executable rather than circular.
- The fourteen accepted PNG masters have an explicit 27,747,221-byte custody exception and exact source -> repository master -> public derivative mapping, including the approved mirrored Index/Patch Model 5 return pair, so implementation does not have to infer which scratch files become durable sources.
- Exact focused verification, mesh regeneration, normal hooked commits, draft-PR publication and PR-head readback commands are named; the canonical CI is not redundantly run around normal commits.
- The only intentional human-owned gate is Harley's visual approval of the React translation before new screenshots become protected baselines and before the draft PR is raised.

## Preconditions and observed baseline

- Worktree: `Z:\_agent-worktrees\portfolio\codex\port-17-index-react`.
- Branch: `codex/port-17-index-react`.
- Base: `7187b68bb39885495edbc5ef67664b1e8d38fd7e`, which matched `origin/main` when the repo worktree script created the workspace.
- Fresh-main gate rechecked on 2026-09-10 before plan handoff: `git fetch origin main`; `HEAD...origin/main` -> `0 0`; `origin/main` remained `7187b68bb39885495edbc5ef67664b1e8d38fd7e`.
- The repo worktree helper initialized/rolled the marketplace submodule, refreshed installed skills/index mesh and installed npm dependencies.
- Focused baseline unit proof before planning: `UsualSpecialistsPage.test.tsx` + `projectPresentations.test.tsx` -> `2 passed`.
- Focused baseline browser proof before planning: existing Specialists/Patch-family tests in `project-story.spec.ts` -> `3 passed`.
- Baseline build completed successfully with entry JS `212648 / 358400`, entry CSS `8344 / 40960`, CV PDF `219470 / 524288`; old `UsualSpecialistsPage` chunk was `16850` bytes before replacement.
- The worktree was clean before this plan file was created.

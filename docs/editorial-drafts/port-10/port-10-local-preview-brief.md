# PORT-10 local article-preview brief

**Status:** Ready for local planning and browser preview

**Branch:** `harleydbartles/port-10-rian-hughes-editorial-room`

**Draft PR:** #50

> **Browser-review correction, 2026-09-03:** the branch and draft PR are the preview boundary. Do not add a runtime preview state or suppress normal article furniture. The branch route must render exactly as it would after publication, including canonical writing metadata, reading time, continuation links, sharing, writing-index admission and sitemap admission; publication still requires Harley to merge the reviewed PR.

> **Figure correction, 2026-09-03:** keep only the construction-overlay Specialists figure. Harley preferred it to the clean duplicate during browser review; retain its datum key and explanatory caption.

## Goal

Stand the locked PORT-10 manuscript up as a real portfolio writing route on this same branch, compose its agreed links and owned figures into the article page, and put the rendered route in a browser for Harley to review.

This is a preview gate, not publication approval. Keep the PR draft. Do not merge, mark it ready, feature the article, announce it as published, or make unrelated homepage/index/reading-graph decisions.

## Read order

1. `docs/editorial-drafts/port-10/port-10-third-draft.md` — locked manuscript and page-placement notes.
2. `.agents/doctrine/portfolio-design-policy.md` — current portfolio voice, visual, accessibility and link behaviour.
3. `.agents/specs/2026-08-21-portfolio-10k-07-writing-authority-design.md` — writing-route and article-figure contract.
4. The current production writing route, manifest, typed article-figure system and at least one rendered published essay. Inspect current branch truth rather than planning from an old implementation snapshot.
5. The canonical owned assets named below.

Write the JIT implementation plan only after that inspection. Keep it narrow enough to get this article into the browser without turning PORT-10 into another site-wide writing-system phase.

## Locked editorial contract

The prose in `port-10-third-draft.md` is Harley-approved and locked. Do not line-edit, paraphrase, smooth, shorten, expand or re-title it during implementation.

The title is exactly:

`How The Invisibles’ logo designer influenced The Usual Specialists`

The final line is exactly:

`As I remember it, anyway.`

The repeated `as I remember it` language is structural, not disposable hedging. Preserve it exactly.

Bracketed/italicised notes in the manuscript are implementation directions, not public prose. Resolve them into links, figures and layout, then remove the notes from the rendered article.

If implementation exposes a genuine copy defect, stop and bring it back to Harley rather than silently editing around it.

## The article's visual argument

The page should let the visuals carry claims the manuscript no longer needs to repeat.

### The Usual Specialists wordmark

Use the canonical outlined asset:

`src/client/public/media/homepage/the-usual-specialists-wordmark.svg`

Give the finished mark enough width and breathing room to inspect. It is evidence under discussion, not a decorative logo dropped beside the copy.

### Construction/grid figure

Immediately after the finished wordmark, show a restrained construction view of the same mark. The purpose is to make the datum layout and the positioning relationship between `THE`, `USUAL` and `SPECIALISTS` legible.

Derive this from the owned/canonical outlined geometry. Do not embed, ship or reconstruct a licensed Chassis font binary. Do not manufacture a pseudo-forensic dimension sheet. Show only grid/datums that help the reader understand how the word was assembled.

If a new derived asset is created, update the appropriate asset-custody record.

### PATCH cameo

Use the canonical Adventures of PATCH cliff-drop lockup as the small inset near the PATCH paragraph:

`src/client/public/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg`

It is a cameo whose job is to show the different typographic answer. Do not let it become a second case study or compete with the Specialists mark.

## Links to resolve

Treat the links as part of the editorial composition rather than footnote furniture. Verify every public destination immediately before implementation.

- **The Usual Specialists**: internal route to the current Lawful Heist crew page.
- **Eurostile, Bank Gothic, Korolev, Chassis**: each font name should link to a reputable public specimen/listing where a reader can inspect the face. Prefer current foundry/distributor specimens; do not reproduce unlicensed specimen art locally.
- **Tales from Beyond Science**: link the title to a public page where the reader can actually see examples of Rian Hughes's art, not merely a bibliography entry.
- **Rian Hughes design philosophy**: one useful public source where Hughes is on record discussing the relationship between type, illustration and graphic design. The manuscript deliberately summarises only what the idea means inside Harley's story; the link carries the deeper rabbit hole.
- **Brand Addition**: use a natural internal backlink into Harley's existing professional-history surface. Prefer a stable deep target only if the current route already supports one cleanly; do not invent a fragile anchor or rework About merely to create one.

Follow current portfolio link policy: internal links stay in the current context; external links use the established external-link treatment and accessible context-change announcement.

## Route and publication state

Use the current writing system rather than building a one-off microsite. A working slug candidate is:

`how-the-invisibles-logo-designer-influenced-the-usual-specialists`

Local Sol owns verifying the present route/manifest contract before committing to that exact representation.

The route must be browser-previewable on this branch without falsely claiming a public publication event. If the current content system makes that awkward, choose the smallest reversible branch-only solution and record the compromise in the JIT plan. Do not quietly invent an editorial dateline, homepage proposition, index lead, continuation graph or publication summary as if Harley had approved it. If the schema genuinely requires new public copy, surface that as a Harley gate.

Article-specific principal figures should follow the current typed React article-figure pattern rather than introducing MDX, a runtime chart/diagram dependency or raw layout hacks inside Markdown.

## Visual direction

This should still look like the portfolio's authored editorial system, not a bespoke Rian Hughes homage and not a generic blog template.

The page can borrow energy from the material under discussion through scale, placement and evidence choreography. Do not imitate Hughes's artwork, The Invisibles branding or Tales from Beyond Science. The article is about Harley's route through the influence, not a pastiche.

Let the title set the tempting `comic-book design influenced comic-book design` assumption. Let `Chassis was already winning.` break it immediately. The page should not add a subtitle, dek, pull quote or illustration that explains the trick before the prose does.

## Browser review gate

Before handing the route back to Harley:

- build and serve the current production-style preview using the repository's existing scripts;
- inspect the actual rendered article at desktop, tablet and narrow mobile widths, including the repository's established 1440, 768, 390 and 320 CSS-pixel checks where applicable;
- read the article continuously in the browser and confirm the locked paragraph rhythm survived rendering;
- confirm the title and first sentence land together without an inserted explanation between them;
- confirm the wordmark is large enough to inspect and the grid figure explains rather than decorates;
- confirm the PATCH lockup remains a cameo;
- confirm all internal and external links behave according to policy;
- confirm figures have useful accessible text/captions and the argument survives if imagery fails;
- confirm there is no horizontal overflow or broken narrow-screen composition;
- run the focused tests owned by the changed writing/route/figure surfaces; and
- leave the preview running or provide the exact local route and command needed for Harley to open it immediately.

Sol must personally inspect the rendered route rather than accepting a worker's description of it.

## Stop condition

Stop when the article is implemented far enough for a faithful browser review on this branch and the focused local evidence is green.

Leave a concise handoff stating:

- the local preview URL/route;
- what changed;
- links and figures actually used;
- tests/build checks run;
- any unresolved visual or source question; and
- `Ready for Harley browser review` or `Blocked`.

Do not cross from preview into publication/merge without Harley's next decision.

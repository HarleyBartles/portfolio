# Portfolio Site Design

## Purpose

This is the canonical design for Harley Bartles' personal portfolio website. The site exists as one URL to send anyone to and say "here is the stuff I made." It must look authored, not assembled.

Primary message: "I build agentic engineering workflows and silly comics."

## Audience

- Hiring managers and interviewers.
- Other engineers who want to see how Harley works.
- Anyone Harley points at to prove the work is real.

## Success criteria

- A new visitor knows who Harley is and what he does within 10 seconds.
- The work is honest: no project is sold as finished when it is still in progress.
- The site is fast, accessible, and readable.
- The Patch Fairytales give people a reason to return.

## Hosting and deployment

This is a static site.

- The client build target is GitHub Pages.
- The .NET backend in `src/server/` is not the host; it is one of the projects to showcase.
- Vite builds the client to a `dist/` or `build/` directory that GitHub Pages serves.
- React Router is configured with a 404 fallback for GitHub Pages if it is used for client-side routing.

## Pages and navigation

Four top-level nav items, visible on desktop without a hamburger:

1. **Projects** - the main proof.
2. **Patch Fairytales** - the recurring, playful proof.
3. **Writing** - articles and notes.
4. **About** - short bio and contact.

A single sticky header holds the nav and a site mark. No mega-menus.

## Homepage structure

The homepage is a vertical stack with deliberate pacing.

1. **Hero** - name, tagline, and a single link to Projects.
2. **Featured project** - the strongest current project, updated as work evolves.
3. **Random Patch Fairytale** - a panel showing one one-page fairytale with a shuffle control.
4. **Latest writing** - 3-4 article links.
5. **Footer** - GitHub, email, and links.

## Projects

Each project is presented as a card with:
- title;
- one-line role (e.g. "author," "maintainer," "work in progress");
- honest status (live, alpha, incomplete, work in progress);
- a short description;
- links to the repo, live app, or docs;
- a list of the actual engineering wins inside it.

Initial project inventory:

- **codex-marketplace** (public). The marketplace of agent skills and runbooks. Proves robust skill authorship and distribution at scale.
- **Agentic Learning Lab** (currently private; to be made public). A curriculum for teaching non-coders to work with agents. Status: incomplete but improving weekly.
- **Wild Bunch** (currently private; to be made public). A real, in-progress application with known bugs and rough UI. Status: work in progress.
- **Adventures of Patch** (public). The source of Patch Fairytales. Proves a repeatable visual and narrative production pipeline.

No project is presented as complete unless it is.

## Patch Fairytales

A fairytale is a one-page PNG and a `manifest.json` from `adventures-of-patch/published/fairytales/`. Each has:
- `core_lesson` - the concise principle;
- `finished_page` - the one-page image;
- `source_scenes` - the scenes used;
- `provenance_notes` - how it was made and approved.

The site displays the finished page with the core lesson and provenance. A "random fairytale" control fetches another published fairytale. For launch, copy approved page PNGs and manifests into the portfolio repo at build time. Link to the public `adventures-of-patch` repo once a public asset URL is stable.

## Writing

Articles and notes about agentic engineering, design, and tooling. Markdown content in `src/content/writing/`. Each entry has a title, date, summary, and link.

The first pass includes four backdated articles, one every few days from early August:

1. **2026-08-05 - The graph I built to keep a review agent from going in circles** - the iterative-review Mermaid state graph, scope-honesty, and the pitfall of the reviewer reviewing itself.
2. **2026-08-07 - Context is not the same as state** - why durable files beat conversation memory, drawn from the agentic-learning-lab threads.
3. **2026-08-12 - Provisioning is not accumulation** - when adding more instructions to the agent makes it worse.
4. **2026-08-15 - Pass references, not paragraphs** - multi-agent handoffs and the N+1 problem for context loads.

## About

Short bio, the same tagline, and a clear contact path. No full resume. The site is the resume.

## Visual approach

Keep the existing warm, editorial palette and typefaces from `src/client/src/styles/_tokens.scss`:
- canvas: `#f6f1e8`
- surface: `#fffaf0`
- ink: `#1f241f`
- muted: `#6b6458`
- accent: `#b25632`
- focus: `#235c67`

Typography:
- `Fraunces` for display headings.
- `Source Serif 4` for body text.
- `Cascadia Code` for code and accent labels.

Layout:
- `main` width capped at `72rem` and centered.
- Spacing from the existing token scale: `--space-1` to `--space-8`.
- Large, comfortable type, a clear typographic scale, and generous whitespace.

## Motion

Minimal and purposeful:
- a hover lift on project and writing cards;
- a fade or cross-fade when the random fairytale panel swaps images;
- all motion respects `prefers-reduced-motion`.

No scroll-jacking, no ambient loops, no decorative motion that does not clarify state.

## Tools and dependencies

This is a static Vite + React site.

- No .NET backend for serving the site.
- No new CSS framework. Keep the existing SCSS tokens and `global.scss`.
- `lucide-react` for icons (deferred to after v0.1 if not needed immediately).
- A Vite image optimizer for the fairytale PNGs (deferred).

## Asset pipeline

Projects need a thumbnail or hero image. For now, each project can ship without one. Fairytale images are the one large asset class. Optimize them at build time.

## Content pipeline

- **Projects**: JSON files in `src/content/projects/`.
- **Writing**: markdown files in `src/content/writing/`.
- **Patch Fairytales**: build step copies `page__*.png` and `manifest.json` from `adventures-of-patch` into `public/patch-fairytales/`. A Node or Python script reads the manifests and writes `src/content/fairytales.json`.

## Accessibility

- Colour contrast meets WCAG 2.2 AA for all text.
- Focus states are visible.
- Images have alt text from the fairytale manifest.
- Keyboard can operate the random fairytale control.

## Performance

- Largest Contentful Paint is the hero text, not a hero image.
- Fairytale images are the only large visuals; they must be optimized and lazy-loaded.
- No third-party scripts except fonts.

## Non-goals

- E-commerce, analytics, or a CMS.
- A design system separate from the existing SCSS.
- A dark mode for launch.
- A blog with comments.
- A backend, database, or API for launch.

## Open questions

- Does the user want a contact form or just an email link? Email link for now.
- Should the writing list pull from a feed? No; static content for now.

## Handoff

Once this design is approved, the next step is a `writing-plans` implementation plan for the homepage, project pages, writing pages, and article content.

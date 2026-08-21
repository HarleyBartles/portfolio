# Editorial Portfolio Overhaul Design

## Goal

Publish a substantial visual and editorial overhaul of Harley Bartles' portfolio that feels authored, specific, and production-finished. The site should present engineering proof without turning every section into a hiring pitch; the About page is the deliberate exception where experience, working style, availability, CV expectations, and contact are explicit.

## Approved direction

This design supersedes the page-level presentation in `2026-08-19-portfolio-site-design.md` while retaining its static React/Vite architecture, honest project-status language, warm editorial palette, and existing content inventory.

The approved concept is an **editorial engineering field journal**:

- warm paper, ink, copper, and a small controlled Patch-teal media accent;
- Fraunces for major display moments, Source Serif 4 for reading, and Fira Code for folios, dates, status, and controls;
- asymmetrical layouts and art-directed media rather than repeated bordered cards;
- motion only when hierarchy or state changes;
- project-native imagery and diagrams rather than stock or generic AI imagery.

## Audience and narrative

The audience priority is:

1. hiring managers and interviewers;
2. senior engineers and technical peers;
3. agentic-workflow practitioners and learners.

The homepage argument is:

1. Harley is a senior software engineer building reliable agentic systems.
2. His work joins engineering systems, teaching, public tooling, and memorable visual explanation.
3. Selected work proves the claim through inspectable projects and writing.
4. Patch provides a distinctive creative dimension without dominating the portfolio.
5. The About page makes the hiring proposition explicit.

## Homepage

### Hero

The hero keeps the memorable line "agentic engineering workflows and silly comics" but adds the professional thesis before it. It provides two actions: inspect selected work and visit the practical hiring/contact section.

### Editorial feature deck

The homepage replaces the static featured project and article with one editorial feature deck:

- one lead story occupies approximately two-thirds of the desktop width;
- two supporting stories remain visible beside it;
- the first lead is selected randomly on each full page load from a curated pool;
- Previous, Next, and Shuffle controls update the hierarchy manually;
- the deck never auto-advances;
- transitions use opacity and a small transform over about 320 ms;
- `prefers-reduced-motion` makes the state swap immediate;
- buttons have text labels, keyboard focus, and at least 44 px targets;
- fixed media proportions avoid layout shift;
- every important item remains available in later page sections even when it is not the lead.

The curated pool contains selected writing and project stories, with exactly one Adventures of Patch candidate. Patch uses purpose-built role-kit artwork and links to the pipeline case study. It does not shrink a completed one-page comic into an unreadable thumbnail.

### Supporting sections

The remainder of the homepage contains:

- three selected case studies with distinct media treatments;
- three working principles linked to concrete evidence;
- a featured essay plus a quieter list of recent notes;
- a restrained close pointing to About rather than a repeated sales pitch.

## Patch artwork

The Patch homepage/project artwork is derived from the checked-in pipeline outputs in the sibling `Z:\adventures-of-patch` repository. It combines the detective, cowboy, chef, and mechanic role-kit hero images into one flowing composition whose immediate message is "Patch can become anything the adventure needs."

The portfolio stores optimized WebP derivatives only. The custody record names the exact sibling-repo source files, records that Harley owns both repositories, lists the output dimensions and compression, and supplies descriptive alt text. The feature image is a media asset, not a text container.

Fairytale pages receive responsive WebP derivatives of the two published pages. The full PNG originals are removed from the deployed portfolio after the Markdown points at the derivatives. Detail pages include a useful visual transcript after the image.

## Brand mark

The HB mark remains deliberately plain: a square outline and the letters HB. It becomes a dedicated, hand-authored SVG with custom geometry, optical spacing, and an explicit hover/current-state treatment. It is also the favicon. It is no longer browser text placed inside a CSS box.

## Projects, writing, and fairytales

### Projects

The project index uses distinct art direction:

- Agent Asset Marketplace: an icon/system constellation and inventory proof;
- Agentic Learning Lab: the venue-plan artifact and curriculum framing;
- Wild Bunch: a designed 16:9 capture placeholder that specifies the later screenshot brief without pretending to be gameplay;
- Adventures of Patch: the role-kit pipeline artwork.

Project detail pages present a media header and clearer case-study structure: purpose, current proof, decisions/constraints, what works, what remains, and inspectable links. Status labels remain honest.

### Writing

The writing index becomes a featured essay plus editorial list. Dates are human-readable and consistent, reading measure is constrained to 65-72 characters, and large titles are reserved for major hierarchy. Article detail pages use previous/next navigation instead of another generic card stack.

### Fairytales

The fairytale index shows visual thumbnails. Detail pages do not repeat the Markdown H1, use responsive image sources, include a visual transcript, and keep provenance secondary to the story.

## About and contact

About deliberately breaks the editorial illusion. Its lead is explicit: this is where a visitor can assess Harley for work.

It includes:

- six-and-a-half years of full-stack experience;
- senior-level responsibility without invented employer details or title inflation;
- an AI-forward working style grounded in requirements, source truth, verification, and accountability;
- the Level 6 AI Engineering apprenticeship;
- the kinds of engineering problems Harley is useful for;
- an honest note that a conventional CV download needs verified employment data before publication.

A contact form is the intended contact mechanism. The static client posts to an environment-provided HTTPS endpoint and never embeds a plaintext email address. The form has name, reply email, message, a honeypot, validation, clear submitting/success/error states, and no analytics. Until a real endpoint is supplied, the published page must not pretend that submission succeeds; it provides GitHub as the honest fallback and clearly labels contact delivery as not yet connected.

## Routing, metadata, and performance

The GitHub Pages `404.html` fallback is replaced by generated static entry documents for every index and manifest route. Each entry returns 200 from static hosting, contains route-specific title, description, canonical, Open Graph, and Twitter metadata, and hydrates the existing client router. A 404 fallback remains only for unknown paths.

Markdown content is loaded through lazy Vite glob imports so the homepage does not eagerly download every article body. Generated route entry documents and asset derivatives are build outputs or optimized public assets, never runtime API dependencies.

The initial application target is below 350 KB uncompressed JavaScript. Images have explicit dimensions, responsive sources, and lazy loading except when they are the active above-the-fold lead.

## Accessibility and motion

- WCAG 2.2 AA contrast for normal text; copper is darkened for small labels.
- A skip link precedes the site mark.
- Semantic headings and landmarks retain meaningful source order.
- Essential content is visible without JavaScript animation completing.
- No autoplay, anonymous carousel dots, scroll-jacking, or ambient loops.
- Reduced motion disables deck and hover transforms.
- The deck supports keyboard buttons and touch-friendly targets.
- Images have meaningful alt text; comics also have transcripts.
- Layout remains usable at 320 px and at 200% zoom.

## Non-goals and deferred inputs

- No Tailwind, shadcn, Lenis, CMS, database, analytics, dark mode, or backend rewrite.
- No invented Wild Bunch screenshot; the designed placeholder remains until Harley supplies a real capture.
- No public email address or phone number.
- No fabricated CV, employer history, outcome metric, testimonial, or project maturity claim.
- Contact delivery cannot become live until Harley supplies an HTTPS form endpoint.

## Validation

- Unit tests cover feature ordering, content lazy-loading, metadata, and contact-form state.
- Playwright covers homepage identity, accessible deck controls, direct route loads, navigation, fairytale media, About, mobile layout, and reduced motion.
- The build verifies generated route documents and bundle size.
- `py -3 tools/run.py ci --check`, client unit tests, client build, and Playwright all pass before publication.
- After pushing `main`, GitHub Pages deployment is verified and representative direct routes return a final HTTP 200.

## Readiness

Spec self-review found no placeholders or conflicting architecture. The only external dependency is the user-owned contact endpoint, and the fallback behaviour is explicit. **Spec-readiness: 9/10.**

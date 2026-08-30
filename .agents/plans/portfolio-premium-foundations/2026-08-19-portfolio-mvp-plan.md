# Portfolio v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/subagent-driven-development` (recommended) or `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first 70% of the portfolio site: homepage, projects, writing (with four backdated articles), about, and GitHub Pages deployment.

**Architecture:** Static Vite + React site. Content is JSON and markdown read at build time. React Router handles client-side navigation. The existing SCSS tokens and `global.scss` are the source of truth for styling.

**Tech Stack:** React, TypeScript, Vite, SCSS, React Router, GitHub Pages.

**Execution Strategy:** `manual` - implement in the current session with frequent commits.

**Global Constraints**
- Keep the existing `.agents/specs/2026-08-19-portfolio-site-design.md` as the source of truth.
- Do not introduce Tailwind, shadcn/ui, `motion`, `lenis`, or `lucide` in v0.1.
- No `.NET` backend for the site.
- All normal commits must pass the tracked hook's complete `ci --check` gate; use focused checks while iterating.
- Write articles in the user's voice: direct, evidence-based, no fluff.

---

### Task 1: Write the four backdated articles

**Files:**
- Create: `src/content/writing/2026-08-05-graph-iterative-review.md`
- Create: `src/content/writing/2026-08-07-context-is-not-state.md`
- Create: `src/content/writing/2026-08-12-provisioning-is-not-accumulation.md`
- Create: `src/content/writing/2026-08-15-pass-references-not-paragraphs.md`
- Create: `src/content/writing/INDEX.md` (generated)

**Interfaces:**
- Each markdown file has frontmatter: `title`, `date`, `summary`.
- Body is 800-1200 words based on the spec and the referenced repo material.

- [ ] **Step 1: Draft the four articles using the spec titles and the source material from `adventures-of-patch`, `iterative-review`, and the agentic-learning-lab docs.**
- [ ] **Step 2: Verify each article has frontmatter and a one-paragraph summary.**
- [ ] **Step 3: Commit the articles.**

---

### Task 2: Create project data

**Files:**
- Create: `src/content/projects/projects.json`
- Create: `src/content/projects/INDEX.md` (generated)

**Interfaces:**
- `projects.json` is an array of project objects:
  - `id`, `title`, `role`, `status`, `description`, `repo`, `links`, `wins`.
- Initial projects: codex-marketplace, Agentic Learning Lab, Wild Bunch, Adventures of Patch.

- [ ] **Step 1: Write `projects.json` with honest status and one concrete engineering win per project.**
- [ ] **Step 2: Add a TypeScript type `Project` in `src/types/content.ts` if it does not exist.**
- [ ] **Step 3: Commit the data file and type changes.**

---

### Task 3: Update site header and footer

**Files:**
- Modify: `src/client/src/components/SiteHeader.tsx`
- Modify: `src/client/src/components/SiteFooter.tsx`

**Interfaces:**
- `SiteHeader` receives the four nav links and a site mark.
- `SiteFooter` receives GitHub and email links.

- [ ] **Step 1: Update `SiteHeader` to show `Projects`, `Patch Fairytales`, `Writing`, `About` links.**
- [ ] **Step 2: Update `SiteFooter` to show GitHub, email, and copyright.**
- [ ] **Step 3: Keep the existing `global.scss` classes and do not add new dependencies.**
- [ ] **Step 4: Commit.**

---

### Task 4: Rebuild the homepage

**Files:**
- Modify: `src/client/src/pages/HomePage.tsx`
- Modify: `src/client/src/pages/HomePage.test.tsx` if it breaks

**Interfaces:**
- `HomePage` renders hero, featured project, random fairytale, latest writing, and footer.
- `featuredProject` is the first project from `projects.json`.
- `latestWriting` is the three most recent articles by `date`.

- [ ] **Step 1: Import `projects.json` and the writing markdown list.**
- [ ] **Step 2: Render a hero with the tagline and a link to `/projects`.**
- [ ] **Step 3: Render a `FeaturedProject` card using the first project.**
- [ ] **Step 4: Render a `LatestWriting` list with three article links.**
- [ ] **Step 5: Update or delete the existing `HomePage` tests so they still pass or are removed.**
- [ ] **Step 6: Commit.**

---

### Task 5: Build the projects page

**Files:**
- Create: `src/client/src/components/ProjectCard.tsx`
- Modify: `src/client/src/pages/ProjectIndexPage.tsx`

**Interfaces:**
- `ProjectCard` props: `project: Project`.
- `ProjectIndexPage` maps `projects.json` to `ProjectCard`.

- [ ] **Step 1: Create `ProjectCard` with title, status badge, description, and wins list.**
- [ ] **Step 2: Update `ProjectIndexPage` to render the project grid.**
- [ ] **Step 3: Add a minimal test or remove the old test if it is irrelevant.**
- [ ] **Step 4: Commit.**

---

### Task 6: Build the writing index and article pages

**Files:**
- Modify: `src/client/src/pages/WritingIndexPage.tsx`
- Modify: `src/client/src/pages/WritingPage.tsx`
- Create or modify: `src/client/src/components/ArticleCard.tsx`

**Interfaces:**
- `WritingIndexPage` lists articles with title, date, and summary.
- `WritingPage` renders a single markdown article.

- [ ] **Step 1: Create a helper that reads `src/content/writing/*.md` and returns metadata and HTML/JSX body.**
- [ ] **Step 2: Update `WritingIndexPage` to list all articles sorted by `date` descending.**
- [ ] **Step 3: Update `WritingPage` to render the selected article's markdown using `react-markdown`.**
- [ ] **Step 4: Commit.**

---

### Task 7: Build the about page

**Files:**
- Modify: `src/client/src/pages/AreaPlaceholderPage.tsx` or create `src/client/src/pages/AboutPage.tsx`

**Interfaces:**
- `AboutPage` renders a short bio, the tagline, and an email link.

- [ ] **Step 1: Create `AboutPage.tsx` with the bio and contact.**
- [ ] **Step 2: Remove or rename the placeholder if needed.**
- [ ] **Step 3: Commit.**

---

### Task 8: Wire up the router

**Files:**
- Modify: `src/client/src/app/router.tsx`

**Interfaces:**
- Routes: `/`, `/projects`, `/writing`, `/writing/:slug`, `/about`.

- [ ] **Step 1: Update `router.tsx` to map the four routes to the pages.**
- [ ] **Step 2: Verify `App.tsx` still renders the router correctly.**
- [ ] **Step 3: Commit.**

---

### Task 9: Configure GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `src/client/package.json` if needed
- Modify: `vite.config.ts` if needed

**Interfaces:**
- The GitHub Action builds and deploys the client to `gh-pages` on pushes to `main`.
- Vite `base` is set to `/portfolio/` for the repository name.

- [ ] **Step 1: Add `base: '/portfolio/'` to `vite.config.ts` if the repo is `HarleyBartles/portfolio`.**
- [ ] **Step 2: Create `.github/workflows/deploy.yml` that runs `npm ci`, `npm run build`, and `actions/deploy-pages`.**
- [ ] **Step 3: Commit.**

---

### Task 10: Final verification and cleanup

**Files:**
- All modified files.

- [ ] **Step 1: Run the focused checks and `npm run build` from `src/client/`.**
- [ ] **Step 2: Stage and commit the implementation branch normally; let the tracked hook run the complete gate once.**
- [ ] **Step 3: Push the proven commit and open a PR. Do not repeat the complete local gate before pushing or after the successful hook.**
- [ ] **Step 4: Merge only after the hosted checks confirm the exact head.**
- [ ] **Step 5: Move this plan to `.agents/plans/completed/` and update any index/roadmap links.**

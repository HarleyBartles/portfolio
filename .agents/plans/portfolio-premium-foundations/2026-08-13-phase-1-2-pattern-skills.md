# Phase 1.2 - Pattern skills

> **For agentic workers:** REQUIRED SUB-SKILL: Use /writing-skills and /writing-with-clarity to author and review the skills. Use /executing-plans or /subagent-driven-development to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create six repo-owned pattern skills that encode the specific design knowledge a later agent needs for tokens, typography, layout, motion, assets, and design reference evaluation.

**Architecture:** Each skill follows the repo skill structure: `SKILL.md` as the router and `references/` for synthesized guidance. The pattern skills extend the `designing-premium-sites` umbrella without depending on each other. `asset-custody` may include public reference citations if vendored sources are used; the other five skills are synthesized from the umbrella and domain practice.

**Tech Stack:** Markdown, the installed `writing-skills` and `writing-with-clarity` skills, `py -3 tools/run.py ci --check`.

## Global Constraints

- This phase produces repo-owned skills and their references, not application code.
- Repo-owned skills are unprefixed unless they are a repo-specific override of a marketplace skill.
- Every skill must have `SKILL.md` + `references/` structure.
- Every vendored source must have a `CITATIONS.md` entry with a compatible license.
- No new application UI, component code, visual identity, 3D/Spline/WebGL, backend features, CMS, auth, or blog infrastructure.
- `py -3 tools/run.py ci --check` must pass before the task is marked done.

---

### Task 1: `design-tokens` skill

**Files:**
- Create: `.agents/skills/design-tokens/SKILL.md`
- Create: `.agents/skills/design-tokens/references/naming.md`
- Create: `.agents/skills/design-tokens/references/tailwind-v4-theme.md`
- Create: `.agents/skills/design-tokens/references/consumption.md`
- Create: `.agents/skills/design-tokens/references/token-types.md`

**Interfaces:**
- Consumes: the master spec at `.agents/specs/2026-08-12-portfolio-premium-epic-spec.md` and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when creating, naming, or consuming design tokens for the portfolio.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/design-tokens/references
```

- [ ] **Step 2: Author `SKILL.md`**

Write `.agents/skills/design-tokens/SKILL.md` with these sections:

- `## Use when` - creating, naming, or consuming design tokens; deciding whether a value should be a token or hard-coded; converting tokens to Tailwind v4 `@theme`.
- `## Core thesis` - a token is a contract, not a variable; the name, value, and usage must all be discoverable.
- `## Token types` - color, typography, space, size, radius, shadow, z-index, breakpoint, motion.
- `## Naming rules` - semantic names (e.g. `color-surface-primary`), no ambiguous abbreviations, stable prefixes, explicit states.
- `## Tailwind v4 @theme contract` - how tokens map to the `@theme` block, the `@layer theme` pattern, and CSS custom property output.
- `## Consumption rules` - tokens read from `theme()`, never from arbitrary values, no one-off `!important` overrides.
- `## Reference routes` - pointers to `references/naming.md`, `references/tailwind-v4-theme.md`, `references/consumption.md`, `references/token-types.md`.
- `## Working rules` - when to add a token, when to delete a token, how to audit a token file for orphans.

- [ ] **Step 3: Write the four reference files**

Each reference must be concrete enough for a later agent to apply without inventing criteria:

- `references/naming.md` - token name grammar, allowed segments, and a `bad / better / best` table.
- `references/tailwind-v4-theme.md` - the exact `@theme` shape the portfolio uses, with a copy-pasteable template.
- `references/consumption.md` - how to use tokens in CSS, JSX, and Tailwind utility classes.
- `references/token-types.md` - definitions and example values for each token type.

- [ ] **Step 4: Use `/writing-with-clarity` to review the draft**

Fix vague adjectives, unsupported claims, or ambiguous signals in `SKILL.md` and the four references.

- [ ] **Step 5: Stage and commit the skill**

```powershell
git add .agents/skills/design-tokens/
git commit -m "docs: add design-tokens skill and references"
```

- [ ] **Step 6: Mark Task 1's boxes `[x]` in the plan file**

---

### Task 2: `typography-for-the-web` skill

**Files:**
- Create: `.agents/skills/typography-for-the-web/SKILL.md`
- Create: `.agents/skills/typography-for-the-web/references/type-pairing.md`
- Create: `.agents/skills/typography-for-the-web/references/hierarchy.md`
- Create: `.agents/skills/typography-for-the-web/references/font-loading.md`
- Create: `.agents/skills/typography-for-the-web/references/fallbacks.md`

**Interfaces:**
- Consumes: the master spec and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when choosing or reviewing fonts, scale, and loading strategy.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/typography-for-the-web/references
```

- [ ] **Step 2: Author `SKILL.md`**

Write `.agents/skills/typography-for-the-web/SKILL.md` with these sections:

- `## Use when` - choosing typefaces, defining type scale, loading web fonts, or reviewing typography.
- `## Core thesis` - good web typography is about reading first, then voice; every decision is a performance and accessibility trade-off.
- `## Type pairing` - how many typefaces, when to mix, when to stay with one, and what pairs work for a developer portfolio.
- `## Hierarchy` - heading count, scale ratios, line height, and measure constraints.
- `## Font loading` - `font-display: swap`, preloading, subsetting, and variable fonts.
- `## Fallbacks` - system font stack, metric-compatible fallbacks, and FOUT/FOIT handling.
- `## Reference routes` - pointers to the four references.
- `## Working rules` - when to self-host, when to use a CDN, and how to test font loading.

- [ ] **Step 3: Write the four reference files**

- `references/type-pairing.md` - rules for pairing and a short list of safe portfolio pairs.
- `references/hierarchy.md` - type scale table, line height, and measure rules.
- `references/font-loading.md` - preloading, display strategies, and subsetting guidance.
- `references/fallbacks.md` - system font stack and metric-compatible fallbacks.

- [ ] **Step 4: Use `/writing-with-clarity` to review the draft**

- [ ] **Step 5: Stage and commit the skill**

```powershell
git add .agents/skills/typography-for-the-web/
git commit -m "docs: add typography-for-the-web skill and references"
```

- [ ] **Step 6: Mark Task 2's boxes `[x]` in the plan file**

---

### Task 3: `web-layout` skill

**Files:**
- Create: `.agents/skills/web-layout/SKILL.md`
- Create: `.agents/skills/web-layout/references/grids.md`
- Create: `.agents/skills/web-layout/references/whitespace.md`
- Create: `.agents/skills/web-layout/references/composition.md`
- Create: `.agents/skills/web-layout/references/responsive-patterns.md`

**Interfaces:**
- Consumes: the master spec and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when designing or reviewing layout, grids, and composition.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/web-layout/references
```

- [ ] **Step 2: Author `SKILL.md`**

Write `.agents/skills/web-layout/SKILL.md` with these sections:

- `## Use when` - designing grids, spacing, composition, or responsive breakpoints.
- `## Core thesis` - layout is a set of intentional relationships between elements, not a collection of screen positions.
- `## Grids` - CSS Grid, Flexbox, when to use each, and how to keep grid structure intentional.
- `## Whitespace` - spacing as an active material, base unit, and how to avoid arbitrary margins.
- `## Composition` - hierarchy, focal points, and how to guide the eye without visual noise.
- `## Responsive patterns` - mobile-first breakpoints, content-driven adaptation, and avoiding breakpoint explosion.
- `## Reference routes` - pointers to the four references.
- `## Working rules` - when to break the grid, how to align to a base unit, and how to review a layout for drift.

- [ ] **Step 3: Write the four reference files**

- `references/grids.md` - grid types, common patterns, and anti-patterns.
- `references/whitespace.md` - spacing scale, rhythm, and how to treat negative space.
- `references/composition.md` - focal points, visual hierarchy, and balance.
- `references/responsive-patterns.md` - breakpoints, container queries, and adaptive content.

- [ ] **Step 4: Use `/writing-with-clarity` to review the draft**

- [ ] **Step 5: Stage and commit the skill**

```powershell
git add .agents/skills/web-layout/
git commit -m "docs: add web-layout skill and references"
```

- [ ] **Step 6: Mark Task 3's boxes `[x]` in the plan file**

---

### Task 4: `motion-patterns` skill

**Files:**
- Create: `.agents/skills/motion-patterns/SKILL.md`
- Create: `.agents/skills/motion-patterns/references/motion-primitives.md`
- Create: `.agents/skills/motion-patterns/references/scroll-reveals.md`
- Create: `.agents/skills/motion-patterns/references/view-transitions.md`
- Create: `.agents/skills/motion-patterns/references/reduced-motion.md`

**Interfaces:**
- Consumes: the master spec and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when adding or reviewing animation, scroll, and transitions.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/motion-patterns/references
```

- [ ] **Step 2: Author `SKILL.md`**

Write `.agents/skills/motion-patterns/SKILL.md` with these sections:

- `## Use when` - adding scroll reveals, view transitions, hover states, or any animation.
- `## Core thesis` - motion clarifies state and focus; if it decorates without clarifying, it is noise.
- `## Motion primitives` - duration, easing, stagger, and transform choice; the library is `motion`, not Framer Motion.
- `## Scroll reveals` - when to reveal, when to skip, and how to avoid scroll jacking.
- `## View transitions` - same-document and cross-document view transition rules.
- `## Reduced motion` - `prefers-reduced-motion` support and the default `reduce` story.
- `## Reference routes` - pointers to the four references.
- `## Working rules` - how to decide if an animation earns its place and how to test motion without a browser theater mode.

- [ ] **Step 3: Write the four reference files**

- `references/motion-primitives.md` - timing, easing, and transform rules.
- `references/scroll-reveals.md` - trigger, distance, and timing rules for scroll-driven motion.
- `references/view-transitions.md` - same-doc and cross-doc view transition API rules.
- `references/reduced-motion.md` - how to respect `prefers-reduced-motion` and what the fallback should be.

- [ ] **Step 4: Use `/writing-with-clarity` to review the draft**

- [ ] **Step 5: Stage and commit the skill**

```powershell
git add .agents/skills/motion-patterns/
git commit -m "docs: add motion-patterns skill and references"
```

- [ ] **Step 6: Mark Task 4's boxes `[x]` in the plan file**

---

### Task 5: `asset-custody` skill

**Files:**
- Create: `.agents/skills/asset-custody/SKILL.md`
- Create: `.agents/skills/asset-custody/references/fonts.md`
- Create: `.agents/skills/asset-custody/references/images.md`
- Create: `.agents/skills/asset-custody/references/icons.md`
- Create: `.agents/skills/asset-custody/references/optimization.md`
- Create (if vendored): `.agents/skills/asset-custody/assets/authority/CITATIONS.md`
- Create (if vendored): `.agents/skills/asset-custody/assets/authority/reference-source/`

**Interfaces:**
- Consumes: the master spec and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when adding, optimizing, or attributing fonts, images, and icons.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/asset-custody/references
New-Item -ItemType Directory -Force -Path .agents/skills/asset-custody/assets/authority/reference-source
```

- [ ] **Step 2: Decide whether any authority sources need vendoring**

If a public source is referenced for image optimization, icon sizing, or font licensing, record it in `assets/authority/CITATIONS.md`. If no source is vendored, create an empty `CITATIONS.md` with a note that this skill is synthesized.

- [ ] **Step 3: Author `SKILL.md`**

Write `.agents/skills/asset-custody/SKILL.md` with these sections:

- `## Use when` - adding fonts, images, or icons; deciding where to host them; optimizing assets.
- `## Core thesis` - assets are a custody problem: know the source, the license, the format, and the fallbacks before the asset goes in the tree.
- `## Fonts` - self-hosted vs CDN, licensing, format choice (WOFF2, variable), and attribution.
- `## Images` - format (WebP/AVIF), sizing, alt text, loading, and the `openai-image` MCP caveats.
- `## Icons` - `lucide-react` as the default, SVG treatment, and when not to use an icon.
- `## Optimization` - Vite image/font optimizers, responsive images, and bundle impact.
- `## Reference routes` - pointers to the four references.
- `## Working rules` - what to check before adding an asset, and how to remove an asset without orphan references.

- [ ] **Step 4: Write the four reference files**

- `references/fonts.md` - font custody checklist and format guidance.
- `references/images.md` - image format, sizing, alt, and licensing checklist.
- `references/icons.md` - icon set, sizing, and usage rules.
- `references/optimization.md` - Vite plugins, compression, and bundle-size rules.

- [ ] **Step 5: Use `/writing-with-clarity` to review the draft**

- [ ] **Step 6: Stage and commit the skill**

```powershell
git add .agents/skills/asset-custody/
git commit -m "docs: add asset-custody skill and references"
```

- [ ] **Step 7: Mark Task 5's boxes `[x]` in the plan file**

---

### Task 6: `evaluating-design-references` skill

**Files:**
- Create: `.agents/skills/evaluating-design-references/SKILL.md`
- Create: `.agents/skills/evaluating-design-references/references/quality-signals.md`
- Create: `.agents/skills/evaluating-design-references/references/adoption-checklist.md`
- Create: `.agents/skills/evaluating-design-references/references/avoiding-copying.md`

**Interfaces:**
- Consumes: the master spec and the `designing-premium-sites` umbrella skill.
- Produces: a skill that agents invoke when deciding whether a public portfolio, Dribbble shot, or reference repo is worth adopting.

- [ ] **Step 1: Scaffold the skill directory**

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills/evaluating-design-references/references
```

- [ ] **Step 2: Author `SKILL.md`**

Write `.agents/skills/evaluating-design-references/SKILL.md` with these sections:

- `## Use when` - a public design reference is proposed for the portfolio and you need to decide whether to adopt the pattern.
- `## Core thesis` - a reference is useful for principles, not for copying; the goal is to extract the idea and adapt it to the portfolio's voice.
- `## Quality signals` - what makes a reference credible: craft, finish, accessibility, performance, and consistency.
- `## Adoption checklist` - the steps to convert a reference into a portfolio-specific pattern.
- `## Avoiding copying` - how to identify generic trends, stock-look, or overused patterns; how to synthesize instead of clone.
- `## Reference routes` - pointers to the three references.
- `## Working rules` - how to write a one-paragraph recommendation and when to reject a reference.

- [ ] **Step 3: Write the three reference files**

- `references/quality-signals.md` - concrete signals for credibility and craft.
- `references/adoption-checklist.md` - the exact steps to translate a reference into a portfolio pattern.
- `references/avoiding-copying.md` - red flags and how to synthesize instead of clone.

- [ ] **Step 4: Use `/writing-with-clarity` to review the draft**

- [ ] **Step 5: Stage and commit the skill**

```powershell
git add .agents/skills/evaluating-design-references/
git commit -m "docs: add evaluating-design-references skill and references"
```

- [ ] **Step 6: Mark Task 6's boxes `[x]` in the plan file**

---

### Task 7: Verify and mesh the pattern skills

**Files:**
- Modify: generated `INDEX.md` surfaces (downstream of the mesh generator)

**Interfaces:**
- Consumes: the new skill trees.
- Produces: a validated, mesh-discoverable skill tree.

- [ ] **Step 1: Run the repo standards check on the skill tree**

```powershell
py -3 .agents/skills/repo-standards/scripts/repo_standards.py --check
```

If the script is not installed in this worktree, run the canonical CI instead:

```powershell
py -3 tools/run.py ci --check
```

- [ ] **Step 2: Validate the generated agent mesh**

```powershell
py -3 .agents/skills/generating-agent-mesh/scripts/validate_agent_mesh.py --check
```

If the script is not installed, rely on `py -3 tools/run.py ci --check`.

- [ ] **Step 3: Regenerate and verify the repo mesh**

```powershell
py -3 tools/run.py ci --apply
```

This will regenerate `INDEX.md` files and run the full canonical check.

- [ ] **Step 4: Move the completed plan file**

After validation passes, move this plan file from `.agents/plans/portfolio-premium-foundations/` to `.agents/plans/completed/` and update the roadmap to `done`.

- [ ] **Step 5: Stage and commit any generated updates**

```powershell
git add .
git commit -m "chore: regenerate mesh and validate pattern skills"
```

- [ ] **Step 6: Mark Task 7's boxes `[x]` in the plan file**

---

## Self-review

Before marking this plan done:

1. **Spec coverage:** Does every Phase 1.2 requirement in the master spec have a task? All six skills are covered, plus verification and mesh.
2. **Placeholder scan:** No `TBD`, `TODO`, `implement later`, or `fill in details` remain. Each skill has a concrete `SKILL.md` structure and reference file list.
3. **Type consistency:** N/A - this plan creates documentation, not code types.
4. **Plan-readiness rating:** Target `9/10`. The only user-owned gap is whether `asset-custody` needs vendored sources, which is handled as a decision step.

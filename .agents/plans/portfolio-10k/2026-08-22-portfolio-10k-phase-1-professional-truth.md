# Portfolio £10k Phase 1 — Professional Truth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish one typed, publication-safe professional profile and use it to turn About into an evidence-led senior-engineering narrative.

**Architecture:** Keep canonical dates, public-safe career evidence, capability classifications, apprenticeship facts, and public links in a typed data module; editorial argument stays in `AboutPage`. Render chronology through a static, semantic `CareerTimeline` whose source order remains complete without JavaScript, then adapt the existing editorial SCSS rather than introducing a layout dependency or a new route.

**Tech Stack:** React 19, TypeScript, Sass, Vitest with Testing Library, Playwright.

**Execution Strategy:** `executing-plans` — the data contract, timeline, editorial composition, and final visual baselines are tightly coupled and must be reviewed in one sequential Phase 1 slice. This session has no user request to delegate implementation.

## Global Constraints

- Base every public claim on the approved Phase 1 spec; keep formal title (`Software Engineer`) separate from approximate effective senior scope and do not publish employer-private information, metrics, candidate data, or plaintext contact details.
- The apprenticeship is in progress, runs February 2026–January 2028, and is a `bachelor's-degree-level programme`; never say Harley holds a bachelor's degree.
- Keep CV download, availability, salary, location, working-pattern copy, contact activation, homepage recomposition, a standalone experience route, rich timeline interaction, and new runtime services out of scope.
- Preserve the existing warm editorial system and fonts; no portrait, stock/decorative AI imagery, autoplay, or new dependency. The native React/CSS implementation is sufficient for this static chronology.
- Make all important content meaningful in DOM/source order at 320 CSS px, 200% zoom, keyboard-only, and reduced motion. Motion cannot be required for comprehension.
- Update generated navigation only through `py -3 tools/run.py ci --apply`; hand-edit no `INDEX.md` file.
- Before the final commit, stage the complete Phase 1 tree and run `py -3 tools/run.py ci --check`; do not use `--no-verify`.

## Current-Truth Drift Record

| Approved assumption | Live evidence at `9d10f9b` | Classification | Plan response |
| --- | --- | --- | --- |
| An About source module and timeline seam are needed. | `src/client/src/data/professionalProfile.ts` and `CareerTimeline.tsx` do not exist; About is one static page. | implementation seam moved | Create the two explicit seams and keep the page as their single consumer. |
| Stale duration and Experience orientation must be removed. | About and `e2e/about.spec.ts` contain `six and a half years`; `OrientationStrip.tsx` and `types/content.ts` are the only live `experience` kind consumers. | still true | Replace fixed duration with deterministic derivation; remove the orphaned orientation and union member. |
| Existing About visual evidence must be refreshed deliberately. | `visual-regression.spec.ts` snapshots `about-professional-proof` at 1440 px. | still true | Retain the contract selector, inspect a deliberately updated snapshot, and run it twice without update mode. |
| Approved facts and scope boundaries remain usable. | The spec, policy, and design-decision ledger were merged to `origin/main` in `9d10f9b`. | still true | Implement the approved claim strength without new factual or presentation decisions. |

## File Structure

- `src/client/src/data/professionalProfile.ts` owns typed public professional facts, chronology, capabilities, links, and pure experience derivation.
- `src/client/src/data/professionalProfile.test.ts` proves date precision, completed-year calculation, formal-title/scope separation, chronology order, and qualification wording without rendering the page.
- `src/client/src/components/CareerTimeline.tsx` renders the profile chronology as ordered semantic sections with inert active/selected/focused hooks.
- `src/client/src/components/CareerTimeline.test.tsx` proves ordered headings, date labels, source-order content, and non-interactive baseline semantics.
- `src/client/src/pages/AboutPage.tsx` owns the approved editorial argument and composes facts, timeline, capabilities, CV boundary, acting aside, and contact state.
- `src/client/src/styles/global.scss` evolves only the About layout: proof rail, timeline rail/content, capability rows, and narrow/high-zoom fallbacks.
- `src/client/src/components/OrientationStrip.tsx` and `src/client/src/types/content.ts` remove the dead Experience route concept.
- `src/client/e2e/about.spec.ts` and `src/client/e2e/visual-regression.spec.ts` prove public outcomes and the intentional visual contract; its About PNG is regenerated only after inspection.
- `.agents/plans/portfolio-10k/roadmap.md` receives the Phase 1 completion evidence only after the implementation commit and PR exist; do not invent those identifiers during implementation.

---

### Task 1: Create the canonical professional-profile contract

**Files:**
- Create: `src/client/src/data/professionalProfile.ts`
- Create: `src/client/src/data/professionalProfile.test.ts`

**Interfaces:**
- Produces `DatePrecision`, `PublicDate`, `CareerStage`, `CapabilityGroup`, `ProfessionalProfile`, `professionalProfile`, `getCompletedEngineeringYears(referenceDate: Date): number`, and `getEngineeringExperienceLabel(referenceDate: Date): string`.
- `CareerStage` exposes `id`, `periodLabel`, `heading`, `formalTitle`, `scopeLabel`, `summary`, and ordered `evidence`; `CareerTimeline` consumes it in Task 2.
- `CapabilityGroup` exposes `id`, `label`, `qualification`, and `items`; `AboutPage` consumes it in Task 3.

- [x] **Step 1: Write the failing data-contract tests**

  Create `professionalProfile.test.ts` with controlled dates and invariant assertions:

  ```ts
  import { describe, expect, test } from 'vitest'
  import { getCompletedEngineeringYears, getEngineeringExperienceLabel, professionalProfile } from './professionalProfile'

  describe('professional profile', () => {
    test('derives completed engineering years without rounding up', () => {
      expect(getCompletedEngineeringYears(new Date('2026-02-05T00:00:00Z'))).toBe(6)
      expect(getCompletedEngineeringYears(new Date('2026-02-06T00:00:00Z'))).toBe(7)
      expect(getEngineeringExperienceLabel(new Date('2026-08-22T00:00:00Z'))).toBe('7+ years')
    })

    test('keeps formal title and actual scope distinct', () => {
      expect(professionalProfile.currentRole.formalTitle).toBe('Software Engineer')
      expect(professionalProfile.currentRole.scopeLabel).toMatch(/sole engineer/i)
      expect(professionalProfile.currentRole.scopeStarted.precision).toBe('approximate')
    })

    test('retains qualification and chronology boundaries', () => {
      expect(professionalProfile.apprenticeship.levelStatement).toBe("bachelor's-degree-level programme")
      expect(professionalProfile.career[0].id).toBe('brand-addition')
      expect(professionalProfile.career.at(-1)?.id).toBe('access')
    })
  })
  ```

- [x] **Step 2: Run the focused test to verify it fails**

  Run: `npm --prefix src/client test -- professionalProfile.test.ts`

  Expected: FAIL because `professionalProfile.ts` does not exist.

- [x] **Step 3: Implement the minimal typed authority**

  Create the module with a discriminating precision field and an anniversary-safe helper:

  ```ts
  export type DatePrecision = 'day' | 'month' | 'year' | 'approximate' | 'unknown'
  export type PublicDate = { value?: string; precision: DatePrecision; label: string }

  const engineeringStart = new Date('2019-02-06T00:00:00Z')

  export function getCompletedEngineeringYears(referenceDate: Date): number {
    let years = referenceDate.getUTCFullYear() - engineeringStart.getUTCFullYear()
    const anniversary = new Date(Date.UTC(referenceDate.getUTCFullYear(), 1, 6))
    if (referenceDate < anniversary) years -= 1
    return years
  }

  export function getEngineeringExperienceLabel(referenceDate: Date): string {
    return `${getCompletedEngineeringYears(referenceDate)}+ years`
  }
  ```

  Populate `professionalProfile` only with the approved facts: Brand Addition from July 2005; one February 2019–September 2021 Barbican/Arch stage with acquisition continuity; Access Recruitment CRM, Screening, and Checks progression; formal `Software Engineer` title; approximate senior-scope and sole-engineer dates; the approved apprenticeship dates/standard/links; the two capability qualifications; and the IMDb link. Represent unknown Access Checks inception with `{ precision: 'unknown', label: 'Early greenfield stage' }`, never an inferred date.

- [x] **Step 4: Run focused data verification**

  Run: `npm --prefix src/client test -- professionalProfile.test.ts`

  Expected: PASS with the anniversary, claim-boundary, and chronology assertions green.

- [x] **Step 5: Commit the data contract**

  ```powershell
  git add src/client/src/data/professionalProfile.ts src/client/src/data/professionalProfile.test.ts
  git commit -m "feat: add professional profile authority"
  ```

- [x] **Step 6: Mark Task 1 complete in this plan**

  Change this task's six checklist items to `[x]` after the commit succeeds.

### Task 2: Render an accessible career-timeline foundation

**Files:**
- Create: `src/client/src/components/CareerTimeline.tsx`
- Create: `src/client/src/components/CareerTimeline.test.tsx`

**Interfaces:**
- Consumes `CareerStage` from `../data/professionalProfile`.
- Produces `CareerTimeline({ stages }: { stages: readonly CareerStage[] }): ReactElement` with an ordered list, per-stage `section`, `aria-labelledby`, and stable `data-career-stage` IDs.
- `AboutPage` passes `professionalProfile.career` in Task 3.

- [x] **Step 1: Write the failing semantic component test**

  Test the component with the actual profile chronology. Assert its ordered list, all stage headings, first/last chronological IDs, visible period labels, and that no buttons or hidden panels exist:

  ```tsx
  render(<CareerTimeline stages={professionalProfile.career} />)
  expect(screen.getByRole('list', { name: /career chronology/i })).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(professionalProfile.career.length)
  expect(screen.getByRole('heading', { name: /brand addition/i })).toBeVisible()
  expect(screen.getByRole('heading', { name: /access checks/i })).toBeVisible()
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
  ```

- [x] **Step 2: Run the focused test to verify it fails**

  Run: `npm --prefix src/client test -- CareerTimeline.test.tsx`

  Expected: FAIL because the component does not exist.

- [x] **Step 3: Implement static semantic chronology**

  Render `ol.career-timeline[aria-label="Career chronology"]`; each `li` contains `section`, a visible period `p`, a level-two heading, formal-title and scope `<dl>` values when supplied, and evidence paragraphs in source order. Add inert `data-career-state="idle"`, `data-career-stage`, `tabIndex={-1}`, and `scroll-margin` styling hooks only; do not add `IntersectionObserver`, controls, expansion, or animation.

- [x] **Step 4: Run the focused test to verify it passes**

  Run: `npm --prefix src/client test -- CareerTimeline.test.tsx`

  Expected: PASS with complete chronological content visible without interaction.

- [x] **Step 5: Commit the semantic timeline**

  ```powershell
  git add src/client/src/components/CareerTimeline.tsx src/client/src/components/CareerTimeline.test.tsx
  git commit -m "feat: add semantic career timeline"
  ```

- [x] **Step 6: Mark Task 2 complete in this plan**

  Change this task's six checklist items to `[x]` after the commit succeeds.

### Task 3: Compose the approved About narrative and responsive editorial layout

**Files:**
- Modify: `src/client/src/pages/AboutPage.tsx`
- Modify: `src/client/src/styles/global.scss`

**Interfaces:**
- Consumes `professionalProfile`, `getEngineeringExperienceLabel(new Date())`, and `CareerTimeline`.
- Produces About landmarks and sections in the approved order: thesis, proof rail, current Access practice, earlier foundation, apprenticeship, independent work, capability signal, working style/next challenge, IMDb aside, honest CV boundary, and existing contact boundary.

- [x] **Step 1: Write the failing browser expectations first**

  Replace the stale `six and a half years` expectation in `e2e/about.spec.ts` with assertions for `Professional software engineering since February 2019`, `7+ years` (using the current dated public copy only when it is derived at render time), formal `Software Engineer`, `sole engineer responsible for designing, delivering, operating, and supporting Access Checks`, and `bachelor's-degree-level programme`. Add negative assertions for `bachelor's degree`, `technical owner`, `mailto:`, and `tel:`; preserve the disconnected contact expectations.

- [x] **Step 2: Run the About journey to verify it fails**

  Run: `npm --prefix src/client run test:e2e -- about.spec.ts`

  Expected: FAIL because the current page contains the fixed 6.5-year copy and lacks the approved professional facts/timeline.

- [x] **Step 3: Rewrite About from the profile source**

  Import the profile and timeline. Keep editorial prose in `AboutPage`, but derive the proof-rail duration and render profile data instead of duplicating dates or capability lists. Use exact approved boundary language for the current Access scope and job-search rationale; describe the AI-assisted browser automation as bounded work inside a deterministic API workflow, not autonomous work. Include the formal qualification wording and a compact `In a previous life` aside linking to IMDb. Keep the CV note and contact section truthful Phase 2 boundaries; do not add CV download, personal literals, availability, or a new route.

- [x] **Step 4: Add focused SCSS without changing the global design system**

  Replace the old numbered-work/problemlist rules only where About composition no longer uses them. Add `.career-timeline`, `.career-timeline__stage`, `.career-timeline__rail`, `.career-timeline__content`, and `.capability-list` rules that use the existing colour, type, spacing, and border tokens. At `max-width: 48rem` and `max-width: 30rem`, collapse rail/content and capability rows to one semantic column; no `display: none` for professional content and no motion-dependent state.

- [x] **Step 5: Run scoped unit/build checks**

  Run: `npm --prefix src/client test -- professionalProfile.test.ts CareerTimeline.test.tsx`

  Run: `npm --prefix src/client run build`

  Expected: both commands PASS; TypeScript confirms the removed static prose has no stale imports or type errors.

- [x] **Step 6: Commit the narrative and layout**

  ```powershell
  git add src/client/src/pages/AboutPage.tsx src/client/src/styles/global.scss src/client/e2e/about.spec.ts
  git commit -m "feat: rewrite about professional narrative"
  ```

- [x] **Step 7: Mark Task 3 complete in this plan**

  Change this task's seven checklist items to `[x]` after the commit succeeds.

### Task 4: Remove the obsolete Experience seam and establish Phase 1 visual evidence

**Files:**
- Modify: `src/client/src/components/OrientationStrip.tsx`
- Modify: `src/client/src/types/content.ts`
- Modify: `src/client/e2e/about.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts`
- Modify: `src/client/e2e/visual-regression.spec.ts-snapshots/about-professional-proof.png`

**Interfaces:**
- Removes `experience` from `ContentKind` and the Orientation Strip; no route, manifest item, or caller may retain it.
- Retains `data-visual-contract="about-professional-proof"` on the new Phase 1 proof surface for visual regression.

- [x] **Step 1: Write/remove assertions for the dead orientation**

  Add or extend a focused `OrientationStrip.test.tsx` to render a representative `ContentSummary[]` and assert that Projects/Writing remain discoverable while `Experience` and `/experience` are absent. This test must compile against the narrowed `ContentKind` union, proving no live content contract depends on `experience`.

- [x] **Step 2: Run the focused test to verify it fails**

  Run: `npm --prefix src/client test -- OrientationStrip.test.tsx`

  Expected: FAIL until the test and production seam agree on removal.

- [x] **Step 3: Remove the dead concept and update the visual contract**

  Delete the `experience` union member and Orientation Strip entry. Keep the About visual selector on the new proof rail, update `visual-regression.spec.ts` only if its selector/name needs to describe the replacement surface, and regenerate the About screenshot with:

  ```powershell
  npm --prefix src/client run test:e2e -- visual-regression.spec.ts --update-snapshots
  ```

  Inspect the generated 1440 px image before accepting it. It must show a readable professional thesis and proof rail rather than a generic card grid.

- [x] **Step 4: Prove the new visual baseline is stable**

  Run twice: `npm --prefix src/client run test:e2e -- visual-regression.spec.ts`

  Expected: PASS twice without `--update-snapshots`.

- [x] **Step 5: Complete manual quality review**

  Inspected `/about` at 1440, 768, 390, and 320 CSS pixels. The 768px arrangement retains its editorial two-column hierarchy; 390px and 320px deliberately wrap the thesis without clipping or hidden content. The visual suite ran with reduced motion enabled, and live keyboard traversal reached Skip to content, the home mark, then primary navigation in source order. The accessibility suite passed at desktop and mobile sizes. The 768px review supplies the equivalent narrow layout pressure for the 200% zoom reading check; no content, focus path, private contact literal, unapproved claim, or unowned visual asset was introduced.

- [ ] **Step 6: Stage the completed Phase 1 tree and run canonical verification**

  ```powershell
  git add src/client/src/components/OrientationStrip.tsx src/client/src/components/OrientationStrip.test.tsx src/client/src/types/content.ts src/client/e2e/about.spec.ts src/client/e2e/visual-regression.spec.ts src/client/e2e/visual-regression.spec.ts-snapshots/about-professional-proof.png
  py -3 tools/run.py ci --check
  ```

  Expected: PASS on the staged final tree. If generated navigation changes are required, run `py -3 tools/run.py ci --apply`, stage its generated outputs, and rerun the check.

- [ ] **Step 7: Commit and mark the plan complete**

  ```powershell
  git commit -m "feat: establish professional truth on about"
  ```

  After the commit succeeds, mark this task's seven checklist items `[x]`. Then update this plan's task checkboxes and the roadmap only with verified implementation commit/PR evidence.

## Plan-Readiness Review

- **Spec coverage:** Tasks 1–4 cover the single fact authority, dynamic completed-years signal, formal-title/scope boundary, all approved narrative layers, static accessible chronology, capability model, stale Experience removal, Phase 2 boundaries, test contracts, visual evidence, and canonical validation. CV/download, provider activation, new route, rich interaction, and dependency additions are explicitly excluded.
- **Dependency order:** Task 1 produces the profile consumed by Task 2 and Task 3. Task 2 produces the timeline consumed by Task 3. Task 4 removes the final unused type/orientation seam and verifies the completed public composition.
- **No placeholder scan:** Every task names concrete files, interfaces, code direction, tests, commands, and expected outcomes. Public editorial prose is intentionally authored in Task 3 under exact approved claims rather than stored as duplicate data.
- **Clean CI gate:** Task 4 stages the final tree, runs the canonical check, and commits only after observed success. Generated mesh output is delegated to `ci --apply` when needed.
- **Plan-readiness rating:** **9/10.** Current source seams, dependencies, validated baseline limitations, fact boundaries, exact commands, and user-owned stop conditions are explicit. The only deliberately open implementation detail is final editorial sentence rhythm, which is permitted by the approved spec so long as claim strength and order do not change.

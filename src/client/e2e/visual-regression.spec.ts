import { expect, test, type Page } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

async function openStable(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    Math.random = () => 0.314159
  })
  await page.goto(path, { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toBeVisible()
  await page.evaluate(async () => document.fonts.ready)
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
  await page.locator('.skip-link').evaluate((element) => element.setAttribute('hidden', ''))
}

async function waitForImages(region: ReturnType<Page['locator']>): Promise<void> {
  for (const image of await region.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true)
  }
  await region.scrollIntoViewIfNeeded()
}

async function waitForWildBunchStyles(page: Page): Promise<void> {
  const figure = page.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
  await expect.poll(() => figure.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(87, 76, 63)')
}

async function waitForPatchStyles(page: Page): Promise<void> {
  const production = page.getByRole('region', { name: 'The production system is the project' })
  await expect.poll(() => production.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(21, 63, 66)')
}

async function waitForTournamentStyles(page: Page): Promise<void> {
  const event = page.locator('.tournament-event').first()
  await expect.poll(() => event.evaluate((element) => getComputedStyle(element).display)).toBe('grid')
}

async function waitForLawfulHeistStyles(page: Page): Promise<void> {
  const rollback = page.locator('.heist-recruit--rollback')
  await expect.poll(() => rollback.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgb(24, 33, 28)')
}

async function waitForLearningLabStyles(page: Page): Promise<void> {
  const safety = page.locator('.learning-lab-safety')
  await expect.poll(() => safety.evaluate((element) => getComputedStyle(element).display)).toMatch(/^(grid|flex)$/)
}

const nonHomeProof = [
  { path: './projects/wild-bunch', contract: 'wild-bunch-case-study-hero', register: 'site-sans' },
  { path: './writing/why-adrs', contract: 'decision-memory', register: 'article-serif' },
  { path: './about', contract: 'about-current-work', register: 'site-sans' },
] as const

const proofViewports = [
  { width: 1440, height: 1100 },
  { width: 390, height: 844 },
  { width: 320, height: 844 },
  { width: 360, height: 844 },
] as const

for (const route of nonHomeProof) {
  for (const viewport of proofViewports) {
    test(`${route.path} preserves its non-home contract at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page.locator(`[data-visual-contract="${route.contract}"]`)).toBeVisible()
      await expect(page.locator(`[data-type-register="${route.register}"]`).first()).toBeVisible()

      expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)

      const contractFollowsHeading = await page.evaluate((contract) => {
        const heading = document.querySelector('main h1')
        const surface = document.querySelector(`[data-visual-contract="${contract}"]`)
        if (heading === null || surface === null) return false
        return heading === surface
          || surface.contains(heading)
          || heading.contains(surface)
          || Boolean(heading.compareDocumentPosition(surface) & Node.DOCUMENT_POSITION_FOLLOWING)
      }, route.contract)
      expect(contractFollowsHeading).toBe(true)

      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      await expect(focused).toBeVisible()
      expect(await focused.evaluate((element) => {
        const style = getComputedStyle(element)
        return (style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0)
          || style.boxShadow !== 'none'
      })).toBe(true)
    })
  }
}

async function clipBetween(page: Page, firstSelector: string, lastSelector: string) {
  await page.evaluate(() => scrollTo(0, 0))
  const [first, last] = await Promise.all([
    page.locator(firstSelector).boundingBox(),
    page.locator(lastSelector).boundingBox(),
  ])
  expect(first).not.toBeNull()
  expect(last).not.toBeNull()
  return {
    x: Math.min(first!.x, last!.x),
    y: first!.y,
    width: Math.max(first!.x + first!.width, last!.x + last!.width) - Math.min(first!.x, last!.x),
    height: last!.y + last!.height - first!.y,
  }
}

test('homepage keeps its authored masthead and feature composition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './')

  await expect(page.locator('[data-visual-contract="homepage-masthead"]')).toHaveScreenshot('homepage-masthead.png')
  await expect(page.locator('[data-visual-contract="homepage-feature-deck"]')).toHaveScreenshot('homepage-feature-deck.png')
})

test('writing index keeps its newest-first editorial composition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './writing')

  await expect(page.locator('[data-visual-contract="writing-peer-list"]')).toHaveScreenshot('writing-peer-list.png')
})

test('about page keeps the current-work argument', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-current-work"]')).toHaveScreenshot('about-current-work.png')
})

test('about page keeps the CV conversion area', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-cv-conversion"]')).toHaveScreenshot('about-cv-conversion.png')
})

test('CV keeps its first A4 sheet hierarchy on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './cv')

  await expect(page.locator('[data-cv-page="1"]')).toHaveScreenshot('cv-first-sheet.png')
})

test('about page keeps the CV conversion area usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-cv-conversion"]')).toHaveScreenshot('about-cv-conversion-mobile.png')
})

test('CV keeps its first sheet readable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './cv')

  await expect(page.locator('[data-cv-page="1"]')).toHaveScreenshot('cv-first-sheet-mobile.png')
})

test('article header keeps its hierarchy on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './writing/agentic-engineering-vs-vibe-coding')

  await expect(page.locator('[data-visual-contract="vibe-coding-door-road"]')).toHaveScreenshot('article-mobile-header.png')
})

test('Marketplace keeps its authored distribution composition at wide and narrow viewports', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/codex-marketplace')
  await expect(page.locator('[data-visual-contract="marketplace-case-study-hero"]')).toHaveScreenshot('marketplace-case-study-hero.png')
  await expect(page.locator('[data-visual-contract="marketplace-distribution-map"]')).toHaveScreenshot('marketplace-distribution-map.png')

  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/codex-marketplace')
  await expect(page.locator('[data-visual-contract="marketplace-distribution-map"]')).toHaveScreenshot('marketplace-distribution-map-mobile.png')
})

test('Wild Bunch keeps its town hero and controlled-determinism evidence on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const hero = page.locator('[data-visual-contract="wild-bunch-case-study-hero"]')
  await waitForImages(hero)
  await expect(hero).toHaveScreenshot('wild-bunch-town-hero.png')

  const determinism = page.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
  await expect(determinism).toHaveScreenshot('wild-bunch-determinism.png')
})

test('Wild Bunch keeps event history and product evidence legible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const eventFlow = page.getByRole('figure', { name: 'Ordered event history from action to reconstruction' })
  await expect(eventFlow).toHaveScreenshot('wild-bunch-event-flow.png')

  const productEvidence = page.locator('.wild-bunch-product-evidence')
  await waitForImages(productEvidence)
  await expect(productEvidence).toHaveScreenshot('wild-bunch-product-evidence.png')
})

test('Wild Bunch keeps its stacked composition legible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const determinism = page.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
  await expect(determinism).toHaveScreenshot('wild-bunch-determinism-mobile.png')
})

test('Adventures of Patch keeps its hero and accountable origin on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
  await waitForImages(hero)
  await expect(hero).toHaveScreenshot('patch-hero.png')

  const origin = page.getByRole('region', { name: 'The day the database disappeared' })
  await waitForImages(origin)
  await expect(origin).toHaveScreenshot('patch-origin.png')
})

test('Adventures of Patch keeps its production system and showcase handoff legible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const production = page.getByRole('region', { name: 'The production system is the project' })
  await expect(production).toHaveScreenshot('patch-production-system.png')

  const handoff = page.getByRole('region', { name: 'The stories have their own home' })
  await expect(handoff).toHaveScreenshot('patch-showcase-handoff.png')
})

test('Adventures of Patch keeps its evidence boundary and controlled-production close distinct on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  await expect(page.getByRole('region', { name: 'What reaches the public record' })).toHaveScreenshot('patch-evidence-boundary.png')
  await expect(page.getByRole('region', { name: 'Controlled creative production' })).toHaveScreenshot('patch-controlled-production.png')
})

test('Learning Lab keeps its engineering proposition, curriculum atlas and lab system on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 2000 })
  await openStable(page, './projects/agentic-learning-lab')
  await waitForLearningLabStyles(page)

  const hero = page.locator('[data-visual-contract="learning-lab-case-study-hero"]')
  const origin = page.locator('.learning-lab-origin')
  await waitForImages(hero)
  await expect(page).toHaveScreenshot('learning-lab-hero-origin.png', {
    clip: await clipBetween(page, '[data-visual-contract="learning-lab-case-study-hero"]', '.learning-lab-origin'),
  })

  await expect(page.locator('[data-visual-contract="learning-lab-atlas"]')).toHaveScreenshot('learning-lab-curriculum-atlas.png')

  const representatives = page.locator('.representative-labs')
  await waitForImages(representatives)
  await expect(page.locator('[data-visual-contract="learning-lab-system"]')).toHaveScreenshot('learning-lab-lab-system.png')
  await expect(origin).toBeAttached()
})

test('Learning Lab keeps the complete annotated field manual on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/agentic-learning-lab')
  await waitForLearningLabStyles(page)

  const article = page.locator('article.content-page')
  await waitForImages(article)
  await expect(article).toHaveScreenshot('learning-lab-composition-mobile.png')
})

test('Adventures of Patch keeps the complete authored composition on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const projectPage = page.locator('article.content-page')
  await waitForImages(projectPage)
  await expect(projectPage).toHaveScreenshot('patch-composition-mobile.png')
})

test('Adventures of Patch leads with its origin story before the compact mobile snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const snapshot = page.getByRole('region', { name: 'Project snapshot' })
  const origin = page.getByRole('region', { name: 'The day the database disappeared' })
  const [snapshotBox, originBox] = await Promise.all([snapshot.boundingBox(), origin.boundingBox()])

  expect(snapshotBox).not.toBeNull()
  expect(originBox).not.toBeNull()
  expect(snapshotBox?.height).toBeLessThanOrEqual(650)
  expect(snapshotBox?.y).toBeGreaterThanOrEqual((originBox?.y ?? 0) + (originBox?.height ?? 0))
})

test('Tournament keeps its opening ambiguity and stakeholder consultation legible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './patch/tournament-of-reasonable-defaults')
  await waitForTournamentStyles(page)

  const opening = page.locator('.tournament-event--seven-day')
  await waitForImages(opening)
  await expect(opening).toHaveScreenshot('patch-tournament-seven-day.png')

  const consultation = page.locator('.tournament-event__consultation')
  await waitForImages(consultation)
  await expect(consultation).toHaveScreenshot('patch-tournament-consultation.png')
})

test('Tournament keeps the complete four-event progression on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './patch/tournament-of-reasonable-defaults')
  await waitForTournamentStyles(page)

  const story = page.locator('article.content-page')
  await waitForImages(story)
  await expect(story).toHaveScreenshot('patch-tournament-mobile.png')
})

test('Lawful Heist keeps Rollback at the dominant end of agent scale', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './patch/lawful-heist')
  await waitForLawfulHeistStyles(page)

  const rollback = page.locator('.heist-recruit--rollback')
  await waitForImages(rollback)
  await expect(rollback).toHaveScreenshot('patch-lawful-heist-rollback.png')
})

test('Adventures of Patch preserves the compact snapshot at 320px without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const snapshot = page.getByRole('region', { name: 'Project snapshot' })
  await expect(snapshot).toBeVisible()
  expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
})

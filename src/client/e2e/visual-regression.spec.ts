import { expect, test, type Page } from '@playwright/test'
import { openStable, waitForImages } from './visual-support'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

const waitForWildBunchStyles = async (page: Page): Promise<void> => {
  const figure = page.getByRole('figure', {
    name: 'Controlled determinism from a compact world contract',
  })
  await expect
    .poll(() => figure.evaluate((element) => getComputedStyle(element).backgroundColor))
    .toBe('rgb(87, 76, 63)')
}

const waitForPatchStyles = async (page: Page): Promise<void> => {
  const production = page.locator('.patch-production')
  await expect
    .poll(() => production.evaluate((element) => getComputedStyle(element).backgroundColor))
    .toBe('rgb(21, 63, 66)')
}

const waitForTournamentStyles = async (page: Page): Promise<void> => {
  const event = page.locator('[data-patch-event]').first()
  await expect.poll(() => event.evaluate((element) => getComputedStyle(element).display)).toBe('grid')
}

const waitForLearningLabStyles = async (page: Page): Promise<void> => {
  const safety = page.locator('.learning-lab-safety')
  await expect.poll(() => safety.evaluate((element) => getComputedStyle(element).display)).toMatch(/^(grid|flex)$/)
}

const clipBetween = async (page: Page, firstSelector: string, lastSelector: string) => {
  const [first, last] = await Promise.all([
    page.locator(firstSelector).evaluate((element) => {
      const box = element.getBoundingClientRect()
      return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height }
    }),
    page.locator(lastSelector).evaluate((element) => {
      const box = element.getBoundingClientRect()
      return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height }
    }),
  ])
  return {
    x: Math.min(first.x, last.x),
    y: first.y,
    width: Math.max(first.x + first.width, last.x + last.width) - Math.min(first.x, last.x),
    height: last.y + last.height - first.y,
  }
}

test('clipBetween measures document bounds without changing scroll position', async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 300 })
  await page.setContent(`
    <style>
      body { margin: 0; height: 2000px; }
      [data-clip-first] { position: absolute; top: 100px; left: 20px; width: 100px; height: 50px; }
      [data-clip-last] { position: absolute; top: 1500px; left: 10px; width: 200px; height: 100px; }
    </style>
    <div data-clip-first></div>
    <div data-clip-last></div>
  `)
  await page.evaluate(() => scrollTo(0, 1000))
  const scrollYBeforeClip = await page.evaluate(() => scrollY)

  expect(scrollYBeforeClip).toBe(1000)
  expect(await clipBetween(page, '[data-clip-first]', '[data-clip-last]')).toEqual({
    x: 10,
    y: 100,
    width: 200,
    height: 1500,
  })
  expect(await page.evaluate(() => scrollY)).toBe(scrollYBeforeClip)
})

test('Marketplace keeps its authored distribution composition at wide and narrow viewports', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/codex-marketplace')
  await expect(page.locator('[data-visual-contract="marketplace-distribution-map"]')).toHaveScreenshot(
    'marketplace-distribution-map.png',
  )

  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/codex-marketplace')
  await expect(page.locator('[data-visual-contract="marketplace-distribution-map"]')).toHaveScreenshot(
    'marketplace-distribution-map-mobile.png',
  )
})

test('Wild Bunch keeps its town hero and controlled-determinism evidence on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const hero = page.locator('[data-visual-contract="wild-bunch-case-study-hero"]')
  await waitForImages(hero)
  await expect(hero).toHaveScreenshot('wild-bunch-town-hero.png')

  const determinism = page.getByRole('figure', {
    name: 'Controlled determinism from a compact world contract',
  })
  await expect(determinism).toHaveScreenshot('wild-bunch-determinism.png')
})

test('Wild Bunch keeps its event-history figure legible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const eventFlow = page.getByRole('figure', {
    name: 'Ordered event history from action to reconstruction',
  })
  await expect(eventFlow).toHaveScreenshot('wild-bunch-event-flow.png')

})

test('Wild Bunch keeps its stacked composition legible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './projects/wild-bunch')
  await waitForWildBunchStyles(page)

  const determinism = page.getByRole('figure', {
    name: 'Controlled determinism from a compact world contract',
  })
  await expect(determinism).toHaveScreenshot('wild-bunch-determinism-mobile.png')
})

test('Adventures of Patch keeps its hero and accountable origin on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
  await waitForImages(hero)
  await expect(hero).toHaveScreenshot('patch-hero.png')

  const origin = page.getByRole('region', {
    name: 'The day the database disappeared',
  })
  await waitForImages(origin)
  await expect(origin).toHaveScreenshot('patch-origin.png')
})

test('Adventures of Patch keeps its production-system composition on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './projects/adventures-of-patch')
  await waitForPatchStyles(page)

  const production = page.getByRole('region', {
    name: 'The production system is the project',
  })
  await expect(production).toHaveScreenshot('patch-production-system.png')

})

test('Learning Lab keeps its hero-to-origin composition on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 2000 })
  await openStable(page, './projects/agentic-learning-lab')
  await waitForLearningLabStyles(page)

  const hero = page.locator('[data-visual-contract="learning-lab-case-study-hero"]')
  await waitForImages(hero)
  await expect(page).toHaveScreenshot('learning-lab-hero-origin.png', {
    clip: await clipBetween(page, '[data-visual-contract="learning-lab-case-study-hero"]', '.learning-lab-origin'),
  })


})

test('Tournament keeps its opening ambiguity and stakeholder consultation legible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './patch/tournament-of-reasonable-defaults')
  await waitForTournamentStyles(page)

  const opening = page.locator('[data-patch-event="seven-day"]')
  await waitForImages(opening)
  await expect(opening).toHaveScreenshot('patch-tournament-seven-day.png')

  const consultation = page.locator('[data-testid="tournament-consultation"]')
  await waitForImages(consultation)
  await expect(consultation).toHaveScreenshot('patch-tournament-consultation.png')
})

test('Patch index keeps its branded series front door at wide and mobile viewports', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 1100 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await openStable(page, './patch')
    const introduction = page.locator('.patch-index__character-intro')
    await waitForImages(introduction)
    await expect(introduction).toHaveScreenshot(`patch-index-introduction-${viewport.width === 1440 ? 'wide' : 'mobile'}.png`)
  }
})

test('Identity Emporium keeps its evidence composition at wide and mobile viewports', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 1100 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await openStable(page, './patch/identity-emporium')
    await waitForImages(page.locator('[data-visual-contract="patch-identity-emporium"]'))
    const identity = page.locator('[data-visual-contract="patch-identity-emporium"]')
    await expect(identity).toHaveScreenshot(`patch-identity-emporium-${viewport.width === 1440 ? 'wide' : 'mobile'}.png`)
  }
})

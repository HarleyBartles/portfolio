import { expect, test, type Page } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

async function openStable(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    Math.random = () => 0.314159
  })
  await page.goto(path, { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toBeVisible()
  await page.evaluate(async () => document.fonts.ready)
}

function visualSnapshot(name: string): string {
  // FreeType and DirectWrite rasterise the same bundled fonts differently.
  // Keep platform-reviewed baselines instead of weakening the visual tolerance.
  return process.platform === 'linux' ? name.replace('.png', '-linux.png') : name
}

test('homepage keeps its authored masthead and feature composition', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './')

  await expect(page.locator('[data-visual-contract="homepage-masthead"]')).toHaveScreenshot('homepage-masthead.png')
  await expect(page.locator('[data-visual-contract="homepage-feature-deck"]')).toHaveScreenshot('homepage-feature-deck.png')
})

test('writing index keeps a distinctive editorial lead', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './writing')

  await expect(page.locator('[data-visual-contract="writing-editorial-lead"]')).toHaveScreenshot('writing-editorial-lead.png')
})

test('about page keeps the professional proof panel', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-professional-proof"]')).toHaveScreenshot('about-professional-proof.png')
})

test('about page keeps the CV conversion area', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-cv-conversion"]')).toHaveScreenshot(visualSnapshot('about-cv-conversion.png'))
})

test('CV keeps its first A4 sheet hierarchy on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './cv')

  await expect(page.locator('[data-cv-page="1"]')).toHaveScreenshot(visualSnapshot('cv-first-sheet.png'))
})

test('about page keeps the CV conversion area usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './about')

  await expect(page.locator('[data-visual-contract="about-cv-conversion"]')).toHaveScreenshot(visualSnapshot('about-cv-conversion-mobile.png'))
})

test('CV keeps its first sheet readable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './cv')

  await expect(page.locator('[data-cv-page="1"]')).toHaveScreenshot(visualSnapshot('cv-first-sheet-mobile.png'))
})

test('article header keeps its hierarchy on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './writing/agentic-engineering-vs-vibe-coding')

  await expect(page.locator('[data-visual-contract="content-page-header"]')).toHaveScreenshot(visualSnapshot('article-mobile-header.png'))
})

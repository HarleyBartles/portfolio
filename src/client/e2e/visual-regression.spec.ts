import { expect, test, type Page } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

async function openStable(page: Page, path: string): Promise<void> {
  await page.addInitScript(() => {
    Math.random = () => 0.314159
  })
  await page.goto(path)
  await page.evaluate(async () => document.fonts.ready)
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

test('article header keeps its hierarchy on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './writing/agentic-engineering-vs-vibe-coding')

  await expect(page.locator('[data-visual-contract="content-page-header"]')).toHaveScreenshot('article-mobile-header.png')
})

import { expect, test } from '@playwright/test'

const openings = [
  { path: '/projects', selector: '#project-index-title' },
  { path: '/writing', selector: '#writing-index-title' },
  { path: '/contact', selector: '#contact-title' },
  { path: '/about', selector: '[data-visual-contract="about-intro"] [data-eyebrow]' },
  { path: '/cv', selector: '[data-cv-page="1"] [data-eyebrow]' },
] as const

for (const width of [320, 1440]) {
  test(`ordinary page openings share one inset at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const gaps: number[] = []

    for (const { path, selector } of openings) {
      await page.goto(`.${path}`)
      await page.locator(selector).waitFor()
      await page.evaluate(() => document.fonts.ready)
      const rule = (await page.locator('.site-header').boundingBox())!
      const opening = (await page.locator(selector).boundingBox())!
      gaps.push(opening.y - (rule.y + rule.height))
    }

    expect(Math.max(...gaps) - Math.min(...gaps)).toBeLessThan(1)
    expect(gaps[0]).toBeGreaterThanOrEqual(64)
  })
}

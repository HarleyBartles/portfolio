import { expect, type Locator, type Page } from '@playwright/test'

export const openStable = async (page: Page, path: string): Promise<void> => {
  await page.addInitScript(() => {
    Math.random = () => 0.314159
  })
  await page.goto(path, { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toBeVisible()
  await page.evaluate(async () => document.fonts.ready)
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
  await page.locator('.skip-link').evaluate((element) => element.setAttribute('hidden', ''))
}

export const waitForImages = async (region: Locator): Promise<void> => {
  for (const image of await region.locator('img').all()) {
    if (!(await image.isVisible())) continue
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true)
  }
  await region.scrollIntoViewIfNeeded()
}

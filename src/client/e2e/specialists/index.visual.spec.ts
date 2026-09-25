import { expect, test } from '@playwright/test'
import { openStable, waitForImages } from '../visual-support'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

test('Index chapter keeps each of its authored responsive compositions', async ({ page }) => {
  const widths = [320, 650, 700, 1400, 2560] as const
  await page.setViewportSize({ width: widths[0], height: 1080 })
  await openStable(page, './patch/the-usual-specialists')
  const index = page.locator('[data-specialist-chapter="index"]')

  for (const width of widths) {
    await page.setViewportSize({ width, height: 1080 })
    await waitForImages(index)
    await expect.soft(index).toHaveScreenshot(`index-${width}.png`)
  }
})

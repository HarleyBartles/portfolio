import { expect, test } from '@playwright/test'
import { openStable } from '../visual-support'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

test('homepage opening keeps its authored composition at wide width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './')
  await expect(page.locator('[data-visual-contract="homepage-opening"]')).toHaveScreenshot('homepage-opening-wide.png')
})

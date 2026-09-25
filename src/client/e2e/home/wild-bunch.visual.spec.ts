import { expect, test } from '@playwright/test'
import { openStable, waitForImages } from '../visual-support'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

test('homepage Wild Bunch movement keeps its wide and portrait compositions', async ({ page }) => {
  const movement = page.locator('[data-visual-contract="homepage-wild-bunch"]')
  for (const viewport of [{ width: 1440, height: 1100 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport)
    await openStable(page, './')
    await waitForImages(movement)
    await expect(movement).toHaveScreenshot(`homepage-wild-bunch-${viewport.width === 1440 ? 'wide' : 'portrait'}.png`)
  }
})

import { expect, test } from '@playwright/test'
import { openStable, waitForImages } from '../visual-support'

test.use({ reducedMotion: 'reduce' })
test.skip(process.platform !== 'win32', 'Visual baselines are authored and compared on Windows only')

test('homepage Specialists movement keeps its wide collage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 })
  await openStable(page, './')
  const movement = page.locator('[data-visual-contract="homepage-specialists"]')
  await waitForImages(movement)
  await expect(movement).toHaveScreenshot('homepage-specialists-wide.png')
})

test('homepage Specialists lockup remains legible in portrait composition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openStable(page, './')
  const movement = page.locator('[data-visual-contract="homepage-specialists"]')
  await waitForImages(movement)
  await expect(movement.locator('[data-patch-series-lockup]')).toHaveScreenshot('homepage-specialists-lockup-portrait.png')
})

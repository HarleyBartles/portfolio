import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 195, height: 844 } })

test('primary navigation remains keyboard-reachable in a 195 CSS-pixel viewport', async ({ page }) => {
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)

  const fairytales = page.getByRole('link', { name: 'Fairytales' })
  const navigationBounds = await page.locator('.site-header nav').boundingBox()
  expect(navigationBounds).not.toBeNull()
  expect(navigationBounds!.x + navigationBounds!.width).toBeLessThanOrEqual(195)
  await fairytales.focus()
  await expect(fairytales).toBeFocused()
  await expect(fairytales).toBeInViewport()
})

import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 195, height: 844 } })

test('primary navigation remains keyboard-reachable in a 195 CSS-pixel viewport', async ({ page }) => {
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)

  const patch = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Patch', exact: true })
  const navigationBounds = await page.locator('.site-header nav').boundingBox()
  expect(navigationBounds).not.toBeNull()
  expect(navigationBounds!.x + navigationBounds!.width).toBeLessThanOrEqual(195)
  await patch.focus()
  await expect(patch).toBeFocused()
  await expect(patch).toBeInViewport()
})

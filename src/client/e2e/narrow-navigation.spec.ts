import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 195, height: 844 } })

test('primary navigation remains keyboard-reachable in a 195 CSS-pixel viewport', async ({ page }) => {
  await page.goto('./')

  const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(documentWidth).toBe(await page.evaluate(() => window.innerWidth))

  const fairytales = page.getByRole('link', { name: 'Fairytales' })
  await fairytales.focus()
  await expect(fairytales).toBeFocused()
  await expect(fairytales).toBeInViewport()
})

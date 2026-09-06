import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 195, height: 844 } })

test('primary navigation remains keyboard-reachable in a 195 CSS-pixel viewport', async ({ page }) => {
  await page.goto('./projects')
  await page.evaluate(() => document.fonts.ready)

  await expect(page.locator('.site-shell--interior .site-identity-name')).toHaveText('Harley Bartles')
  await expect(page.locator('.site-shell--interior .site-header')).toHaveCount(1)
  await expect(page.locator('.site-shell--interior [data-route-context]')).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link')).toHaveCount(6)
  const pageWidth = await page.evaluate(() => ({
    fits: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    overflowing: [...document.querySelectorAll<HTMLElement>('*')]
      .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth)
      .map((element) => `${element.tagName}.${element.className}[${Math.round(element.getBoundingClientRect().left)}..${Math.round(element.getBoundingClientRect().right)}]:${element.textContent?.slice(0, 48)}`)
      .slice(0, 5),
  }))
  expect(pageWidth.fits, pageWidth.overflowing.join(', ')).toBe(true)

  const patch = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Patch', exact: true })
  const navigationBounds = await page.locator('.site-header nav').boundingBox()
  expect(navigationBounds).not.toBeNull()
  expect(navigationBounds!.x + navigationBounds!.width).toBeLessThanOrEqual(195)
  await patch.focus()
  await expect(patch).toBeFocused()
  await expect(patch).toBeInViewport()
})

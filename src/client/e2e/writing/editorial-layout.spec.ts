import { expect, test } from '@playwright/test'

test('reader can open the editorial aside and the shared layout stacks without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('./writing/use-superpowers/')

  const aside = page.getByRole('complementary', { name: 'When “most capable” changes overnight' })
  const disclosure = aside.locator('[data-editorial-aside-disclosure]')
  const summary = disclosure.locator('summary')
  await expect(aside).toBeVisible()
  await expect(disclosure).not.toHaveAttribute('open', '')

  const prose = page.locator('.content-page-body .content-prose').first()
  const [asideBox, proseBox] = await Promise.all([aside.boundingBox(), prose.boundingBox()])
  expect(asideBox).not.toBeNull()
  expect(proseBox).not.toBeNull()
  expect(asideBox!.width).toBeGreaterThan(proseBox!.width)

  await summary.focus()
  await page.keyboard.press('Space')
  await expect(disclosure).toHaveAttribute('open', '')
  await expect(disclosure.locator('.content-prose')).toBeVisible()

  for (const width of [1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await expect(aside).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'Use Superpowers' })).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

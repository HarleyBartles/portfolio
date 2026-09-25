import { expect, test } from '@playwright/test'

test('footer links move from one row to three deliberate pairs by 320px', async ({ page }) => {
  await page.setViewportSize({ width: 481, height: 832 })
  await page.goto('./projects')
  await page.evaluate(() => document.fonts.ready)
  const links = page.locator('.footer-links a')
  await expect(links).toHaveCount(6)
  const bounds = async () => links.evaluateAll((nodes) => nodes.map((node) => {
    const rect = node.getBoundingClientRect()
    return { x: rect.x, y: rect.y, height: rect.height }
  }))

  expect(new Set((await bounds()).map(({ y }) => y)).size).toBe(1)

  for (const width of [480, 390, 320]) {
    await page.setViewportSize({ width, height: 832 })
    const positions = await bounds()
    expect(positions).toHaveLength(6)
    expect(new Set(positions.map(({ y }) => y)).size).toBe(3)
    for (let row = 0; row < 3; row += 1) {
      expect(positions[row * 2].y).toBe(positions[row * 2 + 1].y)
      expect(positions[row * 2].x).toBe(positions[0].x)
      expect(positions[row * 2 + 1].x).toBe(positions[1].x)
    }
    expect(positions.every(({ height }) => height >= 44)).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  }
})

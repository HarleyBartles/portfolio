import { expect, test } from '@playwright/test'

for (const route of ['/', '/projects']) {
  test(`${route} header switches from one aligned link row to a square menu`, async ({ page }) => {
    await page.setViewportSize({ width: 545, height: 832 })
    await page.goto(`.${route}`)
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.site-identity-name')).toBeVisible()
    const mark = page.locator('.site-mark img')
    const links = page.getByRole('navigation', { name: 'Primary' }).getByRole('link')
    const button = page.getByRole('button', { name: 'Menu' })
    const markBox = (await mark.boundingBox())!
    const first = (await links.first().boundingBox())!
    const last = (await links.last().boundingBox())!
    expect(first.x - (markBox.x + markBox.width)).toBeGreaterThanOrEqual(24)
    expect(first.y).toBe(last.y)
    await expect(button).toBeHidden()

    await page.setViewportSize({ width: 544, height: 832 })
    await expect(button).toBeVisible()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('.site-identity-name')).toBeVisible()
    await expect(links).toHaveCount(0)
    const compactMark = (await mark.boundingBox())!
    const square = (await button.boundingBox())!
    expect(Math.abs(compactMark.y - square.y)).toBeLessThan(2)
    expect(Math.abs(compactMark.height - square.height)).toBeLessThan(2)
    expect(square.x).toBeGreaterThan(compactMark.x + compactMark.width)

    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(links).toHaveCount(6)
    const rows = await links.evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect()
      return { x: rect.x, y: rect.y, height: rect.height, width: rect.width }
    }))
    expect(new Set(rows.map(({ y }) => y)).size).toBe(6)
    expect(Math.max(...rows.map(({ x }) => x)) - Math.min(...rows.map(({ x }) => x))).toBeLessThan(2)
    expect(rows.every(({ height }) => height >= 48)).toBe(true)
    expect(rows.every(({ width }) => width > square.width * 3)).toBe(true)
    expect(rows[0].y).toBeGreaterThan(compactMark.y + compactMark.height)
    await expect(button.locator('[data-menu-icon="close"]')).toBeVisible()
  })

  test(`${route} header stays steady at the old 46rem breakpoint`, async ({ page }) => {
    await page.setViewportSize({ width: 737, height: 832 })
    await page.goto(`.${route}`)
    await page.evaluate(() => document.fonts.ready)
    const positions = async () => ({
      mark: (await page.locator('.site-mark').boundingBox())!.x,
      first: (await page.locator('.site-header nav a').first().boundingBox())!.x,
      last: (await page.locator('.site-header nav a').last().boundingBox())!.x,
    })
    const wider = await positions()
    await page.setViewportSize({ width: 736, height: 832 })
    const narrower = await positions()
    for (const key of ['mark', 'first', 'last'] as const) {
      expect(Math.abs(wider[key] - narrower[key]), `${key} shifted`).toBeLessThan(3)
    }
  })
}

test('compact menu supports keyboard dismissal, route selection and resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 832 })
  await page.goto('./')
  const button = page.getByRole('button', { name: 'Menu' })
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await page.locator('.site-mark').focus()
  await page.keyboard.press('Tab')
  await expect(button).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab')
  await expect(nav.getByRole('link').first()).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(button).toBeFocused()
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(nav.getByRole('link')).toHaveCount(0)
  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await page.setViewportSize({ width: 768, height: 832 })
  await expect(button).toBeHidden()
  await expect(page.locator('button[aria-controls="site-primary-navigation"]')).toHaveAttribute('aria-expanded', 'false')
  await page.setViewportSize({ width: 390, height: 832 })
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await button.click()
  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})

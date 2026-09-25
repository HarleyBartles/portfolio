import { expect, test } from '@playwright/test'

test('Specialists composition remains present on the homepage', async ({ page }) => {
  await page.goto('./')
  const overprint = page.locator('[data-zero-flow-overprint]')
  await expect(overprint).toBeVisible()
  expect(await overprint.evaluate((element) => ({
    position: getComputedStyle(element).position,
    offsetParentIsHeroComposition: element.offsetParent?.hasAttribute('data-patch-hero-composition') ?? false,
  }))).toEqual({ position: 'absolute', offsetParentIsHeroComposition: true })
  await expect(page.getByRole('heading', { level: 2, name: 'The Usual Specialists' })).toBeAttached()
})

test('semantic content and Specialists fallback survive failed homepage media', async ({ page }) => {
  await page.route('**/media/homepage/**', (route) => route.abort())
  await page.goto('./')
  await page.locator('[data-home-movement="patch"]').scrollIntoViewIfNeeded()

  await expect(page.getByRole('heading', { level: 2, name: 'A strong system, changed by using it.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'The Usual Specialists' })).toBeAttached()
  await expect(page.getByText('Recruitment folder for the six specialists.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Meet the crew →' })).toBeVisible()
})

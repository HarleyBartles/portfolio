import { expect, test } from '@playwright/test'

test('visitor follows an authored reading path and each destination starts at the top', async ({ page }) => {
  await page.goto('./')
  await page.locator('[data-home-movement="writing"]').scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await page.getByRole('link', { name: 'Read the story →' }).click()
  await expect(page).toHaveURL(/\/writing\/use-superpowers\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Use Superpowers' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  await page.getByRole('link', { name: /If you write a loop/ }).click()
  await expect(page).toHaveURL(/\/writing\/graph-iterative-review\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: /If you write a loop/ })).toBeVisible()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

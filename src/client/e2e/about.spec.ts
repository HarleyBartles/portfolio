import { expect, test } from '@playwright/test'

test('about page makes the professional proposition explicit without false contact delivery', async ({ page }) => {
  const response = await page.goto('./about/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'This is the part where I ask you to hire me.' })).toBeVisible()
  await expect(page.getByText(/six and a half years of professional practice/i)).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Level 6 AI Engineering apprenticeship.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Have a useful problem?' })).toBeVisible()
  await expect(page.getByText(/contact delivery is not connected yet/i)).toBeVisible()
  await expect(page.getByRole('link', { name: 'GitHub profile' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send message' })).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
})

test('homepage hiring link reaches the contact section', async ({ page }) => {
  await page.goto('./')

  await page.getByRole('link', { name: /work with me/i }).click()
  await expect(page).toHaveURL(/\/about#contact$/)
  await expect(page.getByRole('heading', { level: 2, name: 'Have a useful problem?' })).toBeVisible()
})

import { expect, test } from '@playwright/test'

test('Contact is a first-class route with canonical metadata and a usable form', async ({ page }) => {
  const response = await page.goto('./contact/')
  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('Contact | Harley Bartles')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://harleybartles.com/contact')
  await expect(page.getByRole('heading', { level: 1, name: 'Get in touch.' })).toBeVisible()
  await expect(page.getByLabel('Name')).toHaveAttribute('required', '')
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
})

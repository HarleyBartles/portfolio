import { expect, test } from '@playwright/test'

test('about page makes the professional proposition and configured conversion routes explicit', async ({ page }) => {
  const response = await page.goto('./about/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'I still like writing code. I just know the job is bigger than that now.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Access Checks, end to end.' })).toBeVisible()
  await expect(page.getByText('No source capture, no success.')).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'AI Engineer Level 6 apprenticeship.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'IMDb: Harley Bartles (opens in a new tab)' })).toBeVisible()
  await expect(page.getByText(/Remote-first works best.*My notice period is four weeks/i)).toBeVisible()
  const cvConversion = page.locator('[data-visual-contract="about-cv-conversion"]')
  await expect(cvConversion.getByRole('link', { name: 'Read the CV' })).toHaveAttribute('href', '/cv')
  await expect(cvConversion.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/harley-bartles-cv.pdf')
  await expect(page.getByRole('heading', { level: 2, name: 'Get in touch.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible()
  await expect(page.getByText(/contact delivery is not connected yet/i)).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
  await expect(page.getByText(/technical owner/i)).toHaveCount(0)
})

test('homepage hiring link reaches the contact section', async ({ page }) => {
  await page.goto('./')

  await page.getByRole('link', { name: 'Experience, current work, contact' }).click()
  await expect(page).toHaveURL(/\/about#contact$/)
  await expect(page.getByRole('heading', { level: 2, name: 'Get in touch.' })).toBeVisible()
})

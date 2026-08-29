import { expect, test } from '@playwright/test'

test('about page makes the professional proposition and configured conversion routes explicit', async ({ page }) => {
  const response = await page.goto('./about/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: /senior full-stack engineer/i })).toBeVisible()
  await expect(page.getByText('Professional software engineering since February 2019')).toBeVisible()
  await expect(page.getByText(/^\d+\+ years$/)).toBeVisible()
  await expect(page.locator('[data-visual-contract="about-professional-proof"]').getByText('Software Engineer', { exact: true })).toBeVisible()
  await expect(page.getByRole('region', { name: /from a recruiter-facing control surface/i }).getByText('The sole engineer responsible for designing, delivering, operating, and supporting Access Checks.')).toBeVisible()
  await expect(page.getByText(/a bachelor's degree-level qualification/i)).toBeVisible()
  await expect(page.getByRole('link', { name: 'IMDb: Harley Bartles' })).toBeVisible()
  await expect(page.getByText('Remote-first. Open to occasional UK-wide office travel, or Manchester hybrid up to one day per week.')).toBeVisible()
  await expect(page.getByText("Four weeks' notice")).toBeVisible()
  const cvConversion = page.locator('[data-visual-contract="about-cv-conversion"]')
  await expect(cvConversion.getByRole('link', { name: 'Read the web CV' })).toHaveAttribute('href', '/cv')
  await expect(cvConversion.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', '/harley-bartles-cv.pdf')
  await expect(page.getByRole('heading', { level: 2, name: 'Have a useful problem?' })).toBeVisible()
  await expect(page.getByText(/sent to Formspree for delivery/i)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible()
  await expect(page.getByText(/contact delivery is not connected yet/i)).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0)
  await expect(page.getByText(/bachelor's degree-level qualification/i)).toHaveCount(1)
  await expect(page.getByText(/technical owner/i)).toHaveCount(0)
})

test('homepage hiring link reaches the contact section', async ({ page }) => {
  await page.goto('./')

  await page.getByRole('link', { name: /work with me/i }).click()
  await expect(page).toHaveURL(/\/about#contact$/)
  await expect(page.getByRole('heading', { level: 2, name: 'Have a useful problem?' })).toBeVisible()
})

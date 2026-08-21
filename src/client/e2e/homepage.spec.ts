import { expect, test } from '@playwright/test'

test('homepage establishes professional identity and an authored editorial hierarchy', async ({ page }) => {
  await page.goto('./')

  await expect(page).toHaveTitle('Harley Bartles | Senior Software Engineer')
  await expect(page.getByRole('heading', { level: 1, name: 'Harley Bartles' })).toBeVisible()
  await expect(page.getByText('I build reliable agentic systems.', { exact: true })).toBeVisible()
  await expect(page.locator('.hero').getByText(/silly comics/i)).toBeVisible()

  const selected = page.getByRole('region', { name: 'Work worth bringing forward' })
  await expect(selected.getByRole('button', { name: 'Previous feature' })).toBeVisible()
  await expect(selected.getByRole('button', { name: 'Shuffle features' })).toBeVisible()
  await expect(selected.getByRole('button', { name: 'Next feature' })).toBeVisible()

  const lead = selected.locator('.feature-lead h2')
  const initialTitle = await lead.textContent()
  await selected.getByRole('button', { name: 'Next feature' }).click()
  await expect(lead).not.toHaveText(initialTitle ?? '')
})

test('homepage keeps project proof visible outside the shuffled lead', async ({ page }) => {
  await page.goto('./')

  const caseStudies = page.getByRole('region', { name: 'Systems with edges' })
  await expect(caseStudies.getByRole('link', { name: 'Agent Asset Marketplace' })).toBeVisible()
  await expect(caseStudies.getByRole('link', { name: 'Wild Bunch' })).toBeVisible()
  await expect(caseStudies.getByRole('link', { name: 'Agentic Learning Lab' })).toBeVisible()

  await caseStudies.getByRole('link', { name: 'Wild Bunch' }).click()
  await expect(page).toHaveURL(/\/projects\/wild-bunch\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
})

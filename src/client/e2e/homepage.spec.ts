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

test('homepage reflows for zoom and small screens while respecting keyboard and motion preferences', async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')

  const reducedDuration = await page.locator('.feature-lead').evaluate((element) => getComputedStyle(element).animationDuration)
  const reducedDurationMs = reducedDuration.endsWith('ms') ? Number.parseFloat(reducedDuration) : Number.parseFloat(reducedDuration) * 1000
  expect(reducedDurationMs).toBeLessThanOrEqual(0.01)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()

  await page.setViewportSize({ width: 320, height: 800 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

import { expect, test } from '@playwright/test'

test('visitor opens a direct project route with visual and case-study proof', async ({ page }) => {
  const response = await page.goto('./projects/wild-bunch/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Reserved frame for a future Wild Bunch gameplay capture.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Why it exists' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'What works now' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Decisions and trade-offs' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'What remains' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Public repository' })).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch')
})

test('visitor opens the Marketplace case study without horizontal overflow', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    const response = await page.goto('./projects/codex-marketplace/')
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: 'Agent Asset Marketplace' })).toBeVisible()
    await expect(page.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
    await expect(page.getByRole('figure', { name: /Distribution map/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Marketplace repository' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  }
})

test('visitor receives a useful page state when a content slug is missing', async ({ page }) => {
  await page.goto('./projects/missing-story')

  await expect(page).toHaveTitle('Page Not Found | Harley Bartles')
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
  await expect(page.getByText('This portfolio story is not available.', { exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to the homepage' })).toHaveAttribute('href', '/portfolio/')
})

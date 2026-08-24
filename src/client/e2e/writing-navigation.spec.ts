import { expect, test } from '@playwright/test'

test('writing index presents a featured essay and consistent human dates', async ({ page }) => {
  await page.goto('./writing/')

  await expect(page.getByRole('heading', { level: 1, name: 'Writing and Notes' })).toBeVisible()
  const featured = page.getByRole('article', { name: /agentic engineering and the kindness of vibe coding/i })
  await expect(featured).toBeVisible()
  await expect(featured.getByText('1 August 2026', { exact: true })).toBeVisible()
  await expect(featured.getByText('6 min read', { exact: true })).toBeVisible()
})

test('visitor opens a direct article route and moves through previous and next notes', async ({ page }) => {
  const response = await page.goto('./writing/context-is-not-state/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Context is not the same as state' })).toBeVisible()
  const storyNavigation = page.getByRole('navigation', { name: 'More writing' })
  await expect(storyNavigation.getByRole('link', { name: /previous/i })).toBeVisible()
  await expect(storyNavigation.getByRole('link', { name: /next/i })).toBeVisible()
})

test('fairytale index and detail expose imagery plus a readable transcript', async ({ page }) => {
  await page.goto('./fairytales/')

  await expect(page.getByRole('img', { name: /too much, too little, and just enough guidance/i })).toBeVisible()
  await page.getByRole('link', { name: 'Goldilocks - The Right Amount of Guidance' }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Goldilocks - The Right Amount of Guidance' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Visual transcript' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
})

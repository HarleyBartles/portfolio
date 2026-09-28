import { expect, test } from '@playwright/test'

test('visitor moves from the fairytale collection to its visual transcript', async ({ page }) => {
  await page.goto('./fairytales/')
  const collection = page.getByRole('region', { name: 'Patch fairytales' })
  await expect(collection).toBeVisible()
  await expect(collection.getByRole('img', { name: /too much, too little, and just enough guidance/i })).toBeVisible()

  await page.getByRole('link', { name: 'Goldilocks - The Right Amount of Guidance' }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Goldilocks - The Right Amount of Guidance' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Visual transcript' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
})

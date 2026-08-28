import { expect, test } from '@playwright/test'

test('writing index presents a featured essay and consistent human dates', async ({ page }) => {
  await page.goto('./writing/')

  await expect(page.getByRole('heading', { level: 1, name: 'Writing and Notes' })).toBeVisible()
  const featured = page.getByRole('article', { name: /agentic engineering and the kindness of vibe coding/i })
  await expect(featured).toBeVisible()
  await expect(featured.getByText('1 August 2026', { exact: true })).toBeVisible()
  await expect(featured.getByText('6 min read', { exact: true })).toBeVisible()
})

test('visitor opens the agentic-organisation article and finds its authored continuations', async ({ page }) => {
  const response = await page.goto('./writing/i-made-agentic-engineering-harder-than-it-needed-to-be/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'I made agentic engineering harder than it needed to be' })).toBeVisible()
  const continuations = page.getByRole('navigation', { name: 'Continue reading' })
  await expect(continuations.getByRole('link', { name: /provision only what the work needs/i })).toBeVisible()
  await expect(continuations.getByRole('link', { name: /engineer the route, not the theatre/i })).toBeVisible()
})

test('authored pull quotes use the wide editorial margin without widening the prose', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('./writing/why-adrs/')

  const prose = page.locator('.markdown-content > p').first()
  const pullQuote = page.locator('.markdown-content > blockquote').first()
  const [proseBox, wideQuoteBox] = await Promise.all([prose.boundingBox(), pullQuote.boundingBox()])

  expect(wideQuoteBox!.width).toBeGreaterThan(proseBox!.width + 100)

  await page.setViewportSize({ width: 720, height: 900 })
  const [narrowProseBox, narrowQuoteBox] = await Promise.all([prose.boundingBox(), pullQuote.boundingBox()])

  expect(Math.abs(narrowQuoteBox!.width - narrowProseBox!.width)).toBeLessThanOrEqual(1)
  expect(narrowQuoteBox!.x + narrowQuoteBox!.width).toBeLessThanOrEqual(720)
})

test('fairytale index and detail expose imagery plus a readable transcript', async ({ page }) => {
  await page.goto('./fairytales/')

  await expect(page.getByRole('img', { name: /too much, too little, and just enough guidance/i })).toBeVisible()
  await page.getByRole('link', { name: 'Goldilocks - The Right Amount of Guidance' }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: 'Goldilocks - The Right Amount of Guidance' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Visual transcript' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
})

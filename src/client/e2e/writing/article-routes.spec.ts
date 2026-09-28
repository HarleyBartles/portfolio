import { expect, test } from '@playwright/test'

test('direct article routes load only the selected specialist body chunk', async ({ page }) => {
  const scriptRequests = new Set<string>()
  page.on('request', (request) => {
    if (request.resourceType() === 'script') scriptRequests.add(new URL(request.url()).pathname)
  })

  await page.goto('./writing/i-just-write-the-code-is-not-a-full-sentence/')
  await expect(page.getByRole('heading', { level: 1, name: '"I just write the code" is not a full sentence' })).toBeVisible()
  expect([...scriptRequests].some((path) => path.includes('ProductOwnershipArticle-'))).toBe(true)
  for (const chunk of ['TestingEvidenceArticle-', 'ContextComplexityArticle-', 'RianHughesArticle-', 'UseSuperpowersArticle-']) {
    expect([...scriptRequests].some((path) => path.includes(chunk))).toBe(false)
  }

  scriptRequests.clear()
  await page.goto('./writing/why-adrs/')
  await expect(page.getByRole('heading', { level: 1, name: 'Why ADRs?' })).toBeVisible()
  for (const chunk of ['TestingEvidenceArticle-', 'ProductOwnershipArticle-', 'ContextComplexityArticle-', 'RianHughesArticle-', 'UseSuperpowersArticle-']) {
    expect([...scriptRequests].some((path) => path.includes(chunk))).toBe(false)
  }
})

test('Why ADRs keeps its decision memory and pull quote readable at desktop and mobile sizes', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('./writing/why-adrs/')
  await expect(page.getByRole('heading', { level: 1, name: 'Why ADRs?' })).toBeVisible()

  const figure = page.locator('[data-visual-contract="decision-memory"] figure')
  const prose = page.locator('.content-prose > p').first()
  const pullQuote = page.locator('.content-prose > blockquote').first()
  await expect(figure).toBeVisible()
  const [proseBox, wideQuoteBox] = await Promise.all([prose.boundingBox(), pullQuote.boundingBox()])
  expect(proseBox).not.toBeNull()
  expect(wideQuoteBox).not.toBeNull()
  expect(wideQuoteBox!.width).toBeGreaterThan(proseBox!.width + 100)

  await page.setViewportSize({ width: 720, height: 900 })
  const [narrowProseBox, narrowQuoteBox] = await Promise.all([prose.boundingBox(), pullQuote.boundingBox()])
  expect(narrowProseBox).not.toBeNull()
  expect(narrowQuoteBox).not.toBeNull()
  expect(Math.abs(narrowQuoteBox!.width - narrowProseBox!.width)).toBeLessThanOrEqual(1)
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('PORT-10 remains understandable when its two supporting marks fail to load', async ({ page }) => {
  await page.route('**/the-usual-specialists-wordmark.svg', (route) => route.abort())
  await page.route('**/adventures-of-patch-cliff-drop.svg', (route) => route.abort())
  await page.goto('./writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists/')

  await expect(page.getByRole('heading', { level: 1, name: 'How The Invisibles’ logo designer influenced The Usual Specialists' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'How the hierarchy is built' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'A different typographic answer' })).toBeVisible()
  await expect(page.getByText(/Three shared relationships explain the hierarchy/)).toBeVisible()
  await expect(page.getByText(/PATCH found a different typographic answer/)).toBeVisible()
  const continuations = page.getByRole('navigation', { name: 'Continue reading' })
  await expect(continuations.getByRole('link', { name: /The Usual Specialists/ })).toHaveAttribute('href', '/patch/the-usual-specialists')
  await expect(continuations.getByRole('link', { name: /Adventures of Patch/ })).toHaveAttribute('href', '/projects/adventures-of-patch')

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await expect(page.getByRole('figure', { name: 'How the hierarchy is built' })).toBeVisible()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

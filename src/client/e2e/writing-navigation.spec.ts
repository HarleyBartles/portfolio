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

test('PORT-10 remains a direct noindex preview with a coherent article and link contract', async ({ page }) => {
  const slug = 'how-the-invisibles-logo-designer-influenced-the-usual-specialists'
  const response = await page.goto(`./writing/${slug}/`)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'How The Invisibles’ logo designer influenced The Usual Specialists',
  })).toBeVisible()
  await expect(page.locator('.content-page-body p').first()).toHaveText('Chassis was already winning.')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page.getByText('As I remember it, anyway.', { exact: true })).toBeVisible()
  await expect(page.locator('.content-summary, .content-date, .share-action, .content-navigation')).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Continue reading' })).toHaveCount(0)

  const figures = page.getByRole('figure')
  await expect(figures).toHaveCount(3)
  await expect(figures.nth(0)).toHaveAttribute('aria-label', 'The finished wordmark')
  await expect(figures.nth(1)).toHaveAttribute('aria-label', 'How the hierarchy is built')
  await expect(figures.nth(2)).toHaveAttribute('aria-label', 'A different typographic answer')

  await expect(page.getByRole('link', { name: 'The Usual Specialists' })).toHaveAttribute('href', '/patch/lawful-heist')
  await expect(page.getByRole('link', { name: 'Brand Addition' })).toHaveAttribute('href', '/about')
  for (const name of ['Eurostile', 'Bank Gothic', 'Korolev', 'Chassis', 'Tales from Beyond Science']) {
    const link = page.getByRole('link', { name: new RegExp(`${name}.*opens in a new tab`, 'i') })
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  }

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }

  await page.setViewportSize({ width: 390, height: 844 })
  const [studyBox, cameoBox] = await Promise.all([figures.nth(0).boundingBox(), figures.nth(2).boundingBox()])
  expect(cameoBox!.width).toBeLessThan(studyBox!.width - 16)

  await page.goto('./writing/')
  await expect(page.getByRole('link', { name: /How The Invisibles’ logo designer/i })).toHaveCount(0)
  const sitemap = await (await page.request.get('./sitemap.xml')).text()
  expect(sitemap).not.toContain(slug)
})

test('PORT-10 captions and prose preserve the visual argument when both marks fail', async ({ page }) => {
  await page.route('**/the-usual-specialists-wordmark.svg', (route) => route.abort())
  await page.route('**/adventures-of-patch-cliff-drop.svg', (route) => route.abort())
  await page.goto('./writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists/')

  await expect(page.getByText('The finished mark. THE USUAL stays small; SPECIALISTS carries the job.')).toBeVisible()
  await expect(page.getByText(/Three shared relationships explain the hierarchy/)).toBeVisible()
  await expect(page.getByText(/PATCH found a different typographic answer/)).toBeVisible()
  await expect(page.getByText(/That’s the joke in the mark/)).toBeVisible()
  await expect(page.getByText(/PATCH went its own way/)).toBeVisible()
})

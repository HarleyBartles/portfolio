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

test('Use Superpowers keeps the ordinary article shell and opens its Astra disclosure', async ({ page }) => {
  const response = await page.goto('./writing/use-superpowers/')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Use Superpowers' })).toBeVisible()
  await expect(page.locator('[data-metadata-row]')).toContainText('5 September 2026')
  await expect(page.locator('[data-metadata-row]')).toContainText('5 min read')
  await expect(page.locator('[data-visual-language="authored-longform"][data-type-register="article-serif"]')).toBeVisible()

  const aside = page.getByRole('complementary', { name: 'When “most capable” changes overnight' })
  const disclosure = aside.locator('[data-editorial-aside-disclosure]')
  await expect(aside).toHaveAttribute('data-editorial-aside', 'true')
  await expect(disclosure).not.toHaveAttribute('open', '')
  await expect(aside.getByText('When “most capable” changes overnight', { exact: true })).toBeVisible()
  await expect(aside.getByText('A model release can change what a relative instruction means without anyone editing the instruction. My model-selection rule made that visible to me this morning.', { exact: true })).toBeVisible()
  await expect(disclosure.getByText('Read the Astra audit', { exact: true })).toBeVisible()
  await expect(disclosure.getByText(/When I started `selecting-a-subagent`/)).not.toBeVisible()

  await disclosure.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(disclosure).toHaveAttribute('open', '')
  await expect(disclosure.locator('.content-prose')).toBeVisible()
  await expect(disclosure.locator('.content-prose')).toContainText('When I started selecting-a-subagent')

  await expect(page.getByRole('link', { name: /If you write a loop/ })).toHaveAttribute('href', '/writing/graph-iterative-review')
  await expect(page.getByRole('link', { name: 'Agent Asset Marketplace', exact: true })).toHaveAttribute('href', '/projects/codex-marketplace')
  await expect(page.getByRole('link', { name: 'Read Use Superpowers →' })).toHaveCount(0)

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test('every current writing aside uses the canonical editorial disclosure', async ({ page }) => {
  const consumers = [
    { path: './writing/i-made-agentic-engineering-harder-than-it-needed-to-be/', title: 'The packaged organisation' },
    { path: './writing/i-just-write-the-code-is-not-a-full-sentence/', title: 'SQL was my weak point' },
    { path: './writing/i-just-write-the-code-is-not-a-full-sentence/', title: 'The webhook wasn’t early' },
    { path: './writing/the-right-test-isnt-your-favourite-test/', title: 'Prose can still be tested' },
    { path: './writing/use-superpowers/', title: 'When “most capable” changes overnight' },
  ]

  for (const consumer of consumers) {
    await page.goto(consumer.path)
    const aside = page.getByRole('complementary', { name: consumer.title })
    const disclosure = aside.locator('[data-editorial-aside-disclosure]')

    await expect(aside).toHaveAttribute('data-editorial-aside', 'true')
    await expect(disclosure).toHaveCount(1)
    await expect(disclosure).not.toHaveAttribute('open', '')
    await expect(page.locator('article details:not([data-editorial-aside-disclosure])')).toHaveCount(0)
  }
})

test('WorkClaw and Astra share keyboard disclosure and responsive field grammar', async ({ page }) => {
  const inspectAside = async (path: string, title: string) => {
    await page.goto(path)
    const aside = page.getByRole('complementary', { name: title })
    const disclosure = aside.locator('[data-editorial-aside-disclosure]')
    await expect(disclosure).not.toHaveAttribute('open', '')
    return {
      aside,
      disclosure,
      grammar: await aside.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          backgroundColor: style.backgroundColor,
          borderTopColor: style.borderTopColor,
          borderTopWidth: style.borderTopWidth,
          display: style.display,
        }
      }),
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 })
  const astra = await inspectAside('./writing/use-superpowers/', 'When “most capable” changes overnight')
  const workClaw = await inspectAside('./writing/i-made-agentic-engineering-harder-than-it-needed-to-be/', 'The packaged organisation')

  expect(workClaw.grammar).toEqual(astra.grammar)
  await workClaw.disclosure.locator('summary').focus()
  await page.keyboard.press('Space')
  await expect(workClaw.disclosure).toHaveAttribute('open', '')
  await expect(workClaw.disclosure.getByRole('link', { name: 'WorkClaw' })).toBeVisible()

  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    const resizedWorkClaw = await inspectAside('./writing/i-made-agentic-engineering-harder-than-it-needed-to-be/', 'The packaged organisation')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const resizedAstra = await inspectAside('./writing/use-superpowers/', 'When “most capable” changes overnight')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(resizedWorkClaw.grammar).toEqual(resizedAstra.grammar)
  }
})

test('shared editorial asides break right from the reading measure and stack before their lanes cramp', async ({ page }) => {
  const consumers = [
    { path: './writing/i-made-agentic-engineering-harder-than-it-needed-to-be/', title: 'The packaged organisation' },
    { path: './writing/use-superpowers/', title: 'When “most capable” changes overnight' },
  ]

  await page.setViewportSize({ width: 1440, height: 900 })

  for (const consumer of consumers) {
    await page.goto(consumer.path)
    const aside = page.getByRole('complementary', { name: consumer.title })
    const prose = page.locator('.content-page-body .content-prose').first()
    const title = aside.getByRole('heading', { level: 2, name: consumer.title })
    const [asideBox, proseBox, titleMetrics] = await Promise.all([
      aside.boundingBox(),
      prose.boundingBox(),
      title.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          height: element.getBoundingClientRect().height,
          lineHeight: Number.parseFloat(style.lineHeight),
        }
      }),
    ])

    expect(asideBox!.x).toBeCloseTo(proseBox!.x, 0)
    expect(asideBox!.width).toBeGreaterThan(proseBox!.width + 200)
    expect(titleMetrics.height).toBeLessThanOrEqual(titleMetrics.lineHeight * 2 + 1)
  }

  await page.setViewportSize({ width: 768, height: 900 })

  for (const consumer of consumers) {
    await page.goto(consumer.path)
    const aside = page.getByRole('complementary', { name: consumer.title })
    const prose = page.locator('.content-page-body .content-prose').first()
    const [asideBox, proseBox, template] = await Promise.all([
      aside.boundingBox(),
      prose.boundingBox(),
      aside.evaluate((element) => getComputedStyle(element).gridTemplateColumns),
    ])

    expect(asideBox!.width).toBeCloseTo(proseBox!.width, 0)
    expect(template.trim().split(/\s+/)).toHaveLength(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
})

test('authored pull quotes use the wide editorial margin without widening the prose', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('./writing/why-adrs/')

  const prose = page.locator('.content-prose > p').first()
  const pullQuote = page.locator('.content-prose > blockquote').first()
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

test('PORT-10 uses the complete writing shell with a coherent article and link contract', async ({ page }) => {
  const slug = 'how-the-invisibles-logo-designer-influenced-the-usual-specialists'
  const response = await page.goto(`./writing/${slug}/`)

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'How The Invisibles’ logo designer influenced The Usual Specialists',
  })).toBeVisible()
  await expect(page.locator('.content-summary')).toHaveText('Chassis was already winning when I noticed Rian Hughes had designed it. His name sent me back to 1992, then into the word itself, where The Usual Specialists suddenly had somewhere to work.')
  await expect(page.locator('.content-page-body p').first()).toContainText('I was looking for a face for The Usual Specialists.')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://harleybartles.com/writing/${slug}`)
  await expect(page.getByText('As I remember it, anyway.', { exact: true })).toBeVisible()
  await expect(page.locator('.content-summary')).toHaveCount(1)
  await expect(page.locator('[data-metadata-row]')).toContainText('3 September 2026')
  await expect(page.locator('[data-metadata-row]')).toContainText('4 min read')
  const continuations = page.getByRole('navigation', { name: 'Continue reading' })
  await expect(continuations).toBeVisible()
  await expect(continuations.getByRole('link', { name: /The Lawful Heist Crew/ })).toHaveAttribute('href', '/patch/lawful-heist')
  await expect(continuations.getByRole('link', { name: /Adventures of Patch/ })).toHaveAttribute('href', '/projects/adventures-of-patch')
  await expect(page.getByRole('heading', { level: 2, name: 'Keep the receipt' })).toBeVisible()

  const figures = page.getByRole('figure')
  await expect(figures).toHaveCount(2)
  await expect(figures.nth(0)).toHaveAttribute('aria-label', 'How the hierarchy is built')
  await expect(figures.nth(1)).toHaveAttribute('aria-label', 'A different typographic answer')

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
  const [studyBox, cameoBox] = await Promise.all([figures.nth(0).boundingBox(), figures.nth(1).boundingBox()])
  expect(cameoBox!.width).toBeLessThan(studyBox!.width - 16)

  await page.goto('./writing/')
  await expect(page.getByRole('link', { name: /How The Invisibles’ logo designer/i })).toBeVisible()
  const sitemap = await (await page.request.get('./sitemap.xml')).text()
  expect(sitemap).toContain(slug)
})

test('PORT-10 captions and prose preserve the visual argument when both marks fail', async ({ page }) => {
  await page.route('**/the-usual-specialists-wordmark.svg', (route) => route.abort())
  await page.route('**/adventures-of-patch-cliff-drop.svg', (route) => route.abort())
  await page.goto('./writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists/')

  await expect(page.getByText(/Three shared relationships explain the hierarchy/)).toBeVisible()
  await expect(page.getByText(/PATCH found a different typographic answer/)).toBeVisible()
  await expect(page.getByText(/That’s the joke in the mark/)).toBeVisible()
  await expect(page.getByText(/PATCH went its own way/)).toBeVisible()
})

import { expect, test } from '@playwright/test'

const expectedFonts = [
  { family: 'Source Sans 3', assetName: /source-sans-3-latin-wght-normal-[^/]+\.woff2$/ },
  { family: 'Source Serif 4', assetName: /source-serif-4-latin-wght-normal-[^/]+\.woff2$/ },
  { family: 'Source Code Pro', assetName: /source-code-pro-latin-wght-normal-[^/]+\.woff2$/ },
] as const

test('production typography is self-hosted and available without a font CDN', async ({ page }, testInfo) => {
  const appOrigin = new URL(testInfo.project.use.baseURL as string).origin
  const externalRequests: string[] = []
  const successfulFontResponses: string[] = []

  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url())
    if ((url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== appOrigin) {
      externalRequests.push(url.href)
      await route.abort('blockedbyclient')
      return
    }
    await route.continue()
  })
  page.on('response', (response) => {
    if (response.request().resourceType() === 'font' && response.status() === 200) {
      successfulFontResponses.push(response.url())
    }
  })

  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })).toBeVisible()
  await page.goto('./about')
  await expect(page.locator('main h1')).toBeVisible()
  await page.goto('./writing/why-adrs/')
  await expect(page.locator('article[data-content-kind="writing"]')).toBeVisible()
  await page.goto('./projects/codex-marketplace/')
  await expect(page.locator('code').first()).toBeVisible()
  const loadedFaces = await page.evaluate(async (families) => {
    await Promise.all(families.map((family) => document.fonts.load(`400 16px "${family}"`)))
    await document.fonts.ready
    return Array.from(document.fonts).map((face) => ({
      family: face.family.replace(/^['"]|['"]$/g, ''),
      status: face.status,
    }))
  }, expectedFonts.map(({ family }) => family))

  expect(externalRequests).toEqual([])
  for (const expected of expectedFonts) {
    expect(loadedFaces).toContainEqual({ family: expected.family, status: 'loaded' })
    expect(successfulFontResponses.some((url) => expected.assetName.test(new URL(url).pathname))).toBe(true)
  }
  expect(new Set(successfulFontResponses).size).toBeGreaterThanOrEqual(expectedFonts.length)
  expect(successfulFontResponses.every((url) => new URL(url).origin === appOrigin)).toBe(true)
})

test('interior typography maps content roles to the accepted Source families', async ({ page }) => {
  await page.goto('./about')
  await expect(page.locator('main h1')).toBeVisible()
  await expect(page.locator('main h1')).toHaveCSS('font-family', /Source Sans 3/)

  await page.goto('./writing/why-adrs/')
  const article = page.locator('article[data-content-kind="writing"]')
  await expect(article).toBeVisible()
  await expect(article.locator('.content-prose').first()).toHaveCSS('font-family', /Source Serif 4/)

  await page.goto('./projects/codex-marketplace/')
  await expect(page.locator('code').first()).toHaveCSS('font-family', /Source Code Pro/)
})

test('homepage typography uses the shared Source families rather than legacy font roles', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('main h1')).toHaveCSS('font-family', /Source Sans 3/)
  await expect(page.locator('.site-header nav a').first()).toHaveCSS('font-family', /Source Code Pro/)
  await expect(page.locator('.home-article-title').first()).toHaveCSS('font-family', /Source Serif 4/)
})

test('interior shared controls, captions, and professional metadata do not inherit the homepage utility language', async ({ page }) => {
  await page.goto('./about')
  const nextRole = page.locator('[data-visual-contract="about-cv-conversion"]')
  await expect(nextRole.locator('.text-link')).toHaveCSS('font-family', /Source Sans 3/)
  await expect(nextRole.locator('.button-link')).toHaveCSS('font-family', /Source Sans 3/)
  await expect(nextRole.locator('.button-link')).toHaveCSS('background-color', 'rgb(31, 36, 31)')
  await expect(page.locator('[data-professional-rail="chronology"] .eyebrow')).toHaveCSS('color', 'rgb(98, 94, 85)')

  await page.goto('./cv')
  await expect(page.locator('.cv-role').first()).toHaveCSS('color', 'rgb(98, 94, 85)')

  await page.goto('./projects/wild-bunch/')
  const caption = page.locator('.project-visual--wild-bunch-concept figcaption')
  await expect(caption).toHaveCSS('font-family', /Source Sans 3/)
  await expect(caption).toHaveCSS('font-weight', '400')
  await expect(caption).toHaveCSS('letter-spacing', 'normal')
  await expect(caption).toHaveCSS('text-transform', 'none')
})

test('interior project heroes use the accepted material treatments without old paper fields or a CSS feather', async ({ page }) => {
  await page.goto('./projects/wild-bunch/')
  await expect(page.locator('.project-visual--wild-bunch-concept picture')).toHaveCSS('mask-image', 'none')

  for (const path of ['./projects/agentic-learning-lab/', './projects/adventures-of-patch/']) {
    await page.goto(path)
    await expect(page.locator('.content-page-header')).toHaveCSS('background-color', 'rgb(230, 234, 235)')
  }
})

test('interior routes remain usable with Source font requests blocked', async ({ page }) => {
  const interceptedSourceFonts = new Set<string>()
  await page.route(/\/assets\/source-(?:sans-3|serif-4|code-pro)-[^/?]+\.woff2(?:\?.*)?$/, (route) => {
    interceptedSourceFonts.add(new URL(route.request().url()).pathname)
    return route.abort('blockedbyclient')
  })

  for (const path of ['./about', './writing/why-adrs/', './projects/codex-marketplace/']) {
    await page.goto(path)
    await expect(page.locator('main h1')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
  }

  expect(interceptedSourceFonts.size).toBeGreaterThanOrEqual(2)
})

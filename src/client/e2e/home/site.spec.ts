import { expect, test } from '@playwright/test'

const movementOrder = ['opening', 'marketplace', 'wild-bunch', 'writing', 'patch', 'professional-close']
const homepageWidths = [320, 768, 1440] as const

const movementHeadings = [
  'Engineering the whole problem, not just the code.',
  'A strong system, changed by using it.',
  "I only get to call the replay exact because it's falsifiable.",
  'I made agentic engineering harder than it needed to be',
  'The Usual Specialists',
  "I've shown you how I work.",
] as const

test('shared masthead mark has no route-surface fill', async ({ page }) => {
  await page.goto('./')

  await expect(page.locator('.site-mark img')).toHaveCSS('box-shadow', 'none')

  const markResponse = await page.request.get(new URL('brand/hb-mark.svg', page.url()).toString())
  expect(markResponse.ok()).toBe(true)
  const mark = await markResponse.text()

  expect(mark).toContain('fill="none" stroke="#1f241f"')
  expect(mark).not.toContain('fill="#fffaf0"')
})

test('homepage presents the accepted deterministic edition in editorial order', async ({ page }) => {
  await page.goto('./')

  await expect(page).toHaveTitle('Harley Bartles | Full-stack software engineer')
  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeAttached()
  await page.locator('body').focus()
  await page.keyboard.press('Tab')
  await expect(skipLink).toBeFocused()
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })).toBeVisible()
  await expect(page.locator('[data-home-movement]')).toHaveCount(6)
  expect(await page.locator('[data-home-movement]').evaluateAll((elements) => elements.map((element) => element.getAttribute('data-home-movement')))).toEqual(movementOrder)

  await expect(page.getByRole('link', { name: 'Read the story →' })).toHaveAttribute('href', /writing\/use-superpowers$/)
  await expect(page.getByRole('link', { name: 'Follow the trail →' })).toHaveAttribute('href', /projects\/wild-bunch$/)
  await expect(page.getByRole('link', { name: 'Read the article →' })).toHaveAttribute('href', /writing\/i-made-agentic-engineering-harder-than-it-needed-to-be$/)
  await expect(page.getByRole('link', { name: 'Meet the crew →' })).toHaveAttribute('href', /patch\/the-usual-specialists$/)
  await expect(page.locator('a[href*="/patch/the-usual-specialists/next"]')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'When the process becomes the problem ↓' })).toHaveAttribute('href', '#writing')
  await expect(page.getByRole('link', { name: 'Meet The Usual Specialists ↓' })).toHaveAttribute('href', '#patch')
})

test('homepage route stays lazy on unrelated direct routes', async ({ context }) => {
  const aboutPage = await context.newPage()
  const aboutScripts = new Set<string>()
  aboutPage.on('request', (request) => {
    if (request.resourceType() === 'script') aboutScripts.add(new URL(request.url()).pathname)
  })
  await aboutPage.goto('./about', { waitUntil: 'networkidle' })
  await expect(aboutPage.getByRole('heading', { level: 1 })).toBeVisible()
  expect([...aboutScripts].some((path) => /HomePage-.*\.js$/.test(path))).toBe(false)
  await aboutPage.close()

  const homePage = await context.newPage()
  const homeScripts = new Set<string>()
  homePage.on('request', (request) => {
    if (request.resourceType() === 'script') homeScripts.add(new URL(request.url()).pathname)
  })
  await homePage.goto('./', { waitUntil: 'networkidle' })
  await expect(homePage.getByRole('heading', { level: 1, name: movementHeadings[0] })).toBeVisible()
  expect([...homeScripts].some((path) => /HomePage-.*\.js$/.test(path))).toBe(true)
  await homePage.close()
})

test('homepage anchor landings, reduced motion, and accepted breakpoint edges remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const width of homepageWidths) {
    await page.setViewportSize({ width, height: width > 900 ? 1000 : 844 })
    await page.goto('./')
    expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    await expect(page.locator('[data-home-movement]')).toHaveCount(6)
    expect(await page.locator('[data-home-movement]').evaluateAll((elements) => elements.map((element) => element.getAttribute('data-home-movement')))).toEqual(movementOrder)
    for (const heading of movementHeadings) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached()
    }
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  await page.getByRole('link', { name: 'Meet The Usual Specialists ↓' }).click()
  await expect(page).toHaveURL(/#patch$/)
  expect(await page.locator('#patch').evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(40)
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto')

  await page.setViewportSize({ width: 1440, height: 800 })
  await page.goto('./')
  await page.getByRole('link', { name: 'I tried to break my own event-sourcing claim ↓' }).click()
  await expect(page).toHaveURL(/#wild-bunch$/)
  const replay = await page.locator('[data-wild-replay]').boundingBox()
  expect(replay).not.toBeNull()
  expect(replay?.y).toBeGreaterThanOrEqual(0)
  expect(replay?.y! + replay?.height!).toBeLessThanOrEqual(800)

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('./')
  const browserSession = await page.context().newCDPSession(page)
  await browserSession.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 })
  expect(await page.evaluate(() => window.visualViewport?.scale)).toBe(2)
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })).toBeVisible()
  await browserSession.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 })

})

test('controlled homepage folds return to the shared editorial frame', async ({ page }) => {
  for (const width of [1440, 984, 768]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('./')

    const expectedWidth = Math.min(1216, width - (width <= 800 ? 28 : 48))
    const expectedLeft = (width - expectedWidth) / 2

    for (const selector of [
      '[data-home-movement="opening"] > [data-home-frame]',
      '[data-home-movement="writing"] > [data-home-frame]',
      '[data-home-movement="professional-close"] > [data-home-frame]',
    ]) {
      const box = await page.locator(selector).boundingBox()
      expect(box, `${selector} should have a rendered frame at ${width}px`).not.toBeNull()
      expect(box?.width, `${selector} width at ${width}px`).toBeCloseTo(expectedWidth, 0)
      expect(box?.x, `${selector} left edge at ${width}px`).toBeCloseTo(expectedLeft, 0)
    }
  }
})

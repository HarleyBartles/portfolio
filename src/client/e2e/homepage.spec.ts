import { expect, test } from '@playwright/test'

const movementOrder = ['opening', 'marketplace', 'wild-bunch', 'writing', 'patch', 'professional-close']

test('homepage presents the accepted deterministic edition in editorial order', async ({ page }) => {
  await page.goto('./')

  await expect(page).toHaveTitle('Harley Bartles | Full-stack software engineer')
  await page.locator('body').focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await expect(page.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })).toBeVisible()
  await expect(page.locator('[data-home-movement]')).toHaveCount(6)
  expect(await page.locator('[data-home-movement]').evaluateAll((elements) => elements.map((element) => element.getAttribute('data-home-movement')))).toEqual(movementOrder)

  await expect(page.getByRole('link', { name: 'Inspect the case study →' })).toHaveAttribute('href', /projects\/codex-marketplace$/)
  await expect(page.getByRole('link', { name: 'Follow the trail →' })).toHaveAttribute('href', /projects\/wild-bunch$/)
  await expect(page.getByRole('link', { name: 'Read the article →' })).toHaveAttribute('href', /writing\/i-made-agentic-engineering-harder-than-it-needed-to-be$/)
  await expect(page.getByRole('link', { name: 'Meet the crew →' })).toHaveAttribute('href', /patch\/lawful-heist$/)
  await expect(page.getByRole('link', { name: 'When the process becomes the problem ↓' })).toHaveAttribute('href', '#writing')
  await expect(page.getByRole('link', { name: 'Meet The Usual Specialists ↓' })).toHaveAttribute('href', '#patch')
})

test('Wild Bunch and Specialists preserve their authored structural contracts', async ({ page }) => {
  await page.goto('./')

  const proof = page.locator('[data-wild-proof]')
  await expect(proof.locator('.home-wild-event')).toHaveCount(6)
  await expect(proof).toHaveAttribute('data-topology', 'events-cache-state;history-replay-cache-state')

  const overprint = page.locator('[data-zero-flow-overprint]')
  await expect(overprint).toBeVisible()
  expect(await overprint.evaluate((element) => ({ position: getComputedStyle(element).position, offsetParent: element.offsetParent?.className }))).toEqual({ position: 'absolute', offsetParent: 'hero-composition' })
  await expect(page.getByRole('heading', { level: 2, name: 'The Usual Specialists' })).toBeAttached()
})

test('homepage anchor landings, reduced motion, and accepted breakpoint edges remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const width of [1440, 1280, 1279, 1100, 1099, 984, 901, 900, 768, 721, 720, 521, 520, 390, 320]) {
    await page.setViewportSize({ width, height: width > 900 ? 1000 : 844 })
    await page.goto('./')
    expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
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
  const replay = await page.locator('.wild-proof-replay').boundingBox()
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

    for (const selector of ['.opening > .home-frame', '.home-writing-feature > .home-frame', '#contact > .home-frame']) {
      const box = await page.locator(selector).boundingBox()
      expect(box, `${selector} should have a rendered frame at ${width}px`).not.toBeNull()
      expect(box?.width, `${selector} width at ${width}px`).toBeCloseTo(expectedWidth, 0)
      expect(box?.x, `${selector} left edge at ${width}px`).toBeCloseTo(expectedLeft, 0)
    }
  }
})

test('Wild Bunch copy and diagram connectors remain structurally anchored', async ({ page }) => {
  for (const width of [1440, 1294, 984, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('./')

    const eyebrow = await page.locator('.wild-grid > .home-eyebrow').boundingBox()
    const editorialLeft = width > 800 ? Math.max(24, (width - 1216) / 2) : 14
    expect(eyebrow, `Wild Bunch eyebrow should render at ${width}px`).not.toBeNull()
    expect(eyebrow?.x).toBeCloseTo(editorialLeft, 0)

    const cache = await page.locator('.wild-proof-cache').boundingBox()
    const events = page.locator('.home-wild-event')
    for (let index = 0; index < await events.count(); index += 1) {
      const event = await events.nth(index).boundingBox()
      const wire = await events.nth(index).locator('.home-wild-live-wire').boundingBox()
      expect(event).not.toBeNull()
      expect(wire).not.toBeNull()
      expect(await events.nth(index).locator('.home-wild-live-wire').evaluate((element) => getComputedStyle(element).zIndex)).toBe('4')
      expect(Math.abs(wire?.x! - (event?.x! + event?.width!))).toBeLessThanOrEqual(2)
      if (width > 720) {
        const arrowHead = await events.nth(index).locator('.home-wild-live-wire').evaluate((element) => Number.parseFloat(getComputedStyle(element, '::after').width))
        const arrowStart = wire?.x! + wire?.width!
        const arrowEnd = arrowStart + arrowHead
        expect(arrowStart, `event ${index + 1} arrowhead should reach Cache`).toBeLessThanOrEqual(cache?.x! + cache?.width!)
        expect(arrowEnd, `event ${index + 1} arrowhead should overlap Cache`).toBeGreaterThanOrEqual(cache?.x!)
      } else {
        expect(wire?.x! + wire?.width!).toBeGreaterThanOrEqual(cache?.x!)
        expect(wire?.x! + wire?.width!).toBeLessThanOrEqual(cache?.x! + cache?.width! + 2)
        expect(Math.abs((wire?.y! + wire?.height!) - cache?.y!), `mobile wire ${index + 1} should terminate at Cache`).toBeLessThanOrEqual(10)
      }
    }

    const heading = await page.getByRole('heading', { level: 2, name: "I only get to call the replay exact because it's falsifiable." }).boundingBox()
    const readingCard = await page.locator('.wild-reading-card .home-body').boundingBox()
    expect(heading).not.toBeNull()
    expect(readingCard).not.toBeNull()
    if (width > 1279) {
      const state = await page.locator('.wild-proof-state').boundingBox()
      expect(state).not.toBeNull()
      expect(heading?.x).toBeGreaterThanOrEqual(state?.x!)
      expect(heading?.y).toBeGreaterThanOrEqual(state?.y!)
      const readingCardSurface = await page.locator('.wild-reading-card').boundingBox()
      expect(readingCardSurface).not.toBeNull()
      expect(heading?.y! + heading?.height!).toBeLessThanOrEqual(readingCardSurface?.y!)
      if (width >= 1400) {
        expect(readingCard?.y! + readingCard?.height!).toBeLessThanOrEqual(state?.y! + state?.height!)
      } else {
        const proof = await page.locator('.home-wild-proof').boundingBox()
        expect(proof).not.toBeNull()
        expect(readingCardSurface?.y! + readingCardSurface?.height!).toBeGreaterThan(proof?.y! + proof?.height!)
      }
    } else {
      expect(heading?.y! + heading?.height!).toBeLessThanOrEqual(readingCard?.y!)
    }
  }
})

test('semantic content and Specialists fallback survive failed homepage media', async ({ page }) => {
  await page.route('**/media/homepage/**', (route) => route.abort())
  await page.goto('./')
  await page.locator('[data-home-movement="patch"]').scrollIntoViewIfNeeded()

  await expect(page.getByRole('heading', { level: 2, name: 'A strong system, changed by using it.' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'The Usual Specialists' })).toBeAttached()
  await expect(page.getByText('Completed recruitment folder. Six specialists, six distinct assent marks, and one lawful route into the story.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Meet the crew →' })).toBeVisible()
})

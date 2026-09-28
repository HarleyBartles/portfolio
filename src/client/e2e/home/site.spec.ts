import { expect, test } from '@playwright/test'

const movementOrder = ['opening', 'marketplace', 'wild-bunch', 'writing', 'patch', 'professional-close']
const movementHeadings = [
  'Engineering the whole problem, not just the code.',
  'A strong system, changed by using it.',
  "I only get to call the replay exact because it's falsifiable.",
  'The Usual Specialists',
  "I've shown you how I work.",
]
const frameSelectors = [
  '[data-home-movement="opening"] > [data-home-frame]',
  '[data-home-movement="writing"] > [data-home-frame]',
  '[data-home-movement="professional-close"] > [data-home-frame]',
]

test('homepage edition changes across a GMT day and its article link reaches that edition', async ({ page }) => {
  const firstDay = new Date('2026-09-28T23:59:00Z')
  await page.clock.setFixedTime(firstDay)
  await page.goto('./')

  const writing = page.locator('[data-home-movement="writing"]')
  const articleLink = writing.locator('a[href*="/writing/"]')
  const firstHref = await articleLink.getAttribute('href')
  const firstTitle = await writing.getByRole('heading').textContent()
  expect(firstHref).toMatch(/^\/writing\//)
  await expect(page.getByRole('link', { name: 'Meet the crew →' })).toHaveAttribute('href', /patch\/the-usual-specialists$/)

  await page.clock.setFixedTime(new Date(firstDay.getTime() + 2 * 60_000))
  await page.goto('./')
  const nextHref = await articleLink.getAttribute('href')
  const nextTitle = (await writing.getByRole('heading').textContent())?.trim()
  expect(nextHref).not.toBe(firstHref)
  expect(nextTitle).not.toBe(firstTitle?.trim())
  await articleLink.click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(nextTitle!)
})

test('home journeys keep movement order and aligned frames usable with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('./')
    expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth),
      `homepage should not overflow at ${width}px`).toBe(true)
    expect(await page.locator('[data-home-movement]').evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('data-home-movement')))).toEqual(movementOrder)

    const frames = await Promise.all(frameSelectors.map((selector) => page.locator(selector).boundingBox()))
    expect(frames.every((box) => box !== null)).toBe(true)
    for (const box of frames.slice(1)) {
      expect(box!.x).toBeCloseTo(frames[0]!.x, 0)
      expect(box!.width).toBeCloseTo(frames[0]!.width, 0)
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
  await expect(page.locator('[data-wild-replay]')).toBeInViewport()
})

import { expect, test } from '@playwright/test'

test('Wild Bunch copy and diagram connectors remain structurally anchored', async ({ page }) => {
  for (const width of [1440, 1294, 984, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('./')

    const eyebrow = await page.getByText('Wild Bunch · C# / .NET / PostgreSQL', { exact: true }).boundingBox()
    const editorialLeft = width > 800 ? Math.max(24, (width - 1216) / 2) : 14
    expect(eyebrow, `Wild Bunch eyebrow should render at ${width}px`).not.toBeNull()
    expect(eyebrow?.x).toBeCloseTo(editorialLeft, 0)

    const cache = await page.locator('[data-wild-cache]').boundingBox()
    const events = page.locator('[data-wild-event]')
    for (let index = 0; index < await events.count(); index += 1) {
      const event = await events.nth(index).boundingBox()
      const wire = await events.nth(index).locator('[data-wild-wire]').boundingBox()
      expect(event).not.toBeNull()
      expect(wire).not.toBeNull()
      expect(await events.nth(index).locator('[data-wild-wire]').evaluate((element) => getComputedStyle(element).zIndex)).toBe('4')
      expect(Math.abs(wire?.x! - (event?.x! + event?.width!))).toBeLessThanOrEqual(2)
      if (width > 720) {
        const arrowHead = await events.nth(index).locator('[data-wild-wire]').evaluate((element) => Number.parseFloat(getComputedStyle(element, '::after').width))
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
    const readingCardSurface = page.locator('[data-wild-reading-card]')
    const readingCard = await readingCardSurface.locator('p').first().boundingBox()
    expect(heading).not.toBeNull()
    expect(readingCard).not.toBeNull()
    if (width > 1279) {
      const state = await page.locator('[data-wild-state]').boundingBox()
      expect(state).not.toBeNull()
      expect(heading?.x).toBeGreaterThanOrEqual(state?.x!)
      expect(heading?.y).toBeGreaterThanOrEqual(state?.y!)
      const readingCardSurfaceBox = await readingCardSurface.boundingBox()
      expect(readingCardSurfaceBox).not.toBeNull()
      expect(heading?.y! + heading?.height!).toBeLessThanOrEqual(readingCardSurfaceBox?.y!)
      if (width >= 1400) {
        expect(readingCard?.y! + readingCard?.height!).toBeLessThanOrEqual(state?.y! + state?.height!)
      } else {
        const proof = await page.locator('[data-wild-proof]').boundingBox()
        expect(proof).not.toBeNull()
        expect(readingCardSurfaceBox?.y! + readingCardSurfaceBox?.height!).toBeGreaterThan(proof?.y! + proof?.height!)
      }
    } else {
      expect(heading?.y! + heading?.height!).toBeLessThanOrEqual(readingCard?.y!)
    }
  }
})

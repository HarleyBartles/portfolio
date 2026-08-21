import { expect, test } from '@playwright/test'


test('production typography is self-hosted and available without a font CDN', async ({ page }) => {
  const fontCdnRequests: string[] = []
  page.on('request', (request) => {
    if (/fonts\.(?:googleapis|gstatic)\.com/.test(request.url())) fontCdnRequests.push(request.url())
  })

  await page.goto('./')
  const fontState = await page.evaluate(async () => {
    await document.fonts.ready
    return {
      display: document.fonts.check('400 16px "Fraunces"'),
      body: document.fonts.check('400 16px "Source Serif 4"'),
      code: document.fonts.check('400 16px "Fira Code"'),
      fontOrigins: performance.getEntriesByType('resource')
        .map((entry) => new URL(entry.name).origin)
        .filter((origin, index, origins) => origins.indexOf(origin) === index),
    }
  })

  expect(fontCdnRequests).toEqual([])
  expect(fontState).toMatchObject({ display: true, body: true, code: true })
  expect(fontState.fontOrigins).toEqual([new URL(page.url()).origin])
})

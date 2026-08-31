import { expect, test } from '@playwright/test'

test('about page keeps its conversion heading and story rails structurally clear', async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 })
  await page.goto('./about/')

  const conversion = page.locator('[data-visual-contract="about-cv-conversion"]')
  const label = conversion.getByText('Next role', { exact: true })
  const heading = conversion.getByRole('heading', { name: "I'm looking for a senior full-stack role." })
  const [labelBox, headingBox] = await Promise.all([label.boundingBox(), heading.boundingBox()])

  expect(labelBox).not.toBeNull()
  expect(headingBox).not.toBeNull()
  expect(labelBox!.y + labelBox!.height).toBeLessThanOrEqual(headingBox!.y)

  const rails = page.locator('[data-professional-story-rail]')
  await expect(rails).toHaveCount(2)
  await expect(page.locator('[data-professional-rail="chronology"]')).toHaveCount(1)

  for (const rail of await rails.all()) {
    await expect(rail).toHaveCSS('border-top-width', '0px')
  }

  const pullQuote = page.locator('blockquote').filter({ hasText: 'No source capture, no success.' })
  await expect(pullQuote).toHaveAttribute('data-type-register', 'site-sans')
  const quoteType = await pullQuote.locator('p').evaluate((element) => {
    const style = getComputedStyle(element)
    return { family: style.fontFamily, size: Number.parseFloat(style.fontSize), style: style.fontStyle }
  })
  expect(quoteType.family).toContain('Source Sans 3')
  expect(quoteType.size).toBeGreaterThanOrEqual(24)
  expect(quoteType.size).toBeLessThan(32)
  expect(quoteType.style).toBe('normal')

  await expect(page.getByText("The round trip we didn't ship", { exact: true })).toHaveCount(0)
  await expect(page.locator('figure.about-route')).toHaveCount(1)
})

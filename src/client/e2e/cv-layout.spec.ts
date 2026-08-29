import { expect, test } from '@playwright/test'

test('the CV header owns the boundary before the opening profile section', async ({ page }) => {
  await page.goto('./cv/')

  const openingSection = page.locator('.cv-header + .cv-section')

  await expect(openingSection).toHaveCount(1)
  await expect(openingSection).toHaveCSS('border-top-width', '0px')
})

test('the CV availability line uses the available desktop header width', async ({ page }) => {
  await page.setViewportSize({ width: 980, height: 750 })
  await page.goto('./cv/')

  const availability = page.locator('.cv-header__details > p')
  const metrics = await availability.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      height: element.getBoundingClientRect().height,
      lineHeight: Number.parseFloat(style.lineHeight),
    }
  })

  expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight + 1)
})

test('the CV name owns a full desktop header row', async ({ page }) => {
  await page.setViewportSize({ width: 980, height: 750 })
  await page.goto('./cv/')

  const layout = await page.locator('.cv-header').evaluate((header) => {
    const name = header.querySelector('h1')
    const headline = header.querySelector('.cv-headline')
    const details = header.querySelector('.cv-header__details')
    if (name === null || headline === null || details === null) throw new Error('Expected CV header content')

    const nameStyle = getComputedStyle(name)
    return {
      nameHeight: name.getBoundingClientRect().height,
      nameLineHeight: Number.parseFloat(nameStyle.lineHeight),
      headlineTop: headline.getBoundingClientRect().top,
      detailsTop: details.getBoundingClientRect().top,
    }
  })

  expect(layout.nameHeight).toBeLessThanOrEqual(layout.nameLineHeight + 1)
  expect(Math.abs(layout.headlineTop - layout.detailsTop)).toBeLessThanOrEqual(1)
})

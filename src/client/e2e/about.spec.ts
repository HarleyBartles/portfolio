import { expect, test } from '@playwright/test'

test('visitor can reach the first-class Contact route from Home and About', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('link', { name: 'Tell me about it →' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Get in touch.' })).toBeVisible()

  await page.goto('./about/')
  await expect(page.getByRole('heading', { level: 1, name: /I still like writing code/ })).toBeVisible()
  const conversion = page.locator('[data-visual-contract="about-cv-conversion"]')
  await expect(conversion.getByRole('link', { name: 'Read the CV' })).toHaveAttribute('href', '/cv')
  const contact = conversion.getByRole('link', { name: 'Get in touch' })
  await contact.focus()
  await contact.press('Enter')

  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Get in touch.' })).toBeVisible()
})

test('About remains readable and contained across phone, tablet, and desktop widths', async ({ page }) => {
  await page.goto('./about/')

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 912 })
    await expect(page.getByRole('heading', { level: 1, name: /I still like writing code/ })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Get in touch' })).toBeVisible()
    expect(await page.locator('html').evaluate((element) => element.scrollWidth <= element.clientWidth),
      `About should not overflow horizontally at ${width}px`).toBe(true)
  }
})

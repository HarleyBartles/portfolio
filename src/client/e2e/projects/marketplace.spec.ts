import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow } from './support'

test('visitor opens the Marketplace project card and sees a stable, usable case study', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./projects/')

  let releaseVisual: (() => void) | undefined
  const visualReady = new Promise<void>((resolve) => { releaseVisual = resolve })
  await page.route('**/*ProjectVisual-*.js', async (route) => {
    const response = await route.fetch()
    await visualReady
    await route.fulfill({ response })
  })

  const openStory = page.getByRole('link', { name: 'Agent Asset Marketplace', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/codex-marketplace\/?$/)
  const header = page.locator('[data-visual-contract="marketplace-case-study-hero"]')
  const reservedVisual = header.locator('[data-loading="project-visual"]')
  await expect(reservedVisual).toBeVisible()
  const placeholder = await reservedVisual.boundingBox()
  expect(placeholder).not.toBeNull()
  expect(placeholder!.width / placeholder!.height).toBeCloseTo(5 / 3, 2)

  releaseVisual?.()
  await openStory
  await expect(header.getByRole('figure', { name: /Marketplace baseline plugins/i })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1, name: 'Agent Asset Marketplace' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Marketplace repository' })).toBeVisible()
  await expect(page.getByRole('figure', { name: /Selective distribution map/ })).toBeVisible()
  await expect(page.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()

  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [390, 360, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await expectNoHorizontalOverflow(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Agent Asset Marketplace' })).toBeVisible()
  }
})

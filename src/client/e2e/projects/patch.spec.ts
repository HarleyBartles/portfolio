import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow } from './support'

test('visitor follows Patch from its project card into the production story and an adventure', async ({ page }) => {
  await page.setViewportSize({ width: 688, height: 912 })
  await page.goto('./projects/')
  const projectArt = page.locator('[data-visual-contract="adventures-of-patch-index-whole-character"] img')
  await expect(projectArt).toBeVisible()
  await expect(projectArt).toHaveCSS('object-fit', 'contain')

  await page.getByRole('link', { name: 'Adventures of Patch', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/adventures-of-patch\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
  await expect(page.locator('.content-status')).toContainText(/active project/i)
  await expect(page.getByRole('link', { name: 'Open the public Adventures of Patch repository' }))
    .toHaveAttribute('href', /^https:\/\/github\.com\/HarleyBartles\/adventures-of-patch\/tree\/[0-9a-f]{40}$/)

  const flow = page.getByRole('list', { name: 'Patch production flow' })
  await expect(flow.locator(':scope > li > h3')).toHaveText([
    'Seed', 'Frame', 'Visual pre-production', 'Image generation and QA', 'Deterministic compilation', 'Published artefact and receipt',
  ])
  for (const stage of await flow.locator(':scope > li').all()) await expect(stage.getByText('Stop condition')).toBeVisible()

  const originStory = page.getByRole('heading', { level: 2, name: 'The day the database disappeared' })
  const productionStory = page.getByRole('heading', { level: 2, name: 'The production system is the project' })
  await expect(originStory).toBeAttached()
  await expect(productionStory).toBeAttached()
  const storyHeadings = await page.getByRole('heading', { level: 2 }).allTextContents()
  expect(storyHeadings.indexOf('The day the database disappeared')).toBeLessThan(
    storyHeadings.indexOf('The production system is the project'),
  )

  for (const image of await page.locator('.patch-case-study img:not([loading="eager"])').all()) {
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('width', /[1-9][0-9]*/)
    await expect(image).toHaveAttribute('height', /[1-9][0-9]*/)
  }

  await page.getByRole('link', { name: 'Explore the Adventures of Patch' }).click()
  await expect(page).toHaveURL(/\/patch\/?$/)
  const identityLink = page.getByRole('region', { name: 'Adventures' }).getByRole('link', { name: 'Identity Emporium', exact: true })
  await expect(identityLink).toBeVisible()
  await identityLink.click()
  await expect(page.getByRole('heading', { level: 1, name: 'Identity Emporium' })).toBeVisible()
  await expect(page.getByRole('figure', { name: /Identity Emporium compares three approaches to preparation/i })).toBeVisible()
})

test('Patch reserves its portrait hero while loading and keeps it in frame across the breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 862 })
  await page.goto('./projects/')
  let releaseVisual: (() => void) | undefined
  const visualReady = new Promise<void>((resolve) => { releaseVisual = resolve })
  await page.route('**/*ProjectVisual-*.js', async (route) => {
    const response = await route.fetch()
    await visualReady
    await route.fulfill({ response })
  })

  const openStory = page.getByRole('link', { name: 'Adventures of Patch', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/adventures-of-patch\/?$/)
  const hero = page.locator('[data-visual-contract="patch-case-study-hero"]')
  const intro = hero.locator('[data-project-case-study-intro]')
  const visual = hero.locator('[data-project-case-study-visual]')
  const status = hero.locator('[data-project-case-study-status]')
  await expect(page.locator('[data-loading="project-visual"]')).toBeVisible()
  const pending = await hero.evaluate((element) => {
    const rect = (selector: string) => element.querySelector(selector)!.getBoundingClientRect()
    return {
      height: element.getBoundingClientRect().height,
      intro: rect('[data-project-case-study-intro]'),
      visual: rect('[data-project-case-study-visual]'),
      status: rect('[data-project-case-study-status]'),
    }
  })
  expect(pending.visual.width / (await hero.boundingBox())!.width).toBeCloseTo(0.5, 1)

  releaseVisual?.()
  await openStory
  const image = visual.getByRole('img', { name: /Patch carries an index card and folded map/i })
  await expect(image).toBeVisible()
  await expect(image).toHaveAttribute('loading', 'eager')
  await expect(image).toHaveAttribute('fetchpriority', 'high')
  await expect(image).toHaveAttribute('width', /[1-9][0-9]*/)
  await expect(image).toHaveAttribute('height', /[1-9][0-9]*/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const resolvedHeight = await hero.evaluate((element) => element.getBoundingClientRect().height)
  expect(Math.abs(resolvedHeight - pending.height)).toBeLessThanOrEqual(1)

  for (const width of [705, 704, 390, 320]) {
    await page.setViewportSize({ width, height: 862 })
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.evaluate(async () => {
      await document.fonts.ready
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    })
    await expectNoHorizontalOverflow(page)
    const [introBox, visualBox, statusBox, imageBox] = await Promise.all([
      intro.boundingBox(), visual.boundingBox(), status.boundingBox(), image.boundingBox(),
    ])
    const boxes = [introBox, visualBox, statusBox, imageBox]
    expect(boxes.every((box) => box !== null)).toBe(true)
    if (width <= 704) {
      expect(introBox!.y + introBox!.height, `intro precedes image at ${width}px`).toBeLessThanOrEqual(imageBox!.y)
      expect(imageBox!.y + imageBox!.height, `image precedes status at ${width}px`).toBeLessThanOrEqual(statusBox!.y)
    } else {
      expect(await visual.evaluate((element) => {
        const imageBounds = element.querySelector('img')!.getBoundingClientRect()
        const frameBounds = element.getBoundingClientRect()
        return imageBounds.left >= frameBounds.left
          && imageBounds.right <= frameBounds.right
          && imageBounds.top >= frameBounds.top
          && imageBounds.bottom <= frameBounds.bottom
      })).toBe(true)
    }
    await expect(image).toBeVisible()
  }
})

test('Patch index, Identity Emporium, and Tournament reflow without horizontal overflow', async ({ page }) => {
  const columnCount = async (selector: string) => page.locator(selector).first().evaluate((element) =>
    getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).filter(Boolean).length,
  )

  for (const width of [768, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('./patch')
    await expect(page.locator('[data-visual-contract="patch-index"]')).toBeVisible()
    expect(await columnCount('.patch-index__header')).toBe(1)
    expect(await columnCount('.patch-index__character-intro')).toBe(1)
    expect(await columnCount('.patch-index__lead-adventure')).toBe(1)
    await expectNoHorizontalOverflow(page)

    await page.goto('./patch/identity-emporium')
    await expect(page.locator('[data-visual-contract="patch-identity-emporium"]')).toBeVisible()
    expect(await columnCount('.identity-evidence__logic')).toBe(width === 768 ? 3 : 1)
    expect(await columnCount('.identity-evidence__roles')).toBe(width === 768 ? 4 : 2)
    await expectNoHorizontalOverflow(page)

    await page.goto('./patch/tournament-of-reasonable-defaults')
    await expect(page.locator('[data-visual-contract="patch-tournament"]')).toBeVisible()
    expect(await columnCount('.tournament-event__header')).toBe(width === 768 ? 2 : 1)
    await expectNoHorizontalOverflow(page)
  }
})

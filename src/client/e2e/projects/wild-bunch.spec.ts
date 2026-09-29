import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow, tabToLink, wildBunchPath } from './support'

test('visitor inspects Wild Bunch evidence, then uses the story on a narrow screen', async ({ page }) => {
  let releaseVisual: (() => void) | undefined
  const visualReady = new Promise<void>((resolve) => { releaseVisual = resolve })
  await page.route('**/*ProjectVisual-*.js', async (route) => {
    const response = await route.fetch()
    await visualReady
    await route.fulfill({ response })
  })

  const navigation = page.goto(wildBunchPath)
  const header = page.locator('[data-visual-contract="wild-bunch-case-study-hero"]')
  await expect(header).toBeVisible()
  await expect(page.locator('[data-loading="project-visual"]')).toBeVisible()
  const pendingGeometry = await header.evaluate((element) => {
    const style = getComputedStyle(element)
    const intro = element.querySelector('[data-project-case-study-intro]')
    return {
      display: style.display,
      borderBottomWidth: style.borderBottomWidth,
      paddingBottom: style.paddingBottom,
      introPosition: intro === null ? null : getComputedStyle(intro).position,
    }
  })
  expect(pendingGeometry).toEqual({ display: 'block', borderBottomWidth: '0px', paddingBottom: '0px', introPosition: 'absolute' })

  releaseVisual?.()
  const response = await navigation
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeVisible()
  await expect(page.locator('.content-status')).toContainText(/pre-alpha/i)
  await expect(page.getByText(/wrong name on the crime: yours/i)).toBeVisible()

  const visual = page.getByLabel('Wild Bunch early-alpha town-arrival concept art')
  const caption = visual.locator('figcaption')
  await expect(visual.getByRole('img')).toBeVisible()
  await expect(caption).toHaveText('Concept art / early-alpha visual direction')
  const [visualBox, captionBox] = await Promise.all([visual.boundingBox(), caption.boundingBox()])
  expect(visualBox).not.toBeNull()
  expect(captionBox).not.toBeNull()
  expect(captionBox!.width).toBeLessThan(visualBox!.width / 2)
  expect(captionBox!.x).toBeGreaterThan(visualBox!.x + visualBox!.width / 2)

  const repository = page.getByRole('link', { name: 'Wild Bunch source snapshot (pinned revision)' })
  const history = page.getByRole('link', { name: 'Historical Wild Bunch archive' })
  const replay = page.getByRole('link', { name: 'Pinned replay-equality evidence' })
  const runGame = page.getByRole('link', { name: 'Clone and run Wild Bunch' })
  await expect(repository).toHaveAttribute('href', /^https:\/\/github\.com\/HarleyBartles\/wild-bunch\/tree\/[0-9a-f]{40}$/)
  await expect(history).toHaveAttribute('href', /worldofspectrum\.org/)
  await expect(replay).toHaveAttribute('href', /^https:\/\/github\.com\/HarleyBartles\/wild-bunch\/blob\/[0-9a-f]{40}\//)
  await expect(runGame).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch#run-the-pre-alpha-locally')
  for (const linkName of [
    'Historical Wild Bunch archive (opens in a new tab)',
    'Pinned replay-equality evidence (opens in a new tab)',
    'Wild Bunch source snapshot (pinned revision) (opens in a new tab)',
  ]) {
    await tabToLink(page, linkName)
    await expect(page.getByRole('link', { name: linkName })).toBeFocused()
  }
  await expect(page.getByRole('figure', { name: 'Generated trail-map development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Wanted-notice development-build evidence' })).toBeVisible()
  await expect(page.getByRole('figure', { name: 'Case-file development-build evidence' })).toBeVisible()

  const heroImage = visual.getByRole('img')
  await expect(heroImage).toHaveAttribute('loading', 'eager')
  await expect(heroImage).toHaveAttribute('fetchpriority', 'high')
  await expect(heroImage).toHaveAttribute('width', /[1-9][0-9]*/)
  await expect(heroImage).toHaveAttribute('height', /[1-9][0-9]*/)
  for (const capture of await page.locator('.wild-bunch-evidence img').all()) {
    await expect(capture).toHaveAttribute('loading', 'lazy')
    await expect(capture).toHaveAttribute('width', /[1-9][0-9]*/)
    await expect(capture).toHaveAttribute('height', /[1-9][0-9]*/)
  }

  await page.setViewportSize({ width: 1086, height: 912 })
  const lead = page.locator('[data-story-movement="origin"] [data-case-study-section-layout="lead"]')
  const leadBody = lead.locator('[data-case-study-section-body]')
  const [leadBounds, bodyBounds] = await Promise.all([lead.boundingBox(), leadBody.boundingBox()])
  expect(leadBounds).not.toBeNull()
  expect(bodyBounds).not.toBeNull()
  expect(leadBounds!.width).toBeGreaterThan(800)
  expect(bodyBounds!.width).toBeGreaterThan(400)

  const uuid = page.locator('.wild-bunch-codec-map__uuid')
  await expect(uuid).toHaveText('00000000-0000-0000-0000-00012ed0a54e')
  for (const [width, expectedLines] of [[1128, 1], [686, 1], [510, 1], [390, 2], [320, 2]] as const) {
    await page.setViewportSize({ width, height: 844 })
    const layout = await uuid.evaluate((element) => {
      const halves = [...element.children].map((half) => half.getBoundingClientRect())
      return {
        lineCount: new Set(halves.map(({ y }) => Math.round(y))).size,
        lineWidthDifference: Math.abs(halves[0].width - halves[1].width),
        fitsWithoutScrolling: element.scrollWidth <= element.clientWidth,
      }
    })
    expect(layout.lineCount, `UUID line count at ${width}px`).toBe(expectedLines)
    expect(layout.fitsWithoutScrolling, `UUID fits at ${width}px`).toBe(true)
    if (expectedLines === 2) expect(layout.lineWidthDifference).toBeLessThan(20)
    if (width <= 390) {
      const { imageBox, statusBox, mobileCaption } = await visual.evaluate((figure) => {
        const image = figure.querySelector('img')
        const caption = figure.querySelector('figcaption')
        const status = document.querySelector('[data-project-case-study-status] .content-status')
        const rect = (element: Element | null) => {
          if (element === null) return null
          const { x, y, width: boxWidth, height } = element.getBoundingClientRect()
          return { x, y, width: boxWidth, height }
        }
        return { imageBox: rect(image), statusBox: rect(status), mobileCaption: rect(caption) }
      })
      expect(statusBox).not.toBeNull()
      expect(imageBox).not.toBeNull()
      expect(mobileCaption).not.toBeNull()
      expect(statusBox!.y + statusBox!.height).toBeLessThanOrEqual(imageBox!.y)
      expect(mobileCaption!.y).toBeGreaterThanOrEqual(imageBox!.y + imageBox!.height)
      expect(mobileCaption!.width).toBeLessThan(imageBox!.width)
      await expectNoHorizontalOverflow(page)
    }
  }

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 844 })
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible()
  await expectNoHorizontalOverflow(page)
})

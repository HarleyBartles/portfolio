import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import routeCatalogue from '../src/data/routes/route-metadata.generated.json' with { type: 'json' }


const routes = [
  { name: 'home', path: './' },
  { name: 'projects', path: 'projects' },
  { name: 'project story', path: 'projects/adventures-of-patch' },
  { name: 'Tournament adventure', path: 'patch/tournament-of-reasonable-defaults' },
  { name: 'Lawful Heist adventure', path: 'patch/lawful-heist' },
  { name: 'Wild Bunch case study', path: 'projects/wild-bunch' },
  { name: 'Agentic Learning Lab', path: 'projects/agentic-learning-lab' },
  { name: 'writing', path: 'writing' },
  { name: 'article', path: 'writing/agentic-engineering-vs-vibe-coding' },
  { name: 'fairytale', path: 'fairytales/goldilocks' },
  { name: 'about', path: 'about' },
  { name: 'CV', path: 'cv' },
  { name: 'unknown route', path: 'not-a-real-route' },
] as const

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
] as const

const decorativeImageSelectors = [
  '.site-mark > img',
  '.marketplace-map__plugins img',
  '[aria-hidden="true"] img',
  '.stamp-overprint img',
] as const

function toTestPath(path: string): string {
  return path === '/' ? './' : path.replace(/^\//, '')
}

async function expectIntentionalImageAlternatives(page: Page): Promise<void> {
  const images = await page.locator('img').evaluateAll((elements, decorativeSelectors) =>
    elements.map((element) => ({
      alt: element.getAttribute('alt'),
      decorativeContract: decorativeSelectors.some((selector) => element.matches(selector)),
      src: element.getAttribute('src'),
    })), decorativeImageSelectors)

  expect(
    images.filter((image) => image.alt === null).map((image) => image.src),
    'Every rendered image must declare an alt attribute.',
  ).toEqual([])
  expect(
    images
      .filter((image) => image.alt !== null && image.alt.trim() === '' && !image.decorativeContract)
      .map((image) => image.src),
    'Only explicitly identified decorative images may use empty alt text.',
  ).toEqual([])
  expect(
    images
      .filter((image) => image.decorativeContract && image.alt !== '')
      .map((image) => image.src),
    'Decorative images must remain silent to screen readers.',
  ).toEqual([])
}

async function expectNoAutomatedViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(
    results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.flatMap((node) => node.target),
    })),
  ).toEqual([])
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} WCAG 2.2 AA`, () => {
    test.use({ viewport })

    for (const route of routes) {
      test(`${route.name} has no automated A or AA violations`, async ({ page }) => {
        await page.goto(route.path)
        const pageHeading = page.locator('main h1').first()
        await expect(pageHeading).toBeVisible()
        await expect(page.locator('[data-route-loading]')).toHaveCount(0)
        await expect(page.locator('[data-loading="specialist-presentation"]')).toHaveCount(0)
        await expect(pageHeading).toBeVisible()
        await page.evaluate(() => document.fonts.ready)

        await expectNoAutomatedViolations(page)
      })
    }
  })
}

test.describe('site-wide image alternatives', () => {
  test.use({ viewport: viewports[0] })

  for (const route of routeCatalogue) {
    test(`${route.id} gives every image an intentional text alternative`, async ({ page }) => {
      await page.goto(toTestPath(route.path))
      const pageHeading = page.locator('main h1').first()
      await expect(pageHeading).toBeVisible()
      await expect(page.locator('[data-route-loading]')).toHaveCount(0)
      await expect(page.locator('[data-loading="specialist-presentation"]')).toHaveCount(0)

      await expectIntentionalImageAlternatives(page)
    })
  }
})

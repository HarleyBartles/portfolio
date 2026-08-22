import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { homeFeatureCatalog } from '../src/features/home/featureCatalog'


const routes = [
  { name: 'home', path: './' },
  { name: 'projects', path: 'projects' },
  { name: 'project story', path: 'projects/adventures-of-patch' },
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
        await expect(pageHeading).toBeVisible()
        await page.evaluate(() => document.fonts.ready)

        const featureVisits = route.name === 'home' ? homeFeatureCatalog.length : 1
        for (let featureIndex = 0; featureIndex < featureVisits; featureIndex += 1) {
          await expectNoAutomatedViolations(page)
          if (featureIndex === featureVisits - 1) continue

          const featureRegion = page.locator('[data-visual-contract="homepage-feature-deck"]')
          await expect(featureRegion).toHaveAccessibleName(/\S/)
          const leadHeading = featureRegion.getByRole('heading', { level: 2 }).nth(1)
          const currentLead = await leadHeading.textContent()
          await featureRegion.getByRole('button', { name: 'Next feature' }).click()
          await expect(leadHeading).not.toHaveText(currentLead ?? '')
        }
      })
    }
  })
}

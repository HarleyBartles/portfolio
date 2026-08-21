import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { homeFeatureCatalog } from '../src/features/home/featureCatalog'


const routes = [
  { name: 'home', path: './', readyHeading: 'Harley Bartles', readyLevel: 1 },
  { name: 'projects', path: 'projects', readyHeading: 'Agent Asset Marketplace', readyLevel: 2 },
  { name: 'project story', path: 'projects/adventures-of-patch', readyHeading: 'Adventures of Patch', readyLevel: 1 },
  { name: 'writing', path: 'writing', readyHeading: 'Agentic engineering and the kindness of vibe coding', readyLevel: 2 },
  { name: 'article', path: 'writing/agentic-engineering-vs-vibe-coding', readyHeading: 'Agentic engineering and the kindness of vibe coding', readyLevel: 1 },
  { name: 'fairytale', path: 'fairytales/goldilocks', readyHeading: 'Goldilocks — The Right Amount of Guidance', readyLevel: 1 },
  { name: 'about', path: 'about', readyHeading: 'This is the part where I ask you to hire me.', readyLevel: 1 },
  { name: 'unknown route', path: 'not-a-real-route', readyHeading: 'Page not found', readyLevel: 1 },
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
        await expect(page.getByRole('heading', { level: route.readyLevel, name: route.readyHeading })).toBeVisible()
        await page.evaluate(() => document.fonts.ready)

        const featureVisits = route.name === 'home' ? homeFeatureCatalog.length : 1
        for (let featureIndex = 0; featureIndex < featureVisits; featureIndex += 1) {
          await expectNoAutomatedViolations(page)
          if (featureIndex === featureVisits - 1) continue

          const featureRegion = page.getByRole('region', { name: 'Work worth bringing forward' })
          const leadHeading = featureRegion.getByRole('heading', { level: 2 }).nth(1)
          const currentLead = await leadHeading.textContent()
          await featureRegion.getByRole('button', { name: 'Next feature' }).click()
          await expect(leadHeading).not.toHaveText(currentLead ?? '')
        }
      })
    }
  })
}

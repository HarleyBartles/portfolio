import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'


const routes = [
  { name: 'home', path: './' },
  { name: 'projects', path: 'projects' },
  { name: 'project story', path: 'projects/adventures-of-patch' },
  { name: 'writing', path: 'writing' },
  { name: 'article', path: 'writing/agentic-engineering-vs-vibe-coding' },
  { name: 'fairytale', path: 'fairytales/goldilocks' },
  { name: 'about', path: 'about' },
  { name: 'unknown route', path: 'not-a-real-route' },
] as const

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
] as const

for (const viewport of viewports) {
  test.describe(`${viewport.name} WCAG 2.2 AA`, () => {
    test.use({ viewport })

    for (const route of routes) {
      test(`${route.name} has no automated A or AA violations`, async ({ page }) => {
        await page.goto(route.path)
        await page.evaluate(() => document.fonts.ready)

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
      })
    }
  })
}

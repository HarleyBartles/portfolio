import { expect, test } from '@playwright/test'

test('external links declare a new browsing context while internal links stay in place', async ({ page, request }) => {
  const sitemapResponse = await request.get('sitemap.xml')
  expect(sitemapResponse.ok()).toBe(true)
  const sitemap = await sitemapResponse.text()
  const routes = Array.from(sitemap.matchAll(/<loc>[^<]+\/portfolio(?<route>\/[^<]*)<\/loc>/g))
    .map((match) => match.groups?.route ?? '/')

  expect(routes.length).toBeGreaterThan(0)

  for (const route of routes) {
    await page.goto(route === '/' ? './' : `.${route}`)
    const pageOrigin = new URL(page.url()).origin
    const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => {
      const element = anchor as HTMLAnchorElement
      return {
        accessibleAnnouncement: element.getAttribute('aria-label')?.includes('opens in a new tab') === true
          || element.querySelector('.visually-hidden')?.textContent?.includes('opens in a new tab') === true,
        hasIcon: element.querySelector('.external-link__icon') !== null,
        href: element.href,
        rel: element.rel,
        target: element.target,
      }
    }))

    for (const link of links) {
      const destination = new URL(link.href)
      const isExternalSite = ['http:', 'https:'].includes(destination.protocol) && destination.origin !== pageOrigin

      if (isExternalSite) {
        expect(link, `${route}: ${link.href}`).toMatchObject({
          accessibleAnnouncement: true,
          hasIcon: true,
          target: '_blank',
        })
        expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
      } else {
        expect(link.target, `${route}: ${link.href}`).not.toBe('_blank')
        expect(link.hasIcon, `${route}: ${link.href}`).toBe(false)
      }
    }
  }
})

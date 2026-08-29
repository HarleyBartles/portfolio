import { expect, test } from '@playwright/test'

test('external links declare a new browsing context while internal links stay in place', async ({ page, request }) => {
  const sitemapResponse = await request.get('sitemap.xml')
  expect(sitemapResponse.ok()).toBe(true)
  const sitemap = await sitemapResponse.text()
  const publicUrls = Array.from(sitemap.matchAll(/<loc>(?<url>[^<]+)<\/loc>/g))
    .map((match) => new URL(match.groups?.url ?? ''))

  expect(publicUrls.length).toBeGreaterThan(0)
  const publicOrigin = publicUrls[0].origin

  for (const { pathname: route } of publicUrls) {
    await page.goto(route)
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
      const isExternalSite = ['http:', 'https:'].includes(destination.protocol)
        && ![pageOrigin, publicOrigin].includes(destination.origin)

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

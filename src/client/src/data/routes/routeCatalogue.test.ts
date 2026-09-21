import { matchRoutes } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { appRoutes } from '../../app/router'
import { getProjectPresentation } from '../../features/case-study/projectPresentations'
import { getContentPath, type ContentSummary } from '../../types'
import manifest from '../content/content-manifest.json'
import { navigation } from '../documents'
import contentRouteRoots from './content-route-roots.json'
import { getRouteMetadata } from './routeCatalogue'

const hasRuntimeBodyOwner = (item: Pick<ContentSummary, 'kind' | 'slug'>): boolean => {
  if (getProjectPresentation(item.slug) !== undefined) {
    return true
  }

  const matches = matchRoutes(appRoutes, getContentPath(item))
  const leafPath = matches?.at(-1)?.route.path
  return typeof leafPath === 'string' && !leafPath.includes(':') && leafPath !== '*'
}

describe('resolved route catalogue', () => {
  test('gives a writing route one shareable article identity', () => {
    expect(getRouteMetadata('/writing/why-adrs')).toMatchObject({
      id: 'writing:why-adrs',
      kind: 'writing',
      openGraphType: 'article',
      shareAction: 'content-end',
      socialImage: {
        path: '/brand/social-card.png',
        width: 1200,
        height: 630,
        mimeType: 'image/png',
      },
    })
  })

  test('does not turn an unknown route into a canonical public claim', () => {
    expect(getRouteMetadata('/does-not-exist')).toBeUndefined()
  })

  test('does not admit the unlinked Specialists preview into the public route catalogue', () => {
    expect(getRouteMetadata('/patch/the-usual-specialists/next')).toBeUndefined()
    expect(getRouteMetadata('/patch/the-usual-specialists/next/')).toBeUndefined()
  })

  test('uses one route-root source for content URLs and generated metadata', () => {
    for (const item of navigation.filter((candidate) => candidate.kind in contentRouteRoots)) {
      const path = getContentPath(item)
      expect(path.startsWith(contentRouteRoots[item.kind as keyof typeof contentRouteRoots])).toBe(true)
      expect(getRouteMetadata(path)?.path).toBe(path)
    }
  })

  test('keeps every pathless generated content item tied to a runtime body owner', () => {
    const pathlessItems = manifest.items.filter((item) => !('path' in item))
    const unownedSlugs = pathlessItems
      .filter((item) => !hasRuntimeBodyOwner(item as Pick<ContentSummary, 'kind' | 'slug'>))
      .map((item) => item.slug)

    expect(unownedSlugs).toEqual([])
  })

  test('does not mistake a generic content route for body ownership', () => {
    expect(hasRuntimeBodyOwner({ kind: 'patch', slug: 'unregistered-pathless-content' })).toBe(false)
  })
})

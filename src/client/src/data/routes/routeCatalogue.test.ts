import { describe, expect, test } from 'vitest'
import { navigation } from '../documents'
import { getContentPath } from '../../types'
import contentRouteRoots from './content-route-roots.json'
import { getRouteMetadata } from './routeCatalogue'

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
})

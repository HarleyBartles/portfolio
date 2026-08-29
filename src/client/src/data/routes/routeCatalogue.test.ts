import { describe, expect, test } from 'vitest'
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
})

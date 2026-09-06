import { describe, expect, test } from 'vitest'
import {
  activeSiteProfile,
  buildPublicUrl,
  buildPublicAssetUrl,
} from './siteProfile'

describe('site deployment profile', () => {
  test('makes the custom domain the active canonical identity without a project path', () => {
    expect(activeSiteProfile).toEqual({
      canonicalOrigin: 'https://harleybartles.com',
      basePath: '/',
    })
    expect(buildPublicUrl('/')).toBe('https://harleybartles.com')
    expect(buildPublicUrl('/writing/why-adrs')).toBe('https://harleybartles.com/writing/why-adrs')
    expect(buildPublicAssetUrl('/brand/social-card.png')).toBe(
      'https://harleybartles.com/brand/social-card.png',
    )
  })

  test('keeps the GitHub Pages profile available for an explicit rebuild rollback', () => {
    expect(buildPublicUrl('/writing/why-adrs', 'github-pages-fallback')).toBe(
      'https://harleybartles.github.io/portfolio/writing/why-adrs',
    )
    expect(buildPublicUrl('/', 'github-pages-fallback')).toBe(
      'https://harleybartles.github.io/portfolio/',
    )
  })
})

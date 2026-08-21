import { describe, expect, it } from 'vitest'
import { navigation } from '../../data/documents'
import { buildHomeFeatures, homeFeatureCatalog } from './featureCatalog'


describe('homeFeatureCatalog', () => {
  it('uses unique manifest-backed slugs with exactly one Patch visual', () => {
    const slugs = homeFeatureCatalog.map((feature) => feature.slug)
    const manifestSlugs = new Set(navigation.map((item) => item.slug))

    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.every((slug) => manifestSlugs.has(slug))).toBe(true)
    expect(homeFeatureCatalog.filter((feature) => feature.visual === 'adventures-of-patch')).toHaveLength(1)
  })

  it('builds every curated feature from manifest evidence', () => {
    const features = buildHomeFeatures(navigation)

    expect(features).toHaveLength(homeFeatureCatalog.length)
    expect(features.every((feature) => feature.summary.length > 0 && feature.to.startsWith('/'))).toBe(true)
  })
})

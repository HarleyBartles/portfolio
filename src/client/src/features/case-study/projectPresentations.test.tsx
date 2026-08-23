import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { getProjectPresentation } from './projectPresentations'

describe('project presentations', () => {
  test('resolves the Marketplace specialist body and rejects unknown presentations', async () => {
    const MarketplaceCaseStudy = getProjectPresentation('marketplace-case-study')

    expect(MarketplaceCaseStudy).toBeDefined()
    expect(getProjectPresentation('not-a-presentation')).toBeUndefined()
    if (MarketplaceCaseStudy === undefined) {
      throw new Error('Marketplace presentation should be registered')
    }

    render(<Suspense fallback={null}><MarketplaceCaseStudy /></Suspense>)
    expect(await screen.findByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
  })
})

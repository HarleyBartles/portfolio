import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { getProjectPresentation } from './projectPresentations'

describe('project presentations', () => {
  test('resolves specialist bodies and rejects unknown presentations', async () => {
    const MarketplaceCaseStudy = getProjectPresentation('marketplace-case-study')
    const WildBunchCaseStudy = getProjectPresentation('wild-bunch-case-study')

    expect(MarketplaceCaseStudy).toBeDefined()
    expect(WildBunchCaseStudy).toBeDefined()
    expect(getProjectPresentation('not-a-presentation')).toBeUndefined()
    if (MarketplaceCaseStudy === undefined || WildBunchCaseStudy === undefined) {
      throw new Error('Specialist project presentations should be registered')
    }

    render(<Suspense fallback={null}><MarketplaceCaseStudy /></Suspense>)
    expect(await screen.findByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()

    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><Suspense fallback={null}><WildBunchCaseStudy /></Suspense></MemoryRouter>)
    expect(await screen.findByText('Every complexity pays rent.')).toBeVisible()
    expect(await screen.findByRole('heading', { level: 2, name: 'The game I wanted to return to' })).toBeVisible()
  })
})

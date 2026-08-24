import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { getProjectPresentation } from './projectPresentations'

describe('project presentations', () => {
  test('resolves specialist bodies and rejects unknown presentations', async () => {
    const MarketplaceCaseStudy = getProjectPresentation('marketplace-case-study')
    const WildBunchCaseStudy = getProjectPresentation('wild-bunch-case-study')
    const PatchPipelineCaseStudy = getProjectPresentation('patch-pipeline-case-study')
    const LawfulHeistPage = getProjectPresentation('patch-lawful-heist')

    expect(MarketplaceCaseStudy).toBeDefined()
    expect(WildBunchCaseStudy).toBeDefined()
    expect(PatchPipelineCaseStudy).toBeDefined()
    expect(LawfulHeistPage).toBeDefined()
    expect(getProjectPresentation('not-a-presentation')).toBeUndefined()
    if (MarketplaceCaseStudy === undefined || WildBunchCaseStudy === undefined || PatchPipelineCaseStudy === undefined || LawfulHeistPage === undefined) {
      throw new Error('Specialist project presentations should be registered')
    }

    render(<Suspense fallback={null}><MarketplaceCaseStudy /></Suspense>)
    expect(await screen.findByText('Shared where reuse earns it. Local where context matters.', undefined, { timeout: 5_000 })).toBeVisible()

    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><Suspense fallback={null}><WildBunchCaseStudy /></Suspense></MemoryRouter>)
    expect(await screen.findByText(/wrong name on the crime: yours/i, undefined, { timeout: 5_000 })).toBeVisible()
    expect(await screen.findByRole('heading', { level: 2, name: 'The game I wanted to return to' }, { timeout: 5_000 })).toBeVisible()

    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/adventures-of-patch']}><Suspense fallback={null}><PatchPipelineCaseStudy /></Suspense></MemoryRouter>)
    expect(await screen.findByRole('heading', { level: 2, name: 'The day the database disappeared' }, { timeout: 5_000 })).toBeVisible()

    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/lawful-heist']}><Suspense fallback={null}><LawfulHeistPage /></Suspense></MemoryRouter>)
    expect(await screen.findByRole('heading', { level: 2, name: 'Index' }, { timeout: 5_000 })).toBeVisible()
  })
})

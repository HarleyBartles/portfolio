import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { getProjectPresentation } from './projectPresentations'

describe('project presentations', () => {
  test('resolves specialist bodies and rejects unknown presentations', async () => {
    const MarketplaceCaseStudy = getProjectPresentation('marketplace-case-study')
    const WildBunchCaseStudy = getProjectPresentation('wild-bunch-case-study')
    const PatchPipelineCaseStudy = getProjectPresentation('patch-pipeline-case-study')
    const LawfulHeistPage = getProjectPresentation('patch-lawful-heist')
    const LearningLabCaseStudy = getProjectPresentation('learning-lab-case-study')

    expect(MarketplaceCaseStudy).toBeDefined()
    expect(WildBunchCaseStudy).toBeDefined()
    expect(PatchPipelineCaseStudy).toBeDefined()
    expect(LawfulHeistPage).toBeDefined()
    expect(LearningLabCaseStudy).toBeDefined()
    expect(getProjectPresentation('not-a-presentation')).toBeUndefined()
    if (MarketplaceCaseStudy === undefined || WildBunchCaseStudy === undefined || PatchPipelineCaseStudy === undefined || LawfulHeistPage === undefined || LearningLabCaseStudy === undefined) {
      throw new Error('Specialist project presentations should be registered')
    }

    render(<PortfolioThemeProvider><Suspense fallback={null}><MarketplaceCaseStudy /></Suspense></PortfolioThemeProvider>)
    expect(await screen.findByText('Shared where reuse earns it. Local where context matters.', undefined, { timeout: 5_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><Suspense fallback={null}><WildBunchCaseStudy /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    expect(await screen.findByText(/wrong name on the crime: yours/i, undefined, { timeout: 5_000 })).toBeVisible()
    expect(await screen.findByRole('heading', { level: 2, name: 'The game I wanted to return to' }, { timeout: 5_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/adventures-of-patch']}><Suspense fallback={null}><PatchPipelineCaseStudy /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    expect(await screen.findByRole('heading', { level: 2, name: 'The day the database disappeared' }, { timeout: 5_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/lawful-heist']}><Suspense fallback={null}><LawfulHeistPage /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    expect(await screen.findByRole('heading', { level: 2, name: 'Index' }, { timeout: 5_000 })).toBeVisible()

    render(<PortfolioThemeProvider><Suspense fallback={null}><LearningLabCaseStudy /></Suspense></PortfolioThemeProvider>)
    expect(await screen.findByRole('heading', { level: 2, name: 'Experience made transferable' }, { timeout: 5_000 })).toBeVisible()
  }, 15_000)
})

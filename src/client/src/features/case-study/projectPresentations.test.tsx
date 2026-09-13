import { Suspense } from 'react'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { getProjectPresentation } from './projectPresentations'

describe('project presentations', () => {
  test('resolves specialist bodies and rejects unknown presentations', async () => {
    const MarketplaceCaseStudy = getProjectPresentation('marketplace-case-study')
    const WildBunchCaseStudy = getProjectPresentation('wild-bunch-case-study')
    const PatchPipelineCaseStudy = getProjectPresentation('patch-pipeline-case-study')
    const LegacyUsualSpecialistsPage = getProjectPresentation('patch-usual-specialists')
    const LearningLabCaseStudy = getProjectPresentation('learning-lab-case-study')

    expect(MarketplaceCaseStudy).toBeDefined()
    expect(WildBunchCaseStudy).toBeDefined()
    expect(PatchPipelineCaseStudy).toBeDefined()
    expect(LegacyUsualSpecialistsPage).toBeDefined()
    expect(LearningLabCaseStudy).toBeDefined()
    expect(getProjectPresentation('not-a-presentation')).toBeUndefined()
    if (MarketplaceCaseStudy === undefined || WildBunchCaseStudy === undefined || PatchPipelineCaseStudy === undefined || LegacyUsualSpecialistsPage === undefined || LearningLabCaseStudy === undefined) {
      throw new Error('Specialist project presentations should be registered')
    }

    render(<PortfolioThemeProvider><Suspense fallback={null}><MarketplaceCaseStudy /></Suspense></PortfolioThemeProvider>)
    expect(await screen.findByText('Shared where reuse earns it. Local where context matters.', undefined, { timeout: 15_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><Suspense fallback={null}><WildBunchCaseStudy /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    expect(await screen.findByText(/wrong name on the crime: yours/i, undefined, { timeout: 15_000 })).toBeVisible()
    expect(await screen.findByRole('heading', { level: 2, name: 'The game I wanted to return to' }, { timeout: 15_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/adventures-of-patch']}><Suspense fallback={null}><PatchPipelineCaseStudy /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    expect(await screen.findByRole('heading', { level: 2, name: 'The day the database disappeared' }, { timeout: 15_000 })).toBeVisible()

    render(<PortfolioThemeProvider><MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}><Suspense fallback={null}><LegacyUsualSpecialistsPage /></Suspense></MemoryRouter></PortfolioThemeProvider>)
    const story = await screen.findByRole('region', { name: 'The Usual Specialists adventure' }, { timeout: 15_000 })
    expect(within(story).getAllByRole('article')).toHaveLength(6)

    render(<PortfolioThemeProvider><Suspense fallback={null}><LearningLabCaseStudy /></Suspense></PortfolioThemeProvider>)
    expect(await screen.findByRole('heading', { level: 2, name: 'Experience made transferable' }, { timeout: 15_000 })).toBeVisible()
  }, 30_000)
})

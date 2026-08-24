import { Suspense } from 'react'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { getProjectPresentation } from '../case-study/projectPresentations'

describe('Lawful Heist crew story', () => {
  test('recruits six specialists in the approved functional order', async () => {
    const LawfulHeistPage = getProjectPresentation('patch-lawful-heist')

    expect(LawfulHeistPage).toBeDefined()
    if (LawfulHeistPage === undefined) throw new Error('Lawful Heist presentation should be registered')

    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/lawful-heist']}>
        <Suspense fallback={null}><LawfulHeistPage /></Suspense>
      </MemoryRouter>,
    )

    const story = await screen.findByRole('region', { name: 'The Lawful Heist Crew adventure' })
    const profiles = within(story).getAllByRole('article')
    expect(profiles).toHaveLength(6)
    expect(profiles.map((profile) => within(profile).getByRole('heading', { level: 2 }).textContent)).toEqual([
      'Index', 'Silk', 'Writ', 'Klause', 'Rollback', 'Receipt',
    ])
    expect(profiles[0]).toHaveTextContent('provenance')
    expect(profiles[1]).toHaveTextContent('pressure-tests')
    expect(profiles[2]).toHaveTextContent('authority')
    expect(profiles[3]).toHaveTextContent('decision')
    expect(profiles[4]).toHaveTextContent('Plan B')
    expect(profiles[5]).toHaveTextContent("It's logged")
    expect(within(story).getAllByRole('img')).toHaveLength(15)
    expect(within(story).getByText('Advanced visual pre-production')).toBeVisible()
    expect(within(story).getByRole('link', { name: /engineering case study/i })).toHaveAttribute('href', '/portfolio/projects/adventures-of-patch')
  })
})

import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists crew story', () => {
  test('recruits six specialists in the approved functional order', async () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsPage />
      </MemoryRouter>,
    )

    const story = await screen.findByRole('region', { name: 'The Usual Specialists adventure' })
    expect(story).toHaveAttribute('data-type-register', 'site-sans')
    expect(story.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()
    const profiles = within(story).getAllByRole('article')
    expect(profiles).toHaveLength(6)
    expect(profiles.map((profile) => profile.getAttribute('data-specialist'))).toEqual(['index', 'silk', 'writ', 'klause', 'rollback', 'receipt'])
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
    expect(within(story).getByRole('img', { name: /Index, a bookish agent checking a route map/i })).toBeVisible()
    expect(within(story).getByRole('img', { name: /Writ, an institutional agent holding a ledger/i })).toBeVisible()
    expect(within(story).getByRole('img', { name: /Klause, a compact decision specialist reading Patch’s proposal/i })).toBeVisible()
    expect(within(story).getByText('Advanced visual pre-production')).toBeVisible()
    expect(within(story).getByRole('link', { name: /engineering case study/i })).toHaveAttribute('href', '/portfolio/projects/adventures-of-patch')
  })
})

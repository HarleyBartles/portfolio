import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { defaultHomepageEdition, type PatchHomepageFeature } from './homepageEdition'
import { HomepageOpening } from './HomepageOpening'
import { MarketplaceFeature } from './MarketplaceFeature'
import { ProfessionalClose } from './ProfessionalClose'
import { PatchHomepageSlot } from './PatchHomepageSlot'
import { WildBunchFeature } from './WildBunchFeature'
import { WritingFeature } from './WritingFeature'

function renderSections(): ReturnType<typeof render> {
  return render(
    <MemoryRouter>
      <HomepageOpening />
      <MarketplaceFeature />
      <WildBunchFeature nextFeature={defaultHomepageEdition.writing} />
      <WritingFeature feature={defaultHomepageEdition.writing} nextFeature={defaultHomepageEdition.patch} />
      <PatchHomepageSlot feature={defaultHomepageEdition.patch} />
      <ProfessionalClose />
    </MemoryRouter>,
  )
}

describe('Phase 8 homepage sections', () => {
  test('compose the accepted movements and inward routes in source order', () => {
    const { container } = renderSections()
    const movements = [...container.querySelectorAll<HTMLElement>('[data-home-movement]')]

    expect(movements.map((movement) => movement.dataset.homeMovement)).toEqual([
      'opening',
      'marketplace',
      'wild-bunch',
      'writing',
      'patch',
      'professional-close',
    ])
    expect(screen.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Read the story →' })).toHaveAttribute('href', '/writing/use-superpowers')
    expect(screen.getByRole('link', { name: /Follow the trail/ })).toHaveAttribute('href', '/projects/wild-bunch')
    expect(screen.getByRole('link', { name: /Read the article/ })).toHaveAttribute('href', defaultHomepageEdition.writing.to)
    expect(screen.getByRole('link', { name: /Meet the crew/ })).toHaveAttribute('href', defaultHomepageEdition.patch.to)
  })

  test('renders each continuation from the destination feature metadata', () => {
    renderSections()

    expect(screen.getByRole('link', { name: `${defaultHomepageEdition.writing.incomingTeaser} ↓` })).toHaveAttribute('href', '#writing')
    expect(screen.getByRole('link', { name: `${defaultHomepageEdition.patch.incomingTeaser} ↓` })).toHaveAttribute('href', '#patch')
  })

  test('keeps the Wild Bunch topology semantic and ordered', () => {
    const { container } = renderSections()
    const proof = container.querySelector('[data-wild-proof]') as HTMLElement

    expect(proof.querySelectorAll('.home-wild-event')).toHaveLength(6)
    expect(within(proof).getByRole('heading', { name: 'Replay' })).toBeVisible()
    expect(within(proof).getByRole('heading', { name: 'Cache' })).toBeVisible()
    expect(within(proof).getByRole('heading', { name: 'State' })).toBeVisible()
    expect(proof).toHaveAttribute('data-topology', 'events-cache-state;history-replay-cache-state')
  })

  test('keeps Specialists presentation separate from semantic title and document flow', () => {
    const { container } = renderSections()
    const patch = container.querySelector('[data-home-movement="patch"]') as HTMLElement
    const overprint = patch.querySelector('[data-zero-flow-overprint]') as HTMLElement
    const seriesMark = patch.querySelector('.patch-marque use') as SVGUseElement

    expect(within(patch).getByText('Adventures of PATCH')).toBeInTheDocument()
    expect(seriesMark.getAttribute('href')).toMatch(/\/brand\/adventures-of-patch\/adventures-of-patch-cliff-drop\.svg#adventures-of-patch-cliff-drop$/)
    expect(within(patch).getByRole('heading', { name: 'The Usual Specialists' })).toBeVisible()
    expect(overprint).toHaveAttribute('data-zero-flow-overprint', 'true')
    expect(patch).toHaveAttribute('data-patch-presentation', 'usual-specialists')
  })

  test('selects the Patch presentation slot rather than treating presentation as metadata', () => {
    const tournament: PatchHomepageFeature = {
      ...defaultHomepageEdition.patch,
      title: 'Tournament of Reasonable Defaults',
      to: '/patch/tournament-of-reasonable-defaults',
      inwardLabel: 'Enter the tournament',
      presentation: 'tournament',
    }
    const { container } = render(<MemoryRouter><PatchHomepageSlot feature={tournament} /></MemoryRouter>)

    expect(container.querySelector('[data-patch-presentation="tournament"]')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: tournament.title })).toBeVisible()
    expect(screen.queryByText('PATCH')).not.toBeInTheDocument()
  })
})

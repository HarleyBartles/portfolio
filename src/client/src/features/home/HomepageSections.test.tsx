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
    expect(container.querySelectorAll('[data-home-frame]').length).toBeGreaterThan(0)
  })

  test('keeps the opening proof and first-fold semantics intact', () => {
    const { container } = renderSections()
    const opening = container.querySelector('[data-home-movement="opening"]') as HTMLElement
    const proof = screen.getByRole('list', { name: 'Professional proof' })
    const heading = screen.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })

    expect(within(proof).getAllByRole('listitem')).toHaveLength(4)
    expect(heading).toHaveAttribute('id', 'home-opening-title')
    expect(screen.getByRole('link', { name: 'See the work ↓' })).toHaveAttribute('href', '#marketplace')
    expect(opening.querySelectorAll('[data-home-frame]')).toHaveLength(1)
  })

  test('owns the opening composition without relying on the route stylesheet', () => {
    const { container } = render(<MemoryRouter><HomepageOpening /></MemoryRouter>)
    const opening = container.querySelector('[data-home-movement="opening"]') as HTMLElement
    const frame = opening.querySelector('[data-home-frame]') as HTMLElement
    const heading = screen.getByRole('heading', { level: 1, name: 'Engineering the whole problem, not just the code.' })
    const proof = screen.getByRole('list', { name: 'Professional proof' })

    expect(opening).toHaveStyle({ display: 'flex', alignItems: 'center' })
    expect(frame).toHaveStyle({ paddingTop: 'clamp(62px, 9vw, 120px)' })
    expect(heading).toHaveStyle({ maxWidth: '9ch' })
    expect(proof).toHaveStyle({ margin: '0', padding: '0', listStyle: 'none' })
  })

  test('renders each continuation from the destination feature metadata', () => {
    renderSections()

    expect(screen.getByRole('link', { name: `${defaultHomepageEdition.writing.incomingTeaser} ↓` })).toHaveAttribute('href', '#writing')
    expect(screen.getByRole('link', { name: `${defaultHomepageEdition.patch.incomingTeaser} ↓` })).toHaveAttribute('href', '#patch')
  })

  test('keeps the Wild Bunch topology semantic and ordered', () => {
    const { container } = renderSections()
    const proof = container.querySelector('[data-wild-proof]') as HTMLElement

    expect(proof.querySelectorAll('[data-wild-event]')).toHaveLength(6)
    expect(proof.querySelectorAll('[data-wild-wire]')).toHaveLength(6)
    expect(within(proof).getByRole('heading', { name: 'Replay' })).toBeVisible()
    expect(within(proof).getByRole('heading', { name: 'Cache' })).toBeVisible()
    expect(within(proof).getByRole('heading', { name: 'State' })).toBeVisible()
    expect(proof).toHaveAttribute('data-topology', 'events-cache-state;history-replay-cache-state')
    expect(proof.querySelector('[data-wild-cache]')).toBeInTheDocument()
    expect(proof.querySelector('[data-wild-replay]')).toBeInTheDocument()
    expect(proof.querySelector('[data-wild-state]')).toBeInTheDocument()
    expect(container.querySelector('[data-wild-reading-card]')).toBeInTheDocument()
  })

  test('keeps Specialists presentation separate from semantic title and document flow', () => {
    const { container } = renderSections()
    const patch = container.querySelector('[data-home-movement="patch"]') as HTMLElement
    const overprint = patch.querySelector('[data-zero-flow-overprint]') as HTMLElement
    const seriesLockup = patch.querySelector('[data-patch-series-lockup]') as HTMLElement
    const seriesMark = seriesLockup.querySelector('use') as SVGUseElement

    expect(within(patch).getByText('Adventures of PATCH')).toBeInTheDocument()
    expect(seriesLockup).toBeInTheDocument()
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

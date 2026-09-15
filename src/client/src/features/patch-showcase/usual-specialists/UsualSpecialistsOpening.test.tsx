import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsOpening } from './UsualSpecialistsOpening'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

describe('Usual Specialists opening', () => {
  test('owns the opening rope from a page anchor above the threshold image', () => {
    const { container } = render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsOpening />
      </MemoryRouter>,
    )

    const pageTitle = screen.getByRole('heading', { level: 1, name: 'The Usual Specialists' })
    expect(pageTitle).toBeVisible()
    expect(pageTitle).toHaveAccessibleName('The Usual Specialists')
    expect(screen.getByText('Patch has a route-shaped problem. Six people make it legitimate, testable, lawful, decidable, recoverable and reviewable - mostly by carrying on with their actual jobs while he talks.')).toBeVisible()
    expect(container.querySelector('[data-patch-series-lockup]')).toBeInTheDocument()
    expect(pageTitle.querySelector('[data-specialists-wordmark]')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('img', { name: /ordinary apartment safehouse/i })).toHaveAttribute('fetchpriority', 'high')
    const opening = container.querySelector('header')
    const threshold = screen.getByRole('img', { name: /ordinary apartment safehouse/i }).parentElement
    const rope = opening?.querySelector('[data-specialists-rope-piece="opening"]')
    const anchor = opening?.querySelector<HTMLElement>('[data-specialists-rope-anchor="opening-start"]') ?? null
    expect(rope?.querySelectorAll('[data-specialists-rope-variant="taut-straight"]')).toHaveLength(2)
    expect(anchor).toBeInTheDocument()
    expect(anchor?.querySelector('[data-specialists-rope-start-anchor-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('media/patch/the-usual-specialists/opening-rope-start-anchor.webp'),
    )
    expect(threshold).not.toContainElement(anchor)
    expect(screen.queryByRole('link', { name: 'Silk' })).not.toBeInTheDocument()
  })

  test('forwards an exceptional style override to the opening root only', () => {
    const { container } = render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsOpening style={{ opacity: 0.5 }} />
      </MemoryRouter>,
    )

    const opening = container.querySelector('header')
    expect(opening).toHaveStyle({ opacity: '0.5' })
  })

  test('does not expose caller className as a styling seam', () => {
    const { container } = render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        {/* @ts-expect-error className is intentionally not part of the vertical-slice API. */}
        <UsualSpecialistsOpening className="external-control" />
      </MemoryRouter>,
    )

    expect(container.querySelector('header')).not.toHaveClass('external-control')
  })

  test('resolves Specialists media under the active base path', () => {
    expect(usualSpecialistsAssetPath('safehouse-threshold.webp', '/portfolio/')).toBe('/portfolio/media/patch/the-usual-specialists/safehouse-threshold.webp')
  })
})

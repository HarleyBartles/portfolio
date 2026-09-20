import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsOpening } from './UsualSpecialistsOpening'
import { usualSpecialistsAssetPath } from '../assets'

describe('Usual Specialists opening', () => {
  test('keeps the approved opening story and recruitment handoff', () => {
    const { container } = render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsOpening />
      </MemoryRouter>,
    )

    const pageTitle = screen.getByRole('heading', { level: 1, name: 'The Usual Specialists' })
    const supporting = container.querySelector<HTMLElement>('[data-specialists-opening-supporting]')
    const seriesLockup = container.querySelector<HTMLElement>('[data-patch-series-lockup]')
    const precis = supporting?.querySelector('p')
    expect(pageTitle).toBeVisible()
    expect(pageTitle).toHaveAccessibleName('The Usual Specialists')
    expect(supporting).not.toBeNull()
    expect(supporting).toContainElement(seriesLockup)
    expect(precis).toBeVisible()
    expect(pageTitle.compareDocumentPosition(supporting!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(pageTitle.querySelector('[data-specialists-wordmark]')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('img', { name: /ordinary apartment safehouse/i })).toHaveAttribute('fetchpriority', 'high')

    expect(precis).toHaveTextContent(/vault that won’t let him in/i)
    expect(precis).toHaveTextContent(/doing its job/i)
    expect(precis).toHaveTextContent(/agent operating environment/i)
    expect(precis).toHaveTextContent(/lawful way back in/i)
    for (const responsibility of ['justified', 'tested', 'authorised', 'chosen', 'recoverable', 'recorded']) {
      expect(precis).toHaveTextContent(responsibility)
    }

    const threshold = container.querySelector<HTMLElement>('[data-specialists-threshold-copy]')
    expect(threshold).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Six names on the list' })).toBeVisible()
    expect(threshold).toHaveTextContent(/No single agent gets to .* its own exception/i)
    expect(threshold).toHaveTextContent(/Patch needs the specialists/i)
    expect(threshold).toHaveTextContent(/First up: Index/i)

    const openingText = container.querySelector('header')?.textContent ?? ''
    expect(openingText).not.toMatch(/folder|keycard|assent|handwritten note|final scan/i)
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

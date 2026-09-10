import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsOpening } from './UsualSpecialistsOpening'
import { EXPECTED_WIREFRAME_ROPE_PATH, usualSpecialistsAssetPath } from './usualSpecialistsAssets'

describe('Usual Specialists opening', () => {
  test('renders the accepted opening and temporary rope contract', () => {
    const { container } = render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsOpening />
      </MemoryRouter>,
    )

    const pageTitle = screen.getByRole('heading', { level: 1, name: 'The Usual Specialists' })
    expect(pageTitle).toBeVisible()
    expect(pageTitle).toHaveAccessibleName('The Usual Specialists')
    expect(container.querySelector('[data-patch-series-lockup]')).toBeInTheDocument()
    expect(pageTitle.querySelector('[data-specialists-wordmark]')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('img', { name: /ordinary apartment safehouse/i })).toHaveAttribute('fetchpriority', 'high')
    expect(container.querySelector('[data-temporary-wireframe-rope="true"] path')).toHaveAttribute('d', EXPECTED_WIREFRAME_ROPE_PATH)
    expect(screen.queryByRole('link', { name: 'Silk' })).not.toBeInTheDocument()
  })

  test('resolves Specialists media under the active base path', () => {
    expect(usualSpecialistsAssetPath('safehouse-threshold.webp', '/portfolio/')).toBe('/portfolio/media/patch/the-usual-specialists/safehouse-threshold.webp')
  })
})

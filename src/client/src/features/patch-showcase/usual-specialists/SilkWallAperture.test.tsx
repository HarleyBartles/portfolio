import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkWallAperture } from './SilkWallAperture'

describe('Silk wall aperture', () => {
  test('owns its internal world and rim while forwarding only a root style override', () => {
    const { container } = render(
      <SilkWallAperture variant="corridor" style={{ opacity: 0.5 }}>
        <span>Corridor world</span>
      </SilkWallAperture>,
    )

    const aperture = container.querySelector<HTMLElement>('[data-silk-aperture]')
    const world = container.querySelector<HTMLElement>('[data-silk-aperture-world]')
    const rim = container.querySelector<HTMLElement>('[data-silk-aperture-rim]')

    expect(aperture).toHaveAttribute('data-silk-aperture-variant', 'corridor')
    expect(aperture).toHaveStyle({ opacity: '0.5' })
    expect(world).toContainElement(screen.getByText('Corridor world'))
    expect(rim).toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    const { container } = render(
      // @ts-expect-error className is intentionally not part of the aperture API.
      <SilkWallAperture variant="slit" className="external-control">
        <span>Reaction world</span>
      </SilkWallAperture>,
    )

    expect(container.querySelector('[data-silk-aperture]')).not.toHaveClass('external-control')
  })
})

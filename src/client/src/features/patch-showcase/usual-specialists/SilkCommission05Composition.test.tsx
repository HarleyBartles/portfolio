import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkCommission05Composition } from './SilkCommission05Composition'

describe('SilkCommission05Composition', () => {
  test('owns the accepted corridor scene inside the sealed world viewport and mineral-aligned accepted frames', () => {
    const { container } = render(<SilkCommission05Composition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-commission-05-composition]')
    const viewport = root?.querySelector('[data-silk-commission-05-world-viewport]')
    const scene = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-scene]')
    const frame = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-frame]')
    const portraitFrame = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-portrait-frame]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(viewport).toBeInTheDocument()
    expect(scene).toHaveAttribute('src', expect.stringContaining('silk-commission-05-corridor.webp'))
    expect(scene).toHaveAttribute('alt', '')
    expect(root?.querySelector('[data-silk-commission-05-viewport-edge-probe]')).not.toBeInTheDocument()
    expect(root?.querySelector('[data-silk-commission-05-crossing]')).not.toBeInTheDocument()
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-commission-05-aperture-rim-heavy.webp'))
    expect(frame).toHaveAttribute('alt', '')
    expect(portraitFrame).toHaveAttribute('src', expect.stringContaining('silk-commission-05-aperture-rim-heavy-portrait.webp'))
    expect(portraitFrame).toHaveAttribute('width', '1024')
    expect(portraitFrame).toHaveAttribute('height', '1536')
    expect(portraitFrame).toHaveAttribute('alt', '')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkCommission05Composition className="external-control" />)
    expect(container.querySelector('[data-silk-commission-05-composition]')).not.toHaveClass('external-control')
  })
})

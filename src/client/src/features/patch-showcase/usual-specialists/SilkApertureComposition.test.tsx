import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkApertureComposition } from './SilkApertureComposition'

describe('SilkApertureComposition', () => {
  test('presents Commission 05 through accepted fixed-frame media', () => {
    const { container } = render(
      <SilkApertureComposition variant="commission-05" style={{ opacity: 0.5 }} />,
    )

    const root = container.querySelector('[data-silk-aperture-composition]')
    const viewport = root?.querySelector('[data-silk-aperture-world-viewport]')
    const scene = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-scene]')
    const frame = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-frame]')
    const portraitFrame = root?.querySelector<HTMLImageElement>('[data-silk-commission-05-portrait-frame]')

    expect(root).toHaveAttribute('data-silk-aperture-composition-variant', 'commission-05')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(viewport).toBeInTheDocument()
    expect(scene).toHaveAttribute('src', expect.stringContaining('silk-commission-05-corridor.webp'))
    expect(scene).toHaveAttribute('alt', '')
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-commission-05-aperture-rim-heavy.webp'))
    expect(frame).toHaveAttribute('width', '1672')
    expect(frame).toHaveAttribute('height', '941')
    expect(portraitFrame).toHaveAttribute('src', expect.stringContaining('silk-commission-05-aperture-rim-heavy-portrait.webp'))
    expect(portraitFrame).toHaveAttribute('width', '1024')
    expect(portraitFrame).toHaveAttribute('height', '1536')
    expect(root?.querySelector('[data-silk-aperture-viewport-diagnostic]')).not.toBeInTheDocument()
    expect(root?.querySelector('[data-silk-aperture-composition-diagnostic]')).not.toBeInTheDocument()
  })

  test('presents Commission 07 as a provenance-backed candidate frame over a parallax-ready colour world', () => {
    const { container } = render(<SilkApertureComposition variant="commission-07-review" />)

    const root = container.querySelector('[data-silk-aperture-composition]')
    const viewport = root?.querySelector('[data-silk-commission-07-review-viewport]')
    const world = root?.querySelector('[data-silk-commission-07-review-world]')
    const frame = root?.querySelector<HTMLImageElement>('[data-silk-commission-07-review-frame]')
    const viewportDiagnostic = root?.querySelector('[data-silk-aperture-viewport-diagnostic]')
    const compositionDiagnostic = root?.querySelector('[data-silk-aperture-composition-diagnostic]')

    expect(root).toHaveAttribute('data-silk-aperture-composition-variant', 'commission-07-review')
    expect(viewport).toBeInTheDocument()
    expect(world).toBeInTheDocument()
    expect(frame).toHaveAttribute('src', expect.stringContaining('silk-commission-07-frame-review.webp'))
    expect(frame).toHaveAttribute('width', '1671')
    expect(frame).toHaveAttribute('height', '941')
    expect(frame).toHaveAttribute('alt', '')
    expect(viewportDiagnostic).toBeInTheDocument()
    expect(compositionDiagnostic).not.toBeInTheDocument()
    expect(root?.querySelector('[data-silk-commission-05-portrait-frame]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkApertureComposition variant="commission-07-review" className="external-control" />)
    expect(container.querySelector('[data-silk-aperture-composition]')).not.toHaveClass('external-control')
  })
})

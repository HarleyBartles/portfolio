import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SpecialistsRopeStartAnchor } from './SpecialistsRopeStartAnchor'

describe('SpecialistsRopeStartAnchor', () => {
  test('owns the accepted decorative anchor image and intrinsic display contract', () => {
    const { container } = render(<SpecialistsRopeStartAnchor />)

    const root = container.querySelector('[data-specialists-rope-start-anchor]')
    const image = root?.querySelector('[data-specialists-rope-start-anchor-image]')

    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(image).toHaveAttribute('src', expect.stringContaining('opening-rope-start-anchor.webp'))
    expect(image).toHaveAttribute('width', '640')
    expect(image).toHaveAttribute('height', '615')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SpecialistsRopeStartAnchor className="external-control" />)

    expect(container.querySelector('[data-specialists-rope-start-anchor]')).not.toHaveClass('external-control')
  })

  test('forwards the canonical style override to the anchor root only', () => {
    const { container } = render(<SpecialistsRopeStartAnchor style={{ opacity: 0.5 }} />)

    expect(container.querySelector('[data-specialists-rope-start-anchor]')).toHaveStyle({ opacity: '0.5' })
  })

  test('owns display internals without owning page-level placement', () => {
    const { container } = render(<SpecialistsRopeStartAnchor />)
    const root = container.querySelector<HTMLElement>('[data-specialists-rope-start-anchor]')!
    const style = getComputedStyle(root)

    expect(style.position).not.toBe('absolute')
    expect(style.left).toBe('auto')
    expect(style.top).toBe('auto')
    expect(style.transform).toBe('none')
  })
})

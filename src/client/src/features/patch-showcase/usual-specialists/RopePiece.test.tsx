import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { RopePiece } from './RopePiece'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

describe('RopePiece', () => {
  test.each([
    ['loose-a', 'rope-loose-a.webp'],
    ['loose-b', 'rope-loose-b.webp'],
    ['loose-c', 'rope-loose-c.webp'],
    ['terminal-curl', 'rope-terminal-curl.webp'],
    ['taut-straight', 'rope-taut-straight.webp'],
    ['taut-bow', 'rope-taut-bow.webp'],
    ['taut-offset', 'rope-taut-offset.webp'],
  ] as const)('maps %s to its custody-backed derivative', (variant, filename) => {
    const { container } = render(<RopePiece variant={variant} />)

    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', usualSpecialistsAssetPath(filename))
    expect(image).toHaveAttribute('data-specialists-rope-variant', variant)
    expect(image).toHaveAttribute('aria-hidden', 'true')
  })

  test('does not accept parent-owned geometry or styling props', () => {
    const { container } = render(
      // @ts-expect-error geometry and styling belong to the parent placement wrapper.
      <RopePiece variant="taut-straight" className="external-control" style={{ width: 12 }} />,
    )

    const image = container.querySelector('img')
    expect(image).not.toHaveClass('external-control')
    expect(image).not.toHaveStyle({ width: '12px' })
  })

  test('preserves its intrinsic aspect ratio so the parent can crop without changing rope thickness', () => {
    const { container } = render(<RopePiece variant="taut-straight" />)

    expect(container.querySelector('img')).toHaveStyle({ height: 'auto' })
  })
})

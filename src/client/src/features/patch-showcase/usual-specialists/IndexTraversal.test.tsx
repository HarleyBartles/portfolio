import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexTraversal } from './IndexTraversal'

describe('IndexTraversal', () => {
  test('owns the decorative traversal image contract and semantic identifiers', () => {
    const { container } = render(
      <IndexTraversal
        src="/media/index-walk.webp"
        traversal="index-walk"
        substrate="desk-diagram"
        style={{ opacity: 0.5 }}
      />,
    )

    const image = container.querySelector('img')
    expect(image).not.toBeNull()
    expect(image).toHaveAttribute('src', '/media/index-walk.webp')
    expect(image).toHaveAttribute('width', '320')
    expect(image).toHaveAttribute('height', '480')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('aria-hidden', 'true')
    expect(image).toHaveAttribute('data-index-traversal', 'index-walk')
    expect(image).toHaveAttribute('data-substrate', 'desk-diagram')
    expect(image).toHaveStyle({ opacity: '0.5' })
    expect(image).not.toHaveAttribute('className')
  })

  test('does not expose caller className as a styling seam', () => {
    const { container } = render(
      // @ts-expect-error className is intentionally not part of the vertical-slice API.
      <IndexTraversal src="/media/index-walk.webp" traversal="index-walk" substrate="desk-diagram" className="external-control" />,
    )

    expect(container.querySelector('img')).not.toHaveClass('external-control')
  })
})

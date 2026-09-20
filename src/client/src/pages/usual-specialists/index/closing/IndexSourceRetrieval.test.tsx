import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexSourceRetrieval } from './IndexSourceRetrieval'

describe('IndexSourceRetrieval', () => {
  test('keeps the accepted archive image while correcting the retrieval semantics', () => {
    const { container } = render(<IndexSourceRetrieval style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-closing-beat="source-retrieval"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    const image = screen.getByRole('img', { name: /Index pulls a useful source file/i })
    expect(image).toHaveAttribute('src', expect.stringContaining('index-macguffin.webp'))
    expect(image).toHaveAttribute('width', '1200')
    expect(image).toHaveAttribute('height', '800')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexSourceRetrieval className="external-control" />)
    expect(container.querySelector('[data-index-closing-beat="source-retrieval"]')).not.toHaveClass('external-control')
  })
})

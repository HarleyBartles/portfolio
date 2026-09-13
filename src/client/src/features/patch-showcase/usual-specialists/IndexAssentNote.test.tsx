import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexAssentNote } from './IndexAssentNote'

describe('IndexAssentNote', () => {
  test('owns the assent-note semantics, decorative art, and root style override', () => {
    const { container } = render(<IndexAssentNote style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="assent-note"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root).toHaveTextContent("You son of a gun. I'm in!")
    const art = root?.querySelector('img')
    expect(art).toHaveAttribute('width', '480')
    expect(art).toHaveAttribute('height', '400')
    expect(art).toHaveAttribute('alt', '')
    expect(art).toHaveAttribute('aria-hidden', 'true')
    expect(root?.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexAssentNote className="external-control" />)
    expect(container.querySelector('[data-index-substrate="assent-note"]')).not.toHaveClass('external-control')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexDeskDocument } from './IndexDeskDocument'

describe('IndexDeskDocument', () => {
  test('owns the desk document, traversal composition, and root style override', () => {
    const { container } = render(<IndexDeskDocument style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="desk-diagram"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(screen.getByRole('img', { name: /layered desk diagram/i })).toHaveAttribute('loading', 'lazy')
    expect(screen.getByRole('img', { name: /layered desk diagram/i })).toHaveAttribute('decoding', 'async')
    expect(root?.querySelector('[data-index-story-card]')).not.toBeInTheDocument()
    expect(root?.querySelector('[data-index-traversal="index-walk"]')).toHaveAttribute('data-substrate', 'desk-diagram')
    expect(root?.querySelector('[data-index-traversal="index-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
    expect(root?.querySelector('[data-index-traversal="patch-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexDeskDocument className="external-control" />)
    expect(container.querySelector('[data-index-substrate="desk-diagram"]')).not.toHaveClass('external-control')
  })
})

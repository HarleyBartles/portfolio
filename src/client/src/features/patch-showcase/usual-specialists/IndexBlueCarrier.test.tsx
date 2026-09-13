import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexBlueCarrier } from './IndexBlueCarrier'

describe('IndexBlueCarrier', () => {
  test('owns the blue carrier, Index lockup, traversal composition, and root style override', () => {
    const { container } = render(<IndexBlueCarrier style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="blue-carrier"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(screen.getByRole('img', { name: /blue working sheet/i })).toHaveAttribute('loading', 'lazy')
    expect(root).toHaveTextContent('PROVENANCE | TRACE THE ROUTES')
    expect(root?.querySelector('[data-index-traversal="patch-follow"]')).toHaveAttribute('data-substrate', 'blue-carrier')
    expect(root?.querySelector('[data-index-traversal="index-high-step"]')).toHaveAttribute('data-substrate', 'blue-carrier')

    const wordmark = root?.querySelector<HTMLImageElement>('[data-index-lockup] img')
    expect(wordmark).toHaveAttribute('alt', '')
    expect(wordmark).toHaveAttribute('aria-hidden', 'true')
    expect(getComputedStyle(wordmark!).aspectRatio).toBe('521.7171/103.332')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexBlueCarrier className="external-control" />)
    expect(container.querySelector('[data-index-substrate="blue-carrier"]')).not.toHaveClass('external-control')
  })
})

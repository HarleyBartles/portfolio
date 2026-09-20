import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexOutcomePanel } from './IndexOutcomePanel'

describe('IndexOutcomePanel', () => {
  test('mounts the accepted outcome asset with exact HTML assent copy', () => {
    const { container } = render(<IndexOutcomePanel style={{ opacity: 0.5 }} />)
    const panel = container.querySelector('[data-index-closing-beat="assent-outcome"]')

    expect(panel).toHaveStyle({ opacity: '0.5' })
    expect(screen.getByRole('img', { name: /Patch carries Index's assent onward/i }))
      .toHaveAttribute('src', expect.stringContaining('index-outcome-folder.webp'))
    expect(panel).toHaveTextContent("You son of a gun. I'm in!")
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexOutcomePanel className="external-control" />)
    expect(container.querySelector('[data-index-closing-beat="assent-outcome"]')).not.toHaveClass('external-control')
  })
})

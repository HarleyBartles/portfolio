import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SpecialistsChapterNav } from './SpecialistsChapterNav'

describe('SpecialistsChapterNav', () => {
  test('links mounted chapters and leaves future chapter tabs inert', () => {
    const { container } = render(<SpecialistsChapterNav />)

    const nav = screen.getByRole('navigation', { name: 'Specialist chapters' })
    expect(within(nav).getByRole('link', { name: 'Index' })).toHaveAttribute('href', '#index')
    expect(within(nav).getByRole('link', { name: 'Silk' })).toHaveAttribute('href', '#silk')
    for (const label of ['Writ', 'Klause', 'Rollback', 'Receipt']) {
      expect(within(nav).getByText(label)).not.toHaveAttribute('href')
      expect(within(nav).queryByRole('link', { name: label })).not.toBeInTheDocument()
    }
    expect(container.querySelector('[data-specialists-rope-piece]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SpecialistsChapterNav className="external-control" />)
    expect(container.querySelector('[data-specialists-chapter-nav]')).not.toHaveClass('external-control')
  })
})

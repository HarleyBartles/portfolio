import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SpecialistsChapterNav } from './SpecialistsChapterNav'

describe('SpecialistsChapterNav', () => {
  test('links Index and leaves future chapter tabs inert', () => {
    render(<SpecialistsChapterNav />)

    const nav = screen.getByRole('navigation', { name: 'Specialist chapters' })
    expect(within(nav).getByRole('link', { name: 'Index' })).toHaveAttribute('href', '#index')
    for (const label of ['Silk', 'Writ', 'Klause', 'Rollback', 'Receipt']) {
      expect(within(nav).getByText(label)).not.toHaveAttribute('href')
      expect(within(nav).queryByRole('link', { name: label })).not.toBeInTheDocument()
    }
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SpecialistsChapterNav className="external-control" />)
    expect(container.querySelector('[data-specialists-chapter-nav]')).not.toHaveClass('external-control')
  })
})

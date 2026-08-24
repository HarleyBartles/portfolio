import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchEvidenceGallery } from './PatchEvidenceGallery'

describe('PatchEvidenceGallery', () => {
  test('renders accepted evidence as captioned figures rather than unqualified decoration', () => {
    render(<PatchEvidenceGallery />)

    const gallery = screen.getByRole('region', { name: 'Evidence gallery' })
    const figures = within(gallery).getAllByRole('figure')
    expect(figures).toHaveLength(4)
    figures.forEach((figure) => expect(within(figure).getByText(/Published artefact/)).toBeVisible())
  })
})

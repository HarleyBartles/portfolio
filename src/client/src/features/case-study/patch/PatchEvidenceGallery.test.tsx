import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { getPatchAssetPath, PatchEvidenceGallery } from './PatchEvidenceGallery'

describe('PatchEvidenceGallery', () => {
  test('relates each published artefact to captioned evidence without relabelling its source state', () => {
    render(<PatchEvidenceGallery />)

    const gallery = screen.getByRole('region', { name: 'Evidence gallery' })
    const figures = within(gallery).getAllByRole('figure')
    expect(figures).toHaveLength(4)
    expect(within(figures[0]).getByText('Historical published-deck evidence')).toBeVisible()
    expect(within(figures[0]).getByText(/legacy-reference derivative/)).toBeVisible()
    figures.slice(1).forEach((figure) => expect(within(figure).getByText('Published artefact evidence')).toBeVisible())
  })

  test('preserves the deployment base path for public derivatives', () => {
    expect(getPatchAssetPath('src/client/public/media/patch/example.avif', '/portfolio/')).toBe('/portfolio/media/patch/example.avif')
  })
})

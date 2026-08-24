import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { getPatchAssetPath, PatchEvidenceGallery } from './PatchEvidenceGallery'

describe('PatchEvidenceGallery', () => {
  test('relates each published artefact to captioned evidence without relabelling its source state', () => {
    render(<PatchEvidenceGallery />)

    const gallery = screen.getByRole('region', { name: 'Evidence gallery' })
    const figures = within(gallery).getAllByRole('figure')
    expect(figures).toHaveLength(4)
    expect(within(figures[0]).getByText('Club DB, published origin deck')).toBeVisible()
    expect(figures[0]).toHaveTextContent(/original production process/)
    ;['Goldilocks and the Right Amount of Guidance', "The Sorcerer's Apprentice", 'Introducing Patch'].forEach((caption, index) => {
      expect(within(figures[index + 1]).getByText(caption)).toBeVisible()
    })
    figures.forEach((figure) => {
      expect(figure.querySelector('picture')).not.toBeNull()
      expect(figure.querySelectorAll('source').length).toBeGreaterThanOrEqual(2)
      expect(within(figure).getByRole('link')).toHaveAttribute('href', expect.stringMatching(/^https:\/\//))
    })
  })

  test('preserves the deployment base path for public derivatives', () => {
    expect(getPatchAssetPath('src/client/public/media/patch/example.avif', '/portfolio/')).toBe('/portfolio/media/patch/example.avif')
  })
})

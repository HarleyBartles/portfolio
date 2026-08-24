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

  test('uses available portrait artefacts at mobile widths without inventing one for Sorcerer’s Apprentice', () => {
    render(<PatchEvidenceGallery />)

    const figures = within(screen.getByRole('region', { name: 'Evidence gallery' })).getAllByRole('figure')
    const portraitSources = (figure: HTMLElement) => Array.from(figure.querySelectorAll('source[media="(max-width: 44.99rem)"]')).map((source) => source.getAttribute('srcset'))

    expect(portraitSources(figures[1])).toEqual(expect.arrayContaining([
      expect.stringContaining('patch-goldilocks-portrait-640.avif'),
      expect.stringContaining('patch-goldilocks-portrait-640.webp'),
    ]))
    expect(portraitSources(figures[2])).toEqual([])
    expect(portraitSources(figures[3])).toEqual(expect.arrayContaining([
      expect.stringContaining('patch-introducing-page-portrait-640.avif'),
      expect.stringContaining('patch-introducing-page-portrait-640.webp'),
    ]))
  })
})

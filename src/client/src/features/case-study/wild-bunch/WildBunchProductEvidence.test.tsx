import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import * as productEvidence from './WildBunchProductEvidence'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

describe('Wild Bunch product evidence contract', () => {
  test('uses responsive evidence-specific captions and loading boundaries', () => {
    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><WildBunchCaseStudy /></MemoryRouter>)

    const trail = screen.getByRole('figure', { name: 'Generated trail-map development-build evidence' })
    const town = screen.getByRole('figure', { name: 'Dustwell town-hub development-build evidence' })
    const wanted = screen.getByRole('figure', { name: 'Wanted-notice development-build evidence' })
    const caseFile = screen.getByRole('figure', { name: 'Case-file development-build evidence' })
    const captures = [
      { evidence: town, name: 'dustwell-town-hub-focus', compact: { width: 640, height: 400 }, wide: { width: 800, height: 500 } },
      { evidence: trail, name: 'trail-map-focus', compact: { width: 480, height: 472 }, wide: { width: 600, height: 590 } },
      { evidence: wanted, name: 'wanted-notice-focus', compact: { width: 472, height: 479 }, wide: { width: 590, height: 599 } },
      { evidence: caseFile, name: 'case-file', compact: { width: 640, height: 489 }, wide: { width: 960, height: 733 } },
    ]

    expect(screen.queryByRole('figure', { name: 'Session-audit development-build evidence' })).not.toBeInTheDocument()

    for (const { evidence, name, compact, wide } of captures) {
      const image = within(evidence).getByRole('img')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('width', String(compact.width))
      expect(image).toHaveAttribute('height', String(compact.height))
      expect(image).toHaveAttribute('src', `/media/wild-bunch/${name}-${compact.width}.webp`)
      const sources = Array.from(evidence.querySelectorAll('picture source'))
      expect(sources.map((source) => ({ srcSet: source.getAttribute('srcset'), type: source.getAttribute('type') }))).toEqual([
        { srcSet: `/media/wild-bunch/${name}-${wide.width}.avif`, type: 'image/avif' },
        { srcSet: `/media/wild-bunch/${name}-${wide.width}.webp`, type: 'image/webp' },
        { srcSet: `/media/wild-bunch/${name}-${compact.width}.avif`, type: 'image/avif' },
        { srcSet: `/media/wild-bunch/${name}-${compact.width}.webp`, type: 'image/webp' },
      ])
    }

    expect(within(trail).getByText('The generated topology and travel distances are visible before the player chooses a town.')).toBeVisible()
    expect(within(town).getByText(/Current playable build: Dustwell is the generated town captured for the recorded seed/i)).toBeVisible()
    expect(within(wanted).getByText(/player-safe knowledge/i)).toBeVisible()
    expect(within(caseFile).getByText(/player-safe knowledge/i)).toBeVisible()
  })

  test('builds each public capture path through the configured Vite base', () => {
    const candidate = (productEvidence as Record<string, unknown>).getWildBunchAssetPath

    expect(candidate).toEqual(expect.any(Function))
    if (typeof candidate !== 'function') return

    const derivatives = [
      { name: 'dustwell-town-hub-focus', compactWidth: 640, wideWidth: 800 },
      { name: 'trail-map-focus', compactWidth: 480, wideWidth: 600 },
      { name: 'wanted-notice-focus', compactWidth: 472, wideWidth: 590 },
      { name: 'case-file', compactWidth: 640, wideWidth: 960 },
    ]

    for (const { name, compactWidth, wideWidth } of derivatives) {
      for (const [width, format] of [[wideWidth, 'avif'], [wideWidth, 'webp'], [compactWidth, 'avif'], [compactWidth, 'webp']] as const) {
        const path = `/media/wild-bunch/${name}-${width}.${format}`
        expect(candidate(path, '/portfolio/')).toBe(`/portfolio${path}`)
      }
    }

    expect(candidate('media/wild-bunch/session-audit-1200.avif', '/portfolio/')).toBe('/portfolio/media/wild-bunch/session-audit-1200.avif')
  })
})

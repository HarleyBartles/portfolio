import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import * as productEvidence from './WildBunchProductEvidence'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

describe('Wild Bunch product evidence contract', () => {
  test('uses responsive development-build evidence with captions and loading boundaries', () => {
    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><WildBunchCaseStudy /></MemoryRouter>)

    const trail = screen.getByRole('figure', { name: 'Generated trail-map development-build evidence' })
    const audit = screen.getByRole('figure', { name: 'Session-audit development-build evidence' })
    const wanted = screen.getByRole('figure', { name: 'Wanted-notice development-build evidence' })
    const caseFile = screen.getByRole('figure', { name: 'Case-file development-build evidence' })
    const captures = [
      { evidence: trail, name: 'trail-map', compact: { width: 720, height: 550 }, wide: { width: 1200, height: 917 } },
      { evidence: audit, name: 'session-audit', compact: { width: 720, height: 550 }, wide: { width: 1200, height: 917 } },
      { evidence: wanted, name: 'wanted-notice', compact: { width: 640, height: 489 }, wide: { width: 960, height: 733 } },
      { evidence: caseFile, name: 'case-file', compact: { width: 640, height: 489 }, wide: { width: 960, height: 733 } },
    ]

    expect(screen.queryByRole('figure', { name: 'Dustwell town development-build evidence' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(4)

    for (const { evidence, name, compact, wide } of captures) {
      const image = within(evidence).getByRole('img')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('width', String(compact.width))
      expect(image).toHaveAttribute('height', String(compact.height))
      expect(image).toHaveAttribute('src', `/media/wild-bunch/${name}-${compact.width}.webp`)
      expect(within(evidence).getByText(/Current development build \/ working skeleton/i)).toBeVisible()
      const sources = Array.from(evidence.querySelectorAll('picture source'))
      expect(sources.map((source) => ({ srcSet: source.getAttribute('srcset'), type: source.getAttribute('type') }))).toEqual([
        { srcSet: `/media/wild-bunch/${name}-${wide.width}.avif`, type: 'image/avif' },
        { srcSet: `/media/wild-bunch/${name}-${wide.width}.webp`, type: 'image/webp' },
        { srcSet: `/media/wild-bunch/${name}-${compact.width}.avif`, type: 'image/avif' },
        { srcSet: `/media/wild-bunch/${name}-${compact.width}.webp`, type: 'image/webp' },
      ])
    }

    expect(within(trail).getByText(/names, topology, and route distances/i)).toBeVisible()
    expect(within(audit).getByText(/ordered event history/i)).toBeVisible()
    expect(within(wanted).getByText(/player-safe investigation evidence/i)).toBeVisible()
    expect(within(caseFile).getByText(/player-known case-file surface/i)).toBeVisible()
  })

  test('builds each public capture path through the configured Vite base', () => {
    const candidate = (productEvidence as Record<string, unknown>).getWildBunchAssetPath

    expect(candidate).toEqual(expect.any(Function))
    if (typeof candidate !== 'function') return

    const derivatives = [
      { name: 'trail-map', compactWidth: 720, wideWidth: 1200 },
      { name: 'session-audit', compactWidth: 720, wideWidth: 1200 },
      { name: 'wanted-notice', compactWidth: 640, wideWidth: 960 },
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

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

    expect(screen.queryByRole('figure', { name: 'Dustwell town development-build evidence' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(4)

    for (const evidence of [trail, audit, wanted, caseFile]) {
      const image = within(evidence).getByRole('img')
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(within(evidence).getByText(/Current development build \/ working skeleton/i)).toBeVisible()
      const sources = Array.from(evidence.querySelectorAll('picture source'))
      expect(sources.some((source) => source.getAttribute('type') === 'image/avif')).toBe(true)
      expect(sources.some((source) => source.getAttribute('type') === 'image/webp')).toBe(true)
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

    expect(candidate('/media/wild-bunch/trail-map-720.webp', '/portfolio/')).toBe('/portfolio/media/wild-bunch/trail-map-720.webp')
    expect(candidate('media/wild-bunch/session-audit-1200.avif', '/portfolio/')).toBe('/portfolio/media/wild-bunch/session-audit-1200.avif')
  })
})

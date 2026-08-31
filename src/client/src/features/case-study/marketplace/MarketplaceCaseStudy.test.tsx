import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MarketplaceCaseStudy } from './MarketplaceCaseStudy'

describe('MarketplaceCaseStudy', () => {
  test('tells the approved operating model and dated audit story in source order', () => {
    const { container } = render(<MarketplaceCaseStudy />)

    expect(container.querySelector('[data-project-field]')).not.toBeInTheDocument()
    expect(container.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()

    expect(screen.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Baseline' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Selected' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Local' })).toBeVisible()
    expect(screen.getByText('Repository audit · 21 August 2026')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Marketplace repository (opens in a new tab)' })).toHaveAttribute('href', 'https://github.com/HarleyBartles/agent-asset-marketplace')
    expect(screen.getByRole('link', { name: 'Inspect the public source (opens in a new tab)' })).toHaveAttribute('href', 'https://github.com/HarleyBartles/agent-asset-marketplace')
    expect(screen.getByRole('link', { name: 'Read the repo-standards skill (opens in a new tab)' })).toHaveAttribute('href', expect.stringContaining('/codex-marketplace/plugins/repo-worker-pack/skills/repo-standards/SKILL.md'))
    expect(screen.getByText(/first-party operating model/i)).toBeVisible()
    expect(screen.getByText('Curation over accumulation')).toBeVisible()
    expect(screen.getByText('Source separate from installed copies')).toBeVisible()
    expect(screen.getByText('Wild Bunch')).toBeVisible()
    expect(screen.getByText(/no mcp-usage-pack selection/i)).toBeVisible()

    const map = screen.getByRole('figure', { name: /Selective distribution map/ })
    const model = screen.getByRole('region', { name: 'Three-layer operating model' })
    expect(map.compareDocumentPosition(model) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  test('uses the shared case-study hierarchy for prose-led sections', () => {
    render(<MarketplaceCaseStudy />)

    ;[
      'When repeated instruction becomes infrastructure',
      'One skill, a local overlay, and a checkable workflow',
      'Used, pinned, and still evolving',
    ].forEach((name) => {
      const heading = screen.getByRole('heading', { level: 2, name })
      expect(heading.closest('.case-study-lead')).not.toBeNull()
      expect(heading.closest('.case-study-lead')?.querySelector('.case-study-lead__body')).not.toBeNull()
    })
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import marketplaceEvidence from '../../../data/case-studies/marketplace-evidence.json'
import { MarketplaceDistributionMap } from './MarketplaceDistributionMap'

describe('MarketplaceDistributionMap', () => {
  test('keeps the dated distribution audit legible in semantic source order', () => {
    render(<MarketplaceDistributionMap />)

    expect(screen.getByRole('figure', { name: /selective distribution map/i })).toBeVisible()
    expect(screen.getByText('Marketplace source')).toBeVisible()
    expect(screen.getByText('repo-worker-pack')).toBeVisible()
    expect(screen.getByText('superpowers-plus')).toBeVisible()
    expect(screen.getByText('mcp-usage-pack')).toBeVisible()
    expect(screen.getByText('architecture-pack')).toBeVisible()
    expect(screen.getByText('dotnet-pack')).toBeVisible()
    expect(screen.getByText('Portfolio')).toBeVisible()
    expect(screen.getByText('Adventures of Patch')).toBeVisible()
    expect(screen.getByText('Wild Bunch')).toBeVisible()
    expect(screen.getByText(/different Marketplace revisions/i)).toBeVisible()
    expect(screen.getByText('be69c86')).toBeVisible()
    expect(screen.getByText('d4b1711')).toBeVisible()
    expect(screen.getByText(/no mcp-usage-pack selection/i)).toBeVisible()
  })

  test('does not publish the editorially excluded consumer identity in Marketplace evidence or presentation', () => {
    const { container } = render(<MarketplaceDistributionMap />)

    expect(JSON.stringify(marketplaceEvidence)).not.toMatch(/rooms[ -]?mostly/i)
    expect(container.innerHTML).not.toMatch(/rooms[ -]?mostly/i)
  })
})

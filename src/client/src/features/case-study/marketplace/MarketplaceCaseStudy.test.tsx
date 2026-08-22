import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MarketplaceCaseStudy } from './MarketplaceCaseStudy'

describe('MarketplaceCaseStudy', () => {
  test('tells the approved operating model and dated audit story in source order', () => {
    render(<MarketplaceCaseStudy />)

    expect(screen.getByText('Shared where reuse earns it. Local where context matters.')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Baseline' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Selected' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Local' })).toBeVisible()
    expect(screen.getByText('Repository audit · 21 August 2026')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Marketplace repository' })).toHaveAttribute('href', 'https://github.com/HarleyBartles/agent-asset-marketplace')
    expect(screen.getByText('Curation over accumulation')).toBeVisible()
    expect(screen.getByText('Source separate from installed copies')).toBeVisible()
    expect(screen.getByText(/Wild Bunch — game-studio/)).toBeVisible()
  })
})

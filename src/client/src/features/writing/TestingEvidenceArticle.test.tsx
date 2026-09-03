import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { TestingEvidenceArticle } from './TestingEvidenceArticle'

const markdown = `Opening argument.

## Prose can still be tested

A skill is prose. I still test what it makes an agent do.

**Observe RED.** Expose the bad behaviour.

**Earn GREEN.** Rerun the same scenario.

**Assume staleness.** Ask the question again when the environment changes.

## Green only earns the confidence it earned

Closing argument.`

describe('TestingEvidenceArticle', () => {
  test('presents the agentic application as a semantic side lens without disturbing reading order', () => {
    render(
      <PortfolioThemeProvider>
        <TestingEvidenceArticle markdown={markdown} />
      </PortfolioThemeProvider>,
    )

    const aside = screen.getByRole('complementary', { name: 'Prose can still be tested' })

    expect(screen.getByText('Opening argument.').compareDocumentPosition(aside) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(aside).getByText('Applied to agentic systems')).toBeVisible()
    expect(within(aside).getByText('A skill is prose. I still test what it makes an agent do.')).toBeVisible()
    expect(within(aside).getByText('Observe RED.')).toBeVisible()
    expect(within(aside).getByText('Earn GREEN.')).toBeVisible()
    expect(within(aside).getByText('Assume staleness.')).toBeVisible()
    expect(aside.compareDocumentPosition(screen.getByRole('heading', { level: 2, name: 'Green only earns the confidence it earned' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getAllByRole('heading', { level: 2, name: 'Prose can still be tested' })).toHaveLength(1)
  })
})

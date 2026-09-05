import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { PortfolioThemeProvider } from '../../components'
import { UseSuperpowersArticle } from './UseSuperpowersArticle'

const markdown = `Opening argument.

## The rest of superpowers-plus

Superpowers already asked clarifying questions during brainstorming.

> **When “most capable” changes overnight**
>
> A model release can change what a relative instruction means without anyone editing the instruction. My model-selection rule made that visible to me this morning.
>
> Optional body with an [internal route](/projects/codex-marketplace).
>
> You don’t need my plugin to make that decision. One local instruction may be enough.

The Astra question is only one part of a wider audit: what should change when the frontier moves, and what should stay stable for the models already doing the work.`

describe('UseSuperpowersArticle', () => {
  test('keeps the Astra disclosure closed with only its title and précis visible', () => {
    render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <UseSuperpowersArticle markdown={markdown} />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    const disclosure = document.querySelector('[data-editorial-aside-disclosure]') as HTMLDetailsElement
    const optionalBody = disclosure.querySelector('[data-prose-treatment="editorial-aside"]') as HTMLElement
    expect(disclosure).not.toHaveAttribute('open')
    expect(disclosure.closest('[data-editorial-aside]')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'When “most capable” changes overnight' })).toBeVisible()
    expect(screen.getByText('A model release can change what a relative instruction means without anyone editing the instruction. My model-selection rule made that visible to me this morning.')).toBeVisible()
    expect(screen.getByText('Read the Astra audit')).toBeVisible()
    expect(optionalBody).not.toBeVisible()
    expect(screen.getByText('Opening argument.')).toBeVisible()
    expect(screen.getByText('The Astra question is only one part of a wider audit: what should change when the frontier moves, and what should stay stable for the models already doing the work.')).toBeVisible()
  })

  test('keeps the complete optional body behind the native summary', () => {
    render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <UseSuperpowersArticle markdown={markdown} />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    const summary = screen.getByText('Read the Astra audit').closest('summary') as HTMLElement
    const optionalBody = summary.closest('details')?.querySelector('[data-prose-treatment="editorial-aside"]') as HTMLElement
    const disclosure = summary.closest('details') as HTMLDetailsElement
    expect(summary).toBeVisible()
    expect(disclosure).not.toHaveAttribute('open')
    expect(optionalBody).toHaveTextContent('Optional body with an internal route.')
    expect(screen.getByRole('link', { name: 'internal route' })).toHaveAttribute('href', '/projects/codex-marketplace')
    expect(optionalBody).toHaveTextContent('You don’t need my plugin to make that decision. One local instruction may be enough.')
  })

  test('falls back to ordinary article prose without losing copy when the split is absent', () => {
    render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <UseSuperpowersArticle markdown="Fallback copy remains here." />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    expect(screen.getByText('Fallback copy remains here.')).toBeVisible()
    expect(document.querySelector('details')).toBeNull()
  })
})

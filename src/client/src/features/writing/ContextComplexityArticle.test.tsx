import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { ContextComplexityArticle } from './ContextComplexityArticle'

const markdown = `Opening argument.

## The organisation around the novel

The main story continues.

:::figure organisation
visual: agent-organisation-overhead
description: Will oversees Rooms and Patch.
caption: The reporting lines across both projects.
layout: wide
:::end-figure

:::aside packaged-organisation
title: The packaged organisation
eyebrow: Same abstraction, different bill
standfirst: My hand-rolled version charged repository complexity.
disclosure: Read the WorkClaw experiment

The WorkClaw experiment stands alone.
:::end-aside

:::pullquote
The novel needed research, world-building and writing.
:::end-pullquote

The main argument does not depend on the aside.`

describe('ContextComplexityArticle', () => {
  test('keeps WorkClaw available as a collapsed optional case study without breaking the main argument', () => {
    render(
      <PortfolioThemeProvider>
        <ContextComplexityArticle markdown={markdown} />
      </PortfolioThemeProvider>,
    )

    const aside = screen.getByRole('complementary', { name: 'The packaged organisation' })
    const disclosure = within(aside).getByText('Read the WorkClaw experiment').closest('details')

    expect(aside).toHaveAttribute('data-editorial-aside')
    expect(disclosure).toHaveAttribute('data-editorial-aside-disclosure')
    expect(screen.getByText('The main story continues.').compareDocumentPosition(aside) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(aside).getByText('Same abstraction, different bill')).toBeVisible()
    expect(within(aside).getByText(/hand-rolled version charged repository complexity/i)).toBeVisible()
    expect(disclosure).not.toHaveAttribute('open')

    fireEvent.click(within(aside).getByText('Read the WorkClaw experiment'))

    expect(disclosure).toHaveAttribute('open')
    expect(within(aside).getByText('The WorkClaw experiment stands alone.')).toBeInTheDocument()
    expect(aside.compareDocumentPosition(screen.getByText('The main argument does not depend on the aside.')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText('The novel needed research, world-building and writing.').closest('blockquote')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 2, name: 'I tried the packaged version' })).not.toBeInTheDocument()
  })
})

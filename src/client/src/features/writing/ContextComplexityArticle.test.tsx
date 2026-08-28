import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ContextComplexityArticle } from './ContextComplexityArticle'

const markdown = `Opening argument.

## The organisation around the novel

The main story continues.

## I tried the packaged version

The WorkClaw experiment stands alone.

## A role is not a sign on the wall

The main argument does not depend on the aside.`

describe('ContextComplexityArticle', () => {
  test('keeps WorkClaw available as a collapsed optional case study without breaking the main argument', () => {
    render(<ContextComplexityArticle markdown={markdown} />)

    const aside = screen.getByRole('complementary', { name: 'The packaged organisation' })
    const disclosure = within(aside).getByText('Read the WorkClaw experiment').closest('details')

    expect(screen.getByText('The main story continues.').compareDocumentPosition(aside) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(aside).getByText('Same abstraction, different bill')).toBeVisible()
    expect(within(aside).getByText(/hand-rolled version charged repository complexity/i)).toBeVisible()
    expect(disclosure).not.toHaveAttribute('open')

    fireEvent.click(within(aside).getByText('Read the WorkClaw experiment'))

    expect(disclosure).toHaveAttribute('open')
    expect(within(aside).getByText('The WorkClaw experiment stands alone.')).toBeInTheDocument()
    expect(aside.compareDocumentPosition(screen.getByRole('heading', { level: 2, name: 'A role is not a sign on the wall' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 2, name: 'I tried the packaged version' })).not.toBeInTheDocument()
  })
})

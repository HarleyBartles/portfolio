import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ProductOwnershipArticle } from './ProductOwnershipArticle'

const markdown = `Opening argument.

## SQL was my weak point

I learned enough to ask a useful question.

## No dev is an island

Middle argument.

## The webhook wasn’t early

The consumer expected a different order.

### Proving it isn’t our bug doesn’t mean we’re done

The unresolved question still belonged to us.

## The bit before the code

Closing argument.`

describe('ProductOwnershipArticle', () => {
  test('keeps both supporting stories available as semantic disclosures in reading order', () => {
    render(<ProductOwnershipArticle markdown={markdown} />)

    const sqlAside = screen.getByRole('complementary', { name: 'SQL was my weak point' })
    const sqlDisclosure = within(sqlAside).getByText('The interview and the incident').closest('details')
    const webhookAside = screen.getByRole('complementary', { name: 'The webhook wasn’t early' })
    const webhookDisclosure = within(webhookAside).getByText('Follow both signals').closest('details')

    expect(screen.getByText('Opening argument.').compareDocumentPosition(sqlAside) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(sqlAside).getByText('One problem, two mistakes')).toBeVisible()
    expect(within(sqlAside).getByText(/several-minute operation into a couple of seconds/)).toBeVisible()
    expect(sqlDisclosure).not.toHaveAttribute('open')
    fireEvent.click(within(sqlAside).getByText('The interview and the incident'))
    expect(sqlDisclosure).toHaveAttribute('open')
    expect(within(sqlAside).getByText('I learned enough to ask a useful question.')).toBeInTheDocument()
    expect(sqlAside.compareDocumentPosition(screen.getByRole('heading', { level: 2, name: 'No dev is an island' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    expect(within(webhookAside).getByText('Three systems, one assumption')).toBeVisible()
    expect(within(webhookAside).getByText('No ordering guarantee between paths')).toBeVisible()
    expect(webhookDisclosure).not.toHaveAttribute('open')
    fireEvent.click(within(webhookAside).getByText('Follow both signals'))
    expect(webhookDisclosure).toHaveAttribute('open')
    expect(within(webhookAside).getByText('The consumer expected a different order.')).toBeInTheDocument()
    expect(within(webhookAside).getByRole('heading', { level: 3, name: 'Proving it isn’t our bug doesn’t mean we’re done' })).toBeInTheDocument()
    expect(within(webhookAside).getByText('The unresolved question still belonged to us.')).toBeInTheDocument()
    expect(webhookAside.compareDocumentPosition(screen.getByRole('heading', { level: 2, name: 'The bit before the code' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    expect(screen.getAllByRole('heading', { level: 2, name: 'SQL was my weak point' })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2, name: 'The webhook wasn’t early' })).toHaveLength(1)
  })
})

import { render, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { WhyAdrsFigure } from './WhyAdrsFigure'

describe('WhyAdrsFigure', () => {
  test('renders decision history as reusable evidence for a later engineer', () => {
    const { container } = render(<WhyAdrsFigure />)
    const figure = container.querySelector('figure')

    expect(figure).not.toBeNull()
    expect(figure).toHaveAccessibleDescription('A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.')

    const diagram = within(figure as HTMLElement)
    expect(diagram.getByRole('heading', { level: 2, name: 'At the decision' })).toBeVisible()
    expect(diagram.getByRole('heading', { level: 2, name: 'Decision record' })).toBeVisible()
    expect(diagram.getByRole('heading', { level: 2, name: 'With the next engineer' })).toBeVisible()
    expect(diagram.getByLabelText('Decision inputs')).toHaveTextContent('ContextRoutesEvidence')
    expect(diagram.getByText('Rejected routes keep their evidence')).toBeVisible()
    expect(diagram.getByText('Reconsider when the facts change')).toBeVisible()
  })
})

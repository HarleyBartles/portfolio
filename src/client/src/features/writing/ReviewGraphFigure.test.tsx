import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ReviewGraphFigure } from './ReviewGraphFigure'

describe('ReviewGraphFigure', () => {
  test('renders the selected v1 loop as a readable captured graph rather than another abstract card diagram', () => {
    render(<ReviewGraphFigure />)

    const figure = screen.getByRole('figure')
    expect(figure).toHaveAccessibleDescription('A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.')
    expect(screen.getByRole('heading', { level: 2, name: 'The loop inside the loop' })).toBeVisible()
    expect(screen.getByRole('img', { name: /version-one iterative-review graph/i })).toHaveAttribute('src', '/images/writing/review-graph-v1.svg')
  })
})

import { render, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { VibeCodingFigure } from './VibeCodingFigure'

describe('VibeCodingFigure', () => {
  test('renders the door-to-road argument as a semantic figure in reading order', () => {
    const { container } = render(<VibeCodingFigure />)

    const figure = container.querySelector('figure')
    expect(figure).not.toBeNull()
    expect(figure).toHaveAccessibleDescription('Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.')

    const diagram = within(figure as HTMLElement)
    const door = diagram.getByRole('heading', { level: 2, name: 'The door opens' })
    const threshold = diagram.getByText('Working demo')
    const road = diagram.getByRole('heading', { level: 2, name: 'The long road' })
    const releases = diagram.getByText('Hundredth release')

    expect(door.compareDocumentPosition(threshold) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(threshold.compareDocumentPosition(road) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(road.compareDocumentPosition(releases) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(diagram.getByText('An idea becomes clickable.')).toBeVisible()
    expect(diagram.getByText('Engineering takes responsibility for what happens after.')).toBeVisible()
    expect(diagram.getByText('First draft')).toBeVisible()
    expect(diagram.getByText('Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.')).toBeVisible()
    expect(diagram.getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'edge cases',
      'state',
      'error paths',
      'migrations',
      'observability',
      'security',
      'access control',
    ])
  })
})

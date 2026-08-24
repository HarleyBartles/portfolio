import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { TournamentPage } from './TournamentPage'

describe('Tournament of Reasonable Defaults', () => {
  test('preserves the four-event progression, outcomes and honest development boundary', () => {
    render(<MemoryRouter><TournamentPage /></MemoryRouter>)

    expect(screen.getByText('Visual development')).toBeVisible()
    expect(screen.getByText(/current adventure is assembled from accepted scene art/i)).toBeVisible()

    const events = screen.getAllByRole('article')
    expect(events).toHaveLength(4)
    expect(events.map((event) => within(event).getByRole('heading', { level: 2 }).textContent)).toEqual([
      'The Seven-Day Sprint',
      'The Industry Standard High Jump',
      'The Maze of Reasonable Defaults',
      'The Long Course',
    ])

    expect(events[0]).toHaveTextContent('the last 7 days')
    expect(events[0]).toHaveTextContent('A clear start can hide an undefined finish.')
    expect(events[0]).toHaveTextContent('No medal')

    expect(events[1]).toHaveTextContent('Clear the industry standard')
    expect(events[1]).toHaveTextContent('Name the standard before asking an agent to clear it.')
    expect(events[1]).toHaveTextContent('No medal')

    expect(events[2]).toHaveTextContent('Get to the exit with the prize')
    expect(events[2]).toHaveTextContent('three other plausible prizes')
    expect(events[2]).toHaveTextContent('Bronze')
    expect(events[2]).toHaveTextContent('The first valid answer can still conceal an unresolved choice.')

    expect(events[3]).toHaveTextContent('Cross the finish line')
    expect(events[3]).toHaveTextContent('acceptance condition')
    expect(events[3]).toHaveTextContent('Gold')
    expect(events[3]).toHaveTextContent('Completion becomes valid when the finish line and acceptance condition are agreed.')

    expect(screen.getByRole('link', { name: /engineering case study/i })).toHaveAttribute('href', '/projects/adventures-of-patch')
  })
})

import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

describe('Wild Bunch event flow contract', () => {
  test('makes the event path an ordered application trace rather than a broker topology', () => {
    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><WildBunchCaseStudy /></MemoryRouter>)

    const figure = screen.getByRole('figure', { name: 'Ordered event history from action to reconstruction' })
    expect(within(figure).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      expect.stringContaining('Player action'),
      expect.stringContaining('Command and handler'),
      expect.stringContaining('GameSession aggregate'),
      expect.stringContaining('Typed domain event'),
      expect.stringContaining('Append-only event stream'),
      expect.stringContaining('Projection'),
      expect.stringContaining('Reconstruction'),
    ])
    expect(within(figure).getByText(/No message broker sits between these steps/i)).toBeVisible()
    expect(within(figure).getByText(/snapshots are shortcut caches; ordered events remain the recovery route/i)).toBeVisible()
  })
})

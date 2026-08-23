import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

describe('Wild Bunch determinism figure contract', () => {
  test('keeps the UUID world contract distinct from downstream choices in ordered semantic evidence', () => {
    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><WildBunchCaseStudy /></MemoryRouter>)

    const figure = screen.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
    const stages = within(figure).getAllByRole('listitem')
    expect(stages).toHaveLength(4)

    expect(within(stages[0]).getByText('Directly packed world contract')).toBeVisible()
    expect(within(stages[0]).getByText('00000000-0000-0000-0000-000000000000')).toBeVisible()
    expect(within(stages[0]).getByText(/33 directly packed UUID bits/i)).toBeVisible()
    expect(within(stages[0]).getByText(/95 reserved bits/i)).toBeVisible()

    expect(within(stages[1]).getByText('Separate downstream choices')).toBeVisible()
    expect(within(stages[1]).getByText(/Difficulty, entropy \/ salt policy, and the player-selected starting town and actions/i)).toBeVisible()
    expect(within(stages[1]).getByText(/None of these choices occupies a UUID field/i)).toBeVisible()

    expect(within(stages[2]).getByText('Deterministic derivation')).toBeVisible()
    expect(within(stages[2]).getByText(/deterministic shuffle of the 40-name pool/i)).toBeVisible()
    expect(within(stages[2]).getByText(/connected world graph, route distances, town identity, and stored town layout/i)).toBeVisible()

    expect(within(stages[3]).getByText('Observable outcomes')).toBeVisible()
    expect(within(stages[3]).getByText(/Boring is the bounded same seed, difficulty, policy, and ordered player-action contract/i)).toBeVisible()
    expect(within(stages[3]).getByText(/tests, replay, and diagnosis/i)).toBeVisible()
  })
})

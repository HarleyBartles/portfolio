import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { WildBunchCaseStudy } from './WildBunchCaseStudy'

describe('Wild Bunch determinism figure contract', () => {
  test('keeps the UUID world contract distinct from downstream choices in ordered semantic evidence', () => {
    render(<MemoryRouter basename="/portfolio" initialEntries={['/portfolio/projects/wild-bunch']}><WildBunchCaseStudy /></MemoryRouter>)

    const figure = screen.getByRole('figure', { name: 'Controlled determinism from a compact world contract' })
    const stages = Array.from(figure.querySelectorAll<HTMLElement>(':scope > ol > li'))
    expect(stages).toHaveLength(4)

    expect(within(stages[0]).getByText('Directly packed world contract')).toBeVisible()
    const allocation = within(stages[0]).getByRole('group', { name: 'Resolver version 17 UUID bit allocation' })
    expect(allocation).toHaveTextContent('00000000-0000-0000-0000-00012ed0a54e')
    expect(Array.from(allocation.querySelectorAll('[data-codec-field] code')).map((field) => field.textContent)).toEqual(['[9]', '[1]', '[1]', '[2]', '[6]', '[4]', '[2]', '[9]', '[5]', '[3]', '[2]'])
    expect(within(allocation).getByText('layout topology')).toBeVisible()
    expect(within(allocation).getByText('town profile')).toBeVisible()
    expect(within(allocation).getByText('case setup')).toBeVisible()
    expect(within(stages[0]).getByText(/33 directly packed UUID bits/i)).toBeVisible()
    expect(within(stages[0]).getAllByText(/95 reserved bits/i)).toHaveLength(2)

    expect(within(stages[1]).getByText('Separate downstream choices')).toBeVisible()
    expect(within(stages[1]).getByText(/Difficulty, entropy policy, starting town and player actions remain separate inputs/i)).toBeVisible()
    expect(within(stages[1]).getByText(/None occupies a UUID field/i)).toBeVisible()

    expect(within(stages[2]).getByText('Deterministic derivation')).toBeVisible()
    expect(within(stages[2]).getByText(/deterministic shuffle of the 40-name pool/i)).toBeVisible()
    expect(within(stages[2]).getByText(/connected world graph, route distances, town identities and stored layouts/i)).toBeVisible()

    expect(within(stages[3]).getByText('Observable outcomes')).toBeVisible()
    expect(within(stages[3]).getByText(/Under Boring, the same seed, difficulty and ordered player actions produce the same outcome/i)).toBeVisible()
    expect(within(stages[3]).getByText(/Tests, replay and diagnosis/i)).toBeVisible()
  })
})

import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchProductionFlow } from './PatchProductionFlow'

describe('PatchProductionFlow', () => {
  test('renders the six production stages as an ordered, inspectable flow', () => {
    render(<PatchProductionFlow />)

    const flow = screen.getByRole('list', { name: 'Patch production flow' })
    const stages = within(flow).getAllByRole('listitem')
    expect(stages).toHaveLength(6)
    expect(stages.map((stage) => within(stage).getByRole('heading').textContent)).toEqual([
      'Seed',
      'Frame',
      'Visual pre-production',
      'Image generation and QA',
      'Deterministic compilation',
      'Published artefact and receipt',
    ])

    stages.forEach((stage) => {
      expect(within(stage).getByText('Input')).toBeVisible()
      expect(within(stage).getByText('Decision')).toBeVisible()
      expect(within(stage).getByText('Output')).toBeVisible()
      expect(within(stage).getByText('Stop condition')).toBeVisible()
    })

    expect(within(stages[3]).getByText('Generation')).toBeVisible()
    expect(within(stages[3]).getByText('Acceptance')).toBeVisible()
  })
})

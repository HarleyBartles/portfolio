import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LabPromotionFlow } from './LabPromotionFlow'

describe('LabPromotionFlow', () => {
  test('shows how a roadmap idea earns mature-lab status', () => {
    const { container } = render(<LabPromotionFlow />)
    const stages = screen.getAllByRole('listitem')
    expect(stages.map((stage) => stage.querySelector('h3')?.textContent)).toEqual([
      'Roadmap module',
      'Learning pressure and dependencies',
      'Facilitator choreography',
      'Learner cards and progressive disclosure',
      'Bounded worker environment and safety controls',
      'Mature lab with recovery and handoff',
    ])
    for (const stage of stages) {
      expect(stage).toHaveTextContent(/question/i)
      expect(stage).toHaveTextContent(/output/i)
    }
    expect(container).toHaveTextContent(/mature means ready to run and learn from, not finished forever/i)
  })
})

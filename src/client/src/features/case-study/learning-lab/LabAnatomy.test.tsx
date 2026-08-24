import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LabAnatomy } from './LabAnatomy'

describe('LabAnatomy', () => {
  test('separates facilitator choreography, learner judgment, and worker context', () => {
    const { container } = render(<LabAnatomy />)
    const regions = screen.getAllByRole('region').filter((region) => region.hasAttribute('aria-label'))
    expect(regions.map((region) => region.getAttribute('aria-label'))).toEqual(['Facilitator', 'Learner', 'Worker environment'])
    expect(regions[0]).toHaveTextContent(/rationale|setup|observations|fallbacks|deferments/i)
    expect(regions[1]).toHaveTextContent(/learner card|questions|judgment/i)
    expect(regions[2]).toHaveTextContent(/mission|project state|instructions|tools|permissions/i)
    expect(container).toHaveTextContent('Facilitator choreography is not worker context')
    expect(container).toHaveTextContent(/workspace scope.*permission enforcement/i)
  })
})

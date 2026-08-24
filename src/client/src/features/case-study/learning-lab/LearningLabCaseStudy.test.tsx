import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LearningLabCaseStudy } from './LearningLabCaseStudy'

describe('LearningLabCaseStudy', () => {
  test('opens with engineering lineage and preserves the bounded human origin', () => {
    const { container } = render(<LearningLabCaseStudy />)
    expect(screen.getByRole('heading', { level: 2, name: 'Engineering judgement, made teachable' })).toBeVisible()
    expect(screen.getByText(/The learner is not the agent's hands/)).toBeVisible()
    expect(screen.getByText(/I'm going to teach my brother a few things about using agentic AI/)).toBeVisible()
    expect(container.textContent?.match(/a love letter to my brother/g)).toHaveLength(1)
    expect(container).not.toHaveTextContent(/tested with real learners/i)
  })
})

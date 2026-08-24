import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LearningLabCaseStudy } from './LearningLabCaseStudy'

describe('LearningLabCaseStudy', () => {
  test('opens with engineering lineage and preserves the bounded human origin', () => {
    const { container } = render(<LearningLabCaseStudy />)
    expect(screen.getByRole('heading', { level: 2, name: 'Experience made transferable' })).toBeVisible()
    expect(screen.getByText(/The learner is not the agent's hands/)).toBeVisible()
    expect(screen.getByText(/I'm going to teach my brother a few things about using agentic AI/)).toBeVisible()
    expect(container.textContent?.match(/a love letter to my brother/g)).toHaveLength(1)
    expect(container).not.toHaveTextContent(/tested with real learners/i)
  })

  test('closes with honest evidence and bounded public claims', () => {
    const { container } = render(<LearningLabCaseStudy />)
    expect(container.textContent?.match(/I'm going to teach my brother a few things about using agentic AI/g)).toHaveLength(1)
    expect(container.textContent?.match(/a love letter to my brother/g)).toHaveLength(1)
    expect(container.textContent?.match(/I was a software engineer before I became an agentic engineer\./g)).toHaveLength(1)
    expect(container.textContent?.match(/The method built the method/g)).toHaveLength(1)
    expect(screen.getByText(/First live delivery planned for late August 2026/)).toBeVisible()
    expect(screen.getByText(/315442b/)).toBeVisible()
    expect(screen.getByRole('link', { name: /view the public repository/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /inspect the integrity run/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /CC BY 4.0 curriculum licence/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /MIT tooling licence/i })).toBeVisible()
    expect(container).toHaveTextContent(/cloud.*local/i)
    expect(container).not.toHaveTextContent(/tested with real learners|testimonial|completion rate|cutting edge|chain of thought/i)
  })
})

import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CurriculumAtlas } from './CurriculumAtlas'

describe('CurriculumAtlas', () => {
  test('renders three ordered course folios and all nineteen labelled entries', () => {
    const { container } = render(<CurriculumAtlas />)
    const courses = Array.from(container.querySelectorAll<HTMLElement>('.learning-atlas__course'))
    expect(courses).toHaveLength(3)
    expect(screen.getAllByText('Mature lab')).toHaveLength(10)
    expect(screen.getAllByText('Roadmap module')).toHaveLength(9)
    expect(container.querySelectorAll('.learning-atlas__module')).toHaveLength(19)
    expect(within(courses[1]).getAllByText(/^14A$/)).toHaveLength(1)
    expect(screen.getByText(/Snapshot inspected 24 August 2026/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /inspect the pinned curriculum shape/i })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/agentic-learning-lab/tree/315442bd2661bbc99a0834e57ff5f500b549326c/docs/curriculum-shape.md',
    )
    expect(container).not.toHaveTextContent(/percent|velocity|completion date|credential/i)
  })
})

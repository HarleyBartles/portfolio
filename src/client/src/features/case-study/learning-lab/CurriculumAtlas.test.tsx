import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CurriculumAtlas } from './CurriculumAtlas'

describe('CurriculumAtlas', () => {
  test('renders three ordered course folios and interprets all nineteen entries', () => {
    const { container } = render(<CurriculumAtlas />)
    const courses = Array.from(container.querySelectorAll<HTMLElement>('.learning-atlas__course'))
    expect(courses).toHaveLength(3)
    expect(within(courses[0]).getByText('Complete')).toBeVisible()
    expect(within(courses[1]).getByText('Substantially planned')).toBeVisible()
    expect(within(courses[2]).getByText('Early outline')).toBeVisible()
    expect(container.querySelectorAll('.learning-atlas__module')).toHaveLength(19)
    expect(container.querySelectorAll('.learning-atlas__modules')).toHaveLength(2)
    expect(container.querySelectorAll('.learning-atlas__module-summary')).toHaveLength(19)
    expect(screen.queryByText('Mature lab')).not.toBeInTheDocument()
    expect(screen.queryByText('Roadmap module')).not.toBeInTheDocument()
    expect(screen.getByText(/Persist important decisions beyond the conversation/)).toBeVisible()
    expect(screen.getByText(/Make the cost of over-delegation/)).toBeVisible()
    expect(within(courses[1]).getAllByText(/^5$/)).toHaveLength(1)
    expect(within(courses[2]).getByText(/The course boundary is set\. Its detailed spine is still to come\./)).toBeVisible()
    expect(screen.getByText(/Snapshot inspected 25 August 2026/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /inspect the pinned curriculum shape/i })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/agentic-learning-lab/tree/3d8e92ceaebcbb67f0ede5bda95846da8e18b80d/docs/curriculum-shape.md',
    )
    expect(screen.getByRole('link', { name: /inspect the pinned Course 2 plan/i })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/agentic-learning-lab/tree/3d8e92ceaebcbb67f0ede5bda95846da8e18b80d/modules/course-2/README.md',
    )
    expect(container).not.toHaveTextContent(/percent|velocity|completion date|credential/i)
  })
})

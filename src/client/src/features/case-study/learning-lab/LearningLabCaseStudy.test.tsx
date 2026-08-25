import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { LearningLabCaseStudy } from './LearningLabCaseStudy'

describe('LearningLabCaseStudy', () => {
  test('opens with engineering lineage and preserves the bounded human origin', () => {
    const { container } = render(<LearningLabCaseStudy />)
    expect(screen.getByRole('heading', { level: 2, name: 'Experience made transferable' })).toBeVisible()
    expect(screen.getByText(/The learner is not the agent's hands/)).toBeVisible()
    expect(screen.getByText(/I'm going to teach my brother a few things about using agentic AI/)).toBeVisible()
    expect(screen.getByText(/I wrote those words at the start of the first curriculum-design conversation in August 2026/)).toBeVisible()
    expect(screen.getByText(/That conversation produced a repository on 15 August/)).toBeVisible()
    expect(screen.getByText('The next learner card')).toBeVisible()
    expect(screen.getByText(/supplies the questions needed now/)).toBeVisible()
    expect(container).not.toHaveTextContent(/Learner card \d+/)
    expect(container.textContent?.match(/a love letter to my brother/g)).toHaveLength(1)
    expect(container).not.toHaveTextContent(/tested with real learners/i)
  })

  test('closes with honest evidence and bounded public claims', () => {
    const { container } = render(<LearningLabCaseStudy />)
    expect(container.textContent?.match(/I'm going to teach my brother a few things about using agentic AI/g)).toHaveLength(1)
    expect(container.textContent?.match(/a love letter to my brother/g)).toHaveLength(1)
    expect(container.textContent?.match(/I was a software engineer before I became an agentic engineer\./g)).toHaveLength(1)
    expect(container.textContent?.match(/The method built the method/g)).toHaveLength(1)
    expect(screen.getByText(/The founding prompt left the learning plan open/)).toBeVisible()
    expect(screen.getByText(/I was writing the course while sitting partly in the learner's chair/)).toBeVisible()
    expect(screen.getByText(/First live delivery planned for late August 2026/)).toBeVisible()
    expect(screen.getByText(/Course 1 is complete\. Course 2 is substantially planned\. Course 3 is little more than an outline today\./)).toBeVisible()
    expect(screen.getByText(/3d8e92c/)).toBeVisible()
    expect(screen.getByRole('link', { name: /inspect the course-numbering change/i })).toHaveAttribute(
      'href',
      'https://github.com/HarleyBartles/agentic-learning-lab/pull/13',
    )
    expect(screen.getByRole('link', { name: /view the public repository/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /inspect the integrity run/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /read the licence policy/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /CC BY 4.0 curriculum licence/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /MIT tooling licence/i })).toBeVisible()
    expect(container).toHaveTextContent(/cloud.*local/i)
    expect(container).not.toHaveTextContent(/tested with real learners|testimonial|completion rate|cutting edge|chain of thought/i)
  })

  test('uses responsive concept art as evidence without rasterising the argument', () => {
    render(<LearningLabCaseStudy />)

    const image = screen.getByRole('img', { name: /fractured test piece remains inside a clear containment rig/i })
    expect(image).toHaveAttribute('src', '/media/learning-lab/safe-breakage-rig-mobile-720.webp')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '540')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
    expect(image.closest('picture')?.querySelectorAll('source')).toHaveLength(4)
    expect(screen.getByRole('heading', { name: /safe enough to learn by breaking things/i })).toBeVisible()
    expect(screen.getByText(/what is the blast radius/i)).toBeVisible()
  })
})

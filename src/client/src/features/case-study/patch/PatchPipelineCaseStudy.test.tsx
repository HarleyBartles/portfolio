import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PatchPipelineCaseStudy } from './PatchPipelineCaseStudy'

function renderCaseStudy() {
  render(<MemoryRouter><PatchPipelineCaseStudy /></MemoryRouter>)
}

describe('PatchPipelineCaseStudy', () => {
  test('keeps the complete approved outline in semantic source order', () => {
    renderCaseStudy()

    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'The day the database disappeared',
      'The first deck',
      'A story has to earn production',
      'The production system is the project',
      'The stories have their own home',
      'What reaches the public record',
      'Controlled creative production',
    ])
    expect(screen.getByText((_, element) => element?.tagName === 'P' && element.textContent?.includes('deleting a development database was a reasonable available action') === true)).toBeVisible()
    expect(screen.getByText(/made Club DB in a day/i)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Explore the Adventures of Patch' })).toHaveAttribute('href', '/patch')
    expect(screen.queryByRole('heading', { name: 'Three worlds in motion' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'What Patch might teach next' })).not.toBeInTheDocument()
  })

  test('keeps a compact project snapshot inside the complete authored case', () => {
    renderCaseStudy()

    const snapshot = screen.getByRole('region', { name: 'Project snapshot' })
    expect(document.querySelector('[data-project-field="production-evidence"]')).toBeInTheDocument()
    expect(snapshot).not.toHaveAttribute('data-project-field')
    expect(document.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()
    ;['Teaching', 'Production', 'Formats', 'Evidence'].forEach((label) => {
      expect(within(snapshot).getByText(label)).toBeVisible()
    })

    expect(screen.getByText(/I gave an agent an environment/i)).toBeVisible()
    expect(screen.getByText(/I made Club DB in a day/i)).toBeVisible()
    expect(screen.getByText(/I retain acceptance authority over every candidate a model produces/i)).toBeVisible()
    expect(screen.getByText(/I use Linear to shape and sequence work/i)).toBeVisible()
    expect(document.body.textContent).not.toMatch(/—|coming soon|content factory|production studio/i)
  })

  test('preserves the Patch lead hierarchy before full-width systems', () => {
    renderCaseStudy()

    const splitHeadings = [
      'The production system is the project',
      'The stories have their own home',
      'What reaches the public record',
      'Controlled creative production',
    ]

    splitHeadings.forEach((name) => {
      const heading = screen.getByRole('heading', { level: 2, name })
      const section = heading.closest('[data-patch-lead-composition]')
      expect(section).not.toBeNull()
      expect(section?.querySelector('[data-patch-lead-body]')).not.toBeNull()
    })
  })

  test('keeps the engineering article free of duplicated showcase catalogues', () => {
    renderCaseStudy()

    expect(screen.queryByText('Lawful Heist')).not.toBeInTheDocument()
    expect(screen.queryByText('Tournament of Reasonable Defaults')).not.toBeInTheDocument()
    expect(screen.queryByText('Identity Emporium')).not.toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Evidence gallery' })).not.toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Fairytale plans' })).not.toBeInTheDocument()

    expect(screen.queryByText(/PATCH-\d+/i)).not.toBeInTheDocument()
    expect(document.querySelector('.patch-section-number')).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

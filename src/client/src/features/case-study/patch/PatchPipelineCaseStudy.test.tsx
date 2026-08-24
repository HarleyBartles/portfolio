import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchPipelineCaseStudy } from './PatchPipelineCaseStudy'

describe('PatchPipelineCaseStudy', () => {
  test('keeps the accountable origin and controlled production story in source order', () => {
    render(<PatchPipelineCaseStudy />)

    expect(screen.getByText('The first deck explains why Patch exists. The production system and the adventures moving through it show what the project has become.')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'An accountable origin' })).toBeVisible()
    expect(screen.getByText(/environment in which an agent could delete a development database/i)).toBeVisible()
    expect(screen.getByText(/one day/i)).toBeVisible()
    expect(screen.getByRole('heading', { name: 'The frame gate' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Patch production flow' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Published artefacts' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'In-flight worlds' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Story lab' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Public proof, private workshop' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Controlled production' })).toBeVisible()
  })

  test('keeps published, in-flight, and story-lab boundaries public-safe', () => {
    render(<PatchPipelineCaseStudy />)

    const published = screen.getByRole('region', { name: 'Published artefacts' })
    const publishedLinks = within(published).getAllByRole('link')
    expect(publishedLinks).toHaveLength(4)
    publishedLinks.forEach((link) => expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\//)))

    const inFlight = screen.getByRole('region', { name: 'In-flight worlds' })
    const statuses = ['advanced-visual-preproduction', 'visual-development', 'legacy-reference']
    ;['Lawful Heist', 'Tournament of Reasonable Defaults', 'Identity Emporium'].forEach((world, index) => {
      const article = within(inFlight).getByRole('article', { name: world })
      expect(within(article).getByText('Lesson')).toBeVisible()
      expect(within(article).getByText('Current evidence')).toBeVisible()
      expect(within(article).getByText('Remaining work')).toBeVisible()
      expect(within(article).getByText('Status')).toBeVisible()
      expect(within(article).getByText(statuses[index], { exact: false })).toBeVisible()
    })

    const storyLab = screen.getByRole('region', { name: 'Story lab' })
    expect(within(storyLab).getByRole('list', { name: 'Fairytale lessons' })).toHaveTextContent('Preserve escalation signal.')
    expect(within(storyLab).getByRole('list', { name: 'Fairytale lessons' }).querySelectorAll('li')).toHaveLength(7)
    expect(within(storyLab).getByRole('list', { name: 'Archived adventure questions' }).querySelectorAll('li')).toHaveLength(4)
    expect(within(storyLab).queryAllByRole('link')).toHaveLength(0)

    expect(screen.queryByText(/Linear/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/PATCH-\d+/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

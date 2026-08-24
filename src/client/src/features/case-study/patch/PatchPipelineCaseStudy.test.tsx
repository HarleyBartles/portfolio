import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchPipelineCaseStudy } from './PatchPipelineCaseStudy'

describe('PatchPipelineCaseStudy', () => {
  test('keeps the complete approved outline in semantic source order', () => {
    render(<PatchPipelineCaseStudy />)

    expect(screen.getByText('The first deck explains why Patch exists. The production system and the adventures moving through it show what the project has become.')).toBeVisible()
    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      'The day the database disappeared',
      'The first deck',
      'A story has to earn production',
      'The production system is the project',
      'What has earned an artefact',
      'Three worlds in motion',
      'What Patch might teach next',
      'What reaches the public record',
      'Controlled creative production',
    ])
    expect(screen.getByText((_, element) => element?.tagName === 'P' && element.textContent?.includes('deleting a development database was a reasonable available action') === true)).toBeVisible()
    expect(screen.getByText(/made Club DB in a day/i)).toBeVisible()
    expect(within(screen.getByRole('region', { name: 'What has earned an artefact' })).getByRole('region', { name: 'Evidence gallery' })).toBeVisible()
  })

  test('opens with a compact project snapshot and a complete authored case', () => {
    render(<PatchPipelineCaseStudy />)

    const snapshot = screen.getByRole('region', { name: 'Project snapshot' })
    ;['Teaching', 'Production', 'Formats', 'Planning and delivery', 'Current state'].forEach((label) => {
      expect(within(snapshot).getByText(label)).toBeVisible()
    })
    expect(snapshot).toHaveTextContent(/one published origin deck/i)
    expect(snapshot).toHaveTextContent('two published fairytales')
    expect(snapshot).toHaveTextContent('three materially developed adventure worlds')
    expect(snapshot).toHaveTextContent('one gated idea library')

    expect(screen.getByText(/I gave an agent an environment/i)).toBeVisible()
    expect(screen.getByText(/I made Club DB in a day/i)).toBeVisible()
    expect(screen.getByText(/I retain acceptance authority over every candidate a model produces/i)).toBeVisible()
    expect(screen.getByText(/I use Linear to shape and sequence work/i)).toBeVisible()
    expect(document.body.textContent).not.toMatch(/—|coming soon|content factory|production studio/i)
  })

  test('keeps published, in-flight, and story-lab boundaries public-safe', () => {
    render(<PatchPipelineCaseStudy />)

    const published = screen.getByRole('region', { name: 'What has earned an artefact' })
    const publishedLinks = within(within(published).getByRole('list', { name: 'Published Patch artefacts' })).getAllByRole('link')
    expect(publishedLinks).toHaveLength(4)
    publishedLinks.forEach((link) => expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\//)))
    expect(within(within(published).getByRole('region', { name: 'Evidence gallery' })).getAllByRole('link')).toHaveLength(4)

    const inFlight = screen.getByRole('region', { name: 'Three worlds in motion' })
    const statuses = ['Advanced visual pre-production', 'Visual development', 'Legacy reference']
    ;['Lawful Heist', 'Tournament of Reasonable Defaults', 'Identity Emporium'].forEach((world, index) => {
      const article = within(inFlight).getByRole('article', { name: world })
      expect(article.querySelector('.patch-world__lesson')).toBeVisible()
      expect(within(article).getByText('Current evidence.')).toBeVisible()
      expect(within(article).getByText('What remains.')).toBeVisible()
      expect(within(article).getByText(statuses[index])).toBeVisible()
    })

    const storyLab = screen.getByRole('region', { name: 'What Patch might teach next' })
    expect(within(storyLab).getByRole('list', { name: 'Fairytale lessons' })).toHaveTextContent('Preserve escalation signal.')
    expect(within(storyLab).getByRole('list', { name: 'Fairytale lessons' }).querySelectorAll('li')).toHaveLength(7)
    expect(within(storyLab).getByRole('list', { name: 'Archived adventure questions' }).querySelectorAll('li')).toHaveLength(4)
    expect(within(storyLab).queryAllByRole('link')).toHaveLength(0)

    expect(screen.queryByText(/PATCH-\d+/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

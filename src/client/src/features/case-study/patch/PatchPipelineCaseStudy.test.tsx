import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PatchPipelineCaseStudy } from './PatchPipelineCaseStudy'

describe('PatchPipelineCaseStudy', () => {
  test('keeps the complete approved outline in semantic source order', () => {
    render(<PatchPipelineCaseStudy />)

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

  test('keeps a compact project snapshot inside the complete authored case', () => {
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

  test('uses the shared wide-screen lead hierarchy before full-width systems', () => {
    render(<PatchPipelineCaseStudy />)

    const splitHeadings = [
      'The production system is the project',
      'What has earned an artefact',
      'Three worlds in motion',
      'What Patch might teach next',
      'What reaches the public record',
      'Controlled creative production',
    ]

    splitHeadings.forEach((name) => {
      const heading = screen.getByRole('heading', { level: 2, name })
      expect(heading.closest('.case-study-lead')).not.toBeNull()
      expect(heading.closest('.case-study-lead')?.querySelector('.case-study-lead__body')).not.toBeNull()
    })
  })

  test('keeps published, in-flight, and story-lab boundaries public-safe', () => {
    render(<PatchPipelineCaseStudy />)

    const published = screen.getByRole('region', { name: 'What has earned an artefact' })
    const publishedLinks = within(within(published).getByRole('list', { name: 'Published Patch artefacts' })).getAllByRole('link')
    expect(publishedLinks).toHaveLength(4)
    publishedLinks.forEach((link) => expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\//)))
    expect(within(within(published).getByRole('region', { name: 'Evidence gallery' })).getAllByRole('link')).toHaveLength(4)

    const inFlight = screen.getByRole('region', { name: 'Three worlds in motion' })
    const statuses = ['Advanced visual pre-production', 'Visual development', 'Visual development']
    ;['Lawful Heist', 'Tournament of Reasonable Defaults', 'Identity Emporium'].forEach((world, index) => {
      const article = within(inFlight).getByRole('article', { name: world })
      expect(article.querySelector('.patch-world__lesson')).toBeVisible()
      expect(within(article).getByText('Current evidence.')).toBeVisible()
      expect(within(article).getByText('What remains.')).toBeVisible()
      expect(within(article).getByText(statuses[index])).toBeVisible()
    })
    expect(within(inFlight).getByRole('article', { name: 'Identity Emporium' })).toHaveTextContent(/four substantial Patch role kits/i)
    expect(within(inFlight).getByRole('article', { name: 'Identity Emporium' })).toHaveTextContent(/Bit and Bot/i)
    expect(within(inFlight).getByRole('article', { name: 'Identity Emporium' })).toHaveTextContent(/role and domain have to agree/i)
    const identityEvidence = within(inFlight).getByRole('figure', { name: /Identity Emporium combines role and domain/i })
    expect(within(identityEvidence).getAllByRole('img')).toHaveLength(7)
    expect(within(identityEvidence).getByRole('img', { name: /Bot in a cowboy role kit trying to lasso/i })).toBeVisible()
    expect(within(identityEvidence).getByRole('img', { name: /Bit carrying a toolbox/i })).toBeVisible()
    expect(identityEvidence).toHaveTextContent(/right kit, wrong domain/i)
    expect(identityEvidence).toHaveTextContent(/right domain, wrong kit/i)
    expect(identityEvidence).toHaveTextContent(/Bot[\s\S]*right kit, wrong domain/i)
    expect(identityEvidence).toHaveTextContent(/Bit[\s\S]*right domain, wrong kit/i)
    expect(within(identityEvidence).getAllByText(/all the gear, no idea/i)).toHaveLength(1)
    expect(within(identityEvidence).getAllByText(/no get-up, can't get down to work/i)).toHaveLength(1)
    expect(identityEvidence).toHaveTextContent(/prepared for the job/i)
    ;['Cowboy', 'Detective', 'Mechanic', 'Chef'].forEach((role) => expect(identityEvidence).toHaveTextContent(role))

    const storyLab = screen.getByRole('region', { name: 'What Patch might teach next' })
    const fairytalePlans = within(storyLab).getByRole('list', { name: 'Fairytale plans' })
    expect(fairytalePlans).toHaveTextContent('The Boy Who Cried Wolf')
    expect(fairytalePlans).toHaveTextContent('Preserve escalation signal.')
    expect(fairytalePlans.querySelectorAll('li')).toHaveLength(7)
    expect(fairytalePlans.querySelectorAll('li strong')).toHaveLength(7)
    expect(fairytalePlans.querySelectorAll('li span')).toHaveLength(7)
    const adventurePlans = within(storyLab).getByRole('list', { name: 'Adventure plans' })
    expect(adventurePlans.querySelectorAll('li')).toHaveLength(4)
    expect(adventurePlans.querySelectorAll('li strong')).toHaveLength(4)
    expect(adventurePlans.querySelectorAll('li span')).toHaveLength(4)
    expect(within(storyLab).queryAllByRole('link')).toHaveLength(0)

    expect(screen.queryByText(/PATCH-\d+/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

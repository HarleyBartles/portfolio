import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ProjectVisual } from './ProjectVisual'

describe('ProjectVisual', () => {
  test('pairs the semantic learning loop with responsive inspection imagery', () => {
    const { container } = render(<ProjectVisual slug="agentic-learning-lab" eager />)

    expect(container.querySelector('[data-visual-contract="learning-lab-loop"]')).not.toBeNull()
    expect(screen.getByText('Direct')).toBeVisible()
    expect(screen.getByText('Redirect')).toBeVisible()
    const image = screen.getByRole('img', { name: /hands inspect measured components and test evidence/i })
    expect(image).toHaveAttribute('src', '/media/learning-lab/engineering-control-workbench-mobile-720.webp')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '450')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(image.closest('picture')?.querySelectorAll('source')).toHaveLength(4)
    expect(container).not.toHaveTextContent(/venue plan/i)
  })

  test('summarises the Marketplace core with selected and local boundaries', () => {
    render(<ProjectVisual slug="codex-marketplace" />)

    expect(screen.getByText('repo-worker-pack')).toBeVisible()
    expect(screen.getByText('superpowers-plus')).toBeVisible()
    expect(screen.getByText('mcp-usage-pack')).toBeVisible()
    expect(screen.getByText('selected + local')).toBeVisible()
    expect(screen.getByText('17')).toBeVisible()
    expect(screen.getByText('74')).toBeVisible()
  })

  test('uses a responsive generated-town development-build preview instead of a reserved frame', () => {
    render(<ProjectVisual slug="wild-bunch" eager />)

    const visual = screen.getByLabelText('Wild Bunch generated-town development-build preview')
    const image = screen.getByRole('img', {
      name: /dustwell, one generated town in the seeded map-world/i,
    })

    expect(visual).toHaveAttribute('data-visual-contract', 'wild-bunch-development-build-preview')
    expect(visual).not.toHaveTextContent(/reserved frame|gameplay capture brief/i)
    expect(image).toHaveAttribute('src', '/media/wild-bunch/dustwell-town-720.webp')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '550')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(visual.querySelectorAll('picture source')).toHaveLength(4)
    expect(visual).toHaveTextContent(/Dustwell is one generated town in this seeded map-world. Its layout persists when the player leaves and returns/i)
  })

  test('uses the Introducing Patch composition for the project preview and route hero', () => {
    render(<ProjectVisual slug="adventures-of-patch" eager />)

    const image = screen.getByRole('img', { name: /Patch carries an index card and folded map/i })
    const picture = image.closest('picture')

    expect(image).toHaveAttribute('src', '/media/patch/patch-hero-720.webp')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '403')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(picture?.querySelectorAll('source')).toHaveLength(4)
    expect(picture).not.toHaveTextContent(/detective|cowboy|chef|mechanic/i)
  })

  test('owns the shared Wild Bunch preview treatment at its consumer import seam', () => {
    render(<ProjectVisual slug="wild-bunch" />)

    const visual = screen.getByLabelText('Wild Bunch generated-town development-build preview')
    const caption = visual.querySelector('figcaption')

    expect(getComputedStyle(visual).display).toBe('grid')
    expect(caption).not.toBeNull()
    expect(getComputedStyle(caption as HTMLElement).position).toBe('static')
  })
})

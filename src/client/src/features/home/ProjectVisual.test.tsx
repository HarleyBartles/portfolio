import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ProjectVisual } from './ProjectVisual'

describe('ProjectVisual', () => {
  test('summarises the Marketplace core with selected and local boundaries', () => {
    render(<ProjectVisual slug="codex-marketplace" />)

    expect(screen.getByText('repo-worker-pack')).toBeVisible()
    expect(screen.getByText('superpowers-plus')).toBeVisible()
    expect(screen.getByText('mcp-usage-pack')).toBeVisible()
    expect(screen.getByText('selected + local')).toBeVisible()
    expect(screen.getByText('17')).toBeVisible()
    expect(screen.getByText('74')).toBeVisible()
  })

  test('uses a responsive Dustwell development-build preview instead of a reserved frame', () => {
    render(<ProjectVisual slug="wild-bunch" eager />)

    const visual = screen.getByLabelText('Wild Bunch Dustwell development-build preview')
    const image = screen.getByRole('img', {
      name: /ranger vale in the dustwell town hub/i,
    })

    expect(visual).toHaveAttribute('data-visual-contract', 'wild-bunch-development-build-preview')
    expect(visual).not.toHaveTextContent(/reserved frame|gameplay capture brief/i)
    expect(image).toHaveAttribute('src', '/media/wild-bunch/dustwell-town-720.webp')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '550')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(visual.querySelectorAll('picture source')).toHaveLength(4)
    expect(visual).toHaveTextContent(/Dustwell establishes a playable town surface/i)
  })

  test('owns the shared Wild Bunch preview treatment at its consumer import seam', () => {
    render(<ProjectVisual slug="wild-bunch" />)

    const visual = screen.getByLabelText('Wild Bunch Dustwell development-build preview')
    const caption = visual.querySelector('figcaption')

    expect(getComputedStyle(visual).display).toBe('grid')
    expect(caption).not.toBeNull()
    expect(getComputedStyle(caption as HTMLElement).position).toBe('static')
  })
})

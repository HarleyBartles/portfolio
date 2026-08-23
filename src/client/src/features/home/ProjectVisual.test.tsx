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
})

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import type { ContentSummary } from '../types'
import { OrientationStrip } from './OrientationStrip'

const project: ContentSummary = {
  slug: 'marketplace', kind: 'project', title: 'Marketplace', status: 'published', summary: 'Reusable worker capabilities.', featured: true, tags: [], relatedSlugs: [],
}

const writing: ContentSummary = {
  slug: 'systems', kind: 'writing', title: 'Systems', status: 'published', summary: 'Evidence-led engineering.', featured: true, tags: [], relatedSlugs: [],
}

describe('OrientationStrip', () => {
  test('keeps the remaining portfolio orientation routes discoverable', () => {
    render(<MemoryRouter><OrientationStrip items={[project, writing]} /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Projects' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Writing and Notes' })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Experience' })).not.toBeInTheDocument()
  })
})

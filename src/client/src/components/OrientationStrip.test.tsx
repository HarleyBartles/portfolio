import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import type { ContentSummary } from '../types/content'
import { OrientationStrip } from './OrientationStrip'

const project: ContentSummary = {
  slug: 'marketplace', kind: 'project', title: 'Marketplace', status: 'published', summary: 'Reusable worker capabilities.', featured: true, tags: [], relatedSlugs: [],
}

const writing: ContentSummary = {
  slug: 'systems', kind: 'writing', title: 'Systems', status: 'published', summary: 'Evidence-led engineering.', featured: true, tags: [], relatedSlugs: [],
}

const legacyExperience = {
  slug: 'experience', kind: 'experience', title: 'Experience', status: 'published', summary: 'Legacy orientation content.', featured: false, tags: [], relatedSlugs: [],
} as unknown as ContentSummary

describe('OrientationStrip', () => {
  test('does not surface a legacy Experience item as an orientation route', () => {
    render(<MemoryRouter><OrientationStrip items={[project, legacyExperience, writing]} /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Projects' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Writing and Notes' })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Experience' })).not.toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { ProjectIndexEntry } from './ProjectIndexEntry'

test('renders a visual supplied by the project index page', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <ProjectIndexEntry
          index={0}
          item={{
            kind: 'project',
            slug: 'custom-project',
            title: 'Custom project',
            summary: 'A project summary.',
            date: '2026-01-01',
            status: 'live',
            featured: false,
            tags: [],
            relatedSlugs: [],
          }}
          visual={<span data-testid="project-visual">Visual</span>}
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByTestId('project-visual')).toBeInTheDocument()
})

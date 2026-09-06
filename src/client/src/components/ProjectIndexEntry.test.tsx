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

  const visual = screen.getByTestId('project-visual')
  expect(visual).toBeInTheDocument()
  expect(visual.closest('[data-visual-slot]')).toBeInTheDocument()
})

test('does not add a positional project label to the card', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <ProjectIndexEntry
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
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.queryByText(/Project$/)).not.toBeInTheDocument()
})

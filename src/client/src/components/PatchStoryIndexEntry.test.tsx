import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { PatchStoryIndexEntry } from './PatchStoryIndexEntry'

test('renders media supplied by the patch index page', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <PatchStoryIndexEntry
          index={0}
          item={{
            kind: 'patch',
            slug: 'custom-story',
            title: 'Custom story',
            summary: 'A story summary.',
            date: '2026-01-01',
            status: '',
            featured: false,
            tags: [],
            relatedSlugs: [],
          }}
          media={{ alt: 'Custom story artwork', folder: 'custom-story' }}
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('img', { name: 'Custom story artwork' })).toHaveAttribute('src', expect.stringContaining('/fairytales/custom-story/page-1200.webp'))
})

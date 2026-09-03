import { render, screen } from '@testing-library/react'
import type { ComponentProps } from 'react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { ContentHeader } from './ContentHeader'

function renderHeader(props: ComponentProps<typeof ContentHeader>) {
  return render(
    <PortfolioThemeProvider>
      <ContentHeader {...props} />
    </PortfolioThemeProvider>,
  )
}

test('renders the content hierarchy and optional slots in semantic order', () => {
  renderHeader({
    eyebrow: 'project',
    title: 'A public project',
    summary: 'A concise project proposition.',
    metadata: <span>September 2026</span>,
    status: <p data-testid="status">Status live</p>,
    visual: <div data-testid="visual">Evidence</div>,
    visualContract: 'project-hero',
    regionLabel: 'Project hero',
    register: 'site-sans',
  })

  expect(screen.getByRole('heading', { level: 1, name: 'A public project' })).toBeInTheDocument()
  expect(screen.getByText('project')).toBeInTheDocument()
  expect(screen.getByText('September 2026')).toBeInTheDocument()
  expect(screen.getByText('A concise project proposition.')).toBeInTheDocument()
  expect(screen.getByTestId('status')).toBeInTheDocument()
  expect(screen.getByTestId('visual')).toBeInTheDocument()
  expect(screen.getByRole('region', { name: 'Project hero' })).toHaveAttribute('data-visual-contract', 'project-hero')
  expect(screen.getByRole('region')).toHaveAttribute('data-type-register', 'site-sans')
  expect(screen.getByText('September 2026').compareDocumentPosition(screen.getByText('A concise project proposition.')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

test('does not render an empty metadata node', () => {
  renderHeader({
    eyebrow: 'writing',
    title: 'An article',
    summary: 'A reading proposition.',
    visualContract: 'article-header',
    register: 'article-serif',
  })

  expect(document.querySelector('.content-header__metadata')).toBeNull()
  expect(document.querySelector('[data-type-register="article-serif"]')).not.toBeNull()
})

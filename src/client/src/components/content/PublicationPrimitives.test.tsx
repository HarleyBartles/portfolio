import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import {
  ActionAnchor,
  ActionButton,
  ActionRouteLink,
  Eyebrow,
  IndexEntrySummary,
  IndexEntryTitle,
  MetadataRow,
  PageLead,
  PageTitle,
  SectionTitle,
} from './PublicationPrimitives'

test('exposes the shared publication hierarchy as semantic primitives', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <Eyebrow>Project</Eyebrow>
        <PageTitle register="site-sans">A project title</PageTitle>
        <PageTitle register="article-serif">An article title</PageTitle>
        <PageLead>A concise proposition.</PageLead>
        <IndexEntryTitle id="entry-title" to="/projects/example">An index entry</IndexEntryTitle>
        <IndexEntrySummary>A useful summary.</IndexEntrySummary>
        <SectionTitle>Related content</SectionTitle>
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByText('Project').tagName).toBe('P')
  expect(screen.getByRole('heading', { level: 1, name: 'A project title' })).toHaveAttribute('data-type-register', 'site-sans')
  expect(screen.getByRole('heading', { level: 1, name: 'An article title' })).toHaveAttribute('data-type-register', 'article-serif')
  expect(screen.getByText('A concise proposition.').tagName).toBe('P')
  expect(screen.getByRole('link', { name: 'An index entry' })).toHaveAttribute('href', '/projects/example')
  expect(screen.getByText('A useful summary.').tagName).toBe('P')
  expect(screen.getByRole('heading', { level: 2, name: 'Related content' })).toBeInTheDocument()
})

test('shares the bounded action treatment without leaking styling props', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <ActionButton type="button">Submit</ActionButton>
        <ActionAnchor href="/cv.pdf" download>Download CV</ActionAnchor>
        <ActionRouteLink to="/contact">Contact</ActionRouteLink>
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'button')
  expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('download')
  expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/cv.pdf')
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  expect(document.querySelector('[data-variant]')).not.toBeInTheDocument()
})

test('renders parent-owned metadata values with one shared row contract', () => {
  render(
    <PortfolioThemeProvider>
      <MetadataRow items={['1 September 2026', '6 min read']} aria-label="Article metadata" />
    </PortfolioThemeProvider>,
  )

  const row = screen.getByLabelText('Article metadata')
  expect(within(row).getAllByText(/1 September 2026|6 min read/)).toHaveLength(2)
  expect(row.children).toHaveLength(2)
})

test('does not emit an empty metadata row', () => {
  const { container } = render(
    <PortfolioThemeProvider>
      <MetadataRow items={[]} />
    </PortfolioThemeProvider>,
  )

  expect(container).toBeEmptyDOMElement()
})

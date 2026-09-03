import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { WritingArticleShell } from './WritingArticleShell'

test('renders article header, body, continuations and one share section in order', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <WritingArticleShell
          eyebrow="writing"
          title="A durable article"
          summary="A concise article proposition."
          metadata={<><span>3 September 2026</span><span>5 min read</span></>}
          visualContract="article-introduction"
          regionLabel="Article introduction"
          continuations={[{ slug: 'next', eyebrow: 'Continue', title: 'The next article', href: '/writing/next' }]}
          share={{ title: 'A durable article', path: '/writing/durable-article' }}
          headerVisual={<div data-testid="article-visual">Figure</div>}
          body={<div data-testid="article-body">Body</div>}
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'A durable article' })).toBeInTheDocument()
  expect(screen.getByTestId('article-body')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /ContinueThe next article/ })).toHaveAttribute('href', '/writing/next')
  expect(screen.getByRole('heading', { level: 2, name: 'Keep the receipt' })).toBeInTheDocument()
  expect(screen.getAllByRole('region')).toHaveLength(2)
  expect(screen.getByRole('heading', { level: 1 }).compareDocumentPosition(screen.getByTestId('article-body')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})

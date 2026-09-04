import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { RianHughesArticle } from './RianHughesArticle'

const markdown = `Opening paragraph.

<!-- specialists-wordmark-study -->

Middle paragraph.

<!-- patch-lockup-cameo -->

Closing paragraph.`

describe('RianHughesArticle', () => {
  test('turns the two editorial markers into ordered, inspectable wordmark evidence without a duplicate Specialists figure', () => {
    const { container } = render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <RianHughesArticle markdown={markdown} />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    const construction = screen.getByRole('figure', { name: 'How the hierarchy is built' })
    const cameo = screen.getByRole('figure', { name: 'A different typographic answer' })
    const specialistsImages = screen.getAllByRole('img', { name: /The Usual Specialists/i })

    expect(screen.getByText('Opening paragraph.').compareDocumentPosition(construction) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(construction.compareDocumentPosition(screen.getByText('Middle paragraph.')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText('Middle paragraph.').compareDocumentPosition(cameo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(cameo.compareDocumentPosition(screen.getByText('Closing paragraph.')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    expect(specialistsImages).toHaveLength(1)
    for (const image of specialistsImages) {
      expect(image).toHaveAttribute('src', '/media/homepage/the-usual-specialists-wordmark.svg')
    }
    expect(within(construction).getByText('shared left edge')).toBeVisible()
    expect(within(construction).getByText('SPECIALISTS cap line')).toBeVisible()
    expect(within(construction).getByText('shared baseline')).toBeVisible()
    expect(within(construction).getAllByTestId('wordmark-datum')).toHaveLength(3)

    expect(within(cameo).getByRole('img', { name: /Adventures of Patch cliff-drop lockup/i })).toHaveAttribute(
      'src',
      '/brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg',
    )
    expect(screen.queryByRole('figure', { name: 'The finished wordmark' })).not.toBeInTheDocument()
    expect(construction).toHaveAccessibleDescription(/three shared relationships/i)
    expect(cameo).toHaveAccessibleDescription(/Chassis stayed with the Specialists/i)
    expect(container.textContent).not.toContain('specialists-wordmark-study')
    expect(container.textContent).not.toContain('patch-lockup-cameo')
  })

  test('falls back to continuous Markdown when an insertion marker is missing', () => {
    render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <RianHughesArticle markdown="A plain article without editorial markers." />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    expect(screen.getByText('A plain article without editorial markers.')).toBeVisible()
    expect(screen.queryByRole('figure')).not.toBeInTheDocument()
  })
})

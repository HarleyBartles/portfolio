import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { ArticleBody } from './ArticleBody'

test('exposes the owning route measure decision', () => {
  render(
    <PortfolioThemeProvider>
      <ArticleBody measure="full">Full-width presentation</ArticleBody>
    </PortfolioThemeProvider>,
  )

  expect(document.querySelector('[data-measure="full"]')).toBeInTheDocument()
})

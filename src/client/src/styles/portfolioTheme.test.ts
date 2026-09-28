import { render } from '@testing-library/react'
import { createElement } from 'react'
import styled from 'styled-components'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../components'

const ThemeProbe = styled.div`
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
`

test('portfolio theme provider makes typed theme values available to styled components', () => {
  const { container } = render(
    createElement(
      PortfolioThemeProvider,
      null,
      createElement(ThemeProbe),
    ),
  )

  expect(container.firstElementChild).toHaveStyle({
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-site-sans)',
  })
})

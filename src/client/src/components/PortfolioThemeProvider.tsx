import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { portfolioTheme } from '../styles'

export const PortfolioThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={portfolioTheme}>{children}</ThemeProvider>
}

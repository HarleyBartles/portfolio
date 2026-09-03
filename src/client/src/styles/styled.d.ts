import 'styled-components'
import type { PortfolioTheme } from './portfolioTheme'

declare module 'styled-components' {
  export interface DefaultTheme extends PortfolioTheme {}
}

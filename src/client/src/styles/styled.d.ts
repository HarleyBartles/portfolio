import 'styled-components'
import type { EditorialTheme } from './editorialTheme'

declare module 'styled-components' {
  export interface DefaultTheme extends EditorialTheme {}
}

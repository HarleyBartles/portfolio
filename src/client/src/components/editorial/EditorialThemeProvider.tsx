import type { PropsWithChildren, ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import { editorialTheme } from '../../styles/editorialTheme'

export function EditorialThemeProvider({ children }: PropsWithChildren): ReactElement {
  return <ThemeProvider theme={editorialTheme}>{children}</ThemeProvider>
}

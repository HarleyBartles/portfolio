import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'
import { PortfolioThemeProvider } from '../components/runtime'
import { createPortfolioQueryClient } from './queryClient'
import { router as defaultRouter } from './router'

type AppProvidersProps = {
  queryClient?: QueryClient
  router?: RouterProviderProps['router']
}

const browserQueryClient = createPortfolioQueryClient()

export const AppProviders = ({
  queryClient = browserQueryClient,
  router = defaultRouter,
}: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioThemeProvider>
        <RouterProvider router={router} />
      </PortfolioThemeProvider>
    </QueryClientProvider>
  )
}

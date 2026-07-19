import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'
import { createPortfolioQueryClient } from './queryClient'
import { router as defaultRouter } from './router'

type AppProvidersProps = {
  queryClient?: QueryClient
  router?: RouterProviderProps['router']
}

const browserQueryClient = createPortfolioQueryClient()

export function AppProviders({
  queryClient = browserQueryClient,
  router = defaultRouter,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

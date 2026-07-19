import { QueryClient, queryOptions } from '@tanstack/react-query'
import { getContent, getNavigation } from '../api/contentApi'

const contentQueryKeys = {
  navigation: ['content', 'navigation'] as const,
  document: (slug: string) => ['content', 'document', slug] as const,
}

export const contentQueries = {
  navigation: () =>
    queryOptions({
      queryKey: contentQueryKeys.navigation,
      queryFn: getNavigation,
    }),
  document: (slug: string) =>
    queryOptions({
      queryKey: contentQueryKeys.document(slug),
      queryFn: () => getContent(slug),
    }),
}

export function createPortfolioQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60_000,
      },
    },
  })
}

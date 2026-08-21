import type { ReactElement } from 'react'
import { createBrowserRouter, useParams, type RouteObject } from 'react-router-dom'
import App from '../App'
import { RouteErrorBoundary } from '../components/RouteErrorBoundary'

async function loadProjectRoute(): Promise<{ Component: () => ReactElement }> {
  const [{ ProjectPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/ProjectPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: function ProjectRoutePage(): ReactElement {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <ProjectPage slug={slug} />
    },
  }
}

async function loadWritingRoute(): Promise<{ Component: () => ReactElement }> {
  const [{ WritingPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/WritingPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: function WritingRoutePage(): ReactElement {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <WritingPage slug={slug} />
    },
  }
}

async function loadFairytaleRoute(): Promise<{ Component: () => ReactElement }> {
  const [{ FairytalesPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/FairytalesPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: function FairytaleRoutePage(): ReactElement {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <FairytalesPage slug={slug} />
    },
  }
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('../pages/HomePage')).HomePage }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (await import('../pages/ProjectIndexPage')).ProjectIndexPage,
        }),
      },
      {
        path: 'projects/:slug',
        lazy: loadProjectRoute,
      },
      {
        path: 'writing',
        lazy: async () => ({
          Component: (await import('../pages/WritingIndexPage')).WritingIndexPage,
        }),
      },
      {
        path: 'writing/:slug',
        lazy: loadWritingRoute,
      },
      {
        path: 'fairytales',
        lazy: async () => ({
          Component: (await import('../pages/FairytalesIndexPage')).FairytalesIndexPage,
        }),
      },
      {
        path: 'fairytales/:slug',
        lazy: loadFairytaleRoute,
      },
      {
        path: 'about',
        lazy: async () => ({ Component: (await import('../pages/AboutPage')).AboutPage }),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).NotFoundPage }),
      },
    ],
  },
]

export const router = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL,
})

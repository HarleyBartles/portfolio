import {
  createBrowserRouter,
  Navigate,
  useParams,
  type RouteObject,
} from 'react-router-dom'
import App from '../App'
import { RouteErrorBoundary } from '../components/runtime'
import { RouteLoadingStatus } from '../components/RouteLoadingStatus'

const loadProjectRoute = async () => {
  const [{ ProjectPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/ProjectPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: () => {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <ProjectPage slug={slug} />
    },
  }
}

const loadWritingRoute = async () => {
  const [{ WritingPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/WritingPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: () => {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <WritingPage slug={slug} />
    },
  }
}

const loadPatchRoute = async () => {
  const [{ PatchPage }, { NotFoundPage }] = await Promise.all([
    import('../pages/PatchPage'),
    import('../pages/NotFoundPage'),
  ])

  return {
    Component: () => {
      const { slug } = useParams()
      return slug === undefined ? <NotFoundPage /> : <PatchPage slug={slug} />
    },
  }
}

const LegacyFairytaleRedirect = () => {
  const { slug } = useParams()
  return (
    <Navigate to={slug === undefined ? '/patch' : `/patch/${slug}`} replace />
  )
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    hydrateFallbackElement: (
      <RouteLoadingStatus>Preparing the portfolio…</RouteLoadingStatus>
    ),
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('../pages/HomePage')).HomePage,
        }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (await import('../pages/ProjectIndexPage'))
            .ProjectIndexPage,
        }),
      },
      {
        path: 'projects/:slug',
        lazy: loadProjectRoute,
      },
      {
        path: 'writing',
        lazy: async () => ({
          Component: (await import('../pages/WritingIndexPage'))
            .WritingIndexPage,
        }),
      },
      {
        path: 'writing/:slug',
        lazy: loadWritingRoute,
      },
      {
        path: 'patch',
        lazy: async () => ({
          Component: (await import('../pages/PatchIndexPage')).PatchIndexPage,
        }),
      },
      {
        path: 'patch/:slug',
        lazy: loadPatchRoute,
      },
      {
        path: 'fairytales',
        element: <LegacyFairytaleRedirect />,
      },
      {
        path: 'fairytales/:slug',
        element: <LegacyFairytaleRedirect />,
      },
      {
        path: 'about',
        lazy: async () => ({
          Component: (await import('../pages/AboutPage')).AboutPage,
        }),
      },
      {
        path: 'cv',
        lazy: async () => ({
          Component: (await import('../pages/CvPage')).CvPage,
        }),
      },
      {
        path: 'contact',
        lazy: async () => ({
          Component: (await import('../pages/ContactPage')).ContactPage,
        }),
      },
      {
        path: '*',
        lazy: async () => ({
          Component: (await import('../pages/NotFoundPage')).NotFoundPage,
        }),
      },
    ],
  },
]

export const router = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL,
})

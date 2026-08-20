import type { ReactElement } from 'react'
import { createBrowserRouter, useParams, type RouteObject } from 'react-router-dom'
import App from '../App'
import { RouteErrorBoundary } from '../components/RouteErrorBoundary'
import { AboutPage } from '../pages/AboutPage'
import { FairytalesIndexPage } from '../pages/FairytalesIndexPage'
import { FairytalesPage } from '../pages/FairytalesPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProjectIndexPage } from '../pages/ProjectIndexPage'
import { ProjectPage } from '../pages/ProjectPage'
import { WritingIndexPage } from '../pages/WritingIndexPage'
import { WritingPage } from '../pages/WritingPage'

function ProjectRoutePage(): ReactElement {
  const { slug } = useParams()

  return slug === undefined ? <NotFoundPage /> : <ProjectPage slug={slug} />
}

function WritingRoutePage(): ReactElement {
  const { slug } = useParams()

  return slug === undefined ? <NotFoundPage /> : <WritingPage slug={slug} />
}

function FairytalesRoutePage(): ReactElement {
  const { slug } = useParams()

  return slug === undefined ? <NotFoundPage /> : <FairytalesPage slug={slug} />
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: <ProjectIndexPage />,
      },
      {
        path: 'projects/:slug',
        element: <ProjectRoutePage />,
      },
      {
        path: 'writing',
        element: <WritingIndexPage />,
      },
      {
        path: 'writing/:slug',
        element: <WritingRoutePage />,
      },
      {
        path: 'fairytales',
        element: <FairytalesIndexPage />,
      },
      {
        path: 'fairytales/:slug',
        element: <FairytalesRoutePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL,
})

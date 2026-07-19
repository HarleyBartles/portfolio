import type { ReactElement } from 'react'
import { createBrowserRouter, useParams, type RouteObject } from 'react-router-dom'
import App from '../App'
import { RouteErrorBoundary } from '../components/RouteErrorBoundary'
import { ContentPage } from '../pages/ContentPage'
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
        path: 'experience',
        element: <ContentPage slug="experience" expectedKind="experience" />,
      },
      {
        path: 'engineering-practice',
        element: <ContentPage slug="engineering-practice" expectedKind="practice" />,
      },
      {
        path: 'ai-engineering',
        element: <ContentPage slug="ai-engineering" expectedKind="ai-engineering" />,
      },
      {
        path: 'learning-and-development',
        element: <ContentPage slug="learning-and-development" expectedKind="learning" />,
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(appRoutes)

import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import App from '../App'
import { ErrorPage } from '../pages/ErrorPage'
import { AreaPlaceholderPage } from '../pages/AreaPlaceholderPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: <AreaPlaceholderPage title="Projects" />,
      },
      {
        path: 'experience',
        element: <AreaPlaceholderPage title="Experience" />,
      },
      {
        path: 'engineering-practice',
        element: <AreaPlaceholderPage title="Engineering Practice" />,
      },
      {
        path: 'ai-engineering',
        element: <AreaPlaceholderPage title="AI Engineering" />,
      },
      {
        path: 'writing',
        element: <AreaPlaceholderPage title="Writing and Notes" />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(appRoutes)

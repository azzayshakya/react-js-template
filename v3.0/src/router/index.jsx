import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Dashboard } from './lazyRoutes'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES, ROLES } from './routes'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { Login } from '@/pages/Auth/Login'
import ErrorPage from '@/pages/Common/ErrorPage'
import NotFoundPage from '@/pages/Common/NotFoundPage'

const Placeholder = ({ name }) => (
  <div style={{ padding: 40 }}>
    <h2>{name} Page</h2>
    <p>Role-restricted route working ✅</p>
  </div>
)

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: ROUTES.LOGIN, element: <Login /> }],
  },

  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // public
      { path: ROUTES.ABOUT, element: <Placeholder name="About" /> },

      // needs login
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.DASHBOARD, element: <Dashboard /> },
          { path: ROUTES.HOME, element: <Dashboard /> },
        ],
      },

      // admin only
      {
        element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [{ path: ROUTES.ACCOUNTS, element: <Placeholder name="Accounts" /> }],
      },

      // tester only
      {
        element: <ProtectedRoute allowedRoles={[ROLES.TESTER]} />,
        children: [{ path: ROUTES.TESTING, element: <Placeholder name="Testing" /> }],
      },
    ],
  },
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: '*',
  //       element: <NotFoundPage />,
  //     },
  //   ],
  // },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

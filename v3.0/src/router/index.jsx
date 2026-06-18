import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ROUTES, ROLES } from './routes'
import { ProtectedRoute } from './ProtectedRoute'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { Login } from '@/pages/Auth/Login'
import { Dashboard } from './lazyRoutes'

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
])

export function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

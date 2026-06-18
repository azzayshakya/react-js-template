import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import { ROUTES } from './routes'
import { ProtectedRoute } from './ProtectedRoute'
import { Dashboard } from './lazyRoutes'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import { Login } from '@/pages/Auth/Login'
// import MainLayout from 'layouts/MainLayout'
// import AuthLayout from 'layouts/AuthLayout'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: ROUTES.DASHBOARD, element: <Dashboard /> }],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      // { path: ROUTES.REGISTER, element: <Register /> },
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

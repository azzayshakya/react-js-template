import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from './routes'

export function ProtectedRoute({ allowedRoles }) {
  const auth = {
    isAuthenticated: true,
    user: {
      role: 'ADMIN',
    },
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (allowedRoles && !allowedRoles.includes(auth.user?.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

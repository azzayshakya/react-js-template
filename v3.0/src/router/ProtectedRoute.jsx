import { hasMenuPermission } from '@devStack/components/sidebar/constants/Permission'
import PageLoader from '@devStack/components/spinners/PageLoader'
import { Navigate, useLocation } from 'react-router-dom'

// import { useAuthStore } from '@/store/authStore'

const ProtectedRoute = ({ menuKey, children }) => {
  const location = useLocation()
  // const { isAuthenticated, user, isLoading } = useAuthStore()
  let isAuthenticated = true
  let isLoading = false
  let user = { name: 'ajay', role: 'admin' }
  if (isLoading) return <PageLoader />

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (menuKey && !hasMenuPermission(menuKey, user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute

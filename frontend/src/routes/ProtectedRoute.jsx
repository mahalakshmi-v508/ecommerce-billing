import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user, initializing } = useAuth()
  const location = useLocation()

  console.log('Current Path:', location.pathname)
  console.log('ProtectedRoute check:', {
    isAuthenticated,
    user,
    initializing,
    allowedRoles
  })

  if (initializing) {
    return (
      <div className="grid min-h-screen place-items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    // redirect based on role
    switch (user?.role) {
      case 'wholesaler':
        return <Navigate to="/wholesaler/dashboard" replace />

      case 'admin':
        return <Navigate to="/admin/dashboard" replace />

      case 'superadmin':
        return <Navigate to="/superadmin/dashboard" replace />

      case 'cashier':
        return <Navigate to="/cashier/dashboard" replace />

      default:
        return <Navigate to="/login" replace />
    }
  }

  return children
}
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user, initializing } = useAuth()
  const location = useLocation()

  // Also check for wholesaler in localStorage
  const wholesalerUser = JSON.parse(localStorage.getItem('wholesaler_user') || 'null')
  const isWholesalerAuthenticated = !!wholesalerUser

  if (initializing) {
    return (
      <div className="grid min-h-screen place-items-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Check if trying to access wholesaler route
  const isWholesalerRoute = location.pathname.startsWith('/wholesaler')
  
  if (isWholesalerRoute) {
    // For wholesaler routes, check wholesaler authentication
    if (!isWholesalerAuthenticated) {
      return <Navigate to="/wholesaler-login" replace />
    }
    
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes('wholesaler')) {
      return <Navigate to="/wholesaler/dashboard" replace />
    }
    
    return children
  }

  // For user routes, check user authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect based on role
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
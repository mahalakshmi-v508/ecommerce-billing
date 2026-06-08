import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user, initializing } = useAuth()

  console.log('ProtectedRoute check:', { isAuthenticated, user, initializing, allowedRoles })

  if (initializing) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950/60 px-4">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    console.warn('User not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    console.warn('User role not allowed:', { userRole: user?.role, allowedRoles })
    return <Navigate to="/login" replace />
  }

  return children
}

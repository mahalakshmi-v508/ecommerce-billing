import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user, initializing } = useAuth()

  if (initializing) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950/60 px-4">
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />
  }

  return children
}

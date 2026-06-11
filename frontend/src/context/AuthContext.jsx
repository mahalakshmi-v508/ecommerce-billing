import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser } from '../services/authService.js'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    const storedToken = localStorage.getItem('auth_token')

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        localStorage.removeItem('auth_user')
        localStorage.removeItem('auth_token')
      }
    }

    setInitializing(false)
  }, [])

  const saveAuth = (authToken, authUser) => {
    localStorage.setItem('auth_token', authToken)
    localStorage.setItem('auth_user', JSON.stringify(authUser))
    setToken(authToken)
    setUser(authUser)
  }

  const authenticate = (authUser) => {
    const authToken = `token-${Date.now()}`
    saveAuth(authToken, authUser)
  }

  const login = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password })
      console.log('Login response:', response)
      
      if (!response.status) {
        throw new Error(response.message || 'Unable to login')
      }

      const authToken = response.token || `token-${Date.now()}`
      const authUser = {
        ...response.data,
        role: response.role,
      }

      console.log('Saving auth user:', authUser)
      saveAuth(authToken, authUser)
      toast.success('Login successful! Redirecting...')
      return authUser
    } catch (error) {
      const errorMessage = error.message || 'Login failed'
      console.error('Login error:', error)
      toast.error(errorMessage)
      throw error
    }
  }

  // User logout - only clears user session
  const userLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
    setToken(null)
    toast.success('Logged out successfully')
  }

  // Wholesaler logout - only clears wholesaler session
  const wholesalerLogout = () => {
    localStorage.removeItem('wholesaler_user')
    localStorage.removeItem('wholesaler_token')
    localStorage.removeItem('bulk_order_email')
    toast.success('Wholesaler logged out successfully')
  }

  // Full logout - clears both (use only when needed)
  const fullLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('wholesaler_user')
    localStorage.removeItem('wholesaler_token')
    localStorage.removeItem('bulk_order_email')
    setUser(null)
    setToken(null)
    toast.success('Logged out successfully')
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      initializing,
      isAuthenticated: Boolean(user && token),
      login,
      authenticate,
      userLogout,
      wholesalerLogout,
      fullLogout,
      hasRole: (roles = []) => Boolean(user && roles.includes(user.role)),
    }),
    [user, token, initializing]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
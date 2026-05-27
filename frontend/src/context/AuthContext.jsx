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

  const login = async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password })
      if (!response.status) {
        throw new Error(response.message || 'Unable to login')
      }

      const authToken = response.token || `token-${Date.now()}`
      const authUser = {
        ...response.data,
        role: response.role,
      }

      saveAuth(authToken, authUser)
      toast.success('Login successful! Redirecting...')
      return authUser
    } catch (error) {
      const errorMessage = error.message || 'Login failed'
      toast.error(errorMessage)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
    setToken(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
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

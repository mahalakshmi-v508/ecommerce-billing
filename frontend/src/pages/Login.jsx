import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AuthCard from '../components/AuthCard.jsx'
import FormField from '../components/FormField.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const roleTarget = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin/dashboard',
  cashier: '/cashier/dashboard',
  user: '/',
}

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, initializing, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (!initializing && isAuthenticated && user?.role) {
      const redirectPath = roleTarget[user.role] || '/'
      navigate(redirectPath, { replace: true })
    }
  }, [initializing, isAuthenticated, user, navigate])

  const validateForm = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return false
    }
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address')
      return false
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const authUser = await login({ email, password, rememberMe })
      const redirectPath = roleTarget[authUser.role] || '/'
      navigate(redirectPath, { replace: true })
    } catch (error) {
      // Error toast is already shown by auth context
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AuthCard
          title="Welcome back"
          subtitle="Login with your account and continue to your role-specific dashboard."
          footer={
            <p>
              New here?{' '}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register now
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
            <FormField
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <LoadingSpinner /> : 'Sign in'}
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'
import riceFieldBg from '../assets/banner/rice one.jpg'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const roleTarget = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin/dashboard',
  // cashier: '/cashier/dashboard',
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={riceFieldBg} 
          alt="Rice Field Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="ricePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <ellipse cx="15" cy="15" rx="4" ry="2" fill="white" transform="rotate(45 15 15)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ricePattern)" />
          </svg>
        </div>
      </div>

      {/* Login Form - Compact Box */}
      <div className="relative z-10 w-full max-w-[320px] px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-5 border border-white/20">
          
          {/* Logo / Brand - Compact */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg mb-2 shadow-md">
              <span className="text-xl">🌾</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Login to your account</p>
            <div className="w-10 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-1.5"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/90 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-8 pr-8 py-1.5 text-xs border border-gray-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/90 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Show Password */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="inline-flex items-center gap-1 text-[11px] text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-2.5 w-2.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-[11px] font-medium text-green-600 hover:text-green-700"
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 rounded-md font-semibold text-xs transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-[11px] text-gray-500 mt-2">
              New here?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
                Register now
              </Link>
            </p>
          </form>

          {/* Footer Note */}
          <div className="mt-3 pt-2 border-t border-gray-200 text-center">
            <p className="text-[9px] text-gray-400">
              <span className="inline-block mr-1">🌾</span>
              Direct from Mills • Best Prices • GST Billing
              <span className="inline-block ml-1">🌾</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
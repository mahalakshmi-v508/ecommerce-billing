import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext.jsx'
import riceFieldBg from '../../assets/banner/rice one.jpg'

export default function WholesalerLogin() {
  const navigate = useNavigate()
  const { authenticate } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    const wholesalerUser = localStorage.getItem('wholesaler_user')
    if (wholesalerUser) {
      try {
        const user = JSON.parse(wholesalerUser)
        if (user && user.id) {
          navigate('/wholesaler/dashboard', { replace: true })
        }
      } catch (error) {
        console.error('Error parsing wholesaler user:', error)
      }
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/login.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!data.status) {
        toast.error(data.message)
        setLoading(false)
        return
      }

      const authUser = {
        ...data.data,
        role: data.role || 'wholesaler',
      }

      const authToken = `wholesaler-${Date.now()}`

      localStorage.setItem('wholesaler_user', JSON.stringify(authUser))
      localStorage.setItem('wholesaler_token', authToken)

      localStorage.removeItem('bulk_order_email')

      toast.success('Login successful! Redirecting...')
      navigate('/wholesaler/dashboard')

    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Login failed')
      setLoading(false)
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

      {/* Login Form - Smaller Box */}
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/20">
          
          {/* Logo / Brand - Smaller */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mb-3 shadow-lg">
              <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Wholesaler Login</h2>
            <p className="text-gray-500 text-xs mt-1">Access your wholesale dashboard</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-2"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="wholesaler@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/90 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 bg-white/90 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500 w-3 h-3" />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs text-green-600 hover:text-green-700 font-medium"
                onClick={() => toast.success('Contact admin to reset password')}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Don't have a wholesaler account?{' '}
              <button
                type="button"
                onClick={() => navigate('/wholesaler-register')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Register here
              </button>
            </p>
          </form>

          {/* Footer Note */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-400">
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
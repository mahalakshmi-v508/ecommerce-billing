import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X, LogIn, UserPlus } from 'lucide-react'
import logo from '../../assets/logo.png'
import { getWishlistCount } from '../../services/wishlistService.js'
import { getCartCount } from '../../services/cartService.js'
import toast from 'react-hot-toast'

export default function WholesalerHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const profileRef = useRef(null)

  // Get wholesaler from localStorage
  const [wholesaler, setWholesaler] = useState(null)
  const activeUserId = wholesaler?.id
  const activeUserType = 'wholesaler'

  // Load wholesaler from localStorage on mount and when storage changes
  useEffect(() => {
    const loadWholesaler = () => {
      const stored = localStorage.getItem('wholesaler_user')
      if (stored) {
        try {
          setWholesaler(JSON.parse(stored))
        } catch {
          setWholesaler(null)
        }
      } else {
        setWholesaler(null)
      }
    }

    loadWholesaler()

    // Listen for storage changes
    const handleStorageChange = () => loadWholesaler()
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (activeUserId) {
      loadCounts()
    } else {
      setCartCount(0)
      setWishlistCount(0)
    }

    const handleCart = () => activeUserId && loadCounts()
    const handleWishlist = () => activeUserId && loadCounts()

    window.addEventListener('cartUpdated', handleCart)
    window.addEventListener('wishlistUpdated', handleWishlist)

    return () => {
      window.removeEventListener('cartUpdated', handleCart)
      window.removeEventListener('wishlistUpdated', handleWishlist)
    }
  }, [activeUserId])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadCounts = async () => {
    try {
      const c = await getCartCount(activeUserId, activeUserType)
      const w = await getWishlistCount(activeUserId, activeUserType)
      setCartCount(c)
      setWishlistCount(w)
    } catch {
      setCartCount(0)
      setWishlistCount(0)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/wholesaler/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  // Wholesaler logout
  const handleLogout = () => {
    localStorage.removeItem('wholesaler_user')
    localStorage.removeItem('wholesaler_token')
    localStorage.removeItem('bulk_order_email')
    setWholesaler(null)
    toast.success('Logged out successfully')
    navigate('/')
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
  }

  const handleLoginClick = () => {
    navigate('/wholesaler-login')
    setMobileMenuOpen(false)
  }

  const handleRegisterClick = () => {
    navigate('/wholesaler-register')
    setMobileMenuOpen(false)
  }

  const handleProfileClick = () => {
    navigate('/wholesaler/profile')
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 lg:h-[90px]">

          {/* LOGO */}
          <Link to="/wholesaler/dashboard" className="shrink-0 flex items-center">
            <img src={logo} alt="Fathima Rice Land" className="w-[150px] sm:w-[180px] h-auto object-contain" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/wholesaler/dashboard" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Dashboard
            </Link>
            <Link to="/wholesaler/products" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Wholesaler Products
            </Link>
            <Link to="/wholesaler/orders" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Wholesale Orders
            </Link>
          </nav>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              <input
                type="search"
                placeholder="Search wholesale products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 outline-none rounded-lg focus:border-green-500 focus:bg-white transition"
              />
            </div>
          </form>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist - Only show if logged in */}
            {wholesaler && (
              <Link to="/wholesaler/wishlist" className="relative flex h-10 w-10 items-center justify-center text-gray-600 hover:text-green-600 transition">
                <Heart className="h-5 w-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart - Only show if logged in */}
            {wholesaler && (
              <Link to="/wholesalercart" className="relative flex h-10 w-10 items-center justify-center text-gray-600 hover:text-green-600 transition">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Profile Section - Only Profile and Logout in dropdown */}
            {wholesaler ? (
              <div ref={profileRef} className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-green-600 transition"
                >
                  <User className="h-5 w-5" strokeWidth={1.5} />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 border border-gray-200 bg-white py-1 shadow-lg rounded-lg">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-medium text-gray-800">{wholesaler?.name || wholesaler?.business_name}</p>
                      <p className="truncate text-xs text-gray-500">{wholesaler?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Wholesaler
                      </span>
                    </div>

                    <button
                      onClick={handleProfileClick}
                      className="block w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                    >
                      Profile
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-gray-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition rounded-full"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full hover:from-green-700 hover:to-emerald-700 transition shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center text-gray-600 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                <input
                  type="search"
                  placeholder="Search wholesale products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm rounded-lg focus:border-green-500 focus:bg-white transition"
                />
              </div>
            </form>

            {wholesaler ? (
              <nav className="flex flex-col gap-1">
                <Link to="/wholesaler/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Dashboard
                </Link>
                <Link to="/wholesaler/products" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Wholesaler Products
                </Link>
                <Link to="/wholesaler/orders" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Wholesaler Orders
                </Link>
                <Link to="/wholesalercart" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Cart
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleProfileClick}
                  className="px-2 py-2.5 text-left text-sm font-medium text-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-2 py-2.5 text-left text-sm text-red-600"
                >
                  Logout
                </button>
              </nav>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleLoginClick}
                  className="px-2 py-2.5 text-left text-sm font-medium text-gray-700"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="px-2 py-2.5 text-left text-sm font-medium text-green-600"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
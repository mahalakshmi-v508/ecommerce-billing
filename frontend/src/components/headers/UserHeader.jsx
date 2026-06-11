import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X, Package } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { getWishlistCount } from '../../services/wishlistService.js'
import { getCartCount } from '../../services/cartService.js'
import toast from 'react-hot-toast'
import logo from '../../assets/logo.png'

export default function UserHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, userLogout } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const profileRef = useRef(null)

  const activeUserId = user?.id
  const activeUserType = 'user'

  useEffect(() => {
    if (activeUserId) {
      loadCartCount()
      loadWishlistCount()
    } else {
      setCartCount(0)
      setWishlistCount(0)
    }

    const handleCartUpdate = () => activeUserId && loadCartCount()
    const handleWishlistUpdate = () => activeUserId && loadWishlistCount()

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
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

  const loadCartCount = async () => {
    try {
      const count = await getCartCount(activeUserId, activeUserType)
      setCartCount(count)
    } catch {
      setCartCount(0)
    }
  }

  const loadWishlistCount = async () => {
    try {
      const count = await getWishlistCount(activeUserId, activeUserType)
      setWishlistCount(count)
    } catch {
      setWishlistCount(0)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    userLogout()
    toast.success('Logged out successfully')
    navigate('/login')
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
  }

  const handleBulkOrder = () => {
    // Directly navigate to wholesaler dashboard
    // No login page - admin handles registration via email
    navigate('/wholesaler/dashboard')
    setMobileMenuOpen(false)
    setProfileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 lg:h-[90px]">

          {/* LOGO */}
          <Link to="/" className="shrink-0 flex items-center">
            <img src={logo} alt="Fathima Rice Land" className="w-[150px] sm:w-[180px] h-auto object-contain" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/categories" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Categories
            </Link>
            <Link to="/orders" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Orders
            </Link>
            <button
              onClick={handleBulkOrder}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-1.5 rounded-full hover:from-green-700 hover:to-emerald-700 transition shadow-sm"
            >
              <Package className="w-4 h-4" />
              Bulk Order
            </button>
          </nav>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 outline-none rounded-lg focus:border-green-500 focus:bg-white transition"
              />
            </div>
          </form>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative flex h-10 w-10 items-center justify-center text-gray-600 hover:text-green-600 transition">
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center text-gray-600 hover:text-green-600 transition">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            {user ? (
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
                      <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                      <p className="truncate text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <Link 
                      to="/orders" 
                      onClick={() => setProfileMenuOpen(false)} 
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/profile" 
                      onClick={() => setProfileMenuOpen(false)} 
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/wishlist" 
                      onClick={() => setProfileMenuOpen(false)} 
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                    >
                      Wishlist
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleBulkOrder}
                      className="block w-full px-4 py-2.5 text-left text-sm text-green-600 hover:bg-gray-50 transition"
                    >
                      <Package className="w-4 h-4 inline mr-2" />
                      Bulk Order
                    </button>
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
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                  Sign Up
                </Link>
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
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm rounded-lg focus:border-green-500 focus:bg-white transition"
                />
              </div>
            </form>

            {user ? (
              <nav className="flex flex-col gap-1">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Home
                </Link>
                <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Categories
                </Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Orders
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Wishlist
                </Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Cart
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Profile
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleBulkOrder}
                  className="px-2 py-2.5 text-left text-sm font-medium text-green-600"
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Bulk Order
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
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-gray-700">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium text-green-600">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
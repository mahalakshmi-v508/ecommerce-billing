import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getActiveCategories } from '../services/categoryService.js'
import { getCartCount } from '../services/cartService.js'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const categoriesRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const cartCount = localStorage.getItem('ecommerce_cart')
    const wishlistCount = localStorage.getItem('ecommerce_wishlist')

    setCartCount(cartCount ? JSON.parse(cartCount).length : 0)
    setWishlistCount(wishlistCount ? JSON.parse(wishlistCount).length : 0)

    if (user?.company_id) {
      loadCategories()
    }

    const handleStorageChange = () => {
      const cart = localStorage.getItem('ecommerce_cart')
      const wishlist = localStorage.getItem('ecommerce_wishlist')
      setCartCount(cart ? JSON.parse(cart).length : 0)
      setWishlistCount(wishlist ? JSON.parse(wishlist).length : 0)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const loadCategories = async () => {
    try {
      if (!user?.company_id) return
      const response = await getActiveCategories(user.company_id)
      if (response.status) {
        setCategories(response.data || [])
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
    navigate('/login', { replace: true })
  }

  const roleMenuItems = {
    superadmin: [
      { label: 'Dashboard', href: '/superadmin/dashboard', icon: '📊' },
      { label: 'Users', href: '#', icon: '👥' },
      { label: 'Settings', href: '#', icon: '⚙️' },
    ],
    admin: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
      { label: 'Products', href: '#', icon: '📦' },
      { label: 'Orders', href: '#', icon: '🛒' },
      { label: 'Analytics', href: '#', icon: '📈' },
    ],
    cashier: [
      { label: 'Dashboard', href: '/cashier/dashboard', icon: '🎫' },
      { label: 'Billing', href: '#', icon: '💳' },
      { label: 'Transactions', href: '#', icon: '💰' },
    ],
    user: [
      { label: 'My Orders', href: '/orders', icon: '📋' },
      { label: 'Profile', href: '/profile', icon: '👤' },
      { label: 'Wishlist', href: '/wishlist', icon: '❤️' },
    ],
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden items-center justify-between py-4 lg:flex">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              SmartLedger
            </div>
          </Link>

          {/* Navigation */}
          {isAuthenticated && user?.role === 'user' && (
            <nav className="hidden items-center gap-4 lg:flex">
              <Link
                to="/products"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
              >
                Products
              </Link>
            </nav>
          )}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 mx-8 md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Categories Dropdown */}
          {isAuthenticated && categories.length > 0 && (
            <div ref={categoriesRef} className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Categories 📁
                <span className="text-xs">▼</span>
              </button>
              {categoriesOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg transition"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="relative text-slate-600 hover:text-indigo-600 transition text-xl"
              >
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative text-slate-600 hover:text-indigo-600 transition text-xl"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white hover:shadow-lg transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
                >
                  👤 {user.name?.split(' ')[0]}
                </button>
                {profileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-200 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <span className="mt-2 inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                        {user.role}
                      </span>
                    </div>
                    {roleMenuItems[user.role]?.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        {item.icon} {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full border-t border-slate-200 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            SL
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <Link to="/cart" className="relative text-lg">
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 lg:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </form>

            {/* Categories Mobile */}
            {isAuthenticated && user?.role === 'user' && (
              <div className="mb-4 space-y-2 border-b border-slate-200 pb-4">
                <Link
                  to="/products"
                  className="block text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Products
                </Link>
              </div>
            )}
            {isAuthenticated && categories.length > 0 && (
              <div className="mb-4 border-b border-slate-200 pb-4">
                <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Categories</p>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block text-sm text-slate-700 hover:text-indigo-600 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Auth Mobile */}
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full rounded-lg border border-indigo-600 px-4 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:shadow-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-lg bg-slate-100 p-3">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                {roleMenuItems[user.role]?.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-sm text-slate-700 hover:text-indigo-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon} {item.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="block text-sm text-slate-700 hover:text-indigo-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ❤️ Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

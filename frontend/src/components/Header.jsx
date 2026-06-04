// EcommerceHeader.jsx
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getWishlistCount } from '../services/wishlistService.js'
import { getCartCount } from '../services/cartService.js'

export default function EcommerceHeader() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  // State Management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsCount] = useState(3) // Can be dynamic later

  // Refs for click outside detection
  const profileRef = useRef(null)

  // Load cart and wishlist counts
  useEffect(() => {
    if (user?.id) {
      loadCartCount()
      loadWishlistCount()
    }

    // Event listeners for cart and wishlist updates
    const handleCartUpdate = () => user?.id && loadCartCount()
    const handleWishlistUpdate = () => user?.id && loadWishlistCount()

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('wishlistUpdated', handleWishlistUpdate)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
    }
  }, [user])

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // API Calls
  const loadCartCount = async () => {
    try {
      const count = await getCartCount(user.id)
      setCartCount(count)
    } catch (error) {
      console.error('Error loading cart count:', error)
    }
  }

  const loadWishlistCount = async () => {
    try {
      const count = await getWishlistCount(user.id)
      setWishlistCount(count)
    } catch (error) {
      console.error('Error loading wishlist count:', error)
    }
  }

  // Handlers
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

  // Menu items based on user role
  const roleMenuItems = {
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
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
              SmartLedger
            </div>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && user?.role === 'user' && (
            <nav className="hidden lg:flex items-center gap-6 ml-8">
              <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              
              <Link
  to="/categories"
  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
>
  Categories
</Link>
              
              <Link to="/orders" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                Orders
              </Link>
            </nav>
          )}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, categories, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-slate-50 px-5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            
            {/* Wishlist */}
            {isAuthenticated && (
              <Link to="/wishlist" className="relative text-2xl text-slate-700 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            {isAuthenticated && (
              <Link to="/cart" className="relative text-2xl text-slate-700 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 1.4a2 2 0 001.4 3.6h10.4a2 2 0 001.4-3.6L17 13M7 13h10M9 21h6M10 21v-4M14 21v-4" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative text-slate-700 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notificationsCount > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                    {notificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile */}
            {isAuthenticated && (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:from-indigo-100 hover:to-cyan-100 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline">{user.name?.split(' ')[0]}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                    <div className="border-b border-slate-200 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    {roleMenuItems[user.role]?.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 border-t border-slate-200 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  🔍
                </button>
              </div>
            </form>

            {isAuthenticated && user?.role === 'user' && (
              <div className="flex flex-col gap-3">
                <Link to="/" className="text-sm font-semibold text-slate-700" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link
  to="/categories"
  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
>
  Categories
</Link>
                <Link to="/orders" className="text-sm font-semibold text-slate-700" onClick={() => setMobileMenuOpen(false)}>
                  Orders
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
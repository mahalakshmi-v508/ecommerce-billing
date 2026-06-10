import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' // 👈 useLocation ஐச் சேர்க்கவும்
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getWishlistCount } from '../services/wishlistService.js'
import { getCartCount } from '../services/cartService.js'
import logo from '../assets/logo1.png'

export default function EcommerceHeader() {
  const navigate = useNavigate()
  const location = useLocation() // 👈 தற்போதைய பாதையைக் கண்டறிய
  const { user, logout, isAuthenticated } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const profileRef = useRef(null)

  // 👈 புதிய கண்டிஷன்: பயனர் 'wholesaler' ஆக இருந்தாலும் அல்லது தற்போது இருக்கும் URL '/wholesaler' எனத் தொடங்கினாலும் wholesale மெனுவைக் காட்டுவோம்.
  const isWholesalerSection = user?.role === 'wholesaler' || location.pathname.startsWith('/wholesaler')

  useEffect(() => {
    if (user?.id) {
      loadCartCount()
      loadWishlistCount()
    }

    const handleCartUpdate = () => user?.id && loadCartCount()
    const handleWishlistUpdate = () => user?.id && loadWishlistCount()

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('wishlistUpdated', handleWishlistUpdate)
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
    }
  }, [user])

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
      const count = await getCartCount(user.id)
      setCartCount(count)
    } catch {
      setCartCount(0)
    }
  }

  const loadWishlistCount = async () => {
    try {
      const count = await getWishlistCount(user.id)
      setWishlistCount(count)
    } catch {
      setWishlistCount(0)
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    setProfileMenuOpen(false)
    setMobileMenuOpen(false)
    navigate('/login', { replace: true })
  }

  // ரோல் அடிப்படையிலான மெனுக்களை மாற்றுவதற்கு 'isWholesalerSection' ஐப் பயன்படுத்துகிறோம்
  const currentRoleForMenu = isWholesalerSection ? 'wholesaler' : 'user'

  const roleMenuItems = {
    user: [
      { label: 'My Orders', href: '/orders' },
      { label: 'Profile', href: '/profile' },
      { label: 'Wishlist', href: '/wishlist' },
    ],
    wholesaler: [
      { label: 'Dashboard', href: '/wholesaler/dashboard' },
      { label: 'Orders', href: '/wholesaler/orders' },
      { label: 'Profile', href: '/profile' },
      { label: 'Wishlist', href: '/wishlist' },
    ],
  }

  const getMobileLinks = () => {
    if (isWholesalerSection) {
      return [
        { label: 'Dashboard', href: '/wholesaler/dashboard' },
        { label: 'Wholesale Products', href: '/wholesaler/products' },
        { label: 'Bulk Orders', href: '/wholesaler/orders' },
        { label: 'Wishlist', href: '/wishlist' },
        { label: 'Cart', href: '/cart' },
        { label: 'Profile', href: '/profile' },
      ]
    }
    return [
      { label: 'Home', href: '/' },
      { label: 'Categories', href: '/categories' },
      { label: 'Deals', href: '/deals' },
      { label: 'Orders', href: '/orders' },
      { label: 'Bulk Orders', href: '/wholesaler/dashboard' },
      { label: 'Wishlist', href: '/wishlist' },
      { label: 'Cart', href: '/cart' },
      { label: 'Profile', href: '/profile' },
    ]
  }

  const IconButton = ({ to, count, children, label }) => {
    const content = (
      <span className="relative flex h-10 w-10 items-center justify-center text-[#111] transition hover:opacity-60">
        {children}
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </span>
    )
    if (to) {
      return (
        <Link to={to} aria-label={label} className="inline-flex">
          {content}
        </Link>
      )
    }
    return content
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 lg:h-[90px]">
          {/* LOGO */}
          <Link
            to={isWholesalerSection ? '/wholesaler/dashboard' : '/'}
            className="shrink-0 flex items-center"
          >
            <img
              src={logo}
              alt="Fathima Rice Land"
              className="w-[150px] sm:w-[180px] lg:w-[180px] h-auto object-contain relative top-2"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          {isAuthenticated && (
            <nav className="hidden items-center gap-8 lg:flex">
              {isWholesalerSection ? (
                <>
                  <Link
                    to="/wholesaler/dashboard"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/wholesaler/products"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Wholesale Products
                  </Link>
                  <Link
                    to="/wholesaler/orders"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Home
                  </Link>
                  <Link
                    to="/categories"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/orders"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wholesaler/dashboard"
                    className="text-sm font-medium text-[#111] transition hover:opacity-60"
                  >
                    Bulk Orders
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-md lg:block xl:max-w-lg"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]"
                strokeWidth={1.5}
              />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#e5e7eb] bg-[#f8f9fa] py-2.5 pl-11 pr-4 text-sm text-[#111] outline-none transition placeholder:text-[#666] focus:border-[#111] focus:bg-white"
              />
            </div>
          </form>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-1 sm:gap-2">
            {isAuthenticated && (
              <>
                <IconButton to="/wishlist" count={wishlistCount} label="Wishlist">
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                </IconButton>

                <IconButton to="/wholesalercart" count={cartCount} label="Cart">
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                </IconButton>

                {/* PROFILE DROPDOWN */}
                <div ref={profileRef} className="relative hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen((o) => !o)}
                    className="flex h-10 w-10 items-center justify-center text-[#111] transition hover:opacity-60"
                    aria-label="Account menu"
                  >
                    <User className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 border border-[#e5e7eb] bg-white py-1 shadow-sm">
                      <div className="border-b border-[#e5e7eb] px-4 py-3">
                        <p className="text-sm font-medium text-[#111]">{user.name}</p>
                        <p className="truncate text-xs text-[#666]">{user.email}</p>
                      </div>
                      {roleMenuItems[currentRoleForMenu]?.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setProfileMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#666] hover:bg-[#f8f9fa] hover:text-[#111]"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-2.5 text-left text-sm text-[#666] hover:bg-[#f8f9fa] hover:text-[#111]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center text-[#111] lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e5e7eb] py-4 lg:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]"
                  strokeWidth={1.5}
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-[#e5e7eb] bg-[#f8f9fa] py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#111]"
                />
              </div>
            </form>
            {isAuthenticated && (
              <nav className="flex flex-col gap-1">
                {getMobileLinks().map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2 py-2.5 text-sm font-medium text-[#111]"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2 py-2.5 text-left text-sm text-[#666]"
                >
                  Logout
                </button>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
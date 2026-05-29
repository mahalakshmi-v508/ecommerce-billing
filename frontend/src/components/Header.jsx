import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getWishlistCount
} from '../services/wishlistService.js'

import {
  getActiveCategories
} from '../services/categoryService.js'

import {
  getCartCount
} from '../services/cartService.js'

export default function Header() {

  const navigate = useNavigate()

  const {
    user,
    logout,
    isAuthenticated
  } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  const [categoriesOpen, setCategoriesOpen] =
    useState(false)

  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false)

  const [categories, setCategories] =
    useState([])

  const [cartCount, setCartCount] =
    useState(0)

  const [wishlistCount, setWishlistCount] =
    useState(0)

  const [searchQuery, setSearchQuery] =
    useState('')

  const categoriesRef = useRef(null)

  const profileRef = useRef(null)

  /*
  |--------------------------------------------------------------------------
  | LOAD INITIAL DATA
  |--------------------------------------------------------------------------
  */

 useEffect(() => {

  if (user?.id) {

    loadCartCount()
    loadWishlistCount()
  }

  if (user?.company_id) {

    loadCategories()
  }

  /*
  |--------------------------------------------------------------------------
  | CART UPDATE
  |--------------------------------------------------------------------------
  */

  const handleCartUpdate = () => {

    if(user?.id){

      loadCartCount()
    }
  }

  /*
  |--------------------------------------------------------------------------
  | WISHLIST UPDATE
  |--------------------------------------------------------------------------
  */

  const handleWishlistUpdate = () => {

    if(user?.id){

      loadWishlistCount()
    }
  }

  /*
  |--------------------------------------------------------------------------
  | EVENTS
  |--------------------------------------------------------------------------
  */

  window.addEventListener(
    'cartUpdated',
    handleCartUpdate
  )

  window.addEventListener(
    'wishlistUpdated',
    handleWishlistUpdate
  )

  /*
  |--------------------------------------------------------------------------
  | CLEANUP
  |--------------------------------------------------------------------------
  */

  return () => {

    window.removeEventListener(
      'cartUpdated',
      handleCartUpdate
    )

    window.removeEventListener(
      'wishlistUpdated',
      handleWishlistUpdate
    )
  }

}, [user])

  /*
  |--------------------------------------------------------------------------
  | CLICK OUTSIDE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(
          event.target
        )
      ) {

        setCategoriesOpen(false)
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {

        setProfileMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }

  }, [])

  /*
  |--------------------------------------------------------------------------
  | LOAD CART COUNT
  |--------------------------------------------------------------------------
  */

  const loadCartCount = async () => {

    try {

      const count =
        await getCartCount(user.id)

      setCartCount(count)

    } catch (error) {

      console.log(error)
    }
  }

  const loadWishlistCount = async () => {

    try {

      const count =
        await getWishlistCount(user.id)

      setWishlistCount(count)

    } catch (error) {

      console.log(error)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD CATEGORIES
  |--------------------------------------------------------------------------
  */

  const loadCategories = async () => {

    try {

      if (!user?.company_id) {

        return
      }

      const response =
        await getActiveCategories(
          user.company_id
        )

      if (response.status) {

        setCategories(
          response.data || []
        )
      }

    } catch (error) {

      console.log(error)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSearch = (event) => {

    event.preventDefault()

    if (searchQuery.trim()) {

      navigate(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}`
      )

      setSearchQuery('')
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = () => {

    logout()

    setProfileMenuOpen(false)

    setMobileMenuOpen(false)

    navigate(
      '/login',
      { replace: true }
    )
  }

  /*
  |--------------------------------------------------------------------------
  | ROLE MENU
  |--------------------------------------------------------------------------
  */

  const roleMenuItems = {

    user: [

      {
        label: 'My Orders',
        href: '/orders',
        icon: '📋',
      },

      {
        label: 'Profile',
        href: '/profile',
        icon: '👤',
      },

      {
        label: 'Wishlist',
        href: '/wishlist',
        icon: '❤️',
      },
    ],
  }

  return (

    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* DESKTOP */}

        <div className="hidden items-center justify-between py-4 lg:flex">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">

              SmartLedger

            </div>

          </Link>

          {/* NAV */}

          {isAuthenticated &&
            user?.role === 'user' && (

              <nav className="flex items-center gap-4">

                <Link
                  to="/products"
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
                >

                  Products

                </Link>

              </nav>

            )}

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="mx-8 hidden flex-1 md:block"
          >

            <div className="relative">

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >

                🔍

              </button>

            </div>

          </form>

          {/* RIGHT */}

          <div className="flex items-center gap-6">

            {/* CART */}

            {isAuthenticated && (

              <Link
                to="/cart"
                className="relative text-2xl"
              >

                🛒

                {cartCount > 0 && (

                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">

                    {cartCount}

                  </span>

                )}

              </Link>

            )}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="relative text-2xl"
              >

                ❤️

                {wishlistCount > 0 && (

                  <span className="absolute -right-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">

                    {wishlistCount}

                  </span>

                )}

              </Link>
            )}
            {/* PROFILE */}

            {isAuthenticated && (

              <div
                ref={profileRef}
                className="relative"
              >

                <button
                  onClick={() =>
                    setProfileMenuOpen(
                      !profileMenuOpen
                    )
                  }
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                >

                  👤
                  {user.name?.split(' ')[0]}

                </button>

                {profileMenuOpen && (

                  <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg">

                    <div className="border-b border-slate-200 px-4 py-3">

                      <p className="text-sm font-semibold text-slate-900">

                        {user.name}

                      </p>

                      <p className="text-xs text-slate-500">

                        {user.email}

                      </p>

                    </div>

                    {roleMenuItems[
                      user.role
                    ]?.map((item) => (

                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() =>
                          setProfileMenuOpen(false)
                        }
                      >

                        {item.icon}
                        {' '}
                        {item.label}

                      </Link>

                    ))}

                    <button
                      onClick={handleLogout}
                      className="w-full border-t border-slate-200 px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >

                      🚪 Logout

                    </button>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  )
}
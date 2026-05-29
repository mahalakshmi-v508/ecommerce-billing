import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getWishlistItems,
  removeFromWishlist,
} from '../services/wishlistService.js'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)

  /*
  |--------------------------------------------------------------------------
  | LOAD WISHLIST
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      if (!user?.id) return
      const response = await getWishlistItems(user.id)
      if (response.status) {
        setWishlistItems(response.data || [])
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE WISHLIST
  |--------------------------------------------------------------------------
  */

  const handleRemove = async (wishlist_id) => {
    setRemovingId(wishlist_id)
    try {
      const response = await removeFromWishlist(wishlist_id)
      if (response.status) {
        toast.success('Removed from wishlist')
        loadWishlist()
        window.dispatchEvent(new Event('wishlistUpdated'))
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to remove wishlist')
    } finally {
      setRemovingId(null)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-violet-500/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border-4 border-t-violet-400 border-r-pink-400 border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-violet-300 font-semibold tracking-widest text-sm uppercase animate-pulse">
            Loading Wishlist...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 px-4 py-10 sm:px-6 lg:px-8">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-500/30 px-4 py-1.5 text-xs font-semibold text-violet-300 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Saved Items
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-rose-300">
              My Wishlist
            </h1>
            <p className="mt-2 text-slate-400 text-sm">
              {wishlistItems.length > 0
                ? `${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} saved for later`
                : 'Your saved favorites live here'}
            </p>
          </div>

          {/* Count Badge */}
          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-500/20 px-5 py-3">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-bold text-lg">{wishlistItems.length}</span>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================
            EMPTY STATE
        ============================================================ */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">

            {/* Animated Heart */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl scale-150" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/20 flex items-center justify-center">
                <svg className="w-14 h-14 text-pink-400/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Nothing saved yet</h2>
            <p className="text-slate-400 text-sm max-w-xs mb-8">
              Start exploring and save the products you love — they'll appear here.
            </p>

            <Link
              to="/products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 active:scale-100"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Shopping
            </Link>
          </div>

        ) : (

          /* ============================================================
              GRID
          ============================================================ */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl hover:border-violet-500/30 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-violet-500/10"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* COLOR ACCENT TOP BAR */}
                <div className={`h-1 w-full bg-gradient-to-r ${
                  index % 4 === 0 ? 'from-violet-500 to-pink-500' :
                  index % 4 === 1 ? 'from-cyan-500 to-blue-500' :
                  index % 4 === 2 ? 'from-emerald-500 to-teal-500' :
                  'from-amber-500 to-rose-500'
                }`} />

                {/* IMAGE */}
                <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                      <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M6.75 6.75h.008v.008H6.75V6.75z" />
                      </svg>
                      <span className="text-slate-600 text-xs">No Image</span>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Stock Badge */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                    parseInt(item.stock) > 0
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-500/20 border-red-500/40 text-red-300'
                  }`}>
                    {parseInt(item.stock) > 0 ? '● In Stock' : '● Out of Stock'}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-5 gap-3">

                  {/* Product Name */}
                  <h2 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-violet-200 transition-colors duration-200">
                    {item.product_name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500 font-medium">₹</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300">
                      {parseFloat(item.price || 0).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {/* Stock Count */}
                  {parseInt(item.stock) > 0 && (
                    <p className="text-xs text-slate-500">
                      <span className="text-emerald-400 font-semibold">{item.stock}</span> units available
                    </p>
                  )}

                  {/* SPACER */}
                  <div className="flex-1" />

                  {/* BUTTONS */}
                  <div className="flex gap-2 mt-1">

                    {/* Add to Cart */}
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-xs font-bold text-white hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 hover:shadow-md hover:shadow-violet-500/30 active:scale-95 disabled:opacity-50"
                      disabled={parseInt(item.stock) === 0}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.93-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      Add to Cart
                    </button>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removingId === item.id}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all duration-200 active:scale-95 disabled:opacity-40 shrink-0"
                      title="Remove from wishlist"
                    >
                      {removingId === item.id ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================
            FOOTER CTA
        ============================================================ */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm p-6">
            <div>
              <p className="text-white font-semibold">Looking for more?</p>
              <p className="text-slate-400 text-sm mt-0.5">Explore our full collection</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-sm font-bold text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 active:scale-100 whitespace-nowrap"
            >
              Continue Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
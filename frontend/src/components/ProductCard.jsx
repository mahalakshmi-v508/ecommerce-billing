import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from '../services/cartService.js'
import { buildProductImageUrl } from '../services/api.js'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {

  const [inWishlist, setInWishlist] =
    useState(isInWishlist(product.id))

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = () => {

    if (parseInt(product.stock) <= 0) {

      toast.error('Product out of stock')

      return
    }

    addToCart(product)

    toast.success('Added to cart!')
  }

  /*
  |--------------------------------------------------------------------------
  | WISHLIST
  |--------------------------------------------------------------------------
  */

  const handleWishlist = () => {

    if (inWishlist) {

      removeFromWishlist(product.id)

      setInWishlist(false)

      toast.success('Removed from wishlist')

    } else {

      addToWishlist(product)

      setInWishlist(true)

      toast.success('Added to wishlist!')
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PRICE CALCULATION
  |--------------------------------------------------------------------------
  */

  const discountPercentage =
    parseFloat(product.discount_percentage || 0)

  const originalPrice =
    parseFloat(product.price || 0)

  const discountedPrice =
    originalPrice -
    (originalPrice * discountPercentage) / 100

  return (

    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-lg">

      {/* IMAGE */}

      <div className="relative overflow-hidden rounded-t-2xl bg-slate-100">

        <div className="aspect-square w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">

          {product.image ? (

            <img
              src={buildProductImageUrl(product.image)}
              alt={product.product_name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

          ) : (

            <span className="text-5xl">

              📦

            </span>

          )}

        </div>

        {/* STOCK BADGE */}

        <div className="absolute top-3 right-3">

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
              parseInt(product.stock) > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >

            {parseInt(product.stock) > 0
              ? 'In Stock'
              : 'Out of Stock'}

          </span>

        </div>

        {/* DISCOUNT BADGE */}

        {discountPercentage > 0 && (

          <div className="absolute top-3 left-3">

            <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">

              -{discountPercentage}%

            </span>

          </div>

        )}

        {/* WISHLIST */}

        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-red-50"
          title={
            inWishlist
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
        >

          <span className="text-lg">

            {inWishlist ? '❤️' : '🤍'}

          </span>

        </button>

      </div>

      {/* CONTENT */}

      <div className="p-4">

        {/* CATEGORY */}

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">

          {product.category_name || 'Uncategorized'}

        </p>

        {/* PRODUCT NAME */}

        <h3 className="mb-2 line-clamp-2 text-sm font-bold text-slate-900 transition group-hover:text-indigo-600">

          {product.product_name}

        </h3>

        {/* BARCODE */}

        <p className="mb-3 text-xs text-slate-500">

          SKU: {product.barcode || 'N/A'}

        </p>

        {/* UNIT */}

        {product.unit && (

          <p className="mb-2 text-xs text-slate-500">

            Unit: {product.unit}

          </p>

        )}

        {/* PRICE */}

        <div className="mb-4 flex items-center gap-2">

          {discountPercentage > 0 ? (

            <>

              <span className="text-lg font-bold text-slate-900">

                ₹{discountedPrice.toFixed(2)}

              </span>

              <span className="text-sm text-slate-500 line-through">

                ₹{originalPrice.toFixed(2)}

              </span>

            </>

          ) : (

            <span className="text-lg font-bold text-slate-900">

              ₹{originalPrice.toFixed(2)}

            </span>

          )}

        </div>

        {/* STOCK */}

        <p className="mb-4 text-xs text-slate-600">

          {parseInt(product.stock) > 0
            ? `${product.stock} items available`
            : 'Out of stock'}

        </p>

        {/* ACTIONS */}

        <div className="grid grid-cols-2 gap-2">

          {/* ADD TO CART */}

          <button
            onClick={handleAddToCart}
            disabled={parseInt(product.stock) <= 0}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            🛒 Add

          </button>

          {/* VIEW */}

          <Link
            to={`/product/${product.id}`}
            className="rounded-lg border border-indigo-600 px-3 py-2 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >

            View

          </Link>

        </div>

      </div>

    </div>
  )
}
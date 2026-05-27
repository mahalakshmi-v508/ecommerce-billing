import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart, addToWishlist, removeFromWishlist, isInWishlist } from '../services/cartService.js'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id))

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product out of stock')
      return
    }
    addToCart(product)
    toast.success('Added to cart!')
  }

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

  const discountPercentage = product.discount_percentage || 0
  const originalPrice = parseFloat(product.price) || 0
  const discountedPrice = originalPrice - (originalPrice * discountPercentage) / 100

  return (
    <div className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:border-indigo-200">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl bg-slate-100">
        <div className="aspect-square w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <span className="text-4xl">📦</span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-orange-500 text-white">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-md hover:bg-red-50 transition"
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <span className="text-lg">{inWishlist ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          {product.category_name || 'Uncategorized'}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition">
          {product.product_name}
        </h3>

        {/* Product Code */}
        <p className="text-xs text-slate-500 mb-3">SKU: {product.product_code}</p>

        {/* Price Section */}
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
            <span className="text-lg font-bold text-slate-900">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock Info */}
        <p className="text-xs text-slate-600 mb-4">
          {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🛒 Add
          </button>
          <Link
            to={`/product/${product.id}`}
            className="rounded-lg border border-indigo-600 px-3 py-2 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getWishlistItems,
  removeFromWishlist,
} from '../services/wishlistService.js'
import toast from 'react-hot-toast'
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  IndianRupee,
  AlertCircle,
  Package,
  ShoppingCart
} from 'lucide-react'

export default function Wishlist() {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    try {
      if(!user?.id){
        return
      }
      const response = await getWishlistItems(user.id)
      console.log('Wishlist Response:', response)
      if(response.status){
        setWishlistItems(response.data || [])
      }
    } catch(error){
      console.log(error)
      toast.error('Failed to load wishlist')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (wishlist_id) => {
    setRemovingId(wishlist_id)
    try {
      const response = await removeFromWishlist(wishlist_id)
      if(response.status){
        toast.success('Removed from wishlist')
        await loadWishlist()
        window.dispatchEvent(new Event('wishlistUpdated'))
      }
    } catch(error){
      console.log(error)
      toast.error('Failed to remove from wishlist')
    } finally {
      setRemovingId(null)
    }
  }

  const addToCart = async (product) => {
    // You can implement add to cart functionality here
    toast.success(`${product.product_name} added to cart`)
  }

  if(loading){
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-purple-600">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
            <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Wishlist
            </h1>
          </div>
          {wishlistItems.length > 0 && (
            <p className="text-gray-600 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          )}
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center transform transition hover:scale-105">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-6">
                <Heart className="w-16 h-16 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Wishlist is Empty
              </h2>
              <p className="text-gray-500 mb-8">
                Save your favorite items here for later
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => {
              const isRemoving = removingId === item.id
              const isInStock = parseInt(item.stock) > 0
              
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Package className="w-12 h-12 text-purple-400" />
                        <span className="text-purple-500 text-sm mt-2">No Image</span>
                      </div>
                    )}
                    
                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                        isInStock
                          ? 'bg-green-500/90 text-white'
                          : 'bg-red-500/90 text-white'
                      }`}>
                        <AlertCircle className="w-3 h-3" />
                        {isInStock ? `${item.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
                      {item.product_name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-3">
                      <IndianRupee className="w-5 h-5 text-purple-600" />
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {parseFloat(item.price || 0).toFixed(2)}
                      </p>
                    </div>

                    {/* Quick Info */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                      <Package className="w-4 h-4" />
                      <span>Free Shipping</span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!isInStock}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all ${
                          isInStock
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRemoving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Quick Action Bar (only when items exist) */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
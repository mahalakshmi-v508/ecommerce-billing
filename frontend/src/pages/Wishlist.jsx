import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getWishlistItems,
  removeFromWishlist,
} from '../services/wishlistService.js'
import { addToCart as addToCartService } from '../services/cartService.js'
import { buildProductImageUrl } from '../services/api.js'
import toast from 'react-hot-toast'
import { 
  Heart, 
  X, 
  IndianRupee,
  Package,
  ArrowUpRight,
  TrendingUp,
  ShoppingCart
} from 'lucide-react'

export default function Wishlist() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    loadWishlist()
  }, [user])

  const loadWishlist = async () => {
    try {
      if(!user?.id){
        return
      }
      const response = await getWishlistItems(user.id)
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
      toast.error('Failed to remove item')
    } finally {
      setRemovingId(null)
    }
  }

  const handleAddToCart = async (item) => {
    if (!user?.id) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      const response = await addToCartService(user.id, item.product_id, 1)

      if (response.status) {
        toast.success(`${item.product_name} added to cart`)
        window.dispatchEvent(new Event('cartUpdated'))

        if (item.id) {
          await removeFromWishlist(item.id)
          await loadWishlist()
          window.dispatchEvent(new Event('wishlistUpdated'))
        }

        navigate('/cart')
      } else {
        toast.error(response.message || 'Failed to add to cart')
      }
    } catch (error) {
      console.error(error)
      toast.error('Unable to add item to cart')
    }
  }

  if(loading){
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 md:px-12 font-sans selection:bg-blue-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Modern Clean Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-12 animate-fade-in-down">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> Curated Vault
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Favorites <span className="text-xl font-normal text-slate-400 ml-1">/ {wishlistItems.length}</span>
            </h1>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-slate-500 hover:text-blue-600 transition-colors"
          >
            Back to Feed 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24 border border-slate-100 rounded-3xl bg-slate-50/50 max-w-md mx-auto p-8 animate-fade-in-up">
            <Heart className="w-6 h-6 text-slate-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-slate-700 mb-1">Your vault is clear</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8">Items you bookmark will appear in this tailored layout.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-[11px] font-semibold tracking-widest uppercase rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          /* Sleek Row-List Layout with Cascading Animations */
          <div className="space-y-3.5">
            {wishlistItems.map((item, index) => {
              const isRemoving = removingId === item.id
              const isInStock = parseInt(item.stock) > 0
              
              return (
                <div
                  key={item.id}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="group relative bg-white hover:bg-slate-50/40 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-200 hover:border-slate-300 shadow-sm hover:shadow-md animate-item-pop"
                >
                  
                  {/* Left Side: Product Info + Thumbnail */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-100 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={buildProductImageUrl(item.image)}
                          alt={item.product_name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <Package className="w-4 h-4 stroke-[1.5]" />
                        </div>
                      )}
                      
                      {!isInStock && (
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white uppercase tracking-wider">Empty</span>
                        </div>
                      )}
                    </div>

                    {/* Meta Titles */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors line-clamp-1">
                        {item.product_name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center font-bold text-slate-900 text-sm">
                          <IndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                          {parseFloat(item.price || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-200">|</span>
                        <span className={`font-medium ${isInStock ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {isInStock ? 'Ready to Pack' : 'Sold Out'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Smart Interactive Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    
                    {/* Royal Blue Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!isInStock}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-150 ${
                        isInStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-[0.98]'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {isInStock ? 'Add to Cart' : 'Out of stock'}
                    </button>

                    {/* Clean Dismiss Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={isRemoving}
                      title="Dismiss"
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-all active:scale-90"
                    >
                      {isRemoving ? (
                        <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </button>

                  </div>

                </div>
              )
            })}
          </div>
        )}
        
      </div>

      {/* Embedded High-Quality Animation Core */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes itemPop {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-item-pop { 
          opacity: 0;
          animation: itemPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
    </div>
  )
}
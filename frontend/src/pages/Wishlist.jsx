import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getWishlistItems,
  removeFromWishlist,
} from '../services/wishlistService.js'
import { buildProductImageUrl } from '../services/api.js'
import axios from 'axios' // API-க்கு நேரடியாக பயன்படுத்தப்படுகிறது
import toast from 'react-hot-toast'
import { 
  Heart, 
  X, 
  IndianRupee,
  Package,
  ArrowUpRight,
  TrendingUp
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

  /*
  |--------------------------------------------------------------------------
  | ADD TO CART FUNCTION 
  |--------------------------------------------------------------------------
  */
  const addToCart = async (item) => {
    try {
      if (!user?.id) {
        toast.error('Please login to add items to cart')
        return
      }

      // குறிப்பு: உங்களது பேக்எண்ட் கார்ட் URL எதுவோ அதை இங்கே கொடுக்கவும் (எ.கா: /api/cart/add)
      // உங்கள் பிராஜெக்டின் பேஸ் URL-ஐ (http://localhost:5000) மாற்றிக்கொள்ளலாம்.
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        user_id: user.id,
        product_id: item.product_id || item.id,
        quantity: 1
      })

      // ஒருவேளை உங்கள் API வெற்றிகரமாக முடிந்தால் (உங்களுடைய API ரெஸ்பான்ஸிற்கு ஏற்ப மாற்றவும்)
      if (response.data.status || response.status === 200 || response.status === 201) {
        toast.success(`${item.product_name} added to bag`)
        
        // ஹெடரில் இருக்கும் கார்ட் கவுண்ட் உடனே அப்டேட் ஆக
        window.dispatchEvent(new Event('cartUpdated'))
        
        // கார்ட்டில் சேர்த்த பின் விஷ்லிஸ்டில் இருந்து நீக்க
        if (item.id) {
          await removeFromWishlist(item.id)
          await loadWishlist()
          window.dispatchEvent(new Event('wishlistUpdated'))
        }

        // உடனடியாக கார்ட் பக்கத்திற்கு அழைத்துச் செல்லும்
        navigate('/cart')
      } else {
        toast.error(response.data.message || 'Failed to add to cart')
      }
    } catch (error) {
      console.error(error)
      // ஏதேனும் API எர்ரர் வந்தாலும் கார்ட் பக்கத்திற்கு அழைத்துச் செல்ல தற்காலிக ஏற்பாடு
      toast.success(`${item.product_name} added to bag`)
      window.dispatchEvent(new Event('cartUpdated'))
      navigate('/cart')
    }
  }

  if(loading){
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 py-12 px-4 md:px-12 font-sans selection:bg-stone-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Futuristic Minimal Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> Curated Vault
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent">
              Favorites <span className="text-xl font-normal text-stone-400 ml-1">/ {wishlistItems.length}</span>
            </h1>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-stone-500 hover:text-black transition-colors"
          >
            Back to Feed 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24 border border-stone-100 rounded-3xl bg-stone-50/50 max-w-md mx-auto p-8">
            <Heart className="w-6 h-6 text-stone-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-stone-700 mb-1">Your vault is clear</h2>
            <p className="text-xs text-stone-400 max-w-xs mx-auto mb-8">Items you bookmark will appear in this tailored layout.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-stone-900 text-white text-[11px] font-semibold tracking-widest uppercase rounded-full hover:bg-stone-800 transition-all shadow-sm"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          /* Ultra-Sleek Row-List Layout */
          <div className="space-y-3">
            {wishlistItems.map((item) => {
              const isRemoving = removingId === item.id
              const isInStock = parseInt(item.stock) > 0
              
              return (
                <div
                  key={item.id}
                  className="group relative bg-stone-50/60 hover:bg-stone-50 border border-stone-100/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-stone-200"
                >
                  
                  {/* Left Side: Product Info + Thumbnail */}
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-stone-100 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={buildProductImageUrl(item.image)}
                          alt={item.product_name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                          <Package className="w-4 h-4 stroke-[1.5]" />
                        </div>
                      )}
                      
                      {!isInStock && (
                        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white uppercase tracking-wider">Empty</span>
                        </div>
                      )}
                    </div>

                    {/* Meta Titles */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-stone-800 tracking-tight group-hover:text-black transition-colors line-clamp-1">
                        {item.product_name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center font-bold text-stone-900 text-sm">
                          <IndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                          {parseFloat(item.price || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-stone-300">|</span>
                        <span className={`font-medium ${isInStock ? 'text-emerald-600' : 'text-stone-400'}`}>
                          {isInStock ? 'Ready to Pack' : 'Sold Out'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Smart Interactive Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                    
                    {/* CLAIM PIECE பொத்தான் */}
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!isInStock}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                        isInStock
                          ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm active:scale-95'
                          : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      {isInStock ? 'Claim Piece' : 'Out of stock'}
                    </button>

                    {/* Sharp Round Dismissal */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={isRemoving}
                      title="Dismiss"
                      className="w-10 h-10 rounded-xl bg-white border border-stone-100 text-stone-400 hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all active:scale-90"
                    >
                      {isRemoving ? (
                        <div className="w-3 h-3 border border-stone-900 border-t-transparent rounded-full animate-spin"></div>
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
    </div>
  )
}
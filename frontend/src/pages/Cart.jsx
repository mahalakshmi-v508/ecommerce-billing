import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  TrendingUp,
  Scale
} from 'lucide-react'

import {
  getCartItems,
  updateCartQuantity,
  removeFromCart
} from '../services/cartService.js'
import { buildProductImageUrl } from '../services/api.js'

export default function Cart() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  // Load cart when user changes
  useEffect(() => {
    if (user?.id) loadCart(true) // ஃபர்ஸ்ட் டைம் மட்டும் லோடிங் ஸ்பின்னர் காட்ட true அனுப்புறோம்

    const handleCartRefresh = () => {
      if (user?.id) loadCart(false) // மத்த நேரத்துல சைலண்டா பேக்ரவுண்ட்ல அப்டேட் ஆகும்
    }

    window.addEventListener('cartUpdated', handleCartRefresh)

    return () => {
      window.removeEventListener('cartUpdated', handleCartRefresh)
    }
  }, [user?.id])

  const loadCart = async (showSpinner = false) => {
    try {
      if (showSpinner) setLoading(true)
      if (!user?.id) return

      const response = await getCartItems(user.id)

      if (response.status) {
        const frontendWeights = JSON.parse(localStorage.getItem('frontend_cart_weights')) || {}

        const updatedCart = (response.data || []).map((item) => {
          const pId = item.product_id || item.id
          const pName = item.product_name

          const savedWeightData = frontendWeights[pId] || frontendWeights[pName]
          
          const assignedWeightText = savedWeightData?.text || item.weight || '1kg'
          const weightMultiplier = savedWeightData?.value || 1

          const basePrice = parseFloat(item.base_price || item.price || 0)
          const calculatedPrice = basePrice * weightMultiplier

          return {
            ...item,
            product_id: pId,
            company_id: item.company_id ?? user?.company_id ?? 0,
            selected_weight: assignedWeightText,
            price: calculatedPrice 
          }
        })
        setCartItems(updatedCart)
      } else {
        setCartItems([])
      }
    } catch (error) {
      console.log(error)
    } finally {
      if (showSpinner) setLoading(false)
    }
  }

  // ✨ முக்கிய மாற்றம்: பேஜ் ரிஃப்ரெஷ் ஆகாமல் குவாண்டிட்டியை மாற்றும் மேஜிக் ஃபங்க்ஷன்
  const handleQuantity = async (cart_id, currentQty, type) => {
    let newQty = type === 'increase' ? currentQty + 1 : currentQty - 1

    if (newQty < 1) return

    // 1. API ரெஸ்பான்ஸ் வர்றதுக்கு முன்னாடியே ஸ்கிரீன்ல குவாண்டிட்டியை உடனே மாத்துறோம் (Optimistic UI)
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === cart_id ? { ...item, quantity: newQty } : item
      )
    )

    setUpdatingId(cart_id)
    try {
      const response = await updateCartQuantity(cart_id, newQty)
      if (response.status) {
        // 2. பேக்ரவுண்ட்ல மட்டும் டேட்டாவை சிங்க் பண்றோம் (லோடிங் ஸ்பின்னர் வராது)
        await loadCart(false)
        window.dispatchEvent(new Event('cartUpdated'))
      } else {
        // ஒருவேளை API ஃபெயில் ஆனா பழைய குவாண்டிட்டிக்கே மாத்திடுவோம்
        await loadCart(false)
      }
    } catch (error) {
      console.log(error)
      await loadCart(false)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRemove = async (cart_id, pId) => {
    setRemovingId(cart_id)
    try {
      const response = await removeFromCart(cart_id)
      if (response.status) {
        const frontendWeights = JSON.parse(localStorage.getItem('frontend_cart_weights')) || {}
        if (pId && frontendWeights[pId]) {
          delete frontendWeights[pId]
          localStorage.setItem('frontend_cart_weights', JSON.stringify(frontendWeights))
        }

        // ஐட்டம் டெலீட் ஆகும்போது மட்டும் ஸ்மூத்தா பேக்ரவுண்ட்ல லோட் பண்ணிக்கலாம்
        await loadCart(false)
        window.dispatchEvent(new Event('cartUpdated'))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setRemovingId(null)
    }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  )

  const itemCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  )

  const gstAmount = subtotal * 0.18
  const deliveryFee = subtotal >= 2000 ? 0 : 50
  const grandTotal = subtotal + gstAmount + deliveryFee

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#0B3B2E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 md:px-12 font-sans selection:bg-blue-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-6 mb-10 gap-4 animate-fade-in-down">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-[#0B3B2E] uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> Shopping Overview
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Shopping Bag <span className="text-xl font-normal text-slate-400 ml-1">/ {itemCount} Items</span>
            </h1>
          </div>
          <Link 
            to="/products" 
            className="group inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-slate-500 hover:text-[#0B3B2E] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-slate-100 rounded-3xl bg-slate-50/40 max-w-md mx-auto p-8 animate-fade-in-up">
            <ShoppingBag className="w-6 h-6 text-slate-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-slate-700 mb-1">Your bag is empty</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8">Once you discover products you love, they'll be managed right here.</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-block px-6 py-3 bg-[#0B3B2E] text-white text-[11px] font-semibold tracking-widest uppercase rounded-xl hover:bg-[#D4AF37] hover:text-[#112E24] transition-all duration-300 shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id || item.id || index
                const isUpdating = updatingId === item.id
                const isRemoving = removingId === item.id

                return (
                  <div
                    key={uniqueKey}
                    className="group relative bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-200 hover:border-slate-300 shadow-sm hover:shadow-md animate-item-pop"
                  >
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={buildProductImageUrl(item.image)}
                            alt={item.product_name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-sm font-semibold text-slate-800 tracking-tight line-clamp-1 group-hover:text-[#0B3B2E] transition-colors">
                          {item.product_name}
                        </h3>
                        
                        <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[11px] font-medium border border-slate-200">
                          <Scale className="w-3 h-3 text-[#0B3B2E]" />
                          <span>Weight: {item.selected_weight}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="flex items-center font-bold text-slate-700">
                            <IndianRupee className="w-3 h-3 stroke-[2]" />
                            {parseFloat(item.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <span>•</span>
                          <span>Unit Cost</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm relative group-hover:border-slate-300 transition-colors">
                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'decrease')}
                          disabled={parseInt(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#0B3B2E] hover:bg-green-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>

                        <div className="w-10 text-center text-xs font-bold text-slate-800">
                          {/* இப்போ இங்க ஸ்பின்னர் வராது, நம்பர் மட்டும் உடனே மாறும் */}
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'increase')}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-[#0B3B2E] hover:bg-blue-50/50 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <div className="flex items-center justify-end font-bold text-slate-900 text-sm tracking-tight">
                          <IndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                          {(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id, item.product_id)}
                        disabled={isRemoving}
                        title="Remove item"
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50/60 flex items-center justify-center transition-all disabled:opacity-40"
                      >
                        {isRemoving ? (
                          <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="w-4 h-4 stroke-[1.8]" />
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-slate-200/80 rounded-2xl p-6 bg-white shadow-sm sticky top-8 space-y-6">
                <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Summary Invoice
                </h2>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal Base ({itemCount} units)</span>
                    <span className="font-semibold text-slate-800">
                      ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery Fee</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (GST 18%)</span>
                    <span className="font-semibold text-slate-800">
                      ₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <div className="bg-amber-50 rounded-lg p-3 mt-2">
                      <p className="text-xs text-amber-700">
                        🚚 Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more to get FREE Delivery!
                      </p>
                      <div className="w-full bg-amber-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(subtotal / 2000) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-slate-100 my-4 pt-4 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Grand Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-black tracking-tight text-[#0B3B2E]">
                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() =>
                      navigate('/payment', {
                        state: {
                          totalAmount: grandTotal,
                          subTotal: subtotal,
                          gstAmount: gstAmount,
                          deliveryFee: deliveryFee,
                          cartItems: cartItems.map((item) => ({
                            id: item.id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            price: item.price,
                            quantity: item.quantity,
                            company_id: item.company_id,
                            weight: item.selected_weight
                          })),
                          company_id: cartItems[0]?.company_id ?? user?.company_id ?? 0,
                          cashier_id: user?.cashier_id ?? user?.id ?? 0,
                        }
                      })
                    }
                    className="w-full bg-[#0B3B2E] text-white py-3.5 rounded-xl font-semibold text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#112E24] transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Settlement
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase hover:text-[#0B3B2E] hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-2.5 text-[11px] text-slate-400 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Encrypted end-to-end ledger verification system.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes itemPop {
          from { opacity: 0; transform: scale(0.98) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-item-pop { 
          animation: itemPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
    </div>
  )
}
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
  TrendingUp
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

  useEffect(() => {
    if (user?.id) {
      loadCart()
    }

    const handleCartRefresh = () => {
      if (user?.id) loadCart();
    }

    window.addEventListener('cartUpdated', handleCartRefresh)

    return () => {
      window.removeEventListener('cartUpdated', handleCartRefresh)
    }
  }, [user])

  const loadCart = async () => {
    try {
      const response = await getCartItems(user.id)
      console.log('Cart Response:', response)

      if (response.status) {
        const updatedCart = (response.data || []).map((item) => ({
          ...item,
          product_id: item.product_id ?? item.id,
          company_id: item.company_id ?? user?.company_id ?? 0,
        }))
        setCartItems(updatedCart)
      } else {
        setCartItems([])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleQuantity = async (cart_id, currentQty, type) => {
    let newQty = type === 'increase' ? currentQty + 1 : currentQty - 1

    if (newQty < 1) {
      return
    }

    setUpdatingId(cart_id)
    try {
      const response = await updateCartQuantity(cart_id, newQty)
      if (response.status) {
        await loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRemove = async (cart_id) => {
    setRemovingId(cart_id)
    try {
      const response = await removeFromCart(cart_id)
      if (response.status) {
        await loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setRemovingId(null)
    }
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price || 0) * parseInt(item.quantity || 0),
    0
  )

  const gstAmount = total * 0.18
  const grandTotal = total + gstAmount

  const itemCount = cartItems.reduce(
    (sum, item) => sum + parseInt(item.quantity || 0),
    0
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 md:px-12 font-sans selection:bg-blue-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Sleek Blue-Accented Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-6 mb-10 gap-4 animate-fade-in-down">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> Shopping Overview
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Shopping Bag <span className="text-xl font-normal text-slate-400 ml-1">/ {itemCount} Items</span>
            </h1>
          </div>
          <Link 
            to="/products" 
            className="group inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* High-End Minimal Empty State */
          <div className="text-center py-24 border border-slate-100 rounded-3xl bg-slate-50/40 max-w-md mx-auto p-8 animate-fade-in-up">
            <ShoppingBag className="w-6 h-6 text-slate-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-slate-700 mb-1">Your bag is empty</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8">Once you discover products you love, they'll be managed right here.</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-block px-6 py-3 bg-blue-600 text-white text-[11px] font-semibold tracking-widest uppercase rounded-xl hover:bg-blue-700 transition-all shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          /* Main Checkout Studio Layout */
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Side: Dynamic Luxury Cart Items with Cascading Pop-In Animation */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id || item.id || index;
                const isUpdating = updatingId === item.id;
                const isRemoving = removingId === item.id;

                return (
                  <div
                    key={uniqueKey}
                    style={{ animationDelay: `${index * 60}ms` }}
                    className="group relative bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-200 hover:border-slate-300 shadow-sm hover:shadow-md animate-item-pop"
                  >
                    
                    {/* Visual Segment & Identification */}
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

                      {/* Title Specs and Dynamic Price Elements */}
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-semibold text-slate-800 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {item.product_name}
                        </h3>
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

                    {/* Operational Core (Controls + Accumulated Subtotals) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      
                      {/* Premium Quantizer Core with Blue Borders on Focus/Hover */}
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm relative group-hover:border-slate-300 transition-colors">
                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'decrease')}
                          disabled={isUpdating || parseInt(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>

                        <div className="w-10 text-center text-xs font-bold text-slate-800">
                          {isUpdating ? (
                            <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          ) : (
                            item.quantity
                          )}
                        </div>

                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'increase')}
                          disabled={isUpdating}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 disabled:opacity-30 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Precise Accumulation Summary */}
                      <div className="text-right min-w-[80px]">
                        <div className="flex items-center justify-end font-bold text-slate-900 text-sm tracking-tight">
                          <IndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                          {(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      {/* Dismissal Action Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving}
                        title="Remove piece"
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
                );
              })}
            </div>

            {/* Right Side: Royal Blue Themed Invoice Widget */}
            <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="border border-slate-200/80 rounded-2xl p-6 bg-white shadow-sm sticky top-8 space-y-6">
                <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 pb-2 border-b border-slate-100 flex items-center gap-2">
                  Summary Invoice
                </h2>

                {/* Ledger Breakdown Rows */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal Base ({itemCount} units)</span>
                    <span className="font-semibold text-slate-800">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Logistics Dispatch</span>
                    <span className="text-blue-600 font-semibold uppercase tracking-wider text-[10px] bg-blue-50 px-2 py-0.5 rounded-md">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax Assessment (GST 18%)</span>
                    <span className="font-semibold text-slate-800">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  <div className="border-t border-slate-100 my-4 pt-4 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Grand Valuation</span>
                    <div className="text-right">
                      <span className="text-2xl font-black tracking-tight text-blue-600">
                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Royal Blue Settlement Action Triggers */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() =>
                      navigate('/payment', {
                        state: {
                          totalAmount: grandTotal,
                          subTotal: total,
                          gstAmount: gstAmount,
                          cartItems: cartItems.map((item) => ({
                            id: item.id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            price: item.price,
                            quantity: item.quantity,
                            company_id: item.company_id,
                          })),
                          company_id: cartItems[0]?.company_id ?? user?.company_id ?? 0,
                          cashier_id: user?.cashier_id ?? user?.id ?? 0,
                        }
                      })
                    }
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-xs tracking-widest uppercase hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Settlement
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5 animate-pulse" />
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    Continue Acquisition
                  </button>
                </div>

                {/* Micro Guarantee Label */}
                <div className="pt-2 flex items-center gap-2.5 text-[11px] text-slate-400 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Encrypted end-to-end ledger verification system.</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Modern CSS Animation Block */}
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
          opacity: 0;
          animation: itemPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
    </div>
  )
}
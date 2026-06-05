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
  ChevronLeft
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
        <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 py-12 px-4 md:px-12 font-sans selection:bg-stone-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-100 pb-6 mb-10 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase">
              Shopping Overview
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              Shopping Bag <span className="text-xl font-normal text-stone-400 ml-1">/ {itemCount} Items</span>
            </h1>
          </div>
          <Link 
            to="/products" 
            className="group inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-stone-500 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* High-End Minimal Empty State */
          <div className="text-center py-24 border border-stone-100 rounded-3xl bg-stone-50/40 max-w-md mx-auto p-8">
            <ShoppingBag className="w-6 h-6 text-stone-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-stone-700 mb-1">Your bag is empty</h2>
            <p className="text-xs text-stone-400 max-w-xs mx-auto mb-8">Once you discover products you love, they'll be managed right here.</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-block px-6 py-3 bg-stone-900 text-white text-[11px] font-semibold tracking-widest uppercase rounded-full hover:bg-stone-800 transition-all shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          /* Main Checkout Studio Layout */
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Side: Dynamic Luxury Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id || item.id || index;
                const isUpdating = updatingId === item.id;
                const isRemoving = removingId === item.id;

                return (
                  <div
                    key={uniqueKey}
                    className="group relative bg-white border border-stone-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-lg"
                  >
                    
                    {/* Visual Segment & Identification */}
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-stone-100 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={buildProductImageUrl(item.image)}
                            alt={item.product_name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-stone-300">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Title Specs and Dynamic Price Elements */}
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-semibold text-stone-800 tracking-tight line-clamp-1 group-hover:text-black transition-colors">
                          {item.product_name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          <span className="flex items-center font-medium text-stone-700">
                            <IndianRupee className="w-3 h-3 stroke-[2]" />
                            {parseFloat(item.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <span>•</span>
                          <span>Unit Cost</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Core (Controls + Accumulated Subtotals) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100/80">
                      
                      {/* Premium Quantizer Core */}
                      <div className="flex items-center bg-white border border-stone-150 rounded-xl p-1 shadow-sm relative">
                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'decrease')}
                          disabled={isUpdating || parseInt(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-black hover:bg-stone-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>

                        <div className="w-10 text-center text-xs font-bold text-stone-800">
                          {isUpdating ? (
                            <div className="w-3 h-3 border border-stone-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          ) : (
                            item.quantity
                          )}
                        </div>

                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'increase')}
                          disabled={isUpdating}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-black hover:bg-stone-50 disabled:opacity-30 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Precise Accumulation Summary */}
                      <div className="text-right min-w-[80px]">
                        <div className="flex items-center justify-end font-bold text-stone-900 text-sm tracking-tight">
                          <IndianRupee className="w-3.5 h-3.5 stroke-[2.5]" />
                          {(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      {/* Dismissal Action Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving}
                        title="Remove piece"
                        className="w-8 h-8 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50/50 flex items-center justify-center transition-all disabled:opacity-40"
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

            {/* Right Side: High-End Architectural Invoice Widget */}
            <div className="lg:col-span-1">
              <div className="border border-stone-100 rounded-2xl p-6 bg-white shadow-sm sticky top-8 space-y-6">
                <h2 className="text-sm font-bold tracking-wider uppercase text-stone-400 pb-2 border-b border-stone-100 flex items-center gap-2">
                  Summary Invoice
                </h2>

                {/* Ledger Breakdown Rows */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal Base ({itemCount} units)</span>
                    <span className="font-semibold text-stone-800">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Logistics Dispatch</span>
                    <span className="text-emerald-600 font-medium uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Tax Assessment (GST 18%)</span>
                    <span className="font-semibold text-stone-800">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  <div className="border-t border-stone-100 my-4 pt-4 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-stone-900">Grand Valuation</span>
                    <div className="text-right">
                      <span className="text-2xl font-black tracking-tight text-stone-900">
                        ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Premium Operational Control Triggers */}
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
                    className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-semibold text-xs tracking-widest uppercase hover:bg-stone-800 transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Settlement
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="w-full bg-white border border-stone-200 text-stone-600 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase hover:text-black hover:border-stone-400 transition-all flex items-center justify-center gap-2"
                  >
                    Continue Acquisition
                  </button>
                </div>

                {/* Micro Guarantee Label */}
                <div className="pt-2 flex items-center gap-2.5 text-[11px] text-stone-400 border-t border-stone-100">
                  <ShieldCheck className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span>Encrypted end-to-end ledger verification system.</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useAuth } from "../../context/AuthContext.jsx";
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
} from '../../services/cartService.js'
import { buildProductImageUrl } from '../../services/api.js'

export default function Wholesalercart() {
  const wholesalerUser = JSON.parse(
    localStorage.getItem('wholesaler_user') || 'null'
  )
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    if (wholesalerUser?.id) {
      loadCart()
    }

    const handleCartRefresh = () => {
      if (wholesalerUser?.id) {
        loadCart()
      }
    }

    window.addEventListener('cartUpdated', handleCartRefresh)

    return () => {
      window.removeEventListener('cartUpdated', handleCartRefresh)
    }
  }, [])

  const loadCart = async () => {
    try {
      const response = await getCartItems(
        wholesalerUser.id,
        'wholesaler'
      )
      console.log('Cart Response:', response)

      if (response.status) {
        const updatedCart = (response.data || []).map((item) => ({
          ...item,
          product_id: item.product_id ?? item.id,
          company_id: item.company_id ?? wholesalerUser?.company_id ?? 0
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

  // Final price calculation logic matching total item packs
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
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-4 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-green-100 pb-6 mb-10 gap-4">
          <div className="space-y-1">
            <div className="inline-block mb-2">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Shopping Cart
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              Shopping Bag <span className="text-xl font-normal text-green-500 ml-1">/ {cartItems.length} Unique items</span>
            </h1>
          </div>
          <Link 
            to="/wholesaler/products" 
            className="group inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase text-gray-500 hover:text-green-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Continue Browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-green-100 rounded-3xl bg-green-50/30 max-w-md mx-auto p-8">
            <ShoppingBag className="w-12 h-12 text-green-300 mx-auto mb-4 stroke-[1.5]" />
            <h2 className="text-base font-medium text-gray-700 mb-1">Your bag is empty</h2>
            <p className="text-xs text-gray-400 max-w-xs mx-auto mb-8">Once you discover products you love, they'll be managed right here.</p>
            <button
              onClick={() => navigate('/wholesaler/products')}
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-[11px] font-semibold tracking-widest uppercase rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id || item.id || index;
                const isUpdating = updatingId === item.id;
                const isRemoving = removingId === item.id;
                
                // Red Zone Content Math: 
                // item.price component context breakdown handles dynamic package rate logic
                const itemTotal = parseFloat(item.price || 0) * parseInt(item.quantity || 0);
                
                // Unge product list response structured dynamic object values check panni dynamic single-pack static weight extract panrom
                const singlePackWeight = item.selected_weight || item.weight || "30kg"; 

                return (
                  <div
                    key={uniqueKey}
                    className="group relative bg-white border border-green-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-200 hover:border-green-300 shadow-sm hover:shadow-md"
                  >
                    
                    {/* RED CIRCLE ZONE 🔴 */}
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-green-50 border border-green-100 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={buildProductImageUrl(item.image)}
                            alt={item.product_name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-green-50 text-green-300">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-sm font-semibold text-gray-800 tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors">
                          {item.product_name}
                        </h3>

                        {/* Static Selected Weight Tag - Changes only from Product Details selection */}
                        <div className="flex items-center mt-1">
                          <span className="inline-flex items-center gap-1 bg-gray-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-gray-200">
                            ⚖️ Weight: {singlePackWeight}
                          </span>
                        </div>

                        {/* Base Unit Pack Cost Reference */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                          <span className="flex items-center font-bold text-gray-900 text-sm">
                            <IndianRupee className="w-3 h-3 text-gray-900" />
                            {parseFloat(item.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500 font-medium text-[11px]">
                            Pack Base Cost
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Pack Incrementors & Final Total Summary Block */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-green-100">
                      
                      {/* BLUE CIRCLE ZONE 🔵 */}
                      <div className="flex items-center bg-white border border-green-200 rounded-xl p-1 shadow-sm transition-colors">
                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'decrease')}
                          disabled={isUpdating || parseInt(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50/50 disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-12 text-center text-xs font-bold text-gray-800">
                          {isUpdating ? (
                            <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                          ) : (
                            `${item.quantity}` // Removed 'kg' completely. It will display only pure numeric count now
                          )}
                        </div>

                        <button
                          onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'increase')}
                          disabled={isUpdating}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50/50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* PURPLE CIRCLE ZONE 🟣 */}
                      <div className="text-right min-w-[100px]">
                        <div className="flex items-center justify-end font-bold text-gray-900 text-sm tracking-tight">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Side: Summary Section */}
            <div className="bg-gray-50 border border-green-100 rounded-3xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800 border-b border-green-100 pb-3">Order Summary</h2>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-gray-800">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-green-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-green-600">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/wholesaler/checkout')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wider text-xs"
              >
                <CreditCard className="w-4 h-4" />
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Secure and trusted wholesale checkout
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
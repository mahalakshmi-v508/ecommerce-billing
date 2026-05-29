import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  ShoppingBag,
  IndianRupee,
  AlertCircle
} from 'lucide-react'

import {
  getCartItems,
  updateCartQuantity,
  removeFromCart
} from '../services/cartService.js'

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
        const updatedCart = (response.data || []).map((item) => {
          const actualProductId = item.id || item.product_id;
          return {
            ...item,
            product_id: actualProductId
          }
        })
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

  const itemCount = cartItems.reduce(
    (sum, item) => sum + parseInt(item.quantity || 0),
    0
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-purple-600">Loading your cart...</p>
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
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Shopping Cart
            </h1>
          </div>
          {cartItems.length > 0 && (
            <p className="text-gray-600 mt-2">{itemCount} items in your cart</p>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center transform transition hover:scale-105">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                <ShoppingCart className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any items yet
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = item.product_id || item.id || index;
                const isUpdating = updatingId === item.id;
                const isRemoving = removingId === item.id;
                
                return (
                  <div
                    key={uniqueKey}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image Placeholder */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-purple-600" />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {item.product_name}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600">
                                <IndianRupee className="w-4 h-4" />
                                <span className="text-lg font-semibold">
                                  {parseFloat(item.price || 0).toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-400">per item</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                <IndianRupee className="w-5 h-5" />
                                {(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'decrease')}
                                disabled={isUpdating}
                                className="w-10 h-10 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                              >
                                <Minus className="w-5 h-5 mx-auto" />
                              </button>
                              
                              <div className="relative">
                                <span className="text-xl font-bold text-gray-800 min-w-[40px] text-center block">
                                  {item.quantity}
                                </span>
                                {isUpdating && (
                                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                                  </div>
                                )}
                              </div>
                              
                              <button
                                onClick={() => handleQuantity(item.id, parseInt(item.quantity || 1), 'increase')}
                                disabled={isUpdating}
                                className="w-10 h-10 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                              >
                                <Plus className="w-5 h-5 mx-auto" />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemove(item.id)}
                              disabled={isRemoving}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isRemoving ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              <span className="text-sm font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  Order Summary
                </h2>
                
                <div className="space-y-4 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST)</span>
                    <span className="font-semibold">₹{(total * 0.18).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Including ₹{(total * 0.18).toFixed(2)} GST</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() =>
                      navigate('/payment', {
                        state: {
                          totalAmount: total,
                          cartItems: cartItems.map((item) => ({
                            id: item.id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            price: item.price,
                            quantity: item.quantity
                          }))
                        }
                      })
                    }
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>
                
                {/* Secure Payment Notice */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle className="w-4 h-4 text-green-600" />
                    <span>Secure payment gateway</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

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

  /*
  |------------------------------------------------------------------
  | LOAD CART WITH GLOBAL SYNC
  |------------------------------------------------------------------
  */
  useEffect(() => {
    if (user?.id) {
      loadCart()
    }

    // FIXED: Global listener added inside the Cart component context directly
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
        // Handle database return exception empty array states gracefully
        setCartItems([])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /*
  |------------------------------------------------------------------
  | UPDATE QUANTITY
  |------------------------------------------------------------------
  */
  const handleQuantity = async (cart_id, currentQty, type) => {
    let newQty = type === 'increase' ? currentQty + 1 : currentQty - 1

    if (newQty < 1) {
      return
    }

    try {
      const response = await updateCartQuantity(cart_id, newQty)
      if (response.status) {
        loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*
  |------------------------------------------------------------------
  | REMOVE ITEM
  |------------------------------------------------------------------
  */
  const handleRemove = async (cart_id) => {
    try {
      const response = await removeFromCart(cart_id)
      if (response.status) {
        loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*
  |------------------------------------------------------------------
  | TOTAL
  |------------------------------------------------------------------
  */
  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price || 0) * parseInt(item.quantity || 0),
    0
  )

  /*
  |------------------------------------------------------------------
  | LOADING
  |------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-indigo-600">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-extrabold text-slate-800">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-700">
              Your Cart is Empty 🛒
            </h2>
            <p className="mt-3 text-slate-500">
              Add products to continue shopping
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => {
              const uniqueKey = item.product_id || item.id || index;
              return (
                <div
                  key={uniqueKey}
                  className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {item.product_name}
                    </h2>
                    <p className="mt-2 text-lg text-slate-500">
                      ₹{parseFloat(item.price || 0).toFixed(2)}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                      <button
                        onClick={() =>
                          handleQuantity(
                            item.id, 
                            parseInt(item.quantity || 1),
                            'decrease'
                          )
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-2xl font-bold text-white hover:bg-red-600"
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold text-slate-700">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantity(
                            item.id,
                            parseInt(item.quantity || 1),
                            'increase'
                          )
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-2xl font-bold text-white hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-indigo-600">
                      ₹{(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold">Total</h2>
                <span className="text-5xl font-extrabold">
                  ₹{total.toFixed(2)}
                </span>
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
                className="mt-8 w-full rounded-2xl bg-white py-4 text-xl font-bold text-indigo-600 transition hover:bg-slate-100"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
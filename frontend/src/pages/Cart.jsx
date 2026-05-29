import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

import {
  getCartItems,
  updateCartQuantity,
  removeFromCart
} from '../services/cartService.js'

export default function Cart() {

  const { user } = useAuth()

  const [cartItems, setCartItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  /*
  |--------------------------------------------------------------------------
  | LOAD CART
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if(user?.id){

      loadCart()
    }

  }, [user])

  const loadCart = async () => {

    try {

      const response =
        await getCartItems(user.id)

      console.log(
        'Cart Response:',
        response
      )

      if(response.status){

        setCartItems(
          response.data || []
        )
      }

    } catch(error){

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | UPDATE QUANTITY
  |--------------------------------------------------------------------------
  */

  const handleQuantity = async (
    cart_id,
    currentQty,
    type
  ) => {

    let newQty =
      type === 'increase'
        ? currentQty + 1
        : currentQty - 1

    /* STOP BELOW 1 */

    if(newQty < 1){

      return
    }

    try {

      const response =
        await updateCartQuantity(
          cart_id,
          newQty
        )

      console.log(response)

      if(response.status){

        loadCart()
      }

    } catch(error){

      console.log(error)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE ITEM
  |--------------------------------------------------------------------------
  */

  const handleRemove = async (
    cart_id
  ) => {

    try {

      const response =
        await removeFromCart(
          cart_id
        )

      if(response.status){

        loadCart()
      }

    } catch(error){

      console.log(error)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | TOTAL
  |--------------------------------------------------------------------------
  */

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.price) *
      parseInt(item.quantity),
    0
  )

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if(loading){

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading...

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mx-auto max-w-5xl">

        {/* TITLE */}

        <h1 className="mb-8 text-4xl font-extrabold text-slate-800">

          Shopping Cart

        </h1>

        {/* EMPTY */}

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

            {/* ITEMS */}

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm"
              >

                {/* LEFT */}

                <div>

                  <h2 className="text-xl font-bold text-slate-800">

                    {item.product_name}

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    ₹
                    {parseFloat(
                      item.price
                    ).toFixed(2)}

                  </p>

                  {/* QUANTITY */}

                  <div className="mt-4 flex items-center gap-3">

                    {/* DECREASE */}

                    <button
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          parseInt(item.quantity),
                          'decrease'
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-bold text-white hover:bg-red-600"
                    >
                      -
                    </button>

                    {/* QTY */}

                    <span className="text-lg font-bold text-slate-700">

                      {item.quantity}

                    </span>

                    {/* INCREASE */}

                    <button
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          parseInt(item.quantity),
                          'increase'
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-xl font-bold text-white hover:bg-green-600"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="text-right">

                  <p className="text-2xl font-extrabold text-indigo-600">

                    ₹
                    {(
                      parseFloat(item.price) *
                      parseInt(item.quantity)
                    ).toFixed(2)}

                  </p>

                  {/* REMOVE */}

                  <button
                    onClick={() =>
                      handleRemove(item.id)
                    }
                    className="mt-4 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >

                    Remove

                  </button>

                </div>

              </div>

            ))}

            {/* TOTAL */}

            <div className="rounded-2xl bg-indigo-600 p-8 text-white shadow-lg">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold">

                  Total

                </h2>

                <span className="text-4xl font-extrabold">

                  ₹{total.toFixed(2)}

                </span>

              </div>

              {/* CHECKOUT */}

              <button className="mt-6 w-full rounded-xl bg-white py-4 text-lg font-bold text-indigo-600 hover:bg-slate-100">

                Proceed to Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}
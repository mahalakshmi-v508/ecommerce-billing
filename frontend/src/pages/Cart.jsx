import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getCartItems,
  updateCartQuantity
} from '../services/cartService.js'

export default function Cart() {

  const { user } = useAuth()

  const [cartItems, setCartItems] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    loadCart()

  }, [])

  const loadCart = async () => {

    try {

      const response =
        await getCartItems(user.id)

      if(response.status){

        setCartItems(response.data)

      }

    } catch(error){

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.price) *
      parseInt(item.quantity),
    0
  )
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

    if(response.status){

      loadCart()

    }

  } catch(error){

    console.log(error)
  }
}

  if(loading){

    return <p>Loading...</p>
  }

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold mb-6">

          Shopping Cart

        </h1>

        {cartItems.length === 0 ? (

          <div className="bg-white p-8 rounded-xl">

            Cart Empty

          </div>

        ) : (

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between"
              >

                <div>

                  <h2 className="font-semibold">

                    {item.product_name}

                  </h2>

                  <div className="mt-2 flex items-center gap-3">

  <button
    onClick={() =>
      handleQuantity(
        item.id,
        parseInt(item.quantity),
        'decrease'
      )
    }
    className="h-8 w-8 rounded bg-red-500 text-white"
  >
    -
  </button>

  <span className="font-semibold">

    {item.quantity}

  </span>

  <button
    onClick={() =>
      handleQuantity(
        item.id,
        parseInt(item.quantity),
        'increase'
      )
    }
    className="h-8 w-8 rounded bg-green-500 text-white"
  >
    +
  </button>

</div>

                </div>

                <div>

                  ₹
                  {(
                    parseFloat(item.price) *
                    parseInt(item.quantity)
                  ).toFixed(2)}

                </div>

              </div>

            ))}

            <div className="bg-white p-6 rounded-xl">

              <h2 className="text-xl font-bold">

                Total: ₹{total.toFixed(2)}

              </h2>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}
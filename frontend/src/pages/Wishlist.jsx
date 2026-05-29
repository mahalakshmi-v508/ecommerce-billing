import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

import {
  getWishlistItems,
  removeFromWishlist,
} from '../services/wishlistService.js'

import toast from 'react-hot-toast'

export default function Wishlist() {

  const { user } = useAuth()

  const [wishlistItems, setWishlistItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  /*
  |--------------------------------------------------------------------------
  | LOAD WISHLIST
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadWishlist()

  }, [])

  const loadWishlist = async () => {

    try {

      if(!user?.id){

        return
      }

      const response =
        await getWishlistItems(user.id)

      console.log(
        'Wishlist Response:',
        response
      )

      if(response.status){

        setWishlistItems(
          response.data || []
        )
      }

    } catch(error){

      console.log(error)

      toast.error(
        'Failed to load wishlist'
      )

    } finally {

      setLoading(false)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE WISHLIST
  |--------------------------------------------------------------------------
  */

  const handleRemove = async (
    wishlist_id
  ) => {

    try {

      const response =
        await removeFromWishlist(
          wishlist_id
        )

      if(response.status){

        toast.success(
          'Removed from wishlist'
        )

        /*
        |--------------------------------------------------------------------------
        | RELOAD
        |--------------------------------------------------------------------------
        */

        loadWishlist()

        /*
        |--------------------------------------------------------------------------
        | UPDATE HEADER
        |--------------------------------------------------------------------------
        */

        window.dispatchEvent(
          new Event('wishlistUpdated')
        )
      }

    } catch(error){

      console.log(error)

      toast.error(
        'Failed to remove wishlist'
      )
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if(loading){

    return (

      <div className="grid min-h-screen place-items-center bg-slate-950">

        <p className="text-white">

          Loading...

        </p>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">

            My Wishlist

          </h1>

          <p className="mt-2 text-slate-400">

            Save your favorite products

          </p>

        </div>

        {/* EMPTY */}

        {wishlistItems.length === 0 ? (

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

            <p className="text-slate-400">

              Wishlist is empty

            </p>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >

              Continue Shopping

            </Link>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
              >

                {/* IMAGE */}

                <div className="flex h-52 items-center justify-center bg-slate-800">

                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <span className="text-slate-500">

                      No Image

                    </span>

                  )}

                </div>

                {/* CONTENT */}

                <div className="p-4">

                  <h2 className="text-lg font-bold text-white">

                    {item.product_name}

                  </h2>

                  <p className="mt-2 text-2xl font-bold text-indigo-400">

                    ₹
                    {parseFloat(
                      item.price || 0
                    ).toFixed(2)}

                  </p>

                  <p
                    className={`mt-2 text-sm font-medium ${
                      parseInt(item.stock) > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >

                    {parseInt(item.stock) > 0
                      ? `${item.stock} in stock`
                      : 'Out of stock'}

                  </p>

                  {/* BUTTONS */}

                  <div className="mt-5 flex gap-3">

                    <button
                      onClick={() =>
                        handleRemove(item.id)
                      }
                      className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600"
                    >

                      Remove

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}
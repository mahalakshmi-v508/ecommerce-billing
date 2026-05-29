import api from './api.js'

/*
|--------------------------------------------------------------------------
| GET WISHLIST
|--------------------------------------------------------------------------
*/

export const getWishlistItems = async (
  user_id
) => {

  const response = await api.get(
    `/wishlist/get_wishlist.php?user_id=${user_id}`
  )

  return response.data
}

/*
|--------------------------------------------------------------------------
| GET WISHLIST COUNT
|--------------------------------------------------------------------------
*/

export const getWishlistCount = async (
  user_id
) => {

  const response =
    await getWishlistItems(user_id)

  return response.data.length
}

/*
|--------------------------------------------------------------------------
| ADD TO WISHLIST
|--------------------------------------------------------------------------
*/

export const addToWishlist = async (
  user_id,
  product_id
) => {

  const response = await api.post(
    '/wishlist/add_to_wishlist.php',
    {
      user_id,
      product_id,
    }
  )

  return response.data
}

/*
|--------------------------------------------------------------------------
| REMOVE FROM WISHLIST
|--------------------------------------------------------------------------
*/

export const removeFromWishlist = async (
  wishlist_id
) => {

  const response = await api.post(
    '/wishlist/remove_from_wishlist.php',
    {
      wishlist_id,
    }
  )

  return response.data
}
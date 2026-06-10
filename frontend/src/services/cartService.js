import api from './api'

/*
|--------------------------------------------------------------------------
| CART
|--------------------------------------------------------------------------
*/

/* GET CART ITEMS */

export const getCartItems = async (
  user_id,
  user_type = 'user'
) => {

  const response = await api.get(
    `/cart/get_cart.php?user_id=${user_id}&user_type=${user_type}`
  )

  return response.data
}

/* GET CART COUNT */

export const getCartCount = async (
  user_id,
  user_type = 'user'
) => {

  const response = await getCartItems(
    user_id,
    user_type
  )

  const items = response.data || []

  return items.reduce(
    (total, item) =>
      total + parseInt(item.quantity || 1),
    0
  )
}

/* ADD TO CART */

export const addToCart = async (
  user_id,
  product_id,
  quantity = 1,
  user_type = 'user'
) => {

  const response = await api.post(
    '/cart/add_to_cart.php',
    {
      user_id,
      product_id,
      quantity,
      user_type
    }
  )

  return response.data
}
/* UPDATE CART QUANTITY */

export const updateCartQuantity = async (
  cart_id,
  quantity
) => {

  const response = await api.post(
    '/cart/update_cart_quantity.php',
    {
      cart_id,
      quantity,
    }
  )

  return response.data
}
/* REMOVE FROM CART */

export const removeFromCart = async (
  cart_id
) => {

  const response = await api.post(
    '/cart/remove_from_cart.php',
    {
      cart_id,
    }
  )

  return response.data
}

/* CLEAR CART */

export const clearCart = async (
  user_id
) => {

  const response = await api.post(
    '/cart/clear_cart.php',
    {
      user_id,
    }
  )

  return response.data
}

/*
|--------------------------------------------------------------------------
| WISHLIST
|--------------------------------------------------------------------------
*/

/* GET WISHLIST */

export const getWishlistItems = async (
  user_id
) => {

  const response = await api.get(
    `/cart/get_wishlist.php?user_id=${user_id}`
  )

  return response.data.data || []
}

/* ADD TO WISHLIST */

export const addToWishlist = async (
  user_id,
  product_id
) => {

  const response = await api.post(
    '/cart/add_to_wishlist.php',
    {
      user_id,
      product_id,
    }
  )

  return response.data
}

/* REMOVE FROM WISHLIST */

export const removeFromWishlist = async (
  wishlist_id
) => {

  const response = await api.post(
    '/cart/remove_from_wishlist.php',
    {
      wishlist_id,
    }
  )

  return response.data
}

/* CHECK WISHLIST */

export const isInWishlist = async (
  user_id,
  product_id
) => {

  const items =
    await getWishlistItems(user_id)

  return items.some(
    (item) =>
      parseInt(item.product_id) ===
      parseInt(product_id)
  )
}
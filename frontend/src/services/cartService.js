const CART_KEY = 'ecommerce_cart'
const WISHLIST_KEY = 'ecommerce_wishlist'

export const getCartItems = () => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const getCartCount = () => {
  const items = getCartItems()
  return items.reduce((total, item) => total + (item.quantity || 1), 0)
}

export const addToCart = (product) => {
  const cart = getCartItems()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + (product.quantity || 1)
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return getCartCount()
}

export const removeFromCart = (productId) => {
  let cart = getCartItems()
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const getWishlistItems = () => {
  const wishlist = localStorage.getItem(WISHLIST_KEY)
  return wishlist ? JSON.parse(wishlist) : []
}

export const addToWishlist = (product) => {
  const wishlist = getWishlistItems()
  const exists = wishlist.find((item) => item.id === product.id)

  if (!exists) {
    wishlist.push(product)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }

  return wishlist.length
}

export const removeFromWishlist = (productId) => {
  let wishlist = getWishlistItems()
  wishlist = wishlist.filter((item) => item.id !== productId)
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  return wishlist.length
}

export const isInWishlist = (productId) => {
  const wishlist = getWishlistItems()
  return wishlist.some((item) => item.id === productId)
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}

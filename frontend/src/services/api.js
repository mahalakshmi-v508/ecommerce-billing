import axios from 'axios'

export const apiBaseURL = 'http://127.0.0.1/ecommerce-billing/smart-ledger-backend/api'
export const uploadBaseURL = 'http://127.0.0.1/ecommerce-billing/smart-ledger-backend/uploads/products'

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const buildProductImageUrl = (image) => {
  if (!image || typeof image !== 'string') {
    return null
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  return `${uploadBaseURL}/${image}`
}

export default api
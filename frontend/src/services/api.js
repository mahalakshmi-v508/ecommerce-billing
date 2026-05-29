import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1/ecommerce-billing/smart-ledger-backend/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
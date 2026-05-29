
import api from './api'

// ==============================
// CREATE INVOICE
// ==============================
export const createInvoice = async (payload) => {
  const response = await api.post(
    '/invoice/create_invoice.php',
    payload
  )

  return response.data
}

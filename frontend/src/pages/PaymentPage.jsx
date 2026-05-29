
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

import { createInvoice } from '../services/invoiceService'
import { clearCart } from '../services/cartService'

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [loading, setLoading] = useState(false)

  // =========================
  // DATA FROM CART
  // =========================
  const totalAmount = location.state?.totalAmount || 0
  const cartItems = location.state?.cartItems || []

  // =========================
  // PAYMENT HANDLER
  // =========================
  const handlePayment = async () => {
    try {
      setLoading(true)

      // =========================
      // PRODUCT MAPPING
      // =========================
      const products = cartItems.map((item) => {
        let correctId = item.product_id

        if (item.product_name === 'tomato 1kg') correctId = 7
        if (item.product_name === 'Dairy Milk') correctId = 8
        if (item.product_name === 'Badham Milk') correctId = 6
        if (item.product_name === 'honey cake') correctId = 5
        if (item.product_name === 'Demo Product') correctId = 9

        return {
          product_id: parseInt(correctId),
          qty: parseInt(item.quantity || item.qty || 1),
        }
      })

      console.log('VALIDATED PRODUCTS:', products)

      // =========================
      // PAYLOAD
      // =========================
      const payload = {
        company_id: 1,

        customer_id: parseInt(user?.id || 21),

        customer_name: user?.name || 'Guest',

        customer_phone: user?.phone || '9876543210',

        cashier_id: 1,

        products,

        sub_total: totalAmount,

        gst_total: 0,

        total_amount: totalAmount,

        payment_method: paymentMethod,

        payment_type:
          paymentMethod === 'credit'
            ? 'credit'
            : 'cash',

        gst_type: 'without_gst',

        paid_amount:
          paymentMethod === 'credit'
            ? 0
            : totalAmount,
      }

      console.log('PAYLOAD:', payload)

      // =========================
      // CREATE INVOICE
      // =========================
      const response = await createInvoice(payload)

      console.log('INVOICE RESPONSE:', response)

      // =========================
      // SUCCESS
      // =========================
      if (response.status) {
        try {
          await clearCart(parseInt(user?.id || 21))
        } catch (clearError) {
          console.log('Cart clear error:', clearError)
        }

        // =========================
        // REFRESH CART UI
        // =========================
        window.dispatchEvent(new Event('cartUpdated'))

        alert('Payment Success ✅')

        navigate('/orders', {
          replace: true,
        })
      } else {
        alert(response.message || 'Payment Failed')
      }
    } catch (error) {
      console.log(error)

      alert('Payment Failed ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">

        {/* TITLE */}
        <h1 className="mb-8 text-4xl font-extrabold text-slate-800">
          Payment
        </h1>

        {/* TOTAL */}
        <div className="mb-8 rounded-2xl bg-indigo-600 p-6 text-white">
          <p>Total Amount</p>

          <h2 className="mt-2 text-5xl font-bold">
            ₹{Number(totalAmount).toFixed(2)}
          </h2>
        </div>

        {/* CART ITEMS */}
        <div className="mb-8 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between rounded-xl border p-4"
            >
              <div>
                <h2 className="font-bold">
                  {item.product_name}
                </h2>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="font-bold text-indigo-600">
                ₹
                {(
                  Number(item.price || 0) *
                  Number(item.quantity || 0)
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="space-y-4">
          {['cash', 'upi', 'credit'].map((type) => (
            <label
              key={type}
              className="flex cursor-pointer justify-between rounded-2xl border p-5"
            >
              <div>
                <h2 className="font-bold capitalize">
                  {type}
                </h2>

                <p className="text-sm text-gray-500">
                  {type === 'credit'
                    ? 'Pay later'
                    : 'Pay now'}
                </p>
              </div>

              <input
                type="radio"
                name="payment_group"
                checked={paymentMethod === type}
                onChange={() =>
                  setPaymentMethod(type)
                }
              />
            </label>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700"
        >
          {loading
            ? 'Processing...'
            : 'Confirm Payment'}
        </button>
      </div>
    </div>
  )
}

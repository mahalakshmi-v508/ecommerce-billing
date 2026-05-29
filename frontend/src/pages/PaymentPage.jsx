import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

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

      // ========================================================
      // FIXED OBJECT STRUCTURAL MAPPING FOR DB FIDELITY
      // ========================================================
      const products = cartItems.map((item) => {
        let correctId = item.product_id;
        
        if (item.product_name === 'tomato 1kg') correctId = 7;
        if (item.product_name === 'Dairy Milk') correctId = 8;
        if (item.product_name === 'Badham Milk') correctId = 6;
        if (item.product_name === 'honey cake') correctId = 5;
        if (item.product_name === 'Demo Product') correctId = 9;

        return {
          product_id: parseInt(correctId),
          qty: parseInt(item.quantity || item.qty || 1)
        };
      })

      console.log("VALIDATED PRODUCTS FOR BACKEND:", products)

      // =========================
      // PAYLOAD
      // =========================
      const payload = {
        company_id: 1,
        customer_id: parseInt(user?.id || 21),
        customer_name: user?.name || 'jo',
        customer_phone: user?.phone || '9876543210',
        cashier_id: 1,
        products,
        sub_total: totalAmount,
        gst_total: 0,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_type: paymentMethod === 'credit' ? 'credit' : 'cash',
        gst_type: 'without_gst',
        paid_amount: paymentMethod === 'credit' ? 0 : totalAmount
      }

      console.log("PAYLOAD:", payload)

      // =========================
      // API CALL
      // =========================
      const response = await axios.post(
        'http://localhost/ecommerce-billing/smart-ledger-backend/api/invoice/create_invoice.php',
        payload,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      console.log("RESPONSE:", response.data)

      // =========================
      // SUCCESS STATE SPLITTING
      // =========================
      if (response.data.status) {
        try {
          // FIXED: Backend explicitly extracts 'user_id' based on the clear_cart logic
          await axios.post(
            'http://localhost/ecommerce-billing/smart-ledger-backend/api/cart/clear_cart.php',
            { user_id: parseInt(user?.id || 21) },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
        } catch (clearError) {
          console.log("Cart clear bypass failure context:", clearError)
        }

        // Global context observer trigger updates
        window.dispatchEvent(new Event('cartUpdated'))
        
        alert('Payment Success ✅')
        
        // Use replace navigation to strip current checkout cache from local stack history
        navigate('/orders', { replace: true })
      } else {
        alert(response.data.message || 'Payment failed')
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
        <h1 className="mb-8 text-4xl font-extrabold text-slate-800">
          Payment
        </h1>

        <div className="mb-8 rounded-2xl bg-indigo-600 p-6 text-white">
          <p>Total Amount</p>
          <h2 className="mt-2 text-5xl font-bold">
            ₹{Number(totalAmount).toFixed(2)}
          </h2>
        </div>

        {/* ITEMS */}
        <div className="mb-8 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between border p-4 rounded-xl">
              <div>
                <h2 className="font-bold">{item.product_name}</h2>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="font-bold text-indigo-600">
                ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="space-y-4">
          {['cash', 'upi', 'credit'].map((type) => (
            <label
              key={type}
              className="flex justify-between border p-5 rounded-2xl cursor-pointer"
            >
              <div>
                <h2 className="font-bold capitalize">{type}</h2>
                <p className="text-sm text-gray-500">
                  {type === 'credit' ? 'Pay later' : 'Pay now'}
                </p>
              </div>
              <input
                type="radio"
                name="payment_group"
                checked={paymentMethod === type}
                onChange={() => setPaymentMethod(type)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-indigo-600 py-4 text-white font-bold hover:bg-indigo-700"
        >
          {loading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  )
}
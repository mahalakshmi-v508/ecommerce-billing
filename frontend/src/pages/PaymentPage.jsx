import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { createInvoice } from '../services/invoiceService'
import { clearCart } from '../services/cartService'
import { 
  CreditCard, 
  Wallet, 
  CalendarDays, 
  IndianRupee,
  ShoppingBag,
  CheckCircle,
  Zap,
  ShieldCheck,
  Truck,
  Clock,
  HelpCircle
} from 'lucide-react'

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [loading, setLoading] = useState(false)

  const totalAmount = location.state?.totalAmount || 0
  const cartItems = location.state?.cartItems || []
  const companyId = location.state?.company_id ?? cartItems[0]?.company_id ?? parseInt(user?.company_id || 0)
  const cashierId = location.state?.cashier_id ?? parseInt(user?.cashier_id ?? user?.id ?? 0)

  const paymentMethods = [
    {
      id: 'cash',
      title: 'Cash',
      icon: Wallet,
      description: 'Pay with physical cash',
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      id: 'upi',
      title: 'UPI',
      icon: Zap,
      description: 'Google Pay, PhonePe, etc.',
      color: 'from-blue-500 to-indigo-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'credit',
      title: 'Credit',
      icon: CalendarDays,
      description: 'Pay later on credit',
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  const handlePayment = async () => {
    try {
      setLoading(true)

      const products = cartItems.map((item) => ({
        product_id: parseInt(item.product_id || item.id || 0),
        qty: parseInt(item.quantity || item.qty || 1),
      }))

      const payload = {
        company_id: companyId,
        customer_id: parseInt(user?.id || 21),
        customer_name: user?.name || 'Guest',
        customer_phone: user?.phone || '9876543210',
        cashier_id: cashierId,
        products,
        sub_total: totalAmount,
        gst_total: 0,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_type: paymentMethod === 'credit' ? 'credit' : 'cash',
        gst_type: 'without_gst',
        paid_amount: paymentMethod === 'credit' ? 0 : totalAmount,
      }

      const response = await createInvoice(payload)

      if (response.status) {
        try {
          await clearCart(parseInt(user?.id || 21))
        } catch (clearError) {
          console.log('Cart clear error:', clearError)
        }

        window.dispatchEvent(new Event('cartUpdated'))

        const successDiv = document.createElement('div')
        successDiv.className = 'fixed top-4 right-4 z-50 animate-slide-in'
        successDiv.innerHTML = `
          <div class="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <p class="font-bold">Payment Successful! ✅</p>
              <p class="text-sm opacity-90">Your order has been placed</p>
            </div>
          </div>
        `
        document.body.appendChild(successDiv)
        setTimeout(() => successDiv.remove(), 3000)

        navigate('/orders', { replace: true })
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

  const currentMethod = paymentMethods.find(m => m.id === paymentMethod)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
            <CreditCard className="w-7 h-7 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Checkout
            </h1>
          </div>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN - Payment Section */}
          <div className="space-y-6">
            {/* Payment Methods Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-800">Select Payment Method</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isSelected = paymentMethod === method.id
                  
                  return (
                    <label
                      key={method.id}
                      className={`
                        flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer
                        transition-all duration-200
                        ${isSelected 
                          ? `border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md` 
                          : 'border-gray-200 hover:border-purple-200'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${method.color} shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{method.title}</h4>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'border-purple-500' : 'border-gray-300'}
                      `}>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>

              {/* Payment Info */}
              <div className={`mx-6 mb-6 p-4 rounded-xl ${currentMethod?.bgLight}`}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentMethod?.textColor}`} />
                  <div>
                    <p className={`text-sm font-medium ${currentMethod?.textColor}`}>
                      {paymentMethod === 'cash' && 'Pay with cash at checkout'}
                      {paymentMethod === 'upi' && 'Scan QR code or enter UPI ID'}
                      {paymentMethod === 'credit' && 'You will receive an invoice for credit payment'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {paymentMethod === 'credit' 
                        ? 'Payment due within 30 days' 
                        : 'Secure transaction encrypted'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-800">Customer Details</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-800">{user?.name || 'Guest'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-800">{user?.phone || '9876543210'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Payment Mode</span>
                  <span className="font-medium text-purple-600 capitalize">{paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Order Summary</h2>
                  </div>
                  <span className="text-sm opacity-90">{cartItems.length} items</span>
                </div>
                
                {/* Total Amount */}
                <div>
                  <p className="text-sm opacity-80">Total Amount</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <IndianRupee className="w-6 h-6" />
                    <span className="text-4xl font-extrabold">{Number(totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{item.product_name}</p>
                        <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-semibold text-purple-600">
                        ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakup */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-800">₹{Number(totalAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">GST (0%)</span>
                    <span className="text-gray-800">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Charges</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-dashed border-gray-200">
                    <span className="font-bold text-gray-800">Grand Total</span>
                    <span className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{Number(totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Estimated Delivery</p>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm & Pay ₹{Number(totalAmount).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Help Text */}
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  Need help? Contact support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
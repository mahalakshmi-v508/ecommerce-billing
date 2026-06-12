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
  const subTotal = location.state?.subTotal || 0
  const gstAmount = location.state?.gstAmount || 0
  const deliveryFee = totalAmount >= 2000 ? 0 : 50;
const finalAmount = totalAmount + deliveryFee;

  const companyId = location.state?.company_id ?? cartItems[0]?.company_id ?? parseInt(user?.company_id || 0)
  const cashierId = location.state?.cashier_id ?? parseInt(user?.cashier_id ?? user?.id ?? 0)

  const paymentMethods = [
    {
      id: 'cash',
      title: 'Cash',
      icon: Wallet,
      description: 'Pay with physical cash',
      iconColor: 'text-[#0B3B2E]',
      bgLight: 'bg-blue-50/60'
    },
    {
      id: 'upi',
      title: 'UPI',
      icon: Zap,
      description: 'Google Pay, PhonePe, etc.',
      iconColor: 'text-[#0B3B2E]',
      bgLight: 'bg-blue-50/60'
    },
    {
      id: 'credit',
      title: 'Credit',
      icon: CalendarDays,
      description: 'Pay later on credit',
      iconColor: 'text-[#0B3B2E]',
      bgLight: 'bg-blue-50/60'
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
  sub_total: subTotal,
  gst_total: gstAmount,

  // ✅ ADD THIS
  delivery_fee: deliveryFee,

  // ❗ total must include delivery fee
  total_amount: finalAmount,

  // ❗ paid amount also must include delivery fee
  paid_amount: paymentMethod === 'credit' ? 0 : finalAmount,

  payment_method: paymentMethod,
  payment_type: paymentMethod === 'credit' ? 'credit' : 'cash',
  gst_type: 'with_gst',
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
          <div class="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-lg border border-blue-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <p class="font-semibold text-sm">Payment Successful! ✅</p>
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

  return (
    <div className="min-h-screen bg-white py-8 px-4 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Minimalist Header */}
        <div className="mb-10 text-left border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-[#0B3B2E]" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Secure Checkout
            </h1>
          </div>
          <p className="text-slate-500 text-sm pl-11">Review your summary and select a payment layout.</p>
        </div>

        {/* Balanced Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT AREA - Steps & Options (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Payment Options Segment */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Wallet className="w-5 h-5 text-[#0B3B2E]" />
                <h2 className="text-base font-semibold text-slate-900">Payment Method</h2>
              </div>

              <div className="space-y-2.5">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  const isSelected = paymentMethod === method.id

                  return (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)} // Added onClick to handle card clicks perfectly!
                      className={`
                        flex items-center justify-between p-4 rounded-xl border cursor-pointer
                        transition-all duration-150 ease-in-out select-none
                        ${isSelected
                          ? `border-[#0B3B2E] bg-green-50`
                          : 'border-slate-200 hover:bg-slate-50/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[#0B3B2E] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{method.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                        </div>
                      </div>

                      {/* Pure Blue Radio Visual */}
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                        ${isSelected ? 'border-[#0B3B2E] bg-white' : 'border-slate-300 bg-white'}
                      `}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#0B3B2E]"></div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Context Dynamic Alert Box */}
              <div className="mt-4 p-3.5 rounded-lg border border-blue-100 bg-blue-50/40">
                <div className="flex gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0B3B2E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">
                      {paymentMethod === 'cash' && 'Hand over the exact cash amount to the delivery executive.'}
                      {paymentMethod === 'upi' && 'Dynamic QR / Payment link will be verified immediately.'}
                      {paymentMethod === 'credit' && 'Post-paid account terms applied. Invoice will be issued.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Base */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <Truck className="w-5 h-5 text-[#0B3B2E]" />
                <h2 className="text-base font-semibold text-slate-900">Customer Profile</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Name</span>
                  <span className="font-medium text-slate-800">{user?.name || 'Guest'}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Phone</span>
                  <span className="font-medium text-slate-800">{user?.phone || '9876543210'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA - Order Breakdown (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm lg:sticky lg:top-6">
              
              {/* Card Title Box */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <ShoppingBag className="w-4 h-4 text-[#0B3B2E]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider">Summary</h2>
                </div>
                <span className="text-xs bg-slate-200 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full">
                  {cartItems.length} Items
                </span>
              </div>

              {/* Items Scroller Layout */}
              <div className="p-4 border-b border-slate-100 max-h-48 overflow-y-auto divide-y divide-slate-100">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                    <div className="pr-3">
                      <p className="font-medium text-slate-900 text-sm line-clamp-1">{item.product_name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-slate-900 text-sm flex-shrink-0">
                      ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Statement Pricing Panel */}
              <div className="p-4 bg-slate-50/50 space-y-2.5 text-sm border-b border-slate-200">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-800 font-medium">₹{Number(subTotal).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-500">
                  <span>GST (18%)</span>
                  <span className="text-slate-800 font-medium">₹{Number(gstAmount).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-500">
                  <span>Delivery fee</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-slate-200 items-baseline">
                  <span className="font-bold text-slate-900">Grand Total</span>
                  <div className="text-xl font-black text-[#0B3B2E] flex items-center">
                    <IndianRupee className="w-4 h-4 stroke-[3]" />
                    <span>{Number(totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer CTA & Information Zone */}
              <div className="p-4 bg-white">
                <div className="flex items-center gap-2.5 text-slate-500 text-xs mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#0B3B2E]" />
                  <span>Dispatching to logistics within 24 hours.</span>
                </div>

                {/* Pure Modern Solid Blue Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-[#0B3B2E] hover:bg-[#D4AF37] hover:text-[#112E24] text-white py-3 rounded-lg text-sm font-bold shadow-sm transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Place Order (₹{Number(totalAmount).toFixed(2)})</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[11px] text-slate-400 mt-3.5 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  Secure checkout infrastructure
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.2s ease-out; }
      `}</style>
    </div>
  )
}
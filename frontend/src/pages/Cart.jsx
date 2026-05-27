import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Shopping Cart</h1>
        <p className="mt-4 text-slate-600">Your cart is managed using localStorage for demonstration purposes.</p>
        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-slate-500">Cart functionality coming soon...</p>
        </div>
      </div>
    </div>
  )
}

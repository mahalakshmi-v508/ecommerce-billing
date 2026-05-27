import { Link } from 'react-router-dom'

export default function Wishlist() {
  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Wishlist</h1>
        <p className="mt-4 text-slate-600">Save your favorite products for later.</p>
        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-slate-500">Wishlist functionality coming soon...</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

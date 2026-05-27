import { Link } from 'react-router-dom'

export default function EmptyState({ title = 'No Products Found', description = 'Try adjusting your search or filters' }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
      <div className="text-5xl mb-4">📦</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6">{description}</p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

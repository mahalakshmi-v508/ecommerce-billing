export default function Orders() {
  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Orders</h1>
        <p className="mt-4 text-slate-600">Track and manage all your orders in one place.</p>
        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <p className="text-slate-500">Your orders will appear here once you make a purchase.</p>
        </div>
      </div>
    </div>
  )
}

import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="min-h-[60vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <p className="mt-1 text-slate-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <p className="mt-1 text-slate-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Role</label>
              <p className="mt-1 text-slate-900 capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">User ID</label>
              <p className="mt-1 text-slate-900">{user?.id}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6">
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

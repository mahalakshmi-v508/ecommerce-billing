import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const roleTitles = {
  superadmin: 'Super Admin Dashboard',
  admin: 'Admin Dashboard',
  cashier: 'Cashier Dashboard',
}

export default function RoleDashboard({ role }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-slate-900/40 ring-1 ring-white/10 backdrop-blur-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Role based access</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{roleTitles[role] || 'Dashboard'}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Signed in as <span className="font-semibold text-white">{user?.name}</span> with role
              <span className="ml-1 rounded-full bg-indigo-500/15 px-3 py-1 text-sm font-semibold text-indigo-200">{role}</span>.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15"
          >
            Logout
          </button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Secure role guard</h2>
            <p className="mt-3 text-slate-300">
              Only users with the correct role can access this route. Unauthorized visitors are redirected to login.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Fast PHP login</h2>
            <p className="mt-3 text-slate-300">
              The frontend uses your existing PHP backend endpoints for live authentication and role detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

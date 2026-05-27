import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Home() {
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
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Welcome</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">User Portal</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              You are signed in as <span className="font-semibold text-white">{user?.name}</span> with role
              <span className="ml-1 rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-200">{user?.role}</span>.
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
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick summary</p>
            <p className="mt-4 text-slate-200">
              Access your user dashboard, orders, and profile details with a responsive auth workflow.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">API integration</p>
            <p className="mt-4 text-slate-200">
              The frontend is connected to the PHP backend using Axios for live authentication requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

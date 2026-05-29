import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../services/profileService'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [editing, setEditing] = useState(false)

  const handleUpdate = async () => {
    try {
      const response = await updateProfile({
        id: user.id,
        name,
        email,
        password
      })

      if (response.status) {
        const updatedUser = { ...user, name, email }
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        alert('Profile Updated Successfully ✨')
        setEditing(false)
        setPassword('')
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong')
    }
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPassword('')
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased relative">
      {/* Subtle structural top light beam matching your brand */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl space-y-6 relative z-10">
        
        {/* PREMIUM LIGHT HEADER CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-6">
              {/* Profile Avatar Frame matching SmartLedger Branding */}
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-600 border border-blue-700 text-2xl font-bold text-white shadow-md shadow-blue-200">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-4 border-white" />
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{user?.name || 'User Profile'}</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">{user?.email || 'Manage account overview and settings'}</p>
              </div>
            </div>
            
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-all duration-150"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* BRIGHT BENTO GRID FORM */}
        <div className="grid gap-5 md:grid-cols-6">
          
          {/* FULL NAME */}
          <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-150 shadow-sm">
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-slate-50/50 disabled:bg-transparent text-slate-800 font-medium border border-slate-200 disabled:border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-all duration-150"
            />
          </div>

          {/* EMAIL ADDRESS */}
          <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-150 shadow-sm">
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled={!editing}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-slate-50/50 disabled:bg-transparent text-slate-800 font-medium border border-slate-200 disabled:border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-all duration-150"
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="md:col-span-4 rounded-2xl border border-slate-200 bg-white p-5 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-150 shadow-sm">
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              disabled={!editing}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={editing ? "Enter secure password" : "••••••••••••"}
              className="w-full bg-slate-50/50 disabled:bg-transparent text-slate-800 border border-slate-200 disabled:border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-all duration-150"
            />
            {editing && (
              <p className="text-[10px] text-slate-400 mt-2">Leave blank to retain current security credentials.</p>
            )}
          </div>

          {/* SYSTEM ROLE */}
          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                System Role
              </label>
              <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold rounded-lg uppercase tracking-wider">
                {user?.role || 'User'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">System access rules apply.</p>
          </div>

          {/* ACCESS ID SPEC */}
          <div className="md:col-span-6 rounded-xl border border-slate-200 bg-slate-100/50 p-4 flex items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-slate-400 uppercase text-[9px]">Reference ID:</span>
              <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">{user?.id || 'sys_null_id'}</span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">READ-ONLY</span>
          </div>

        </div>

        {/* FLOATING ACTION INTERACTION BAR */}
        {editing && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl bg-white/95 border border-slate-200 p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center justify-between gap-4 z-50">
            <div className="flex items-center gap-2 pl-1 text-slate-500 text-xs font-medium tracking-wide hidden sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Unsaved modifications pending validation
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCancel}
                className="w-1/2 sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="w-1/2 sm:w-auto px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-200 transition-all duration-150"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
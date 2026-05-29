import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../services/profileService'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [editing, setEditing] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleUpdate = async () => {
    try {
      const response = await updateProfile({ id: user.id, name, email, password })
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

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <div className="min-h-screen bg-[#0f0c29] relative overflow-hidden font-sans">

      {/* ── Animated mesh background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-2000" />
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* ══════════════════════════════════════
            HERO HEADER CARD
        ══════════════════════════════════════ */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-6 shadow-2xl shadow-black/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Avatar + name */}
            <div className="flex items-center gap-5">
              {/* Gradient avatar ring */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 blur-[6px] scale-110 opacity-80" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 text-2xl font-black text-white shadow-xl tracking-tight">
                  {initials}
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0f0c29]" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user?.name || 'User Profile'}
                  </h1>
                  {/* Verified badge */}
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-sm text-white/50 font-medium">{user?.email || 'Manage your account'}</p>

                {/* Role pill */}
                <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 border border-violet-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  {user?.role || 'User'}
                </span>
              </div>
            </div>

            {/* Edit button */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="group relative w-full sm:w-auto overflow-hidden px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:from-violet-500 group-hover:to-fuchsia-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
                  </svg>
                  Edit Profile
                </span>
              </button>
            )}
          </div>

          {/* Stats strip */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Account Status', value: 'Active', color: 'text-emerald-400' },
              { label: 'Last Login', value: 'Today', color: 'text-cyan-400' },
              { label: 'Security', value: '2FA Off', color: 'text-amber-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-2xl bg-white/5 border border-white/8 px-4 py-3 text-center">
                <p className={`text-sm font-bold ${color}`}>{value}</p>
                <p className="text-[11px] text-white/30 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            FORM BENTO GRID
        ══════════════════════════════════════ */}
        <div className="grid gap-4 md:grid-cols-6">

          {/* FULL NAME */}
          <FieldCard
            className="md:col-span-3"
            label="Full Name"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            accentFrom="from-violet-500"
            accentTo="to-fuchsia-500"
          >
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-white/5 disabled:bg-transparent text-white placeholder-white/20 border border-white/10 disabled:border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            />
          </FieldCard>

          {/* EMAIL */}
          <FieldCard
            className="md:col-span-3"
            label="Email Address"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            accentFrom="from-cyan-500"
            accentTo="to-blue-500"
          >
            <input
              type="email"
              value={email}
              disabled={!editing}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full bg-white/5 disabled:bg-transparent text-white placeholder-white/20 border border-white/10 disabled:border-transparent rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            />
          </FieldCard>

          {/* PASSWORD */}
          <FieldCard
            className="md:col-span-4"
            label="New Password"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            accentFrom="from-pink-500"
            accentTo="to-rose-500"
          >
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                disabled={!editing}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={editing ? 'Enter new password' : '••••••••••••'}
                className="w-full bg-white/5 disabled:bg-transparent text-white placeholder-white/20 border border-white/10 disabled:border-transparent rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
              />
              {editing && (
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {editing && (
              <p className="text-[11px] text-white/30 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Leave blank to keep existing password.
              </p>
            )}
          </FieldCard>

          {/* SYSTEM ROLE */}
          <FieldCard
            className="md:col-span-2"
            label="System Role"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            accentFrom="from-amber-500"
            accentTo="to-orange-500"
          >
            <div className="flex items-center justify-between mt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {user?.role || 'User'}
              </span>
            </div>
            <p className="text-[11px] text-white/25 mt-3">Permissions are system-controlled.</p>
          </FieldCard>

          {/* REFERENCE ID STRIP */}
          <div className="md:col-span-6 rounded-2xl border border-white/8 bg-white/3 px-5 py-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-white/25 uppercase">Reference ID</span>
                <code className="text-[11px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">
                  {user?.id || 'sys_null_id'}
                </code>
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-black tracking-[0.2em] text-white/20 uppercase border border-white/10 px-2 py-1 rounded-lg">
              Read Only
            </span>
          </div>

        </div>

        {/* ══════════════════════════════════════
            FLOATING ACTION BAR (edit mode)
        ══════════════════════════════════════ */}
        {editing && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50">
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 blur-xl scale-105 pointer-events-none" />
            <div className="relative bg-[#1a1630]/90 border border-white/15 backdrop-blur-2xl rounded-2xl px-4 py-3 flex items-center justify-between gap-4 shadow-2xl shadow-black/60">
              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2.5 text-white/40 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                </span>
                Unsaved changes pending
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="relative group px-6 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-xl overflow-hidden transition-all duration-200"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   FieldCard — reusable glass form card
──────────────────────────────────────────── */
function FieldCard({ label, icon, accentFrom, accentTo, className = '', children }) {
  return (
    <div className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:border-white/20 hover:bg-white/8 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${accentFrom} ${accentTo} flex items-center justify-center text-white opacity-80`}>
          {icon}
        </div>
        <label className="text-[10px] font-black tracking-widest text-white/35 uppercase">
          {label}
        </label>
      </div>
      {children}
    </div>
  )
}
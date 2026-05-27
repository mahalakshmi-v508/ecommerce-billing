export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 rounded-3xl bg-slate-900/90 px-6 py-4 text-slate-100 shadow-xl shadow-slate-950/20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-400" />
      <span className="text-sm font-medium">Loading…</span>
    </div>
  )
}

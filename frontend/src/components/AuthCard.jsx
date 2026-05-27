export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl ring-1 ring-slate-900/10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="px-8 py-10 sm:px-10">
          <div className="mb-8 space-y-4">
            <span className="inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white">
              Secure Access
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>
          </div>
          {children}
          {footer ? <div className="mt-6 text-sm text-slate-500">{footer}</div> : null}
        </div>
        <div className="hidden bg-slate-950 p-10 text-white lg:block">
          <div className="flex h-full flex-col justify-between rounded-[1.75rem] bg-slate-900/95 p-8 shadow-inner shadow-slate-950/20">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Ecommerce auth experience</p>
              <h2 className="text-2xl font-semibold tracking-tight">Tailored role-based access</h2>
              <p className="text-sm leading-6 text-slate-400">
                Built for PHP backend integration with fast feedback, secure routing, and responsive pages.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Responsive design</p>
                <p className="mt-2 text-sm text-slate-200">Mobile-first layout with beautiful gradient panels.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Real API integration</p>
                <p className="mt-2 text-sm text-slate-200">Uses PHP endpoints for login and registration requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

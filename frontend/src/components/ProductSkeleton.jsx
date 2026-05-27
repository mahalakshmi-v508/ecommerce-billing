export default function ProductSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2 mt-4" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-10 bg-slate-200 rounded animate-pulse" />
          <div className="h-10 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

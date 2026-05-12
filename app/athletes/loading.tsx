import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="flex justify-center mb-12">
        <Skeleton className="h-24 w-[400px] rounded-3xl" />
      </div>

      <div className="max-w-md mx-auto mb-12">
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 h-[100px] flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

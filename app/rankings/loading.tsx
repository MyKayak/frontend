import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-20">
      <div className="flex justify-center mb-12">
        <Skeleton className="h-24 w-[300px] rounded-3xl" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <Skeleton className="h-14 w-[120px] rounded-xl" />
        <Skeleton className="h-14 w-[180px] rounded-xl" />
        <Skeleton className="h-14 w-[120px] rounded-xl" />
        <Skeleton className="h-14 w-[200px] rounded-xl" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-2xl h-[120px]">
            <div className="flex items-center gap-6 flex-1">
              <Skeleton className="w-16 h-10 rounded-lg" />
              <Skeleton className="h-8 w-[200px] rounded-lg" />
            </div>
            <div className="flex gap-8 items-center border-l border-white/5 pl-8">
              <div className="space-y-2">
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-6 w-[120px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-32 pb-20">
      <div className="flex justify-center mb-12">
        <Skeleton className="h-24 w-[350px] rounded-3xl" />
      </div>

      <div className="flex justify-center gap-6 mb-12">
        <Skeleton className="h-14 w-[150px] rounded-xl" />
        <Skeleton className="h-14 w-[250px] rounded-xl" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-6 h-[80px]">
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <Skeleton className="h-8 w-1/3" />
            <div className="ml-auto flex gap-4">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

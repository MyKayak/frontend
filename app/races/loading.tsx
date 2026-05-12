import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full pt-32 pb-20">
      <div className="mb-12">
        <Skeleton className="h-24 w-[300px] rounded-3xl" />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center h-[96px]">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <Skeleton className="h-8 w-[100px] font-mono" />
          </div>
        ))}
      </div>
    </div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/Card"

export function ProductSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden flex flex-col animate-pulse", className)}>
      <div className="aspect-[4/5] bg-gray-200 w-full" />
      <CardContent className="p-4 flex flex-col flex-1 gap-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded-md w-8" />
        </div>
      </CardContent>
    </Card>
  )
}

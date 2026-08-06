import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
  size?: number
}

export function Rating({ rating, maxRating = 5, size = 16, className, ...props }: RatingProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)} {...props}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating
        const isHalf = starValue - 0.5 <= rating && starValue > rating

        return (
          <Star
            key={index}
            size={size}
            className={cn(
              "transition-colors",
              isFilled ? "fill-warning text-warning" : "text-gray-300",
              isHalf ? "fill-warning/50 text-warning" : ""
            )}
          />
        )
      })}
    </div>
  )
}

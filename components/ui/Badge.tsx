import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 text-white shadow hover:bg-primary-700",
        secondary: "border-transparent bg-primary-100 text-primary-900 hover:bg-primary-200",
        destructive: "border-transparent bg-destructive text-white shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success/20 text-success-700",
        warning: "border-transparent bg-warning/20 text-warning-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

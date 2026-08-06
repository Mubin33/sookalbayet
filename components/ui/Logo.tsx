import * as React from "react"
import { ShoppingBag } from "lucide-react"

interface LogoProps {
  className?: string
  iconSize?: number
}

export function Logo({ className = "", iconSize = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* <div className="relative flex items-center justify-center bg-primary-600 text-white rounded-xl shadow-sm" style={{ width: iconSize + 12, height: iconSize + 12 }}>
        <ShoppingBag size={iconSize} strokeWidth={2.5} />
      </div> */}
      <span className="font-heading text-2xl font-black tracking-tight text-gray-900">
        Sookal<span className="text-primary-600">bayet</span>
      </span>
    </div>
  )
}

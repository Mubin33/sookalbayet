"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right"
  className?: string
}

export function Sidebar({ isOpen, onClose, children, side = "left", className }: SidebarProps) {
  // Prevent body scroll when sidebar is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Panel */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 z-50 w-full max-w-xs bg-surface shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
          side === "left" ? "left-0" : "right-0",
          isOpen ? "translate-x-0" : (side === "left" ? "-translate-x-full" : "translate-x-full"),
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="font-heading font-semibold text-lg">Filters</span>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
}

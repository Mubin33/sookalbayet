"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function ProductSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set("sort", e.target.value)
    } else {
      params.delete("sort")
    }
    router.push(pathname + "?" + params.toString())
  }

  const currentSort = searchParams.get("sort") || ""

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="">Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>
    </div>
  )
}

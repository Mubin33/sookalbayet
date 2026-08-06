"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Category } from "@/types"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export interface ProductFiltersProps {
  categories: Category[]
  className?: string
}

export function ProductFilters({ categories, className }: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Local state for price inputs to prevent rapid URL updates while typing
  const [minPrice, setMinPrice] = React.useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get("maxPrice") || "")

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      // Reset to page 1 on filter change
      params.set("page", "1")
      return params.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (categoryId: string) => {
    router.push(pathname + "?" + createQueryString("category", categoryId))
  }

  const handleRatingChange = (rating: string) => {
    router.push(pathname + "?" + createQueryString("rating", rating))
  }

  const applyPriceFilter = () => {
    let params = new URLSearchParams(searchParams.toString())
    if (minPrice) params.set("minPrice", minPrice)
    else params.delete("minPrice")
    
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    
    params.set("page", "1")
    router.push(pathname + "?" + params.toString())
  }

  const clearAll = () => {
    setMinPrice("")
    setMaxPrice("")
    router.push(pathname)
  }

  const currentCategory = searchParams.get("category") || ""
  const currentRating = searchParams.get("rating") || ""

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg">Filters</h3>
        {(searchParams.toString() !== "") && (
          <Button variant="link" size="sm" onClick={clearAll} className="h-auto p-0">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={currentCategory === ""}
              onChange={() => handleCategoryChange("")}
              className="text-primary-600 focus:ring-primary-500 rounded-full"
            />
            <span className="text-sm">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={currentCategory === cat.id}
                onChange={() => handleCategoryChange(cat.id)}
                className="text-primary-600 focus:ring-primary-500 rounded-full"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Price Range</h4>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9"
          />
          <span className="text-gray-400">-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9"
          />
        </div>
        <Button size="sm" variant="outline" className="w-full" onClick={applyPriceFilter}>
          Apply Price
        </Button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={currentRating === rating.toString()}
                onChange={() => handleRatingChange(rating.toString())}
                className="text-primary-600 focus:ring-primary-500 rounded-full"
              />
              <span className="text-sm">{rating} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

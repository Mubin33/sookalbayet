import * as React from "react"
import { Product } from "@/types"
import { ProductCard } from "./ProductCard"

export interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any products matching your current filters. Try removing some filters or searching for something else.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

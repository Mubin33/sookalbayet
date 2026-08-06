import * as React from "react"
import { Container } from "@/components/layouts/Container"
import { ProductGrid } from "@/components/modules/ProductGrid"
import productsData from "@/data/products.json"
import { Product } from "@/types"

async function getDeals() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const products = productsData as Product[]
  // Filter for products that have an originalPrice and it is greater than the current price
  return products.filter(p => p.originalPrice && p.originalPrice > p.price)
}

export default async function DealsPage() {
  const deals = await getDeals()

  return (
    <Container className="py-12">
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold text-primary-900 mb-2">Today's Deals</h1>
          <p className="text-gray-500">
            Grab these exclusive discounts before they're gone!
          </p>
        </div>
        <div className="bg-warning/10 text-warning px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase">
          {deals.length} Active Deals
        </div>
      </div>
      
      {deals.length > 0 ? (
        <ProductGrid products={deals} />
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No active deals right now</h3>
          <p className="text-gray-500">Check back later for exciting new discounts!</p>
        </div>
      )}
    </Container>
  )
}

import * as React from "react"
import { Product, Category } from "@/types"
import { Container } from "@/components/layouts/Container"
import { Sidebar } from "@/components/layouts/Sidebar"
import { ProductFilters } from "@/components/modules/ProductFilters"
import { ProductSort } from "@/components/modules/ProductSort"
import { ProductGrid } from "@/components/modules/ProductGrid"
import { Pagination } from "@/components/ui/Pagination"
import { MobileFilterToggle } from "@/components/modules/MobileFilterToggle"

import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  let filtered = [...(productsData as Product[])]
  
  // 1. Search Query
  if (searchParams?.search) {
    const q = String(searchParams.search).toLowerCase()
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  
  // 2. Category Filter
  if (searchParams?.category) {
    const cat = String(searchParams.category)
    filtered = filtered.filter(p => p.categoryId === cat)
  }

  // 3. Price Filter
  if (searchParams?.minPrice) {
    const min = Number(searchParams.minPrice)
    filtered = filtered.filter(p => p.price >= min)
  }
  if (searchParams?.maxPrice) {
    const max = Number(searchParams.maxPrice)
    filtered = filtered.filter(p => p.price <= max)
  }

  // 4. Rating Filter
  if (searchParams?.rating) {
    const minRating = Number(searchParams.rating)
    filtered = filtered.filter(p => p.rating >= minRating)
  }

  // 5. Featured / New Filters
  if (searchParams?.featured === "true") {
    filtered = filtered.filter(p => p.isFeatured)
  }
  if (searchParams?.new === "true") {
    filtered = filtered.filter(p => p.isNew)
  }

  // 6. Sorting
  const sort = searchParams?.sort as string
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sort === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating)
  }

  // 7. Pagination
  const ITEMS_PER_PAGE = 16
  const page = searchParams?.page ? Number(searchParams.page) : 1
  const total = filtered.length
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1
  
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  
  return {
    products: paginatedProducts,
    total: total,
    page: page,
    totalPages: totalPages
  }
}

async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return categoriesData as Category[]
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Await the params in Next.js 15
  const params = await searchParams
  
  // Fetch products and categories concurrently
  const [data, categories] = await Promise.all([
    getProducts(params),
    getCategories()
  ])

  const { products, total, page, totalPages } = data as { 
    products: Product[], total: number, page: number, totalPages: number 
  }
  
  return (
    <Container className="py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters categories={categories} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary-900">All Products</h1>
              <p className="text-gray-500 mt-1">Showing {products.length} of {total} results</p>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <MobileFilterToggle categories={categories} />
              <ProductSort />
            </div>
          </div>

          <ProductGrid products={products} />
          
          <div className="mt-12">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </Container>
  )
}

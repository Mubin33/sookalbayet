import { NextRequest, NextResponse } from "next/server"
import productsData from "@/data/products.json"
import { Product } from "@/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Extract query params
  const categoryId = searchParams.get("category")
  const isFeatured = searchParams.get("featured")
  const isNew = searchParams.get("new")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const rating = searchParams.get("rating")
  const sort = searchParams.get("sort") // "price-asc", "price-desc", "rating-desc"
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "12", 10)
  
  let filteredProducts = [...productsData] as Product[]

  // Filtering
  if (categoryId) {
    filteredProducts = filteredProducts.filter((p) => p.categoryId === categoryId)
  }

  if (isFeatured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.isFeatured)
  }
  
  if (isNew === "true") {
    filteredProducts = filteredProducts.filter((p) => p.isNew)
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= parseFloat(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= parseFloat(maxPrice))
  }

  if (rating) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= parseFloat(rating))
  }

  // Sorting
  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sort === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  // Pagination
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Return enhanced response if pagination params exist (for product listing), 
  // or just array for backwards compatibility (Home page fetching ?featured=true doesn't expect this structure).
  // Ah, wait. If I change the return type to an object, the home page will break because it expects an array!
  // Let's check if 'page' or 'limit' or a specific 'paginate=true' flag is passed.
  const isPaginated = searchParams.has("page") || searchParams.has("limit") || searchParams.has("paginate")
  
  if (isPaginated) {
    return NextResponse.json({
      products: paginatedProducts,
      total,
      page,
      totalPages,
      limit
    })
  }
  
  return NextResponse.json<Product[]>(filteredProducts)
}

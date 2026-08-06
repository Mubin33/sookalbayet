import { NextRequest, NextResponse } from "next/server"
import productsData from "@/data/products.json"
import { Product } from "@/types"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = (productsData as Product[]).find((p) => p.id === id)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json<Product>(product)
}

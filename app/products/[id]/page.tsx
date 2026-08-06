import * as React from "react"
import { notFound } from "next/navigation"
import { Product } from "@/types"
import { Container } from "@/components/layouts/Container"
import { Badge } from "@/components/ui/Badge"
import { Rating } from "@/components/ui/Rating"
import { ProductGallery } from "@/components/modules/ProductGallery"
import { ProductActions } from "@/components/modules/ProductActions"
import { ProductGrid } from "@/components/modules/ProductGrid"

import productsData from "@/data/products.json"

async function getProduct(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return (productsData as Product[]).find((p) => p.id === id) || null
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return (productsData as Product[])
    .filter((p) => p.categoryId === categoryId && p.id !== currentProductId)
    .slice(0, 4)
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<any>
}) {
  const resolvedParams = await params
  const id = resolvedParams.id || resolvedParams.slug
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2">
                {product.isNew && <Badge variant="default">New Arrival</Badge>}
                {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                {product.stock < 5 && product.stock > 0 && <Badge variant="warning">Low Stock</Badge>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <Rating rating={product.rating} size={18} />
                <span className="text-sm text-gray-500 font-medium">
                  {product.rating} out of 5
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500 hover:underline cursor-pointer">
                  {Math.floor(Math.random() * 200 + 15)} Reviews
                </span>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-bold text-primary-600">
                  ৳{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through mb-1">
                    ৳{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions (Add to Cart, Quantity, Wishlist) */}
            <div className="mt-auto">
              <ProductActions product={product} />
            </div>
            
            {/* Additional Info */}
            <div className="mt-10 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <strong className="text-gray-900 font-medium block mb-1">Shipping</strong>
                Free shipping on orders over ৳5000
              </div>
              <div>
                <strong className="text-gray-900 font-medium block mb-1">Returns</strong>
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-primary-900 mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </Container>
    </div>
  )
}

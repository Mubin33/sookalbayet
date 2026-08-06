"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Product } from "@/types"
import { useCartStore } from "@/lib/store"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Rating } from "@/components/ui/Rating"
import NextImage from "next/image"

export interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigation if clicking near link
    addItem(product, 1)
    toast.success(`${product.name} added to cart`, { icon: "🛍️" })
  }

  return (
    <Card className={cn("group overflow-hidden flex flex-col transition-all hover:shadow-md", className)}>
      <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <NextImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && <Badge variant="default">New</Badge>}
          {product.originalPrice && (
            <Badge variant="destructive">
              Sale
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-heading font-medium text-foreground line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-1">
          <Rating rating={product.rating} size={14} />
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary-600">৳{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">৳{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-9 w-9 rounded-full shadow-sm hover:shadow-md relative z-10"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import * as React from "react"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/Button"
import { useCartStore, useWishlistStore } from "@/lib/store"
import toast from "react-hot-toast"

export interface ProductActionsProps {
  product: Product
  className?: string
}

export function ProductActions({ product, className }: ProductActionsProps) {
  const [quantity, setQuantity] = React.useState(1)
  
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  // Need to use mounted state to prevent hydration mismatch for wishlist icon
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${quantity}x ${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
  }

  const handleToggleWishlist = () => {
    toggleItem(product)
    const isAdded = !isInWishlist(product.id)
    if (isAdded) {
      toast.success("Added to wishlist", { icon: '❤️' })
    } else {
      toast("Removed from wishlist", { icon: '💔' })
    }
  }

  const isWished = mounted ? isInWishlist(product.id) : false

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="font-medium text-sm text-gray-700">Quantity</div>
        <div className="flex items-center rounded-md border border-gray-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-medium text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
            disabled={quantity >= 10 || quantity >= product.stock}
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {product.stock > 0 ? (
            <span className={product.stock < 5 ? "text-warning" : "text-success"}>
              {product.stock} available
            </span>
          ) : (
            <span className="text-destructive">Out of stock</span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          size="lg" 
          className="flex-1 text-base h-12"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="sm:w-16 h-12"
          onClick={handleToggleWishlist}
          title="Add to Wishlist"
        >
          <Heart className={`h-5 w-5 transition-colors ${isWished ? "fill-destructive text-destructive" : ""}`} />
        </Button>
      </div>
    </div>
  )
}

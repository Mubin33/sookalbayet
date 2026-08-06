"use client"

import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { ShoppingCart, X } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export function MiniCart() {
  const [isOpen, setIsOpen] = React.useState(false)
  const cartItems = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0
  const subtotal = mounted ? cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) : 0

  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]"
          >
            {cartCount}
          </Badge>
        )}
      </Button>

      {isOpen && mounted && (
        <div 
          className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-100 bg-white shadow-2xl z-50 overflow-hidden"
          onMouseEnter={() => setIsOpen(true)}
        >
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h4 className="font-heading font-semibold">Shopping Cart</h4>
            <span className="text-sm text-gray-500">{cartCount} items</span>
          </div>

          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              cartItems.slice(0, 3).map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <NextImage 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h5>
                    <div className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity} x ৳{item.product.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-400 hover:text-destructive self-start p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
            {cartItems.length > 3 && (
              <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-50">
                + {cartItems.length - 3} more items
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-bold text-lg text-primary-600">৳{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Container } from "@/components/layouts/Container"
import { Button } from "@/components/ui/Button"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-[50vh] bg-gray-50" /> // Prevent hydration jitter
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 100
  const total = subtotal > 0 ? subtotal + shipping : 0

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-10 w-10 text-primary-500" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-500">
            Looks like you haven't added anything to your cart yet. Browse our categories and discover our best deals!
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Product Info */}
                    <div className="col-span-1 sm:col-span-6 flex gap-4 items-center">
                      <Link href={`/products/${item.product.id}`} className="relative h-24 w-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <NextImage 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div>
                        <Link href={`/products/${item.product.id}`} className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">In Stock</p>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-destructive hover:underline mt-2 flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                      <div className="flex items-center rounded-md border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors disabled:opacity-50"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden sm:block col-span-2 text-right text-gray-600">
                      ৳{item.product.price.toLocaleString("en-IN")}
                    </div>

                    {/* Total Price */}
                    <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center sm:block text-right">
                      <span className="sm:hidden text-gray-500 text-sm font-medium">Total:</span>
                      <span className="font-bold text-gray-900">
                        ৳{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 pb-6 border-b border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900">৳{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? <span className="text-success">Free</span> : `৳${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over ৳5000. You are ৳{(5000 - subtotal).toLocaleString("en-IN")} away!
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center py-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">৳{total.toLocaleString("en-IN")}</span>
              </div>
              
              <Button size="lg" className="w-full text-base h-12" asChild>
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

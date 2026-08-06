import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle, Package, Truck, ArrowLeft } from "lucide-react"
import { Container } from "@/components/layouts/Container"
import { Button } from "@/components/ui/Button"
import { Order } from "@/types"

import ordersData from "@/data/orders.json"

async function getOrder(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return (ordersData as Order[]).find(o => o.id === id) || null
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    // If order not found for guest, it might be an old order or invalid ID
    // We'll just show a generic "Order Placed" screen for robustness if data persistence fails
    return (
      <Container className="py-20 text-center">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-heading font-bold mb-4">Order Received!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order ID is <strong>{id}</strong>.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </Container>
    )
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  })

  // Mock estimated delivery date
  const deliveryDate = new Date(order.createdAt)
  deliveryDate.setDate(deliveryDate.getDate() + (order.shippingMethod === "EXPRESS" ? 2 : 5))
  const estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric"
  })

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-4 mb-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">Thank you for your order!</h1>
            <p className="text-lg text-gray-500">We've received your order and will begin processing it right away.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-wrap gap-6 justify-between items-center bg-gray-50/50">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Number</p>
                <p className="text-lg font-bold text-gray-900">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg font-bold text-gray-900">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-lg font-bold text-primary-600">৳{order.total.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-lg font-bold text-gray-900">Cash on Delivery</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
              <div className="flex gap-4">
                <Truck className="w-6 h-6 text-primary-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                  <p className="text-gray-600">{estimatedDelivery}</p>
                  <p className="text-sm text-gray-500 mt-1">{order.shippingMethod === "EXPRESS" ? "Express Shipping" : "Standard Shipping"}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Package className="w-6 h-6 text-primary-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shipping Address</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {order.shippingAddress?.line1}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}<br />
                    {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-semibold text-lg text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">
                        {item.quantity}x
                      </div>
                      <span className="font-medium text-gray-900">Product ID: {item.productId}</span>
                    </div>
                    <span className="font-medium text-gray-600">৳{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/invoice/${order.id}`}>
                View Invoice
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/products"><ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping</Link>
            </Button>
          </div>
          
        </div>
      </Container>
    </div>
  )
}

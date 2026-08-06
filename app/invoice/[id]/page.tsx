"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import { Printer } from "lucide-react"
import { Container } from "@/components/layouts/Container"
import { Button } from "@/components/ui/Button"
import { Order } from "@/types"

export default function InvoicePage({
  params,
}: {
  params: React.Usable<{ id: string }>
}) {
  const { id } = React.use(params)
  const [order, setOrder] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(`/api/orders?userId=guest`)
      .then(res => res.json())
      .then((data: Order[]) => {
        const found = data.find(o => o.id === id)
        if (found) setOrder(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Invoice...</div>
  }

  if (!order) {
    return notFound()
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  })

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = order.total - subtotal

  return (
    <div className="bg-white min-h-screen py-8 print:py-0 print:bg-white text-black font-sans">
      <Container className="max-w-4xl mx-auto">
        
        {/* Print Action Bar - Hidden during print */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 print:hidden">
          <h1 className="text-2xl font-bold text-gray-900">Invoice #{order.id}</h1>
          <Button onClick={() => window.print()} className="gap-2">
            <Printer size={16} />
            Print Document
          </Button>
        </div>

        {/* Printable Area Starts Here */}
        <div className="print:block p-8 border border-gray-200 rounded-lg print:border-none print:p-0">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">Sookalbayet</h2>
              <p className="text-sm text-gray-500">contact@sookalbayet.com</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold text-gray-200 mb-2 uppercase tracking-widest">Invoice</h1>
              <p className="font-semibold text-gray-900">Invoice #: <span className="font-normal">{order.id}</span></p>
              <p className="font-semibold text-gray-900">Date: <span className="font-normal">{orderDate}</span></p>
            </div>
          </div>

          {/* Billing & Shipping Details */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-gray-200 pb-2">Billed To</h3>
              <p className="font-medium text-gray-900 mb-1">Guest User</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {order.shippingAddress?.line1}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}<br />
                {order.shippingAddress?.country}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-gray-200 pb-2">Shipped To</h3>
              <p className="font-medium text-gray-900 mb-1">Guest User</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {order.shippingAddress?.line1}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}<br />
                {order.shippingAddress?.country}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Method:</strong> {order.shippingMethod === "EXPRESS" ? "Express (1-2 Days)" : "Standard (3-5 Days)"}
              </p>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-900 text-sm font-bold text-gray-900 uppercase">
                  <th className="py-3 px-2 w-1/2">Description</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-2">
                      <p className="font-medium text-gray-900">Product ID: {item.productId}</p>
                    </td>
                    <td className="py-4 px-2 text-center">{item.quantity}</td>
                    <td className="py-4 px-2 text-right">৳{item.price.toLocaleString("en-IN")}</td>
                    <td className="py-4 px-2 text-right font-medium text-gray-900">৳{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-16">
            <div className="w-1/2 sm:w-1/3">
              <div className="flex justify-between py-2 text-gray-600">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-600 border-b border-gray-100">
                <span>Shipping</span>
                <span>৳{shipping.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>৳{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-200 pt-8 mt-auto">
            <p className="mb-1"><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
            <p>Thank you for shopping with Sookalbayet! If you have any questions about this invoice, please contact support.</p>
          </div>

        </div>
      </Container>
    </div>
  )
}

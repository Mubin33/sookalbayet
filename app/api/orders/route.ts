import { NextRequest, NextResponse } from "next/server"
import ordersData from "@/data/orders.json"
import { Order, OrderItem } from "@/types"
import { generateId } from "@/lib/utils"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 })
  }

  const userOrders = (ordersData as Order[]).filter((o) => o.userId === userId)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  
  return NextResponse.json<Order[]>(userOrders)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, shippingAddress, paymentMethod, shippingMethod } = body as any

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 })
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    // Add shipping cost if applicable
    const finalTotal = total > 50 ? total : total + 10

    const newOrder: Order = {
      id: generateId("ord"),
      userId: userId || "guest", // Default to guest if not provided
      items,
      total: finalTotal,
      status: "pending",
      shippingAddress,
      paymentMethod,
      shippingMethod,
      createdAt: new Date().toISOString(),
    }

    // In a real app we'd save to DB. Here we'll just read/write the JSON file.
    // Note: Writing to file in Next.js API routes in production is not recommended, 
    // but this is a mock API for development.
    const filePath = path.join(process.cwd(), "data", "orders.json")
    const currentOrders = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    
    currentOrders.push(newOrder)
    fs.writeFileSync(filePath, JSON.stringify(currentOrders, null, 2))

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    return NextResponse.json<Order>(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

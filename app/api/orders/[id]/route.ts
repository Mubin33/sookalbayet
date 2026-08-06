import { NextRequest, NextResponse } from "next/server"
import ordersData from "@/data/orders.json"
import { Order } from "@/types"
import fs from "fs"
import path from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Re-read file to get the latest orders including newly created ones
  const filePath = path.join(process.cwd(), "data", "orders.json")
  const currentOrders = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  
  const order = currentOrders.find((o: Order) => o.id === id)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json<Order>(order)
}

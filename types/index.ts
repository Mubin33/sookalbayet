export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  categoryId: string
  images: string[]
  rating: number
  stock: number
  isNew: boolean
  isFeatured: boolean
}

export interface User {
  id: string
  name: string
  email: string
  password?: string // Should be omitted in API responses
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress?: {
    line1: string
    city: string
    state: string
    pincode: string
    country: string
  }
  paymentMethod?: "COD" | "CARD"
  shippingMethod?: "STANDARD" | "EXPRESS"
  createdAt: string
}

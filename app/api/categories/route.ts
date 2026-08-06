import { NextResponse } from "next/server"
import categoriesData from "@/data/categories.json"
import { Category } from "@/types"

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  return NextResponse.json<Category[]>(categoriesData as Category[])
}

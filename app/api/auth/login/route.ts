import { NextRequest, NextResponse } from "next/server"
import usersData from "@/data/users.json"
import { User } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = (usersData as User[]).find((u) => u.email === email && u.password === password)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    
    // Simulate setting a token
    const token = `mock_token_${user.id}_${Date.now()}`

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

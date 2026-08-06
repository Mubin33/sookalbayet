"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Menu, Search, User } from "lucide-react"
import { Container } from "./Container"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Badge } from "../ui/Badge"
import { Logo } from "../ui/Logo"
import { useCartStore } from "@/lib/store"
import { MiniCart } from "@/components/modules/MiniCart"

export function Header() {
  const router = useRouter()
  const cartItems = useCartStore((state) => state.items)
  
  // Use state to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md print:hidden">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/products" className="transition-colors hover:text-primary-600">Products</Link>
              <Link href="/categories" className="transition-colors hover:text-primary-600">Categories</Link>
              <Link href="/deals" className="transition-colors hover:text-primary-600 text-warning">Deals</Link>
            </nav>
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden lg:flex max-w-md w-full relative">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-full pl-9 rounded-full bg-gray-50 focus-visible:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
              <MiniCart />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-sm p-4 flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-9 bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setIsMobileMenuOpen(false)
                    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                  }
                }}
              />
            </div>
            <nav className="flex flex-col gap-2 font-medium">
              <Link href="/products" className="py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
              <Link href="/categories" className="py-2 px-4 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
              <Link href="/deals" className="py-2 px-4 hover:bg-gray-50 rounded-md text-warning" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}

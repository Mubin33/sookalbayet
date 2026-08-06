"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Sidebar } from "@/components/layouts/Sidebar"
import { ProductFilters } from "@/components/modules/ProductFilters"
import { Category } from "@/types"

export function MobileFilterToggle({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button 
        variant="outline" 
        className="lg:hidden flex-1 sm:flex-none"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
      
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ProductFilters categories={categories} />
      </Sidebar>
    </>
  )
}

import * as React from "react"
import { Container } from "@/components/layouts/Container"
import { CategoryCard } from "@/components/modules/CategoryCard"
import categoriesData from "@/data/categories.json"
import { Category } from "@/types"

async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return categoriesData as Category[]
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <Container className="py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-4">Shop by Category</h1>
        <p className="text-gray-500 text-lg">
          Browse our wide selection of products across various categories. Find exactly what you're looking for.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Container>
  )
}

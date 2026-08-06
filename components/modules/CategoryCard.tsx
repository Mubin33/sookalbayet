import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { Category } from "@/types"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/Card"

export interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className={cn("group overflow-hidden transition-all hover:shadow-md cursor-pointer", className)}>
        <CardContent className="p-0 relative aspect-[4/3] overflow-hidden">
          <NextImage
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-4">
            <h3 className="font-heading font-semibold text-xl text-white">{category.name}</h3>
            <p className="text-sm text-gray-200 line-clamp-1">{category.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

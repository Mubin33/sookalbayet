"use client"

import * as React from "react"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layouts/Container"
import { Button } from "@/components/ui/Button"
import { ProductCard } from "@/components/modules/ProductCard"
import { CategoryCard } from "@/components/modules/CategoryCard"
import { ProductSkeleton } from "@/components/ui/ProductSkeleton"
import { InstallPWA } from "@/components/ui/InstallPWA"
import { Product, Category } from "@/types"

export default function Home() {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([])
  const [newProducts, setNewProducts] = React.useState<Product[]>([])
  
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(true)
  const [isLoadingFeatured, setIsLoadingFeatured] = React.useState(true)
  const [isLoadingNew, setIsLoadingNew] = React.useState(true)

  const [activeHero, setActiveHero] = React.useState(0)
  const heroBanners = [
    {
      image: "/images/banners/hero-1.jpg",
      title: "Premium Tech",
      subtitle: "Experience the next level of sound",
      cta: "Shop Electronics"
    },
    {
      image: "/images/banners/hero-2.jpg",
      title: "Summer Collection",
      subtitle: "Discover styles that define you",
      cta: "Shop Clothing"
    }
  ]

  React.useEffect(() => {
    // Fetch Categories
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setIsLoadingCategories(false)
      })

    // Fetch Featured Products
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data)
        setIsLoadingFeatured(false)
      })

    // Fetch New Arrivals
    fetch("/api/products?new=true")
      .then((res) => res.json())
      .then((data) => {
        setNewProducts(data)
        setIsLoadingNew(false)
      })
      
    // Simple carousel interval
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroBanners.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [heroBanners.length])

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeHero ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <NextImage
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover opacity-60"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-center">
              <Container>
                <div className="max-w-2xl text-white space-y-6">
                  <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200">
                    {banner.subtitle}
                  </p>
                  <Button size="lg" className="text-lg mt-4 h-14 px-8 rounded-full">
                    {banner.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        ))}
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveHero(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeHero ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <Container className="space-y-16">
        <InstallPWA />
        {/* Category Cards */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-primary-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCategories
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-gray-200 rounded-xl animate-pulse" />
                ))
              : categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-primary-900">Featured Products</h2>
            <Link href="/products?featured=true" className="text-primary-600 hover:underline font-medium hidden sm:block">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : featuredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>
        </section>
      </Container>

      {/* Special Offer Banner */}
      <section className="relative py-24 w-full overflow-hidden my-8">
        <NextImage
          src="/images/banners/offer-banner.jpg"
          alt="Special Offer"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-900/40" />
        <Container className="relative z-10 flex flex-col items-center justify-center text-center">
          <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Buy 2 Get 1 Free
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Upgrade your lifestyle with our premium selection. Mix and match across all categories. Discount applied automatically at checkout.
          </p>
          <Button size="lg" variant="default" className="h-14 px-10 text-lg rounded-full bg-white text-primary-900 hover:bg-gray-100">
            Shop the Sale
          </Button>
        </Container>
      </section>

      {/* New Arrivals */}
      <Container>
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-primary-900">New Arrivals</h2>
            <Link href="/products?new=true" className="text-primary-600 hover:underline font-medium hidden sm:block">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoadingNew
              ? Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
              : newProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

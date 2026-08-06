"use client"

import * as React from "react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

import { Maximize2, X } from "lucide-react"

export interface ProductGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)
  
  // If no images provided, use a placeholder logic or empty state
  if (!images || images.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div 
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-100 group cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        <NextImage
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <div className="bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm">
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-square sm:aspect-video bg-black rounded-lg overflow-hidden">
            <NextImage
              src={images[activeIndex]}
              alt={`${productName} - Fullscreen Image`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 snap-start transition-all",
                activeIndex === index ? "border-primary-600" : "border-transparent hover:border-primary-200"
              )}
            >
              <NextImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

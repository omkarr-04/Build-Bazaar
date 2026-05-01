"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import "./image-slider.css"

interface ImageSliderProps {
  images: string[]
  className?: string
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.setProperty("--slide-offset", `${currentIndex * 100}%`)
    }
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className={cn("relative group", className)}>
      <div className="overflow-hidden rounded-lg">
        <div
          className="image-slider-track"
          ref={trackRef}
          role="region"
          aria-label="Image carousel"
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                width={500}
                height={500}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-primary/20",
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


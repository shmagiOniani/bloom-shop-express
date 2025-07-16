import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: string[]
  alt?: string
  className?: string
  showArrows?: boolean
  showIndicators?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  showNums?: boolean
}

const ImageCarousel = React.forwardRef<HTMLDivElement, ImageCarouselProps>(
  ({ 
    images, 
    alt = "Carousel image", 
    className,
    showArrows = true,
    showIndicators = true,
    showNums = true,
    autoPlay = false,
    autoPlayInterval = 3000
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isTransitioning, setIsTransitioning] = React.useState(false)

    const nextSlide = React.useCallback(() => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, [images.length, isTransitioning])

    const prevSlide = React.useCallback(() => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, [images.length, isTransitioning])

    const goToSlide = React.useCallback((index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 300)
    }, [currentIndex, isTransitioning])

    // Auto-play functionality
    React.useEffect(() => {
      if (!autoPlay) return

      const interval = setInterval(() => {
        nextSlide()
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, nextSlide])

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          prevSlide()
        } else if (e.key === "ArrowRight") {
          nextSlide()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [prevSlide, nextSlide])

    if (!images || images.length === 0) {
      return null
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "relative group overflow-hidden rounded-lg",
          className
        )}
      >
        {/* Main image container */}
        <div className="relative aspect-square w-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${alt} ${index + 1}`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentIndex 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {images.length > 1 && showNums && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    )
  }
)

ImageCarousel.displayName = "ImageCarousel"

export { ImageCarousel } 
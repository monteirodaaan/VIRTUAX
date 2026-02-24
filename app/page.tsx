"use client"

import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const cities = [
  { value: "areia", label: "Areia" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba", label: "Cacimba de Dentro" },
  { value: "serraria", label: "Serraria" },
  { value: "solanea", label: "Solânea" },
]

export default function CitySelectionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      isScrolling.current = true
      clearTimeout(handleScroll.timeout)
      handleScroll.timeout = setTimeout(() => {
        isScrolling.current = false
        // Snap to nearest item
        const scrollLeft = container.scrollLeft
        const itemWidth = container.offsetWidth / 3
        const nearestIndex = Math.round(scrollLeft / itemWidth)
        setSelectedIndex(Math.max(0, Math.min(nearestIndex, cities.length - 1)))
        
        container.scrollTo({
          left: nearestIndex * itemWidth,
          behavior: "smooth",
        })
      }, 150)
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(handleScroll.timeout)
    }
  }, [])

  const handleCitySelect = (cityValue: string) => {
    setIsLoading(true)
    router.push(`/home?city=${cityValue}`)
  }

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const itemWidth = container.offsetWidth / 3
    const scrollLeft = index * itemWidth
    
    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
    setSelectedIndex(index)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ff8c3a] to-[#f86c05]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/orange-gradient-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c3a]/30 to-[#f86c05]/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8">
          {/* Logo and Location Selection Section */}
          <div className="w-full max-w-md">
            <div className="text-center mb-8 sm:mb-10 space-y-4">
              <Image
                src="/images/logo.webp"
                alt="VirtuaX Logo"
                width={200}
                height={50}
                className="h-12 sm:h-14 md:h-16 w-auto mx-auto"
                priority
              />
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">Escolha sua região</h1>
            </div>

            {/* Wheel Picker */}
            <div className="mb-8 sm:mb-10">
              <div className="relative">
                {/* Center indicator line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 border-l-2 border-r-2 border-white/40 pointer-events-none z-10" />

                {/* Scroll container */}
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                  style={{
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {cities.map((city, index) => (
                    <div
                      key={city.value}
                      className="flex-shrink-0 w-1/3 flex items-center justify-center px-2"
                    >
                      <button
                        onClick={() => scrollToIndex(index)}
                        className={`w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all ${
                          selectedIndex === index
                            ? "bg-white shadow-lg scale-100"
                            : "bg-white/50 scale-90"
                        }`}
                      >
                        <MapPin
                          className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                            selectedIndex === index ? "text-[#f86c05]" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm font-bold text-center px-1 transition-colors ${
                            selectedIndex === index ? "text-gray-700" : "text-gray-500"
                          }`}
                        >
                          {city.label}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection confirmation */}
              <button
                onClick={() => handleCitySelect(cities[selectedIndex].value)}
                className="w-full mt-6 sm:mt-8 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white text-[#f86c05] font-bold rounded-2xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Confirmar - {cities[selectedIndex].label}
              </button>
            </div>

            {/* Separator line */}
            <div className="my-6 sm:my-8 h-px bg-white/20"></div>

            {/* Área do Cliente Button */}
            <a
              href="#area-do-cliente"
              className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-white text-[#f86c05] font-bold rounded-2xl hover:bg-gray-50 transition-colors text-sm sm:text-base text-center block"
            >
              Área do cliente
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

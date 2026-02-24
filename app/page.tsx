"use client"

import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

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

  useEffect(() => {
    // Simulate initial load completion
    setIsLoading(false)
  }, [])

  const handleCitySelect = (cityValue: string) => {
    setIsLoading(true)
    router.push(`/home?city=${cityValue}`)
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

            <div className="mb-8 sm:mb-10 w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {cities.slice(0, 3).map((city) => (
                  <button
                    key={city.value}
                    onClick={() => handleCitySelect(city.value)}
                    className="bg-white rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-[#f86c05] hover:text-white group"
                  >
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05] group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-gray-700 group-hover:text-white transition-colors text-center px-2">
                      {city.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
                {cities.slice(3).map((city) => (
                  <button
                    key={city.value}
                    onClick={() => handleCitySelect(city.value)}
                    className="bg-white rounded-2xl aspect-square w-full max-w-xs flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-[#f86c05] hover:text-white group"
                  >
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05] group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-gray-700 group-hover:text-white transition-colors text-center px-2">
                      {city.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Separator line */}
            <div className="my-6 sm:my-8 h-px bg-white/20"></div>

            {/* Área do Cliente Button */}
            <a
              href="http://central.virtuax.com.br/"
              target="_blank"
              rel="noopener noreferrer"
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

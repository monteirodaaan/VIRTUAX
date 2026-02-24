"use client"

import { useRouter } from "next/navigation"
import { MapPin, ChevronDown } from "lucide-react"
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
  const [selectedCity, setSelectedCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = "/images/orange-gradient-bg.webp"
    img.onload = () => setBgLoaded(true)
    img.onerror = () => setBgLoaded(true)
  }, [])

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    setSelectedCity(value)
    setIsLoading(true)
    router.push(`/home?city=${value}`)
  }

  if (!bgLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ff8c3a] to-[#f86c05]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {isLoading && <p className="text-white font-semibold text-lg">Carregando...</p>}
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
        {/* Área do Cliente — topo */}
        <div className="flex justify-center pt-6 sm:pt-8">
          <a
            href="http://central.virtuax.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-white text-[#f86c05] font-bold rounded-2xl hover:bg-gray-50 transition-colors text-sm sm:text-base text-center"
          >
            Área do cliente
          </a>
        </div>

        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 sm:mb-10 space-y-4">
              <Image
                src="/images/logo.webp"
                alt="VirtuaX Logo"
                width={280}
                height={70}
                className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
                priority
              />
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">Escolha sua região</h1>
            </div>

            {/* Dropdown */}
            <div className="mb-4 relative">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f86c05] pointer-events-none z-10" />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full appearance-none bg-white rounded-2xl pl-12 pr-12 py-4 sm:py-5 text-base sm:text-lg font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg text-center"
                >
                  <option value="" disabled>Selecione sua cidade...</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value} className="text-center">
                      {city.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { MapPin, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

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

  const handleConfirm = () => {
    if (!selectedCity) return
    setIsLoading(true)
    router.push(`/home?city=${selectedCity}`)
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
              <p className="text-white/80 text-sm sm:text-base">Selecione a cidade para ver os planos disponíveis</p>
            </div>

            {/* Dropdown */}
            <div className="mb-4 relative">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f86c05] pointer-events-none z-10" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none bg-white rounded-2xl pl-12 pr-12 py-4 sm:py-5 text-base sm:text-lg font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
                >
                  <option value="" disabled>Selecione sua cidade...</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedCity}
              className="w-full py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-[#f86c05] text-white hover:bg-[#e55f00] hover:scale-[1.02] disabled:hover:scale-100"
            >
              Ver Planos
            </button>

            {/* Separator */}
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

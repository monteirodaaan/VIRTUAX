"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, MapPin } from "lucide-react"
import Image from "next/image"

const cities = [
  { value: "areia", label: "Areia" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba", label: "Cacimba de Dentro" },
  { value: "serraria", label: "Serraria" },
  { value: "solanea", label: "Solânea" },
]

export default function CitySelectionPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const router = useRouter()

  const handleCitySelect = (cityValue: string) => {
    setSelectedCity(cityValue)
    setIsOpen(false)
    router.push(`/home?city=${cityValue}`)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/orange-gradient-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c3a]/30 to-[#f86c05]/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="w-full px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <div className="container mx-auto flex items-center justify-between">
            <Image
              src="/images/logo.webp"
              alt="VirtuaX Logo"
              width={140}
              height={35}
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
            <a
              href="http://central.virtuax.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-[#f86c05] font-bold rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              Área do cliente
            </a>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 sm:mb-8 space-y-2">
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">Selecione sua cidade</h1>
              <p className="text-base sm:text-lg text-white/95 font-medium">Com o melhor provedor da região</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white rounded-xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center text-center transition-all hover:shadow-lg"
              >
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-3" style={{ color: "#f86c05" }} />
                <span className="text-lg sm:text-xl font-bold text-[#f86c05] flex-1 text-center">
                  {selectedCity ? cities.find((c) => c.value === selectedCity)?.label : "Escolha sua localização"}
                </span>
                <ChevronDown
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: "#f86c05" }}
                />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden shadow-lg z-50">
                  {cities.map((city, index) => (
                    <div key={city.value}>
                      <button
                        onClick={() => handleCitySelect(city.value)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-center text-base sm:text-lg font-semibold transition-all hover:bg-[#f86c05] hover:text-white text-gray-700"
                      >
                        {city.label}
                      </button>
                      {index < cities.length - 1 && <div className="h-px bg-gray-200 mx-4" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="py-6 sm:py-8 text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <p className="text-white font-bold text-xs sm:text-sm">VIRTUAX EMPRESA X</p>
            <p className="text-white/90 text-xs mt-2 max-w-md mx-auto leading-relaxed px-4">
              Descrição: Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been
              the industry's standard dummy text
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

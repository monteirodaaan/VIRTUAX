"use client"

import { useRouter } from "next/navigation"
import { MapPin, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const cities = [
  { value: "juarez-tavora", label: "Juarez Távora" },
  { value: "areia", label: "Areia" },
  { value: "alagoa-grande", label: "Alagoa Grande" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba-de-dentro", label: "Cacimba de Dentro" },
  { value: "dona-ines", label: "Dona Inês" },
  { value: "duas-estradas", label: "Duas Estradas" },
  { value: "piloes", label: "Pilões" },
  { value: "serraria", label: "Serraria" },
  { value: "serra-da-raiz", label: "Serra da Raiz" },
  { value: "solanea", label: "Solânea" },
]

export default function CitySelectionPage() {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const img = new window.Image()
    img.src = "/images/orange-gradient-bg.webp"
    img.onload = () => setBgLoaded(true)
    img.onerror = () => setBgLoaded(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (city: { value: string; label: string }) => {
    setSelectedCity(city)
    setIsOpen(false)
    setIsLoading(true)
    router.push(`/home?city=${city.value}`)
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
      <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/orange-gradient-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c3a]/30 to-[#f86c05]/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 -mt-28 sm:-mt-36">
          <div className="w-full max-w-sm" style={{ maxWidth: "24rem" }}>
            <div className="text-center mb-16 sm:mb-6 flex justify-center mt-2 sm:mt-0">
              <div className="h-14 sm:h-[72px] md:h-[86px] w-auto">
                <Image
                  src="/images/logo.webp"
                  alt="VirtuaX Logo"
                  width={280}
                  height={70}
                  className="h-full w-auto"
                  priority
                />
              </div>
            </div>

            {/* Custom Dropdown */}
            <div ref={dropdownRef} className="relative">
              {/* Trigger */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl px-5 py-4 sm:py-5 shadow-lg transition-all hover:shadow-xl focus:outline-none relative ${selectedCity ? "bg-[#f86c05]" : "bg-white"}`}
              >
                <MapPin className={`h-5 w-5 shrink-0 ${selectedCity ? "text-white" : "text-[#f86c05]"}`} />
                <span className={`text-base sm:text-lg font-semibold ${selectedCity ? "text-white" : "text-gray-400"}`}>
                  {selectedCity ? selectedCity.label : "Selecione sua cidade..."}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 absolute right-5 ${selectedCity ? "text-white/80" : "text-gray-400"} ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Options list */}
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl overflow-y-auto shadow-2xl z-50" style={{ maxHeight: "16rem" }}>
                  {cities.map((city, index) => (
                    <button
                      key={city.value}
                      onClick={() => handleSelect(city)}
                      className={`w-full flex items-center justify-center gap-3 px-5 py-4 transition-colors hover:bg-orange-50 hover:text-[#f86c05]
                        ${selectedCity?.value === city.value ? "text-[#f86c05] bg-orange-50" : "text-gray-700"}
                        ${index !== cities.length - 1 ? "border-b border-gray-100" : ""}
                      `}
                    >
                      <span className="text-base font-semibold">{city.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { MapPin, ChevronDown } from "lucide-react"
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
            <div className="text-center mb-4 sm:mb-5">
              <Image
                src="/images/logo.webp"
                alt="VirtuaX Logo"
                width={280}
                height={70}
                className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
                priority
              />
            </div>

            {/* Custom Dropdown */}
            <div ref={dropdownRef} className="relative">
              {/* Trigger */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 bg-white rounded-2xl px-5 py-4 sm:py-5 shadow-lg transition-all hover:shadow-xl focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#f86c05] shrink-0" />
                  <span className={`text-base sm:text-lg font-semibold ${selectedCity ? "text-gray-800" : "text-gray-400"}`}>
                    {selectedCity ? selectedCity.label : "Selecione sua cidade..."}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Options list */}
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl overflow-hidden shadow-2xl z-50">
                  {cities.map((city, index) => (
                    <button
                      key={city.value}
                      onClick={() => handleSelect(city)}
                      className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-orange-50 hover:text-[#f86c05] group
                        ${selectedCity?.value === city.value ? "text-[#f86c05] bg-orange-50" : "text-gray-700"}
                        ${index !== cities.length - 1 ? "border-b border-gray-100" : ""}
                      `}
                    >
                      <MapPin className="h-4 w-4 text-[#f86c05] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
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

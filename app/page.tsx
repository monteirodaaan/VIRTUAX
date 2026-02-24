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
      <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/orange-gradient-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c3a]/30 to-[#f86c05]/30" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8">
          {/* Card glassmorphism */}
          <div
            className="w-full rounded-3xl px-8 py-10 flex flex-col items-center gap-8"
            style={{
              maxWidth: "22rem",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/images/logo.webp"
                alt="VirtuaX Logo"
                width={200}
                height={55}
                className="w-auto drop-shadow-lg"
                priority
              />
            </div>

            {/* Texto de instrução */}
            <p className="text-white/90 text-sm font-medium tracking-wide text-center drop-shadow">
              Selecione sua cidade para continuar
            </p>

            {/* Custom Dropdown */}
            <div ref={dropdownRef} className="relative w-full">
              {/* Trigger */}
              <button
                onClick={() => setIsOpen((o) => !o)}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all focus:outline-none relative"
                style={{
                  background: "rgba(255,255,255,0.22)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <MapPin className="h-4 w-4 text-white shrink-0" />
                <span className={`text-base font-semibold flex-1 text-left ${selectedCity ? "text-white" : "text-white/70"}`}>
                  {selectedCity ? selectedCity.label : "Selecione sua cidade..."}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-white/80 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Options list */}
              {isOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  {cities.map((city, index) => (
                    <button
                      key={city.value}
                      onClick={() => handleSelect(city)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left
                        ${selectedCity?.value === city.value ? "bg-white/20 text-white font-bold" : "text-white font-semibold hover:bg-white/15"}
                        ${index !== cities.length - 1 ? "border-b border-white/15" : ""}
                      `}
                    >
                      <span className="text-sm drop-shadow">{city.label}</span>
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

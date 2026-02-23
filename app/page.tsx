"use client"

import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import Image from "next/image"

const cities = [
  { value: "areia", label: "Areia" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba", label: "Cacimba de Dentro" },
  { value: "serraria", label: "Serraria" },
  { value: "solanea", label: "Solânea" },
]

export default function CitySelectionPage() {
  const router = useRouter()

  const handleCitySelect = (cityValue: string) => {
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
          <div className="container mx-auto flex items-center justify-between h-12 sm:h-14">
            {/* Empty left side for spacing */}
            <div className="flex-1" />
            {/* Centered Área do Cliente */}
            <a
              href="http://central.virtuax.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white text-[#f86c05] font-bold rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              Área do cliente
            </a>
            {/* Empty right side for spacing */}
            <div className="flex-1" />
          </div>
        </header>

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
              />
              <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl">Escolha sua localização</h1>
              <p className="text-base sm:text-lg text-white/95 font-medium">Com o melhor provedor da região</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {cities.map((city) => (
                <button
                  key={city.value}
                  onClick={() => handleCitySelect(city.value)}
                  className="w-full bg-white rounded-md px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:scale-[1.02] hover:bg-[#f86c05] hover:text-white group"
                >
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05] group-hover:text-white transition-colors" />
                  <span className="text-lg sm:text-xl font-bold text-gray-700 group-hover:text-white transition-colors">
                    {city.label}
                  </span>
                </button>
              ))}
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

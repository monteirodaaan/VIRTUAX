"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { LegalModal } from "@/components/legal-modal"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AnimatedCounter } from "@/components/animated-counter"
import { Textarea } from "@/components/ui/textarea"
import {
  Menu,
  X,
  Wifi,
  Shield,
  Zap,
  Users,
  User,
  ChevronRight,
  Check,
  Star,
  TrendingUp,
  ChevronLeft,
  Home,
  Building2,
} from "lucide-react"

// Dados de preços uniformes para todas as cidades
const pricingData = {
  "juarez-tavora": { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "areia":         { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "alagoa-grande": { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "bananeiras":    { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "cacimba-de-dentro": { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "dona-ines":     { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "duas-estradas": { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "piloes":        { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "serraria":      { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "serra-da-raiz": { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
  "solanea":       { duzentos: 59.90, basico: 65.00, intermediario: 79.90, avancado: 99.90, ultra: 119.90 },
}

const cities = [
  { value: "alagoa-grande", label: "Alagoa Grande" },
  { value: "areia", label: "Areia" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba-de-dentro", label: "Cacimba de Dentro" },
  { value: "dona-ines", label: "Dona Inês" },
  { value: "duas-estradas", label: "Duas Estradas" },
  { value: "juarez-tavora", label: "Juarez Távora" },
  { value: "piloes", label: "Pilões" },
  { value: "serraria", label: "Serraria" },
  { value: "serra-da-raiz", label: "Serra da Raiz" },
  { value: "solanea", label: "Solânea" },
]

const plans = [
  {
    id: "duzentos",
    name: "200 MB",
    speed: "200 Mbps",
    features: [
      "Canais de TV",
      "Roteador Incluso",
      "Instalação Grátis",
      "Fibra óptica",
      "Sem limite de uso",
      "Suporte 24/7",
    ],
  },
  {
    id: "basico",
    name: "400 MB",
    speed: "400 Mbps",
    features: [
      "Canais de TV",
      "Roteador Incluso",
      "Instalação Grátis",
      "Fibra óptica",
      "Sem limite de uso",
      "Suporte 24/7",
    ],
  },
  {
    id: "intermediario",
    name: "600 MB",
    speed: "600 Mbps",
    features: [
      "Canais de TV",
      "Roteador Incluso",
      "Instalação Grátis",
      "Fibra óptica",
      "Sem limite de uso",
      "Suporte 24/7",
    ],
  },
  {
    id: "avancado",
    name: "800 MB",
    speed: "800 Mbps",
    features: [
      "Canais de TV",
      "Roteador Incluso",
      "Instalação Grátis",
      "Fibra óptica",
      "Sem limite de uso",
      "Suporte 24/7",
    ],
  },
  {
    id: "ultra",
    name: "1 GB",
    speed: "1000 Mbps",
    features: [
      "Canais de TV",
      "Roteador Incluso",
      "Instalação Grátis",
      "Fibra óptica",
      "Sem limite de uso",
      "Suporte 24/7",
    ],
  },
]

// Mapeamento de cidades
const cityNames: { [key: string]: string } = {
  "juarez-tavora": "Juarez Távora",
  areia: "Areia",
  "alagoa-grande": "Alagoa Grande",
  bananeiras: "Bananeiras",
  "cacimba-de-dentro": "Cacimba de Dentro",
  "dona-ines": "Dona Inês",
  "duas-estradas": "Duas Estradas",
  piloes: "Pilões",
  serraria: "Serraria",
  "serra-da-raiz": "Serra da Raiz",
  solanea: "Solânea",
}

const DEFAULT_CITY: keyof typeof pricingData = "areia"

function resolveCity(city: string | null): keyof typeof pricingData {
  if (city && city in pricingData) return city as keyof typeof pricingData
  return DEFAULT_CITY
}

function HomePageContent() {
  const searchParams = useSearchParams()

  const [selectedCity, setSelectedCity] = useState<keyof typeof pricingData>(DEFAULT_CITY)

  // Sincronizar com URL quando searchParams muda
  useEffect(() => {
    setSelectedCity(resolveCity(searchParams?.get("city") ?? null))
  }, [searchParams])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [planType, setPlanType] = useState<"residencial" | "empresarial">("residencial")
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formCity, setFormCity] = useState("")
  const [formCompanySize, setFormCompanySize] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % plans.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isPaused])

  // Função para scroll suave para as seções
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  // Banner carousel for hero section
  const banners = [
    {
      title: "",
      subtitle: "",
      bg: "",
      type: "image",
      imagePath: "/images/banner-alta-velocidade.webp",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  return (
    <div className="min-h-screen relative bg-background">
      <header className="fixed top-0 w-full border-gray-200 z-50 text-brand-foreground bg-brand py-3 sm:py-4 border-b-0" role="banner">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Voltar ao topo"
          >
            <Image
              src="/images/logo.webp"
              alt="VirtuaX"
              width={120}
              height={30}
              className="w-auto"
              style={{ height: "clamp(22px, 3.85vw, 35px)" }}
              priority
            />
          </button>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-background">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card"
              aria-label="Ir para o início"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card"
              aria-label="Ir para secao Sobre"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card"
              aria-label="Ir para secao Beneficios"
            >
              Benefícios
            </button>
            <div className="relative group">
              <button
                onClick={() => scrollToSection("planos")}
                className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card flex items-center gap-1"
              >
                Planos
                <ChevronRight className="h-3 w-3 transition-transform group-hover:rotate-90" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                  onClick={() => {
                    setPlanType("residencial")
                    scrollToSection("planos")
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2 rounded-t-lg"
                >
                  <Home className="h-4 w-4" />
                  Residencial
                </button>
                <button
                  onClick={() => {
                    setPlanType("empresarial")
                    scrollToSection("planos")
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2 rounded-b-lg"
                >
                  <Building2 className="h-4 w-4" />
                  Empresarial
                </button>
              </div>
            </div>
            {/* End of dropdown menu for plans */}
            <button
              onClick={() => scrollToSection("contato")}
              className="text-xs lg:text-sm font-semibold hover:text-gray-300 transition-colors text-background"
            >
              Contato
            </button>

            <div className="flex items-center gap-2">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-9 text-xs lg:text-sm font-semibold bg-white border-2 border-white rounded-md !w-auto min-w-fit px-3" style={{ color: "var(--brand)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem
                      key={city.value}
                      value={city.value}
                      className="text-sm"
                    >
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <a
              href="http://central.virtuax.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center font-semibold transition-all duration-200 text-xs lg:text-sm px-4 lg:px-5 rounded-lg h-9 bg-white text-brand hover:bg-gray-50"
            >
              <User className="h-3.5 w-3.5 shrink-0" />
              Área do Cliente
            </a>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200" id="mobile-menu">
            <nav className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col gap-2" aria-label="Menu de navegacao mobile">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  setMobileMenuOpen(false)
                }}
                className="text-left text-sm font-semibold text-gray-700 hover:text-brand transition-colors py-2"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-left text-sm font-semibold text-gray-700 hover:text-brand transition-colors py-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("beneficios")}
                className="text-left text-sm font-semibold text-gray-700 hover:text-brand transition-colors py-2"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection("planos")}
                className="text-left text-sm font-semibold text-gray-700 hover:text-brand transition-colors py-2"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-left text-sm font-semibold text-gray-700 hover:text-brand transition-colors py-2"
              >
                Contato
              </button>

              <div className="py-1 mt-1">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-9 text-sm font-semibold bg-white text-brand border-2 border-brand rounded-md w-auto min-w-fit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem
                        key={city.value}
                        value={city.value}
                        className="text-sm"
                      >
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <a
                href="http://central.virtuax.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-sm font-semibold text-brand hover:text-orange-600 transition-colors py-2 inline-flex items-center gap-2"
              >
                <User className="h-4 w-4 shrink-0" />
                Área do Cliente
              </a>
            </nav>
          </div>
        )}
      </header>

      <div className="h-14 sm:h-16" />

      <section className="relative overflow-hidden">
        <div className="relative h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBannerIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              {banner.type === "image" ? (
                // Image banner - full background image only
                <div className="absolute inset-0 bg-orange-500 md:bg-transparent">
                  {/* Mobile fallback gradient background */}
                  <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#f86c05] via-[#f86c05] to-[#ffc107]" />
                  <Image
                    src={banner.imagePath || ""}
                    alt="Banner Alta Velocidade VirtuaX"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                // Text banner - with background and overlay
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Background Mobile */}
                  <div
                    className="absolute inset-0 md:hidden bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/banner-${currentBannerIndex + 1}-mobile.jpg)`,
                    }}
                  />
                  {/* Background Desktop */}
                  <div
                    className="absolute inset-0 hidden md:block bg-cover bg-center"
                    style={{
                      backgroundImage: `url(/images/banner-${currentBannerIndex + 1}-desktop.jpg)`,
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Conteúdo */}
                  <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center text-white relative z-10" suppressHydrationWarning>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4" suppressHydrationWarning>
                      {banner.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90" suppressHydrationWarning>{banner.subtitle}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === currentBannerIndex ? "bg-white w-6 sm:w-8" : "bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % banners.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
      </section>

      <section id="sobre" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto my-4 sm:my-6">
            <div className="text-left mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
              <div className="inline-block px-4 sm:px-6 rounded-full bg-brand/10 border border-brand/30 bg-transparent border-orange-500 mb-4 sm:mb-6">
                <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-wider">Sobre Nós</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-left">
                Conectado <span className="text-brand">{cityNames[selectedCity] || "sua região"}</span><br />com qualidade Virtuax
              </h2>
            </div>

            {/* About section - trust message - cache bust */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed px-4 sm:px-0">
              <p>
                A <strong className="text-brand">Virtuax</strong> leva fibra óptica de alta performance para cidades da Paraíba, com velocidade real, estabilidade constante e suporte que resolve.
              </p>
              <p>
                Com experiência no mercado de telecom, entregamos internet ultra-rápida para residências e empresas que precisam trabalhar, estudar, criar e se divertir sem interrupções.
              </p>
              <p className="text-brand font-semibold">
                Mais do que conexão, oferecemos confiança: planos claros, preços justos e suporte humano sempre que você precisar.
              </p>
            </div>

            {/* Metrics cards section - cache bust v3 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12 px-4 sm:px-0">
              <div className="text-center p-4 sm:p-5 md:p-6 bg-brand/5 rounded-xl border border-brand/20" data-metric="localidades">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand mb-1 sm:mb-2">
                  <AnimatedCounter end="+10" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Localidades</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="excelencia">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">
                  <AnimatedCounter end="97.5%" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Estabilidade</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="disponibilidade">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Disponibilidade</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="clientes">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">
                  <AnimatedCounter end="+9.000" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Clientes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-brand/10 border border-brand/30 mb-4 sm:mb-6 bg-transparent border-orange-500">
              <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-wider">Diferenciais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-brand to-white bg-clip-text text-transparent">
              Benefícios Virtuax
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed text-base sm:text-lg px-4 text-foreground">
              Vantagens exclusivas que fazem a diferença na sua conexão
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-brand/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-brand" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Ultra Velocidade</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Tecnologia de fibra óptica de última geração para garantir velocidade máxima e consistente em todos os
                momentos.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Conexão Estável</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Infraestrutura robusta e redundante que garante estabilidade e disponibilidade de 99% do tempo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group" id="card-suporte">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Suporte Humanizado<a href="#nota-1" className="text-brand text-sm hover:opacity-75 transition-opacity cursor-pointer">*</a></h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Equipe local sempre pronta para atender suas necessidades com agilidade e atenção personalizada.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Wifi className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Sem Franquia</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Internet ilimitada de verdade. Use quanto quiser sem preocupação com limites de tráfego ou redução de
                velocidade.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group" id="card-instalacao">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Instalação Grátis<a href="#nota-2" className="text-brand text-sm hover:opacity-75 transition-opacity cursor-pointer">**</a></h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Zero custo para começar. Nossa equipe cuida de toda instalação sem cobrar nenhum valor adicional.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Preço Justo</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center">
                Planos acessíveis com o melhor custo-benefício da região. Qualidade premium sem pesar no bolso.
              </p>
            </div>

            {/* Download APP Section */}
            <div className="w-full col-span-full flex flex-col items-center justify-center mt-8 sm:mt-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-500 mb-8 sm:mb-10">
                Baixe nosso APP
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.innave.virtuax&hl=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ativo%202-gG8m72SXp24pzz4bznyR6pF1ztLAtu.webp"
                    alt="GET IT ON Google Play"
                    className="h-auto w-80"
                  />
                </a>
                <a
                  href="https://apps.apple.com/br/app/virtuax/id1626854055"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ativo%203-NDV0qKwxj8VPlXMVKTMh6UxP5YUGVL.webp"
                    alt="DOWNLOAD ON THE App Store"
                    className="h-auto w-80"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-brand/10 border border-brand/30 mb-4 sm:mb-6 border-orange-500 bg-transparent">
              <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-wider">Planos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Escolha seu plano<br />em <span className="text-brand">{cityNames[selectedCity] || "sua região"}</span></h2>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
              <button
                onClick={() => setPlanType("residencial")}
                className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${planType === "residencial"
                  ? "bg-[#f86c05] text-white"
                  : "bg-white text-gray-700 border border-gray-300"
                  }`}
              >
                <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                Residencial
              </button>
              <button
                onClick={() => setPlanType("empresarial")}
                className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${planType === "empresarial"
                  ? "bg-[#f86c05] text-white"
                  : "bg-white text-gray-700 border border-gray-300"
                  }`}
              >
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Empresarial
              </button>
            </div>
          </div>

          {planType === "residencial" ? (
            <div
              className="max-w-7xl mx-auto pt-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 px-4">
                {plans.map((plan, index) => {
                  const cityPricing = pricingData[resolveCity(selectedCity)] ?? pricingData[DEFAULT_CITY]
                  const price = cityPricing?.[plan.id as keyof typeof pricingData["areia"]] ?? 0
                  const isRecommended = plan.id === "intermediario"
                  const isActive = index === activeIndex
                  const features = plan.features

                  return (
                    <div
                      key={plan.id}
                      className="flex relative"
                      onClick={() => {
                        setActiveIndex(index)
                        setIsPaused(false)
                      }}
                    >
                      {isRecommended && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                          <div className="bg-gradient-to-r from-[#f86c05] to-orange-500 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap">
                            MAIS POPULAR
                          </div>
                        </div>
                      )}

                      <div
                        className={`relative bg-gradient-to-br from-white via-white to-orange-50/30 rounded-2xl p-6 lg:p-8 flex flex-col w-full transition-all overflow-hidden hover:-translate-y-1 ${isActive ? "border-2 border-brand shadow-xl" : "border border-gray-200 shadow-lg hover:shadow-xl hover:border-brand/40"
                          }`}
                      >
                        {/* Elementos decorativos de fundo */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f86c05]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#f86c05]/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="text-left mb-6 relative z-10">
                          {/* Ícone de velocidade dentro do card - diferente para cada plano */}


                          {/* Velocidade em MB - Destaque principal */}
                          <div className="mb-3 flex items-baseline justify-start gap-2">
                            <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand to-orange-600 leading-tight">
                              {plan.name.split(' ')[0]}
                            </div>
                            <div className="text-2xl lg:text-3xl font-bold text-brand tracking-widest uppercase">
                              {plan.name.split(' ')[1]}
                            </div>
                          </div>

                          {/* Barra decorativa */}
                          <div className="flex items-center justify-start gap-1 mb-4">
                            <div className="h-1 w-8 bg-gradient-to-r from-transparent to-[#f86c05] rounded-full" />
                            <div className="h-1 w-8 bg-[#f86c05] rounded-full" />
                            <div className="h-1 w-8 bg-gradient-to-l from-transparent to-[#f86c05] rounded-full" />
                          </div>

                          {/* Preço alinhado à esquerda */}
                          <div className="text-left">
                            <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-1">
                              {price.toFixed(2).replace(".", ",")}
                            </div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">mensalmente</p>
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent mb-6" />

                        <ul className="space-y-3 mb-8 flex-1">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm text-gray-700 font-medium leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => scrollToSection("contato")}
                          className="w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{ backgroundColor: "var(--brand)", color: "white" }}
                        >
                          {isActive ? "Escolher agora" : "Contratar"}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 rounded-3xl border border-brand/20 overflow-hidden shadow-2xl">
                <div className="relative overflow-hidden">
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand/5 rounded-full blur-3xl"></div>

                  <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
                    <div className="mb-10 sm:mb-12 md:mb-14">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-brand/15 border border-brand/40 mb-6">
                        <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-widest">
                          Solução Corporativa
                        </span>
                      </div>

                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        Planos Personalizados Para Empresas{" "}
                        <span className="text-brand">em {cities.find(c => c.value === selectedCity)?.label}</span>
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                        Soluções de internet de alta performance com SLA garantido, redundância de conexão e suporte técnico dedicado para sua operação funcionar 24/7 sem interrupções.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-14 md:mb-16">
                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-brand/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/10 group-hover:to-brand/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-brand/30 to-brand/10 group-hover:from-brand/40 group-hover:to-brand/20 transition-all duration-300 shadow-lg">
                              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-brand" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">Velocidade Dedicada</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Até 200GB de dados por mês</p>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-[#f86c05]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#f86c05]/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f86c05]/0 to-[#f86c05]/0 group-hover:from-[#f86c05]/10 group-hover:to-[#f86c05]/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#f86c05]/30 to-[#f86c05]/10 group-hover:from-[#f86c05]/40 group-hover:to-[#f86c05]/20 transition-all duration-300 shadow-lg">
                              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">SLA 99.9%</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Disponibilidade garantida em contrato</p>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-[#f86c05]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#f86c05]/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f86c05]/0 to-[#f86c05]/0 group-hover:from-[#f86c05]/10 group-hover:to-[#f86c05]/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#f86c05]/30 to-[#f86c05]/10 group-hover:from-[#f86c05]/40 group-hover:to-[#f86c05]/20 transition-all duration-300 shadow-lg">
                              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">Suporte VIP</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Técnico dedicado 24/7</p>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-[#f86c05]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#f86c05]/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f86c05]/0 to-[#f86c05]/0 group-hover:from-[#f86c05]/10 group-hover:to-[#f86c05]/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#f86c05]/30 to-[#f86c05]/10 group-hover:from-[#f86c05]/40 group-hover:to-[#f86c05]/20 transition-all duration-300 shadow-lg">
                              <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">Redundância</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Múltiplas rotas de conexão</p>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-[#f86c05]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#f86c05]/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f86c05]/0 to-[#f86c05]/0 group-hover:from-[#f86c05]/10 group-hover:to-[#f86c05]/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#f86c05]/30 to-[#f86c05]/10 group-hover:from-[#f86c05]/40 group-hover:to-[#f86c05]/20 transition-all duration-300 shadow-lg">
                              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">Escalabilidade</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Aumente conforme seu crescimento</p>
                        </div>
                      </div>

                      <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-7 hover:border-[#f86c05]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#f86c05]/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/10 group-hover:to-brand/5 transition-all duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-brand/30 to-brand/10 group-hover:from-brand/40 group-hover:to-brand/20 transition-all duration-300 shadow-lg">
                              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-brand" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base">IP Fixo</h4>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Endereço IP dedicado incluído</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-brand/25 via-brand/15 to-transparent border border-brand/40 rounded-2xl p-8 sm:p-10 md:p-12 text-center">
                      <p className="text-sm sm:text-base text-gray-300 mb-4">Cada empresa tem necessidades unicas</p>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Solicite um orcamento personalizado
                      </h4>
                      <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto">
                        Nossa equipe de especialistas analisara suas necessidades especificas e criara a melhor solucao para seu negocio
                      </p>
                      <Button
                        onClick={() => scrollToSection("contato")}
                        className="mx-auto px-8 sm:px-12 py-3 sm:py-4 font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg"
                        style={{ backgroundColor: "var(--brand)", color: "white" }}
                      >
                        Solicitar Orcamento
                        <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left column - Info and cards */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-brand/10 border border-brand/30 mb-4 sm:mb-6 bg-transparent border-orange-500">
                  <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-wider">
                    Fale Conosco
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {planType === "empresarial" ? "Solicite seu Orçamento" : "Pronto para se conectar?"}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {planType === "empresarial"
                    ? "Nossa equipe comercial entrará em contato com você para discutir a melhor solução de internet para sua empresa."
                    : "Nossa equipe está pronta para atender você! Preencha o formulário e entraremos em contato o mais breve possível."}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-brand/30 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {planType === "empresarial" ? "Análise Personalizada" : "Suporte Técnico"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {planType === "empresarial"
                        ? "Avaliamos suas necessidades específicas"
                        : "Autoatendimento 24 horas por dia, 7 dias por semana"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-[#f86c05]/30 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f86c05]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {planType === "empresarial" ? "Suporte Comercial" : "Suporte Comercial"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {planType === "empresarial"
                        ? "Especialistas em soluções corporativas"
                        : "Segunda a Sexta das 08h às 18h | Sábado das 08h às 12h"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-[#f86c05]/30 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f86c05]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {planType === "empresarial" ? "Proposta SLA" : "Garantia de Qualidade"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {planType === "empresarial"
                        ? "Com disponibilidade e suporte garantido"
                        : "Resposta em até 24 horas úteis"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  const tipo = planType === "empresarial" ? "Empresarial" : "Residencial"
                  const cityLabel = cities.find(c => c.value === formCity)?.label || formCity
                  const companySizeMap: Record<string, string> = {
                    pequena: "Pequena (1-10 funcionários)",
                    media: "Média (11-50 funcionários)",
                    grande: "Grande (51-200 funcionários)",
                    enterprise: "Enterprise (200+ funcionários)",
                  }
                  let texto = `Olá! Vim pelo site da Virtuax.\n\n*Tipo:* ${tipo}\n*Nome:* ${formName}\n*E-mail:* ${formEmail}\n*Telefone:* ${formPhone}`
                  if (cityLabel) texto += `\n*Cidade:* ${cityLabel}`
                  if (planType === "empresarial" && formCompanySize) texto += `\n*Tamanho da Empresa:* ${companySizeMap[formCompanySize] || formCompanySize}`
                  if (formMessage) texto += `\n*Mensagem:* ${formMessage}`
                  window.open(`https://wa.me/558007315050?text=${encodeURIComponent(texto)}`, "_blank")
                }}
              >
                <div>
                  <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    {planType === "empresarial" ? "Nome da Empresa *" : "Nome completo *"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={planType === "empresarial" ? "Sua Empresa LTDA" : "Digite seu nome completo"}
                    className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-[#f86c05] focus:ring-[#f86c05] transition-colors text-sm sm:text-base"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-brand text-sm sm:text-base"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-brand text-sm sm:text-base"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city-contact" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    Cidade *
                  </Label>
                  <Select value={formCity} onValueChange={setFormCity}>
                    <SelectTrigger
                      id="city-contact"
                      className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-brand text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 overflow-y-auto">
                      {cities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {planType === "empresarial" && (
                  <div>
                    <Label htmlFor="company-size" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                      Tamanho da Empresa *
                    </Label>
                    <Select value={formCompanySize} onValueChange={setFormCompanySize}>
                      <SelectTrigger
                        id="company-size"
                        className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-brand text-sm sm:text-base"
                      >
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pequena">Pequena (1-10 funcionários)</SelectItem>
                        <SelectItem value="media">Média (11-50 funcionários)</SelectItem>
                        <SelectItem value="grande">Grande (51-200 funcionários)</SelectItem>
                        <SelectItem value="enterprise">Enterprise (200+ funcionários)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    {planType === "empresarial" ? "Descreva sua Necessidade" : "Mensagem"}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      planType === "empresarial"
                        ? "Qual é sua necessidade de velocidade? Quantos usuários? Que aplicações?"
                        : "Como podemos ajudar você?"
                    }
                    className="w-full min-h-24 sm:min-h-32 bg-gray-50 border-gray-200 rounded-lg resize-none focus:border-brand text-sm sm:text-base"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 sm:h-12 font-semibold text-sm sm:text-base hover:scale-[1.02] transition-transform shadow-lg"
                  style={{ backgroundColor: "var(--brand)", color: "white" }}
                >
                  {planType === "empresarial" ? "Solicitar Orçamento" : "Enviar mensagem"}
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Ao enviar, você concorda com nossa política de privacidade
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1117] text-white">
        {/* Main Footer */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">

            {/* Coluna 1 — Logo + Descrição + Redes */}
            <div className="flex flex-col gap-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="self-start hover:opacity-80 transition-opacity"
                aria-label="Voltar ao topo"
              >
                <Image
                  src="/images/logo.webp"
                  alt="Virtuax"
                  width={140}
                  height={36}
                  className="w-auto"
                  style={{ height: "clamp(22px, 3.5vw, 34px)" }}
                />
              </button>
              <p className="text-sm text-gray-400 leading-relaxed">
                Conectando você ao mundo com fibra óptica de última geração. Internet em alta velocidade para sua casa ou empresa.
              </p>
              <div className="flex items-center gap-5">
                <a href="https://www.facebook.com/ambientevirtual" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-brand hover:opacity-75 transition-opacity duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/ambientevirtual" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand hover:opacity-75 transition-opacity duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://wa.me/558007315050" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-brand hover:opacity-75 transition-opacity duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href="mailto:sac@virtuax.com.br" aria-label="Email" className="text-brand hover:opacity-75 transition-opacity duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2 — Cobertura */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Cobertura</h3>
              <p className="text-sm text-gray-400 leading-7 max-w-[260px]">
                Internet em Juarez Távora, Areia, Alagoa Grande, Bananeiras, Cacimba de Dentro, Dona Inês, Duas Estradas, Pilões, Serraria, Serra da Raiz e Solânea
              </p>
            </div>

            {/* Coluna 3 — Links */}
            <div className="flex flex-col gap-5 lg:pl-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Links</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Início", id: null },
                  { label: "Sobre", id: "sobre" },
                  { label: "Benefícios", id: "beneficios" },
                  { label: "Planos", id: "planos" },
                  { label: "Contato", id: "contato" },
                ].map(({ label, id }) => (
                  <li key={label}>
                    <button
                      onClick={() => {
                        if (id) {
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                        } else {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      className="text-sm text-gray-400 hover:text-brand transition-colors duration-200 text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4 — Suporte */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Suporte</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" /></svg>
                  <a href="tel:08007315050" className="text-sm text-gray-400 hover:text-brand transition-colors duration-200">0800 731 5050</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                  <a href="mailto:sac@virtuax.com.br" className="text-sm text-gray-400 hover:text-brand transition-colors duration-200">sac@virtuax.com.br</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                  <span className="text-sm text-gray-400 leading-relaxed">Segunda a Sexta das 08h às 18h | Sábado das 08h às 12h</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" /></svg>
                  <span className="text-sm text-gray-400">CNPJ: 20.514.953/0001-85</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Notas de Rodapé */}
        <div className="border-t border-white/10" id="notas-rodape">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-6">
            <div className="text-xs text-gray-600 leading-relaxed max-w-4xl space-y-2">
              <p id="nota-1">
                <a href="#card-suporte" className="hover:text-brand transition-colors cursor-pointer"><span className="font-semibold">*</span> Apenas no horário comercial</a>
              </p>
              <p id="nota-2">
                <a href="#card-instalacao" className="hover:text-brand transition-colors cursor-pointer"><span className="font-semibold">**</span> Mediante fidelização por 12 meses de contratação</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-gray-500 leading-relaxed">
              © 2026 Virtuax. Todos os direitos reservados &bull; Dev.{" "}
              <a href="https://www.instagram.com/november.mkt" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline transition-colors">November Marketing</a>{" "}
              &bull; Design{" "}
              <a href="https://dm.art.br/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline transition-colors">dm.art.br</a>
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap justify-center">
              <LegalModal />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-pulse">Carregando...</div></div>}>
        <HomePageContent />
      </Suspense>
    </div>
  )
}

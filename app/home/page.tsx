"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Menu,
  X,
  Wifi,
  Shield,
  Zap,
  Users,
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
  areia: { basico: 65, intermediario: 80, avancado: 120, ultra: 199 },
  bananeiras: { basico: 65, intermediario: 80, avancado: 120, ultra: 199 },
  cacimba: { basico: 65, intermediario: 80, avancado: 120, ultra: 199 },
  serraria: { basico: 65, intermediario: 80, avancado: 120, ultra: 199 },
  solanea: { basico: 65, intermediario: 80, avancado: 120, ultra: 199 },
}

const cities = [
  { value: "areia", label: "Areia" },
  { value: "bananeiras", label: "Bananeiras" },
  { value: "cacimba", label: "Cacimba de Dentro" },
  { value: "serraria", label: "Serraria" },
  { value: "solanea", label: "Solânea" },
]

const plans = [
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
    name: "1GB",
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

function HomePageContent() {
  const searchParams = useSearchParams()
  const [selectedCity, setSelectedCity] = useState("areia")

  // Sincronizar com URL quando o componente monta
  useEffect(() => {
    const cityFromUrl = searchParams.get("city") || "areia"
    setSelectedCity(cityFromUrl)
  }, [searchParams])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [planType, setPlanType] = useState<"residencial" | "empresarial">("residencial")
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  // Banner carousel for hero section
  const banners = [
    {
      title: "Internet de Alta Velocidade",
      subtitle: "Fibra óptica de última geração para sua casa ou empresa",
      bg: "from-orange-600 to-orange-500",
    },
    {
      title: "Velocidade que Você Merece",
      subtitle: "Planos a partir de 1GB com instalação gratuita",
      bg: "from-orange-500 to-amber-500",
    },
    {
      title: "Suporte 24/7",
      subtitle: "Equipe sempre pronta para te atender",
      bg: "from-amber-600 to-orange-600",
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
          <Image
            src="/images/logo.webp"
            alt="VirtuaX Telecom - Provedor de Internet Fibra Óptica na Paraíba"
            width={120}
            height={30}
            className="h-6 sm:h-7 md:h-8 w-auto"
            priority
          />

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-background" aria-label="Navegação principal">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card"
              aria-label="Ir para seção Sobre"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-xs lg:text-sm font-semibold hover:text-gray-100 transition-colors text-card"
              aria-label="Ir para seção Benefícios"
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
              className="inline-flex items-center justify-center font-semibold transition-all duration-200 text-xs lg:text-sm px-4 lg:px-6 rounded-lg h-9 bg-white text-brand hover:bg-opacity-90 shadow-sm hover:shadow-md"
            >
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
            <nav className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col gap-2" aria-label="Menu de navegação mobile">
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
                className="w-full mt-2 inline-flex items-center justify-center font-semibold transition-all duration-200 text-sm px-4 rounded-lg h-10 bg-brand text-white hover:bg-opacity-90 shadow-sm hover:shadow-md"
              >
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
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentBannerIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                }`}
            >
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
                Conectando a Paraíba com Qualidade
              </h2>
            </div>

            {/* About section - trust message - cache bust */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed px-4 sm:px-0">
              <p>
                A <strong className="text-brand">VirtuaX</strong> leva fibra óptica de alta performance para cidades da Paraíba, com velocidade real, estabilidade constante e atendimento que resolve.
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
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand mb-1 sm:mb-2">+5</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Localidades</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="excelencia">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">97.5%</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Excelência</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="disponibilidade">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold">Disponibilidade</div>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20" data-metric="clientes">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">+9.000</div>
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
              Benefícios
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

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Suporte Humanizado</h3>
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

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#f86c05]/30 rounded-2xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f86c05]/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 text-[#f86c05]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">Instalação Grátis</h3>
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
          </div>
        </div>
      </section>

      <section id="planos" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-brand/10 border border-brand/30 mb-4 sm:mb-6 border-orange-500 bg-transparent">
              <span className="text-brand font-bold text-xs sm:text-sm uppercase tracking-wider">Planos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Escolha seu plano</h2>

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
            <div className="max-w-7xl mx-auto pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4">
                {plans.map((plan) => {
                  const price =
                    pricingData[selectedCity as keyof typeof pricingData][plan.id as keyof typeof pricingData.areia]
                  const isRecommended = plan.id === "intermediario"
                  const features = plan.features

                  return (
                    <div
                      key={plan.id}
                      className="flex relative"
                    >
                      {isRecommended && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                          <div className="bg-gradient-to-r from-[#f86c05] to-orange-500 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap">
                            MAIS POPULAR
                          </div>
                        </div>
                      )}

                      <div
                        className={`relative bg-gradient-to-br from-white via-white to-orange-50/30 rounded-2xl p-6 lg:p-8 flex flex-col w-full transition-all overflow-hidden hover:-translate-y-1 ${isRecommended ? "border-2 border-brand shadow-xl" : "border border-gray-200 shadow-lg hover:shadow-xl hover:border-brand/40"
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
                          {isRecommended ? "Escolher Agora" : "Contratar"}
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
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Até 1Gbps com garantia de banda</p>
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
                      <p className="text-sm sm:text-base text-gray-300 mb-4">Cada empresa tem necessidades únicas</p>
                      <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Solicite um orçamento personalizado
                      </h4>
                      <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto">
                        Nossa equipe de especialistas analisará suas necessidades específicas e criará a melhor solução para seu negócio
                      </p>
                      <Button
                        onClick={() => scrollToSection("contato")}
                        className="mx-auto px-8 sm:px-12 py-3 sm:py-4 font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg"
                        style={{ backgroundColor: "var(--brand)", color: "white" }}
                      >
                        Solicitar Orçamento
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
                        : "Atendimento 24 horas por dia, 7 dias por semana"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-[#f86c05]/30 transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f86c05]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#f86c05]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                      {planType === "empresarial" ? "Suporte Comercial" : "Atendimento Comercial"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {planType === "empresarial"
                        ? "Especialistas em soluções corporativas"
                        : "Segunda a sexta, das 8h às 18h"}
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
              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city-contact" className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                    Cidade *
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="city-contact"
                      className="w-full h-10 sm:h-12 bg-gray-50 border-gray-200 rounded-lg focus:border-brand text-sm sm:text-base"
                    >
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <Select>
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

      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">© 2025 VirtuaX • Todos os direitos reservados</p>
            <p className="text-gray-500 text-xs">CNPJ: 20.514.953/0001-85</p>
            <p className="text-gray-500 text-xs">
              Desenvolvido por <span className="text-[#f86c05] font-semibold">November Marketing</span> &{" "}
              <span className="text-[#f86c05] font-semibold">dm.art.br</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HomePageContent />
    </div>
  )
}

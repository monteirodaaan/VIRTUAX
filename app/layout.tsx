import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VirtuaX Telecom - Internet Fibra Óptica em Areia, Bananeiras, Cacimba de Dentro, Serraria e Solânea | Planos a partir de R$ 65,00",
  description:
    "Internet fibra óptica de alta velocidade na Paraíba com instalação grátis. Planos residenciais e empresariais de 400MB a 1000MB. Atendemos Areia, Bananeiras, Cacimba de Dentro, Serraria e Solânea com suporte 24h e garantia de qualidade.",
  keywords:
    "internet fibra óptica, internet Areia PB, internet Bananeiras, internet Cacimba de Dentro, internet Serraria, internet Solânea, provedor internet Paraíba, internet rápida, banda larga, fibra óptica residencial, internet empresarial",
  authors: [{ name: "VirtuaX Telecom" }],
  creator: "VirtuaX Telecom",
  publisher: "VirtuaX Telecom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://virtuax.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VirtuaX Telecom - Internet Fibra Óptica de Alta Velocidade na Paraíba",
    description:
      "Planos de internet fibra óptica residenciais e empresariais a partir de R$ 65,00. Cobertura em Areia, Bananeiras, Cacimba de Dentro, Serraria e Solânea. Instalação grátis e suporte 24h.",
    url: "https://virtuax.com.br",
    siteName: "VirtuaX Telecom",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VirtuaX Telecom - Internet Fibra Óptica",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VirtuaX Telecom - Internet Fibra Óptica de Alta Velocidade",
    description:
      "Planos residenciais e empresariais a partir de R$ 65,00. Instalação grátis, suporte 24h e cobertura em 5 cidades da Paraíba.",
    images: ["/images/og-image.jpg"],
    creator: "@virtuaxtelecom",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "seu-codigo-google-search-console",
    yandex: "seu-codigo-yandex",
    other: {
      "facebook-domain-verification": "seu-codigo-facebook",
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://virtuax.com.br",
    name: "VirtuaX Telecom",
    image: "https://virtuax.com.br/images/logo.webp",
    description:
      "Provedor de internet fibra óptica de alta velocidade na Paraíba, atendendo Areia, Bananeiras, Cacimba de Dentro, Serraria e Solânea",
    url: "https://virtuax.com.br",
    telephone: "+55-83-XXXX-XXXX",
    email: "contato@virtuax.com.br",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Areia",
      addressRegion: "PB",
      postalCode: "58397-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.9608,
      longitude: -35.6972,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Areia",
        containedInPlace: {
          "@type": "State",
          name: "Paraíba",
        },
      },
      {
        "@type": "City",
        name: "Bananeiras",
        containedInPlace: {
          "@type": "State",
          name: "Paraíba",
        },
      },
      {
        "@type": "City",
        name: "Cacimba de Dentro",
        containedInPlace: {
          "@type": "State",
          name: "Paraíba",
        },
      },
      {
        "@type": "City",
        name: "Serraria",
        containedInPlace: {
          "@type": "State",
          name: "Paraíba",
        },
      },
      {
        "@type": "City",
        name: "Solânea",
        containedInPlace: {
          "@type": "State",
          name: "Paraíba",
        },
      },
    ],
    priceRange: "R$ 65,00 - R$ 199,00",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.facebook.com/virtuaxtelecom",
      "https://www.instagram.com/virtuaxtelecom",
      "https://www.linkedin.com/company/virtuaxtelecom",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "312",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planos de Internet",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plano 400MB",
            description: "Internet fibra óptica de 400 Mbps",
          },
          priceCurrency: "BRL",
          price: "65.00",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plano 600MB",
            description: "Internet fibra óptica de 600 Mbps",
          },
          priceCurrency: "BRL",
          price: "80.00",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plano 800MB",
            description: "Internet fibra óptica de 800 Mbps",
          },
          priceCurrency: "BRL",
          price: "120.00",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plano 1000MB",
            description: "Internet fibra óptica de 1000 Mbps",
          },
          priceCurrency: "BRL",
          price: "199.00",
        },
      ],
    },
  }

  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#f86c05" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased bg-[#f86c05]`} style={{ backgroundColor: '#f86c05' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://virtuax.com.br"
  const cities = ["areia", "bananeiras", "cacimba", "serraria", "solanea"]

  // URLs estáticas principais
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]

  // URLs dinâmicas por cidade
  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/home?city=${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticUrls, ...cityUrls]
}

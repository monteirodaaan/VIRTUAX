"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number | string
  duration?: number
  format?: (value: number) => string
}

export function AnimatedCounter({ end, duration = 2000, format }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>(end.toString())
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // Parse numeric value from string (handles "+5", "+9.000", "97.5%", etc)
          let numericEnd: number
          if (typeof end === "string") {
            const cleaned = end.replace(/[^0-9.]/g, "")
            numericEnd = parseFloat(cleaned)
          } else {
            numericEnd = end
          }

          const startTime = Date.now()
          const startValue = 0

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const current = startValue + (numericEnd - startValue) * progress

            if (format) {
              setDisplayValue(format(current))
            } else {
              // Default format based on original end value
              if (typeof end === "string") {
                if (end.includes("%")) {
                  setDisplayValue(current.toFixed(1) + "%")
                } else if (end.includes("+")) {
                  setDisplayValue("+" + Math.round(current).toLocaleString("pt-BR"))
                } else if (end.includes("/")) {
                  setDisplayValue(end) // Keep as is for "24/7"
                } else {
                  setDisplayValue(Math.round(current).toLocaleString("pt-BR"))
                }
              } else {
                setDisplayValue(Math.round(current).toString())
              }
            }

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(end.toString())
            }
          }

          animate()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [end, duration, format])

  return <div ref={ref}>{displayValue}</div>
}

"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpMetricProps {
  endValue: number
  label: string
  prefix?: string
  suffix?: string
  isPercentage?: boolean
  duration?: number
  className?: string
}

export function CountUpMetric({
  endValue,
  label,
  prefix = "",
  suffix = "",
  isPercentage = false,
  duration = 2000,
  className = "",
}: CountUpMetricProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const currentValue = Math.floor(endValue * easeOutQuad(progress))

      setCount(currentValue)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [hasStarted, endValue, duration])

  const displayValue = isPercentage ? `${count}%` : `${prefix}${count.toLocaleString("pt-BR")}${suffix}`

  return (
    <div ref={ref} className={`text-center p-4 sm:p-5 md:p-6 bg-[#f86c05]/5 rounded-xl border border-[#f86c05]/20 ${className}`}>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f86c05] mb-1 sm:mb-2">{displayValue}</div>
      <div className="text-xs sm:text-sm text-gray-600 font-semibold">{label}</div>
    </div>
  )
}

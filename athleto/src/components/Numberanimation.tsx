"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedNumberProps {
  value: number
  suffix?: string
  duration?: number
}

export function AnimatedNumber({ value, suffix = "", duration = 2000 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current

      if (progress < duration) {
        const nextValue = Math.round((progress / duration) * value)
        setDisplayValue(nextValue)
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [value, duration])

  return (
    <span className="font-mono">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}


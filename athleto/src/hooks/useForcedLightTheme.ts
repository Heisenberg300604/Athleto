"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useForceLightMode() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && resolvedTheme && resolvedTheme !== "light") {
      setTheme("light")
    }
  }, [mounted, setTheme, resolvedTheme])

  return mounted
}

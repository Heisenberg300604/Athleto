"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useHomePageForcedTheme() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Ensure component is mounted before setting theme
  }, [])

  useEffect(() => {
    if (mounted && resolvedTheme && resolvedTheme !== "dark") {
      setTheme("dark")
    }
  }, [mounted, setTheme, resolvedTheme])

  return mounted
}

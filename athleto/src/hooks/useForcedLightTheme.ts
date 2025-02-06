"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useForceLightMode() {
  const { setTheme, theme, systemTheme } = useTheme()

  useEffect(() => {
    // const originalTheme = theme === "system" ? systemTheme : theme

    // Force light mode
    setTheme("light")

    // Cleanup function to restore the original theme
    return () => {
      setTheme("dark")
    }
  }, [setTheme, theme, systemTheme])
}


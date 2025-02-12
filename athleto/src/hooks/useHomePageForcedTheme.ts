"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useHomePageForcedTheme() {
  const { setTheme, theme,resolvedTheme} = useTheme()  
  useEffect(() => {
    if (resolvedTheme !== undefined && resolvedTheme !== "dark") {
      setTheme("dark")
    }
  }, [setTheme, resolvedTheme])
}


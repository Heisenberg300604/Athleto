"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useForceLightMode() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  useEffect(() => {
    if(resolvedTheme!==undefined && resolvedTheme!=="light"){
      setTheme("light")
    }
  }, [setTheme, resolvedTheme])
}


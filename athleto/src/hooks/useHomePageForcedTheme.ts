"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useHomePageForcedTheme() {
  const { setTheme, theme} = useTheme()  
  useEffect(() => {
    if(theme === "dark") return;
    setTheme("dark")
  }, [setTheme, theme])
}


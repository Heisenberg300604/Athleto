// "use client"

// import { useEffect } from "react"
// import { useTheme } from "next-themes"

// export function ForcePageLightMode() {
//   const { setTheme, theme } = useTheme()

//   useEffect(() => {
//     const originalTheme = theme
//     setTheme("light")
//     return () => {
//       // Restore the original theme when the component unmounts
//       setTheme(originalTheme)
//     }
//   }, [setTheme, theme])

//   // This component doesn't render anything visible
//   return null
// }


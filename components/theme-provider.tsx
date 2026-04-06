"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}

const ThemeContext = React.createContext<{
  theme: Theme | undefined
  setTheme: (theme: Theme) => void
}>({
  theme: undefined,
  setTheme: () => {},
})

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme | undefined>(undefined)
  const [isMounted, setIsMounted] = React.useState(false)

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme)
      
      const html = document.documentElement
      const isDark =
        newTheme === "dark" ||
        (newTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      
      if (isDark) {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }
  }, [storageKey])

  React.useEffect(() => {
    setIsMounted(true)
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme | null
      const initial = stored || defaultTheme
      
      setTheme(initial)
    }
  }, [storageKey, defaultTheme, setTheme])

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

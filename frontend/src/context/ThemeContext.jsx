import { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../constants/storage.js'

const ThemeContext = createContext({ dark: false, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME)
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEYS.THEME, dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

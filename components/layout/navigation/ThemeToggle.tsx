"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from "@/core/context/ThemeContext"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  )
}

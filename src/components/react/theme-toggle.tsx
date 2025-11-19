import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from "react"
export const prerender = true
export const dynamic = 'force-dynamic'

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    const theme = savedTheme || (prefersDark ? "dark" : "light")

    document.documentElement.classList.toggle("dark", theme === "dark")
    setIsDark(theme === "dark")
  }, [])

  const handleToggle = () => {
    const element = document.documentElement
    const newTheme = !isDark

    element.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    setIsDark(newTheme)
  }

  return (
    <Button
      variant='secondary'
      size='icon'
      title='Toggle theme'
      onClick={handleToggle}
      aria-pressed={isDark}
    >
      <SunIcon className='size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <MoonIcon className='absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X, Lightbulb } from 'lucide-react'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  const ThemeToggle = () => {
    if (!mounted) {
      return (
        <Button variant="ghost" size="icon">
          <span className="h-5 w-5" />
        </Button>
      )
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    )
  }

  const MobileThemeToggle = () => {
    if (!mounted) return null

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-full justify-start px-3"
      >
        {theme === 'dark' ? (
          <>
            <Sun className="h-5 w-5 mr-2" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 mr-2" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Lightbulb className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">Bodhika</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/roadmaps" className="text-foreground/80 hover:text-foreground px-3 py-2">
              Roadmaps
            </Link>
            <Link href="/resources" className="text-foreground/80 hover:text-foreground px-3 py-2">
              Resources
            </Link>
            <Link href="/courses" className="text-foreground/80 hover:text-foreground px-3 py-2">
              Courses
            </Link>
            <Link href="/interviews" className="text-foreground/80 hover:text-foreground px-3 py-2">
              Interviews
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/roadmaps"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Roadmaps
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Resources
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
              href="/interviews"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Interviews
            </Link>
            <MobileThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
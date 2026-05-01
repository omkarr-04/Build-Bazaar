'use client'

import { useEffect } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return <ThemeProvider>{children}</ThemeProvider>
} 
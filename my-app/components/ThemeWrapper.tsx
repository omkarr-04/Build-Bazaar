'use client'

import { useState, useEffect } from 'react'

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return (
    <html lang="en" data-theme={theme}>
      {children}
    </html>
  )
} 
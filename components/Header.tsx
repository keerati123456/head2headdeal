'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Search, Sun, MoonStar } from 'lucide-react'

export function Header() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark)
    setDark(isDark)
  }, [])
  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b">
      <div className="container-nice flex items-center gap-3 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="logo" className="h-6 w-6" />
          Head2HeadDeal
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link href="#search" className="px-3 py-1.5 rounded-lg border text-sm hidden sm:inline-flex items-center gap-2"><Search className="h-4 w-4"/> ค้นหา</Link>
          <button onClick={toggle} className="p-2 rounded-lg border" aria-label="toggle theme">
            {dark ? <Sun className="h-4 w-4"/> : <MoonStar className="h-4 w-4"/>}
          </button>
        </div>
      </div>
    </header>
  )
}

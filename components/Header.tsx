'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Search, Sun, MoonStar, Plus } from 'lucide-react'

const links = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/compare', label: 'เปรียบเทียบ' },
  { href: '#latest', label: 'ล่าสุด' },
]

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
    <header className="sticky top-0 z-40 border-b bg-white/60 dark:bg-gray-950/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/50">
      <div className="container-nice h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="logo" className="h-6 w-6" />
          Head2HeadDeal
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="#search" className="btn btn-ghost hidden sm:inline-flex"><Search className="h-4 w-4"/> ค้นหา</Link>
          <Link href="/posts/la-roche-posay-uvmune400-vs-eucerin-cc-oil-control-2025/" className="btn btn-primary">
            <Plus className="h-4 w-4"/> เขียนบทความใหม่
          </Link>
          <button onClick={toggle} className="p-2 rounded-xl border hover:bg-gray-100/60 dark:hover:bg-gray-800/60" aria-label="toggle theme">
            {dark ? <Sun className="h-4 w-4"/> : <MoonStar className="h-4 w-4"/>}
          </button>
        </div>
      </div>
    </header>
  )
}

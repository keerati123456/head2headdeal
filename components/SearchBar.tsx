'use client'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { PostMeta } from '@/types/post'
import { Search } from 'lucide-react'

export function SearchBar({ posts }: { posts: PostMeta[] }) {
  const [q, setQ] = useState('')
  const fuse = useMemo(() => new Fuse(posts, { keys: ['title', 'tags', 'product.brand', 'product.model'], threshold: 0.35 }), [posts])
  const results = q ? fuse.search(q).slice(0, 8).map(r => r.item) : []

  return (
    <div id="search" className="relative">
      <div className="flex items-center gap-2 rounded-xl border bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm px-3 py-2">
        <Search className="h-4 w-4 text-gray-400"/>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="ค้นหาบทความ, รุ่นสินค้า, แท็ก..."
          className="w-full bg-transparent focus:outline-none placeholder:text-gray-400"
        />
      </div>

      {q && (
        <div className="absolute mt-2 w-full z-20 card overflow-hidden">
          {results.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">ไม่พบผลลัพธ์</div>
          ) : (
            <ul className="divide-y">
              {results.map(p => (
                <li key={p.slug} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/60 transition">
                  <Link href={`/posts/${p.slug}/`} className="block p-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500">{(p.tags||[]).join(' · ')}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

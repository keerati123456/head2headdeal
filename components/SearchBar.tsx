'use client'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { PostMeta } from '@/types/post'

export function SearchBar({ posts }: { posts: PostMeta[] }) {
  const [q, setQ] = useState('')
  const fuse = useMemo(() => new Fuse(posts, { keys: ['title', 'tags', 'product.brand', 'product.model'], threshold: 0.35 }), [posts])
  const results = q ? fuse.search(q).slice(0, 8).map(r => r.item) : []

  return (
    <div id="search" className="relative">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="ค้นหาบทความ, รุ่นสินค้า, แท็ก..."
        className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-950"
      />
      {q && (
        <div className="absolute mt-2 w-full z-20 bg-white dark:bg-gray-900 border rounded-xl shadow">
          {results.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">ไม่พบผลลัพธ์</div>
          ) : (
            <ul>
              {results.map(p => (
                <li key={p.slug} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-none">
                  <Link href={`/posts/${p.slug}/`}>
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

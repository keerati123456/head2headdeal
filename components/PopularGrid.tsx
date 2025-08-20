import Link from 'next/link'
import type { PostMeta } from '@/types/post'

export function PopularGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(p => (
        <Link key={p.slug} href={`/posts/${p.slug}/`} className="group rounded-2xl overflow-hidden border hover:shadow-sm transition">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {p.coverImage && <img src={p.coverImage} alt="cover" className="h-44 w-full object-cover group-hover:scale-[1.02] transition" />}
          <div className="p-4">
            <div className="text-sm text-gray-500">{(p.tags||[]).slice(0,2).join(' · ')}</div>
            <h3 className="font-semibold mt-1 line-clamp-2">{p.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

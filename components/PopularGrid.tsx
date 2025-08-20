import Link from 'next/link'
import type { PostMeta } from '@/types/post'

export function PopularGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map(p => (
        <Link key={p.slug} href={`/posts/${p.slug}/`} className="card card-hover overflow-hidden block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {p.coverImage && <img src={p.coverImage} alt="cover" className="h-48 w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />}
          <div className="p-4">
            <div className="text-xs text-gray-500 flex flex-wrap gap-1">
              {(p.tags||[]).slice(0,3).map(t => <span key={t} className="rounded-full border px-2 py-0.5">#{t}</span>)}
            </div>
            <h3 className="font-semibold mt-2 line-clamp-2">{p.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

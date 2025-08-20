import Link from 'next/link'
import { formatDate } from '@/lib/date'
import type { PostMeta } from '@/types/post'

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {posts.map(p => (
        <Link key={p.slug} href={`/posts/${p.slug}/`} className="card card-hover p-4 block">
          <h3 className="font-medium line-clamp-2">{p.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{formatDate(p.date)} • {(p.tags||[]).join(' · ')}</p>
        </Link>
      ))}
    </div>
  )
}

import Link from 'next/link'
import { formatDate } from '@/lib/date'
import type { PostMeta } from '@/types/post'

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y">
      {posts.map(p => (
        <li key={p.slug} className="py-4">
          <Link href={`/posts/${p.slug}/`} className="block">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-gray-500">{formatDate(p.date)} • {(p.tags||[]).join(' · ')}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

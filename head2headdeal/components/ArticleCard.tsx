import type { PostMeta } from '@/types/post'
import Link from 'next/link'
import { TagBadge } from './TagBadge'

export function ArticleCard({ meta }: { meta: PostMeta }) {
  return (
    <Link href={`/posts/${meta.slug}/`} className="rounded-2xl border p-4 hover:shadow-sm transition block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {meta.coverImage && <img src={meta.coverImage} alt="cover" className="w-full h-44 object-cover rounded-xl" />}
      <div className="mt-3">
        <h3 className="font-semibold">{meta.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">{(meta.tags || []).map(t => <TagBadge key={t} tag={t} />)}</div>
      </div>
    </Link>
  )
}

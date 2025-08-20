import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/date'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <nav className="not-prose text-sm mb-6"><Link href="/">← กลับหน้าแรก</Link></nav>
      <h1 className="mb-2">{post.meta.title}</h1>
      <p className="text-sm text-gray-500">{formatDate(post.meta.date)} • {post.meta.tags?.join(' · ')}</p>
      {post.meta.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.meta.coverImage} alt="cover" className="w-full rounded-2xl mt-4" />
      )}
      <div className="mt-6" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}

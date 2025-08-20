import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ? `/${process.env.NEXT_PUBLIC_BASE_PATH}` : ''
  const posts = getAllPosts()
  return [
    { url: `${base}${basePath}/`, lastModified: new Date() },
    ...posts.map(p => ({ url: `${base}${basePath}/posts/${p.slug}/`, lastModified: p.meta.date ? new Date(p.meta.date) : new Date() })),
  ]
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import type { Post, PostMeta } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(file)
  const meta = normalizeMeta(realSlug, data)
  const processed = remark().use(gfm).use(html).processSync(content)
  return { slug: realSlug, meta, html: processed.toString() }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs.map(s => getPostBySlug(s)!).filter(Boolean) as Post[]
  return posts.sort((a, b) => (new Date(b.meta.date || 0).getTime() - new Date(a.meta.date || 0).getTime()))
}

export function getPopularPosts(limit = 6): Post[] {
  const posts = getAllPosts()
  const sorted = posts.sort((a, b) => (Number(b.meta.views || 0) - Number(a.meta.views || 0)))
  const featured = posts.filter(p => p.meta.featured)
  const merged = [...featured, ...sorted.filter(p => !p.meta.featured)]
  return merged.slice(0, limit)
}

function normalizeMeta(slug: string, data: any): PostMeta {
  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    coverImage: data.coverImage || null,
    views: data.views || 0,
    featured: !!data.featured,
    product: data.product || null,
    specs: data.specs || null,
    pros: data.pros || null,
    cons: data.cons || null,
  }
}

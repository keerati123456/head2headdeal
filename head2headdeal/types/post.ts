export type PostMeta = {
  slug: string
  title: string
  date: string | null
  excerpt?: string
  tags?: string[]
  coverImage?: string | null
  views?: number
  featured?: boolean
  product?: {
    brand?: string
    model?: string
    price?: string | number
  } | null
  specs?: Record<string, string | number | boolean | null> | null
  pros?: string[] | null
  cons?: string[] | null
}

export type Post = {
  slug: string
  meta: PostMeta
  html: string
}

import Link from 'next/link'
import { getAllPosts, getPopularPosts } from '@/lib/posts'
import { PopularGrid } from '@/components/PopularGrid'
import { PostList } from '@/components/PostList'
import { SearchBar } from '@/components/SearchBar'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const posts = getAllPosts()
  const popular = getPopularPosts(6)
  const latest = posts.slice(0, 10)

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border px-6 py-12 md:py-16 hero-grad">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            เปรียบเทียบ <span className="bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(135deg, hsl(var(--brand)), hsl(var(--brand-2)))'}}>Head-to-Head</span> เลือกแบบชาญฉลาด
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 md:text-lg">
            รีวิวเปรียบเทียบสินค้า 1v1 พร้อมตารางสเปก ข้อดี-ข้อสังเกต และสรุปสั้น ๆ
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/compare" className="btn btn-primary">
              เริ่มเปรียบเทียบ <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link href="#latest" className="btn btn-ghost">ดูโพสต์ล่าสุด</Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="card p-4">
            <SearchBar posts={posts.map(p => p.meta)} />
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">ยอดนิยม</h2>
          <Link href="#latest" className="text-sm text-blue-600 hover:underline">ไปยังโพสต์ล่าสุด →</Link>
        </div>
        <PopularGrid posts={popular.map(p => p.meta)} />
      </section>

      {/* LATEST */}
      <section id="latest">
        <h2 className="text-xl font-semibold mb-3">ล่าสุด</h2>
        <PostList posts={latest.map(p => p.meta)} />
      </section>
    </div>
  )
}

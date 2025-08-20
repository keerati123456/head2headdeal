import Link from 'next/link'
import { getAllPosts, getPopularPosts } from '@/lib/posts'
import { PopularGrid } from '@/components/PopularGrid'
import { PostList } from '@/components/PostList'
import { SearchBar } from '@/components/SearchBar'

export default function HomePage() {
  const posts = getAllPosts()
  const popular = getPopularPosts(6)
  const latest = posts.slice(0, 10)

  return (
    <div className="space-y-10">
      {/* 2.1 กล่องค้นหาบทความ */}
      <section className="rounded-3xl border p-6 bg-gray-50 dark:bg-gray-900/50">
        <h1 className="text-2xl md:text-3xl font-bold">Head2HeadDeal</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">เปรียบเทียบสินค้าตัวต่อตัวแบบเข้าใจง่าย</p>
        <div className="mt-4">
          <SearchBar posts={posts.map(p => p.meta)} />
        </div>
      </section>

      {/* 2.2 พื้นที่โชว์บทความยอดนิยม */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl font-semibold">ยอดนิยม</h2>
          <Link href="#latest" className="text-sm text-blue-600 hover:underline">ไปยังโพสต์ล่าสุด →</Link>
        </div>
        <PopularGrid posts={popular.map(p => p.meta)} />
      </section>

      {/* 2.3 Feed บทความล่าสุด */}
      <section id="latest">
        <h2 className="text-xl font-semibold mb-3">ล่าสุด</h2>
        <PostList posts={latest.map(p => p.meta)} />
      </section>
    </div>
  )
}

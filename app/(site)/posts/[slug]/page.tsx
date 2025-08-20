import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/date'
import Link from 'next/link'
import BuyButtons from '../../../../components/BuyButtons'


export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const { meta, html } = post

  return (
    <article className="mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">หน้าแรก</Link>
        <span className="mx-2">/</span>
        <Link href="/#latest" className="hover:underline">บทความ</Link>
      </nav>

      {/* หัวเรื่อง + meta */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          {meta.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <time dateTime={meta.date || undefined}>{formatDate(meta.date)}</time>
          <span>•</span>
          <div className="flex flex-wrap gap-2">
            {(meta.tags || []).map(t => (
              <span key={t} className="rounded-full border px-2 py-0.5">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Cover */}
      {meta.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.coverImage}
          alt=""
          className="w-full rounded-2xl border shadow-sm mb-8"
        />
      )}

      {/* Hero CTA (ใส่/ไม่ใส่ก็ได้) */}
      <div className="mb-8 rounded-2xl border p-4 md:p-5 bg-white/70 dark:bg-gray-900/60 backdrop-blur card">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          บทความนี้มีลิงก์ช้อปออนไลน์และตารางเทียบแบบหมัดต่อหมัด ช่วยให้เลือกได้ไวขึ้น ✨
        </div>
      </div>

      {/* เนื้อหา Markdown (สวยด้วยโปรเซ + ตาราง polished) */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24
                   prose-img:rounded-2xl prose-table:my-6 prose-th:font-semibold
                   prose-a:text-blue-600 dark:prose-a:text-blue-400"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* ปุ่มช้อป (อ่านจาก frontmatter ถ้ามี) */}
      {meta?.shop?.laroche && meta?.shop?.eucerin && (
        <BuyButtons laRocheUrl={meta.shop.laroche} eucerinUrl={meta.shop.eucerin} />
      )}

      {/* เส้นคั่น */}
      <hr className="my-10 border-gray-200 dark:border-gray-800" />

      {/* กล่องแชร์ + แท็กซ้ำ (CTA) */}
      <footer className="mb-14 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="text-sm text-gray-500">
          ถ้าบทความนี้มีประโยชน์ กดแชร์ให้เพื่อนที่กำลังเลือกกันแดดด้วยนะ 🌞
        </div>
        <div className="flex gap-2">
          <a
            className="btn btn-primary"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              (process.env.NEXT_PUBLIC_SITE_URL || '') +
                (process.env.NEXT_PUBLIC_BASE_PATH ? '/' + process.env.NEXT_PUBLIC_BASE_PATH : '') +
                '/posts/' + meta.slug + '/'
            )}`}
            target="_blank"
          >
            แชร์ Facebook
          </a>
          <a
            className="btn btn-ghost"
            href="#latest"
          >
            อ่านบทความล่าสุด
          </a>
        </div>
      </footer>

      {/* บทความที่เกี่ยวข้อง */}
      <RelatedPosts currentSlug={meta.slug} />
    </article>
  )
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const others = getAllPosts()
    .filter(p => p.slug !== currentSlug)
    .slice(0, 3)
  if (!others.length) return null
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">บทความที่เกี่ยวข้อง</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {others.map(({ meta }) => (
          <Link key={meta.slug} href={`/posts/${meta.slug}/`} className="card card-hover p-4 block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {meta.coverImage && (
              <img src={meta.coverImage} alt="" className="w-full h-36 object-cover rounded-xl mb-3" />
            )}
            <div className="text-sm text-gray-500">{(meta.tags || []).slice(0, 2).join(' · ')}</div>
            <div className="font-medium line-clamp-2 mt-1">{meta.title}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

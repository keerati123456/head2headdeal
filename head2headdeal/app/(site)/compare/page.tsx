import { getPostBySlug } from '@/lib/posts'
import Link from 'next/link'

export default function ComparePage({ searchParams }: { searchParams: { left?: string; right?: string } }) {
  const { left, right } = searchParams
  const L = left ? getPostBySlug(left) : null
  const R = right ? getPostBySlug(right) : null

  if (!L || !R) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">เปรียบเทียบแบบ 1v1</h1>
        <p className="text-gray-600 dark:text-gray-400">เพิ่มพารามิเตอร์ใน URL เช่น <code>/compare?left=iphone-16-vs-galaxy-s25&right=dyson-supersonic-vs-shark-hyperair</code></p>
        <Link className="text-blue-600" href="/">← กลับหน้าแรก</Link>
      </div>
    )
  }

  const l = L.meta, r = R.meta
  const specs = new Set([...(l.specs ? Object.keys(l.specs) : []), ...(r.specs ? Object.keys(r.specs) : [])])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{l.title} ↔ {r.title}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <CardSide meta={l} />
        <CardSide meta={r} />
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="text-left p-3">สเปก</th>
              <th className="text-left p-3">{l.product?.model || 'ซ้าย'}</th>
              <th className="text-left p-3">{r.product?.model || 'ขวา'}</th>
            </tr>
          </thead>
          <tbody>
            {[...specs].map(key => {
              const lv = l.specs?.[key]
              const rv = r.specs?.[key]
              const diff = JSON.stringify(lv) != JSON.stringify(rv)
              return (
                <tr key={key} className={diff ? 'bg-yellow-50/50 dark:bg-yellow-900/20' : ''}>
                  <td className="p-3 font-medium">{key}</td>
                  <td className="p-3">{String(lv ?? '—')}</td>
                  <td className="p-3">{String(rv ?? '—')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ProsCons title="ข้อดี (ซ้าย)" items={l.pros} />
        <ProsCons title="ข้อดี (ขวา)" items={r.pros} />
        <ProsCons title="ข้อสังเกต (ซ้าย)" items={l.cons} />
        <ProsCons title="ข้อสังเกต (ขวา)" items={r.cons} />
      </div>
    </div>
  )
}

function CardSide({ meta }: { meta: any }) {
  return (
    <div className="rounded-2xl border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {meta.coverImage && <img alt="cover" className="w-full rounded-xl" src={meta.coverImage} />}
      <h2 className="text-lg font-semibold mt-3">{meta.product?.brand} {meta.product?.model}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">ราคา: {meta.product?.price ?? '—'}</p>
      <a className="text-blue-600 text-sm" href={`/posts/${meta.slug}/`}>อ่านรีวิวฉบับเต็ม →</a>
    </div>
  )
}

function ProsCons({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {items.map((it, i) => (<li key={i}>{it}</li>))}
      </ul>
    </div>
  )
}

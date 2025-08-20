import { getAllPosts } from '@/lib/posts'
import CompareClient from '@/components/CompareClient'

// สร้างหน้าแบบ static แล้วปล่อยให้ client อ่าน query string เอง
export default function ComparePage() {
  const allMetas = getAllPosts().map(p => p.meta)
  return <CompareClient allMetas={allMetas} />
}

// กันเหนียวให้บิวด์แบบ static
export const dynamic = 'force-static'

import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Head2HeadDeal – Compare Smart, Buy Smart',
  description: 'บทความเปรียบเทียบสินค้าแบบ 1v1 พร้อมสรุปข้อดี-ข้อเสียและสเปกแบบชัดเจน',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <Header />
        <main className="container-nice py-8">{children}</main>
        <footer className="border-t mt-12 py-8 text-sm text-gray-500">
          <div className="container-nice">© {new Date().getFullYear()} Head2HeadDeal</div>
        </footer>
      </body>
    </html>
  )
}

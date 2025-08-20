// components/BuyButtons.tsx
type Props = { laRocheUrl: string; eucerinUrl: string }

export default function BuyButtons({ laRocheUrl, eucerinUrl }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 my-8">
      <a
        href={laRocheUrl}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white"
        style={{ backgroundImage: 'linear-gradient(135deg,#1773ea,#2a8bf2)' }}
      >
        ดูราคาล่าสุด – La Roche-Posay
      </a>
      <a
        href={eucerinUrl}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white"
        style={{ backgroundImage: 'linear-gradient(135deg,#ee4d2d,#f17a5f)' }}
      >
        ดูราคาล่าสุด – Eucerin
      </a>
    </div>
  )
}

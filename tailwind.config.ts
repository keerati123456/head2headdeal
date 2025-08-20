import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config

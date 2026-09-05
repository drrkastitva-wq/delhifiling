import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: { default: 'Delhi Filing — Legal, Corporate & Compliance Services', template: '%s | Delhi Filing' },
  description: 'Professional eCourt Filing, eTender & Procurement, Business Incorporation and Annual Compliance services in Delhi.',
  keywords: ['court filing', 'tender filing', 'company incorporation', 'annual compliance', 'Delhi', 'legal services'],
  openGraph: {
    siteName: 'Delhi Filing',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}

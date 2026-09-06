import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mb-6">
        <Scale size={32} className="text-gold" />
      </div>
      <h1 className="font-heading text-6xl font-bold text-white mb-3">404</h1>
      <h2 className="font-heading text-2xl font-semibold text-white mb-3">Page Not Found</h2>
      <p className="text-white/60 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved. Let us help you find what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-dark transition">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:border-gold hover:text-gold transition">
          Contact Us
        </Link>
      </div>
    </div>
  )
}

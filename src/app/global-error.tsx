'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <html>
      <body className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/60 max-w-md mb-8">An unexpected error occurred. Please try again or contact us if the problem persists.</p>
        <div className="flex gap-3">
          <button onClick={reset} className="px-6 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-dark transition">
            Try Again
          </button>
          <Link href="/" className="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:border-gold hover:text-gold transition">
            Go Home
          </Link>
        </div>
      </body>
    </html>
  )
}

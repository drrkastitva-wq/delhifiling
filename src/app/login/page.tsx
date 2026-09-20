'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Scale, Loader2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Login failed'); return }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
              <Scale size={22} className="text-gold" />
            </div>
            <span className="font-heading font-bold text-navy text-xl">Delhi Filing</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-navy">Welcome back</h1>
          <p className="text-text-muted text-sm mt-1">Sign in to track your services and documents</p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Email Address</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition pr-10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-navy">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-dark transition flex items-center justify-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-text-muted mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-navy font-semibold hover:text-gold transition">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

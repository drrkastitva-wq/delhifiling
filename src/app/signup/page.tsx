'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Scale, Loader2, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Signup failed'); return }
    router.push('/dashboard')
    router.refresh()
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-medium text-navy mb-1.5">{label}</label>
      <input
        type={type} required={['name', 'email', 'password'].includes(key)}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
              <Scale size={22} className="text-gold" />
            </div>
            <span className="font-heading font-bold text-navy text-xl">Delhi Filing</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-navy">Create your account</h1>
          <p className="text-text-muted text-sm mt-1">Track your services, documents and inquiries</p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {field('name', 'Full Name *', 'text', 'Your full name')}
            {field('email', 'Email Address *', 'email', 'you@example.com')}
            {field('phone', 'Mobile Number', 'tel', '+91 XXXXX XXXXX')}
            {field('company', 'Company / Firm (optional)', 'text', 'Your company name')}
            <div>
              <label className="block text-xs font-medium text-navy mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} required minLength={8}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 8 characters"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-navy font-semibold hover:text-gold transition">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

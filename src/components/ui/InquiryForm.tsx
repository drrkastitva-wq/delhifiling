'use client'
import { useState, useRef } from 'react'
import { MessageSquare, CheckCircle, Loader2, Paperclip, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InquiryFormProps {
  serviceName?: string
  category?: string
  className?: string
}

export default function InquiryForm({ serviceName, category, className }: InquiryFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  function removeFile(i: number) {
    setFiles(f => f.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('serviceText', serviceName || '')
      fd.append('category', category || '')
      fd.append('source', window.location.href)
      files.forEach(f => fd.append('files', f))

      const res = await fetch('/api/inquiry', { method: 'POST', body: fd })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('bg-white rounded-2xl border border-border p-6 text-center shadow-lg', className)}>
        <CheckCircle size={48} className="text-success mx-auto mb-3" />
        <h3 className="font-heading font-bold text-navy text-xl mb-2">Inquiry Received!</h3>
        <p className="text-text-muted text-sm">Our team will contact you within 2 hours.</p>
      </div>
    )
  }

  return (
    <div className={cn('bg-white rounded-2xl border border-border shadow-lg overflow-hidden', className)}>
      <div className="bg-navy px-6 py-4 border-b-2 border-[#16a34a]">
        <h3 className="font-heading font-bold text-white text-lg">Get Free Consultation</h3>
        {serviceName && <p className="text-[#22c55e] text-sm mt-1">{serviceName}</p>}
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <input required placeholder="Your Full Name *" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <input required type="tel" placeholder="Mobile Number *" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <input type="email" placeholder="Email Address" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <textarea rows={3} placeholder="Brief description of your requirement..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition resize-none" />

        {/* Document upload */}
        <div>
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 text-sm text-navy border border-dashed border-border rounded-lg px-4 py-2.5 w-full hover:border-navy transition">
            <Paperclip size={15} className="text-gold" />
            {files.length ? `${files.length} file(s) attached` : 'Attach documents (optional)'}
          </button>
          <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden" onChange={e => setFiles(Array.from(e.target.files || []))} />
          {files.length > 0 && (
            <div className="mt-2 space-y-1">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-text-muted bg-cream rounded px-3 py-1.5">
                  <span className="truncate max-w-[200px]">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="ml-2 text-text-muted hover:text-navy">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="w-full py-3 bg-[#16a34a] text-white font-semibold rounded-lg hover:bg-[#15803d] transition flex items-center justify-center gap-2">
          {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : null}
          {status === 'loading' ? 'Submitting...' : 'Get Free Consultation'}
        </button>
        {status === 'error' && <p className="text-danger text-xs text-center">Something went wrong. Please call us directly.</p>}
        <div className="flex items-center gap-2 justify-center pt-1">
          <MessageSquare size={14} className="text-[#16a34a]" />
          <span className="text-xs text-text-muted">We respond within 2 hours</span>
        </div>
      </form>
    </div>
  )
}

'use client'
import { useState, useRef } from 'react'
import { CheckCircle, Loader2, Paperclip, X } from 'lucide-react'

interface InquiryFormProps { serviceName?: string; category?: string; className?: string }

export default function InquiryForm({ serviceName, category, className }: InquiryFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

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
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className={`bg-white border border-[#cccccc] overflow-hidden ${className}`}>
      <div className="h-1 bg-[#16a34a]" />
      <div className="px-5 py-3 border-b border-[#eeeeee]">
        <p className="text-[#003366] font-bold text-[13px]">Free Consultation</p>
      </div>
      <div className="p-6 text-center">
        <CheckCircle size={32} className="text-[#16a34a] mx-auto mb-3" />
        <p className="text-[#003366] font-bold text-[14px] mb-1">Inquiry Received</p>
        <p className="text-[#666] text-[12px]">We'll contact you within 2 hours.</p>
      </div>
    </div>
  )

  const inp = "w-full px-2.5 py-2 border border-[#d0d0d0] text-[12px] text-[#222] bg-white focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/10 placeholder:text-[#aaa]"
  const lbl = "block text-[11px] font-semibold text-[#444] uppercase tracking-wide mb-1"

  return (
    <div className={`bg-white border border-[#cccccc] overflow-hidden ${className}`}>
      {/* Top accent + header */}
      <div className="h-1 bg-[#16a34a]" />
      <div className="px-4 py-3 border-b border-[#eeeeee] flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a] mb-0.5">Free Consultation</p>
          <p className="text-[#003366] font-bold text-[13px] leading-tight">{serviceName || 'Get Expert Advice'}</p>
        </div>
        {category && <span className="text-[10px] text-[#888] border border-[#ddd] px-2 py-0.5 shrink-0 ml-2">{category}</span>}
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div>
          <label className={lbl}>Full Name <span className="text-red-500">*</span></label>
          <input required placeholder="e.g. Rajesh Kumar" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} />
        </div>

        <div>
          <label className={lbl}>Mobile <span className="text-red-500">*</span></label>
          <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inp} />
        </div>

        <div>
          <label className={lbl}>Email</label>
          <input type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inp} />
        </div>

        <div>
          <label className={lbl}>Requirement</label>
          <textarea rows={3} placeholder="Briefly describe what you need..."
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={`${inp} resize-none`} />
        </div>

        {/* File attach */}
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 text-[11px] text-[#555] hover:text-[#003366] transition">
          <Paperclip size={12} />
          {files.length ? `${files.length} file(s) attached` : 'Attach documents (optional)'}
        </button>
        <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden" onChange={e => setFiles(Array.from(e.target.files || []))} />
        {files.length > 0 && (
          <div className="space-y-1">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] text-[#555] bg-[#f9f9f9] px-2.5 py-1.5 border border-[#e8e8e8]">
                <span className="truncate max-w-[180px]">{f.name}</span>
                <button type="button" onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}>
                  <X size={11} className="text-[#aaa] hover:text-[#CC0000]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-[11px] text-red-600">Submission failed. Please call us directly.</p>
        )}

        {/* CTA strip */}
        <div className="-mx-4 -mb-4 mt-4 border-t border-[#eeeeee]">
          <button type="submit" disabled={status === 'loading'}
            className="w-full py-3 bg-[#003366] hover:bg-[#002244] text-white font-bold text-[13px] tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-60">
            {status === 'loading' && <Loader2 size={13} className="animate-spin" />}
            {status === 'loading' ? 'Submitting…' : 'Get Free Consultation →'}
          </button>
          <p className="text-center text-[10px] text-[#aaa] py-2">No obligation · Response within 2 hours</p>
        </div>
      </form>
    </div>
  )
}

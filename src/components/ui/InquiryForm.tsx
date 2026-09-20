'use client'
import { useState, useRef } from 'react'
import { CheckCircle, Loader2, Paperclip, X, User, Phone, Mail, MessageSquare } from 'lucide-react'

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
    <div className={`bg-white border border-[#cccccc] text-center overflow-hidden ${className}`}>
      <div className="bg-[#003366] px-5 py-3 border-b-4 border-[#16a34a]">
        <p className="text-white font-bold text-[13px]">Delhi Filing</p>
      </div>
      <div className="p-8">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={30} className="text-[#16a34a]" />
        </div>
        <h3 className="text-[#003366] font-bold text-[16px] mb-1">Inquiry Received!</h3>
        <p className="text-[#555] text-[12px]">Our team will contact you within 2 hours.</p>
      </div>
    </div>
  )

  const inp = "w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] bg-white focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/20"

  return (
    <div className={`bg-white border border-[#cccccc] overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-[#003366] px-5 py-3 border-b-4 border-[#16a34a]">
        <p className="text-[#90EE90] text-[10px] font-bold uppercase tracking-widest mb-0.5">Free Consultation</p>
        <h3 className="text-white font-bold text-[15px] leading-tight">
          {serviceName || 'Get Expert Advice'}
        </h3>
        {category && <p className="text-white/60 text-[11px] mt-0.5">{category}</p>}
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="relative">
          <User size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#16a34a]" />
          <input required placeholder="Full Name *" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} />
        </div>
        <div className="relative">
          <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#16a34a]" />
          <input required type="tel" placeholder="Mobile Number *" value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inp} />
        </div>
        <div className="relative">
          <Mail size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#16a34a]" />
          <input type="email" placeholder="Email Address" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inp} />
        </div>
        <div className="relative">
          <MessageSquare size={13} className="absolute left-2.5 top-3 text-[#16a34a]" />
          <textarea rows={3} placeholder="Brief description of your requirement..."
            value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={`${inp} resize-none`} />
        </div>

        {/* File attach */}
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 w-full px-3 py-2 border border-dashed border-[#16a34a]/40 text-[12px] text-[#16a34a] hover:border-[#16a34a] hover:bg-green-50 transition">
          <Paperclip size={13} />
          {files.length ? `${files.length} file(s) attached` : 'Attach documents (optional)'}
        </button>
        <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden" onChange={e => setFiles(Array.from(e.target.files || []))} />
        {files.length > 0 && (
          <div className="space-y-1">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] text-[#555] bg-green-50 px-3 py-1.5 border border-green-100">
                <span className="truncate max-w-[180px]">{f.name}</span>
                <button type="button" onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}>
                  <X size={11} className="text-[#888] hover:text-[#CC0000]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-[11px] text-red-600 text-center">Failed. Please call us directly.</p>
        )}

        <button type="submit" disabled={status === 'loading'}
          className="w-full py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[13px] transition flex items-center justify-center gap-2 disabled:opacity-60">
          {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
          {status === 'loading' ? 'Submitting...' : 'Get Free Consultation'}
        </button>

        <p className="text-center text-[11px] text-[#888]">✓ Free · No obligation · Response within 2 hours</p>
      </form>
    </div>
  )
}

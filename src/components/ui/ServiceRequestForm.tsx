'use client'
import { useState } from 'react'
import { CheckCircle, Loader2, ChevronDown } from 'lucide-react'

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Andaman & Nicobar','Chandigarh','Dadra & Nagar Haveli','Daman & Diu',
  'Lakshadweep','Puducherry',
]

interface Props {
  serviceName: string
  category?: string
}

export default function ServiceRequestForm({ serviceName, category }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', city: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, serviceText: serviceName, category, source: window.location.href }),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={28} className="text-[#16a34a]" />
      </div>
      <h3 className="font-heading font-bold text-navy text-xl mb-2">Request Submitted!</h3>
      <p className="text-gray-500 text-sm">Our team will contact you within 2 hours.</p>
    </div>
  )

  const inputCls = "w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-navy focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]/20 transition bg-white"
  const labelCls = "block text-xs font-semibold text-navy mb-1.5"

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header — service pre-filled */}
      <div className="bg-navy px-6 py-4 border-b-2 border-[#16a34a]">
        <p className="text-[#22c55e] text-[11px] font-semibold uppercase tracking-wider mb-1">Service Request</p>
        <h3 className="font-heading font-bold text-white text-lg leading-tight">{serviceName}</h3>
        {category && <p className="text-white/50 text-xs mt-0.5">{category}</p>}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Mobile Number *</label>
            <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Email Address *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>State *</label>
            <div className="relative">
              <select required value={form.state} onChange={set('state')}
                className={`${inputCls} appearance-none pr-8`}>
                <option value="">Select State</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelCls}>City *</label>
            <input required value={form.city} onChange={set('city')} placeholder="Your city" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Additional Details</label>
          <textarea rows={3} value={form.message} onChange={set('message')}
            placeholder="Describe your requirement briefly..."
            className={`${inputCls} resize-none`} />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-xs text-center">Something went wrong. Please call us directly.</p>
        )}

        <button type="submit" disabled={status === 'loading'}
          className="w-full py-3 bg-[#16a34a] text-white font-semibold rounded-lg hover:bg-[#15803d] transition flex items-center justify-center gap-2 text-sm shadow-sm">
          {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
          {status === 'loading' ? 'Submitting...' : 'Submit Service Request'}
        </button>

        <p className="text-center text-xs text-gray-400">Free consultation · No obligation · Response within 2 hours</p>
      </form>
    </div>
  )
}

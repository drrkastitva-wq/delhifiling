'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle, Loader2, ChevronDown, User, Phone, Mail,
  MapPin, FileText, ArrowLeft, Shield, Clock, Award
} from 'lucide-react'

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Andaman & Nicobar','Chandigarh','Dadra & Nagar Haveli','Daman & Diu',
  'Lakshadweep','Puducherry',
]

export default function ApplyFormClient() {
  const params = useSearchParams()
  const serviceName = params.get('service') || 'Service Request'
  const category = params.get('category') || ''
  const back = params.get('back') || '/'

  const [form, setForm] = useState({
    name: '', phone: '', email: '', state: '', city: '', message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f0f0f0' }}>
      <div className="bg-white border border-[#cccccc] max-w-md w-full mx-4 text-center overflow-hidden">
        <div className="bg-[#003366] px-6 py-4 border-b-4 border-[#FF6600]">
          <p className="text-[#FFD700] font-bold text-[13px] uppercase tracking-wider">Delhi Filing</p>
        </div>
        <div className="p-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#e8f5e9' }}>
            <CheckCircle size={32} className="text-[#16a34a]" />
          </div>
          <h2 className="text-[#003366] font-bold text-xl mb-2">Application Submitted!</h2>
          <p className="text-[#555] text-[13px] mb-1">Reference: <span className="font-semibold text-[#003366]">{serviceName}</span></p>
          <p className="text-[#555] text-[13px] mb-6">Our team will contact you within <strong>2 working hours</strong>.</p>
          <Link href={back}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF6600] text-white font-semibold text-[13px] rounded-sm no-underline hover:bg-[#e65c00] transition">
            <ArrowLeft size={14} /> Back to Service
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#f0f0f0' }}>

      {/* Gov header bar */}
      <div className="bg-gradient-to-r from-[#001f4d] via-[#003366] to-[#004d99]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 bg-[#FF6600] rounded flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">DF</span>
            </div>
            <div>
              <div className="text-white font-bold text-[15px] leading-tight">Delhi Filing</div>
              <div className="text-[#FFD700] text-[10px]">Legal · Corporate · Compliance</div>
            </div>
          </Link>
          <Link href={back}
            className="flex items-center gap-1.5 text-white/80 text-[12px] no-underline hover:text-white transition">
            <ArrowLeft size={13} /> Back
          </Link>
        </div>
      </div>

      {/* Orange accent bar */}
      <div className="h-1 bg-[#FF6600]" />

      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Page title */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[11px] text-[#666] mb-2">
            <Link href="/" className="no-underline hover:text-[#CC0000]">Home</Link>
            <span>›</span>
            {category && <><span className="text-[#666]">{category}</span><span>›</span></>}
            <span className="text-[#333]">{serviceName}</span>
          </div>
          <h1 className="text-[#003366] font-bold text-xl">Service Application Form</h1>
          <p className="text-[#555] text-[13px] mt-1">Fill in the details below. Our expert will contact you within 2 working hours.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* FORM — 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#cccccc]">

              {/* Form header */}
              <div className="bg-[#003366] px-5 py-3 border-b-4 border-[#FF6600] flex items-center justify-between">
                <div>
                  <p className="text-[#FFD700] text-[10px] font-bold uppercase tracking-widest">Service Request</p>
                  <p className="text-white font-bold text-[15px] leading-tight mt-0.5">{serviceName}</p>
                </div>
                {category && (
                  <span className="text-[11px] text-white/60 bg-white/10 px-2 py-1 rounded-sm">{category}</span>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Personal details */}
                <div>
                  <p className="text-[11px] font-bold text-[#FF6600] uppercase tracking-wider mb-3 pb-1 border-b border-[#eeeeee]">
                    Personal Information
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#003366] mb-1.5">
                        Full Name <span className="text-[#CC0000]">*</span>
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                        <input required value={form.name} onChange={set('name')}
                          placeholder="Enter your full name"
                          className="w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 bg-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[#003366] mb-1.5">
                        Mobile Number <span className="text-[#CC0000]">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                        <input required type="tel" value={form.phone} onChange={set('phone')}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#003366] mb-1.5">
                    Email Address <span className="text-[#CC0000]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                    <input required type="email" value={form.email} onChange={set('email')}
                      placeholder="your@email.com"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 bg-white" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-[11px] font-bold text-[#FF6600] uppercase tracking-wider mb-3 pb-1 border-b border-[#eeeeee]">
                    Location
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#003366] mb-1.5">
                        State <span className="text-[#CC0000]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                        <select required value={form.state} onChange={set('state')}
                          className="w-full pl-8 pr-8 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] bg-white appearance-none">
                          <option value="">Select State</option>
                          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[#003366] mb-1.5">
                        City <span className="text-[#CC0000]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                        <input required value={form.city} onChange={set('city')}
                          placeholder="Your city"
                          className="w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-[11px] font-bold text-[#FF6600] uppercase tracking-wider mb-3 pb-1 border-b border-[#eeeeee]">
                    Requirement Details
                  </p>
                  <div className="relative">
                    <FileText size={13} className="absolute left-3 top-3 text-[#999]" />
                    <textarea rows={4} value={form.message} onChange={set('message')}
                      placeholder="Describe your requirement in brief — case details, urgency, any specific questions..."
                      className="w-full pl-8 pr-3 py-2.5 border border-[#cccccc] text-[13px] text-[#333] focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/20 bg-white resize-none" />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3 text-[12px] text-red-700">
                    Submission failed. Please call us directly at +91 99119 91330.
                  </div>
                )}

                {/* Submit */}
                <div className="pt-1">
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-bold text-[14px] transition flex items-center justify-center gap-2 disabled:opacity-60">
                    {status === 'loading'
                      ? <><Loader2 size={16} className="animate-spin" /> Submitting Application...</>
                      : 'Submit Application'}
                  </button>
                  <p className="text-center text-[11px] text-[#888] mt-2">
                    Free consultation · No obligation · Response within 2 hours
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT sidebar — 1/3 */}
          <div className="space-y-4">

            {/* Why us */}
            <div className="bg-white border border-[#cccccc]">
              <div className="section-header">Why Delhi Filing?</div>
              {[
                { icon: Shield, text: '100% Confidential handling' },
                { icon: Award,  text: 'Expert advocates & CAs' },
                { icon: Clock,  text: 'Response within 2 hours' },
                { icon: CheckCircle, text: 'End-to-end service support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-3 border-b border-[#eeeeee] last:border-0">
                  <div className="w-7 h-7 bg-[#003366] rounded flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-white" />
                  </div>
                  <span className="text-[12px] text-[#333]">{text}</span>
                </div>
              ))}
            </div>

            {/* Call box */}
            <div className="bg-white border border-[#cccccc]">
              <div className="section-header">Prefer to Call?</div>
              <div className="p-4 text-center">
                <p className="text-[12px] text-[#555] mb-3">Mon–Sat, 9 AM to 7 PM</p>
                <a href="tel:+919911991330"
                  className="block w-full py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-[13px] no-underline transition">
                  +91 99119 91330
                </a>
                <a href="https://wa.me/919911991330" target="_blank" rel="noopener noreferrer"
                  className="block w-full py-2.5 mt-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[13px] no-underline transition">
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-[#fffbeb] border border-[#fde68a] px-4 py-3">
              <p className="text-[11px] text-[#92400e] leading-relaxed">
                <strong>Note:</strong> All information submitted is kept strictly confidential and used only for service delivery purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

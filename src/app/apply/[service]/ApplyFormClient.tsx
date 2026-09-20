'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2, ChevronDown, ArrowLeft, Shield, Clock, Award, Mail } from 'lucide-react'

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
  'Andaman & Nicobar','Chandigarh','Dadra & Nagar Haveli','Daman & Diu','Lakshadweep','Puducherry',
]

const inp = "w-full px-3 py-3 border border-[#d0d0d0] text-[13px] text-[#222] bg-white focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366]/10 rounded-lg transition placeholder:text-[#aaa]"
const lbl = "block text-[11px] font-bold text-[#444] uppercase tracking-wide mb-1"

export default function ApplyFormClient() {
  const params = useSearchParams()
  const serviceName = params.get('service') || 'Service Request'
  const category = params.get('category') || ''
  const back = params.get('back') || '/'

  const [form, setForm] = useState({ name: '', phone: '', email: '', state: '', city: '', message: '' })
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg,#f0f7f0 0%,#e8f5e9 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-[#003366] px-6 py-5 border-b-4 border-[#16a34a] text-center">
          <p className="text-[#90EE90] font-bold text-[11px] uppercase tracking-widest">Delhi Filing</p>
        </div>
        <div className="p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-[#16a34a] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#16a34a]" />
          </div>
          <h2 className="text-[#003366] font-bold text-2xl mb-2">Application Submitted!</h2>
          <p className="text-[#555] text-[14px] mb-1">Service: <span className="font-bold text-[#003366]">{serviceName}</span></p>
          <p className="text-[#555] text-[14px] mb-8">Our expert will contact you within <strong>2 working hours</strong>.</p>
          <Link href={back} className="inline-flex items-center gap-2 px-8 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[14px] rounded-xl no-underline transition shadow-lg">
            <ArrowLeft size={16} /> Back to Service
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#f0f7f0 0%,#e8f5e9 100%)' }}>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#001f4d] via-[#003366] to-[#004d99] shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-[#16a34a] rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-sm">DF</span>
            </div>
            <div>
              <div className="text-white font-bold text-[16px] leading-tight">Delhi Filing</div>
              <div className="text-[#90EE90] text-[10px] tracking-wider">Legal · Corporate · Compliance</div>
            </div>
          </Link>
          <Link href={back} className="flex items-center gap-1.5 text-white/80 text-[13px] no-underline hover:text-white transition bg-white/10 px-3 py-1.5 rounded-lg">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
        <div className="h-1 bg-[#16a34a]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] text-[#666] mb-6">
          <Link href="/" className="no-underline hover:text-[#16a34a] transition">Home</Link>
          <span className="text-[#ccc]">›</span>
          {category && <><span>{category}</span><span className="text-[#ccc]">›</span></>}
          <span className="text-[#333] font-medium">{serviceName}</span>
        </div>

        {/* Page heading */}
        <div className="mb-8 text-center">
          <h1 className="text-[#003366] font-bold text-3xl md:text-4xl mb-2">Service Application</h1>
          <p className="text-[#555] text-[15px]">Fill in your details — our expert will call you within <strong>2 working hours</strong></p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* FORM — 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

              {/* Form header */}
              <div className="bg-[#003366] px-6 py-5 border-b-4 border-[#16a34a]">
                <p className="text-[#90EE90] text-[11px] font-bold uppercase tracking-widest mb-1">Service Request</p>
                <p className="text-white font-bold text-[20px] leading-tight">{serviceName}</p>
                {category && <p className="text-white/60 text-[13px] mt-1">{category}</p>}
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                {/* Section: Personal */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">1</div>
                    <p className="text-[13px] font-bold text-[#003366] uppercase tracking-wider">Personal Information</p>
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>Full Name <span className="text-red-500">*</span></label>
                      <input required value={form.name} onChange={set('name')} placeholder="Enter your full name" className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>Mobile Number <span className="text-red-500">*</span></label>
                      <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" className={inp} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={lbl}>Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={inp} />
                </div>

                {/* Section: Location */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">2</div>
                    <p className="text-[13px] font-bold text-[#003366] uppercase tracking-wider">Location</p>
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lbl}>State <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select required value={form.state} onChange={set('state')} className={`${inp} appearance-none pr-8`}>
                          <option value="">Select State</option>
                          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>City <span className="text-red-500">*</span></label>
                      <input required value={form.city} onChange={set('city')} placeholder="Your city" className={inp} />
                    </div>
                  </div>
                </div>

                {/* Section: Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">3</div>
                    <p className="text-[13px] font-bold text-[#003366] uppercase tracking-wider">Requirement Details</p>
                    <div className="flex-1 h-px bg-[#e0e0e0]" />
                  </div>
                  <textarea rows={5} value={form.message} onChange={set('message')}
                    placeholder="Describe your requirement — case details, urgency, specific questions, documents available..."
                    className={`${inp} resize-none`} />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded-lg text-[13px] text-red-700">
                    Submission failed. Please call us at <strong>+91 99119 91330</strong> or WhatsApp us directly.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[16px] rounded-xl transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60">
                  {status === 'loading'
                    ? <><Loader2 size={20} className="animate-spin" /> Submitting...</>
                    : <><CheckCircle size={20} /> Submit Application</>}
                </button>

                <p className="text-center text-[12px] text-[#888]">
                  🔒 Your information is 100% confidential · Free consultation · No obligation
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="space-y-5">

            {/* Why us */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#003366] px-5 py-3 border-b-4 border-[#16a34a]">
                <p className="text-[#90EE90] text-[11px] font-bold uppercase tracking-wider">Why Delhi Filing?</p>
              </div>
              {[
                { icon: Shield, text: '100% Confidential handling' },
                { icon: Award,  text: 'Expert Advocates, CAs & CSs' },
                { icon: Clock,  text: 'Response within 2 hours' },
                { icon: CheckCircle, text: 'End-to-end service support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-5 py-3.5 border-b border-[#f0f0f0] last:border-0">
                  <div className="w-8 h-8 bg-[#e8f5e9] rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#16a34a]" />
                  </div>
                  <span className="text-[13px] text-[#333]">{text}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#003366] px-5 py-3 border-b-4 border-[#16a34a]">
                <p className="text-[#90EE90] text-[11px] font-bold uppercase tracking-wider">Prefer Direct Contact?</p>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-[12px] text-[#555] text-center">Mon–Fri, 8 AM to 8 PM</p>
                <a href="tel:+919911991330"
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-[#003366] hover:bg-[#004080] text-white font-bold text-[14px] rounded-xl no-underline transition shadow">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                  +91 99119 91330
                </a>
                <a href="https://wa.me/919911991330?text=Hello%21%20I%20need%20help%20with%20a%20legal%20service." target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[14px] rounded-xl no-underline transition shadow">
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="white"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.437-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.471c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.325s1.427 3.857 1.626 4.123c.199.265 2.808 4.287 6.803 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.766-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.891-.099-.166-.365-.265-.763-.464z"/></svg>
                  WhatsApp Us
                </a>
                <a href="mailto:admin@delhifiling.com"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-semibold text-[13px] rounded-xl no-underline transition">
                  <Mail size={15} /> admin@delhifiling.com
                </a>
              </div>
            </div>

            {/* Confidentiality note */}
            <div className="bg-[#e8f5e9] border border-[#a5d6a7] rounded-xl px-5 py-4">
              <p className="text-[12px] text-[#1a5c1a] leading-relaxed">
                🔒 <strong>Confidential:</strong> All information is kept strictly private and used only for service delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

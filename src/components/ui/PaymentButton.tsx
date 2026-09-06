'use client'
import { useState } from 'react'
import { IndianRupee, CheckCircle, Loader2, CreditCard } from 'lucide-react'

interface PaymentButtonProps {
  serviceName: string
  amount: number
  phone?: string
}

declare global {
  interface Window { Razorpay: any }
}

export default function PaymentButton({ serviceName, amount, phone }: PaymentButtonProps) {
  const [form, setForm] = useState({ name: '', phone: phone || '', email: '' })
  const [step, setStep] = useState<'form' | 'loading' | 'success' | 'error'>('form')
  const [errorMsg, setErrorMsg] = useState('')

  async function loadRazorpay() {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) { resolve(true); return }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStep('loading')

    const loaded = await loadRazorpay()
    if (!loaded) { setStep('error'); setErrorMsg('Payment gateway failed to load. Please try again.'); return }

    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, serviceName, customerName: form.name, customerPhone: form.phone, customerEmail: form.email }),
      })
      const order = await res.json()
      if (!order.orderId) throw new Error('Order creation failed')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Delhi Filing',
        description: serviceName,
        order_id: order.orderId,
        prefill: { name: form.name, contact: form.phone, email: form.email },
        theme: { color: '#C9A84C' },
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              serviceName,
              customerName: form.name,
              customerPhone: form.phone,
              customerEmail: form.email,
              amount,
            }),
          })
          const result = await verifyRes.json()
          if (result.success) setStep('success')
          else { setStep('error'); setErrorMsg('Payment verification failed. Please contact us.') }
        },
        modal: { ondismiss: () => setStep('form') },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => { setStep('error'); setErrorMsg('Payment failed. Please try again.') })
      rzp.open()
      setStep('form')
    } catch {
      setStep('error')
      setErrorMsg('Something went wrong. Please try again or call us.')
    }
  }

  if (step === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 text-center shadow-lg">
        <CheckCircle size={48} className="text-success mx-auto mb-3" />
        <h3 className="font-heading font-bold text-navy text-xl mb-2">Payment Successful!</h3>
        <p className="text-text-muted text-sm">Our team will contact you within 2 hours to proceed with your service.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
      <div className="bg-navy px-6 py-4">
        <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
          <CreditCard size={18} className="text-gold" /> Pay & Get Started
        </h3>
        <p className="text-gold text-sm mt-1">{serviceName}</p>
      </div>
      <form onSubmit={handlePay} className="p-6 space-y-4">
        <div className="bg-cream rounded-xl p-4 flex items-center justify-between">
          <span className="text-text-muted text-sm">Professional Fee</span>
          <span className="font-heading font-bold text-navy text-xl flex items-center gap-1">
            <IndianRupee size={18} />₹{amount.toLocaleString('en-IN')}
          </span>
        </div>
        <input required placeholder="Your Full Name *" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <input required type="tel" placeholder="Mobile Number *" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <input type="email" placeholder="Email Address" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-navy transition" />
        <button type="submit" disabled={step === 'loading'}
          className="w-full py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-dark transition flex items-center justify-center gap-2">
          {step === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
          {step === 'loading' ? 'Processing...' : `Pay ₹${amount.toLocaleString('en-IN')}`}
        </button>
        {step === 'error' && <p className="text-danger text-xs text-center">{errorMsg}</p>}
        <p className="text-xs text-text-muted text-center">Secured by Razorpay • 256-bit SSL</p>
      </form>
    </div>
  )
}

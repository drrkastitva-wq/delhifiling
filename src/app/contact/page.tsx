import Layout from '@/components/layout/Layout'
import InquiryForm from '@/components/ui/InquiryForm'
import { getSiteSettings } from '@/lib/payload'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = { title: 'Contact Us', description: 'Get in touch with Delhi Filing for free consultation.' }

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null)
  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-white/70">Get free consultation from our legal and compliance experts.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-2xl font-bold text-navy mb-6">Get In Touch</h2>
          <div className="space-y-5 mb-8">
            {[
              { icon: Phone, label: 'Phone', value: settings?.phone || '+91 98765 43210', href: `tel:${settings?.phone}` },
              { icon: Mail, label: 'Email', value: settings?.email || 'info@delhifiling.com', href: `mailto:${settings?.email}` },
              { icon: MapPin, label: 'Address', value: settings?.address || 'New Delhi, India', href: undefined },
              { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM', href: undefined },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-medium">{label}</div>
                  {href
                    ? <a href={href} className="text-navy font-semibold hover:text-gold transition">{value}</a>
                    : <div className="text-navy font-semibold">{value}</div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <InquiryForm />
      </div>
    </Layout>
  )
}

'use client'
import { motion } from 'framer-motion'
import { Shield, Clock, Users, Award, Phone, FileCheck } from 'lucide-react'

const DEFAULT_TRUST = [
  { icon: 'Award',     title: 'Expert Professionals',    description: 'Qualified advocates, CAs and compliance experts with years of domain experience.' },
  { icon: 'Clock',     title: 'Fast Turnaround',         description: 'We understand deadlines. Most services delivered within committed timelines.' },
  { icon: 'Shield',    title: '100% Confidential',       description: 'Your documents and information are handled with complete confidentiality.' },
  { icon: 'FileCheck', title: 'End-to-End Support',      description: 'From documentation to filing to follow-up — we handle everything.' },
  { icon: 'Users',     title: 'Dedicated Account Manager', description: 'A single point of contact for all your legal and compliance needs.' },
  { icon: 'Phone',     title: 'Always Reachable',        description: 'Call, WhatsApp or email — our team responds within 2 hours.' },
]

const ICONS: any = { Shield, Clock, Users, Award, Phone, FileCheck }

export default function TrustSection({ points }: { points?: any[] }) {
  const data = points?.length ? points : DEFAULT_TRUST
  return (
    <section className="py-20 px-4 bg-surface-alt">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="divider-gold mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose Delhi Filing</h2>
          <p className="text-text-muted max-w-xl mx-auto">We are not just a filing portal — we are your legal and compliance partner</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((p, i) => {
            const Icon = ICONS[p.icon] || Shield
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 border border-border card-hover"
              >
                <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{p.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

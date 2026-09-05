'use client'
import { motion } from 'framer-motion'
import { Scale, FileText, Building2, ClipboardCheck } from 'lucide-react'

const DEFAULT_STATS = [
  { value: '500+', label: 'Services Offered', icon: 'Scale' },
  { value: '10,000+', label: 'Cases Filed', icon: 'FileText' },
  { value: '5,000+', label: 'Companies Incorporated', icon: 'Building2' },
  { value: '15+', label: 'Years Experience', icon: 'ClipboardCheck' },
]

const ICONS: any = { Scale, FileText, Building2, ClipboardCheck }

export default function StatsSection({ stats }: { stats?: any[] }) {
  const data = stats?.length ? stats : DEFAULT_STATS
  return (
    <section className="bg-cream border-y border-border py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((s, i) => {
          const Icon = ICONS[s.icon] || Scale
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-gold" />
              </div>
              <div className="font-heading text-3xl font-bold text-navy">{s.value}</div>
              <div className="text-sm text-text-muted mt-1">{s.label}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

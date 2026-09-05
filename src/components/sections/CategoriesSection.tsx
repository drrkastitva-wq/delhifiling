'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Scale, FileText, Building2, ClipboardCheck, ArrowRight } from 'lucide-react'

const DEFAULT_CATEGORIES = [
  { name: 'eCourt Filing', slug: 'ecourt-filing', tagline: 'Litigation • e-Filing • Court Drafting', icon: 'Scale', color: 'blue', description: 'Complete court filing services — civil, criminal, bail, writ, Supreme Court, arbitration and more.' },
  { name: 'eTender & Procurement', slug: 'etender-procurement', tagline: 'Government • Railway • GeM • PSU • Defence', icon: 'FileText', color: 'amber', description: 'End-to-end tender filing support for government, railway, defence, PSU and private tenders.' },
  { name: 'Business Incorporation', slug: 'business-incorporation', tagline: 'Company • LLP • Partnership • Setup', icon: 'Building2', color: 'green', description: 'Register your business — Private Limited, OPC, LLP, Partnership, Proprietorship and more.' },
  { name: 'Annual Compliance', slug: 'annual-compliance', tagline: 'ROC • MCA • GST • Tax • Corporate', icon: 'ClipboardCheck', color: 'purple', description: 'Stay compliant — ROC filings, director compliance, GST returns, board meetings and more.' },
]

const ICONS: any = { Scale, FileText, Building2, ClipboardCheck }
const COLORS: any = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   icon: 'bg-blue-600',   text: 'text-blue-600' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-100',  icon: 'bg-amber-600',  text: 'text-amber-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-100',  icon: 'bg-green-600',  text: 'text-green-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-600', text: 'text-purple-600' },
}

export default function CategoriesSection({ categories }: { categories?: any[] }) {
  const data = categories?.length ? categories : DEFAULT_CATEGORIES
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="divider-gold mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">Our Practice Areas</h2>
          <p className="text-text-muted max-w-2xl mx-auto">Comprehensive legal, corporate and compliance services under one roof</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((cat, i) => {
            const Icon = ICONS[cat.icon] || Scale
            const c = COLORS[cat.color] || COLORS.blue
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/${cat.slug}`} className={`group block rounded-2xl border ${c.border} ${c.bg} p-8 card-hover`}>
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 ${c.icon} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold text-navy mb-1">{cat.name}</h3>
                      <p className={`text-xs font-medium ${c.text} mb-3 tracking-wide`}>{cat.tagline}</p>
                      <p className="text-text-muted text-sm leading-relaxed">{cat.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 mt-5 ${c.text} text-sm font-semibold`}>
                    View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

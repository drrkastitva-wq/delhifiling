'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ArrowRight, Shield, Award, Clock } from 'lucide-react'

export default function HeroSection({ banner, phone }: { banner: any; phone?: string }) {
  const heading = banner?.heading || 'Professional Legal & Compliance Services'
  const subheading = banner?.subheading || 'eCourt Filing • eTender & Procurement • Business Incorporation • Annual Compliance'
  const ctaPrimary = banner?.ctaPrimaryText || 'Get Free Consultation'
  const ctaPrimaryLink = banner?.ctaPrimaryLink || '/contact'
  const ctaSecondary = banner?.ctaSecondaryText || 'Explore Services'
  const ctaSecondaryLink = banner?.ctaSecondaryLink || '/#services'

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <Shield size={14} className="text-gold" />
              <span className="text-gold text-xs font-medium tracking-wide">Trusted Legal & Compliance Partner</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {heading.split('&').map((part: string, i: number, arr: string[]) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-gold-gradient">&</span>}
                </span>
              ))}
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">{subheading}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href={ctaPrimaryLink} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-dark transition text-base">
                {ctaPrimary} <ArrowRight size={18} />
              </Link>
              <Link href={ctaSecondaryLink} className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:border-gold hover:text-gold transition text-base">
                {ctaSecondary}
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2"><Award size={16} className="text-gold" />Expert Professionals</div>
              <div className="flex items-center gap-2"><Clock size={16} className="text-gold" />Fast Turnaround</div>
              <div className="flex items-center gap-2"><Shield size={16} className="text-gold" />100% Confidential</div>
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-gold transition">
                  <Phone size={16} className="text-gold" />{phone}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    heading: 'Professional Legal & Compliance Services',
    subheading: 'Expert-led, end-to-end services for businesses, advocates and individuals across India.',
    ctaPrimaryText: 'Get Free Consultation',
    ctaPrimaryLink: '/contact',
    ctaSecondaryText: 'Explore Services',
    ctaSecondaryLink: '/#services',
    backgroundImage: null,
  },
  {
    id: 'default-2',
    heading: 'eCourt Filing & Legal Drafting',
    subheading: 'Civil, criminal, bail, writ, High Court, Supreme Court — we handle it all.',
    ctaPrimaryText: 'View Services',
    ctaPrimaryLink: '/ecourt-filing',
    ctaSecondaryText: null,
    ctaSecondaryLink: null,
    backgroundImage: null,
  },
  {
    id: 'default-3',
    heading: 'Business Incorporation & Annual Compliance',
    subheading: 'Register your company, LLP or NGO — and stay compliant year after year.',
    ctaPrimaryText: 'Start Today',
    ctaPrimaryLink: '/business-incorporation',
    ctaSecondaryText: null,
    ctaSecondaryLink: null,
    backgroundImage: null,
  },
]

export default function HeroSection({ banners }: { banners: any[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const slides = banners?.length ? banners : DEFAULT_SLIDES
  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length])
  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1))

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [paused, next, slides.length])

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 420 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      {slide.backgroundImage?.url ? (
        <Image src={slide.backgroundImage.url} alt={slide.backgroundImage.alt || ''} fill className="object-cover" priority />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0F1C3F] to-[#1a2f5e]" />
      )}

      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #C9A84C 40px, #C9A84C 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #C9A84C 40px, #C9A84C 41px)`
      }} />

      {/* Gold left accent bar — MCA style */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />

      <div className="relative max-w-7xl mx-auto px-8 py-16 md:py-24 flex items-center min-h-[420px]">
        <div className="max-w-2xl">
          {/* Breadcrumb-style label */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Delhi Filing</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {slide.heading}
          </h1>

          {slide.subheading && (
            <p className="text-white/65 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              {slide.subheading}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {slide.ctaPrimaryText && (
              <Link href={slide.ctaPrimaryLink || '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded text-sm hover:bg-gold-dark transition">
                {slide.ctaPrimaryText} <ArrowRight size={16} />
              </Link>
            )}
            {slide.ctaSecondaryText && (
              <Link href={slide.ctaSecondaryLink || '/#services'}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded text-sm hover:border-gold hover:text-gold transition">
                {slide.ctaSecondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 border border-white/20 rounded flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition z-10">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 border border-white/20 rounded flex items-center justify-center text-white hover:bg-gold hover:text-navy hover:border-gold transition z-10">
            <ChevronRight size={18} />
          </button>
          {/* Bottom indicator bar — MCA style */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`flex-1 h-1 transition-all ${i === current ? 'bg-gold' : 'bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

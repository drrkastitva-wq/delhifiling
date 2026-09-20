'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_SLIDES = [
  {
    id: 'd1',
    heading: 'Professional Legal & Compliance Services',
    subheading: 'Expert-led, end-to-end services for businesses, advocates and individuals across India.',
    ctaPrimaryText: 'Get Free Consultation', ctaPrimaryLink: '/contact',
    ctaSecondaryText: 'Explore Services', ctaSecondaryLink: '/ecourt-filing',
    backgroundImage: null,
  },
  {
    id: 'd2',
    heading: 'eCourt Filing & Legal Drafting',
    subheading: 'Civil, criminal, bail, writ, High Court, Supreme Court — we handle it all.',
    ctaPrimaryText: 'View Services', ctaPrimaryLink: '/ecourt-filing',
    ctaSecondaryText: null, ctaSecondaryLink: null, backgroundImage: null,
  },
  {
    id: 'd3',
    heading: 'Business Incorporation & Annual Compliance',
    subheading: 'Register your company, LLP or NGO — and stay compliant year after year.',
    ctaPrimaryText: 'Start Today', ctaPrimaryLink: '/business-incorporation',
    ctaSecondaryText: null, ctaSecondaryLink: null, backgroundImage: null,
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
  const hasImage = !!slide.backgroundImage?.url

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {hasImage ? (
        /* ── Image slide: full image, no crop, natural height ── */
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.backgroundImage.url}
            alt={slide.heading || ''}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '90vh', objectFit: 'contain', background: '#000' }}
          />
          {/* Prev/Next over image */}
          {slides.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white z-10 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white z-10 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === current ? '#FF6600' : 'rgba(255,255,255,0.5)' }} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        /* ── Text slide: navy gradient with content ── */
        <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #002244 0%, #003366 60%, #004080 100%)' }} />
          <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: '#FF6600' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-8 py-14 md:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[#FF6600]/40 rounded-sm"
                style={{ background: 'rgba(255,102,0,0.1)' }}>
                <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                <span className="text-[#FFD700] text-[11px] font-semibold uppercase tracking-widest">Delhi Filing</span>
              </div>
              <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug mb-4">
                {slide.heading}
              </h1>
              {slide.subheading && (
                <p className="text-white/65 text-[14px] md:text-[15px] mb-7 leading-relaxed max-w-xl">
                  {slide.subheading}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                {slide.ctaPrimaryText && (
                  <Link href={slide.ctaPrimaryLink || '/contact'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-[13px] text-white rounded-sm no-underline bg-[#FF6600] hover:bg-[#e65c00] transition">
                    {slide.ctaPrimaryText}
                  </Link>
                )}
                {slide.ctaSecondaryText && (
                  <Link href={slide.ctaSecondaryLink || '/'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-[13px] text-white rounded-sm no-underline border border-white/30 hover:border-[#FF6600] transition">
                    {slide.ctaSecondaryText}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white z-10 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white z-10 rounded-sm"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === current ? '#FF6600' : 'rgba(255,255,255,0.4)' }} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}

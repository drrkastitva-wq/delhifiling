'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_SLIDES = [
  {
    id: 'd1', heading: 'Professional Legal & Compliance Services',
    subheading: 'Expert-led, end-to-end services for businesses, advocates and individuals across India.',
    ctaPrimaryText: 'Get Free Consultation', ctaPrimaryLink: '/contact',
    ctaSecondaryText: 'Explore Services', ctaSecondaryLink: '/#services', backgroundImage: null,
  },
  {
    id: 'd2', heading: 'eCourt Filing & Legal Drafting',
    subheading: 'Civil, criminal, bail, writ, High Court, Supreme Court — we handle it all.',
    ctaPrimaryText: 'View Services', ctaPrimaryLink: '/ecourt-filing',
    ctaSecondaryText: null, ctaSecondaryLink: null, backgroundImage: null,
  },
  {
    id: 'd3', heading: 'Business Incorporation & Annual Compliance',
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

  return (
    <section className="relative overflow-hidden min-h-[400px] flex items-center"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {slide.backgroundImage?.url
        ? <Image src={slide.backgroundImage.url} alt="" fill className="object-cover" priority />
        : <div className="absolute inset-0 bg-gradient-to-br from-[#060f22] via-[#0F1C3F] to-[#0f2a1a]" />
      }

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 39px,#16a34a 39px,#16a34a 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#16a34a 39px,#16a34a 40px)`
      }} />

      {/* Green left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#16a34a]" />

      <div className="relative w-full max-w-7xl mx-auto px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="h-px w-10 bg-[#16a34a]" />
            <span className="text-[#22c55e] text-xs font-bold tracking-widest uppercase">Delhi Filing</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
            {slide.heading}
          </h1>
          {slide.subheading && (
            <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed max-w-xl">{slide.subheading}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {slide.ctaPrimaryText && (
              <Link href={slide.ctaPrimaryLink || '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white font-semibold rounded-lg text-sm hover:bg-[#15803d] transition shadow-lg">
                {slide.ctaPrimaryText} <ArrowRight size={15} />
              </Link>
            )}
            {slide.ctaSecondaryText && (
              <Link href={slide.ctaSecondaryLink || '/'}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-medium rounded-lg text-sm hover:border-[#16a34a] hover:text-[#22c55e] transition">
                {slide.ctaSecondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 border border-white/15 rounded-lg flex items-center justify-center text-white hover:bg-[#16a34a] hover:border-[#16a34a] transition z-10">
            <ChevronLeft size={17} />
          </button>
          <button onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 border border-white/15 rounded-lg flex items-center justify-center text-white hover:bg-[#16a34a] hover:border-[#16a34a] transition z-10">
            <ChevronRight size={17} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 flex h-1">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`flex-1 transition-all ${i === current ? 'bg-[#16a34a]' : 'bg-white/15 hover:bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

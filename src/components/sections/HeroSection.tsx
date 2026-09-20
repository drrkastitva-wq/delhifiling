'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Banner {
  id: string
  heading: string
  subheading?: string
  ctaPrimaryText?: string
  ctaPrimaryLink?: string
  ctaSecondaryText?: string
  ctaSecondaryLink?: string
  backgroundImage?: { url: string; alt?: string }
}

export default function HeroSection({ banners }: { banners: any[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const slides = banners?.length ? banners : [{
    id: 'default',
    heading: 'Professional Legal & Compliance Services',
    subheading: 'Expert-led, end-to-end services for businesses, advocates and individuals.',
    ctaPrimaryText: 'Get Free Consultation',
    ctaPrimaryLink: '/contact',
    ctaSecondaryText: 'Explore Services',
    ctaSecondaryLink: '/#services',
  }]

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length])
  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1))

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next, slides.length])

  const slide = slides[current]

  return (
    <section
      className="relative bg-navy overflow-hidden min-h-[520px] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      {slide.backgroundImage?.url && (
        <Image
          src={slide.backgroundImage.url}
          alt={slide.backgroundImage.alt || ''}
          fill
          className="object-cover opacity-20"
          priority
        />
      )}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-500">
            {slide.heading}
          </h1>
          {slide.subheading && (
            <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed">{slide.subheading}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            {slide.ctaPrimaryText && (
              <Link
                href={slide.ctaPrimaryLink || '/contact'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold-dark transition text-base"
              >
                {slide.ctaPrimaryText} <ArrowRight size={18} />
              </Link>
            )}
            {slide.ctaSecondaryText && (
              <Link
                href={slide.ctaSecondaryLink || '/#services'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:border-gold hover:text-gold transition text-base"
              >
                {slide.ctaSecondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slider controls — only show if multiple banners */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition z-10"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-gold' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

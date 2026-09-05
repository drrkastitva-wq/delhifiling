'use client'
import { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0)
  if (!testimonials?.length) return null
  const prev = () => setCurrent(i => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === testimonials.length - 1 ? 0 : i + 1))
  const t = testimonials[current]
  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="divider-gold mx-auto mb-4" />
        <h2 className="font-heading text-3xl font-bold text-white mb-12">What Our Clients Say</h2>
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
          <Quote size={40} className="text-gold/30 absolute top-6 left-6" />
          <div className="flex justify-center mb-4">
            {[...Array(t.rating || 5)].map((_, i) => (
              <Star key={i} size={18} className="text-gold fill-gold" />
            ))}
          </div>
          <p className="text-white/80 text-lg italic mb-6 leading-relaxed">"{t.content}"</p>
          <div>
            <div className="font-semibold text-white">{t.name}</div>
            {t.designation && <div className="text-gold text-sm">{t.designation}{t.company ? `, ${t.company}` : ''}</div>}
          </div>
        </div>
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-gold' : 'bg-white/30'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

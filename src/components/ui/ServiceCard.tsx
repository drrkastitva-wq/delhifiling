import Link from 'next/link'
import { ArrowRight, Clock, IndianRupee } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  name: string
  slug: string
  shortDescription?: string
  timeline?: string
  professionalFee?: string
  href: string
  className?: string
}

export default function ServiceCard({ name, shortDescription, timeline, professionalFee, href, className }: ServiceCardProps) {
  return (
    <Link href={href} className={cn('group block bg-white rounded-xl border border-border p-5 card-hover', className)}>
      <h3 className="font-semibold text-navy text-base mb-2 group-hover:text-gold transition">{name}</h3>
      {shortDescription && <p className="text-text-muted text-sm mb-4 line-clamp-2">{shortDescription}</p>}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          {timeline && <span className="flex items-center gap-1"><Clock size={12} />{timeline}</span>}
          {professionalFee && <span className="flex items-center gap-1"><IndianRupee size={12} />{professionalFee}</span>}
        </div>
        <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

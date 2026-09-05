import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Crumb { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-text-muted flex-wrap">
      <Link href="/" className="hover:text-navy transition flex items-center gap-1">
        <Home size={14} />Home
      </Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-border" />
          {c.href
            ? <Link href={c.href} className="hover:text-navy transition">{c.label}</Link>
            : <span className="text-navy font-medium">{c.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}

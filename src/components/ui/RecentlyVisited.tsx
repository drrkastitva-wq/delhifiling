'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, X } from 'lucide-react'

export interface VisitedService {
  label: string
  href: string
  visitedAt: number
}

export function trackVisit(label: string, href: string) {
  try {
    const raw = localStorage.getItem('df_visited')
    const existing: VisitedService[] = raw ? JSON.parse(raw) : []
    const filtered = existing.filter(v => v.href !== href)
    const updated = [{ label, href, visitedAt: Date.now() }, ...filtered].slice(0, 6)
    localStorage.setItem('df_visited', JSON.stringify(updated))
  } catch {}
}

export default function RecentlyVisited() {
  const [visited, setVisited] = useState<VisitedService[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('df_visited')
      if (raw) setVisited(JSON.parse(raw))
    } catch {}
  }, [])

  function remove(href: string) {
    const updated = visited.filter(v => v.href !== href)
    setVisited(updated)
    localStorage.setItem('df_visited', JSON.stringify(updated))
  }

  if (!visited.length) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-navy px-5 py-3 flex items-center justify-between">
        <h2 className="text-white font-semibold text-sm tracking-wide flex items-center gap-2">
          <Clock size={14} className="text-[#22c55e]" /> Recently Visited
        </h2>
        <button onClick={() => { setVisited([]); localStorage.removeItem('df_visited') }}
          className="text-white/40 hover:text-white text-xs transition">Clear</button>
      </div>
      <div className="divide-y divide-gray-100">
        {visited.map(v => (
          <div key={v.href} className="flex items-center justify-between px-5 py-3 hover:bg-green-50 transition group">
            <Link href={v.href} className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full shrink-0" />
              <span className="text-sm text-navy font-medium group-hover:text-[#16a34a] transition truncate">{v.label}</span>
            </Link>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <ArrowRight size={12} className="text-[#16a34a] opacity-0 group-hover:opacity-100 transition" />
              <button onClick={() => remove(v.href)} className="text-gray-300 hover:text-gray-500 transition">
                <X size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'
import { useState, useTransition, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, Clock, IndianRupee, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce'

interface Service {
  id: string
  name: string
  slug: string
  shortDescription?: string
  timeline?: string
  professionalFee?: string
}

interface Props {
  initialQuery: string
  initialResults: Service[]
  categoryMap: Record<string, { categorySlug: string; subcategorySlug: string }>
}

export default function SearchResults({ initialQuery, initialResults, categoryMap }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Service[]>(initialResults)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const doSearch = useDebouncedCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, 300)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    doSearch(val)
    startTransition(() => {
      router.replace(`/search?q=${encodeURIComponent(val)}`, { scroll: false })
    })
  }

  const getHref = (svc: Service) => {
    const loc = categoryMap[svc.id]
    if (!loc) return '/contact'
    return `/${loc.categorySlug}/${loc.subcategorySlug}/${svc.slug}`
  }

  return (
    <div className="w-full">
      <div className="relative mb-8">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="e.g. bail application, GST registration, company incorporation..."
          autoFocus
          className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold text-base"
        />
        {(loading || isPending) && (
          <Loader2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold animate-spin" />
        )}
      </div>

      {query.length >= 2 && (
        <div className="text-left">
          {results.length > 0 ? (
            <>
              <p className="text-white/50 text-sm mb-4">{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {results.map((svc) => (
                  <Link key={svc.id} href={getHref(svc)}
                    className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:border-gold/40 hover:bg-white/10 transition text-left">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white text-sm group-hover:text-gold transition">{svc.name}</h3>
                      <ArrowRight size={14} className="text-gold shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {svc.shortDescription && (
                      <p className="text-white/50 text-xs mt-1 line-clamp-2">{svc.shortDescription}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                      {svc.timeline && <span className="flex items-center gap-1"><Clock size={11} />{svc.timeline}</span>}
                      {svc.professionalFee && <span className="flex items-center gap-1"><IndianRupee size={11} />{svc.professionalFee}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : !loading ? (
            <div className="text-center py-8">
              <p className="text-white/50 mb-4">No services found for "{query}"</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy font-semibold rounded-lg text-sm hover:bg-gold-dark transition">
                Ask Our Experts
              </Link>
            </div>
          ) : null}
        </div>
      )}

      {!query && (
        <p className="text-white/40 text-sm">Start typing to search services...</p>
      )}
    </div>
  )
}

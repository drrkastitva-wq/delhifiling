import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { getSiteSettings, getPayloadClient } from '@/lib/payload'
import SearchResults from './SearchResults'

export const metadata: Metadata = {
  title: 'Search Services',
  description: 'Search across 500+ legal, corporate and compliance services offered by Delhi Filing.',
}

async function searchServices(q: string) {
  if (!q || q.length < 2) return []
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      where: {
        and: [
          { active: { equals: true } },
          {
            or: [
              { name: { like: q } },
              { shortDescription: { like: q } },
            ],
          },
        ],
      },
      limit: 30,
      depth: 0,
    })
    return docs
  } catch {
    return []
  }
}

async function getServiceCategoryMap() {
  try {
    const payload = await getPayloadClient()
    const { docs: mappings } = await payload.find({
      collection: 'service-mappings',
      limit: 2000,
      depth: 2,
    })
    const map: Record<string, { categorySlug: string; subcategorySlug: string }> = {}
    for (const m of mappings as any[]) {
      if (!m.service?.id || !m.subcategory?.slug || !m.subcategory?.category?.slug) continue
      if (!map[m.service.id]) {
        map[m.service.id] = {
          categorySlug: m.subcategory.category.slug,
          subcategorySlug: m.subcategory.slug,
        }
      }
    }
    return map
  } catch {
    return {}
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: rawQ } = await searchParams
  const q = rawQ?.trim() || ''
  const [settings, results, categoryMap] = await Promise.all([
    getSiteSettings().catch(() => null),
    searchServices(q),
    getServiceCategoryMap(),
  ])

  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Search Services</h1>
          <p className="text-white/60 mb-8">Find from 500+ legal, corporate and compliance services</p>
          <SearchResults initialQuery={q} initialResults={results as any[]} categoryMap={categoryMap} />
        </div>
      </section>
    </Layout>
  )
}

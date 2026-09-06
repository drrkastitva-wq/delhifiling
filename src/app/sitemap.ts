import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://delhifiling.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  try {
    const payload = await getPayloadClient()

    const { docs: categories } = await payload.find({ collection: 'categories', where: { active: { equals: true } }, limit: 20 })
    const { docs: subcategories } = await payload.find({ collection: 'subcategories', where: { active: { equals: true } }, limit: 200, depth: 1 })
    const { docs: services } = await payload.find({ collection: 'services', where: { active: { equals: true } }, limit: 1000 })
    const { docs: posts } = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, limit: 500 })

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat: any) => ({
      url: `${base}/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    const subcategoryRoutes: MetadataRoute.Sitemap = subcategories.map((sub: any) => {
      const catSlug = sub.category?.slug || ''
      return {
        url: `${base}/${catSlug}/${sub.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

    // For service routes we need category+subcategory slug — use service-mappings
    const { docs: mappings } = await payload.find({
      collection: 'service-mappings',
      limit: 2000,
      depth: 2,
    })

    const serviceRoutes: MetadataRoute.Sitemap = []
    const seen = new Set<string>()
    for (const m of mappings as any[]) {
      const svc = m.service
      const sub = m.subcategory
      if (!svc?.slug || !sub?.slug || !sub?.category?.slug) continue
      const url = `${base}/${sub.category.slug}/${sub.slug}/${svc.slug}`
      if (!seen.has(url)) {
        seen.add(url)
        serviceRoutes.push({ url, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })
      }
    }

    const blogRoutes: MetadataRoute.Sitemap = (posts as any[]).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || now),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...serviceRoutes, ...blogRoutes]
  } catch {
    return staticRoutes
  }
}

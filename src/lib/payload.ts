import { getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

export async function getCategories() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 10,
  })
  return docs
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug }, active: { equals: true } },
    limit: 1,
  })
  return docs[0] || null
}

export async function getSubcategoriesByCategory(categoryId: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'subcategories',
    where: { category: { equals: categoryId }, active: { equals: true } },
    sort: 'order',
    limit: 100,
  })
  return docs
}

export async function getSubcategoryBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'subcategories',
    where: { slug: { equals: slug }, active: { equals: true } },
    limit: 1,
  })
  return docs[0] || null
}

export async function getServicesBySubcategory(subcategoryId: string) {
  const payload = await getPayloadClient()
  const { docs: mappings } = await payload.find({
    collection: 'service-mappings',
    where: { subcategory: { equals: subcategoryId } },
    sort: 'order',
    limit: 200,
    depth: 2,
  })
  return mappings.map((m: any) => m.service).filter(Boolean)
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, active: { equals: true } },
    limit: 1,
  })
  return docs[0] || null
}

export async function getHeroBanners() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'hero-banners',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 5,
  })
  return docs
}

export async function getTestimonials() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 20,
  })
  return docs
}

export async function getTrustPoints() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'trust-points',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 10,
  })
  return docs
}

export async function getStats() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'stats',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 10,
  })
  return docs
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

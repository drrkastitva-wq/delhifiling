import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ServiceCard from '@/components/ui/ServiceCard'
import InquiryForm from '@/components/ui/InquiryForm'
import type { Metadata } from 'next'
import { getCategoryBySlug, getSubcategoryBySlug, getServicesBySubcategory, getSiteSettings, getCategories, getSubcategoriesByCategory } from '@/lib/payload'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => [])
  const params: { category: string; subcategory: string }[] = []
  for (const cat of categories as any[]) {
    const subs = await getSubcategoriesByCategory(String(cat.id)).catch(() => [])
    for (const sub of subs as any[]) {
      params.push({ category: cat.slug, subcategory: sub.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string }> }): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params
  const [cat, sub] = await Promise.all([
    getCategoryBySlug(categorySlug).catch(() => null),
    getSubcategoryBySlug(subcategorySlug).catch(() => null),
  ])
  if (!sub) return {}
  return {
    title: `${sub.name} | ${cat?.name || ''}`,
    description: sub.description || `${sub.name} services — Delhi Filing`,
    openGraph: { title: sub.name, description: sub.description || '' },
  }
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string; subcategory: string }> }) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params
  const [category, subcategory, settings] = await Promise.all([
    getCategoryBySlug(categorySlug).catch(() => null),
    getSubcategoryBySlug(subcategorySlug).catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  if (!category || !subcategory) notFound()
  const services = await getServicesBySubcategory(String(subcategory.id)).catch(() => [])

  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[
            { label: category.name, href: `/${categorySlug}` },
            { label: subcategory.name },
          ]} />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-2">{subcategory.name}</h1>
          {subcategory.description && <p className="text-white/70 mt-2 max-w-2xl">{subcategory.description}</p>}
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-bold text-navy mb-6">
            {services.length} Service{services.length !== 1 ? 's' : ''} Available
          </h2>
          {services.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((svc: any) => (
                <ServiceCard
                  key={svc.id}
                  name={svc.name}
                  slug={svc.slug}
                  shortDescription={svc.shortDescription}
                  timeline={svc.timeline}
                  professionalFee={svc.professionalFee}
                  href={`/${categorySlug}/${subcategorySlug}/${svc.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">Services coming soon.</p>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <InquiryForm category={category.name} serviceName={subcategory.name} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

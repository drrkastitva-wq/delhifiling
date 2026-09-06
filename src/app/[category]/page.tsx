import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import InquiryForm from '@/components/ui/InquiryForm'
import { getCategoryBySlug, getSubcategoriesByCategory, getSiteSettings, getCategories } from '@/lib/payload'

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => [])
  return categories.map((cat: any) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.category).catch(() => null)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.description || cat.tagline || `${cat.name} services — Delhi Filing`,
    openGraph: { title: cat.name, description: cat.description || cat.tagline || '' },
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const [category, settings] = await Promise.all([
    getCategoryBySlug(params.category).catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  if (!category) notFound()
  const subcategories = await getSubcategoriesByCategory(String(category.id)).catch(() => [])

  return (
    <Layout settings={settings}>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[{ label: category.name }]} />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-2">{category.name}</h1>
          {category.tagline && <p className="text-gold text-sm tracking-wide">{category.tagline}</p>}
          {category.description && <p className="text-white/70 mt-3 max-w-2xl">{category.description}</p>}
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-bold text-navy mb-6">Select a Service Category</h2>
          {subcategories.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {subcategories.map((sub: any) => (
                <Link key={sub.id} href={`/${params.category}/${sub.slug}`}
                  className="group flex items-center justify-between bg-white border border-border rounded-xl p-5 card-hover">
                  <div>
                    <h3 className="font-semibold text-navy text-sm group-hover:text-gold transition">{sub.name}</h3>
                    {sub.description && <p className="text-text-muted text-xs mt-1 line-clamp-2">{sub.description}</p>}
                  </div>
                  <ArrowRight size={16} className="text-gold shrink-0 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">Services coming soon.</p>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <InquiryForm category={category.name} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

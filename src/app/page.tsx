import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import InquiryForm from '@/components/ui/InquiryForm'
import { getHeroBanners, getCategories, getSiteSettings } from '@/lib/payload'

export const revalidate = 3600

export default async function HomePage() {
  const [banners, categories, settings] = await Promise.all([
    getHeroBanners().catch(() => []),
    getCategories().catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  return (
    <Layout settings={settings}>
      <HeroSection banners={banners} />
      <CategoriesSection categories={categories} />

      {/* CTA Banner */}
      <section className="bg-gold py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy">Need Legal or Compliance Help?</h2>
            <p className="text-navy/70 mt-2">Talk to our experts today — free consultation, no obligation.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={`tel:${settings?.phone || '9911991330'}`} className="px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition">
              Call Now
            </a>
            <a href="/contact" className="px-6 py-3 bg-white text-navy font-semibold rounded-xl hover:bg-cream transition">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="divider-gold mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-navy mb-3">Get Free Consultation</h2>
          <p className="text-text-muted">Fill in your details and our team will reach out within 2 hours.</p>
        </div>
        <div className="max-w-lg mx-auto">
          <InquiryForm />
        </div>
      </section>
    </Layout>
  )
}

import { notFound } from 'next/navigation'
import { Clock, CheckCircle, Shield, Award } from 'lucide-react'
import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQAccordion from '@/components/ui/FAQAccordion'
import InquiryForm from '@/components/ui/InquiryForm'
import { getCategoryBySlug, getSubcategoryBySlug, getServiceBySlug, getSiteSettings } from '@/lib/payload'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string; service: string }> }): Promise<Metadata> {
  const { category, subcategory, service } = await params
  const svc = await getServiceBySlug(service).catch(() => null)
  return {
    title: svc?.metaTitle || svc?.name || 'Service',
    description: svc?.metaDescription || svc?.shortDescription || '',
  }
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; subcategory: string; service: string }> }) {
  const { category: categorySlug, subcategory: subcategorySlug, service: serviceSlug } = await params
  const [category, subcategory, service, settings] = await Promise.all([
    getCategoryBySlug(categorySlug).catch(() => null),
    getSubcategoryBySlug(subcategorySlug).catch(() => null),
    getServiceBySlug(serviceSlug).catch(() => null),
    getSiteSettings().catch(() => null),
  ])
  if (!category || !subcategory || !service) notFound()

  return (
    <Layout settings={settings}>
      {/* Hero */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[
            { label: category.name, href: `/${categorySlug}` },
            { label: subcategory.name, href: `/${categorySlug}/${subcategorySlug}` },
            { label: service.name },
          ]} />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-3">{service.name}</h1>
          <p className="text-white/70 max-w-2xl">{service.shortDescription}</p>
          <div className="flex flex-wrap gap-4 mt-5">
            {service.timeline && (
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm text-white">
                <Clock size={15} className="text-gold" />{service.timeline}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left — service details */}
        <div className="lg:col-span-2 space-y-10">

          {/* Who needs it */}
          {service.whoNeedsIt && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy mb-3">Who Needs This Service</h2>
              <div className="bg-cream rounded-xl p-5 border border-border text-text-muted text-sm leading-relaxed">
                {service.whoNeedsIt}
              </div>
            </div>
          )}

          {/* Documents required */}
          {service.documentsRequired?.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy mb-3">Documents Required</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {service.documentsRequired.map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-border rounded-lg px-4 py-3 text-sm text-text">
                    <CheckCircle size={15} className="text-success shrink-0" />{d.document}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          {service.process?.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy mb-4">Our Process</h2>
              <div className="space-y-4">
                {service.process.map((step: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-sm shrink-0">
                      {step.step || i + 1}
                    </div>
                    <div className="flex-1 pb-4 border-b border-border last:border-0">
                      <h3 className="font-semibold text-navy text-sm mb-1">{step.title}</h3>
                      <p className="text-text-muted text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Shield, label: '100% Confidential' },
              { icon: Award, label: 'Expert Handled' },
              { icon: Clock, label: 'On-Time Delivery' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-cream rounded-xl p-4 border border-border text-center">
                <Icon size={22} className="text-gold" />
                <span className="text-xs font-medium text-navy">{label}</span>
              </div>
            ))}
          </div>

          {/* FAQs */}
          {service.faqs?.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
              <FAQAccordion faqs={service.faqs} />
            </div>
          )}
        </div>

        {/* Right — sticky inquiry form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <InquiryForm serviceName={service.name} category={category.name} />
            <div className="bg-navy rounded-xl p-5 text-center">
              <p className="text-white/70 text-xs mb-3">Prefer to talk directly?</p>
              <a href={`tel:${settings?.phone || '9911991330'}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-navy font-semibold rounded-lg text-sm hover:bg-gold-dark transition">
                Call Us Now
              </a>
              {settings?.whatsapp && (
                <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-white/20 text-white font-medium rounded-lg text-sm hover:border-gold hover:text-gold transition">
                  WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Shield, Award, Phone, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQAccordion from '@/components/ui/FAQAccordion'
import TrackVisit from '@/components/ui/TrackVisit'
import InquiryForm from '@/components/ui/InquiryForm'
import { getCategoryBySlug, getSubcategoryBySlug, getServiceBySlug, getSiteSettings } from '@/lib/payload'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string; service: string }> }): Promise<Metadata> {
  const { service } = await params
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

  const phone = settings?.phone || '+91 99119 91330'

  return (
    <Layout settings={settings}>
      <TrackVisit label={service.name} href={`/${categorySlug}/${subcategorySlug}/${serviceSlug}`} />
      {/* Hero */}
      <section className="bg-navy py-12 px-4 border-b-4 border-[#16a34a]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb crumbs={[
            { label: category.name, href: `/${categorySlug}` },
            { label: subcategory.name, href: `/${categorySlug}/${subcategorySlug}` },
            { label: service.name },
          ]} />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-3">{service.name}</h1>
          <p className="text-white/65 max-w-2xl text-sm leading-relaxed">{service.shortDescription}</p>
          {service.timeline && (
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm text-white mt-4">
              <Clock size={14} className="text-[#22c55e]" />{service.timeline}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">

          {service.whoNeedsIt && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#16a34a] rounded-full inline-block" />
                Who Needs This Service
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{service.whoNeedsIt}</p>
            </div>
          )}

          {service.documentsRequired?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#16a34a] rounded-full inline-block" />
                Documents Required
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {service.documentsRequired.map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-navy">
                    <CheckCircle size={14} className="text-[#16a34a] shrink-0" />{d.document}
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.process?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#16a34a] rounded-full inline-block" />
                Our Process
              </h2>
              <div className="space-y-4">
                {service.process.map((step: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                      {step.step || i + 1}
                    </div>
                    <div className={`flex-1 pb-4 ${i < service.process.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <h3 className="font-semibold text-navy text-sm mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
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
              { icon: Award,  label: 'Expert Handled' },
              { icon: Clock,  label: 'On-Time Delivery' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                  <Icon size={18} className="text-[#22c55e]" />
                </div>
                <span className="text-xs font-semibold text-navy">{label}</span>
              </div>
            ))}
          </div>

          {service.faqs?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#16a34a] rounded-full inline-block" />
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={service.faqs} />
            </div>
          )}
        </div>

        {/* Right — sticky CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">

            <InquiryForm serviceName={service.name} category={category.name} />

            {/* Call box */}
            <div className="bg-white border border-[#cccccc]">
              <div className="section-header">Speak to an Expert</div>
              <div className="p-4 text-center">
                <p className="text-[12px] text-[#555] mb-3">Mon–Sat, 9 AM to 7 PM</p>
                <a href={`tel:${phone}`}
                  className="block w-full py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-[13px] no-underline transition">
                  {phone}
                </a>
                {settings?.whatsapp && (
                  <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="block w-full py-2.5 mt-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[13px] no-underline transition">
                    WhatsApp Us
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import InquiryForm from '@/components/ui/InquiryForm'
import Link from 'next/link'
import { getHeroBanners, getCategories, getSiteSettings, getBlogPosts } from '@/lib/payload'
import { Scale, FileText, Building2, ClipboardCheck, ArrowRight, Phone, Clock, Shield, Award } from 'lucide-react'

export const revalidate = 3600

const QUICK_LINKS = [
  { label: 'eCourt Filing', sub: 'Civil • Criminal • HC • SC', href: '/ecourt-filing', icon: Scale, color: 'bg-[#1a3a6b]' },
  { label: 'eTender & Procurement', sub: 'Govt • Railway • GeM • PSU', href: '/etender-procurement', icon: FileText, color: 'bg-[#8B1A1A]' },
  { label: 'Business Incorporation', sub: 'Pvt Ltd • LLP • OPC • NGO', href: '/business-incorporation', icon: Building2, color: 'bg-[#1a5c2a]' },
  { label: 'Annual Compliance', sub: 'ROC • GST • Tax • MCA', href: '/annual-compliance', icon: ClipboardCheck, color: 'bg-[#5c3a1a]' },
]

const SERVICE_HIGHLIGHTS = [
  { label: 'Bail Application', href: '/ecourt-filing/bail-applications' },
  { label: 'Private Limited Company', href: '/business-incorporation/private-limited-company' },
  { label: 'GST Registration', href: '/annual-compliance/gst-returns' },
  { label: 'GeM Registration', href: '/etender-procurement/gem-registration' },
  { label: 'LLP Registration', href: '/business-incorporation/llp-registration' },
  { label: 'ROC Annual Filing', href: '/annual-compliance/roc-annual-filing' },
  { label: 'Writ Petition', href: '/ecourt-filing/high-court-supreme-court' },
  { label: 'Tender Documentation', href: '/etender-procurement/tender-documentation' },
  { label: 'Income Tax Filing', href: '/annual-compliance/income-tax-filing' },
  { label: 'Legal Drafting', href: '/ecourt-filing/legal-drafting' },
  { label: 'Section 8 / NGO', href: '/business-incorporation/section-8-ngo' },
  { label: 'Director Compliance', href: '/annual-compliance/director-compliance' },
]

export default async function HomePage() {
  const [banners, categories, settings, posts] = await Promise.all([
    getHeroBanners().catch(() => []),
    getCategories().catch(() => []),
    getSiteSettings().catch(() => null),
    getBlogPosts({ limit: 6 }).catch(() => []),
  ])

  const phone = settings?.phone || '+91 99119 91330'

  return (
    <Layout settings={settings}>

      {/* Hero slider */}
      <HeroSection banners={banners} />

      {/* Quick Links Band — MCA's signature colored tile row */}
      <div className="bg-[#1a2744] border-b-4 border-gold">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href}
              className={`${q.color} group flex items-center gap-4 px-6 py-5 hover:brightness-110 transition border-r border-white/10 last:border-0`}>
              <div className="w-11 h-11 bg-white/15 rounded flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition">
                <q.icon size={22} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-tight">{q.label}</div>
                <div className="text-white/55 text-[11px] mt-0.5">{q.sub}</div>
              </div>
              <ArrowRight size={14} className="text-white/30 ml-auto group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main content — 2 col: services left, inquiry right */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">

        {/* Left — services + news */}
        <div className="lg:col-span-2 space-y-8">

          {/* Popular Services grid — MCA card style */}
          <div className="bg-white border border-border rounded shadow-sm overflow-hidden">
            <div className="bg-navy px-5 py-3 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm tracking-wide uppercase">Popular Services</h2>
              <Link href="/search" className="text-gold text-xs hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-border">
              {SERVICE_HIGHLIGHTS.map((s) => (
                <Link key={s.href} href={s.href}
                  className="flex items-center gap-2 px-4 py-3.5 text-sm text-text hover:bg-cream hover:text-navy transition group">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* News / Updates ticker — MCA style */}
          {posts.length > 0 && (
            <div className="bg-white border border-border rounded shadow-sm overflow-hidden">
              <div className="bg-navy px-5 py-3 flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm tracking-wide uppercase">Latest Updates</h2>
                <Link href="/blog" className="text-gold text-xs hover:underline">All Posts →</Link>
              </div>
              <div className="divide-y divide-border">
                {posts.map((post: any) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-cream transition group">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy font-medium group-hover:text-gold transition line-clamp-1">{post.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <ArrowRight size={13} className="text-gold shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Why us — 3 trust tiles */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Shield, title: '100% Confidential', desc: 'Your documents handled with complete privacy' },
              { icon: Award, title: 'Expert Team', desc: 'Qualified advocates, CAs & compliance experts' },
              { icon: Clock, title: 'Fast Turnaround', desc: 'Most services delivered within committed timelines' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-border rounded shadow-sm p-4 text-center">
                <div className="w-10 h-10 bg-navy rounded mx-auto mb-3 flex items-center justify-center">
                  <Icon size={18} className="text-gold" />
                </div>
                <div className="text-navy font-semibold text-xs mb-1">{title}</div>
                <div className="text-text-muted text-[11px] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — sticky inquiry + call */}
        <div className="space-y-5">
          <InquiryForm />

          {/* Call CTA box */}
          <div className="bg-navy rounded shadow-sm p-5 text-center">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone size={18} className="text-gold" />
            </div>
            <p className="text-white font-semibold text-sm mb-1">Speak to an Expert</p>
            <p className="text-white/50 text-xs mb-4">Mon–Sat, 9AM to 7PM</p>
            <a href={`tel:${phone}`}
              className="block w-full py-2.5 bg-gold text-navy font-bold rounded text-sm hover:bg-gold-dark transition tracking-wide">
              {phone}
            </a>
          </div>

          {/* Quick category links */}
          <div className="bg-white border border-border rounded shadow-sm overflow-hidden">
            <div className="bg-navy px-4 py-2.5">
              <p className="text-white text-xs font-semibold uppercase tracking-wide">Browse by Category</p>
            </div>
            {QUICK_LINKS.map(q => (
              <Link key={q.href} href={q.href}
                className="flex items-center justify-between px-4 py-3 text-sm text-text hover:bg-cream hover:text-navy border-b border-border last:border-0 transition group">
                <span className="flex items-center gap-2">
                  <q.icon size={14} className="text-gold" />{q.label}
                </span>
                <ArrowRight size={12} className="text-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width CTA strip */}
      <div className="bg-gold">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading text-navy font-bold text-xl">Need Legal or Compliance Help?</p>
            <p className="text-navy/70 text-sm mt-0.5">Free consultation — no obligation. Our experts respond within 2 hours.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={`tel:${phone}`} className="px-5 py-2.5 bg-navy text-white font-semibold rounded text-sm hover:bg-navy-dark transition">
              Call Now
            </a>
            <Link href="/contact" className="px-5 py-2.5 bg-white text-navy font-semibold rounded text-sm hover:bg-cream transition">
              Get Started
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  )
}

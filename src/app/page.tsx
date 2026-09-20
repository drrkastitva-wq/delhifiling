import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import InquiryForm from '@/components/ui/InquiryForm'
import RecentlyVisited from '@/components/ui/RecentlyVisited'
import Link from 'next/link'
import { getHeroBanners, getSiteSettings, getBlogPosts } from '@/lib/payload'
import { Scale, FileText, Building2, ClipboardCheck, ArrowRight, Phone, Clock, Shield, Award } from 'lucide-react'

export const revalidate = 3600

const QUICK_LINKS = [
  { label: 'eCourt Filing',          sub: 'Civil • Criminal • HC • SC',  href: '/ecourt-filing',          icon: Scale,          bg: 'bg-navy' },
  { label: 'eTender & Procurement',  sub: 'Govt • Railway • GeM • PSU',  href: '/etender-procurement',    icon: FileText,       bg: 'bg-[#1a4a1a]' },
  { label: 'Business Incorporation', sub: 'Pvt Ltd • LLP • OPC • NGO',   href: '/business-incorporation', icon: Building2,      bg: 'bg-[#1a3a6b]' },
  { label: 'Annual Compliance',      sub: 'ROC • GST • Tax • MCA',       href: '/annual-compliance',      icon: ClipboardCheck, bg: 'bg-[#2d1a4a]' },
]

export default async function HomePage() {
  const [banners, settings, posts] = await Promise.all([
    getHeroBanners().catch(() => []),
    getSiteSettings().catch(() => null),
    getBlogPosts({ limit: 5 }).catch(() => []),
  ])
  const phone = settings?.phone || '+91 99119 91330'

  return (
    <Layout settings={settings}>

      <HeroSection banners={banners} />

      {/* Quick Links Band */}
      <div className="border-b-4 border-[#16a34a] bg-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href}
              className={`${q.bg} group flex items-center gap-3 px-5 py-4 hover:brightness-110 transition border-r border-white/10 last:border-0`}>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#16a34a]/30 transition">
                <q.icon size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-sm leading-tight truncate">{q.label}</div>
                <div className="text-white/50 text-[11px] mt-0.5 truncate">{q.sub}</div>
              </div>
              <ArrowRight size={13} className="text-white/20 ml-auto shrink-0 group-hover:text-[#22c55e] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main 2-col */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

        {/* LEFT — 2/3 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Recently Visited — client component, shows only if user has history */}
          <RecentlyVisited />

          {/* Latest Updates */}
          {posts.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-navy px-5 py-3 flex items-center justify-between">
                <h2 className="text-white font-semibold text-sm tracking-wide">Latest Updates & News</h2>
                <Link href="/blog" className="text-[#22c55e] text-xs font-medium hover:underline">All Posts →</Link>
              </div>
              <div>
                {posts.map((post: any, i: number) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className={`flex items-start gap-3 px-5 py-4 hover:bg-green-50 transition group ${i < posts.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span className="w-2 h-2 bg-[#16a34a] rounded-full mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy font-medium group-hover:text-[#16a34a] transition leading-snug">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <ArrowRight size={13} className="text-[#16a34a] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Trust tiles */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Shield, title: '100% Confidential', desc: 'Your documents handled with complete privacy and discretion.' },
              { icon: Award,  title: 'Expert Team',       desc: 'Qualified advocates, CAs and compliance specialists.' },
              { icon: Clock,  title: 'Fast Turnaround',   desc: 'Most services delivered within committed timelines.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
                <div className="w-11 h-11 bg-navy rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Icon size={20} className="text-[#22c55e]" />
                </div>
                <div className="text-navy font-semibold text-sm mb-1.5">{title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 1/3 */}
        <div className="space-y-5">
          <InquiryForm />

          <div className="bg-navy rounded-lg p-5 text-center">
            <div className="w-11 h-11 bg-[#16a34a]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone size={20} className="text-[#22c55e]" />
            </div>
            <p className="text-white font-semibold text-sm mb-1">Speak to an Expert</p>
            <p className="text-white/45 text-xs mb-4">Mon–Sat, 9 AM to 7 PM</p>
            <a href={`tel:${phone}`}
              className="block w-full py-2.5 bg-[#16a34a] text-white font-bold rounded-lg text-sm hover:bg-[#15803d] transition">
              {phone}
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-navy px-4 py-3">
              <p className="text-white text-xs font-semibold uppercase tracking-wider">Browse by Category</p>
            </div>
            {QUICK_LINKS.map(q => (
              <Link key={q.href} href={q.href}
                className="flex items-center justify-between px-4 py-3.5 text-sm text-navy font-medium hover:bg-green-50 hover:text-[#16a34a] border-b border-gray-100 last:border-0 transition group">
                <span className="flex items-center gap-2.5">
                  <q.icon size={15} className="text-[#16a34a] shrink-0" />{q.label}
                </span>
                <ArrowRight size={13} className="text-[#16a34a] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#16a34a]">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading text-white font-bold text-xl">Need Legal or Compliance Help?</p>
            <p className="text-white/75 text-sm mt-1">Free consultation — no obligation. Our experts respond within 2 hours.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={`tel:${phone}`} className="px-5 py-2.5 bg-navy text-white font-semibold rounded-lg text-sm hover:bg-navy-dark transition">
              Call Now
            </a>
            <Link href="/contact" className="px-5 py-2.5 bg-white text-[#16a34a] font-semibold rounded-lg text-sm hover:bg-green-50 transition">
              Get Started
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  )
}

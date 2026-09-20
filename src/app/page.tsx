import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import InquiryForm from '@/components/ui/InquiryForm'
import RecentlyVisited from '@/components/ui/RecentlyVisited'
import Link from 'next/link'
import { getHeroBanners, getSiteSettings, getBlogPosts } from '@/lib/payload'
import { Scale, FileText, Building2, ClipboardCheck, ArrowRight, Phone, Shield, Award, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

const QUICK_LINKS = [
  { label: 'eCourt Filing',          sub: 'Civil • Criminal • HC • SC',  href: '/ecourt-filing',          icon: Scale },
  { label: 'eTender & Procurement',  sub: 'Govt • Railway • GeM • PSU',  href: '/etender-procurement',    icon: FileText },
  { label: 'Business Incorporation', sub: 'Pvt Ltd • LLP • OPC • NGO',   href: '/business-incorporation', icon: Building2 },
  { label: 'Annual Compliance',      sub: 'ROC • GST • Tax • MCA',       href: '/annual-compliance',      icon: ClipboardCheck },
]

const IMPORTANT_LINKS = [
  { label: 'Track Your Application', href: '/dashboard' },
  { label: 'Download Documents',     href: '/dashboard' },
  { label: 'Search Services',        href: '/search' },
  { label: 'Contact Us',             href: '/contact' },
  { label: 'Blog & Updates',         href: '/blog' },
]

const TRUST = [
  { icon: Shield, title: '100% Confidential', desc: 'Your documents handled with complete privacy and discretion.' },
  { icon: Award,  title: 'Expert Team',        desc: 'Qualified advocates, CAs and compliance specialists.' },
  { icon: Clock,  title: 'Fast Turnaround',    desc: 'Most services delivered within committed timelines.' },
]

export default async function HomePage() {
  const [banners, settings, posts] = await Promise.all([
    getHeroBanners().catch(() => []),
    getSiteSettings().catch(() => null),
    getBlogPosts({ limit: 6 }).catch(() => []),
  ])
  const phone = settings?.phone || '+91 99119 91330'

  return (
    <Layout settings={settings}>

      <HeroSection banners={banners} />

      {/* Quick Links Band */}
      <div className="bg-[#003366] border-b-[3px] border-[#FF6600]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q, i) => (
            <Link key={q.href} href={q.href}
              className={`group flex items-center gap-3 px-5 py-3.5 no-underline hover:bg-[#FF6600]/20 transition
                ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center shrink-0">
                <q.icon size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-[13px] leading-tight truncate">{q.label}</div>
                <div className="text-white/50 text-[11px] mt-0.5 truncate">{q.sub}</div>
              </div>
              <ArrowRight size={12} className="text-[#FF6600] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main 2-col */}
      <div className="max-w-7xl mx-auto px-4 py-5 grid lg:grid-cols-3 gap-5">

        {/* LEFT — 2/3 */}
        <div className="lg:col-span-2 space-y-5">

          <RecentlyVisited />

          {/* Latest Updates */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header flex items-center justify-between">
              <span>Latest Updates &amp; News</span>
              <Link href="/blog" className="text-[#FFD700] text-[11px] font-normal normal-case tracking-normal no-underline hover:underline">
                View All →
              </Link>
            </div>
            {posts.length === 0 ? (
              <p className="px-4 py-6 text-[12px] text-[#888] text-center">No updates yet.</p>
            ) : posts.map((post: any, i: number) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className={`flex items-start gap-3 px-4 py-3 no-underline hover:bg-[#f5f8ff] transition group
                  ${i < posts.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#FF6600]" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#003399] group-hover:text-[#CC0000] leading-snug transition">{post.title}</p>
                  <p className="text-[11px] text-[#888] mt-0.5">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Trust tiles */}
          <div className="grid grid-cols-3 gap-4">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-[#cccccc]">
                <div className="section-header justify-center">{title}</div>
                <div className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded bg-[#003366]">
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="text-[12px] text-[#555] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Services grid */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header">Our Services</div>
            <div className="grid grid-cols-2">
              {QUICK_LINKS.map((q, i) => (
                <Link key={q.href} href={q.href}
                  className={`flex items-center gap-3 px-4 py-4 no-underline hover:bg-[#f5f8ff] transition group
                    ${i % 2 === 0 ? 'border-r border-[#eeeeee]' : ''}
                    ${i < 2 ? 'border-b border-[#eeeeee]' : ''}`}>
                  <div className="w-9 h-9 rounded bg-[#003366] flex items-center justify-center shrink-0">
                    <q.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#003399] group-hover:text-[#CC0000] transition">{q.label}</div>
                    <div className="text-[11px] text-[#888] mt-0.5">{q.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — 1/3 */}
        <div className="space-y-4">

          <InquiryForm />

          {/* Call box */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header">Speak to an Expert</div>
            <div className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded bg-[#003366]">
                <Phone size={18} className="text-white" />
              </div>
              <p className="text-[12px] text-[#555] mb-1">Mon–Sat, 9 AM to 7 PM</p>
              <a href={`tel:${phone}`}
                className="block w-full py-2 mt-3 text-white font-bold text-[13px] rounded-sm no-underline bg-[#FF6600] hover:bg-[#e65c00] transition">
                {phone}
              </a>
            </div>
          </div>

          {/* Category links */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header">Browse by Category</div>
            {QUICK_LINKS.map((q, i) => (
              <Link key={q.href} href={q.href}
                className={`flex items-center justify-between px-4 py-3 text-[13px] no-underline hover:bg-[#f5f8ff] transition group
                  ${i < QUICK_LINKS.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="flex items-center gap-2 text-[#003399] group-hover:text-[#CC0000] transition">
                  <q.icon size={14} className="text-[#FF6600] shrink-0" />{q.label}
                </span>
                <ArrowRight size={12} className="text-[#FF6600]" />
              </Link>
            ))}
          </div>

          {/* Important links */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header">Important Links</div>
            {IMPORTANT_LINKS.map((link, i) => (
              <Link key={link.href + link.label} href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#003399] no-underline hover:bg-[#f5f8ff] hover:text-[#CC0000] transition
                  ${i < IMPORTANT_LINKS.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  )
}

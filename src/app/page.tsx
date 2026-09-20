import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import InquiryForm from '@/components/ui/InquiryForm'
import RecentlyVisited from '@/components/ui/RecentlyVisited'
import Link from 'next/link'
import { getHeroBanners, getSiteSettings, getBlogPosts } from '@/lib/payload'
import { Scale, FileText, Building2, ClipboardCheck, ArrowRight, Phone, Shield } from 'lucide-react'

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

const EXPERTS = [
  {
    title: 'Advocate',
    abbr: 'Adv.',
    color: '#003366',
    expertise: ['Civil & Criminal Litigation', 'High Court & Supreme Court', 'Bail & Anticipatory Bail', 'Arbitration & ADR'],
    img: '/advocate.jpeg',
  },
  {
    title: 'Chartered Accountant',
    abbr: 'CA',
    color: '#1a5c1a',
    expertise: ['GST & Income Tax Filing', 'ROC / MCA Compliance', 'Company Audit & Accounts', 'Financial Due Diligence'],
    img: '/ca.jpeg',
  },
  {
    title: 'Company Secretary',
    abbr: 'CS',
    color: '#4a1a6b',
    expertise: ['Company Incorporation', 'Board & AGM Compliance', 'Director / DIN Services', 'MCA & ROC Filings'],
    img: '/cs.jpeg',
  },
]

export default async function HomePage() {
  const [banners, settings, posts] = await Promise.all([
    getHeroBanners().catch(() => []),
    getSiteSettings().catch(() => null),
    getBlogPosts({ limit: 6 }).catch(() => []),
  ])
  const phone = settings?.phone || '+91 99119 91330'
  const whatsapp = (settings?.whatsapp || phone).replace(/\D/g, '')
  const logoUrl = (settings as any)?.logo?.url

  return (
    <Layout settings={settings}>

      <HeroSection banners={banners} />

      {/* Quick Links Band */}
      <div className="bg-[#003366] border-b-[3px] border-[#16a34a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q, i) => (
            <Link key={q.href} href={q.href}
              className={`group flex items-center gap-3 px-5 py-3.5 no-underline hover:bg-[#16a34a]/20 transition
                ${i < 3 ? 'border-r border-white/10' : ''}`}>
              <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center shrink-0">
                <q.icon size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-[13px] leading-tight truncate">{q.label}</div>
                <div className="text-white/50 text-[11px] mt-0.5 truncate">{q.sub}</div>
              </div>
              <ArrowRight size={12} className="text-[#16a34a] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition" />
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
              <Link href="/blog" className="text-[#90EE90] text-[11px] font-normal normal-case tracking-normal no-underline hover:underline">
                View All →
              </Link>
            </div>
            {posts.length === 0 ? (
              <p className="px-4 py-6 text-[12px] text-[#888] text-center">No updates yet.</p>
            ) : posts.map((post: any, i: number) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className={`flex items-start gap-3 px-4 py-3 no-underline hover:bg-[#f5f8ff] transition group
                  ${i < posts.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#16a34a]" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#003399] group-hover:text-[#CC0000] leading-snug transition">{post.title}</p>
                  <p className="text-[11px] text-[#888] mt-0.5">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Expert Team Cards */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header">Our Expert Team</div>
            <div className="grid grid-cols-3 divide-x divide-[#eeeeee]">
              {EXPERTS.map(({ title, abbr, color, expertise, img }) => (
                <div key={abbr} className="p-4 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#eeeeee]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-sm text-white text-[10px] font-bold mb-1"
                    style={{ background: color }}>{abbr}</div>
                  <div className="text-[#003366] font-bold text-[12px] mb-2">{title}</div>
                  <ul className="space-y-1 text-left">
                    {expertise.map(e => (
                      <li key={e} className="flex items-start gap-1.5 text-[11px] text-[#555]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0 mt-1" />{e}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, title: '100% Confidential', desc: 'Documents handled with complete privacy.' },
              { title: '10+ Years', desc: 'Combined legal & compliance expertise.' },
              { title: 'Pan India', desc: 'Services across all states & courts.' },
            ].map(({ icon: Icon, title, desc }: any) => (
              <div key={title} className="bg-white border border-[#cccccc] p-4 text-center">
                <div className="w-9 h-9 mx-auto mb-2 flex items-center justify-center rounded bg-[#003366]">
                  {Icon ? <Icon size={16} className="text-white" /> : (
                    <span className="text-white font-bold text-[11px]">{title.split(' ')[0]}</span>
                  )}
                </div>
                <div className="text-[#003366] font-bold text-[12px] mb-1">{title}</div>
                <p className="text-[11px] text-[#555] leading-relaxed">{desc}</p>
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

          {/* Call + WhatsApp box */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header" style={{ borderLeftColor: '#16a34a' }}>Contact Us</div>
            <div className="p-4 space-y-2">
              <p className="text-[11px] text-[#555] text-center mb-3">Mon–Fri, 8 AM to 8 PM</p>

              {/* Call button */}
              <a href={`tel:${phone}`}
                className="flex items-center justify-center gap-2.5 w-full py-2.5 bg-[#003366] hover:bg-[#004080] text-white font-bold text-[13px] no-underline transition">
                {/* Phone SVG */}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                {phone}
              </a>

              {/* WhatsApp button */}
              <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello! I need help with a legal/compliance service.')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[13px] no-underline transition">
                <svg viewBox="0 0 32 32" width="16" height="16" fill="white">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.437-2.01A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.471c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.325s1.427 3.857 1.626 4.123c.199.265 2.808 4.287 6.803 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.766-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.891-.099-.166-.365-.265-.763-.464z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Category links */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header" style={{ borderLeftColor: '#16a34a' }}>Browse by Category</div>
            {QUICK_LINKS.map((q, i) => (
              <Link key={q.href} href={q.href}
                className={`flex items-center justify-between px-4 py-3 text-[13px] no-underline hover:bg-[#f5f8ff] transition group
                  ${i < QUICK_LINKS.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="flex items-center gap-2 text-[#003399] group-hover:text-[#CC0000] transition">
                  <q.icon size={14} className="text-[#16a34a] shrink-0" />{q.label}
                </span>
                <ArrowRight size={12} className="text-[#16a34a]" />
              </Link>
            ))}
          </div>

          {/* Important links */}
          <div className="bg-white border border-[#cccccc]">
            <div className="section-header" style={{ borderLeftColor: '#16a34a' }}>Important Links</div>
            {IMPORTANT_LINKS.map((link, i) => (
              <Link key={link.href + link.label} href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#003399] no-underline hover:bg-[#f5f8ff] hover:text-[#CC0000] transition
                  ${i < IMPORTANT_LINKS.length - 1 ? 'border-b border-[#eeeeee]' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </Layout>
  )
}

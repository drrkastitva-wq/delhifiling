'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Search, Phone, Mail } from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const NAV_ITEMS = [
  {
    label: 'eCourt Filing', href: '/ecourt-filing',
    links: [
      { label: 'Civil Court Filing', href: '/ecourt-filing/civil-matters' },
      { label: 'Criminal Court Filing', href: '/ecourt-filing/criminal-matters' },
      { label: 'High Court & Supreme Court', href: '/ecourt-filing/high-court-supreme-court' },
      { label: 'Bail Applications', href: '/ecourt-filing/bail-applications' },
      { label: 'Arbitration & Tribunal', href: '/ecourt-filing/arbitration-tribunal' },
      { label: 'Legal Drafting', href: '/ecourt-filing/legal-drafting' },
    ],
  },
  {
    label: 'eTender & Procurement', href: '/etender-procurement',
    links: [
      { label: 'Government Tenders', href: '/etender-procurement/government-tenders' },
      { label: 'Railway Tenders', href: '/etender-procurement/railway-tenders' },
      { label: 'GeM Registration', href: '/etender-procurement/gem-registration' },
      { label: 'PSU & Defence', href: '/etender-procurement/psu-defence' },
      { label: 'Tender Documentation', href: '/etender-procurement/tender-documentation' },
    ],
  },
  {
    label: 'Business Incorporation', href: '/business-incorporation',
    links: [
      { label: 'Private Limited Company', href: '/business-incorporation/private-limited-company' },
      { label: 'One Person Company', href: '/business-incorporation/one-person-company' },
      { label: 'LLP Registration', href: '/business-incorporation/llp-registration' },
      { label: 'Partnership Firm', href: '/business-incorporation/partnership-firm' },
      { label: 'Proprietorship', href: '/business-incorporation/proprietorship' },
      { label: 'Section 8 / NGO', href: '/business-incorporation/section-8-ngo' },
    ],
  },
  {
    label: 'Annual Compliance', href: '/annual-compliance',
    links: [
      { label: 'ROC Annual Filing', href: '/annual-compliance/roc-annual-filing' },
      { label: 'GST Returns', href: '/annual-compliance/gst-returns' },
      { label: 'Income Tax Filing', href: '/annual-compliance/income-tax-filing' },
      { label: 'Director Compliance', href: '/annual-compliance/director-compliance' },
      { label: 'Board Meeting Support', href: '/annual-compliance/board-meeting-support' },
    ],
  },
]

function DropdownItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={item.href}
        className={`flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors
          ${open ? 'bg-[#FF6600] text-white' : 'text-white hover:bg-[#FF6600]'}`}>
        {item.label}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 z-50 min-w-[220px] bg-white border border-[#cccccc] shadow-lg">
          <div className="bg-[#003366] px-3 py-1.5 border-l-4 border-[#FF6600]">
            <span className="text-white text-[11px] font-semibold uppercase tracking-wide">{item.label}</span>
          </div>
          {item.links.map(link => (
            <Link key={link.href} href={link.href}
              className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#003399] hover:bg-[#f0f4ff] hover:text-[#CC0000] border-b border-[#eeeeee] last:border-0 transition-colors">
              <span className="w-1.5 h-1.5 bg-[#FF6600] rounded-full shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout({ children, settings }: { children: React.ReactNode; settings?: any }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const phone = settings?.phone || '+91 99119 91330'
  const email = settings?.email || 'info@delhifiling.com'
  const whatsapp = settings?.whatsapp || '+91 99119 91330'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f0f0' }}>

      {/* ── Row 1: Tricolour stripe ── */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* ── Row 2: Brand header ── */}
      <div style={{ background: '#003366' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-3 no-underline hover:no-underline">
            <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0">
              <span className="text-[#003366] font-bold text-lg leading-none">DF</span>
            </div>
            <div>
              <div className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'Noto Sans, Arial, sans-serif' }}>
                Delhi Filing
              </div>
              <div className="text-[#FFD700] text-[11px] leading-tight mt-0.5">
                Legal · Corporate · Compliance Services
              </div>
            </div>
          </Link>

          {/* Right: contact + search + account */}
          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-white text-[12px] hover:text-[#FFD700] transition no-underline">
              <Phone size={13} />{phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-white/70 text-[12px] hover:text-[#FFD700] transition no-underline">
              <Mail size={13} />{email}
            </a>
            <Link href="/search" className="flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition no-underline">
              <Search size={13} />
            </Link>
            <Link href="/dashboard" className="px-3 py-1.5 bg-[#FF6600] hover:bg-[#e65c00] text-white text-[12px] font-semibold rounded transition no-underline">
              My Account
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Row 3: Nav bar ── */}
      <nav className="sticky top-0 z-50 shadow-md" style={{ background: '#004080' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center">
            <Link href="/"
              className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#FF6600] transition-colors whitespace-nowrap no-underline">
              Home
            </Link>
            {NAV_ITEMS.map(item => <DropdownItem key={item.href} item={item} />)}
            <Link href="/blog"
              className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#FF6600] transition-colors whitespace-nowrap no-underline">
              Updates
            </Link>
            <Link href="/contact"
              className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#FF6600] transition-colors whitespace-nowrap no-underline">
              Contact Us
            </Link>
            <div className="ml-auto">
              <Link href="/contact"
                className="flex items-center px-4 py-2 bg-[#FF6600] hover:bg-[#e65c00] text-white text-[12px] font-bold transition-colors no-underline">
                Free Consultation
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden bg-[#003366] border-t border-white/10">
              <Link href="/" onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#FF6600]">
                Home
              </Link>
              {NAV_ITEMS.map(item => (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[13px] text-white border-b border-white/10">
                    {item.label}
                    <ChevronDown size={13} className={`transition-transform ${mobileExpanded === item.href ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === item.href && (
                    <div className="bg-[#002244]">
                      {item.links.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-6 py-2.5 text-[12px] text-white/80 border-b border-white/5 hover:text-[#FFD700] no-underline">
                          <span className="w-1 h-1 bg-[#FF6600] rounded-full" />{link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/blog" onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#FF6600]">
                Updates
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#FF6600]">
                Contact Us
              </Link>
              <div className="px-4 py-3 flex gap-3">
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-[#FF6600] text-white text-[13px] font-semibold rounded no-underline">
                  My Account
                </Link>
                <a href={`tel:${phone}`}
                  className="flex-1 text-center py-2 bg-white/10 text-white text-[13px] rounded no-underline">
                  Call Now
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Breadcrumb bar ── */}
      <div className="border-b border-[#cccccc]" style={{ background: '#e8e8e8' }}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-1.5 text-[11px] text-[#555555]">
          <Link href="/" className="hover:text-[#CC0000] no-underline">Home</Link>
          <span className="text-[#999]">&rsaquo;</span>
          <span className="text-[#333]">Delhi Filing — Legal &amp; Compliance Services</span>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <WhatsAppButton whatsapp={whatsapp} />

      {/* ── Footer ── */}
      <footer>
        {/* Top footer — dark blue */}
        <div style={{ background: '#003366' }}>
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Brand */}
            <div>
              <div className="text-[#FFD700] font-bold text-[14px] uppercase border-b border-[#FF6600] pb-2 mb-3">
                Delhi Filing
              </div>
              <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                Professional Legal, Corporate &amp; Government Filing Services. Trusted by businesses and advocates across India.
              </p>
              <div className="space-y-1.5 text-[12px]">
                <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] no-underline transition">
                  <Phone size={12} />{phone}
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] no-underline transition">
                  <Mail size={12} />{email}
                </a>
              </div>
            </div>

            {NAV_ITEMS.slice(0, 2).map(item => (
              <div key={item.href}>
                <div className="text-[#FFD700] font-bold text-[13px] uppercase border-b border-[#FF6600] pb-2 mb-3">
                  {item.label}
                </div>
                <ul className="space-y-1.5">
                  {item.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex items-center gap-2 text-white/60 text-[12px] hover:text-white no-underline transition">
                        <span className="w-1 h-1 bg-[#FF6600] rounded-full shrink-0" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              {NAV_ITEMS.slice(2).map(item => (
                <div key={item.href} className="mb-5 last:mb-0">
                  <div className="text-[#FFD700] font-bold text-[13px] uppercase border-b border-[#FF6600] pb-2 mb-3">
                    {item.label}
                  </div>
                  <ul className="space-y-1.5">
                    {item.links.slice(0, 4).map(link => (
                      <li key={link.href}>
                        <Link href={link.href}
                          className="flex items-center gap-2 text-white/60 text-[12px] hover:text-white no-underline transition">
                          <span className="w-1 h-1 bg-[#FF6600] rounded-full shrink-0" />{link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div style={{ background: '#002244' }}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
            <span>© {new Date().getFullYear()} Delhi Filing. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="hover:text-white no-underline transition">Updates</Link>
              <Link href="/search" className="hover:text-white no-underline transition">Search</Link>
              <Link href="/contact" className="hover:text-white no-underline transition">Contact</Link>
              <Link href="/dashboard" className="hover:text-white no-underline transition">My Account</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

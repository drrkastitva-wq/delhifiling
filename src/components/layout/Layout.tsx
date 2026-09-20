'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Search, Phone, Mail } from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const NAV_ITEMS = [
  {
    label: 'eCourt Filing', href: '/ecourt-filing',
    links: [
      { label: 'Civil Case Filing', href: '/ecourt-filing/civil-case-filing' },
      { label: 'Criminal Case Filing', href: '/ecourt-filing/criminal-case-filing' },
      { label: 'High Court / Writ', href: '/ecourt-filing/high-court-writ' },
      { label: 'Supreme Court Filing', href: '/ecourt-filing/supreme-court-filing' },
      { label: 'Bail Filing', href: '/ecourt-filing/bail-filing' },
      { label: 'Arbitration & ADR', href: '/ecourt-filing/arbitration-adr' },
      { label: 'eCourt Drafting & Docs', href: '/ecourt-filing/ecourt-drafting-documentation' },
    ],
  },
  {
    label: 'eTender & Procurement', href: '/etender-procurement',
    links: [
      { label: 'Government e-Tender Filing', href: '/etender-procurement/government-etender-filing' },
      { label: 'Railway Tender Filing', href: '/etender-procurement/railway-tender-filing' },
      { label: 'GeM Bid & Tender', href: '/etender-procurement/gem-bid-tender' },
      { label: 'PSU Tender Filing', href: '/etender-procurement/psu-tender-filing' },
      { label: 'Defence Tender Filing', href: '/etender-procurement/defence-tender-filing' },
      { label: 'Tender Documentation', href: '/etender-procurement/tender-documentation' },
    ],
  },
  {
    label: 'Business Incorporation', href: '/business-incorporation',
    links: [
      { label: 'Private Limited Company', href: '/business-incorporation/private-limited-company' },
      { label: 'One Person Company (OPC)', href: '/business-incorporation/one-person-company' },
      { label: 'LLP Registration', href: '/business-incorporation/limited-liability-partnership' },
      { label: 'Partnership Firm', href: '/business-incorporation/partnership-firm' },
      { label: 'Sole Proprietorship', href: '/business-incorporation/sole-proprietorship' },
      { label: 'Section 8 Company', href: '/business-incorporation/section-8-company' },
    ],
  },
  {
    label: 'Annual Compliance', href: '/annual-compliance',
    links: [
      { label: 'ROC / MCA Compliance', href: '/annual-compliance/roc-mca-compliance' },
      { label: 'GST & Tax Compliance', href: '/annual-compliance/gst-tax-compliance' },
      { label: 'Director / DIN Compliance', href: '/annual-compliance/director-din-compliance' },
      { label: 'Annual Compliance by Entity', href: '/annual-compliance/annual-compliance-by-entity' },
      { label: 'Board / AGM Governance', href: '/annual-compliance/board-agm-corporate-governance' },
    ],
  },
]

function DropdownItem({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={item.href}
        className={`flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors
          ${open ? 'bg-[#16a34a] text-white' : 'text-white hover:bg-[#16a34a]'}`}>
        {item.label}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 z-50 min-w-[220px] bg-white border border-[#cccccc] shadow-lg">
          <div className="bg-[#003366] px-3 py-1.5 border-l-4 border-[#16a34a]">
            <span className="text-white text-[11px] font-semibold uppercase tracking-wide">{item.label}</span>
          </div>
          {item.links.map(link => (
            <Link key={link.href} href={link.href}
              className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#003399] hover:bg-[#f0f4ff] hover:text-[#CC0000] border-b border-[#eeeeee] last:border-0 transition-colors">
              <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full shrink-0" />
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
  const logoUrl = (settings as any)?.logo?.url
  const siteName = settings?.siteName || 'Delhi Filing'
  const tagline = settings?.tagline || 'Legal · Corporate · Compliance Services'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f0f0' }}>

      {/* Tricolour stripe */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Brand header */}
      <div className="bg-gradient-to-r from-[#001f4d] via-[#003366] to-[#004d99]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={siteName} className="h-12 w-auto object-contain" />
            ) : (
              <div className="w-12 h-12 bg-[#16a34a] rounded flex items-center justify-center shrink-0 shadow">
                <span className="text-white font-bold text-lg leading-none">DF</span>
              </div>
            )}
            <div>
              <div className="text-white font-bold text-xl leading-tight tracking-wide">{siteName}</div>
              <div className="text-[#90EE90] text-[11px] leading-tight mt-0.5 tracking-wider">{tagline}</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-[#FFD700] text-[12px] font-semibold hover:text-white transition no-underline">
              <Phone size={13} />{phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-white/80 text-[12px] hover:text-[#FFD700] transition no-underline">
              <Mail size={13} />{email}
            </a>
            <Link href="/search" className="flex items-center gap-1 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white text-[12px] rounded transition no-underline">
              <Search size={13} />
            </Link>
            <Link href="/dashboard" className="px-3 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-[12px] font-semibold rounded transition no-underline shadow">
              My Account
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="sticky top-0 z-50 shadow-md" style={{ background: '#004080' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center">
            <Link href="/" className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#16a34a] transition-colors whitespace-nowrap no-underline">
              Home
            </Link>
            {NAV_ITEMS.map(item => <DropdownItem key={item.href} item={item} />)}
            <Link href="/blog" className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#16a34a] transition-colors whitespace-nowrap no-underline">
              Updates
            </Link>
            <Link href="/contact" className="px-3 py-2.5 text-[13px] font-medium text-white hover:bg-[#16a34a] transition-colors whitespace-nowrap no-underline">
              Contact Us
            </Link>
            <div className="ml-auto">
              <Link href="/contact" className="flex items-center px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-[12px] font-bold transition-colors no-underline">
                Free Consultation
              </Link>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-[#003366] border-t border-white/10">
              <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#16a34a]">Home</Link>
              {NAV_ITEMS.map(item => (
                <div key={item.href}>
                  <button onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[13px] text-white border-b border-white/10">
                    {item.label}
                    <ChevronDown size={13} className={`transition-transform ${mobileExpanded === item.href ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === item.href && (
                    <div className="bg-[#002244]">
                      {item.links.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-6 py-2.5 text-[12px] text-white/80 border-b border-white/5 hover:text-[#90EE90] no-underline">
                          <span className="w-1 h-1 bg-[#16a34a] rounded-full" />{link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#16a34a]">Updates</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[13px] text-white border-b border-white/10 no-underline hover:bg-[#16a34a]">Contact Us</Link>
              <div className="px-4 py-3 flex gap-3">
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 bg-[#16a34a] text-white text-[13px] font-semibold rounded no-underline">My Account</Link>
                <a href={`tel:${phone}`} className="flex-1 text-center py-2 bg-white/10 text-white text-[13px] rounded no-underline">Call Now</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="border-b border-[#cccccc]" style={{ background: '#e8e8e8' }}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-1.5 text-[11px] text-[#555555]">
          <Link href="/" className="hover:text-[#CC0000] no-underline">Home</Link>
          <span className="text-[#999]">&rsaquo;</span>
          <span className="text-[#333]">{siteName} — Legal &amp; Compliance Services</span>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <WhatsAppButton whatsapp={whatsapp} />

      {/* Footer */}
      <footer>
        <div className="bg-gradient-to-b from-[#001a3d] to-[#002f5c]">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain mb-3" />
              )}
              <div className="text-[#FFD700] font-bold text-[14px] uppercase border-b-2 border-[#16a34a] pb-2 mb-3">{siteName}</div>
              <p className="text-white text-[12px] leading-relaxed mb-4">
                Professional Legal, Corporate &amp; Government Filing Services. Trusted by businesses and advocates across India.
              </p>
              <div className="space-y-2 text-[12px]">
                <a href={`tel:${phone}`} className="flex items-center gap-2 text-[#FFD700] font-semibold hover:text-white no-underline transition">
                  <Phone size={12} />{phone}
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 text-white hover:text-[#FFD700] no-underline transition">
                  <Mail size={12} />{email}
                </a>
                <p className="text-white/60 text-[11px]">Mon–Fri, 8 AM – 8 PM</p>
              </div>
            </div>

            {NAV_ITEMS.slice(0, 2).map(item => (
              <div key={item.href}>
                <div className="text-[#FFD700] font-bold text-[13px] uppercase border-b-2 border-[#16a34a] pb-2 mb-3">{item.label}</div>
                <ul className="space-y-2">
                  {item.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center gap-2 text-white text-[12px] hover:text-[#90EE90] no-underline transition">
                        <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full shrink-0" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              {NAV_ITEMS.slice(2).map(item => (
                <div key={item.href} className="mb-5 last:mb-0">
                  <div className="text-[#FFD700] font-bold text-[13px] uppercase border-b-2 border-[#16a34a] pb-2 mb-3">{item.label}</div>
                  <ul className="space-y-2">
                    {item.links.slice(0, 4).map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex items-center gap-2 text-white text-[12px] hover:text-[#90EE90] no-underline transition">
                          <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full shrink-0" />{link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#16a34a]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white">
            <span className="font-medium">© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="hover:underline no-underline transition">Updates</Link>
              <Link href="/search" className="hover:underline no-underline transition">Search</Link>
              <Link href="/contact" className="hover:underline no-underline transition">Contact</Link>
              <Link href="/dashboard" className="hover:underline no-underline transition">My Account</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

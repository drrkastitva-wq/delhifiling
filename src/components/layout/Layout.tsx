'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu, X, Phone, Mail, Search, UserCircle, Scale,
  FileText, Building2, ClipboardCheck, ChevronDown,
  MapPin, Clock, ArrowRight, BookOpen
} from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const NAV_ITEMS = [
  {
    label: 'eCourt Filing',
    href: '/ecourt-filing',
    icon: Scale,
    desc: 'Litigation • e-Filing • Court Drafting',
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
    label: 'eTender & Procurement',
    href: '/etender-procurement',
    icon: FileText,
    desc: 'Government • Railway • GeM • PSU',
    links: [
      { label: 'Government Tenders', href: '/etender-procurement/government-tenders' },
      { label: 'Railway Tenders', href: '/etender-procurement/railway-tenders' },
      { label: 'GeM Registration', href: '/etender-procurement/gem-registration' },
      { label: 'PSU & Defence', href: '/etender-procurement/psu-defence' },
      { label: 'Tender Documentation', href: '/etender-procurement/tender-documentation' },
    ],
  },
  {
    label: 'Business Incorporation',
    href: '/business-incorporation',
    icon: Building2,
    desc: 'Company • LLP • Partnership • Setup',
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
    label: 'Annual Compliance',
    href: '/annual-compliance',
    icon: ClipboardCheck,
    desc: 'ROC • MCA • GST • Tax • Corporate',
    links: [
      { label: 'ROC Annual Filing', href: '/annual-compliance/roc-annual-filing' },
      { label: 'GST Returns', href: '/annual-compliance/gst-returns' },
      { label: 'Income Tax Filing', href: '/annual-compliance/income-tax-filing' },
      { label: 'Director Compliance', href: '/annual-compliance/director-compliance' },
      { label: 'Board Meeting Support', href: '/annual-compliance/board-meeting-support' },
    ],
  },
]

function NavDropdown({ item }: { item: typeof NAV_ITEMS[0] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={item.href}
        className="flex items-center gap-1 px-4 py-5 text-sm font-medium text-navy border-b-2 border-transparent hover:border-gold hover:text-gold transition-all"
      >
        {item.label}
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 w-56 bg-white border border-border shadow-xl z-50 rounded-b-lg overflow-hidden">
          <div className="bg-navy px-4 py-2.5">
            <p className="text-gold text-xs font-semibold tracking-wide">{item.label}</p>
            <p className="text-white/50 text-[10px]">{item.desc}</p>
          </div>
          {item.links.map(link => (
            <Link key={link.href} href={link.href}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-text hover:bg-cream hover:text-navy border-b border-border/50 last:border-0 transition">
              {link.label}
              <ArrowRight size={12} className="text-gold" />
            </Link>
          ))}
          <Link href={item.href}
            className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold text-gold bg-cream hover:bg-gold hover:text-navy transition">
            View All <ArrowRight size={11} />
          </Link>
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
  const address = settings?.address || 'New Delhi, India'

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f4]">

      {/* Utility bar — MCA style top strip */}
      <div className="bg-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-white/60">
            <span className="flex items-center gap-1"><MapPin size={10} />New Delhi, India</span>
            <span className="flex items-center gap-1"><Clock size={10} />Mon–Sat 9AM–7PM</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-gold transition">
              <Phone size={10} />{phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-gold transition">
              <Mail size={10} />{email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav — white bar, MCA style */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        {/* Logo row */}
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 border-b border-border">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-navy rounded flex items-center justify-center">
              <Scale size={22} className="text-gold" />
            </div>
            <div>
              <div className="font-heading font-bold text-navy text-xl leading-none tracking-tight">Delhi Filing</div>
              <div className="text-[10px] text-text-muted leading-none tracking-widest uppercase mt-0.5">Legal • Corporate • Compliance</div>
            </div>
          </Link>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/search" className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-muted hover:text-navy hover:bg-cream rounded transition">
              <Search size={15} /> Search
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-muted hover:text-navy hover:bg-cream rounded transition">
              <UserCircle size={15} /> My Account
            </Link>
            <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium border border-navy text-navy rounded hover:bg-navy hover:text-white transition">
              WhatsApp
            </a>
            <Link href="/contact"
              className="px-4 py-2 text-sm font-semibold bg-gold text-navy rounded hover:bg-gold-dark transition">
              Free Consultation
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-navy">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav links row — MCA style horizontal tabs */}
        <div className="hidden lg:block bg-white border-b-2 border-gold">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <Link href="/" className="px-4 py-4 text-sm font-medium text-navy border-b-2 border-transparent hover:border-gold hover:text-gold transition-all">
              Home
            </Link>
            {NAV_ITEMS.map(item => <NavDropdown key={item.href} item={item} />)}
            <Link href="/blog" className="px-4 py-4 text-sm font-medium text-navy border-b-2 border-transparent hover:border-gold hover:text-gold transition-all flex items-center gap-1">
              <BookOpen size={13} /> Blog
            </Link>
            <Link href="/contact" className="px-4 py-4 text-sm font-medium text-navy border-b-2 border-transparent hover:border-gold hover:text-gold transition-all">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border divide-y divide-border">
            {NAV_ITEMS.map(item => (
              <div key={item.href}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-navy"
                >
                  <span className="flex items-center gap-2"><item.icon size={16} className="text-gold" />{item.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.href ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === item.href && (
                  <div className="bg-cream px-4 pb-3 space-y-1">
                    {item.links.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                        className="block py-2 text-sm text-text-muted hover:text-navy pl-6 border-l-2 border-gold/30 hover:border-gold transition">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-navy">
              <BookOpen size={16} className="text-gold" /> Blog
            </Link>
            <Link href="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-navy">
              <Search size={16} className="text-gold" /> Search
            </Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-navy">
              <UserCircle size={16} className="text-gold" /> My Account
            </Link>
            <div className="px-4 py-3 flex gap-2">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 bg-gold text-navy text-sm font-semibold rounded">
                Free Consultation
              </Link>
              <a href={`tel:${phone}`} className="flex-1 text-center py-2.5 border border-navy text-navy text-sm font-semibold rounded">
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>
      <WhatsAppButton whatsapp={whatsapp} />

      {/* Footer — MCA style dark multi-column */}
      <footer className="bg-navy text-white">
        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold rounded flex items-center justify-center">
                <Scale size={18} className="text-navy" />
              </div>
              <span className="font-heading font-bold text-lg">Delhi Filing</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Professional Legal, Corporate & Government Filing Services. Trusted by businesses and advocates across India.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/70 hover:text-gold transition">
                <Phone size={13} />{phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/70 hover:text-gold transition">
                <Mail size={13} />{email}
              </a>
              <p className="flex items-start gap-2 text-white/50 text-xs mt-1">
                <MapPin size={12} className="mt-0.5 shrink-0" />{address}
              </p>
            </div>
          </div>

          {/* Services cols */}
          {NAV_ITEMS.slice(0, 2).map(item => (
            <div key={item.href}>
              <h4 className="text-gold font-semibold text-sm mb-4 pb-2 border-b border-white/10">{item.label}</h4>
              <ul className="space-y-2">
                {item.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/55 text-sm hover:text-white transition flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-gold rounded-full shrink-0" />{link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            {NAV_ITEMS.slice(2).map(item => (
              <div key={item.href} className="mb-6 last:mb-0">
                <h4 className="text-gold font-semibold text-sm mb-3 pb-2 border-b border-white/10">{item.label}</h4>
                <ul className="space-y-1.5">
                  {item.links.slice(0, 3).map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-white/55 text-sm hover:text-white transition flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-gold rounded-full shrink-0" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>© {new Date().getFullYear()} Delhi Filing. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <Link href="/search" className="hover:text-white transition">Search</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/dashboard" className="hover:text-white transition">My Account</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

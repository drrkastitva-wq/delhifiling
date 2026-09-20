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
    label: 'eCourt Filing', href: '/ecourt-filing', icon: Scale,
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
    label: 'eTender & Procurement', href: '/etender-procurement', icon: FileText,
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
    label: 'Business Incorporation', href: '/business-incorporation', icon: Building2,
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
    label: 'Annual Compliance', href: '/annual-compliance', icon: ClipboardCheck,
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
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={item.href}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all
          ${open ? 'bg-green-50 text-[#16a34a]' : 'text-navy hover:bg-gray-50 hover:text-[#16a34a]'}`}>
        <item.icon size={14} className={open ? 'text-[#16a34a]' : 'text-[#16a34a]'} />
        {item.label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180 text-[#16a34a]' : 'text-gray-400'}`} />
      </Link>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 shadow-xl rounded-lg z-50 overflow-hidden">
          <div className="bg-navy px-4 py-3 border-b-2 border-[#16a34a]">
            <p className="text-[#22c55e] text-xs font-bold tracking-wide uppercase">{item.label}</p>
            <p className="text-white/50 text-[10px] mt-0.5">{item.desc}</p>
          </div>
          <div className="py-1">
            {item.links.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#16a34a] transition group">
                <span>{link.label}</span>
                <ArrowRight size={11} className="text-[#16a34a] opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 px-4 py-2">
            <Link href={item.href}
              className="flex items-center gap-1 text-xs font-semibold text-[#16a34a] hover:text-[#15803d] transition">
              View all services <ArrowRight size={11} />
            </Link>
          </div>
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
    <div className="min-h-screen flex flex-col bg-white">

      {/* Top utility bar */}
      <div className="bg-navy text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5 text-white/60">
            <span className="flex items-center gap-1.5"><MapPin size={11} />New Delhi, India</span>
            <span className="flex items-center gap-1.5"><Clock size={11} />Mon–Sat &nbsp;9 AM – 7 PM</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-[#22c55e] transition font-medium">
              <Phone size={11} />{phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-[#22c55e] transition">
              <Mail size={11} />{email}
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">

          {/* Single nav row: logo | nav links | actions */}
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
                <Scale size={20} className="text-[#22c55e]" />
              </div>
              <div>
                <div className="font-heading font-bold text-navy text-lg leading-none">Delhi Filing</div>
                <div className="text-[9px] text-gray-400 leading-none tracking-widest uppercase mt-0.5">Legal · Corporate · Compliance</div>
              </div>
            </Link>

            {/* Desktop nav links — centered */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              <Link href="/" className="px-3.5 py-2 rounded-md text-sm font-medium text-navy hover:bg-gray-50 hover:text-[#16a34a] transition">
                Home
              </Link>
              {NAV_ITEMS.map(item => <NavDropdown key={item.href} item={item} />)}
              <Link href="/blog" className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium text-navy hover:bg-gray-50 hover:text-[#16a34a] transition">
                <BookOpen size={14} className="text-[#16a34a]" />Blog
              </Link>
              <Link href="/contact" className="px-3.5 py-2 rounded-md text-sm font-medium text-navy hover:bg-gray-50 hover:text-[#16a34a] transition">
                Contact
              </Link>
            </div>

            {/* Desktop action buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link href="/search"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-navy hover:bg-gray-50 rounded-md transition">
                <Search size={15} />
              </Link>
              <Link href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-navy hover:bg-gray-50 rounded-md transition">
                <UserCircle size={15} />
                <span className="text-sm">Account</span>
              </Link>
              <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition">
                WhatsApp
              </a>
              <Link href="/contact"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition shadow-sm">
                Free Consultation
              </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-navy rounded-md hover:bg-gray-50">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Green underline tab bar — desktop only */}
          <div className="hidden lg:flex border-t border-gray-100">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href}
                className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-[#16a34a] border-b-2 border-transparent hover:border-[#16a34a] transition-all">
                {item.label}
              </Link>
            ))}
            <Link href="/blog" className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-[#16a34a] border-b-2 border-transparent hover:border-[#16a34a] transition-all">Blog</Link>
            <Link href="/search" className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-[#16a34a] border-b-2 border-transparent hover:border-[#16a34a] transition-all">Search Services</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 divide-y divide-gray-100">
            {NAV_ITEMS.map(item => (
              <div key={item.href}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-navy">
                  <span className="flex items-center gap-2.5">
                    <item.icon size={16} className="text-[#16a34a]" />{item.label}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${mobileExpanded === item.href ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === item.href && (
                  <div className="bg-green-50 px-5 pb-3 space-y-0.5">
                    {item.links.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#16a34a] pl-7 border-l-2 border-[#16a34a]/20 hover:border-[#16a34a] transition">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-navy">
              <BookOpen size={16} className="text-[#16a34a]" />Blog
            </Link>
            <Link href="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-navy">
              <Search size={16} className="text-[#16a34a]" />Search
            </Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-navy">
              <UserCircle size={16} className="text-[#16a34a]" />My Account
            </Link>
            <div className="px-5 py-4 flex gap-3">
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 bg-[#16a34a] text-white text-sm font-semibold rounded-lg">
                Free Consultation
              </Link>
              <a href={`tel:${phone}`}
                className="flex-1 text-center py-2.5 border border-navy text-navy text-sm font-semibold rounded-lg">
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>
      <WhatsAppButton whatsapp={whatsapp} />

      {/* Footer */}
      <footer className="bg-navy text-white mt-0">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#16a34a] rounded-lg flex items-center justify-center">
                <Scale size={18} className="text-white" />
              </div>
              <span className="font-heading font-bold text-lg">Delhi Filing</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Professional Legal, Corporate & Government Filing Services. Trusted by businesses and advocates across India.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-white/70 hover:text-[#22c55e] transition">
                <Phone size={13} />{phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/70 hover:text-[#22c55e] transition">
                <Mail size={13} />{email}
              </a>
              <p className="flex items-start gap-2 text-white/45 text-xs">
                <MapPin size={12} className="mt-0.5 shrink-0" />{address}
              </p>
            </div>
          </div>

          {NAV_ITEMS.slice(0, 2).map(item => (
            <div key={item.href}>
              <h4 className="text-[#22c55e] font-semibold text-sm mb-4 pb-2 border-b border-white/10">{item.label}</h4>
              <ul className="space-y-2">
                {item.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="flex items-center gap-2 text-white/55 text-sm hover:text-white transition">
                      <span className="w-1 h-1 bg-[#16a34a] rounded-full shrink-0" />{link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            {NAV_ITEMS.slice(2).map(item => (
              <div key={item.href} className="mb-6 last:mb-0">
                <h4 className="text-[#22c55e] font-semibold text-sm mb-3 pb-2 border-b border-white/10">{item.label}</h4>
                <ul className="space-y-2">
                  {item.links.slice(0, 4).map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center gap-2 text-white/55 text-sm hover:text-white transition">
                        <span className="w-1 h-1 bg-[#16a34a] rounded-full shrink-0" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

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

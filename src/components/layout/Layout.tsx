'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, ChevronDown, Scale, FileText, Building2, ClipboardCheck, Search, BookOpen, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const NAV_ITEMS = [
  { label: 'eCourt Filing', href: '/ecourt-filing', icon: Scale, desc: 'Litigation • e-Filing • Court Drafting' },
  { label: 'eTender & Procurement', href: '/etender-procurement', icon: FileText, desc: 'Government • Railway • GeM • PSU' },
  { label: 'Business Incorporation', href: '/business-incorporation', icon: Building2, desc: 'Company • LLP • Partnership • Setup' },
  { label: 'Annual Compliance', href: '/annual-compliance', icon: ClipboardCheck, desc: 'ROC • MCA • GST • Tax • Corporate' },
]

export default function Layout({ children, settings }: { children: React.ReactNode; settings?: any }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const phone = settings?.phone || '+91 99119 91330'
  const email = settings?.email || 'info@delhifiling.com'
  const whatsapp = settings?.whatsapp || '+91 99119 91330'
  const address = settings?.address || 'New Delhi, India'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-navy text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-gold-light">Professional Legal & Compliance Services — Delhi</span>
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-gold transition">
              <Phone size={12} />{phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-gold transition">
              <Mail size={12} />{email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
              <Scale size={20} className="text-gold" />
            </div>
            <div>
              <div className="font-heading font-bold text-navy text-lg leading-none">Delhi Filing</div>
              <div className="text-[10px] text-text-muted leading-none tracking-wide">Legal • Corporate • Compliance</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text hover:text-navy hover:bg-cream rounded-lg transition"
                >
                  {item.label}
                  <ChevronDown size={13} className="text-text-muted group-hover:text-navy transition" />
                </Link>
              </div>
            ))}
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-text-muted hover:text-navy transition">Blog</Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/search" className="p-2 text-text-muted hover:text-navy transition rounded-lg hover:bg-cream" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link href="/dashboard" className="p-2 text-text-muted hover:text-navy transition rounded-lg hover:bg-cream" aria-label="My Account">
              <UserCircle size={18} />
            </Link>
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-semibold bg-gold text-navy rounded-lg hover:bg-gold-dark transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-navy">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cream transition"
              >
                <item.icon size={18} className="text-gold" />
                <div>
                  <div className="text-sm font-semibold text-navy">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.desc}</div>
                </div>
              </Link>
            ))}
            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cream transition">
              <BookOpen size={18} className="text-gold" />
              <div className="text-sm font-semibold text-navy">Blog & Legal Updates</div>
            </Link>
            <Link href="/search" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cream transition">
              <Search size={18} className="text-gold" />
              <div className="text-sm font-semibold text-navy">Search Services</div>
            </Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-cream transition">
              <UserCircle size={18} className="text-gold" />
              <div className="text-sm font-semibold text-navy">My Account</div>
            </Link>
            <div className="pt-3 flex gap-2">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2.5 bg-gold text-navy text-sm font-semibold rounded-lg">
                Get Started
              </Link>
              <a href={`tel:${phone}`} className="flex-1 text-center py-2.5 border border-navy text-navy text-sm font-semibold rounded-lg">
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>
      <WhatsAppButton whatsapp={whatsapp} />

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Scale size={16} className="text-navy" />
              </div>
              <span className="font-heading font-bold text-lg">Delhi Filing</span>
            </div>
            <p className="text-sm text-white/60 mb-4 max-w-xs">Professional Legal, Corporate, Tax & Government Filing Services across India.</p>
            <div className="space-y-2 text-sm text-white/70">
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-gold transition"><Phone size={14} />{phone}</a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-gold transition"><Mail size={14} />{email}</a>
              {address && <p className="text-white/50 text-xs mt-2">{address}</p>}
            </div>
          </div>

          {/* Services */}
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <h4 className="font-semibold text-gold mb-3 text-sm">{item.label}</h4>
              <Link href={item.href} className="block text-sm text-white/60 hover:text-white transition mb-1">All Services</Link>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Delhi Filing. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
              <Link href="/search" className="hover:text-white transition">Search</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, ChevronDown, Scale, FileText, Building2, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'eCourt Filing', href: '/ecourt-filing', icon: Scale, desc: 'Litigation • e-Filing • Court Drafting' },
  { label: 'eTender & Procurement', href: '/etender-procurement', icon: FileText, desc: 'Government • Railway • GeM • PSU' },
  { label: 'Business Incorporation', href: '/business-incorporation', icon: Building2, desc: 'Company • LLP • Partnership • Setup' },
  { label: 'Annual Compliance', href: '/annual-compliance', icon: ClipboardCheck, desc: 'ROC • MCA • GST • Tax • Corporate' },
]

export default function Layout({ children, settings }: { children: React.ReactNode; settings?: any }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const phone = settings?.phone || '+91 98765 43210'
  const email = settings?.email || 'info@delhifiling.com'
  const whatsapp = settings?.whatsapp || '+91 98765 43210'

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
          <Link href="/" className="flex items-center gap-2">
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
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text hover:text-navy hover:bg-cream rounded-lg transition"
                >
                  {item.label}
                  <ChevronDown size={14} className="text-text-muted group-hover:text-navy transition" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
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
            <div className="pt-3 flex gap-2">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 bg-gold text-navy text-sm font-semibold rounded-lg">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Scale size={16} className="text-navy" />
              </div>
              <span className="font-heading font-bold text-lg">Delhi Filing</span>
            </div>
            <p className="text-sm text-white/60 mb-4">Professional Legal, Corporate, Tax & Government Filing Services</p>
            <div className="space-y-2 text-sm text-white/70">
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-gold transition"><Phone size={14} />{phone}</a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-gold transition"><Mail size={14} />{email}</a>
            </div>
          </div>

          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <h4 className="font-semibold text-gold mb-3 text-sm">{item.label}</h4>
              <Link href={item.href} className="block text-sm text-white/60 hover:text-white transition mb-1">All Services</Link>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Delhi Filing. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

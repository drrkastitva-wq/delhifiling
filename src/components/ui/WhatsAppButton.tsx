'use client'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton({ whatsapp }: { whatsapp?: string }) {
  const number = (whatsapp || '+919876543210').replace(/\D/g, '')
  const message = encodeURIComponent('Hello! I need help with a legal/compliance service.')
  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all hover:scale-105 group"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}

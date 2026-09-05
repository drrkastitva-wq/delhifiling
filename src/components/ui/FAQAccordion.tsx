'use client'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

interface FAQ { question: string; answer: string }

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null
  return (
    <Accordion.Root type="single" collapsible className="space-y-2">
      {faqs.map((faq, i) => (
        <Accordion.Item key={i} value={`faq-${i}`} className="border border-border rounded-xl overflow-hidden">
          <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-navy hover:bg-cream transition group">
            {faq.question}
            <ChevronDown size={16} className="text-gold shrink-0 group-data-[state=open]:rotate-180 transition-transform" />
          </Accordion.Trigger>
          <Accordion.Content className="px-5 py-4 text-sm text-text-muted bg-cream/50">
            {faq.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

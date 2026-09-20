import type { CollectionConfig } from 'payload'

export const HeroBanners: CollectionConfig = {
  slug: 'hero-banners',
  admin: { useAsTitle: 'heading', defaultColumns: ['heading', 'active', 'order'], group: 'Content' },
  hooks: {
    afterChange: [
      async () => {
        try {
          const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          await fetch(`${base}/api/revalidate?secret=${process.env.REVALIDATE_SECRET || 'df-revalidate-2025'}&path=/`)
        } catch (_) {}
      },
    ],
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'ctaPrimaryText', type: 'text', defaultValue: 'Get Started' },
    { name: 'ctaPrimaryLink', type: 'text', defaultValue: '/contact' },
    { name: 'ctaSecondaryText', type: 'text' },
    { name: 'ctaSecondaryLink', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}

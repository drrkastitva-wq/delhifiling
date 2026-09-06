import type { CollectionConfig } from 'payload'

export const HeroBanners: CollectionConfig = {
  slug: 'hero-banners',
  admin: { useAsTitle: 'heading', defaultColumns: ['heading', 'active', 'order'], group: 'Content' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'ctaPrimaryText', type: 'text', defaultValue: 'Get Started' },
    { name: 'ctaPrimaryLink', type: 'text', defaultValue: '/contact' },
    { name: 'ctaSecondaryText', type: 'text', defaultValue: 'Our Services' },
    { name: 'ctaSecondaryLink', type: 'text', defaultValue: '/#services' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}

import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'professionalFee', 'active'], group: 'Services' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'whoNeedsIt', type: 'textarea' },
    {
      name: 'documentsRequired',
      type: 'array',
      fields: [{ name: 'document', type: 'text' }],
    },
    {
      name: 'process',
      type: 'array',
      fields: [
        { name: 'step', type: 'number' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
    { name: 'timeline', type: 'text', admin: { description: 'e.g. 3-5 working days' } },
    { name: 'professionalFee', type: 'text', admin: { description: 'e.g. Starting ₹1,499' } },
    { name: 'governmentFee', type: 'text', admin: { description: 'e.g. As applicable' } },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}

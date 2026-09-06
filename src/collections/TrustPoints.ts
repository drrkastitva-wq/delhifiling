import type { CollectionConfig } from 'payload'

export const TrustPoints: CollectionConfig = {
  slug: 'trust-points',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'active', 'order'], group: 'Content' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name' } },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}

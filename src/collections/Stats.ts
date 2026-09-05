import type { CollectionConfig } from 'payload'

export const Stats: CollectionConfig = {
  slug: 'stats',
  admin: { useAsTitle: 'label', defaultColumns: ['label', 'value', 'active', 'order'] },
  fields: [
    { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 500+ or 10,000+' } },
    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Services Offered' } },
    { name: 'icon', type: 'text' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}

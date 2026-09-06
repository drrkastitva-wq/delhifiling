import type { CollectionConfig } from 'payload'

export const ServiceMappings: CollectionConfig = {
  slug: 'service-mappings',
  admin: { useAsTitle: 'id', defaultColumns: ['service', 'subcategory', 'order'], group: 'Services' },
  fields: [
    { name: 'service', type: 'relationship', relationTo: 'services', required: true },
    { name: 'subcategory', type: 'relationship', relationTo: 'subcategories', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}

import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'tagline', 'order'], group: 'Services' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL slug e.g. ecourt-filing' } },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name e.g. Scale, FileText' } },
    { name: 'color', type: 'text', admin: { description: 'Tailwind color class e.g. blue, amber' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}

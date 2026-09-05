import type { CollectionConfig } from 'payload'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'slug', 'order'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text' },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}

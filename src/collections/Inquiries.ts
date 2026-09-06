import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'serviceText', 'status', 'createdAt'],
    group: 'CRM',
  },
  access: {
    create: () => true,
    read: ({ req }) => {
      if (req.user) return true
      return false
    },
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'service', type: 'relationship', relationTo: 'services' },
    { name: 'serviceText', type: 'text', admin: { description: 'Service name if not linked' } },
    { name: 'category', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal notes' } },
    { name: 'source', type: 'text', admin: { description: 'Page URL where inquiry was submitted' } },
  ],
  timestamps: true,
}

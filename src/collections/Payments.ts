import type { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'customerPhone', 'serviceName', 'amount', 'status', 'createdAt'],
    group: 'CRM',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'customerName', type: 'text', required: true },
    { name: 'customerPhone', type: 'text' },
    { name: 'customerEmail', type: 'email' },
    { name: 'serviceName', type: 'text' },
    { name: 'amount', type: 'number', admin: { description: 'Amount in INR' } },
    { name: 'razorpayOrderId', type: 'text' },
    { name: 'razorpayPaymentId', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal notes' } },
  ],
  timestamps: true,
}

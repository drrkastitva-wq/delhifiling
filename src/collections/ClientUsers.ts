import type { CollectionConfig } from 'payload'

export const ClientUsers: CollectionConfig = {
  slug: 'client-users',
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // 7 days
    cookies: { secure: process.env.NODE_ENV === 'production' },
  },
  admin: { useAsTitle: 'email', group: 'CRM' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
  ],
}

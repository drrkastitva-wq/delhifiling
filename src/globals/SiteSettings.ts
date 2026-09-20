import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Delhi Filing' },
    { name: 'tagline', type: 'text', defaultValue: 'Legal • Corporate • Compliance • Government Filing' },
    { name: 'phone', type: 'text', defaultValue: '+91 99119 91330' },
    { name: 'whatsapp', type: 'text', defaultValue: '+91 99119 91330' },
    { name: 'email', type: 'email', defaultValue: 'info@delhifiling.com' },
    { name: 'address', type: 'textarea', defaultValue: 'New Delhi, India' },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    { name: 'footerText', type: 'textarea' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}

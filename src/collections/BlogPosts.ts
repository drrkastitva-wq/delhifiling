import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL slug e.g. how-to-file-bail-application' } },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'eCourt Filing', value: 'ecourt-filing' },
        { label: 'eTender & Procurement', value: 'etender-procurement' },
        { label: 'Business Incorporation', value: 'business-incorporation' },
        { label: 'Annual Compliance', value: 'annual-compliance' },
        { label: 'Legal Updates', value: 'legal-updates' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
    },
    { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'Short summary shown in listing' } },
    { name: 'content', type: 'richText', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'text', defaultValue: 'Delhi Filing Team' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    { name: 'publishedAt', type: 'date', admin: { description: 'Publication date' } },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}

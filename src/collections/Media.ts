import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  admin: { useAsTitle: 'alt' },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create' || !doc.filename) return doc
        const bucket = process.env.S3_BUCKET || 'delhifilling-media'
        const region = process.env.AWS_REGION || 'ap-south-1'
        const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(doc.filename)}`
        if (doc.url === s3Url) return doc
        try {
          await req.payload.db.pool.query(
            'UPDATE media SET url = $1 WHERE id = $2',
            [s3Url, doc.id]
          )
          doc.url = s3Url
        } catch (e) {
          console.error('Media URL fix failed:', e)
        }
        return doc
      },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}

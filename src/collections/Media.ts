import type { CollectionConfig } from 'payload'

const getS3Url = (filename: string) => {
  const bucket = process.env.S3_BUCKET || 'delhifilling-media'
  const region = process.env.AWS_REGION || 'ap-south-1'
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(filename)}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  admin: { useAsTitle: 'alt' },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.filename) doc.url = getS3Url(doc.filename)
        return doc
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if (!doc?.filename) return doc
        const s3Url = getS3Url(doc.filename)
        doc.url = s3Url
        if (operation === 'create') {
          try {
            await req.payload.db.pool.query(
              'UPDATE media SET url = $1 WHERE id = $2',
              [s3Url, doc.id]
            )
          } catch (e) {
            console.error('Media URL fix failed:', e)
          }
        }
        return doc
      },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}

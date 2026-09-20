import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

import { ClientUsers } from './src/collections/ClientUsers'
import { Categories } from './src/collections/Categories'
import { Subcategories } from './src/collections/Subcategories'
import { Services } from './src/collections/Services'
import { ServiceMappings } from './src/collections/ServiceMappings'
import { Inquiries } from './src/collections/Inquiries'
import { HeroBanners } from './src/collections/HeroBanners'
import { Testimonials } from './src/collections/Testimonials'
import { TrustPoints } from './src/collections/TrustPoints'
import { Stats } from './src/collections/Stats'
import { SiteSettings } from './src/globals/SiteSettings'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import { BlogPosts } from './src/collections/BlogPosts'
import { Payments } from './src/collections/Payments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Delhi Filing Admin',
    },
  },
  collections: [
    Users,
    ClientUsers,
    Media,
    Categories,
    Subcategories,
    Services,
    ServiceMappings,
    Inquiries,
    HeroBanners,
    Testimonials,
    TrustPoints,
    Stats,
    BlogPosts,
    Payments,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-in-production',
  typescript: { outputFile: path.resolve(dirname, 'src/types/payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SES_FROM_EMAIL || 'info@delhifiling.com',
    defaultFromName: 'Delhi Filing',
    transport: nodemailer.createTransport({
      host: `email-smtp.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_SMTP_USER || '',
        pass: process.env.AWS_SES_SMTP_PASS || '',
      },
    }),
  }),
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET || 'delhifilling-media',
      acl: 'public-read',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'ap-south-1',
      },
    }),
  ],
  upload: { limits: { fileSize: 10000000 } },
})

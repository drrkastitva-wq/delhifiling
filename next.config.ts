import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@payloadcms/db-postgres', 'pg', 'pg-native'],
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://delhifiling.com',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'delhifilling-media.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: '*.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
    ],
  },
}

export default withPayload(nextConfig)

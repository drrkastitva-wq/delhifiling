import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'delhifilling-media.s3.ap-south-1.amazonaws.com' },
      { protocol: 'https', hostname: 'delhifilling-uploads.s3.ap-south-1.amazonaws.com' },
    ],
  },
}

export default withPayload(nextConfig)

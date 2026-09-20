import type { ImportMap } from 'payload'
import { S3ClientUploadHandler } from '@payloadcms/storage-s3/client'

export const importMap: ImportMap = {
  '@payloadcms/storage-s3/client#S3ClientUploadHandler': S3ClientUploadHandler,
}

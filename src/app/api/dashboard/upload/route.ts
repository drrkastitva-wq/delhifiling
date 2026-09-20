import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('payload-token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const service = formData.get('service') as string
    const notes = formData.get('notes') as string
    const files = formData.getAll('files') as File[]

    const uploadedIds: string[] = []
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const media = await payload.create({
        collection: 'media',
        data: { alt: `${service} — ${file.name}` },
        file: { data: buffer, mimetype: file.type, name: file.name, size: file.size },
      })
      uploadedIds.push(String(media.id))
    }

    // Save as inquiry with document references
    await payload.create({
      collection: 'inquiries',
      data: {
        name: (user as any).name,
        email: (user as any).email,
        phone: (user as any).phone || '',
        serviceText: service,
        message: notes || `Document upload for: ${service}`,
        source: 'dashboard-upload',
        status: 'new',
      },
    })

    return NextResponse.json({ success: true, uploaded: uploadedIds.length })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('payload-token')?.value
    if (!token) return NextResponse.json({ inquiries: [] }, { status: 401 })

    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: req.headers })
    if (!user) return NextResponse.json({ inquiries: [] }, { status: 401 })

    const { docs } = await payload.find({
      collection: 'inquiries',
      where: { email: { equals: (user as any).email } },
      sort: '-createdAt',
      limit: 50,
    })
    return NextResponse.json({ inquiries: docs })
  } catch {
    return NextResponse.json({ inquiries: [] })
  }
}

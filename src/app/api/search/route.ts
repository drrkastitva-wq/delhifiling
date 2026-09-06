import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() || ''
  if (q.length < 2) return NextResponse.json({ results: [] })

  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      where: {
        and: [
          { active: { equals: true } },
          { or: [{ name: { like: q } }, { shortDescription: { like: q } }] },
        ],
      },
      limit: 30,
      depth: 0,
    })
    return NextResponse.json({ results: docs })
  } catch {
    return NextResponse.json({ results: [] })
  }
}

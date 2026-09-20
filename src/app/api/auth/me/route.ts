import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('payload-token')?.value
    if (!token) return NextResponse.json({ user: null })
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: req.headers })
    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null })
  }
}

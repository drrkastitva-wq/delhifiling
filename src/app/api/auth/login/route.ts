import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const payload = await getPayloadClient()
    const result = await payload.login({ collection: 'client-users', data: { email, password } })
    const res = NextResponse.json({ user: result.user })
    res.cookies.set('payload-token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }
}
